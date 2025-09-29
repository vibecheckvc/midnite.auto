'use client';

type Milestone = {
  id: string;
  title: string;
  desc: string;
  date: string;
};

const demoMilestones: Milestone[] = [
  { id: '1', title: 'Bought the Car', desc: '2013 Audi S4 B8.5 Prestige', date: 'Jan 2024' },
  { id: '2', title: 'Stage 1 Tune', desc: 'Flashed with 034Motorsport ECU tune', date: 'Feb 2024' },
  { id: '3', title: 'Coilovers Installed', desc: 'Lowered on KW V3', date: 'Mar 2024' },
];

export function BuildTimeline() {
  return (
    <div className="rounded-lg border bg-white/5 backdrop-blur p-4">
      <h2 className="font-semibold mb-4">Build Timeline</h2>
      <ul className="space-y-6">
        {demoMilestones.map((m) => (
          <li key={m.id} className="flex items-start gap-4">
            <div className="h-3 w-3 rounded-full bg-indigo-500 mt-1.5" />
            <div>
              <p className="font-medium">{m.title}</p>
              <p className="text-sm text-neutral-400">{m.desc}</p>
              <span className="text-xs text-neutral-500">{m.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
