"use client";

import Image from "next/image";

type BioProps = {
  profile: {
    username: string | null;
    full_name: string | null;
    bio: string | null;
    avatar_url: string | null;
  };
};

export default function Bio({ profile }: BioProps) {
  return (
    <div className="rounded-xl bg-neutral-900/60 border border-purple-700/30 shadow-md shadow-purple-900/40 p-6">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative w-20 h-20">
          <Image
            src={profile.avatar_url || "/default-avatar.png"}
            alt={profile.username || "User avatar"}
            fill
            className="rounded-full border-2 border-purple-500 object-cover"
            priority // helps LCP, loads fast
          />
        </div>

        {/* Name + Username */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            {profile.full_name || profile.username || "Unnamed Driver"}
          </h2>
          {profile.username && (
            <p className="text-sm text-gray-400">@{profile.username}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <p className="mt-4 text-gray-300 leading-relaxed">{profile.bio}</p>
      )}
    </div>
  );
}
