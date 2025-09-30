'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Image from 'next/image';

type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string | null;
  cover_url: string | null;
  mileage: number | null;
};

export default function GarageShowcase({ userId }: { userId: string }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching cars:', error.message);
        return;
      }

      setCars(data || []);
      setLoading(false);
    };

    fetchCars();

    // Realtime updates for garage
    const channel = supabase
      .channel('cars-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cars' },
        () => {
          fetchCars();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  if (loading) {
    return <p className="text-gray-400">Loading garage…</p>;
  }

  if (!cars.length) {
    return (
      <div className="bg-neutral-900 p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-400">No cars in your garage yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Your Garage</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700 hover:shadow-lg hover:shadow-purple-600/40 transition"
          >
            {car.cover_url ? (
              <Image
                src={car.cover_url}
                alt={`${car.make} ${car.model}`}
                width={400}
                height={250}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-neutral-700 flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}

            <div className="p-4 space-y-1">
              <h3 className="text-white font-semibold">
                {car.year} {car.make} {car.model}
              </h3>
              {car.trim && <p className="text-gray-400 text-sm">{car.trim}</p>}
              {car.mileage !== null && (
                <p className="text-gray-500 text-xs">Mileage: {car.mileage} km</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
