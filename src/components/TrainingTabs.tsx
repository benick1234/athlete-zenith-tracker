
import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TrainingTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TrainingTabs = ({ tabs, activeTab, onTabChange }: TrainingTabsProps) => {
  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
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
  );
};

export default TrainingTabs;
