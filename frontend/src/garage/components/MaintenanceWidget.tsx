'use client';

type Maintenance = {
  id: string;
  type: string;
  date: string;
  odo: number;
  notes?: string;
};

const demoLogs: Maintenance[] = [
  { id: '1', type: 'Oil Change', date: '2024-01-15', odo: 82000, notes: 'LiquiMoly 5W40' },
  { id: '2', type: 'Brake Pads', date: '2024-02-20', odo: 83000, notes: 'Hawk HPS' },
];

export function MaintenanceWidget() {
  return (
    <div className="rounded-lg border bg-white/5 backdrop-blur p-4">
      <h2 className="font-semibold mb-3">Maintenance Logs</h2>
      <ul className="space-y-3 text-sm">
        {demoLogs.map((log) => (
          <li key={log.id} className="rounded-lg bg-neutral-800 p-3">
            <div className="flex justify-between">
              <p className="font-medium">{log.type}</p>
              <span className="text-xs text-neutral-400">{log.date}</span>
            </div>
            <p className="text-neutral-400">Odo: {log.odo.toLocaleString()} km</p>
            {log.notes && <p className="text-xs text-neutral-500">{log.notes}</p>}
          </li>
        ))}
      </ul>

      <button className="mt-4 w-full rounded bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700">
        + Add Log
      </button>
    </div>
  );
}
