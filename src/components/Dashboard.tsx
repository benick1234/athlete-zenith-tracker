
import React, { useEffect, useState } from 'react';
import { Droplets, Zap, Activity, Calendar, Sun, Cloud } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import StatCard from './StatCard';
import ProgressRing from './ProgressRing';
import { Loader2 } from 'lucide-react';

interface UserProfile {
  age: number | null;
  height: number | null;
  date_of_birth: string | null;
  country: string | null;
  religion: string | null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('age, height, date_of_birth, country, religion')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Get user name from email (part before @)
  const getUserName = (email: string) => {
    return email.split('@')[0];
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = [
    {
      title: 'Water Intake',
      value: '1.2L',
      target: '2.5L',
      progress: 48,
      icon: Droplets,
      color: 'electric' as const,
    },
    {
      title: 'Calories',
      value: '1,850',
      target: '2,200',
      progress: 84,
      icon: Zap,
      color: 'neon' as const,
    },
    {
      title: 'Steps',
      value: '8,432',
      target: '10,000',
      progress: 84,
      icon: Activity,
      color: 'electric' as const,
    },
  ];

  const recentWorkouts = [
    { name: 'Sprint Training', duration: '45 min', type: 'Running', date: 'Today' },
    { name: 'Ball Control', duration: '30 min', type: 'Technical', date: 'Yesterday' },
    { name: 'Strength Training', duration: '60 min', type: 'Gym', date: '2 days ago' },
  ];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-electric" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">
          {getGreeting()}, {user?.email ? getUserName(user.email) : 'Footballer'}!
        </h2>
        <p className="text-gray-400">Ready for today's training session?</p>
        {profile?.country && (
          <p className="text-sm text-gray-500 mt-1">Training from {profile.country}</p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Weather Card */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weather</h3>
          <div className="flex items-center space-x-2 text-electric">
            <Sun size={20} />
            <span className="text-sm">Perfect for outdoor training</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">22°C</p>
            <p className="text-gray-400 text-sm">Sunny, light breeze</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Humidity</p>
            <p className="font-semibold">65%</p>
          </div>
        </div>
      </div>

      {/* Player Info Card */}
      {profile && (profile.age || profile.height) && (
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Player Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.age && (
              <div className="text-center">
                <p className="text-2xl font-bold text-electric">{profile.age}</p>
                <p className="text-sm text-gray-400">Age</p>
              </div>
            )}
            {profile.height && (
              <div className="text-center">
                <p className="text-2xl font-bold text-neon">{profile.height} cm</p>
                <p className="text-sm text-gray-400">Height</p>
              </div>
            )}
            {profile.date_of_birth && (
              <div className="text-center">
                <p className="text-lg font-bold">
                  {new Date(profile.date_of_birth).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-gray-400">Birthday</p>
              </div>
            )}
            {profile.country && (
              <div className="text-center">
                <p className="text-lg font-bold">{profile.country}</p>
                <p className="text-sm text-gray-400">Country</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Workouts */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Workouts</h3>
          <button className="text-electric text-sm font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {recentWorkouts.map((workout, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="font-medium">{workout.name}</p>
                <p className="text-sm text-gray-400">{workout.type} • {workout.duration}</p>
              </div>
              <span className="text-xs text-gray-500">{workout.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
