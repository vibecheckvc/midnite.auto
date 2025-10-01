"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";

import PrimaryCarHero, { type MinimalCar } from "./components/PrimaryCarHero";
import CarSwitcher from "./components/CarSwitcher";

import { GarageHeader } from "./components/GarageHeader";
import { CarGrid } from "./components/CarGrid";
import AddCarModal from "./components/AddCarModal";
import { SpecCard } from "./components/SpecCard";
import MaintenanceHub from "./components/MaintenanceHub";
import { MaintenanceWidget, type MaintenanceLog } from "./components/MaintenanceWidget";
import { PartsTable } from "./components/PartsTable";
import { TaskBoard } from "./components/TaskBoard";
import { BudgetBar } from "./components/BudgetBar";
import { BuildTimeline } from "./components/BuildTimeline";
import ActivityFeed from "./components/ActivityFeed";
import { PhotoCarousel } from "./components/PhotoCarousel";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "maintenance", label: "Maintenance" },
  { key: "parts", label: "Parts" },
  { key: "tasks", label: "Tasks" },
  { key: "photos", label: "Photos" },
  { key: "timeline", label: "Timeline" },
  { key: "activity", label: "Activity" },
] as const;
type TabKey = (typeof tabs)[number]["key"];

export default function GaragePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<MinimalCar | null>(null);
  const [addCarOpen, setAddCarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);
  const carId = selectedCar?.id ?? null;

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) return;
      setUserId(user.id);

      // grab first car as default
      const [{ data: car }, { data: logsData }] = await Promise.all([
        supabase
          .from("cars")
          .select("id, user_id, make, model, year, trim, cover_url")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("maintenance_logs")
          .select(
            "id, car_id, user_id, type, interval_miles, last_done_miles, current_miles, interval_months, last_done_date, created_at"
          )
          .order("last_done_date", { ascending: false })
      ]);

      if (car) setSelectedCar(car as MinimalCar);
      if (logsData) setLogs(logsData as MaintenanceLog[]);
    })();
  }, []);

  // show logs relevant to the selected car (for Overview tiles)
  const logsForSelected = useMemo(
    () => (carId ? logs.filter((l) => l.car_id === carId) : []),
    [logs, carId]
  );

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading your garage…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0b] to-[#111113] text-white">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <GarageHeader userId={userId} />
      </div>

      {/* Hero */}
      <PrimaryCarHero userId={userId} car={selectedCar} onAddCar={() => setAddCarOpen(true)} />

      {/* Car Switcher (if > 1 car) */}
      {userId && (
        <CarSwitcher
          userId={userId}
          selectedId={selectedCar?.id ?? null}
          onSelect={(car) => {
            setSelectedCar(car);
            // prefetch fresh logs for the new car quietly
            void (async () => {
              const { data } = await supabase
                .from("maintenance_logs")
                .select(
                  "id, car_id, user_id, type, interval_miles, last_done_miles, current_miles, interval_months, last_done_date, created_at"
                )
                .eq("car_id", car.id)
                .order("last_done_date", { ascending: false });
              if (data) {
                // merge/replace logs for this car
                setLogs((prev) => {
                  const others = prev.filter((l) => l.car_id !== car.id);
                  return [...others, ...(data as MaintenanceLog[])];
                });
              }
            })();
          }}
        />
      )}

      {/* Sticky Tabs */}
      <div className="sticky top-0 z-20 mt-4 px-5 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <nav className="flex gap-2 overflow-x-auto py-3 no-scrollbar" role="tablist" aria-label="Garage Sections">
          {tabs.map((t) => {
            const active = t.key === activeTab;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(t.key)}
                className={[
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60",
                  active
                    ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-rose-600 shadow-[0_0_25px_-6px_rgba(244,63,94,0.7)]"
                    : "bg-white/5 hover:bg-white/10 border border-white/10"
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <main className="px-5 py-6 space-y-10">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <section className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ActionChip label="+ Add Car" onClick={() => setAddCarOpen(true)} />
              {carId && (
                <>
                  <ActionChip label="Log Maintenance" glow />
                  <ActionChip label="Add Part" glow />
                  <ActionChip label="Upload Photo" glow />
                </>
              )}
            </div>

            {/* Cars */}
            <Card title="Your Cars" actionLabel="+ Add Car" onAction={() => setAddCarOpen(true)}>
              <CarGrid userId={userId} />
            </Card>

            {/* Specs */}
            {carId && (
              <Card title="Quick Specs">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <SpecCard spec={{ id: "hp", car_id: carId, label: "Horsepower", value: "—" }} />
                  <SpecCard spec={{ id: "torque", car_id: carId, label: "Torque", value: "—" }} />
                  <SpecCard spec={{ id: "weight", car_id: carId, label: "Weight", value: "—" }} />
                  <SpecCard spec={{ id: "drive", car_id: carId, label: "Drivetrain", value: "—" }} />
                </div>
              </Card>
            )}

            {/* Maintenance Snapshot */}
            {carId && (
              <Card title="Maintenance Status">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {logsForSelected.length > 0 ? (
                    logsForSelected.slice(0, 6).map((log) => <MaintenanceWidget key={log.id} log={log} />)
                  ) : (
                    <EmptyHint text="No logs yet. Keep your build healthy — start by logging oil, brakes, or tires." />
                  )}
                </div>
              </Card>
            )}
          </section>
        )}

        {/* MAINTENANCE */}
        {activeTab === "maintenance" && carId && (
          <Card title="Maintenance Hub">
            <MaintenanceHub carId={carId} />
          </Card>
        )}

        {/* PARTS */}
        {activeTab === "parts" && carId && (
          <Card title="Parts & Mods">
            <PartsTable carId={carId} />
          </Card>
        )}

        {/* TASKS */}
        {activeTab === "tasks" && carId && (
          <Card title="Task Board">
            <TaskBoard carId={carId} />
          </Card>
        )}

        {/* PHOTOS */}
        {activeTab === "photos" && carId && (
          <Card title="Garage Photos">
            <PhotoCarousel carId={carId} />
          </Card>
        )}

        {/* TIMELINE */}
        {activeTab === "timeline" && carId && (
          <Card title="Build Timeline">
            <BuildTimeline carId={carId} />
          </Card>
        )}

        {/* ACTIVITY */}
        {activeTab === "activity" && (
          <Card title="Recent Activity">
            <ActivityFeed />
          </Card>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setAddCarOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-rose-600 shadow-[0_0_50px_-10px_rgba(244,63,94,0.8)] hover:scale-105 active:scale-95 transition flex items-center justify-center text-2xl"
        aria-label="Add Car"
      >
        +
      </button>

      {/* Modal */}
      {addCarOpen && (
        <ModalBackdrop onClose={() => setAddCarOpen(false)}>
          <AddCarModal userId={userId} onClose={() => setAddCarOpen(false)} />
        </ModalBackdrop>
      )}
    </div>
  );
}

/* ---------- tiny helpers to keep layout clean ---------- */

function Card({
  title,
  children,
  actionLabel,
  onAction,
}: {
  title: string;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 shadow-[0_0_60px_-20px_rgba(147,51,234,0.45)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function ActionChip({ label, onClick, glow }: { label: string; onClick?: () => void; glow?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full rounded-xl border text-sm px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60",
        glow
          ? "border-fuchsia-500/40 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 shadow-[0_0_30px_-10px_rgba(217,70,239,0.8)]"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function EmptyHint({ text }: { text: string }) {
  return <p className="text-neutral-400 text-sm">{text}</p>;
}

function ModalBackdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-x-0 top-8 sm:top-16 mx-auto max-w-lg px-5">
        <div className="rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
