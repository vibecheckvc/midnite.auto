"use client";

import Image from "next/image";

type Car = {
  id: string;
  user_id: string;
  year: number;
  make: string;
  model: string;
  trim: string | null;
  cover_url: string | null;
};

export function CarCard({ car }: { car: Car }) {
  return (
    <div className="rounded-lg overflow-hidden border bg-black/40 backdrop-blur shadow-lg shadow-purple-700/30 hover:scale-[1.02] transition-transform duration-200">
      {car.cover_url ? (
        <Image
          src={car.cover_url}
          alt={`${car.year} ${car.make} ${car.model}`}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-r from-red-500 to-purple-600" />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-white">
          {car.year} {car.make} {car.model}
        </h3>
        {car.trim && <p className="text-neutral-400 text-sm">{car.trim}</p>}
      </div>
    </div>
  );
}
