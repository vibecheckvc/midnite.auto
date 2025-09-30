"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import CarMarket from "./components/car_market";
import CarPartsMarket from "./components/carparts_market";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MarketplacePage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"cars" | "parts">("cars");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  if (!user)
    return (
      <div className="text-white p-6">
        Please{" "}
        <button className="underline" onClick={() => router.push("/login")}>
          log in
        </button>{" "}
        to access the marketplace.
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Marketplace</h1>

      {/* Tabs */}
      <div className="relative w-full rounded-full h-12 bg-gray-200 overflow-hidden mb-6">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 rounded-full transition-transform duration-300 transform
            ${
              activeTab === "cars"
                ? "translate-x-0 bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-lg shadow-red-500/50"
                : "translate-x-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 shadow-lg shadow-purple-500/50"
            }`}
        />
        <div className="relative z-10 grid grid-cols-2 h-full">
          <button
            onClick={() => setActiveTab("cars")}
            className={`flex items-center justify-center h-full font-semibold transition-colors duration-200 ${
              activeTab === "cars" ? "text-white" : "text-gray-600"
            }`}
          >
            Cars
          </button>
          <button
            onClick={() => setActiveTab("parts")}
            className={`flex items-center justify-center h-full font-semibold transition-colors duration-200 ${
              activeTab === "parts" ? "text-white" : "text-gray-600"
            }`}
          >
            Car Parts
          </button>
        </div>
      </div>

      {/* Add button as link */}
      <div className="mb-4">
        {activeTab === "cars" ? (
          <Link
            href="/marketplace/addcar"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded inline-block"
          >
            Add Car
          </Link>
        ) : (
          <Link
            href="/marketplace/addcarparts"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded inline-block"
          >
            Add Car Part
          </Link>
        )}
      </div>

      {/* Marketplace listings */}
      <div className="transition-all">
        {activeTab === "cars" ? <CarMarket /> : <CarPartsMarket />}
      </div>
    </div>
  );
}
