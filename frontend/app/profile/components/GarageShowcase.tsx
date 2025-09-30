'use client';

type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string | null;
  cover_url: string | null;
};

type GarageShowcaseProps = {
  cars: Car[];
};

export default function GarageShowcase({ cars }: GarageShowcaseProps) {
  if (!cars || cars.length === 0) {
    return <p className="text-gray-400">No cars in the garage yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-black/60 backdrop-blur border border-fuchsia-700/40 rounded-xl overflow-hidden shadow-md shadow-fuchsia-900/40"
        >
          {car.cover_url && (
            <img
              src={car.cover_url}
              alt={`${car.make} ${car.model}`}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">
              {car.year} {car.make} {car.model}
            </h3>
            <p className="text-sm text-gray-400">{car.trim || 'Base'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
