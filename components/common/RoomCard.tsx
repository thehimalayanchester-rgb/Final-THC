"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Room } from "@/lib/rooms";
import RoomImageCarousel from "@/components/common/RoomImageCarousel";
import RoomDetailsModal from "@/components/common/RoomDetailsModal";

const RoomCard = ({ room, index = 0 }: { room: Room; index?: number }) => {
  const images =
    room.images && room.images.length > 0 ? room.images : [room.image];
  const [showDetails, setShowDetails] = useState(false);

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
        <RoomImageCarousel images={images} alt={room.name} index={index} />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-serif text-white text-2xl mb-5 group-hover:text-[#c5a367] transition-colors">
          {room.name}
        </h3>

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

        {/* Show Details → opens modal */}
        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="block w-full text-center bg-[#c5a367] hover:bg-white text-black py-4 text-[12px] font-black uppercase tracking-[2px] transition-all duration-500 shadow-lg active:scale-[0.98]"
        >
          Show Details
        </button>
      </div>

      <RoomDetailsModal
        room={room}
        open={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </motion.div>
  );
};

export default RoomCard;
