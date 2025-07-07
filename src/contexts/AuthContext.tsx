import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { speak } = useTextToSpeech();
  const hasSpokenGreeting = useRef(false);
  const hasRequestedLocation = useRef(false);

  // Get user name from email (part before @)
  const getUserName = (email: string) => {
    const name = email.split('@')[0];
    // Capitalize first letter and format nicely
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Request location permission
  const requestLocationPermission = () => {
    if (hasRequestedLocation.current || !navigator.geolocation) return;
    
    hasRequestedLocation.current = true;
    
    // Request location permission for weather updates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location permission granted for weather updates');
      },
      (error) => {
        console.log('Location permission denied:', error.message);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Speak greeting and request location when user signs in
        if (event === 'SIGNED_IN' && session?.user && !hasSpokenGreeting.current) {
          hasSpokenGreeting.current = true;
          const userName = getUserName(session.user.email || 'Footballer');
          const greeting = getGreeting();
          const message = `Welcome back, ${userName}! ${greeting}! How are you feeling today?`;
          
          // Delay the speech and location request slightly
          setTimeout(() => {
            speak(message);
            requestLocationPermission();
          }, 1000);
        }

        // Reset flags when user signs out
        if (event === 'SIGNED_OUT') {
          hasSpokenGreeting.current = false;
          hasRequestedLocation.current = false;
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [speak]);

  const signOut = async () => {
    hasSpokenGreeting.current = false;
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
