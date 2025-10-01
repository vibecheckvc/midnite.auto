"use client";

import { format, addMonths } from "date-fns";

// ✅ export the shared type so everyone uses the SAME shape
export type MaintenanceLog = {
  id: string;
  car_id: string | null;
  user_id: string | null;
  type: string;
  interval_miles: number | null;
  last_done_miles: number | null;
  current_miles: number | null;
  interval_months: number | null;
  last_done_date: string | null;
  created_at: string | null;
  // optional field, only if you later add it
  notes?: string | null;
};

export function MaintenanceWidget({ log }: { log: MaintenanceLog }) {
  const nextDueMiles =
    log.last_done_miles != null && log.interval_miles != null
      ? log.last_done_miles + log.interval_miles
      : null;

  const nextDueDate =
    log.last_done_date && log.interval_months
      ? addMonths(new Date(log.last_done_date), log.interval_months)
      : null;

  const milesOverdue =
    nextDueMiles != null && log.current_miles != null
      ? log.current_miles >= nextDueMiles
      : false;

  const dateOverdue = nextDueDate ? new Date() >= nextDueDate : false;

  return (
    <div className="midnite-card">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-white">{log.type}</h3>
        {(milesOverdue || dateOverdue) && (
          <span className="text-xs px-2 py-0.5 rounded bg-red-600/20 text-red-300 border border-red-500/40">
            Overdue
          </span>
        )}
      </div>

      <div className="mt-2 space-y-1 text-sm text-neutral-300">
        {log.current_miles != null && (
          <p>
            Current: <span className="text-white">{log.current_miles.toLocaleString()}</span> km
          </p>
        )}
        {log.last_done_miles != null && (
          <p>
            Last done at: <span className="text-white">{log.last_done_miles.toLocaleString()}</span> km
          </p>
        )}
        {log.last_done_date && (
          <p>
            Last service:{" "}
            <span className="text-white">{format(new Date(log.last_done_date), "MMM d, yyyy")}</span>
          </p>
        )}
        {log.interval_miles != null && (
          <p>
            Interval: <span className="text-white">{log.interval_miles.toLocaleString()}</span> mi
          </p>
        )}
        {log.interval_months != null && (
          <p>
            Interval: <span className="text-white">{log.interval_months}</span> months
          </p>
        )}
        {nextDueMiles != null && (
          <p>
            Next due (miles):{" "}
            <span className={milesOverdue ? "text-red-300" : "text-white"}>
              {nextDueMiles.toLocaleString()} km
            </span>
          </p>
        )}
        {nextDueDate && (
          <p>
            Next due (date):{" "}
            <span className={dateOverdue ? "text-red-300" : "text-white"}>
              {format(nextDueDate, "MMM d, yyyy")}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
