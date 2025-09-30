'use client';

import { useState } from "react";

interface Car {
  id: number;
  title: string;
  price: string;
  location: string;
  img: string;
  description: string;
}

const cars: Car[] = [
  {
    id: 1,
    title: "2018 BMW M3",
    price: "$45,000",
    location: "Toronto, ON",
    img: "https://via.placeholder.com/400x250",
    description:
      "Sporty BMW M3, excellent condition, fully serviced, low mileage, perfect for enthusiasts.",
  },
  {
    id: 2,
    title: "2020 Audi A4",
    price: "$32,500",
    location: "Mississauga, ON",
    img: "https://via.placeholder.com/400x250",
    description:
      "Luxury Audi A4, great condition, loaded with features, clean history, recently detailed.",
  },
];

export default function CarMarket() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  return (
    <div className="relative px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Car Marketplace
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden"
            onClick={() => setSelectedCar(car)}
          >
            <img src={car.img} alt={car.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{car.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{car.price} · {car.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setSelectedCar(null)}
            >
              ✕
            </button>
            <img
              src={selectedCar.img}
              alt={selectedCar.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedCar.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {selectedCar.price} · {selectedCar.location}
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4">{selectedCar.description}</p>
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
