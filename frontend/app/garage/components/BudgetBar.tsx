"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabaseClient"

export function BudgetTracker({ userId }: { userId: string }) {
  const [planned, setPlanned] = useState(10000)
  const [spent, setSpent] = useState(3500)

  useEffect(() => {
    const fetchBudget = async () => {
      const { data } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId)
        .single()
      if (data) {
        setPlanned(data.planned)
        setSpent(data.spent)
      }
    }
    fetchBudget()
  }, [userId])

  const percent = planned > 0 ? Math.min((spent / planned) * 100, 100) : 0

  return (
    <div className="bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-red-600/30 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-red-400">💰 Budget Tracker</h2>
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        <circle className="stroke-neutral-700" cx="50" cy="50" r="45" strokeWidth="10" fill="transparent" />
        <circle
          className="stroke-red-500 drop-shadow-[0_0_10px_#ef4444]"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray="283"
          strokeDashoffset={283 - (283 * percent) / 100}
          strokeLinecap="round"
        />
      </svg>
      <p className="mt-4 font-semibold text-lg">
        ${spent} / ${planned}
      </p>
      <p className="text-sm text-neutral-400">{percent.toFixed(0)}% used</p>
    </div>
  )
}
