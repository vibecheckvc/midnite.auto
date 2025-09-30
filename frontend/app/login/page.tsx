'use client';

import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push('/garage'); // 🚀 main app page
    }
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

      {/* Login Card */}
      <div className="w-full max-w-md bg-black/60 border border-purple-600/40 shadow-lg shadow-purple-900/60 rounded-2xl backdrop-blur-xl p-8">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-fuchsia-500 to-red-500 bg-clip-text text-transparent mb-6">
          Sign into Midnite
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer text-white font-semibold rounded-lg px-5 py-2.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-red-600 hover:shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Enter Midnite'}
          </button>

          <p className="text-sm text-gray-400 text-center">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="font-medium text-purple-400 hover:text-fuchsia-400">
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
