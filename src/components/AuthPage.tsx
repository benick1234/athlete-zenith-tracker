
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Trophy, ArrowLeft } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth?reset=true`,
        });
        
        if (error) throw error;
        
        toast({
          title: "Reset link sent!",
          description: "Check your email for the password reset link.",
        });
        
        setIsForgotPassword(false);
      } else if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFormTitle = () => {
    if (isForgotPassword) return 'Reset Password';
    return isLogin ? 'Welcome back, footballer!' : 'Join the football community';
  };

  const getButtonText = () => {
    if (loading) {
      if (isForgotPassword) return 'Sending reset link...';
      return isLogin ? 'Signing in...' : 'Creating account...';
    }
    if (isForgotPassword) return 'Send Reset Link';
    return isLogin ? 'Sign In' : 'Create Account';
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-electric to-neon flex items-center justify-center">
            <Trophy className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold mb-2">FitFootball</h1>
          <p className="text-gray-400">{getFormTitle()}</p>
        </div>

        {/* Auth Form */}
        <div className="glass rounded-2xl p-6">
          {isForgotPassword && (
            <button
              onClick={() => setIsForgotPassword(false)}
              className="flex items-center text-electric hover:text-neon transition-colors mb-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to login
            </button>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            {!isForgotPassword && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            )}

            {!isLogin && !isForgotPassword && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-electric to-neon text-black font-semibold hover:opacity-90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {getButtonText()}
                </>
              ) : (
                getButtonText()
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {!isForgotPassword && isLogin && (
              <button
                onClick={() => setIsForgotPassword(true)}
                className="block w-full text-gray-400 hover:text-electric transition-colors text-sm"
              >
                Forgot your password?
              </button>
            )}
            
            {!isForgotPassword && (
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-electric hover:text-neon transition-colors"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
