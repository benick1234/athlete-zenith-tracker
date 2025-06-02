
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DailyTrackingData {
  water_intake: number;
  calories_consumed: number;
  steps_taken: number;
}

interface UserGoals {
  daily_water_goal: number;
  daily_calorie_goal: number;
  daily_steps_goal: number;
}

export const useDailyTracking = () => {
  const { user } = useAuth();
  const [trackingData, setTrackingData] = useState<DailyTrackingData>({
    water_intake: 0,
    calories_consumed: 0,
    steps_taken: 0,
  });
  const [goals, setGoals] = useState<UserGoals>({
    daily_water_goal: 2500,
    daily_calorie_goal: 2200,
    daily_steps_goal: 10000,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];

      // Fetch today's tracking data
      const { data: trackingResponse, error: trackingError } = await supabase
        .from('daily_tracking')
        .select('water_intake, calories_consumed, steps_taken')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (trackingError && trackingError.code !== 'PGRST116') {
        console.error('Error fetching tracking data:', trackingError);
      } else if (trackingResponse) {
        setTrackingData(trackingResponse);
      }

      // Fetch user goals
      const { data: goalsResponse, error: goalsError } = await supabase
        .from('user_goals')
        .select('daily_water_goal, daily_calorie_goal, daily_steps_goal')
        .eq('user_id', user.id)
        .maybeSingle();

      if (goalsError && goalsError.code !== 'PGRST116') {
        console.error('Error fetching goals:', goalsError);
      } else if (goalsResponse) {
        setGoals(goalsResponse);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTrackingData = async (field: keyof DailyTrackingData, value: number) => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('daily_tracking')
        .upsert({
          user_id: user.id,
          date: today,
          [field]: value,
        });

      if (error) {
        console.error('Error updating tracking data:', error);
      } else {
        setTrackingData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return {
    trackingData,
    goals,
    loading,
    updateTrackingData,
    refreshData: fetchData,
  };
};
