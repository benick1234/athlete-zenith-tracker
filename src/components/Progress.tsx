
import React, { useState } from 'react';
import { TrendingUp, Calendar, Award, Target } from 'lucide-react';

const Progress = () => {
  const [activeView, setActiveView] = useState('week');

  const timeframes = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  const achievements = [
    { name: 'Hydration Hero', description: 'Reached daily water goal 7 days in a row', earned: true, icon: '💧' },
    { name: 'Training Beast', description: 'Completed 20 training sessions', earned: true, icon: '🏆' },
    { name: 'Step Master', description: 'Walked 10,000 steps daily for a week', earned: false, icon: '👟' },
    { name: 'Nutrition Pro', description: 'Met macro goals for 5 days', earned: false, icon: '🥗' },
  ];

  const weeklyStats = [
    { day: 'Mon', training: 60, water: 85, steps: 92 },
    { day: 'Tue', training: 45, water: 90, steps: 78 },
    { day: 'Wed', training: 75, water: 95, steps: 85 },
    { day: 'Thu', training: 30, water: 80, steps: 88 },
    { day: 'Fri', training: 90, water: 100, steps: 95 },
    { day: 'Sat', training: 60, water: 75, steps: 82 },
    { day: 'Sun', training: 0, water: 70, steps: 60 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Progress Tracking</h2>
        <p className="text-gray-400">See how you're improving over time</p>
      </div>

      {/* Time Selector */}
      <div className="flex space-x-2">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe.id}
            onClick={() => setActiveView(timeframe.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeView === timeframe.id
                ? 'bg-electric text-black'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            {timeframe.label}
          </button>
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-electric" size={20} />
          Weekly Overview
        </h3>
        <div className="space-y-4">
          {/* Chart */}
          <div className="flex items-end justify-between h-40 bg-black/20 rounded-lg p-4">
            {weeklyStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  <div 
                    className="w-4 bg-electric rounded-t" 
                    style={{ height: `${stat.training}px` }}
                  ></div>
                  <div 
                    className="w-4 bg-neon" 
                    style={{ height: `${stat.water}px` }}
                  ></div>
                  <div 
                    className="w-4 bg-yellow-400 rounded-b" 
                    style={{ height: `${stat.steps}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">{stat.day}</span>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-electric rounded"></div>
              <span className="text-sm">Training</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-neon rounded"></div>
              <span className="text-sm">Water</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded"></div>
              <span className="text-sm">Steps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6 text-center">
          <Calendar className="mx-auto mb-2 text-electric" size={24} />
          <p className="text-2xl font-bold">15</p>
          <p className="text-sm text-gray-400">Training Days</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <Target className="mx-auto mb-2 text-neon" size={24} />
          <p className="text-2xl font-bold">85%</p>
          <p className="text-sm text-gray-400">Goal Completion</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <TrendingUp className="mx-auto mb-2 text-yellow-400" size={24} />
          <p className="text-2xl font-bold">+12%</p>
          <p className="text-sm text-gray-400">Performance</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <Award className="mr-2 text-electric" size={20} />
          <h3 className="font-semibold">Achievements</h3>
        </div>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement.earned 
                  ? 'bg-electric/10 border-electric/30' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.earned ? 'text-electric' : 'text-gray-300'}`}>
                    {achievement.name}
                  </h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <Award className="text-electric" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
