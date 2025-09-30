"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { CarCard } from "./CarCard";

type Car = {
  id: string;
  user_id: string;
  year: number;
  make: string;
  model: string;
  trim: string | null;
  cover_url: string | null;
};

export function CarGrid({ userId }: { userId: string }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching cars:", error.message);
      } else {
        setCars(data || []);
      }

      setLoading(false);
    };

    fetchCars();

    // realtime updates
    const channel = supabase
      .channel("cars")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "cars", filter: `user_id=eq.${userId}` },
        (payload) => {
          setCars((prev) => [...prev, payload.new as Car]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="rounded-lg border bg-black/40 backdrop-blur p-4">
        <h2 className="font-semibold mb-3 text-white">My Garage</h2>
        <p className="text-neutral-400">Loading cars...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-semibold mb-3 text-white">My Garage</h2>
      {cars.length === 0 ? (
        <p className="text-neutral-400">No cars added yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
