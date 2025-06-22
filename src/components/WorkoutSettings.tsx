
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WorkoutSettingsProps {
  workoutName: string;
  workoutType: string;
  difficulty: string;
  onWorkoutNameChange: (name: string) => void;
  onWorkoutTypeChange: (type: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

const WorkoutSettings = ({
  workoutName,
  workoutType,
  difficulty,
  onWorkoutNameChange,
  onWorkoutTypeChange,
  onDifficultyChange
}: WorkoutSettingsProps) => {
  const workoutTypes = [
    'Running', 'Leg Work', 'Shooting', 'Strength', 'Cardio', 
    'Flexibility', 'Technical', 'Agility', 'Custom'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="space-y-4">
      {/* Workout Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Workout Name</label>
        <input
          type="text"
          value={workoutName}
          onChange={(e) => onWorkoutNameChange(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric"
          placeholder="Enter workout name"
        />
      </div>

      {/* Workout Type & Difficulty */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <Select value={workoutType} onValueChange={onWorkoutTypeChange}>
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
          <Select value={difficulty} onValueChange={onDifficultyChange}>
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
    </div>
  );
};

export default WorkoutSettings;
