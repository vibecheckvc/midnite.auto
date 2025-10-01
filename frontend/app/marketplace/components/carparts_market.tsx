"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";

interface Part {
  id: number;
  title: string;
  price: number;
  location: string;
  image_url: string;
  description: string;
  user_id: string;
}

export default function CarPartsMarket() {
  const [parts, setParts] = useState<Part[]>([]);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch parts from Supabase
  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("marketplace_carparts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching parts:", error);
      alert("Failed to load car parts");
    } else {
      setParts(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white text-xl">Loading car parts...</p>
      </div>
    );
  }

  return (
    <div className="relative px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Car Parts Marketplace
      </h1>

      {parts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No car parts listed yet. Be the first to add one!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((part) => (
            <div
              key={part.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden"
              onClick={() => setSelectedPart(part)}
            >
              <img
                src={part.image_url || "https://via.placeholder.com/400x250"}
                alt={part.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {part.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  ${part.price} · {part.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
              onClick={() => setSelectedPart(null)}
            >
              ✕
            </button>
            <img
              src={
                selectedPart.image_url || "https://via.placeholder.com/400x250"
              }
              alt={selectedPart.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedPart.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              ${selectedPart.price} · {selectedPart.location}
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              {selectedPart.description}
            </p>
            <button
              className="w-full text-white bg-gradient-to-r from-gray-800 via-gray-900 to-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black dark:hover:bg-gradient-to-br"
              onClick={() => alert("Contact seller functionality coming soon!")}
            >
              Contact Seller
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
