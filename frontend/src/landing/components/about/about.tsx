"use client";

import { Users, Car, Calendar, Archive } from "lucide-react"; // Lucide icons
import React from "react";

const About = () => {
  const features = [
    {
      title: "Social Network",
      description:
        "Connect with fellow enthusiasts, share your latest modifications, and explore stunning car content from around the globe.",
      icon: <Users className="w-10 h-10 text-purple-600 mb-4" />,
    },
    {
      title: "View Your Builds",
      description:
        "Create detailed profiles for each of your vehicles, track your progress, and get feedback from the community.",
      icon: <Car className="w-10 h-10 text-green-500 mb-4" />,
    },
    {
      title: "Events Pages",
      description:
        "Discover and organize local meetups, car shows, and track events. Never miss an opportunity to show off your ride or see others'.",
      icon: <Calendar className="w-10 h-10 text-blue-500 mb-4" />,
    },
    {
      title: "Personal Garage",
      description:
        "A dedicated space to manage your car collection, dream builds, and project plans.",
      icon: <Archive className="w-10 h-10 text-red-500 mb-4" />,
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 rounded-lg shadow-md border-black text-left"
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold mb-2 text-black">{feature.title}</h3>
              <p className="text-slate-900">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
