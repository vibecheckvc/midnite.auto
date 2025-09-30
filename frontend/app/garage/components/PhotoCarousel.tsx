"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";

type CarPhoto = {
  id: string;
  car_id: string;
  url: string;
};

export function PhotoCarousel({ carId }: { carId: string }) {
  const [photos, setPhotos] = useState<CarPhoto[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("car_photos")
        .select("*")
        .eq("car_id", carId);

      if (error) {
        console.error("Error fetching photos:", error.message);
      } else {
        setPhotos(data || []);
      }
    };

    fetchPhotos();
  }, [carId]);

  const prev = () => {
    setIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === photos.length - 1 ? 0 : i + 1));
  };

  if (photos.length === 0) {
    return (
      <div className="rounded-lg border bg-black/40 backdrop-blur p-4">
        <h2 className="font-semibold text-white mb-2">Photos</h2>
        <p className="text-neutral-400">No photos uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black/40 backdrop-blur p-4 shadow-lg shadow-purple-700/30">
      <h2 className="font-semibold text-white mb-2">Photos</h2>
      <div className="relative w-full h-64">
        <Image
          src={photos[index].url}
          alt={`Photo ${index + 1}`}
          fill
          className="object-cover rounded-lg"
        />
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
        >
          ›
        </button>
      </div>
    </div>
  );
}
