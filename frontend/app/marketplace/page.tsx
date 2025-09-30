"use client";

import { useState } from "react";
import CarMarket from "./components/car_market";
import CarPartsMarket from "./components/carparts_market";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"cars" | "parts">("cars");

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-200 rounded-full p-1 flex w-80">
          <button
            className={`flex-1 py-2 rounded-full font-medium transition ${
              activeTab === "cars" ? "bg-purple-600 text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("cars")}
          >
            Car Marketplace
          </button>
          <button
            className={`flex-1 py-2 rounded-full font-medium transition ${
              activeTab === "parts" ? "bg-purple-600 text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("parts")}
          >
            Car Parts
          </button>
        </div>
      </div>

      {/* Slide Transition */}
      <div className="relative overflow-hidden w-full max-w-6xl mx-auto">
        <div
          className={`flex transition-transform duration-500`}
          style={{
            transform: activeTab === "cars" ? "translateX(0%)" : "translateX(-100%)",
            width: "200%",
          }}
        >
          {/* Car Marketplace */}
          <div className="w-1/2 pr-4">
            <CarMarket />
          </div>

          {/* Car Parts Marketplace */}
          <div className="w-1/2 pl-4">
            <CarPartsMarket />
          </div>
        </div>
      </div>
    </div>
  );
}
