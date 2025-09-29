'use client';

import { GarageHeader } from '../components/GarageHeader';
import { CarGrid } from '../components/CarGrid';
import { ActivityFeed } from '../components/ActivityFeed';

export default function PublicGaragePage() {
  const demoCars = [
    { id: '1', year: 2020, make: 'BMW', model: 'M3', trim: 'Competition', cover_url: '/placeholder.jpg' },
  ];

  return (
    <div className="p-6">
      <GarageHeader username="Other User" />
      <div className="mt-6">
        <CarGrid cars={demoCars} />
      </div>
      <div className="mt-6">
        <ActivityFeed />
      </div>
    </div>
  );
}
