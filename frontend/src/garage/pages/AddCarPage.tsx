'use client';

import { AddCarModal } from '../components/AddCarModal';

export default function AddCarPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Add a New Car</h1>
      <div className="mt-6">
        <AddCarModal />
      </div>
    </div>
  );
}
