
import React from 'react';
import ExerciseCard from './ExerciseCard';

interface Exercise {
  name: string;
  duration: number;
  difficulty: string;
  icon: string;
  type: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
  onStartWorkout: (exercise: Exercise) => void;
}

const ExerciseList = ({ exercises, onStartWorkout }: ExerciseListProps) => {
  if (!exercises || exercises.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No exercises available for this category.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={index}
          exercise={exercise}
          onStart={onStartWorkout}
        />
      ))}
    </div>
  );
};

export default ExerciseList;
