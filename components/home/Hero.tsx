"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/site";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="grain relative h-[90vh] md:h-screen w-full flex flex-col items-center justify-center pt-26 lg:pt-44 overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/LB-7.png"
          alt="The Himalayan Chester Landscape"
          fill
          priority
          className="object-cover brightness-[0.5]"
        />
      </motion.div>

      {/* Cinematic gradient overlays for depth & legibility */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/60 via-black/20 to-[#0a0f12]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,15,18,0.75)_100%)]" />

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-sans text-[#c5a367] uppercase tracking-[5px] text-xs md:text-sm font-bold mb-4 block"
        >
          <span className="eyebrow-rule">A Heritage Resort</span>
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-serif text-white text-4xl md:text-6xl lg:text-8xl leading-tight mb-6"
        >
          Discover the True Essence of <br />
          <span className="italic text-gold-gradient">Himalayan Hospitality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="font-sans text-gray-200 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-light"
        >
          Immerse yourself in earthy traditions, rich textures, and breathtaking
          views, where every detail echoes the warmth of Pahari culture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#c5a367] hover:bg-white text-black px-10 py-5 text-[14px] md:text-[16px] font-black uppercase tracking-[3px] transition-all duration-500 shadow-2xl active:scale-95"
          >
            Book Now
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
