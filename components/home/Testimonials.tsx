"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faQuoteRight,
  faLeaf,
  faSun,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "DELHI, INDIA",
    image: "https://i.pravatar.cc/150?u=priya", // Dummy image
    text: "An absolutely magical stay. The wooden architecture and warm earthy tones made us feel instantly relaxed. The staff treated us like royalty and the views were breathtaking.",
  },
  {
    id: 2,
    name: "Vikram Mehta",
    location: "MUMBAI, INDIA",
    image: "https://i.pravatar.cc/150?u=vikram", // Dummy image
    text: "The perfect escape from the city. Authentic Pahari vibes combined with modern luxury. Waking up to the mountain sunrise from our suite was the highlight of our trip.",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    location: "LONDON, UK",
    image: "https://i.pravatar.cc/150?u=sarah", // Dummy image
    text: "Everything about this resort is curated with love. From the local welcome drink to the guided treks, we felt deeply connected to the culture. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#0a0f12] py-24 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-[13px] font-bold mb-4 block">
            Guest Book
          </span>
          <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Tales from Travellers
          </h2>
          <div className="flex justify-center gap-6 text-[#c5a367] text-lg opacity-80">
            <FontAwesomeIcon icon={faLeaf} />
            <FontAwesomeIcon icon={faSun} />
            <FontAwesomeIcon icon={faMountain} />
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="relative bg-[#0d1317] p-8 md:p-10 border-t-4 border-[#c5a367] shadow-2xl group hover:bg-[#11191f] transition-all duration-500"
            >
              {/* Quote Watermark */}
              <div className="absolute top-8 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <FontAwesomeIcon
                  icon={faQuoteRight}
                  className="text-white text-6xl"
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-[#c5a367] text-xs mb-6">
                {[...Array(5)].map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-sans italic text-gray-300 text-[16px] md:text-[18px] leading-relaxed mb-10 relative z-10">
                &quot;{review.text}&quot;
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#c5a367]/30">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-white text-lg">
                    {review.name}
                  </span>
                  <span className="font-sans text-[#c5a367] text-[11px] font-bold tracking-[2px] uppercase">
                    {review.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
