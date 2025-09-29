import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      <div className="flex items-center">
        <Link href="/" className="flex items-center text-white hover:text-gray-300 font-semibold text-xl">
          <Image src="/logo.svg" alt="Midnite.auto Logo" width={40} height={40} className="mr-2" />
          Midnite.auto
        </Link>
      </div>
      <div className="hidden lg:flex flex-grow justify-center">
        <ul className="flex space-x-4">
          <li><Link href="/social" className="hover:text-gray-300">Social Network</Link></li>
          <li><Link href="/builds" className="hover:text-gray-300">View Builds</Link></li>
          <li><Link href="/events" className="hover:text-gray-300">Events</Link></li>
          <li><Link href="/pages/garage/my" className="hover:text-gray-300">Garage</Link></li>
        </ul>
      </div>
      <div className="flex-none">
        <Link href="/signup" className="px-4 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700">
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
