
import React from 'react';

interface TimerDisplayProps {
  hours: number;
  minutes: number;
  totalMinutes: number;
}

const TimerDisplay = ({ hours, minutes, totalMinutes }: TimerDisplayProps) => {
  return (
    <div className="bg-electric/10 border border-electric/30 rounded-lg p-4 text-center">
      <div className="text-2xl font-bold text-electric">
        {hours > 0 && `${hours}h `}{minutes}m
      </div>
      <div className="text-sm text-gray-400 mt-1">
        Total Duration: {totalMinutes} minutes
      </div>
    </div>
  );
};

export default TimerDisplay;
