'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

import Banner from './components/Banner';

// Types
type Profile = {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
};

type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  trim?: string | null;
  mileage?: number | null;
  cover_url?: string | null;
};

type Post = {
  id: string;
  title: string;
  description?: string | null;
  image_url?: string | null;
  created_at: string;
};

type Friend = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
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

      // Profile
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

      // Cars
      const { data: carsData } = await supabase
        .from('cars')
        .select('id, make, model, year, trim, mileage, cover_url')
        .eq('user_id', user.id);
      setCars((carsData as Car[]) || []);

      // Posts
      const { data: postsData } = await supabase
        .from('builds')
        .select('id, title, description, image_url, created_at')
        .eq('user_id', user.id);
      setPosts((postsData as Post[]) || []);

      // Friends (placeholder until follow system)
      setFriends([]);

      // Achievements (placeholder until badges are wired)
      setAchievements([]);

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

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No profile found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      {/* 🔥 Banner with profile + stats */}
      <Banner
        profile={profile}
        stats={{
          cars: cars.length,
          posts: posts.length,
          followers: friends.length,
        }}
      />

      {/* Next up: wire other widgets */}
      {/* <Bio profile={profile} /> */}
      {/* <FriendsList friends={friends} /> */}
      {/* <Achievements achievements={achievements} /> */}
      {/* <PostsList posts={posts} /> */}
    </div>
  );
}
