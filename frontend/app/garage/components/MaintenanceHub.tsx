"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { MaintenanceWidget } from "./MaintenanceWidget";

type MaintenanceLog = {
  id: string;
  car_id: string;
  type: string;
  mileage: number | null;
  due_date: string | null;
  notes: string | null;
};

export function MaintenanceHub({ carId }: { carId: string }) {
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("maintenance_logs")
        .select("*")
        .eq("car_id", carId)
        .order("due_date", { ascending: true });

      if (error) {
        console.error("Error fetching maintenance logs:", error.message);
      } else {
        setLogs(data || []);
      }

      setLoading(false);
    };

    fetchLogs();

    // realtime inserts/updates
    const channel = supabase
      .channel("maintenance")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "maintenance_logs", filter: `car_id=eq.${carId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setLogs((prev) => [...prev, payload.new as MaintenanceLog]);
          }
          if (payload.eventType === "UPDATE") {
            setLogs((prev) =>
              prev.map((log) =>
                log.id === (payload.new as MaintenanceLog).id
                  ? (payload.new as MaintenanceLog)
                  : log
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setLogs((prev) =>
              prev.filter((log) => log.id !== (payload.old as MaintenanceLog).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [carId]);

  return (
    <div className="rounded-lg border bg-black/40 backdrop-blur p-4 shadow-lg shadow-purple-700/30">
      <h2 className="font-semibold mb-4 text-white">Maintenance</h2>
      {loading ? (
        <p className="text-neutral-400">Loading logs...</p>
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
