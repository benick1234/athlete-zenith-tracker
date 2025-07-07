import React, { useState } from 'react';
import { Droplets, Utensils, Activity, Plus, RotateCcw } from 'lucide-react';
import ProgressRing from './ProgressRing';
import WaterHistoryTable from './WaterHistoryTable';
import { useDailyTracking } from '@/hooks/useDailyTracking';
import { Button } from './ui/button';

const Wellness = () => {
  const [activeTab, setActiveTab] = useState('water');
  const { trackingData, goals, waterHistory, updateTrackingData, resetWaterIntake } = useDailyTracking();

  const tabs = [
    { id: 'water', label: 'Water', icon: Droplets },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  const quickAddAmounts = [250, 500, 750, 1000];

  const handleAddWater = (amount: number) => {
    const newAmount = Math.min(trackingData.water_intake + amount, goals.daily_water_goal);
    updateTrackingData('water_intake', newAmount);
  };

  const handleResetWater = () => {
    resetWaterIntake();
  };

  const macros = {
    carbs: { value: 180, target: 250, color: 'electric' },
    protein: { value: 120, target: 150, color: 'neon' },
    fat: { value: 65, target: 80, color: 'yellow-400' },
  };

  const renderWaterTab = () => (
    <div className="space-y-6">
      {/* Water Progress */}
      <div className="glass rounded-2xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <ProgressRing 
            progress={(trackingData.water_intake / goals.daily_water_goal) * 100} 
            color="electric" 
            size={120} 
          />
        </div>
        <h3 className="text-2xl font-bold mb-2">{trackingData.water_intake}ml</h3>
        <p className="text-gray-400">of {goals.daily_water_goal}ml daily goal</p>
        <p className="text-neon font-semibold mt-2">
          {(trackingData.water_intake / 1000).toFixed(1)}L consumed today
        </p>
      </div>

      {/* Quick Add Buttons */}
      <div className="glass rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">Quick Add</h4>
          <Button
            onClick={handleResetWater}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-red-400"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickAddAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAddWater(amount)}
              className="bg-electric/20 hover:bg-electric/30 border border-electric/30 text-electric p-4 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Droplets size={20} className="mx-auto mb-2" />
              <span className="text-sm font-medium">{amount}ml</span>
            </button>
          ))}
        </div>
      </div>

      {/* Water History Table */}
      <WaterHistoryTable history={waterHistory} />
    </div>
  );

  const renderNutritionTab = () => (
    <div className="space-y-6">
      {/* Calories Progress */}
      <div className="glass rounded-2xl p-6">
        <h4 className="font-semibold mb-4">Today's Calories</h4>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold">{trackingData.calories_consumed}</p>
            <p className="text-gray-400 text-sm">of {goals.daily_calorie_goal} goal</p>
          </div>
          <ProgressRing 
            progress={(trackingData.calories_consumed / goals.daily_calorie_goal) * 100} 
            color="neon" 
            size={80} 
          />
        </div>
      </div>

      {/* Macros */}
      <div className="glass rounded-2xl p-6">
        <h4 className="font-semibold mb-4">Today's Macros</h4>
        <div className="space-y-4">
          {Object.entries(macros).map(([key, macro]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full bg-${macro.color}`}></div>
                <span className="capitalize font-medium">{key}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold">{macro.value}g</span>
                <span className="text-gray-400 text-sm"> / {macro.target}g</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Meals */}
      <div className="glass rounded-2xl p-6">
        <h4 className="font-semibold mb-4">Recent Meals</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="font-medium">Chicken Salad</p>
              <p className="text-sm text-gray-400">Lunch • 420 cal</p>
            </div>
            <span className="text-neon text-sm">2h ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="font-medium">Protein Shake</p>
              <p className="text-sm text-gray-400">Snack • 180 cal</p>
            </div>
            <span className="text-neon text-sm">4h ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      {/* Steps */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Steps Today</h4>
          <Activity className="text-electric" size={20} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{trackingData.steps_taken.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">of {goals.daily_steps_goal.toLocaleString()} goal</p>
          </div>
          <ProgressRing 
            progress={(trackingData.steps_taken / goals.daily_steps_goal) * 100} 
            color="electric" 
            size={80} 
          />
        </div>
      </div>

      {/* Calories Burned */}
      <div className="glass rounded-2xl p-6">
        <h4 className="font-semibold mb-4">Calories Burned</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Active Calories</span>
            <span className="font-semibold text-neon">420 cal</span>
          </div>
          <div className="flex justify-between">
            <span>Total Calories</span>
            <span className="font-semibold">{trackingData.calories_consumed} cal</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Wellness Tracking</h2>
        <p className="text-gray-400">Monitor your health and nutrition</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-electric text-black'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'water' && renderWaterTab()}
      {activeTab === 'nutrition' && renderNutritionTab()}
      {activeTab === 'activity' && renderActivityTab()}

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 bg-gradient-to-r from-electric to-neon p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-200">
        <Plus size={24} className="text-black" />
      </button>
    </div>
  );
};

export default Wellness;
