"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type Budget = {
  id: string;
  user_id: string | null;
  planned: number;
  spent: number;
};

export function BudgetBar({ userId }: { userId: string }) {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);

  // edit state
  const [editing, setEditing] = useState(false);
  const [plannedInput, setPlannedInput] = useState<string>("");
  const [spentInput, setSpentInput] = useState<string>("");

  // quick add expense
  const [addAmt, setAddAmt] = useState<string>("");

  useEffect(() => {
    let aborted = false;

    const fetchBudget = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (aborted) return;

      if (error) {
        console.error("Error fetching budget:", error.message);
        setBudget(null);
      } else {
        setBudget((data as Budget) ?? null);
        if (data) {
          setPlannedInput(String((data as Budget).planned));
          setSpentInput(String((data as Budget).spent));
        }
      }
      setLoading(false);
    };

    fetchBudget();

    const channel = supabase
      .channel("budget_updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "budgets", filter: `user_id=eq.${userId}` },
        (payload: RealtimePostgresChangesPayload<Budget>) => {
          const next = payload.new as Budget | null;
          if (next) {
            setBudget(next);
            // only overwrite inputs if not currently editing
            if (!editing) {
              setPlannedInput(String(next.planned));
              setSpentInput(String(next.spent));
            }
          }
        }
      )
      .subscribe();

    return () => {
      aborted = true;
      void supabase.removeChannel(channel);
    };
  }, [userId, editing]);

  // ✅ explicit precedence to satisfy TS and be clear
  const planned = (budget?.planned ?? Number(plannedInput)) || 0;
  const spent = (budget?.spent ?? Number(spentInput)) || 0;

  const percent = useMemo(() => {
    if (!planned || planned <= 0) return 0;
    return Math.min((spent / planned) * 100, 100);
  }, [planned, spent]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  const toInt = (s: string) => {
    const n = Number(s.replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? Math.round(n) : NaN;
  };

  const handleSave = async () => {
    const p = toInt(plannedInput);
    const s = toInt(spentInput);
    if (!Number.isFinite(p) || p < 0) return;
    if (!Number.isFinite(s) || s < 0) return;

    // optimistic UI
    setBudget((prev) =>
      prev
        ? { ...prev, planned: p, spent: s }
        : { id: "temp", user_id: userId, planned: p, spent: s }
    );
    setEditing(false);

    // ✅ UPSERT on user_id ensures persistence and prevents duplicates
    const { data: saved, error } = await supabase
      .from("budgets")
      .upsert({ user_id: userId, planned: p, spent: s }, { onConflict: "user_id" })
      .select("*")
      .single();

    if (error) {
      console.error("Upsert budget error:", error.message);
    } else if (saved) {
      setBudget(saved as Budget); // reflect exact DB row
      setPlannedInput(String((saved as Budget).planned));
      setSpentInput(String((saved as Budget).spent));
    }
  };

  const handleCancel = () => {
    if (budget) {
      setPlannedInput(String(budget.planned));
      setSpentInput(String(budget.spent));
    } else {
      setPlannedInput("");
      setSpentInput("");
    }
    setEditing(false);
  };

  const handleQuickAdd = async () => {
    const add = toInt(addAmt);
    if (!Number.isFinite(add) || add <= 0) return;

    const currentSpent = budget?.spent ?? 0;
    const nextSpent = currentSpent + add;

    // optimistic
    if (budget) {
      setBudget({ ...budget, spent: nextSpent });
    } else {
      setBudget({
        id: "temp",
        user_id: userId,
        planned: toInt(plannedInput) || add,
        spent: nextSpent,
      });
    }
    setAddAmt("");

    // ✅ UPSERT to persist
    const { data: saved, error } = await supabase
      .from("budgets")
      .upsert(
        {
          user_id: userId,
          planned: toInt(plannedInput) || (budget?.planned ?? add),
          spent: nextSpent,
        },
        { onConflict: "user_id" }
      )
      .select("*")
      .single();

    if (error) {
      console.error("Quick add upsert error:", error.message);
    } else if (saved) {
      setBudget(saved as Budget);
      setPlannedInput(String((saved as Budget).planned));
      setSpentInput(String((saved as Budget).spent));
    }
  };

  if (loading) {
    return (
      <div className="midnite-card">
        <h2 className="font-semibold mb-3 text-white">Budget</h2>
        <p className="text-neutral-400">Loading…</p>
      </div>
    );
  }

  // First-time setup UX
  if (!budget && !editing && !plannedInput) {
    return (
      <div className="midnite-card">
        <h2 className="font-semibold mb-3 text-white">Budget</h2>
        <p className="text-neutral-300 mb-3">Set your planned build budget:</p>
        <div className="flex items-center gap-2">
          <input
            inputMode="numeric"
            placeholder="e.g. 5000"
            value={plannedInput}
            onChange={(e) => setPlannedInput(e.target.value)}
            className="rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white w-36"
          />
          <button
            onClick={() => {
              if (!plannedInput.trim()) return;
              setEditing(true);
              setSpentInput("0");
            }}
            className="px-3 py-2 rounded bg-gradient-to-r from-purple-600 to-rose-600 text-white text-sm"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="midnite-card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-white">Budget</h2>
        {!editing ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <input
                inputMode="numeric"
                placeholder="+ Add expense"
                value={addAmt}
                onChange={(e) => setAddAmt(e.target.value)}
                className="w-32 rounded bg-white/5 border border-white/10 px-2 py-1 text-xs text-white"
              />
              <button
                onClick={handleQuickAdd}
                className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs"
                title="Add to spent"
              >
                Add
              </button>
            </div>
            <button
              onClick={() => {
                setEditing(true);
                if (budget) {
                  setPlannedInput(String(budget.planned));
                  setSpentInput(String(budget.spent));
                }
              }}
              className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded bg-gradient-to-r from-purple-600 to-rose-600 text-white text-xs"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Bar */}
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

      {/* Read or Edit fields */}
      {!editing ? (
        <p className="mt-2 text-sm text-neutral-400">
          Spent:{" "}
          <span className="text-white font-medium">${fmt(spent)}</span> / Planned:{" "}
          <span className="text-white font-medium">${fmt(planned)}</span>
        </p>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="text-xs text-neutral-300">
            Planned
            <input
              inputMode="numeric"
              value={plannedInput}
              onChange={(e) => setPlannedInput(e.target.value)}
              className="ml-2 w-28 rounded bg-neutral-800 border border-neutral-700 px-2 py-1 text-sm text-white"
            />
          </label>
          <label className="text-xs text-neutral-300">
            Spent
            <input
              inputMode="numeric"
              value={spentInput}
              onChange={(e) => setSpentInput(e.target.value)}
              className="ml-2 w-28 rounded bg-neutral-800 border border-neutral-700 px-2 py-1 text-sm text-white"
            />
          </label>
        </div>
      )}
    </div>
  );
}
