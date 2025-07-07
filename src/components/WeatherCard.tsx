
import React from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useWeather } from '@/hooks/useWeather';

const WeatherCard = () => {
  const { latitude, longitude, error: locationError, loading: locationLoading } = useGeolocation();
  const { data: weather, loading: weatherLoading, error: weatherError } = useWeather(latitude, longitude);

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return <Sun className="w-8 h-8 text-yellow-400" />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return <Cloud className="w-8 h-8 text-gray-400" />;
    if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) return <CloudRain className="w-8 h-8 text-blue-400" />;
    return <Sun className="w-8 h-8 text-yellow-400" />;
  };

  const loading = locationLoading || weatherLoading;
  const error = locationError || weatherError;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Weather</h3>
        {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-electric"></div>}
      </div>

      {error && (
        <div className="text-center py-4">
          <p className="text-red-400 text-sm">{error}</p>
          <p className="text-gray-500 text-xs mt-1">Using default weather information</p>
        </div>
      )}

      {weather && !error && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getWeatherIcon(weather.icon)}
              <div>
                <p className="text-3xl font-bold">{weather.temperature}°C</p>
                <p className="text-gray-400 text-sm capitalize">{weather.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Location</p>
              <p className="font-semibold text-sm">{weather.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Humidity</p>
                <p className="font-semibold">{weather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Wind</p>
                <p className="font-semibold">{weather.windSpeed} m/s</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && !error && (
        <div className="text-center py-4">
          <p className="text-gray-400">Getting weather information...</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
