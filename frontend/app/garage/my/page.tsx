import { GarageHeader } from "../components/GarageHeader"
import { CarGrid } from "../components/CarGrid"
import { ActivityFeed } from "../components/ActivityFeed"
import { BudgetBar } from "../components/BudgetBar"
import { MaintenanceWidget } from "../components/MaintenanceWidget"
import { TaskBoard } from "../components/TaskBoard"

const demoCars = [
  { id: "1", year: 2013, make: "Audi", model: "S4", trim: "B8.5 Prestige", cover_url: "/placeholder.jpg" },
  { id: "2", year: 2018, make: "BMW", model: "M3", trim: "Competition", cover_url: "/placeholder.jpg" },
]

export default function MyGaragePage() {
  return (
    <main className="p-6 space-y-8">
      <GarageHeader username="Zayed" ownerView={true} />
      <BudgetBar planned={10000} spent={3500} />
      <CarGrid cars={demoCars} />
      <TaskBoard />
      <MaintenanceWidget />
      <ActivityFeed />
    </main>
  )
}
