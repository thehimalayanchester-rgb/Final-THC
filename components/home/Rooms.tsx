"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faSun, faMountain } from "@fortawesome/free-solid-svg-icons";
import { roomsData } from "@/lib/rooms";
import RoomCard from "@/components/common/RoomCard";

const Rooms = () => {
  return (
    <section className="relative bg-linear-to-b from-[#10171F] to-[#0d141b] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-[13px] font-bold mb-4 block">
            <span className="eyebrow-rule">Our Accommodations</span>
          </span>
          <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Earthy <span className="text-gold-gradient italic">Comforts</span>
          </h2>
          <div className="flex justify-center items-center gap-4 text-[#c5a367] text-lg opacity-80">
            <span className="h-px w-10 bg-linear-to-r from-transparent to-[#c5a367]/60" />
            <FontAwesomeIcon icon={faLeaf} />
            <FontAwesomeIcon icon={faSun} />
            <FontAwesomeIcon icon={faMountain} />
            <span className="h-px w-10 bg-linear-to-l from-transparent to-[#c5a367]/60" />
          </div>
        </div>

        {/* Rooms Grid — featured 3 on the home page */}
        <div className="flex flex-wrap justify-center gap-8">
          {roomsData.slice(0, 3).map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href="/rooms"
            className="inline-block bg-[#c5a367] hover:bg-white text-black px-12 py-4 text-[14px] font-black uppercase tracking-[2px] transition-all duration-500 shadow-lg"
          >
            View All Rooms
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
