"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";

type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
};

export function GarageHeader({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-black/40 backdrop-blur p-4 shadow-lg shadow-purple-700/30">
      {profile?.avatar_url ? (
        <Image
          src={profile.avatar_url}
          alt={profile.username}
          width={56}
          height={56}
          className="rounded-full"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-purple-600" />
      )}
      <div>
        <h1 className="text-xl font-bold text-white">
          {profile?.username || "Garage Owner"}
        </h1>
        <p className="text-neutral-400 text-sm">Welcome to the garage</p>
      </div>
    </div>
  );
}
