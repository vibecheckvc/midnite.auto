"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

type Milestone = {
  id: string;
  car_id: string;
  title: string;
  description: string;
  date: string;
};

export function BuildTimeline({ carId }: { carId: string }) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMilestones = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("build_milestones")
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

    // realtime inserts
    const channel = supabase
      .channel("milestones")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "build_milestones", filter: `car_id=eq.${carId}` },
        (payload) => {
          setMilestones((prev) => [...prev, payload.new as Milestone]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [carId]);

  if (loading) {
    return (
      <div className="rounded-lg border bg-black/40 backdrop-blur p-4">
        <h2 className="font-semibold mb-4 text-white">Build Timeline</h2>
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black/40 backdrop-blur p-4 shadow-lg shadow-purple-700/30">
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
                <p className="text-sm text-neutral-400">{m.description}</p>
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
