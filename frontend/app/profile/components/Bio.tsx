'use client';

type BioProps = {
  profile: {
    bio: string | null;
    full_name: string | null;
  };
};

export default function Bio({ profile }: BioProps) {
  return (
    <div className="bg-black/60 backdrop-blur border border-purple-700/40 rounded-xl p-6 shadow-lg shadow-purple-900/40">
      <h2 className="text-lg font-bold text-purple-400 mb-2">About</h2>
      <p className="text-gray-300">
        {profile?.bio || 'This racer hasn’t written a bio yet…'}
      </p>
    </div>
  );
}
