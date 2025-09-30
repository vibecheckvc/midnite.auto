'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Crew', href: '/crew' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Garage', href: '/garage' },
  { name: 'Profile', href: '/profile' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-purple-600/20 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-red-500 bg-clip-text text-transparent"
        >
          Midnite
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-all ${
                pathname === item.href
                  ? 'text-fuchsia-400 border-b-2 border-fuchsia-500 pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 border-t border-purple-600/20 px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block transition-all ${
                pathname === item.href
                  ? 'text-fuchsia-400'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
