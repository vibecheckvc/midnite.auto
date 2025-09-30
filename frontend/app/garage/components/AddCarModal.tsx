"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export function AddCarModal({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("cars").insert({
      user_id: userId,
      year: parseInt(year, 10),
      make,
      model,
      trim,
      cover_url: coverUrl || null,
    });

    setLoading(false);
    if (error) {
      console.error("Error adding car:", error.message);
      alert("❌ Could not add car");
    } else {
      alert("✅ Car added!");
      setOpen(false);
      // optional: clear fields
      setYear("");
      setMake("");
      setModel("");
      setTrim("");
      setCoverUrl("");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-4 py-2 text-white font-medium hover:bg-gradient-to-br shadow-lg shadow-purple-700/40"
      >
        + Add Car
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Add a New Car
            </h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input
                type="text"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded border p-2 bg-neutral-800 text-white"
              />
              <input
                type="text"
                placeholder="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full rounded border p-2 bg-neutral-800 text-white"
              />
              <input
                type="text"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded border p-2 bg-neutral-800 text-white"
              />
              <input
                type="text"
                placeholder="Trim"
                value={trim}
                onChange={(e) => setTrim(e.target.value)}
                className="w-full rounded border p-2 bg-neutral-800 text-white"
              />
              <input
                type="text"
                placeholder="Cover Image URL"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                className="w-full rounded border p-2 bg-neutral-800 text-white"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br text-white shadow-lg shadow-red-700/40 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
