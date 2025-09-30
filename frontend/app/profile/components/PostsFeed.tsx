'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Image from 'next/image';

type Post = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

export default function PostsFeed({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('builds')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error.message);
        return;
      }

      setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();

    // 🔥 realtime updates for posts
    const channel = supabase
      .channel('builds-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'builds' },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  if (loading) {
    return <p className="text-gray-400">Loading posts…</p>;
  }

  if (!posts.length) {
    return (
      <div className="bg-neutral-900 p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-400">No posts yet. Share your first build!</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Your Posts</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700 hover:shadow-lg hover:shadow-purple-600/40 transition"
          >
            {post.image_url ? (
              <Image
                src={post.image_url}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-60 object-cover"
              />
            ) : (
              <div className="w-full h-60 bg-neutral-700 flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}

            <div className="p-4 space-y-1">
              <h3 className="text-white font-semibold">{post.title}</h3>
              {post.description && (
                <p className="text-gray-400 text-sm">{post.description}</p>
              )}
              <p className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
            