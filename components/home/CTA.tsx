"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
      className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 h-[120%] w-full"
      >
        <Image
          src="/hero-Background.png"
          alt="Himalayan Mountains"
          fill
          className="object-cover brightness-[0.3]"
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-white text-3xl md:text-5xl lg:text-6xl leading-tight mb-6"
        >
          Ready to immerse yourself in the <br />
          <span className="italic text-[#c5a367]">Pahari Elegance?</span>
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
          <Link
            href="/checkout"
            className="inline-block bg-[#c5a367] hover:bg-white text-black px-10 py-5 text-[14px] md:text-[16px] font-black uppercase tracking-[3px] transition-all duration-500 shadow-2xl active:scale-95"
          >
            Book Your Stay Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
