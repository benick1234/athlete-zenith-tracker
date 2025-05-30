
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Heart, TrendingUp, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/training', icon: Dumbbell, label: 'Training' },
    { path: '/wellness', icon: Heart, label: 'Wellness' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-6 py-3">
      <div className="flex justify-around items-center">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-electric scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]' : ''} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
