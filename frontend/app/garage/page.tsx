"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

import { GarageHeader } from "./components/GarageHeader";
import { CarGrid } from "./components/CarGrid";
import { SpecCard } from "./components/SpecCard";
import { MaintenanceHub } from "./components/MaintenanceHub";
import { PartsTable } from "./components/PartsTable";
import { TaskBoard } from "./components/TaskBoard";
import { BudgetBar } from "./components/BudgetBar";
import { BuildTimeline } from "./components/BuildTimeline";
import ActivityFeed from "./components/ActivityFeed";
import { PhotoCarousel } from "./components/PhotoCarousel";

// eventually replace with auth session
const DEMO_USER_ID = "00000000-0000-0000-0000-000000000000";

export default function GaragePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [carId, setCarId] = useState<string | null>(null);

  useEffect(() => {
    // 🔑 TODO: swap with real Supabase Auth
    setUserId(DEMO_USER_ID);

    const fetchFirstCar = async () => {
      const { data } = await supabase
        .from("cars")
        .select("id")
        .eq("user_id", DEMO_USER_ID)
        .limit(1)
        .single();

      if (data) setCarId(data.id);
    };

    fetchFirstCar();
  }, []);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading user...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-neutral-900 p-6 space-y-8">
      {/* Profile / Garage Owner */}
      <GarageHeader userId={userId} />

      {/* Cars */}
      <CarGrid userId={userId} />

      {/* Specs (if car selected) */}
      {carId && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* you’ll eventually map over all specs from Supabase */}
          <SpecCard spec={{ id: "hp", car_id: carId, label: "Horsepower", value: "450hp" }} />
          <SpecCard spec={{ id: "torque", car_id: carId, label: "Torque", value: "450 lb-ft" }} />
          <SpecCard spec={{ id: "weight", car_id: carId, label: "Weight", value: "1750kg" }} />
          <SpecCard spec={{ id: "drive", car_id: carId, label: "Drivetrain", value: "AWD" }} />
        </div>
      )}

      {/* Maintenance + Budget */}
      {carId && (
        <div className="grid gap-6 lg:grid-cols-2">
          <MaintenanceHub carId={carId} />
          <BudgetBar userId={userId} />
        </div>
      )}

      {/* Parts + Tasks */}
      {carId && (
        <div className="grid gap-6 lg:grid-cols-2">
          <PartsTable carId={carId} />
          <TaskBoard carId={carId} />
        </div>
      )}

      {/* Photos + Timeline */}
      {carId && (
        <div className="grid gap-6 lg:grid-cols-2">
          <PhotoCarousel carId={carId} />
          <BuildTimeline carId={carId} />
        </div>
      )}

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}
