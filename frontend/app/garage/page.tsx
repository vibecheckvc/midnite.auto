"use client"

import React from "react"
import { GarageHeader } from "./components/GarageHeader"
import { CarGrid } from "./components/CarGrid"
import { BudgetBar } from "./components/BudgetBar"
import { MaintenanceWidget } from "./components/MaintenanceWidget"
import { TaskBoard } from "./components/TaskBoard"
import { ActivityFeed } from "./components/ActivityFeed"
import { BuildTimeline } from "./components/BuildTimeline"
import { SpecCard } from "./components/SpecCard"

/* ---------- Reusable UI Wrappers ---------- */
type WidgetProps = {
  children: React.ReactNode
  className?: string
}

function Widget({ children, className }: WidgetProps) {
  return (
    <div
      className={`bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-neutral-800 ${className}`}
    >
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold mb-4 border-b border-neutral-700 pb-2">
      {children}
    </h2>
  )
}

/* ---------- Demo Data ---------- */
const demoCars = [
  { id: "1", year: 2013, make: "Audi", model: "S4", trim: "B8.5 Prestige", cover_url: "/placeholder.jpg" },
  { id: "2", year: 2018, make: "BMW", model: "M3", trim: "Competition", cover_url: "/placeholder.jpg" },
]

const demoSpecs = {
  hp: 333,
  torque: 325,
  drivetrain: "AWD",
  weight: 1750,
  tires: "Michelin Pilot Sport 4S",
}

/* ---------- Main Page ---------- */
export default function GaragePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative h-[45vh] w-full bg-[url('/garage-banner.jpg')] bg-cover bg-center rounded-b-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-purple-900/40 to-red-900/40 backdrop-blur-sm" />

        <div className="relative z-10 p-10">
          <GarageHeader username="Zayed" ownerView={true} />

          {/* Overlay Card */}
          <div className="mt-6 grid md:grid-cols-5 gap-6 bg-black/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-purple-600/30">
            {/* Stats */}
            <div className="col-span-3 grid grid-cols-4 gap-4">
              {[
                { label: "Mileage", value: "62,000 mi" },
                { label: "Horsepower", value: "333 HP" },
                { label: "Mods", value: "12" },
                { label: "Oil Change Due", value: "2k mi" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-sm text-neutral-400">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
            {/* Actions */}
            <div className="col-span-2 flex items-center justify-end gap-4">
              <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-2 focus:ring-red-400 font-medium rounded-lg text-sm px-6 py-2 shadow-md">
                ➕ Add Car
              </button>
              <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-2 focus:ring-purple-400 font-medium rounded-lg text-sm px-6 py-2 shadow-md">
                🛠 Log Maintenance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN DASHBOARD */}
      <div className="p-10 space-y-12">
        {/* Row 1: Cars + Maintenance */}
        <section className="grid md:grid-cols-3 gap-10">
          <Widget className="col-span-2 shadow-purple-500/30">
            <SectionTitle>🚗 My Garage</SectionTitle>
            <CarGrid cars={demoCars} />
          </Widget>

          <div className="space-y-6">
            <Widget className="shadow-red-500/30">
              <SectionTitle>🔧 Maintenance</SectionTitle>
              <MaintenanceWidget />
            </Widget>
            <Widget className="shadow-purple-500/30">
              <MaintenanceWidget />
            </Widget>
          </div>
        </section>

        {/* Row 2: Specs + Build Timeline */}
        <section className="grid md:grid-cols-2 gap-10">
          <Widget className="shadow-red-500/30">
            <SectionTitle>⚙️ Performance Specs</SectionTitle>
            <SpecCard specs={demoSpecs} />
          </Widget>

          <Widget className="shadow-purple-500/30">
            <SectionTitle>📈 Build Timeline</SectionTitle>
            <BuildTimeline />
          </Widget>
        </section>

        {/* Row 3: Budget + Tasks */}
        <section className="grid md:grid-cols-2 gap-10">
          <Widget className="shadow-red-500/30">
            <SectionTitle>💰 Budget Tracker</SectionTitle>
            <BudgetBar planned={10000} spent={3500} />
          </Widget>

          <Widget className="shadow-purple-500/30">
            <SectionTitle>📋 Task Board</SectionTitle>
            <TaskBoard />
          </Widget>
        </section>

        {/* Row 4: Social + Leaderboard */}
        <section className="grid md:grid-cols-3 gap-10">
          <Widget className="col-span-2 shadow-purple-500/30">
            <SectionTitle>🔥 Activity Feed</SectionTitle>
            <ActivityFeed />
          </Widget>

          <Widget className="shadow-red-500/30 flex flex-col items-center justify-center">
            <SectionTitle>🏆 Leaderboard</SectionTitle>
            <p className="text-neutral-400 text-sm">
              Coming Soon — Earn badges, compete with builds.
            </p>
          </Widget>
        </section>
      </div>
    </main>
  )
}
