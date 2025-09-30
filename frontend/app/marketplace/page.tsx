"use client";

import { useState } from "react";
import CarMarket from "./components/car_market";
import CarPartsMarket from "./components/carparts_market";

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<"cars" | "parts">("cars");

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-white mb-6">Marketplace</h1>

      {/* PERFECT sliding pill: no padding on container, indicator is exactly 1/2 width */}
      <div className="relative w-full rounded-full h-12 bg-gray-200 overflow-hidden mb-6">
        {/* Sliding colored background (indicator) */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 rounded-full transition-transform duration-300 transform
            ${activeTab === "cars"
              ? "translate-x-0 bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-lg shadow-red-500/50"
              : "translate-x-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 shadow-lg shadow-purple-500/50"
            }`}
        />

        {/* Buttons (text sits above the indicator) */}
        <div className="relative z-10 grid grid-cols-2 h-full">
          <button
            onClick={() => setActiveTab("cars")}
            className={`flex items-center justify-center h-full font-semibold transition-colors duration-200 ${
              activeTab === "cars" ? "text-white" : "text-gray-600"
            }`}
            aria-pressed={activeTab === "cars"}
          >
            Cars
          </button>

          <button
            onClick={() => setActiveTab("parts")}
            className={`flex items-center justify-center h-full font-semibold transition-colors duration-200 ${
              activeTab === "parts" ? "text-white" : "text-gray-600"
            }`}
            aria-pressed={activeTab === "parts"}
          >
            Car Parts
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="transition-all">
        {activeTab === "cars" ? <CarMarket /> : <CarPartsMarket />}
      </div>
    </div>
  );
}
