"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signUp, signInWithOAuth } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signUp(email, password, fullName);
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Check your email!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We've sent you a confirmation link. Click the link in your email to complete your registration.
          </p>
          <Link 
            href="/auth/login" 
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <UserPlus className="h-10 w-10 text-indigo-600 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join the Journey</h1>
          <p className="text-gray-600 dark:text-gray-300">Create your account to start your transformation</p>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => signInWithOAuth('google')}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 px-4 shadow hover:bg-gray-50 transition-colors mb-4"
          >
            <FcGoogle className="h-5 w-5" />
            <span className="text-gray-700 font-medium">Sign up with Google</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white pl-10"
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white pl-10"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white pl-10"
                placeholder="Create a password"
                required
                disabled={loading}
                minLength={6}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400 pointer-events-none" />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
} 