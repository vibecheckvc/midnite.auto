"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { MaintenanceWidget } from "./MaintenanceWidget"

type MaintenanceItem = {
  id: string
  type: string
  interval_miles: number
  last_done_miles: number
  current_miles: number
}

export function MaintenanceHub({ userId }: { userId: string }) {
  const supabase = createClientComponentClient()
  const [items, setItems] = useState<MaintenanceItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("maintenance_logs")
        .select("*")
        .eq("user_id", userId)

      if (!error && data) setItems(data)
    }
    fetchData()
  }, [supabase, userId])

  return (
    <div className="bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-purple-600/30">
      <h2 className="text-xl font-bold mb-4 text-purple-400">🛡 Maintenance Hub</h2>
      <div className="grid grid-cols-3 gap-6">
        {items.map((item) => {
          const milesSince = item.current_miles - item.last_done_miles
          const progress = Math.min((milesSince / item.interval_miles) * 100, 100)

          return (
            <MaintenanceWidget
              key={item.id}
              label={item.type.replace("_", " ")}
              progress={progress}
              color={progress > 85 ? "red" : "purple"}
            />
          )
        })}
      </div>
    </div>
  )
}
