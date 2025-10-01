"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import type { MinimalCar } from "./PrimaryCarHero";

export default function CarSwitcher({
  userId,
  selectedId,
  onSelect,
}: {
  userId: string;
  selectedId: string | null;
  onSelect: (car: MinimalCar) => void;
}) {
  const [cars, setCars] = useState<MinimalCar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("cars")
        .select("id, user_id, make, model, year, trim, cover_url")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

      if (!ignore) {
        if (error) setCars([]);
        else setCars((data ?? []) as MinimalCar[]);
        setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [userId]);

  if (loading || cars.length <= 1) return null;

  return (
    <div className="px-5 mt-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm uppercase tracking-wide text-neutral-400">Switch Car</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {cars.map((car) => {
          const active = car.id === selectedId;
          const label = `${car.year ?? ""} ${car.make ?? ""} ${car.model ?? ""}`.trim() || "Car";
        return (
          <button
            key={car.id}
            onClick={() => onSelect(car)}
            className={[
              "flex items-center gap-3 shrink-0 min-w-[220px] rounded-xl border px-3 py-2 text-left transition",
              active
                ? "border-fuchsia-500/50 bg-fuchsia-500/10 shadow-[0_0_30px_-12px_rgba(217,70,239,0.6)]"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            ].join(" ")}
            aria-pressed={active}
          >
            <div className="relative h-10 w-16 overflow-hidden rounded-md bg-neutral-800">
              {car.cover_url ? (
                <Image src={car.cover_url} alt={label} fill sizes="128px" className="object-cover" />
              ) : null}
            </div>
            <div>
              <div className="text-sm font-medium">{label}</div>
              {car.trim && <div className="text-xs text-neutral-400">{car.trim}</div>}
            </div>
          </button>
        );
        })}
      </div>
    </div>
  );
}
