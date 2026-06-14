"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const MIN_VISIBLE_MS = 800;

export default function Preloader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [prevPath, setPrevPath] = useState(pathname);

  // Re-show the preloader whenever the route changes (render-time reset).
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setLoading(true);
  }

  useEffect(() => {
    const start = performance.now();
    let timer: ReturnType<typeof setTimeout>;

    const finish = () => {
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      timer = setTimeout(() => setLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="grain fixed inset-0 z-200 flex flex-col items-center justify-center bg-[#0a0f12]"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [1, 1.05, 1] }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative w-28 h-28 md:w-36 md:h-36 mb-10"
          >
            <Image
              src="/THC_logo.svg"
              alt="The Himalayan Chester"
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          {/* Loading bar */}
          <div className="h-0.5 w-44 overflow-hidden bg-white/10">
            <motion.div
              initial={{ x: "-110%" }}
              animate={{ x: "210%" }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/2 bg-[#c5a367]"
            />
          </div>

          <span className="mt-6 font-sans text-[#c5a367] text-[11px] uppercase tracking-[4px] font-bold">
            The Himalayan Chester
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
