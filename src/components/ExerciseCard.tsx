
import React from 'react';
import { Play, Clock } from 'lucide-react';

interface Exercise {
  name: string;
  duration: number;
  difficulty: string;
  icon: string;
  type: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onStart: (exercise: Exercise) => void;
}

const ExerciseCard = ({ exercise, onStart }: ExerciseCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-neon';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 animate-fade-in">
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
          onClick={() => onStart(exercise)}
          className="bg-electric hover:bg-electric/80 text-black p-3 rounded-full transition-all duration-200 hover:scale-105"
        >
          <Play size={20} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default ExerciseCard;
