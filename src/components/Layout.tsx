
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/training':
        return 'Training';
      case '/wellness':
        return 'Wellness';
      case '/progress':
        return 'Progress';
      case '/profile':
        return 'Profile';
      default:
        return 'FitFootball';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Bar */}
      <header className="glass border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">{getPageTitle()}</h1>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-electric to-neon flex items-center justify-center">
            <span className="text-black font-bold text-sm">JD</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Layout;
