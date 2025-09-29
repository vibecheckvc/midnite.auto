import Image from "next/image";
import Navbar from "../src/landing/components/navbar";
import Hero from "../src/landing/components/hero";
import About from "../src/landing/components/about";
import Contact from "../src/landing/components/contact";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Contact />
    </div>
  );
}
