"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddCarForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // ✅ Check session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user) {
        alert("You must be logged in to add a car.");
        router.push("/login");
      } else {
        setUser(data.session.user);
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // 1️⃣ Upload image if exists
    let imageUrl = "";
    if (image) {
      const { data, error: storageError } = await supabase.storage
        .from("marketplace_cars")
        .upload(`public/${Date.now()}_${image.name}`, image);

      if (storageError) {
        console.error("Storage error:", storageError);
        return alert(storageError.message);
      }

      imageUrl = supabase.storage
        .from("marketplace_cars")
        .getPublicUrl(data.path).data.publicUrl;
    }

    // 2️⃣ Insert new car into Supabase
    const { error } = await supabase.from("marketplace_cars").insert([
      {
        title,
        price: parseFloat(price),
        location,
        description,
        image_url: imageUrl,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      return alert(error.message);
    }

    alert("Car added successfully!");
    router.push("/marketplace");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-6 rounded-2xl shadow-lg max-w-lg mx-auto space-y-5"
    >
      <h2 className="text-2xl font-bold text-white text-center">Add a Car</h2>

      <input
        type="text"
        placeholder="Car title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-32"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full text-white placeholder-gray-400 file:bg-red-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-red-600"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl hover:from-red-500 hover:to-red-700 transition-all duration-300"
      >
        Add Car
      </button>
    </form>
  );
}