'use client';
import AddCarPartForm from '../components/addcarparts';
import { useRouter } from 'next/navigation';

export default function AddCarPartPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Add a Car Part</h1>
      <AddCarPartForm />
      <button
        className="mt-4 text-white underline"
        onClick={() => router.push('/marketplace')}
      >
        Back to Marketplace
      </button>
    </div>
  );
}
