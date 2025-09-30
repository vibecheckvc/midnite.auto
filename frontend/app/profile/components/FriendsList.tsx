'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Image from 'next/image';

type FriendProfile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

type FriendRow = {
  id: string;
  status: string;
  profiles: FriendProfile | FriendProfile[] | null;
};

export default function FriendsList({ userId }: { userId: string }) {
  const [friends, setFriends] = useState<FriendProfile[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const { data, error } = await supabase
        .from('friends')
        .select(
          `
          id,
          status,
          profiles:friend_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `
        )
        .eq('user_id', userId)
        .eq('status', 'accepted');

      if (error) {
        console.error('Error fetching friends:', error.message);
        return;
      }

      // Safely flatten results
      const mapped: FriendProfile[] =
        (data as FriendRow[]).map((f) => {
          if (Array.isArray(f.profiles)) return f.profiles[0];
          return f.profiles;
        }).filter((p): p is FriendProfile => p !== null);

      setFriends(mapped);
    };

    fetchFriends();

    // realtime sub
    const channel = supabase
      .channel('realtime-friends')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'friends' },
        () => {
          fetchFriends();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return (
    <div className="bg-neutral-900 p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Friends</h2>
      {friends.length === 0 ? (
        <p className="text-gray-400">No friends yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {friends.map((f) => (
            <div
              key={f.id}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={f.avatar_url || '/default-avatar.png'}
                alt={f.username || 'Friend'}
                width={40}
                height={40}
                className="rounded-full border border-purple-500"
              />
              <p className="mt-2 text-sm text-white">
                {f.username || 'Unknown'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
