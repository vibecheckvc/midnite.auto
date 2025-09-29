import Image from "next/image";
<<<<<<< HEAD
import Navbar from "../src/landing/navbar";
import Hero from "../src/landing/hero";
import About from "../src/landing/about";
import Contact from "../src/landing/contact";
=======
import Navbar from "./landing/navbar";
import Hero from "./landing/hero";
import About from "./landing/about";
import Contact from "./landing/contact";
>>>>>>> 15a22ad3616a0aa82f6cc8e3b9f1068a98bb5b67

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
