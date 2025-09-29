'use client';

import { CarCard } from './CarCard';

type Car = {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  cover_url?: string;
};

type CarGridProps = {
  cars: Car[];
};

export function CarGrid({ cars }: CarGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
