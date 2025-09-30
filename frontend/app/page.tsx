import Image from "next/image";
import Link from "next/link";
import Navbar from "../src/landing/components/navbar/navbar";
import Hero from "../src/landing/components/hero/hero";
import About from "../src/landing/components/about/about";
import Footer from "../src/landing/components/footer/footer"

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
