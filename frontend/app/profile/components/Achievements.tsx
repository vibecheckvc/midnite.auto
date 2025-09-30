'use client';

type AchievementsProps = {
  achievements: string[];
};

export default function Achievements({ achievements }: AchievementsProps) {
  if (!achievements.length) {
    return (
      <div className="bg-neutral-900 p-4 rounded-lg border border-purple-600/40">
        <h2 className="text-lg font-semibold mb-2">Achievements</h2>
        <p className="text-gray-400 text-sm">No achievements unlocked yet…</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 p-4 rounded-lg border border-purple-600/40">
      <h2 className="text-lg font-semibold mb-3">Achievements</h2>
      <div className="flex flex-wrap gap-3">
        {achievements.map((ach, i) => (
          <div
            key={i}
            className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-fuchsia-600 to-red-600 text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            {ach}
          </div>
        ))}
      </div>
    </div>
  );
}
