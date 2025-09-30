"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

type Budget = {
  id: string;
  user_id: string;
  planned: number;
  spent: number;
};

export function BudgetBar({ userId }: { userId: string }) {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching budget:", error.message);
      } else {
        setBudget(data);
      }

      setLoading(false);
    };

    fetchBudget();

    // realtime updates
    const channel = supabase
      .channel("budget-updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "budgets", filter: `user_id=eq.${userId}` },
        (payload) => {
          const updated = payload.new as Budget;
          setBudget(updated);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="rounded-lg border bg-black/40 backdrop-blur p-4">
        <h2 className="font-semibold mb-3 text-white">Budget</h2>
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="rounded-lg border bg-black/40 backdrop-blur p-4">
        <h2 className="font-semibold mb-3 text-white">Budget</h2>
        <p className="text-neutral-400">No budget set yet.</p>
      </div>
    );
  }

  const percent = Math.min((budget.spent / budget.planned) * 100, 100);

  return (
    <div className="rounded-lg border bg-black/40 backdrop-blur p-4 shadow-lg shadow-purple-700/30">
      <h2 className="font-semibold mb-3 text-white">Budget</h2>
      <div className="h-4 w-full bg-neutral-800 rounded overflow-hidden">
        <div
          className={`h-4 transition-all duration-300 ${
            percent > 90
              ? "bg-gradient-to-r from-red-400 via-red-500 to-red-600"
              : "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-neutral-400">
        Spent:{" "}
        <span className="text-white font-medium">${budget.spent}</span> / Planned:{" "}
        <span className="text-white font-medium">${budget.planned}</span>
      </p>
    </div>
  );
}
