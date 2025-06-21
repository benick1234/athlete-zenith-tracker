
import React, { useState } from 'react';
import { Clock, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import WorkoutTimer from './WorkoutTimer';
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

  const workoutTypes = [
    'Running', 'Leg Work', 'Shooting', 'Strength', 'Cardio', 
    'Flexibility', 'Technical', 'Agility', 'Custom'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const totalMinutes = hours * 60 + minutes;

  const adjustTime = (type: 'hours' | 'minutes', increment: boolean) => {
    if (type === 'hours') {
      setHours(prev => Math.max(0, Math.min(23, prev + (increment ? 1 : -1))));
    } else {
      setMinutes(prev => Math.max(0, Math.min(59, prev + (increment ? 5 : -5))));
    }
  };

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

        {/* Workout Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Workout Name</label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric"
            placeholder="Enter workout name"
          />
        </div>

        {/* Workout Type & Difficulty */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <Select value={workoutType} onValueChange={setWorkoutType}>
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {workoutTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(diff => (
                  <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Time Selection */}
        <div className="space-y-6">
          {/* Hours */}
          <div>
            <label className="block text-sm font-medium mb-3">Hours: {hours}</label>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => adjustTime('hours', false)}
                className="bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Minus size={16} />
              </Button>
              
              <div className="flex-1">
                <Slider
                  value={[hours]}
                  onValueChange={(value) => setHours(value[0])}
                  max={23}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => adjustTime('hours', true)}
                className="bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Minutes */}
          <div>
            <label className="block text-sm font-medium mb-3">Minutes: {minutes}</label>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => adjustTime('minutes', false)}
                className="bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Minus size={16} />
              </Button>
              
              <div className="flex-1">
                <Slider
                  value={[minutes]}
                  onValueChange={(value) => setMinutes(value[0])}
                  max={59}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => adjustTime('minutes', true)}
                className="bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Total Duration Display */}
          <div className="bg-electric/10 border border-electric/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-electric">
              {hours > 0 && `${hours}h `}{minutes}m
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Total Duration: {totalMinutes} minutes
            </div>
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStartWorkout}
            disabled={totalMinutes === 0}
            className="w-full bg-electric hover:bg-electric/80 text-black font-semibold py-3 text-lg"
          >
            Start Custom Workout
          </Button>
        </div>
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
