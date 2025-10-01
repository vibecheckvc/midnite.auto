"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";

type AddCarModalProps = {
  userId: string;
  onClose?: () => void;
};

export default function AddCarModal({ userId, onClose }: AddCarModalProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setErrorMsg(null);

    if (!make.trim() || !model.trim() || !year.trim()) {
      setErrorMsg("Please fill in make, model, and year.");
      return;
    }

    const numericYear = Number(year);
    if (
      !Number.isInteger(numericYear) ||
      numericYear < 1900 ||
      numericYear > new Date().getFullYear() + 1
    ) {
      setErrorMsg("Enter a valid numeric year.");
      return;
    }

    setSaving(true);

    let cover_url: string | null = null;
    if (cover) {
      try {
        // compress before upload for speed
        const resized = await compressImage(cover, 1200);
        const path = `${userId}/${Date.now()}_${cover.name.replace(/\s+/g, "_")}`;

        const { error: uploadErr } = await supabase.storage
          .from("car_images")
          .upload(path, resized, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadErr) throw uploadErr;

        const { data: pub } = supabase.storage
          .from("car_images")
          .getPublicUrl(path);
        cover_url = pub?.publicUrl ?? null;
      } catch (e: unknown) {
        if (e instanceof Error) {
          setErrorMsg(`Cover upload failed: ${e.message}`);
        } else {
          setErrorMsg("Cover upload failed: Unknown error");
        }
        setSaving(false);
        return;
      }
    }

    const { error } = await supabase.from("cars").insert([
      {
        user_id: userId,
        make: make.trim(),
        model: model.trim(),
        year: numericYear,
        cover_url,
      },
    ]);

    setSaving(false);

    if (error) {
      setErrorMsg(error.message);
      console.error("Error adding car:", error.message);
      return;
    }

    // reset form
    setMake("");
    setModel("");
    setYear("");
    setCover(null);
    setCoverPreview(null);
    onClose?.();
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">Add a New Car</h2>

      <div className="grid gap-3">
        <input
          type="text"
          placeholder="Make (e.g., Audi)"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white"
        />
        <input
          type="text"
          placeholder="Model (e.g., S4)"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white"
        />
        <input
          type="number"
          placeholder="Year (e.g., 2013)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white"
        />
        <label className="block">
          <span className="text-sm text-neutral-300">Cover Photo (optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setCover(f);
              setCoverPreview(f ? URL.createObjectURL(f) : null);
            }}
            className="mt-1 w-full rounded-lg bg-neutral-800 p-2 border border-neutral-700 text-white file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-sm file:text-white hover:file:bg-white/20"
          />
        </label>
        {coverPreview && (
          <div className="relative mt-2 h-32 w-full rounded-lg border border-neutral-700 overflow-hidden">
            <Image
              src={coverPreview}
              alt="Preview"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {errorMsg && <p className="text-sm text-red-300">{errorMsg}</p>}

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
          disabled={saving}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-rose-600 rounded-lg text-white font-semibold disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

/** util: compress an image before upload */
async function compressImage(file: File, maxSize: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const ratio = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));

  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width * ratio;
  canvas.height = bitmap.height * ratio;

  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.85)
  );
}
