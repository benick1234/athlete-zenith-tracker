
import React from 'react';
import { Droplets, Zap, Activity, Calendar, Sun, Cloud } from 'lucide-react';
import StatCard from './StatCard';
import ProgressRing from './ProgressRing';

const Dashboard = () => {
  const stats = [
    {
      title: 'Water Intake',
      value: '1.2L',
      target: '2.5L',
      progress: 48,
      icon: Droplets,
      color: 'electric',
    },
    {
      title: 'Calories',
      value: '1,850',
      target: '2,200',
      progress: 84,
      icon: Zap,
      color: 'neon',
    },
    {
      title: 'Steps',
      value: '8,432',
      target: '10,000',
      progress: 84,
      icon: Activity,
      color: 'electric',
    },
  ];

  const recentWorkouts = [
    { name: 'Sprint Training', duration: '45 min', type: 'Running', date: 'Today' },
    { name: 'Ball Control', duration: '30 min', type: 'Technical', date: 'Yesterday' },
    { name: 'Strength Training', duration: '60 min', type: 'Gym', date: '2 days ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Good morning, John!</h2>
        <p className="text-gray-400">Ready for today's training session?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Weather Card */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weather</h3>
          <div className="flex items-center space-x-2 text-electric">
            <Sun size={20} />
            <span className="text-sm">Perfect for outdoor training</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">22°C</p>
            <p className="text-gray-400 text-sm">Sunny, light breeze</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Humidity</p>
            <p className="font-semibold">65%</p>
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Workouts</h3>
          <button className="text-electric text-sm font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {recentWorkouts.map((workout, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="font-medium">{workout.name}</p>
                <p className="text-sm text-gray-400">{workout.type} • {workout.duration}</p>
              </div>
              <span className="text-xs text-gray-500">{workout.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
