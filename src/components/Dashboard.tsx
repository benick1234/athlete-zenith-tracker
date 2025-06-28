import React, { useEffect, useState } from 'react';
import { Droplets, Zap, Activity, Calendar, Sun, Cloud, Heart, Play, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import StatCard from './StatCard';
import ProgressRing from './ProgressRing';
import { Loader2 } from 'lucide-react';
import { useDailyTracking } from '@/hooks/useDailyTracking';
import { useWorkouts } from '@/hooks/useWorkouts';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  age: number | null;
  height: number | null;
  date_of_birth: string | null;
  country: string | null;
  religion: string | null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { trackingData, goals, loading: trackingLoading } = useDailyTracking();
  const { workouts, loading: workoutsLoading } = useWorkouts();

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
    const name = email.split('@')[0];
    // Capitalize first letter and format nicely
    return name.charAt(0).toUpperCase() + name.slice(1);
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
      value: `${(trackingData.water_intake / 1000).toFixed(1)}L`,
      target: `${(goals.daily_water_goal / 1000).toFixed(1)}L`,
      progress: Math.round((trackingData.water_intake / goals.daily_water_goal) * 100),
      icon: Droplets,
      color: 'electric' as const,
    },
    {
      title: 'Calories',
      value: trackingData.calories_consumed.toLocaleString(),
      target: goals.daily_calorie_goal.toLocaleString(),
      progress: Math.round((trackingData.calories_consumed / goals.daily_calorie_goal) * 100),
      icon: Zap,
      color: 'neon' as const,
    },
    {
      title: 'Steps',
      value: trackingData.steps_taken.toLocaleString(),
      target: goals.daily_steps_goal.toLocaleString(),
      progress: Math.round((trackingData.steps_taken / goals.daily_steps_goal) * 100),
      icon: Activity,
      color: 'electric' as const,
    },
  ];

  // Format relative time for workout display
  const getRelativeTime = (date: string) => {
    const workoutDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (workoutDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (workoutDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      const diffTime = Math.abs(today.getTime() - workoutDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days ago`;
    }
  };

  if (loading || trackingLoading || workoutsLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-electric" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Welcome Section */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-3 text-electric">
          Welcome back, {user?.email ? getUserName(user.email) : 'Footballer'}! 🚀
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          {getGreeting()}! Ready to crush your goals today?
        </p>
        
        {/* Friendly Questions Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">How can we help you today?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate('/wellness')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 h-auto flex flex-col items-center space-y-2 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Heart className="w-6 h-6" />
              <div className="text-center">
                <p className="font-semibold">How are you feeling?</p>
                <p className="text-xs opacity-80">Check your wellness</p>
              </div>
            </Button>
            
            <Button 
              onClick={() => navigate('/training')}
              className="bg-gradient-to-r from-electric to-neon hover:from-electric/80 hover:to-neon/80 text-black p-4 h-auto flex flex-col items-center space-y-2 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Play className="w-6 h-6" />
              <div className="text-center">
                <p className="font-semibold">Start Training</p>
                <p className="text-xs opacity-80">Begin today's workout</p>
              </div>
            </Button>
            
            <Button 
              onClick={() => navigate('/progress')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 h-auto flex flex-col items-center space-y-2 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <BarChart3 className="w-6 h-6" />
              <div className="text-center">
                <p className="font-semibold">View Progress</p>
                <p className="text-xs opacity-80">Check your stats</p>
              </div>
            </Button>
          </div>
        </div>
        
        {profile?.country && (
          <p className="text-sm text-gray-500 mt-4">Training from {profile.country}</p>
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
          <button 
            onClick={() => navigate('/training')}
            className="text-electric text-sm font-medium hover:text-electric/80 transition-colors"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {workouts.length > 0 ? (
            workouts.slice(0, 3).map((workout) => (
              <div key={workout.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium">{workout.name}</p>
                  <p className="text-sm text-gray-400">
                    {workout.type} • {workout.duration_minutes} min
                    {workout.completed && <span className="text-green-400 ml-2">✓ Completed</span>}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{getRelativeTime(workout.date)}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No workouts yet</p>
              <p className="text-sm mt-1">Start your first training session!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
