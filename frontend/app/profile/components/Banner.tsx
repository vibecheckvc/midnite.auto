'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

type BannerProps = {
  profile: {
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    bio: string | null;
  };
  stats: {
    followers: number;
    cars: number;
    posts: number;
  };
};

export default function Banner({ profile, stats }: BannerProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        username: form.username,
        full_name: form.full_name,
        avatar_url: form.avatar_url,
        bio: form.bio,
      })
      .eq('id', user.id);

    if (error) {
      alert('❌ Failed to update: ' + error.message);
    } else {
      alert('✅ Profile updated!');
      setEditing(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 via-fuchsia-700 to-red-600 rounded-xl p-6 shadow-lg relative">
      <div className="flex items-center space-x-4">
        <img
          src={profile.avatar_url || '/default-avatar.png'}
          alt="avatar"
          className="w-20 h-20 rounded-full border-2 border-white shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          <p className="text-gray-200">{profile.full_name}</p>
          <p className="text-sm text-gray-300 mt-1">{profile.bio}</p>
          <div className="flex gap-6 mt-3 text-sm text-white">
            <span>🚗 {stats.cars} Cars</span>
            <span>🛠️ {stats.posts} Posts</span>
            <span>🤝 {stats.followers} Followers</span>
          </div>
        </div>
      </div>

      {/* Edit button */}
      <button
        onClick={() => setEditing(true)}
        className="absolute top-4 right-4 bg-black/40 border border-white/20 px-3 py-1 rounded-lg text-sm hover:bg-white/10"
      >
        Edit Profile
      </button>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-white">Edit Profile</h2>

            <input
              type="text"
              placeholder="Username"
              value={form.username || ''}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white"
            />

            <input
              type="text"
              placeholder="Full Name"
              value={form.full_name || ''}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white"
            />

            <input
              type="text"
              placeholder="Avatar URL"
              value={form.avatar_url || ''}
              onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
              className="w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white"
            />

            <textarea
              placeholder="Bio"
              value={form.bio || ''}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-red-600 rounded-lg text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
