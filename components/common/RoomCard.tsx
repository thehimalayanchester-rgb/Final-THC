"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import type { Room } from "@/lib/rooms";

const RoomCard = ({ room, index = 0 }: { room: Room; index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.15, duration: 0.6 }}
      className="flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] bg-linear-to-b from-[#0f161c] to-[#0b1013] border border-white/5 group hover:border-[#c5a367]/40 hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(197,163,103,0.18)]"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient scrim for badge legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        {/* Off-season "from" badge */}
        <div className="absolute top-4 right-4 bg-[#10171F]/90 backdrop-blur-md px-4 py-2 border-b-2 border-[#c5a367]">
          <span className="text-white font-sans text-sm font-bold">
            From ₹{room.offSeason}{" "}
            <span className="text-gray-400 font-normal text-xs">/ night</span>
          </span>
        </div>
      </div>

      {/* Room Content */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-serif text-white text-2xl mb-4 group-hover:text-[#c5a367] transition-colors">
          {room.name}
        </h3>

        <p className="text-gray-500 font-sans text-sm leading-relaxed mb-6">
          {room.desc}
        </p>

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
                  className="flex items-center gap-1.5 text-gray-300 text-[12px] font-sans border border-white/10 px-3 py-1.5"
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-[#c5a367]/70 text-[10px]"
                  />
                  {inc}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Rates: Seasonal vs Off-Season */}
        <div className="grid grid-cols-2 gap-3 mb-8 mt-auto">
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

        <Link
          href={`/rooms/${room.id}`}
          className="block w-full text-center border border-[#c5a367]/40 py-4 text-[#c5a367] text-[12px] font-bold uppercase tracking-[2px] hover:bg-[#c5a367] hover:text-black transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;
