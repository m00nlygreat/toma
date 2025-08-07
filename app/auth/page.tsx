
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Redirect to a success page or the main app
      router.push('/');
    }
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Redirect to the main app
      router.push('/');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSignUp) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            {isSignUp ? 'Create an account' : 'Sign in to your account'}
          </h2>
          <div className="mt-4 flex items-center justify-center">
            <span className="text-sm text-gray-600">{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
            <Button variant="link" onClick={toggleAuthMode}>
              {isSignUp ? 'Sign in' : 'Sign up'}
            </Button>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-tomato-red focus:outline-none focus:ring-tomato-red"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-tomato-red focus:outline-none focus:ring-tomato-red"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-tomato-red focus:outline-none focus:ring-tomato-red"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
          </div>

          <div>
            <Button type="submit" className="w-full">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div>
          <Button variant="outline" className="w-full" disabled>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
