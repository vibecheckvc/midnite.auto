'use client';

type Activity = {
  id: string;
  type: 'like' | 'comment' | 'milestone';
  user: string;
  target: string;
  message?: string;
  created_at: string;
};

const demoActivity: Activity[] = [
  { id: '1', type: 'like', user: 'Jay', target: 'Audi S4', created_at: '2m ago' },
  { id: '2', type: 'comment', user: 'Ammar', target: 'BMW M3', message: 'Clean build bro 🔥', created_at: '10m ago' },
  { id: '3', type: 'milestone', user: 'Zayd', target: 'WRX STI', message: 'Installed new coilovers', created_at: '1h ago' },
];

export function ActivityFeed() {
  return (
    <div className="rounded-lg border bg-white/5 backdrop-blur p-4 max-h-96 overflow-y-auto">
      <h2 className="font-semibold mb-3">Activity</h2>
      <ul className="space-y-3">
        {demoActivity.map((a) => (
          <li key={a.id} className="flex gap-3 text-sm">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center">
              {a.type === 'like' && '❤️'}
              {a.type === 'comment' && '💬'}
              {a.type === 'milestone' && '⭐'}
            </div>
            <div>
              <p>
                <span className="font-medium">{a.user}</span>{' '}
                {a.type === 'like' && `liked ${a.target}`}
                {a.type === 'comment' && `commented on ${a.target}`}
                {a.type === 'milestone' && `${a.message}`}
              </p>
              <span className="text-xs text-neutral-400">{a.created_at}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
