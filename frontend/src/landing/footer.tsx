import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="shadow-sm bg-slate-900 relative overflow-hidden">
      {/* Checkered racing flag effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0 10px, #000 10px 20px)",
        }}
      ></div>

      <div className="relative w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center font-bold">
          © {currentYear}{" "}
          <Link href="/" className="hover:underline">
            Midnite.auto
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
          <li>
            <Link href="#" className="hover:underline me-4 md:me-6">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

