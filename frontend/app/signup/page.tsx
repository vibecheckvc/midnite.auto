'use client';

import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (error.message.includes('User already registered')) {
        alert('That email is already in use. Please log in instead.');
        router.push('/login');
      } else {
        alert(error.message);
      }
      setLoading(false);
      return;
    }

    setLoading(false);
    alert('✅ Check your email for confirmation!');
    router.push('/login');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Neon Grid Background */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(128,0,128,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,0,128,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-black/60 border border-purple-600/40 shadow-lg shadow-purple-900/60 rounded-2xl backdrop-blur-xl p-8">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-fuchsia-500 to-red-500 bg-clip-text text-transparent mb-6">
          Join Midnite
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@midnite.com"
              required
              className="w-full rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 caret-purple-400 px-3 py-2.5"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 caret-purple-400 px-3 py-2.5"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 caret-purple-400 px-3 py-2.5"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-600 rounded bg-neutral-900 focus:ring-2 focus:ring-purple-500"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
              I accept the{' '}
              <a href="#" className="font-medium text-purple-400 hover:text-fuchsia-400">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer text-white font-semibold rounded-lg px-5 py-2.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-red-600 hover:shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Join Midnite'}
          </button>

          <p className="text-sm text-gray-400 text-center">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-purple-400 hover:text-fuchsia-400">
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
