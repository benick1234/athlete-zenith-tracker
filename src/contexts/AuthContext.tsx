
import React, { createContext, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const previousUser = user;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Speak greeting when user signs in (not on initial load or token refresh)
        if (event === 'SIGNED_IN' && session?.user && !previousUser) {
          const userName = getUserName(session.user.email || 'Footballer');
          const greeting = getGreeting();
          const message = `Welcome back, ${userName}! ${greeting}! How are you feeling today?`;
          
          // Delay the speech slightly to ensure the UI has loaded
          setTimeout(() => {
            speak(message);
          }, 1000);
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
  }, [speak, user]);

  const signOut = async () => {
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
