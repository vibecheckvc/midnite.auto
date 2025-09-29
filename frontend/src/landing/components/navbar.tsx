import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <Image src="/logo.svg" alt="Midnite.auto Logo" width={40} height={40} className="mr-2" />
          Midnite.auto
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/social">Social Network</Link></li>
          <li><Link href="/builds">View Builds</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/garage/my">Garage</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/signup" className="btn btn-primary">
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
