import Image from "next/image";
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
    </div>
  );
}
