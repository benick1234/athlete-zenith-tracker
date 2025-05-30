
import React from 'react';
import { LucideIcon } from 'lucide-react';
import ProgressRing from './ProgressRing';

interface StatCardProps {
  title: string;
  value: string;
  target: string;
  progress: number;
  icon: LucideIcon;
  color: 'electric' | 'neon';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, target, progress, icon: Icon, color }) => {
  const colorClasses = {
    electric: 'text-electric',
    neon: 'text-neon',
  };

  return (
    <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`${colorClasses[color]} w-6 h-6`} />
        <ProgressRing progress={progress} color={color} size={40} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <p className="text-2xl font-bold mb-1">{value}</p>
        <p className="text-xs text-gray-500">of {target}</p>
      </div>
    </div>
  );
};

export default StatCard;
