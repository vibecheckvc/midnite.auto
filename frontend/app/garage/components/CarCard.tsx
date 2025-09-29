'use client';

type Car = {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  cover_url?: string;
};

export function CarCard({ car }: { car: Car }) {
  return (
    <div className="rounded-lg border bg-white/5 backdrop-blur overflow-hidden hover:shadow-md transition">
      <img
        src={car.cover_url || '/placeholder.jpg'}
        alt={`${car.make} ${car.model}`}
        loading="lazy"
        className="h-40 w-full object-cover"
      />
      <div className="p-3">
        <div className="font-semibold">
          {car.year} {car.make} {car.model}
        </div>
        <p className="text-sm text-neutral-400">{car.trim}</p>
      </div>
    </div>
  );
}
