import { GarageHeader } from "../components/GarageHeader"
import { CarGrid } from "../components/CarGrid"
import { ActivityFeed } from "../components/ActivityFeed"

const demoPublicCars = [
  { id: "10", year: 2000, make: "Honda", model: "Civic", trim: "Si", cover_url: "/placeholder.jpg" },
  { id: "11", year: 1998, make: "Toyota", model: "Supra", trim: "RZ", cover_url: "/placeholder.jpg" },
  { id: "12", year: 1995, make: "Mazda", model: "RX-7", trim: "FD3S", cover_url: "/placeholder.jpg" },
]

export default function PublicGarage() {
  return (
    <main className="p-6 space-y-6">
      <GarageHeader username="Public" ownerView={false} />
      <CarGrid cars={demoPublicCars} />
      <ActivityFeed />
    </main>
  )
}
