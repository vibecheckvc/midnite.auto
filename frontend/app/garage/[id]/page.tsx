import { CarCard } from "../components/CarCard"
import { BuildTimeline } from "../components/BuildTimeline"
import { PhotoCarousel } from "../components/PhotoCarousel"
import { SpecCard } from "../components/SpecCard"

interface CarDetailProps {
  params: { id: string }
}

const demoCar = {
  id: "1",
  year: 2013,
  make: "Audi",
  model: "S4",
  trim: "B8.5 Prestige",
  cover_url: "/placeholder.jpg",
}

const demoImages = ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"]

const demoSpecs = {
  hp: 333,
  torque: 325,
  drivetrain: "AWD",
  weight: 1750,
  tires: "Michelin Pilot Sport 4S",
}

export default function CarDetail({ params }: CarDetailProps) {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Car Details — {params.id}</h1>
      <PhotoCarousel images={demoImages} />
      <CarCard car={demoCar} />
      <SpecCard specs={demoSpecs} />
      <BuildTimeline />
    </main>
  )
}
