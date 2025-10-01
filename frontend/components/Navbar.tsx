"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/crew", label: "Crew" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/garage", label: "Garage" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="midnite-navbar fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-purple-900/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center py-4">
        {/* 🔥 Centered nav menu */}
        <div className="flex space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-white border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-purple-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
