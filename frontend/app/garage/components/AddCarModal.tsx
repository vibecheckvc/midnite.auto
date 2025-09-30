"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

import { GarageHeader } from "../components/GarageHeader";
import { CarGrid } from "../components/CarGrid";
import AddCarModal from "../components/AddCarModal";
import { SpecCard } from "../components/SpecCard";
import { MaintenanceHub } from "../components/MaintenanceHub";
import { MaintenanceWidget } from "../components/MaintenanceWidget";
import { PartsTable } from "../components/PartsTable";
import { TaskBoard } from "../components/TaskBoard";
import { BudgetBar } from "../components/BudgetBar";
import { BuildTimeline } from "../components/BuildTimeline";
import ActivityFeed from "../components/ActivityFeed";
import { PhotoCarousel } from "../components/PhotoCarousel";

type MaintenanceLog = {
  id: string;
  car_id: string;
  type: string;
  mileage: number | null;
  due_date: string | null;
  notes: string | null;
};

export default function GaragePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [carId, setCarId] = useState<string | null>(null);
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);

        // get first car
        const { data: car } = await supabase
          .from("cars")
          .select("id")
          .eq("user_id", user.id)
          .limit(1)
          .single();

        if (car) {
          setCarId(car.id);

          // fetch maintenance logs for that car
          const { data: logData } = await supabase
            .from("maintenance")
            .select("*")
            .eq("car_id", car.id)
            .order("due_date", { ascending: true });

          if (logData) setLogs(logData);
        }
      }
    };

    loadUser();
  }, []);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading your garage...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-neutral-900 p-6 space-y-10">
      {/* Profile Header */}
      <GarageHeader userId={userId} />

      {/* Car Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Your Cars</h2>
          {/* Modal is self-contained */}
          <AddCarModal userId={userId} />
        </div>
        <CarGrid userId={userId} />
      </section>

      {/* Specs Overview */}
      {carId && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Specs</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SpecCard
              spec={{ id: "hp", car_id: carId, label: "Horsepower", value: "450hp" }}
            />
            <SpecCard
              spec={{ id: "torque", car_id: carId, label: "Torque", value: "450 lb-ft" }}
            />
            <SpecCard
              spec={{ id: "weight", car_id: carId, label: "Weight", value: "1750kg" }}
            />
            <SpecCard
              spec={{ id: "drive", car_id: carId, label: "Drivetrain", value: "AWD" }}
            />
          </div>
        </section>
      )}

      {/* Maintenance + Budget */}
      {carId && (
        <section className="grid gap-6 lg:grid-cols-2">
          <MaintenanceHub carId={carId} />
          <BudgetBar userId={userId} />
        </section>
      )}

      {/* Tasks + Parts */}
      {carId && (
        <section className="grid gap-6 lg:grid-cols-2">
          <TaskBoard carId={carId} />
          <PartsTable carId={carId} />
        </section>
      )}

      {/* Photos + Build Timeline */}
      {carId && (
        <section className="grid gap-6 lg:grid-cols-2">
          <PhotoCarousel carId={carId} />
          <BuildTimeline carId={carId} />
        </section>
      )}

      {/* Maintenance Logs */}
      {carId && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Maintenance Status
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {logs.length > 0 ? (
              logs.map((log) => <MaintenanceWidget key={log.id} log={log} />)
            ) : (
              <p className="text-neutral-500 text-sm">No logs yet.</p>
            )}
          </div>
        </section>
      )}

      {/* Activity Feed */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <ActivityFeed />
      </section>
    </div>
  );
}
