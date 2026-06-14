"use client";
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonSwimming,
  faSquareParking,
  faWifi,
  faChalkboardUser,
  faSpa,
  faDumbbell,
  faRing,
  faHandshake,
  faChampagneGlasses,
  faMugSaucer,
  faLeaf,
  faSun,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";

const amenities = [
  {
    title: "Swimming Pool",
    desc: "Take a refreshing dip in our pristine pool with mountain views.",
    icon: faPersonSwimming,
  },
  {
    title: "Car Parking",
    desc: "Ample secure on-site parking for all our valued guests.",
    icon: faSquareParking,
  },
  {
    title: "Wi-Fi",
    desc: "Stay connected with complimentary high-speed internet throughout.",
    icon: faWifi,
  },
  {
    title: "Conference Hall",
    desc: "A spacious, fully-equipped hall for seminars and presentations.",
    icon: faChalkboardUser,
  },
  {
    title: "Spa",
    desc: "Rejuvenating therapies and treatments to soothe body and mind.",
    icon: faSpa,
  },
  {
    title: "Indoor Gym",
    desc: "A modern fitness centre to keep up your routine while away.",
    icon: faDumbbell,
  },
  {
    title: "Destination Wedding",
    desc: "Celebrate your special day amid breathtaking Himalayan vistas.",
    icon: faRing,
  },
  {
    title: "Conference Meeting",
    desc: "Professional spaces designed for productive corporate gatherings.",
    icon: faHandshake,
  },
  {
    title: "Event & Party",
    desc: "Host memorable celebrations with our dedicated event services.",
    icon: faChampagneGlasses,
  },
  {
    title: "Coffee Shop",
    desc: "Artisanal coffee, teas and snacks served all day long.",
    icon: faMugSaucer,
  },
];

const Amenities = () => {
  return (
    <section className="bg-[#0a0f12] py-16 md:py-24 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[#c5a367] uppercase tracking-[4px] text-[13px] font-bold mb-4 block"
          >
            <span className="eyebrow-rule">Amenities &amp; Experiences</span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
          >
            Curated <span className="text-gold-gradient italic">For You</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center items-center gap-4 text-[#c5a367] text-lg opacity-80"
          >
            <span className="h-px w-10 bg-linear-to-r from-transparent to-[#c5a367]/60" />
            <FontAwesomeIcon icon={faLeaf} />
            <FontAwesomeIcon icon={faSun} />
            <FontAwesomeIcon icon={faMountain} />
            <span className="h-px w-10 bg-linear-to-l from-transparent to-[#c5a367]/60" />
          </motion.div>
        </div>

        {/* Amenities Grid */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {amenities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="relative overflow-hidden w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)] bg-linear-to-b from-white to-[#f4f1ea] group p-8 lg:p-10 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(197,163,103,0.25)] transition-all duration-300"
            >
              {/* Animated gold top accent */}
              <span className="absolute top-0 left-0 h-[3px] w-0 bg-[#c5a367] group-hover:w-full transition-all duration-500" />

              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-full bg-[#0d1317] flex items-center justify-center mb-6 group-hover:bg-[#c5a367] transition-colors duration-500">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-[#c5a367] text-xl group-hover:text-black transition-colors duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="font-sans text-[#0d1317] text-lg font-bold uppercase tracking-[1px] mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Book Now CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#c5a367] hover:bg-white text-black px-12 py-4 text-[14px] font-black uppercase tracking-[2px] transition-all duration-500 shadow-lg active:scale-[0.98]"
          >
            Book Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;
