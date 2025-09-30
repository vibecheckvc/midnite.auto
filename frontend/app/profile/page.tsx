'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

// components
import Banner from './components/Banner';
import Bio from './components/Bio';
import FriendsList from './components/FriendsList';
import Achievements from './components/Achievements';
import GarageShowcase from './components/GarageShowcase';
import PostsFeed from './components/PostsFeed';

// Types
type Profile = {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push('/login');
        return;
      }

      setUserId(user.id);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url, bio')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError.message);
      } else {
        setProfile(profileData);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading profile…
      </div>
    );
  }

  if (!profile || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No profile found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      {/* Banner at top */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <Banner
          profile={profile}
          stats={{
            cars: 0,
            posts: 0,
            followers: 0,
          }}
        />
      </section>

      {/* Grid layout */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="space-y-8">
          {/* Bio */}
          <div className="bg-black/40 rounded-2xl border border-purple-600/30 shadow-lg shadow-purple-900/40 backdrop-blur-md p-6">
            <h2 className="text-lg font-bold text-purple-400 mb-3">About</h2>
            <Bio profile={profile} />
          </div>

          {/* Garage */}
          <div className="bg-black/40 rounded-2xl border border-purple-600/30 shadow-lg shadow-purple-900/40 backdrop-blur-md p-6">
            <h2 className="text-lg font-bold text-purple-400 mb-3">Garage</h2>
            <GarageShowcase userId={userId} />
          </div>

          {/* Achievements */}
          <div className="bg-black/40 rounded-2xl border border-purple-600/30 shadow-lg shadow-purple-900/40 backdrop-blur-md p-6">
            <h2 className="text-lg font-bold text-purple-400 mb-3">Achievements</h2>
            <Achievements userId={userId} />
          </div>
        </div>

        {/* Right column (posts + friends) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Posts */}
          <div className="bg-black/40 rounded-2xl border border-purple-600/30 shadow-lg shadow-purple-900/40 backdrop-blur-md p-6">
            <h2 className="text-lg font-bold text-purple-400 mb-3">Posts</h2>
            <PostsFeed userId={userId} />
          </div>

          {/* Friends */}
          <div className="bg-black/40 rounded-2xl border border-purple-600/30 shadow-lg shadow-purple-900/40 backdrop-blur-md p-6">
            <h2 className="text-lg font-bold text-purple-400 mb-3">Friends</h2>
            <FriendsList userId={userId} />
          </div>
        </div>
      </section>
    </div>
  );
}
