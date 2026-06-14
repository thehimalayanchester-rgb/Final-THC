"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { GalleryImage } from "@/lib/supabase";

const GalleryView = ({ images }: { images: GalleryImage[] }) => {
  const tags = useMemo(() => {
    const seen: string[] = [];
    for (const img of images) if (!seen.includes(img.tag)) seen.push(img.tag);
    return seen;
  }, [images]);

  const [active, setActive] = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const visible =
    active === "All" ? images : images.filter((i) => i.tag === active);

  if (!images.length) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-24 text-center">
        <p className="text-gray-500 font-sans">
          No images yet. Add some from the admin dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-14 md:py-20">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {["All", ...tags].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={`whitespace-nowrap border px-4 py-2 text-[11px] font-sans font-bold uppercase tracking-[1.5px] transition-colors duration-300 ${
              active === t
                ? "bg-[#c5a367] border-[#c5a367] text-black"
                : "border-white/10 text-gray-300 hover:border-[#c5a367] hover:text-[#c5a367]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Masonry-ish grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {visible.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setLightbox(img)}
            className="group relative mb-4 block w-full overflow-hidden border border-white/5 bg-white/5"
          >
            {/* Optimized thumbnail: Next serves a small, resized WebP sized to the
                column width (~380px on desktop) instead of the full-res original,
                so the grid no longer downloads multi-MB images and hangs.
                width/height 0 + sizes keeps the natural aspect ratio for masonry. */}
            <Image
              src={img.image_url}
              alt={img.alt || img.tag}
              width={0}
              height={0}
              quality={60}
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
              style={{ width: "100%", height: "auto" }}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            <span className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-sans uppercase tracking-[2px] text-white bg-[#0d1317]/80 px-3 py-1 border-b-2 border-[#c5a367]">
              {img.tag}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute top-5 right-5 text-white/70 hover:text-white text-2xl"
              onClick={() => setLightbox(null)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh]"
            >
              <Image
                src={lightbox.image_url}
                alt={lightbox.alt || lightbox.tag}
                width={1400}
                height={1000}
                className="w-auto h-auto max-h-[85vh] object-contain"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryView;
