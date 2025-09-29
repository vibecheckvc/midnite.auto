'use client';

type Part = {
  id: string;
  name: string;
  vendor?: string;
  price?: number;
  status: 'wishlist' | 'ordered' | 'installed';
};

const demoParts: Part[] = [
  { id: '1', name: 'KW V3 Coilovers', vendor: 'ECS Tuning', price: 2200, status: 'installed' },
  { id: '2', name: 'CTS Turbo Intake', vendor: 'CTS Turbo', price: 350, status: 'ordered' },
  { id: '3', name: 'APR Exhaust', vendor: 'APR', price: 1800, status: 'wishlist' },
];

export function PartsTable() {
  return (
    <div className="rounded-lg border bg-white/5 backdrop-blur p-4">
      <h2 className="font-semibold mb-4">Parts</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-400 border-b border-neutral-700">
            <th className="py-2">Part</th>
            <th className="py-2">Vendor</th>
            <th className="py-2">Price</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {demoParts.map((part) => (
            <tr key={part.id} className="border-b border-neutral-800">
              <td className="py-2">{part.name}</td>
              <td className="py-2">{part.vendor || '-'}</td>
              <td className="py-2">${part.price?.toLocaleString() || '-'}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    part.status === 'wishlist'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : part.status === 'ordered'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {part.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
