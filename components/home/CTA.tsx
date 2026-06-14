"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/site";
import { useRef } from "react";

const CTA = () => {
  const containerRef = useRef(null);

  // Parallax Effect Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-105 md:h-150 w-full flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 h-[120%] w-full"
      >
        <Image
          src="https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/IMG%2010.png"
          alt="Himalayan Mountains"
          fill
          className="object-cover brightness-[0.3]"
        />
      </motion.div>

      {/* Gradient blend into adjacent dark sections + center focus */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#0a0f12] via-transparent to-[#0a0f12]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,15,18,0.6)_100%)]" />

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-white text-3xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance"
        >
          Ready to immerse yourself in the <br />
          <span className="italic text-gold-gradient">Pahari Elegance?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-sans text-gray-300 text-base md:text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Book direct with us to enjoy exclusive complimentary benefits
          including early check-in and a local welcome drink.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#c5a367] hover:bg-white text-black px-10 py-5 text-[14px] md:text-[16px] font-black uppercase tracking-[3px] transition-all duration-500 shadow-2xl active:scale-95"
          >
            Book Your Stay Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
