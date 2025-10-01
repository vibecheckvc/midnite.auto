"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

type Milestone = {
  id: string;
  car_id: string;
  title: string;
  description: string | null;
  date: string;
};

export function BuildTimeline({ carId }: { carId: string }) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMilestones = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("build_timeline") // ✅ fixed: matches your table
        .select("*")
        .eq("car_id", carId)
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching milestones:", error.message);
      } else {
        setMilestones(data || []);
      }

      setLoading(false);
    };

    fetchMilestones();

    const channel = supabase
      .channel("build_timeline_updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "build_timeline", filter: `car_id=eq.${carId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setMilestones((prev) => [...prev, payload.new as Milestone]);
          }
          if (payload.eventType === "UPDATE") {
            setMilestones((prev) =>
              prev.map((m) =>
                m.id === (payload.new as Milestone).id
                  ? (payload.new as Milestone)
                  : m
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setMilestones((prev) =>
              prev.filter((m) => m.id !== (payload.old as Milestone).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [carId]);

  if (loading) {
    return (
      <div className="midnite-card">
        <h2 className="font-semibold mb-4 text-white">Build Timeline</h2>
        <p className="text-neutral-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="midnite-card">
      <h2 className="font-semibold mb-4 text-white">Build Timeline</h2>
      {milestones.length === 0 ? (
        <p className="text-neutral-400">No milestones yet.</p>
      ) : (
        <ul className="space-y-6">
          {milestones.map((m) => (
            <li key={m.id} className="flex items-start gap-4">
              <div className="h-3 w-3 rounded-full bg-purple-500 mt-1.5" />
              <div>
                <p className="font-medium text-white">{m.title}</p>
                {m.description && (
                  <p className="text-sm text-neutral-400">{m.description}</p>
                )}
                <span className="text-xs text-neutral-500">
                  {new Date(m.date).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
