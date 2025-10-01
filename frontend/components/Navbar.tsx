"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/garage", label: "Garage" },
  { href: "/events", label: "Events" },
  { href: "/builds", label: "Builds" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl px-4 py-3 shadow-[0_0_50px_-20px_rgba(217,70,239,0.5)]">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Midnite.auto" width={28} height={28} />
            <span className="font-semibold tracking-wide">Midnite.auto</span>
          </Link>

          {/* desktop nav */}
          <ul className="hidden md:flex items-center gap-2">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={[
                      "px-3 py-2 rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60",
                      active
                        ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-rose-600 shadow-[0_0_25px_-6px_rgba(244,63,94,0.7)]"
                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                    ].join(" ")}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* mobile button */}
          <button
            aria-label="Open menu"
            className="md:hidden rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </nav>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-xs bg-neutral-950 border-l border-white/10 p-5">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold">Menu</span>
              <button
                className="rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-lg px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
