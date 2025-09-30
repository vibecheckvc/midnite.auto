import Image from "next/image";
import Link from "next/link";
import Navbar from "../src/landing/navbar";
import Hero from "../src/landing/hero";
import About from "../src/landing/about";
import Footer from "../src/landing/footer"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </div>
  );
}
