import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { menu } from "@/lib/menu";
import MenuExplorer from "@/components/menu/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu | The Himalayan Chester",
  description:
    "Explore the multi-cuisine menu at The Himalayan Chester — breakfast, beverages, salads, soups, tandoori starters, Indian & Chinese mains, biryani, breads and desserts.",
};

export default function MenuPage() {
  return (
    <main className="bg-[#0a0f12]">
      {/* Header Banner */}
      <section className="grain relative h-[52vh] min-h-[340px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-section.png"
            alt="The Himalayan Chester dining"
            fill
            priority
            className="object-cover brightness-[0.45]"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-linear-to-b from-black/60 via-black/25 to-[#0a0f12]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-10 md:pb-14">
          <nav className="flex items-center gap-2 text-[11px] md:text-[12px] font-sans uppercase tracking-[2px] text-gray-300 mb-5">
            <Link href="/" className="hover:text-[#c5a367] transition-colors">
              Home
            </Link>
            <span className="text-[#c5a367]">/</span>
            <span className="text-white">Menu</span>
          </nav>

          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-xs md:text-sm font-bold mb-3 block">
            <span className="eyebrow-rule">Dine With Us</span>
          </span>
          <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            Our <span className="italic text-gold-gradient">Menu</span>
          </h1>
        </div>
      </section>

      {/* Tabs + search + filters + items */}
      <MenuExplorer menu={menu} />
    </main>
  );
}
