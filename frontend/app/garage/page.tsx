import { GarageHeader } from "./components/GarageHeader"
import { CarGrid } from "./components/CarGrid"
import { BudgetBar } from "./components/BudgetBar"
import { MaintenanceWidget } from "./components/MaintenanceWidget"
import { TaskBoard } from "./components/TaskBoard"
import { ActivityFeed } from "./components/ActivityFeed"
import { BuildTimeline } from "./components/BuildTimeline"
import { SpecCard } from "./components/SpecCard"

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

export default function GaragePage() {
  return (
    <main className="p-6 space-y-12">
      {/* Header */}
      <GarageHeader username="Zayed" ownerView={true} />

      {/* Budget */}
      <BudgetBar planned={10000} spent={3500} />

      {/* Cars */}
      <section>
        <h2 className="text-2xl font-bold mb-4">My Cars</h2>
        <CarGrid cars={demoCars} />
      </section>

      {/* Specs + Timeline */}
      <section className="grid md:grid-cols-2 gap-6">
        <SpecCard specs={demoSpecs} />
        <BuildTimeline />
      </section>

      {/* Maintenance */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Maintenance</h2>
        <MaintenanceWidget />
      </section>

      {/* Tasks */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Task Board</h2>
        <TaskBoard />
      </section>

      {/* Activity Feed */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Activity</h2>
        <ActivityFeed />
      </section>
    </main>
  )
}
