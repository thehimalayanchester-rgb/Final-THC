import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Rooms from "@/components/home/Rooms";
import Amenities from "@/components/home/Amenities";
import CTA from "@/components/home/CTA";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <CTA />
      <Testimonials />
    </main>
  );
}
