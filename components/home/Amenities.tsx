"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faFire,
  faMapMarkedAlt,
  faWifi,
  faCoffee,
  faCar,
  faSpa,
  faSnowflake,
  faLeaf,
  faSun,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";

const amenities = [
  {
    title: "Traditional Dining",
    desc: "Savor authentic Himachali Dham and local delicacies.",
    icon: faUtensils,
  },
  {
    title: "Bonfire Nights",
    desc: "Cozy evenings under the stars with live local music.",
    icon: faFire,
  },
  {
    title: "Guided Treks",
    desc: "Explore hidden trails and alpine meadows with experts.",
    icon: faMapMarkedAlt,
  },
  {
    title: "High-Speed Wi-Fi",
    desc: "Stay connected even in the remote mountains.",
    icon: faWifi,
  },
  {
    title: "Café & Lounge",
    desc: "Artisanal coffee and teas overlooking the peaks.",
    icon: faCoffee,
  },
  {
    title: "Airport Transfers",
    desc: "Seamless pickup and drop facilities available.",
    icon: faCar,
  },
  {
    title: "Ayurvedic Spa",
    desc: "Rejuvenating therapies using mountain herbs.",
    icon: faSpa,
  },
  {
    title: "Winter Sports",
    desc: "Skiing and snowboarding arrangements nearby.",
    icon: faSnowflake,
  },
];

const Amenities = () => {
  return (
    <section className="bg-[#0a0f12] py-24 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[#c5a367] uppercase tracking-[4px] text-[13px] font-bold mb-4 block"
          >
            Amenities & Experiences
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
          >
            Curated For You
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-6 text-[#c5a367] text-lg opacity-80"
          >
            <FontAwesomeIcon icon={faLeaf} />
            <FontAwesomeIcon icon={faSun} />
            <FontAwesomeIcon icon={faMountain} />
          </motion.div>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
              className="bg-white group p-8 lg:p-10 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(197,163,103,0.2)] transition-all duration-300"
            >
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
      </div>
    </section>
  );
};

export default Amenities;
