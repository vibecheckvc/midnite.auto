'use client';

type Task = {
  id: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
};

const demoTasks: Task[] = [
  { id: '1', title: 'Order coilovers', status: 'todo' },
  { id: '2', title: 'Install intake', status: 'doing' },
  { id: '3', title: 'Schedule dyno run', status: 'done' },
];

export function TaskBoard() {
  const columns: { key: Task['status']; label: string }[] = [
    { key: 'todo', label: 'To Do' },
    { key: 'doing', label: 'In Progress' },
    { key: 'done', label: 'Done' },
  ];

  return (
    <div className="rounded-lg border bg-white/5 backdrop-blur p-4">
      <h2 className="font-semibold mb-4">Build Tasks</h2>
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.key} className="rounded-lg border p-2">
            <h3 className="text-sm font-semibold mb-2">{col.label}</h3>
            <ul className="space-y-2 text-sm">
              {demoTasks
                .filter((t) => t.status === col.key)
                .map((task) => (
                  <li
                    key={task.id}
                    className="rounded bg-neutral-800 p-2 hover:bg-neutral-700"
                  >
                    {task.title}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
