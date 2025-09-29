'use client';

import { GarageHeader } from '@/garage/components/GarageHeader';
import { CarGrid } from '@/garage/components/CarGrid';
import { AddCarModal } from '@/garage/components/AddCarModal';

export default function MyGaragePage() {
  // skeleton: no real data yet
  const demoCars = [
    { id: '1', year: 2013, make: 'Audi', model: 'S4', trim: 'B8.5', cover_url: '/placeholder.jpg' },
    { id: '2', year: 2005, make: 'Subaru', model: 'WRX', trim: 'STi', cover_url: '/placeholder.jpg' },
  ];

  return (
    <div className="p-6">
      <GarageHeader ownerView username="Demo User" />
      <div className="mt-6">
        <CarGrid cars={demoCars} />
      </div>
      <AddCarModal />
    </div>
  );
}
