
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface WorkoutSession {
  id: string;
  user_id: string;
  name: string;
  type: string;
  duration_minutes: number;
  difficulty: string;
  date: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export const useWorkouts = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching workouts:', error);
      } else {
        setWorkouts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createWorkout = async (workout: Omit<WorkoutSession, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('workout_sessions')
        .insert({
          ...workout,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating workout:', error);
      } else {
        setWorkouts(prev => [data, ...prev]);
        return data;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const completeWorkout = async (workoutId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('workout_sessions')
        .update({ completed: true })
        .eq('id', workoutId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error completing workout:', error);
      } else {
        setWorkouts(prev => 
          prev.map(workout => 
            workout.id === workoutId 
              ? { ...workout, completed: true }
              : workout
          )
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [user]);

  return {
    workouts,
    loading,
    createWorkout,
    completeWorkout,
    refreshWorkouts: fetchWorkouts,
  };
};
