'use client';

import { useState } from "react";

interface Part {
  id: number;
  title: string;
  price: string;
  location: string;
  img: string;
  description: string;
}

const parts: Part[] = [
  {
    id: 1,
    title: "Winter Tires (Set of 4)",
    price: "$600",
    location: "Brampton, ON",
    img: "https://via.placeholder.com/400x250",
    description:
      "High-quality winter tires, used one season only. Great grip on ice and snow, perfect for Canadian winters.",
  },
  {
    id: 2,
    title: "Audi A4 Headlights",
    price: "$250",
    location: "Vaughan, ON",
    img: "https://via.placeholder.com/400x250",
    description:
      "OEM Audi A4 headlights, in excellent condition. Easy to install, slightly used, fully functional.",
  },
];

export default function CarPartsMarket() {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  return (
    <div className="relative px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Car Parts Marketplace
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {parts.map((part) => (
          <div
            key={part.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden"
            onClick={() => setSelectedPart(part)}
          >
            <img src={part.img} alt={part.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{part.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{part.price} · {part.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setSelectedPart(null)}
            >
              ✕
            </button>
            <img
              src={selectedPart.img}
              alt={selectedPart.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedPart.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {selectedPart.price} · {selectedPart.location}
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4">{selectedPart.description}</p>
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
