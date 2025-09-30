'use client';

import { useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddCarForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1️⃣ Upload image if exists
    let imageUrl = "";
    if (image) {
      const { data, error: storageError } = await supabase.storage
        .from("cars-images")
        .upload(`public/${Date.now()}_${image.name}`, image);
      if (storageError) return alert(storageError.message);

      // Get public URL
      imageUrl = supabase.storage.from("cars-images").getPublicUrl(data.path).data.publicUrl;
    }

    // 2️⃣ Insert new car into Supabase
    const { error } = await supabase.from("cars").insert([
      {
        title,
        price: parseFloat(price),
        location,
        description,
        image_url: imageUrl,
        user_id: supabase.auth.getUser()?.data.user.id
      }
    ]);

    if (error) alert(error.message);
    else {
      alert("Car added successfully!");
      router.push("/car-market"); // redirect to car marketplace
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Car title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <input type="file" onChange={e => setImage(e.target.files?.[0] || null)} />
      <button type="submit">Add Car</button>
    </form>
  );
}
