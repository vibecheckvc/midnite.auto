"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";

type CarPhoto = {
  id: string;
  car_id: string;
  url: string;
  caption?: string | null;
  created_at?: string;
};

export function PhotoCarousel({ carId }: { carId: string }) {
  const [photos, setPhotos] = useState<CarPhoto[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("car_photos")
        .select("id, car_id, url, caption, created_at")
        .eq("car_id", carId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching photos:", error.message);
      } else {
        setPhotos(data || []);
        setIndex(0); // reset index when loading
      }
    };

    fetchPhotos();

    // realtime updates
    const channel = supabase
      .channel(`car_photos_${carId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "car_photos", filter: `car_id=eq.${carId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPhotos((prev) => [payload.new as CarPhoto, ...prev]);
          }
          if (payload.eventType === "DELETE") {
            setPhotos((prev) => prev.filter((p) => p.id !== (payload.old as CarPhoto).id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [carId]);

  const prev = () => {
    setIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === photos.length - 1 ? 0 : i + 1));
  };

  if (photos.length === 0) {
    return (
      <div className="midnite-card">
        <h2 className="font-semibold text-white mb-2">Photos</h2>
        <p className="text-neutral-400">No photos uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="midnite-card relative">
      <h2 className="font-semibold text-white mb-2">Photos</h2>
      <div className="relative w-full h-64 overflow-hidden rounded-lg">
        <Image
          src={photos[index].url}
          alt={photos[index].caption || `Photo ${index + 1}`}
          fill
          priority
          className="object-cover rounded-lg"
        />
        {/* Left button */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/60 hover:bg-black/80 transition text-white px-3 py-2 rounded-full shadow-lg"
        >
          ‹
        </button>
        {/* Right button */}
        <button
          onClick={next}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/60 hover:bg-black/80 transition text-white px-3 py-2 rounded-full shadow-lg"
        >
          ›
        </button>
      </div>
      {/* Caption */}
      {photos[index].caption && (
        <p className="mt-2 text-sm text-neutral-400">{photos[index].caption}</p>
      )}
    </div>
  );
}
