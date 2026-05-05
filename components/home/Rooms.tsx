"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faUsers,
  faBed,
  faLeaf,
  faSun,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";

const roomsData = [
  {
    id: 1,
    name: "The Deodar Suite",
    price: "8,500",
    image: "/room_dummy.png",
    sqft: "400 sqft",
    guests: "2 Guests",
    bed: "1 King",
    desc: "Decorated with rich local woodwork and handwoven textiles, offering sweeping views of the lush valley...",
  },
  {
    id: 2,
    name: "Kullu Heritage Room",
    price: "6,000",
    image: "/room_dummy.png",
    sqft: "400 sqft",
    guests: "2 Guests",
    bed: "1 King",
    desc: "Decorated with rich local woodwork and handwoven textiles, offering sweeping views of the lush valley...",
  },
  {
    id: 3,
    name: "Alpine Family Cottage",
    price: "12,000",
    image: "/room_dummy.png",
    sqft: "400 sqft",
    guests: "2 Guests",
    bed: "1 King",
    desc: "Decorated with rich local woodwork and handwoven textiles, offering sweeping views of the lush valley...",
  },
];

const Rooms = () => {
  return (
    <section className="bg-[#10171F] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-[13px] font-bold mb-4 block">
            Our Accommodations
          </span>
          <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Earthy Comforts
          </h2>
          <div className="flex justify-center gap-6 text-[#c5a367] text-lg opacity-80">
            <FontAwesomeIcon icon={faLeaf} />
            <FontAwesomeIcon icon={faSun} />
            <FontAwesomeIcon icon={faMountain} />
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsData.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-[#0d1317] border border-white/5 group hover:border-[#c5a367]/30 transition-all duration-500 shadow-xl"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-[#10171F]/90 backdrop-blur-md px-4 py-2 border-b-2 border-[#c5a367]">
                  <span className="text-white font-sans text-sm font-bold">
                    ₹{room.price}{" "}
                    <span className="text-gray-400 font-normal text-xs">
                      / night
                    </span>
                  </span>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-8">
                <h3 className="font-serif text-white text-2xl mb-4 group-hover:text-[#c5a367] transition-colors">
                  {room.name}
                </h3>

                {/* Icons row */}
                <div className="flex items-center gap-4 text-gray-400 text-[12px] font-sans mb-6">
                  <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon
                      icon={faExpand}
                      className="text-[#c5a367]/60"
                    />
                    <span>{room.sqft}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="text-[#c5a367]/60"
                    />
                    <span>{room.guests}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon
                      icon={faBed}
                      className="text-[#c5a367]/60"
                    />
                    <span>{room.bed}</span>
                  </div>
                </div>

                <p className="text-gray-500 font-sans text-sm leading-relaxed mb-8 line-clamp-2">
                  {room.desc}
                </p>

                <Link
                  href={`/rooms/${room.id}`}
                  className="block w-full text-center border border-[#c5a367]/40 py-4 text-[#c5a367] text-[12px] font-bold uppercase tracking-[2px] hover:bg-[#c5a367] hover:text-black transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
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
