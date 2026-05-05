"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import BookingSearch from "./BookingSearch";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-[90vh] md:h-screen w-full flex flex-col items-center justify-center"
    >
      {/* Background Image Container */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero-Background.png"
          alt="The Himalayan Chester Landscape"
          fill
          priority
          className="object-cover brightness-[0.45]"
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-5xl mb-20 md:mb-0">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-sans text-[#c5a367] uppercase tracking-[5px] text-xs md:text-sm font-bold mb-4 block"
        >
          A Heritage Resort
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-serif text-white text-4xl md:text-6xl lg:text-8xl leading-tight mb-6"
        >
          Discover the True Essence of <br />
          <span className="italic text-[#c5a367]">Himalayan Hospitality</span>
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
      </div>

      {/* Floating Booking Section */}
      <div className="absolute bottom-0 left-0 w-full z-30 transform translate-y-1/2 px-4 md:px-10 lg:px-20">
        <BookingSearch />
      </div>
    </motion.section>
  );
};

export default Hero;
