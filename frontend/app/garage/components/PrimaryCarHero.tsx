"use client";

import Image from "next/image";
import { BudgetBar } from "./BudgetBar";

export type MinimalCar = {
  id: string;
  user_id: string;
  year: number | null;
  make: string | null;
  model: string | null;
  trim: string | null;
  cover_url: string | null;
};

export default function PrimaryCarHero({
  userId,
  car,
  onAddCar,
}: {
  userId: string;
  car: MinimalCar | null;
  onAddCar: () => void;
}) {
  const title = car
    ? `${car.year ?? ""} ${car.make ?? ""} ${car.model ?? ""}`.trim() || "Your Car"
    : "Your Garage";

  return (
    <section className="px-5">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(147,51,234,0.5)]">
        <div className="relative h-[240px] sm:h-[320px]">
          {car?.cover_url ? (
            <Image
              src={car.cover_url}
              alt={title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 1200px"
              className="object-cover opacity-80"
            />
          ) : (
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-700/40 via-fuchsia-500/20 to-rose-500/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
              <p className="text-sm text-neutral-300">
                {car?.trim ?? (car ? "Select a trim or add a cover photo." : "Add a car to get started.")}
              </p>
            </div>
            <div className="w-full sm:w-[380px]">
              <BudgetBar userId={userId} />
            </div>
          </div>
          {!car && (
            <button
              onClick={onAddCar}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-rose-600 px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              + Add Car
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
