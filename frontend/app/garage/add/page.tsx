import { AddCarModal } from "../components/AddCarModal"
import { PartsTable } from "../components/PartsTable"

export default function AddCarPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">➕ Add a New Car</h1>
      <AddCarModal />
      <PartsTable />
    </main>
  )
}
