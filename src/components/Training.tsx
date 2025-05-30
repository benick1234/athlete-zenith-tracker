
import React, { useState } from 'react';
import { Play, Clock, Zap } from 'lucide-react';

const Training = () => {
  const [activeTab, setActiveTab] = useState('running');

  const tabs = [
    { id: 'leg-work', label: 'Leg Work' },
    { id: 'running', label: 'Running' },
    { id: 'shooting', label: 'Shooting' },
    { id: 'custom', label: 'Custom' },
  ];

  const exercises = {
    'leg-work': [
      { name: 'Squats', duration: '3 sets x 12 reps', difficulty: 'Medium', icon: '🦵' },
      { name: 'Lunges', duration: '3 sets x 10 each leg', difficulty: 'Medium', icon: '🏃‍♂️' },
      { name: 'Calf Raises', duration: '3 sets x 15 reps', difficulty: 'Easy', icon: '⬆️' },
    ],
    'running': [
      { name: 'Sprint Intervals', duration: '20 minutes', difficulty: 'Hard', icon: '⚡' },
      { name: 'Long Distance', duration: '45 minutes', difficulty: 'Medium', icon: '🏃‍♂️' },
      { name: 'Hill Sprints', duration: '15 minutes', difficulty: 'Hard', icon: '⛰️' },
    ],
    'shooting': [
      { name: 'Target Practice', duration: '30 minutes', difficulty: 'Medium', icon: '🎯' },
      { name: 'Moving Shots', duration: '25 minutes', difficulty: 'Hard', icon: '⚽' },
      { name: 'Free Kicks', duration: '20 minutes', difficulty: 'Medium', icon: '🥅' },
    ],
    'custom': [
      { name: 'Agility Ladder', duration: '15 minutes', difficulty: 'Medium', icon: '🪜' },
      { name: 'Cone Drills', duration: '20 minutes', difficulty: 'Easy', icon: '🚧' },
      { name: 'Ball Juggling', duration: '10 minutes', difficulty: 'Easy', icon: '⚽' },
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
                    <span className="text-sm text-gray-400">{exercise.duration}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                      <span className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-electric hover:bg-electric/80 text-black p-3 rounded-full transition-all duration-200 hover:scale-105">
                <Play size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 bg-gradient-to-r from-electric to-neon p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-200">
        <Zap size={24} className="text-black" />
      </button>
    </div>
  );
};

export default Training;
