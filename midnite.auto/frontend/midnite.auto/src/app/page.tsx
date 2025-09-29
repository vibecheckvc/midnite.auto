import Image from "next/image";
import Navbar from "../landing/components/navbar";
import Hero from "../landing/components/hero";
import About from "../landing/components/about";
import Contact from "../landing/components/contact";

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
