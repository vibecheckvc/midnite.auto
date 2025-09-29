'use client';

type BudgetProps = {
  planned: number;
  spent: number;
};

export function BudgetBar({ planned, spent }: BudgetProps) {
  const percent = Math.min((spent / planned) * 100, 100);

  return (
    <div className="rounded-lg border bg-white/5 backdrop-blur p-4">
      <h2 className="font-semibold mb-3">Budget</h2>
      <div className="h-4 w-full bg-neutral-800 rounded overflow-hidden">
        <div
          className={`h-4 ${percent > 90 ? 'bg-red-500' : 'bg-green-500'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-neutral-400">
        Spent: <span className="text-white font-medium">${spent}</span> / Planned:{' '}
        <span className="text-white font-medium">${planned}</span>
      </p>
    </div>
  );
}

// Example usage: <BudgetBar planned={5000} spent={3200} />
