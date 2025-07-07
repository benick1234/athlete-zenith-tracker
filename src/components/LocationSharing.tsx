
import React, { useState } from 'react';
import { MapPin, Share2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const LocationSharing = () => {
  const { user } = useAuth();
  const { latitude, longitude, accuracy, error, loading, getCurrentLocation } = useGeolocation();
  const [isSharing, setIsSharing] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const getLocationName = async (lat: number, lng: number) => {
    try {
      // Using a simple reverse geocoding approach
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      return data.city || data.locality || data.countryName || 'Unknown Location';
    } catch (error) {
      console.error('Error getting location name:', error);
      return 'Unknown Location';
    }
  };

  const shareLocation = async () => {
    if (!latitude || !longitude || !user) return;

    setShareLoading(true);
    try {
      const locationName = await getLocationName(latitude, longitude);
      
      // For now, we'll just show a toast with the location
      // In a real app, you might want to store this in a database table
      toast.success(`Location shared: ${locationName}`, {
        description: `Coordinates: ${formatCoordinates(latitude, longitude)}`,
        duration: 5000,
      });

      setIsSharing(true);
    } catch (error) {
      console.error('Error sharing location:', error);
      toast.error('Failed to share location');
    } finally {
      setShareLoading(false);
    }
  };

  const stopSharing = () => {
    setIsSharing(false);
    toast.info('Location sharing stopped');
  };

  const copyToClipboard = () => {
    if (!latitude || !longitude) return;
    
    const locationText = `My location: ${formatCoordinates(latitude, longitude)}`;
    navigator.clipboard.writeText(locationText);
    toast.success('Location copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-electric" />
          <span className="text-gray-300">Getting your location...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="text-center">
          <MapPin className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <h3 className="font-semibold text-red-400 mb-2">Location Access Error</h3>
          <p className="text-sm text-gray-400 mb-4">{error}</p>
          <p className="text-xs text-gray-500 mb-4">
            Please enable location access in your browser settings to use this feature.
          </p>
          <Button 
            onClick={getCurrentLocation}
            className="bg-electric hover:bg-electric/80 text-black"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-electric" />
          <h3 className="font-semibold">Location Sharing</h3>
        </div>
        {isSharing && (
          <div className="flex items-center space-x-1 text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        )}
      </div>

      {latitude && longitude ? (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Current Location</span>
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                className="text-electric hover:text-electric/80"
              >
                Copy
              </Button>
            </div>
            <p className="font-mono text-sm text-electric">
              {formatCoordinates(latitude, longitude)}
            </p>
            {accuracy && (
              <p className="text-xs text-gray-500 mt-1">
                Accuracy: ±{Math.round(accuracy)}m
              </p>
            )}
          </div>

          <div className="flex space-x-3">
            {!isSharing ? (
              <Button
                onClick={shareLocation}
                disabled={shareLoading}
                className="flex-1 bg-gradient-to-r from-electric to-neon hover:from-electric/80 hover:to-neon/80 text-black"
              >
                {shareLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sharing...
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Location
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={stopSharing}
                variant="destructive"
                className="flex-1"
              >
                <EyeOff className="w-4 h-4 mr-2" />
                Stop Sharing
              </Button>
            )}
            
            <Button
              onClick={getCurrentLocation}
              variant="outline"
              className="border-electric/30 text-electric hover:bg-electric/10"
            >
              <MapPin className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Your location is updated in real-time while sharing is active
          </div>
        </div>
      ) : (
        <div className="text-center">
          <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">Location not available</p>
          <Button
            onClick={getCurrentLocation}
            className="bg-electric hover:bg-electric/80 text-black"
          >
            Get Location
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocationSharing;
