
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

interface WaterIntakeHistory {
  id: string;
  date: string;
  water_intake: number;
  created_at: string;
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
  const [waterHistory, setWaterHistory] = useState<WaterIntakeHistory[]>([]);
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

      // Fetch water intake history (last 7 days)
      const { data: historyResponse, error: historyError } = await supabase
        .from('daily_tracking')
        .select('id, date, water_intake, created_at')
        .eq('user_id', user.id)
        .not('water_intake', 'is', null)
        .gte('water_intake', 1)
        .order('date', { ascending: false })
        .limit(7);

      if (historyError) {
        console.error('Error fetching water history:', historyError);
      } else if (historyResponse) {
        setWaterHistory(historyResponse);
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
      
      // First try to update existing record
      const { data: existingData } = await supabase
        .from('daily_tracking')
        .select('id')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from('daily_tracking')
          .update({ [field]: value })
          .eq('id', existingData.id);

        if (error) {
          console.error('Error updating tracking data:', error);
          return;
        }
      } else {
        // Insert new record
        const { error } = await supabase
          .from('daily_tracking')
          .insert({
            user_id: user.id,
            date: today,
            [field]: value,
          });

        if (error) {
          console.error('Error inserting tracking data:', error);
          return;
        }
      }

      setTrackingData(prev => ({ ...prev, [field]: value }));
      
      // Refresh history if water intake was updated
      if (field === 'water_intake') {
        fetchData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addCalories = async (calories: number) => {
    const newCalories = trackingData.calories_consumed + calories;
    await updateTrackingData('calories_consumed', newCalories);
  };

  const addSteps = async (steps: number) => {
    const newSteps = trackingData.steps_taken + steps;
    await updateTrackingData('steps_taken', newSteps);
  };

  const resetCalories = async () => {
    await updateTrackingData('calories_consumed', 0);
  };

  const resetSteps = async () => {
    await updateTrackingData('steps_taken', 0);
  };

  const resetWaterIntake = async () => {
    await updateTrackingData('water_intake', 0);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return {
    trackingData,
    goals,
    waterHistory,
    loading,
    updateTrackingData,
    addCalories,
    addSteps,
    resetCalories,
    resetSteps,
    resetWaterIntake,
    refreshData: fetchData,
  };
};
