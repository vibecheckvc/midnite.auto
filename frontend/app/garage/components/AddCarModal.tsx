// app/garage/components/AddCarModal.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

type AddCarModalProps = {
  userId: string;
  onClose?: () => void; // optional close handler
};

export default function AddCarModal({ userId, onClose }: AddCarModalProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async () => {
    if (!make || !model || !year) return;

    const { error } = await supabase.from("cars").insert([
      {
        user_id: userId,
        make,
        model,
        year,
      },
    ]);

    if (error) {
      console.error("Error adding car:", error.message);
    } else {
      if (onClose) onClose();
      setMake("");
      setModel("");
      setYear("");
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">Add a New Car</h2>

      <input
        type="text"
        placeholder="Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
        className="w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white"
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white"
      />
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white"
      />

      <div className="flex justify-end gap-3">
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded-lg text-white"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-red-600 rounded-lg text-white font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  );
}
