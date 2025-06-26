
import React, { useState } from 'react';
import { LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface AuthSectionProps {
  isAuthenticated: boolean;
  onAuthChange: (authenticated: boolean) => void;
}

export const AuthSection: React.FC<AuthSectionProps> = ({ isAuthenticated, onAuthChange }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication - replace with actual Supabase integration
    setTimeout(() => {
      if (email && password) {
        onAuthChange(true);
        toast(`Successfully ${isLogin ? 'signed in' : 'signed up'}! Welcome to AR Camera.`);
      } else {
        toast("Please fill in all fields.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    onAuthChange(false);
    setEmail('');
    setPassword('');
    toast("Successfully logged out.");
  };

  if (isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white w-fit">
            <User size={24} />
          </div>
          <CardTitle className="text-green-800">Welcome Back!</CardTitle>
          <CardDescription className="text-green-600">
            You're logged in and ready to capture AR photos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="w-full border-green-300 text-green-700 hover:bg-green-100"
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white w-fit">
          <LogIn size={24} />
        </div>
        <CardTitle className="text-white">
          {isLogin ? 'Sign In' : 'Create Account'}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {isLogin 
            ? 'Welcome back! Sign in to access your AR camera.' 
            : 'Join us to start your AR photography journey.'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-full transition-all duration-200"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
