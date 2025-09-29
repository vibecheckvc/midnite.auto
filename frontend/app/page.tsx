import Image from "next/image";
import Navbar from "./landing/navbar";
import Hero from "./landing/hero";
import About from "./landing/about";
import Contact from "./landing/contact";

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
