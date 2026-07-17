"use client";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";

/**
 * Auto-scrolling image carousel for a room card.
 * - Autoplays + loops when there is more than one image.
 * - Custom gold arrow controls (prev / next).
 * - Single image falls back to a plain optimized <Image> with no controls.
 */
const RoomImageCarousel = ({
  images,
  alt,
  index = 0,
}: {
  images: string[];
  alt: string;
  index?: number;
}) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

  // Stagger autoplay per card so the carousels don't all slide in sync.
  // Base 3500ms + a per-card offset spreads them out across the grid.
  const autoplayDelay = 3500 + (index % 4) * 900;

  // Single image: no carousel needed.
  if (images.length <= 1) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
    );
  }

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        onSwiper={(s) => (swiperRef.current = s)}
        loop
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        speed={800}
        className="h-full w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src} className="relative">
            <Image
              src={src}
              alt={`${alt} — photo ${i + 1}`}
              fill
              sizes={sizes}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Arrow controls */}
      <button
        type="button"
        aria-label="Previous image"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-[#0a0f12]/60 backdrop-blur-sm border border-white/15 text-white hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-[#0a0f12]/60 backdrop-blur-sm border border-white/15 text-white hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
      </button>
    </>
  );
};

export default RoomImageCarousel;
