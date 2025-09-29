import Image from "next/image";
import Link from "next/link";
import Navbar from "../src/landing/navbar";
import Hero from "../src/landing/hero";
import About from "../src/landing/about";
import Contact from "../src/landing/contact";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Contact />

      <ul>
        <li>
          <Link href="/garage/123">Garage Overview (ID 123)</Link>
        </li>
        <li>
          <Link href="/garage/cars">Cars</Link>
        </li>
        <li>
          <Link href="/garage/settings">Settings</Link>
        </li>
        <li>
          <Link href="/garage/history">History</Link>
        </li>
      </ul>
    </div>
  );
}
