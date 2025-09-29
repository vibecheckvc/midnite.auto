import React from 'react';
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">
          <Image src="/logo.svg" alt="Midnite.auto Logo" width={40} height={40} className="mr-2" />
          Midnite.auto
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Social Network</a></li>
          <li><a>View Builds</a></li>
          <li><a>Events</a></li>
          <li><a>Garage</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-primary">Join Now</a>
      </div>
    </div>
  );
};

export default Navbar;
