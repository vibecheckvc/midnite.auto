'use client';

type GarageHeaderProps = {
  username: string;
  ownerView?: boolean;
};

export function GarageHeader({ username, ownerView = false }: GarageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border bg-white/5 backdrop-blur p-4">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-neutral-700 flex items-center justify-center text-xl font-bold">
          {username[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-semibold">{username}’s Garage</h1>
          <p className="text-sm text-neutral-400">2 Cars • 150 Followers</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex gap-3">
        {ownerView ? (
          <button className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            Edit Profile
          </button>
        ) : (
          <>
            <button className="rounded bg-neutral-700 px-4 py-2 text-white hover:bg-neutral-600">
              Follow
            </button>
            <button className="rounded border border-neutral-600 px-4 py-2 text-white hover:bg-neutral-700">
              Share
            </button>
          </>
        )}
      </div>
    </div>
  );
}
