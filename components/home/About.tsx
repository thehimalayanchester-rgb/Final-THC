"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  return (
    // Reduced padding: 180px on mobile is enough to clear the stacked bar
    <section className="bg-[#0a0f12] pt-[300px] pb-24 md:pt-40 md:pb-32 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Side: Image with Experience Badge */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full lg:w-1/2"
        >
          <div className="relative aspect-[4/5] w-full border border-white/10 p-3 lg:p-4">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/about-section.png"
                alt="The Himalayan Chester Interior"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Experience Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-[-20px] right-[-10px] md:bottom-[-30px] md:right-[-30px] bg-[#0d1317] border-l-4 border-[#c5a367] p-6 md:p-8 shadow-2xl z-10 w-[220px] md:w-[280px]"
          >
            <h3 className="font-serif text-[#c5a367] text-3xl md:text-4xl mb-2">
              25+
            </h3>
            <p className="font-sans text-white text-[10px] md:text-[12px] font-bold uppercase tracking-[2px] leading-tight">
              Years of Preserving Pahari Heritage
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-[13px] font-bold mb-6 block">
            Welcome to Our World
          </span>

          <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-7xl leading-tight mb-8">
            A Sanctuary of <br />
            <span className="italic font-normal">Peace & Culture</span>
          </h2>

          <div className="space-y-6 text-gray-400 font-sans text-[16px] md:text-[18px] leading-relaxed font-light">
            <p>
              Nestled in the breathtaking valleys of the Himalayas, The
              Himalayan Chester offers an exquisite blend of traditional Pahari
              architecture and modern luxury. Every room tells a story, adorned
              with local craftsmanship and warm earthy textures.
            </p>
            <p>
              Experience the soulful rhythm of mountain life, where the fresh
              alpine air meets the comforting scent of deodar wood.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-6 border-l border-[#c5a367]/30 pl-6">
            <div className="flex flex-col">
              <span className="font-serif text-white text-2xl md:text-3xl">
                Rajesh Thakur
              </span>
              <span className="font-sans text-[#c5a367] text-[12px] font-bold uppercase tracking-[3px] mt-1">
                Founder & Host
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
