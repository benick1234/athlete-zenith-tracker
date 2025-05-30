
import React from 'react';
import { Settings, Target, Smartphone, Award, ChevronRight } from 'lucide-react';

const Profile = () => {
  const playerInfo = {
    name: 'John Doe',
    position: 'Midfielder',
    team: 'FC Warriors',
    age: 24,
    height: '180 cm',
    weight: '75 kg',
  };

  const weeklyGoals = [
    { category: 'Water Intake', current: '17.5L', target: '17.5L', progress: 100 },
    { category: 'Training Hours', current: '6.5h', target: '8h', progress: 81 },
    { category: 'Steps', current: '68K', target: '70K', progress: 97 },
  ];

  const connectedDevices = [
    { name: 'Smart Water Bottle', status: 'Connected', icon: '💧' },
    { name: 'Fitness Tracker', status: 'Connected', icon: '⌚' },
    { name: 'Smart Scale', status: 'Disconnected', icon: '⚖️' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-electric to-neon flex items-center justify-center">
            <span className="text-black font-bold text-2xl">JD</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{playerInfo.name}</h2>
            <p className="text-gray-400">{playerInfo.position} • {playerInfo.team}</p>
          </div>
          <button className="text-gray-400 hover:text-white">
            <Settings size={24} />
          </button>
        </div>
        
        {/* Player Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold">{playerInfo.age}</p>
            <p className="text-sm text-gray-400">Age</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{playerInfo.height}</p>
            <p className="text-sm text-gray-400">Height</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{playerInfo.weight}</p>
            <p className="text-sm text-gray-400">Weight</p>
          </div>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <Target className="mr-2 text-electric" size={20} />
          <h3 className="font-semibold">Weekly Goals</h3>
        </div>
        <div className="space-y-4">
          {weeklyGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.category}</span>
                <span className="text-sm text-gray-400">{goal.current} / {goal.target}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-electric to-neon h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Devices */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <Smartphone className="mr-2 text-electric" size={20} />
          <h3 className="font-semibold">Connected Devices</h3>
        </div>
        <div className="space-y-3">
          {connectedDevices.map((device, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{device.icon}</span>
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className={`text-sm ${device.status === 'Connected' ? 'text-neon' : 'text-gray-400'}`}>
                    {device.status}
                  </p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Summary */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Award className="mr-2 text-electric" size={20} />
            <h3 className="font-semibold">Achievements</h3>
          </div>
          <span className="text-sm text-gray-400">View All</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-electric">12</p>
            <p className="text-sm text-gray-400">Earned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-neon">8</p>
            <p className="text-sm text-gray-400">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">20</p>
            <p className="text-sm text-gray-400">Total</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
