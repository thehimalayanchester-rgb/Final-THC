"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
  faRulerCombined,
  faUsers,
  faBed,
  faMountainSun,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import type { Room } from "@/lib/rooms";
import { WHATSAPP_URL } from "@/lib/site";

const RoomDetailsModal = ({
  room,
  open,
  onClose,
}: {
  room: Room;
  open: boolean;
  onClose: () => void;
}) => {
  const images =
    room.images && room.images.length > 0 ? room.images : [room.image];
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  // Reset to the first image each time the modal opens.
  useEffect(() => {
    if (open) {
      setActive(0);
      setZoomed(false);
    }
  }, [open]);

  // Close on Escape + lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomed) setZoomed(false);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, zoomed]);

  const specs = [
    { icon: faRulerCombined, label: "Size", value: room.size },
    { icon: faUsers, label: "Occupancy", value: room.occupancy },
    { icon: faBed, label: "Bed", value: room.bed },
    { icon: faMountainSun, label: "View", value: room.view },
  ];

  const prevImg = () =>
    setActive((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setActive((i) => (i + 1) % images.length);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${room.name} details`}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto no-scrollbar bg-linear-to-b from-[#11191f] to-[#0b1013] border border-white/10 shadow-2xl"
          >
            {/* Close */}
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-[#0a0f12]/70 backdrop-blur-sm border border-white/15 text-white hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Gallery */}
              <div className="p-4 sm:p-5 lg:p-6 lg:border-r border-white/5">
                {/* Main image */}
                <div className="group/main relative aspect-[4/3] overflow-hidden bg-white/5">
                  <button
                    type="button"
                    aria-label="Zoom image"
                    onClick={() => setZoomed(true)}
                    className="absolute inset-0 z-[5] cursor-zoom-in"
                  >
                    <Image
                      key={images[active]}
                      src={images[active]}
                      alt={`${room.name} — photo ${active + 1}`}
                      fill
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover/main:scale-[1.03]"
                    />
                  </button>

                  {/* Zoom hint button */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#0a0f12]/70 backdrop-blur-sm border border-white/15 text-white text-[11px] font-sans px-2.5 py-1.5 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="text-[11px]" />
                    Zoom
                  </span>

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous image"
                        onClick={prevImg}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-[#0a0f12]/60 backdrop-blur-sm border border-white/15 text-white hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={nextImg}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-[#0a0f12]/60 backdrop-blur-sm border border-white/15 text-white hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300"
                      >
                        <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                      </button>
                      <span className="absolute bottom-3 right-3 z-10 bg-[#0a0f12]/75 text-white text-[11px] font-sans px-2.5 py-1">
                        {active + 1} / {images.length}
                      </span>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        aria-label={`View photo ${i + 1}`}
                        onClick={() => setActive(i)}
                        className={`relative shrink-0 w-16 h-16 sm:w-[72px] sm:h-[72px] overflow-hidden border transition-colors ${
                          active === i
                            ? "border-[#c5a367]"
                            : "border-white/10 hover:border-white/40 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 sm:p-8 flex flex-col">
                <h3 className="font-serif text-white text-2xl sm:text-3xl mb-1">
                  {room.name}
                </h3>
                <span className="block h-[2px] w-12 bg-[#c5a367] mb-5" />

                {/* Description */}
                {room.longDesc?.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {room.longDesc.map((p, i) => (
                      <p
                        key={i}
                        className="text-gray-400 font-sans text-[14px] leading-relaxed font-light"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}

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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                <div className="grid grid-cols-2 gap-3 mb-6">
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

                {/* CTA */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto block w-full text-center bg-[#c5a367] hover:bg-white text-black py-4 text-[12px] font-black uppercase tracking-[2px] transition-all duration-500 shadow-lg active:scale-[0.98]"
                >
                  Book Now
                </a>
              </div>
            </div>

            {/* Full-screen zoom lightbox */}
            <AnimatePresence>
              {zoomed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setZoomed(false)}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${room.name} — enlarged photo`}
                  className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-8 bg-black/95 cursor-zoom-out"
                >
                  <button
                    type="button"
                    aria-label="Close zoom"
                    onClick={() => setZoomed(false)}
                    className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-[#0a0f12]/70 backdrop-blur-sm border border-white/15 text-white hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>

                  <motion.div
                    key={images[active]}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ type: "spring", damping: 28, stiffness: 220 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full h-full max-w-6xl"
                  >
                    <Image
                      src={images[active]}
                      alt={`${room.name} — enlarged photo ${active + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </motion.div>

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous image"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImg();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-[#0a0f12]/60 backdrop-blur-sm border border-white/15 text-white hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImg();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-[#0a0f12]/60 backdrop-blur-sm border border-white/15 text-white hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300"
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 bg-[#0a0f12]/75 text-white text-[12px] font-sans px-3 py-1.5">
                        {active + 1} / {images.length}
                      </span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoomDetailsModal;
