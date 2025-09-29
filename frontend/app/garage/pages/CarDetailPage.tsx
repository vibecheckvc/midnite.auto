'use client';

import { PhotoCarousel } from '../components/PhotoCarousel';
import { SpecCard } from '../components/SpecCard';
import { BuildTimeline } from '../components/BuildTimeline';
import { PartsTable } from '../components/PartsTable';
import { TaskBoard } from '../components/TaskBoard';
import { MaintenanceWidget } from '../components/MaintenanceWidget';

export default function CarDetailPage() {
  return (
    <div className="p-6">
      <PhotoCarousel images={['/placeholder.jpg', '/placeholder.jpg']} />
      <div className="mt-6">
        <SpecCard specs={{ hp: 400, torque: 380, drivetrain: 'AWD' }} />
      </div>
      <div className="mt-6">
        <BuildTimeline />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PartsTable />
        <TaskBoard />
      </div>
      <div className="mt-6">
        <MaintenanceWidget />
      </div>
    </div>
  );
}
