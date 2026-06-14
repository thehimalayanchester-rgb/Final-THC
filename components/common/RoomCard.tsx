"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faRulerCombined,
  faUsers,
  faBed,
  faMountainSun,
} from "@fortawesome/free-solid-svg-icons";
import type { Room } from "@/lib/rooms";
import { WHATSAPP_URL } from "@/lib/site";
import RoomImageCarousel from "@/components/common/RoomImageCarousel";

const RoomCard = ({ room, index = 0 }: { room: Room; index?: number }) => {
  const images =
    room.images && room.images.length > 0 ? room.images : [room.image];

  const specs = [
    { icon: faRulerCombined, label: "Size", value: room.size },
    { icon: faUsers, label: "Occupancy", value: room.occupancy },
    { icon: faBed, label: "Bed", value: room.bed },
    { icon: faMountainSun, label: "View", value: room.view },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.15, duration: 0.6 }}
      className="flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] bg-linear-to-b from-[#0f161c] to-[#0b1013] border border-white/5 group hover:border-[#c5a367]/40 transition-all duration-500 shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(197,163,103,0.18)]"
    >
      {/* Image carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <RoomImageCarousel images={images} alt={room.name} />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-serif text-white text-2xl mb-5 group-hover:text-[#c5a367] transition-colors">
          {room.name}
        </h3>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-6">
          {specs.map((s) => (
            <div
              key={s.label}
              className="bg-[#0d1317] p-3 flex items-start gap-2.5"
            >
              <FontAwesomeIcon
                icon={s.icon}
                className="text-[#c5a367] text-sm mt-0.5 shrink-0"
              />
              <div className="min-w-0">
                <span className="block text-[9px] font-sans uppercase tracking-[1px] text-gray-500">
                  {s.label}
                </span>
                <span className="block text-white font-sans text-[12px] font-semibold leading-snug">
                  {s.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Inclusions */}
        {room.inclusions.length > 0 && (
          <div className="mb-6">
            <span className="block text-[#c5a367] text-[11px] font-bold uppercase tracking-[2px] mb-3">
              Inclusions
            </span>
            <div className="flex flex-wrap gap-2">
              {room.inclusions.map((inc) => (
                <span
                  key={inc}
                  className="flex items-center gap-1.5 text-gray-300 text-[12px] font-sans border border-[#c5a367]/30 bg-[#c5a367]/5 px-3 py-1.5"
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-[#c5a367] text-[10px]"
                  />
                  {inc}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mb-6">
          <span className="block text-[#c5a367] text-[11px] font-bold uppercase tracking-[2px] mb-3">
            Room Features
          </span>
          <div className="grid grid-cols-1 gap-2">
            {room.features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2.5 text-gray-400 font-sans text-[13px]"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-[#c5a367]/70 text-[10px] shrink-0"
                />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Rates */}
        <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
          <div className="border border-white/5 bg-white/[0.02] p-4">
            <span className="block text-[#c5a367] text-[10px] font-bold uppercase tracking-[1.5px] mb-2">
              Seasonal
            </span>
            <span className="text-white font-sans text-lg font-bold block">
              ₹{room.seasonal}
            </span>
            <span className="text-gray-500 font-sans text-[11px]">
              {room.seasonalNote}
            </span>
          </div>
          <div className="border border-white/5 bg-white/[0.02] p-4">
            <span className="block text-[#c5a367] text-[10px] font-bold uppercase tracking-[1.5px] mb-2">
              Off-Season
            </span>
            <span className="text-white font-sans text-lg font-bold block">
              ₹{room.offSeason}
            </span>
            <span className="text-gray-500 font-sans text-[11px]">
              {room.offSeasonNote}
            </span>
          </div>
        </div>

        {/* Book Now → WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-[#c5a367] hover:bg-white text-black py-4 text-[12px] font-black uppercase tracking-[2px] transition-all duration-500 shadow-lg active:scale-[0.98]"
        >
          Book Now
        </a>
      </div>
    </motion.div>
  );
};

export default RoomCard;
