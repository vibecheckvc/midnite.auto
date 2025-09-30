"use client";

import { format } from "date-fns";

type MaintenanceLog = {
  id: string;
  car_id: string;
  type: string;
  mileage: number | null;
  due_date: string | null;
  notes: string | null;
};

export function MaintenanceWidget({ log }: { log: MaintenanceLog }) {
  return (
    <div className="rounded-lg border bg-black/40 backdrop-blur p-4 shadow-md shadow-purple-700/30">
      <h3 className="font-semibold text-white">{log.type}</h3>
      {log.mileage && (
        <p className="text-sm text-neutral-400">Mileage: {log.mileage} km</p>
      )}
      {log.due_date && (
        <p className="text-sm text-neutral-400">
          Due: {format(new Date(log.due_date), "MMM d, yyyy")}
        </p>
      )}
      {log.notes && (
        <p className="text-xs text-neutral-500 mt-2">{log.notes}</p>
      )}
    </div>
  );
}
