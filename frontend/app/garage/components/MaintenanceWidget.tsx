"use client"

import React from "react"

type MaintenanceWidgetProps = {
  label: string
  progress: number // 0 → 100
  color?: "red" | "purple"
}

export function MaintenanceWidget({
  label,
  progress,
  color = "purple",
}: MaintenanceWidgetProps) {
  const circleColor =
    color === "red"
      ? "stroke-red-500 drop-shadow-[0_0_10px_#ef4444]"
      : "stroke-purple-500 drop-shadow-[0_0_10px_#a855f7]"

  return (
    <div className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-md rounded-xl p-6 shadow-lg border border-neutral-800">
      <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
        {/* Base ring */}
        <circle
          className="stroke-neutral-700"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          fill="transparent"
        />
        {/* Progress ring */}
        <circle
          className={circleColor}
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray="283"
          strokeDashoffset={283 - (283 * progress) / 100}
          strokeLinecap="round"
        />
      </svg>
      <p className="mt-4 font-semibold">{label}</p>
      <p className="text-sm text-neutral-400">{100 - progress}% Remaining</p>
    </div>
  )
}

