
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkoutTimer from './WorkoutTimer';
import WorkoutSettings from './WorkoutSettings';
import TimeSelector from './TimeSelector';
import TimerDisplay from './TimerDisplay';
import { useWorkouts } from '@/hooks/useWorkouts';
import { useToast } from '@/hooks/use-toast';

const CustomTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const [workoutName, setWorkoutName] = useState('Custom Workout');
  const [workoutType, setWorkoutType] = useState('Custom');
  const [difficulty, setDifficulty] = useState('Medium');
  const [activeWorkout, setActiveWorkout] = useState<any>(null);
  const [currentWorkoutId, setCurrentWorkoutId] = useState<string | null>(null);
  
  const { createWorkout, completeWorkout } = useWorkouts();
  const { toast } = useToast();

  const totalMinutes = hours * 60 + minutes;

  const handleStartWorkout = async () => {
    if (totalMinutes === 0) {
      toast({
        title: "Invalid Duration",
        description: "Please set a duration greater than 0 minutes.",
        variant: "destructive",
      });
      return;
    }

    try {
      const workout = await createWorkout({
        name: workoutName,
        type: workoutType,
        duration_minutes: totalMinutes,
        difficulty: difficulty,
        date: new Date().toISOString().split('T')[0],
        completed: false,
      });

      if (workout) {
        setActiveWorkout({
          name: workoutName,
          duration: totalMinutes,
          type: workoutType,
          difficulty: difficulty,
        });
        setCurrentWorkoutId(workout.id);
        
        toast({
          title: "Custom Workout Started!",
          description: `${workoutName} timer is now running for ${hours}h ${minutes}m.`,
        });
      }
    } catch (error) {
      console.error('Error starting workout:', error);
      toast({
        title: "Error",
        description: "Failed to start workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWorkoutComplete = async () => {
    if (currentWorkoutId) {
      try {
        await completeWorkout(currentWorkoutId);
        toast({
          title: "Custom Workout Completed! 🎉",
          description: `Congratulations! You've completed ${workoutName}!`,
        });
      } catch (error) {
        console.error('Error completing workout:', error);
      }
    }
    setActiveWorkout(null);
    setCurrentWorkoutId(null);
  };

  const handleWorkoutCancel = () => {
    setActiveWorkout(null);
    setCurrentWorkoutId(null);
    toast({
      title: "Workout Cancelled",
      description: "Your custom workout session has been stopped.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Custom Workout Setup */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Clock className="text-electric" size={24} />
          <h3 className="text-xl font-bold">Custom Timer</h3>
        </div>

        <WorkoutSettings
          workoutName={workoutName}
          workoutType={workoutType}
          difficulty={difficulty}
          onWorkoutNameChange={setWorkoutName}
          onWorkoutTypeChange={setWorkoutType}
          onDifficultyChange={setDifficulty}
        />

        <div className="mt-6">
          <TimeSelector
            hours={hours}
            minutes={minutes}
            onHoursChange={setHours}
            onMinutesChange={setMinutes}
          />
        </div>

        <div className="mt-6">
          <TimerDisplay
            hours={hours}
            minutes={minutes}
            totalMinutes={totalMinutes}
          />
        </div>

        {/* Start Button */}
        <Button
          onClick={handleStartWorkout}
          disabled={totalMinutes === 0}
          className="w-full bg-electric hover:bg-electric/80 text-black font-semibold py-3 text-lg mt-6"
        >
          Start Custom Workout
        </Button>
      </div>

      {/* Workout Timer Modal */}
      {activeWorkout && (
        <WorkoutTimer
          workoutName={activeWorkout.name}
          duration={activeWorkout.duration}
          onComplete={handleWorkoutComplete}
          onCancel={handleWorkoutCancel}
        />
      )}
    </div>
  );
};

export default CustomTimer;
