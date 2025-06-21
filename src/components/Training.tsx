import React, { useState } from 'react';
import { Play, Clock, Zap, CheckCircle } from 'lucide-react';
import { useWorkouts } from '@/hooks/useWorkouts';
import { useToast } from '@/hooks/use-toast';
import WorkoutTimer from './WorkoutTimer';
import CustomTimer from './CustomTimer';

const Training = () => {
  const [activeTab, setActiveTab] = useState('running');
  const [activeWorkout, setActiveWorkout] = useState<any>(null);
  const [currentWorkoutId, setCurrentWorkoutId] = useState<string | null>(null);
  const { createWorkout, completeWorkout } = useWorkouts();
  const { toast } = useToast();

  const tabs = [
    { id: 'leg-work', label: 'Leg Work' },
    { id: 'running', label: 'Running' },
    { id: 'shooting', label: 'Shooting' },
    { id: 'custom-timer', label: 'Custom Timer' },
    { id: 'custom', label: 'Custom' },
  ];

  const exercises = {
    'leg-work': [
      { name: 'Squats', duration: 20, difficulty: 'Medium', icon: '🦵', type: 'Leg Work' },
      { name: 'Lunges', duration: 15, difficulty: 'Medium', icon: '🏃‍♂️', type: 'Leg Work' },
      { name: 'Calf Raises', duration: 10, difficulty: 'Easy', icon: '⬆️', type: 'Leg Work' },
      { name: 'Bulgarian Split Squats', duration: 18, difficulty: 'Hard', icon: '🦵', type: 'Leg Work' },
      { name: 'Wall Sits', duration: 12, difficulty: 'Medium', icon: '🧱', type: 'Leg Work' },
    ],
    'running': [
      { name: 'Sprint Intervals', duration: 20, difficulty: 'Hard', icon: '⚡', type: 'Running' },
      { name: 'Long Distance', duration: 45, difficulty: 'Medium', icon: '🏃‍♂️', type: 'Running' },
      { name: 'Hill Sprints', duration: 15, difficulty: 'Hard', icon: '⛰️', type: 'Running' },
      { name: 'Tempo Run', duration: 30, difficulty: 'Medium', icon: '🏃‍♂️', type: 'Running' },
      { name: 'Fartlek Training', duration: 25, difficulty: 'Hard', icon: '⚡', type: 'Running' },
    ],
    'shooting': [
      { name: 'Target Practice', duration: 30, difficulty: 'Medium', icon: '🎯', type: 'Shooting' },
      { name: 'Moving Shots', duration: 25, difficulty: 'Hard', icon: '⚽', type: 'Shooting' },
      { name: 'Free Kicks', duration: 20, difficulty: 'Medium', icon: '🥅', type: 'Shooting' },
      { name: 'Penalty Practice', duration: 15, difficulty: 'Easy', icon: '⚽', type: 'Shooting' },
      { name: 'Volley Training', duration: 22, difficulty: 'Hard', icon: '🦶', type: 'Shooting' },
    ],
    'custom': [
      { name: 'Agility Ladder', duration: 15, difficulty: 'Medium', icon: '🪜', type: 'Agility' },
      { name: 'Cone Drills', duration: 20, difficulty: 'Easy', icon: '🚧', type: 'Agility' },
      { name: 'Ball Juggling', duration: 10, difficulty: 'Easy', icon: '⚽', type: 'Technical' },
      { name: 'Plyometric Box Jumps', duration: 18, difficulty: 'Hard', icon: '📦', type: 'Strength' },
      { name: 'Core Strengthening', duration: 25, difficulty: 'Medium', icon: '💪', type: 'Strength' },
    ],
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-neon';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const handleStartWorkout = async (exercise: any) => {
    try {
      const workout = await createWorkout({
        name: exercise.name,
        type: exercise.type,
        duration_minutes: exercise.duration,
        difficulty: exercise.difficulty,
        date: new Date().toISOString().split('T')[0],
        completed: false,
      });

      if (workout) {
        setActiveWorkout(exercise);
        setCurrentWorkoutId(workout.id);
        
        toast({
          title: "Workout Started!",
          description: `${exercise.name} timer is now running. Stay focused!`,
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
          title: "Workout Completed! 🎉",
          description: `Congratulations! You've completed ${activeWorkout?.name}!`,
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
      description: "Your workout session has been stopped.",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Training Sessions</h2>
        <p className="text-gray-400">Choose your workout and start training</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-electric text-black'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'custom-timer' ? (
        <CustomTimer />
      ) : (
        <>
          {/* Exercise List */}
          <div className="space-y-4">
            {exercises[activeTab as keyof typeof exercises]?.map((exercise, index) => (
              <div key={index} className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{exercise.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{exercise.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-400">{exercise.duration} minutes</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                          <span className={getDifficultyColor(exercise.difficulty)}>
                            {exercise.difficulty}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleStartWorkout(exercise)}
                    className="bg-electric hover:bg-electric/80 text-black p-3 rounded-full transition-all duration-200 hover:scale-105"
                  >
                    <Play size={20} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 bg-gradient-to-r from-electric to-neon p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-200">
        <Zap size={24} className="text-black" />
      </button>

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

export default Training;
