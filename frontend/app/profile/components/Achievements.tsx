'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

type AchievementsProps = {
  userId: string;
};

export default function Achievements({ userId }: AchievementsProps) {
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('title')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching achievements:', error.message);
        return;
      }

      setAchievements(data?.map((a) => a.title) || []);
    };

    fetchAchievements();
  }, [userId]);

  if (!achievements.length) {
    return (
      <div className="bg-neutral-900 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Achievements</h2>
        <p className="text-gray-400">No achievements yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">Achievements</h2>
      <ul className="space-y-2">
        {achievements.map((ach, i) => (
          <li
            key={i}
            className="px-3 py-2 rounded bg-gradient-to-r from-purple-600 via-fuchsia-600 to-red-600 text-white shadow"
          >
            {ach}
          </li>
        ))}
      </ul>
    </div>
  );
}
