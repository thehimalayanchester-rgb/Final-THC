import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGalleryImages } from "@/lib/supabase";
import GalleryView from "@/components/gallery/GalleryView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | The Himalayan Chester",
  description:
    "A visual journey through The Himalayan Chester: our rooms, dining, views and moments from the mountains.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className="bg-[#0a0f12]">
      {/* Header Banner */}
      <section className="grain relative h-[48vh] min-h-[320px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-section.png"
            alt="The Himalayan Chester gallery"
            fill
            priority
            className="object-cover brightness-[0.65]"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-linear-to-b from-black/60 via-black/25 to-[#0a0f12]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-10 md:pb-12">
          <nav className="flex items-center gap-2 text-[11px] md:text-[12px] font-sans uppercase tracking-[2px] text-gray-300 mb-5">
            <Link href="/" className="hover:text-[#c5a367] transition-colors">
              Home
            </Link>
            <span className="text-[#c5a367]">/</span>
            <span className="text-white">Gallery</span>
          </nav>

          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-xs md:text-sm font-bold mb-3 block">
            <span className="eyebrow-rule">Moments</span>
          </span>
          <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            Our <span className="italic text-gold-gradient">Gallery</span>
          </h1>
        </div>
      </section>

      <GalleryView images={images} />
    </main>
  );
}
