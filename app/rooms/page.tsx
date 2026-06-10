import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { roomsData } from "@/lib/rooms";
import RoomCard from "@/components/common/RoomCard";
import Amenities from "@/components/home/Amenities";

export const metadata: Metadata = {
  title: "Rooms & Suites | The Himalayan Chester",
  description:
    "Explore our handpicked rooms and suites — from the Superior Rooms to the signature Himalayan Chester Suite, each crafted for an unforgettable Pahari stay.",
};

export default function RoomsPage() {
  return (
    <main className="bg-[#0a0f12]">
      {/* Page Header Banner */}
      <section className="grain relative h-[60vh] min-h-[420px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-Background.png"
            alt="The Himalayan Chester rooms and suites"
            fill
            priority
            className="object-cover brightness-[0.45]"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 z-0 bg-linear-to-b from-black/70 via-black/30 to-[#0a0f12]" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,15,18,0.7)_100%)]" />

        <div className="relative z-10 text-center px-6 max-w-4xl mt-16">
          <span className="font-sans text-[#c5a367] uppercase tracking-[5px] text-xs md:text-sm font-bold mb-5 block">
            <span className="eyebrow-rule">Our Accommodations</span>
          </span>
          <h1 className="font-serif text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Rooms &amp; <span className="italic text-gold-gradient">Suites</span>
          </h1>
          <p className="font-sans text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            From cosy superior rooms to our signature heritage suite, every
            space is steeped in earthy textures, warm woodwork, and sweeping
            Himalayan views.
          </p>

          {/* Breadcrumb */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[12px] font-sans uppercase tracking-[2px] text-gray-400">
            <Link href="/" className="hover:text-[#c5a367] transition-colors">
              Home
            </Link>
            <span className="text-[#c5a367]">/</span>
            <span className="text-white">Rooms</span>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {roomsData.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Amenities & Experiences */}
      <Amenities />

      {/* Closing CTA */}
      <section className="bg-linear-to-b from-[#0a0f12] to-[#0d141b] pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center border-t border-white/5 pt-20">
          <h2 className="font-serif text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
            Not sure which suite is{" "}
            <span className="italic text-gold-gradient">right for you?</span>
          </h2>
          <p className="font-sans text-gray-400 text-base md:text-lg mb-10 leading-relaxed">
            Our team is happy to help you find the perfect room for your
            mountain escape. Reach out or book directly for the best rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="inline-block bg-[#c5a367] hover:bg-white text-black px-12 py-4 text-[14px] font-black uppercase tracking-[2px] transition-all duration-500 shadow-lg active:scale-[0.98]"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-[#c5a367]/40 px-12 py-4 text-[#c5a367] text-[14px] font-bold uppercase tracking-[2px] hover:bg-[#c5a367] hover:text-black transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
