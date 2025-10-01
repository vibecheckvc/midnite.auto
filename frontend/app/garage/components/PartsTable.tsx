"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

type Part = {
  id: string;
  car_id: string;
  name: string;
  category: string | null;
  cost: number | null;
  installed: boolean;
};

export function PartsTable({ carId }: { carId: string }) {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("car_parts") // ✅ matches your table
        .select("*")
        .eq("car_id", carId);

      if (error) {
        console.error("Error fetching parts:", error.message);
      } else {
        setParts(data || []);
      }

      setLoading(false);
    };

    fetchParts();

    const channel = supabase
      .channel("car_parts_updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "car_parts", filter: `car_id=eq.${carId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setParts((prev) => [...prev, payload.new as Part]);
          }
          if (payload.eventType === "UPDATE") {
            setParts((prev) =>
              prev.map((p) =>
                p.id === (payload.new as Part).id ? (payload.new as Part) : p
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setParts((prev) =>
              prev.filter((p) => p.id !== (payload.old as Part).id)
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
    <div className="midnite-card overflow-x-auto">
      <h2 className="font-semibold mb-4 text-white">Parts</h2>
      {loading ? (
        <p className="text-neutral-400">Loading parts…</p>
      ) : parts.length === 0 ? (
        <p className="text-neutral-400">No parts logged yet.</p>
      ) : (
        <table className="w-full text-sm text-left text-neutral-400">
          <thead>
            <tr className="text-white">
              <th className="py-2">Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Cost</th>
              <th className="py-2">Installed</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.id} className="border-t border-neutral-800">
                <td className="py-2">{part.name}</td>
                <td className="py-2">{part.category || "-"}</td>
                <td className="py-2">
                  {part.cost ? `$${part.cost.toLocaleString()}` : "-"}
                </td>
                <td className="py-2">{part.installed ? "✅" : "⏳"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
