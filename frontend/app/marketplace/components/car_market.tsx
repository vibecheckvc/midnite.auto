'use client';

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";

interface Car {
  id: number;
  title: string;
  price: number;
  location: string;
  image_url: string;
  description: string;
  user_id: string;
}

export default function CarMarket() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch cars from Supabase
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("marketplace_cars")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching cars:", error);
      alert("Failed to load cars");
    } else {
      setCars(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white text-xl">Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="relative px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Car Marketplace
      </h1>

      {cars.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No cars listed yet. Be the first to add one!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden"
              onClick={() => setSelectedCar(car)}
            >
              <img 
                src={car.image_url || "https://via.placeholder.com/400x250"} 
                alt={car.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {car.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  ${car.price.toLocaleString()} · {car.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
              onClick={() => setSelectedCar(null)}
            >
              ✕
            </button>
            <img
              src={selectedCar.image_url || "https://via.placeholder.com/400x250"}
              alt={selectedCar.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedCar.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              ${selectedCar.price.toLocaleString()} · {selectedCar.location}
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              {selectedCar.description}
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