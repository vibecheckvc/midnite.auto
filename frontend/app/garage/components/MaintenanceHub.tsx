"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { MaintenanceWidget, type MaintenanceLog } from "./MaintenanceWidget";

export default function MaintenanceHub({ carId }: { carId: string }) {
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("maintenance_logs")
        .select(
          "id, car_id, user_id, type, interval_miles, last_done_miles, current_miles, interval_months, last_done_date, created_at"
        )
        .eq("car_id", carId)
        .order("last_done_date", { ascending: false });

      if (error) {
        console.error("Error fetching maintenance logs:", error.message);
        setLogs([]);
      } else {
        setLogs(data as MaintenanceLog[]); // shape matches our shared type
      }

      setLoading(false);
    };

    fetchLogs();

    // realtime inserts/updates/deletes for this car
    const channel = supabase
      .channel(`maintenance_logs_${carId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "maintenance_logs", filter: `car_id=eq.${carId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setLogs((prev) => [payload.new as MaintenanceLog, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setLogs((prev) =>
              prev.map((l) => (l.id === (payload.new as MaintenanceLog).id ? (payload.new as MaintenanceLog) : l))
            );
          } else if (payload.eventType === "DELETE") {
            setLogs((prev) => prev.filter((l) => l.id !== (payload.old as MaintenanceLog).id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [carId]);

  return (
    <div className="midnite-card">
      <h2 className="font-semibold mb-4 text-white">Maintenance</h2>
      {loading ? (
        <p className="text-neutral-400">Loading logs…</p>
      ) : logs.length === 0 ? (
        <p className="text-neutral-400">No maintenance logs yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {logs.map((log) => (
            <MaintenanceWidget key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
}
