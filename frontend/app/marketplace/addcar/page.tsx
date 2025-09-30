'use client';
import AddCarForm from '../components/addcar';
import { useRouter } from 'next/navigation';

export default function AddCarPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Add a Car</h1>
      <AddCarForm />
      <button
        className="mt-4 text-white underline"
        onClick={() => router.push('/marketplace')}
      >
        Back to Marketplace
      </button>
    </div>
  );
}
