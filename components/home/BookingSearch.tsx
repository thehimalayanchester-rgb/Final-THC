"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUsers,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const BookingSearch = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="relative z-50 max-w-7xl mx-auto bg-[#0d1317] border-b-[3px] border-[#c5a367] p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 items-end">
        {/* Check-In */}
        <div className="flex flex-col gap-3">
          <label className="text-[#c5a367] text-[11px] font-bold uppercase tracking-[2px] font-sans">
            Check-In
          </label>
          <div className="relative border border-white/10 p-4 flex justify-between items-center bg-transparent group hover:border-[#c5a367]/50 transition-all duration-300">
            <input
              type="text"
              placeholder="24 Oct, 2023"
              className="bg-transparent text-white outline-none w-full font-sans cursor-pointer text-sm"
            />
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-[#c5a367] text-sm opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Check-Out */}
        <div className="flex flex-col gap-3">
          <label className="text-[#c5a367] text-[11px] font-bold uppercase tracking-[2px] font-sans">
            Check-Out
          </label>
          <div className="relative border border-white/10 p-4 flex justify-between items-center bg-transparent group hover:border-[#c5a367]/50 transition-all duration-300">
            <input
              type="text"
              placeholder="28 Oct, 2023"
              className="bg-transparent text-white outline-none w-full font-sans cursor-pointer text-sm"
            />
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-[#c5a367] text-sm opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex flex-col gap-3">
          <label className="text-[#c5a367] text-[11px] font-bold uppercase tracking-[2px] font-sans">
            Guests
          </label>
          <div className="relative border border-white/10 p-4 flex justify-between items-center bg-transparent group hover:border-[#c5a367]/50 transition-all duration-300">
            <input
              type="text"
              placeholder="2 Adults, 1 Child"
              className="bg-transparent text-white outline-none w-full font-sans cursor-pointer text-sm"
            />
            <FontAwesomeIcon
              icon={faUsers}
              className="text-[#c5a367] text-sm opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Room Type */}
        <div className="flex flex-col gap-3">
          <label className="text-[#c5a367] text-[11px] font-bold uppercase tracking-[2px] font-sans">
            Room Type
          </label>
          <div className="relative border border-white/10 p-4 flex justify-between items-center bg-transparent group hover:border-[#c5a367]/50 transition-all duration-300">
            <select className="bg-transparent text-white outline-none w-full font-sans cursor-pointer appearance-none text-sm">
              <option className="bg-[#0d1317]">Heritage Suite</option>
              <option className="bg-[#0d1317]">Deluxe Room</option>
              <option className="bg-[#0d1317]">Royal Pahari Hut</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-[#c5a367] text-xs opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-[#c5a367] hover:bg-white text-black font-black uppercase text-[13px] tracking-[2px] py-5 px-4 transition-all duration-500 h-[58px] shadow-lg active:scale-[0.98]">
          Check Availability
        </button>
      </div>
    </motion.div>
  );
};

export default BookingSearch;
