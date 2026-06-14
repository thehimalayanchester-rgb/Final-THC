"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { WHATSAPP_URL, FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/site";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  // Smart Scroll Animation: Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Rooms", href: "/rooms" },
    { name: "Menu", href: "/menu" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blogs" },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full fixed top-0 z-50 shadow-2xl"
    >
      {/* Top Bar */}
      <div className="hidden lg:flex w-full bg-[#0d1317] border-b border-white/5 py-2.5 px-12 justify-between items-center text-[14px] font-light tracking-wide text-gray-400 font-sans">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-[#c5a367] w-3.5"
            />
            <span>Mall Road, Manali, HP, India</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPhone} className="text-[#c5a367] w-3.5" />
            <span>+91 98765 43210</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c5a367] transition-colors"
          >
            Facebook
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c5a367] transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="w-full bg-[#0a0f12]/95 backdrop-blur-xl py-5 px-6 lg:px-12 flex justify-between items-center">
        {/* Larger Logo */}
        <Link
          href="/"
          className="relative h-16 w-16 lg:h-24 lg:w-24 transition-transform hover:scale-105 active:scale-95"
        >
          <Image
            src="/THC_logo.svg"
            alt="THC Logo"
            fill
            className="object-contain"
          />
        </Link>

        {/* Desktop Links with Stylish Hover */}
        <ul className="hidden lg:flex items-center gap-12 text-[16px] font-semibold tracking-[2.5px] uppercase font-sans">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`transition-all duration-300 ${
                    active ? "text-[#c5a367]" : "hover:text-[#c5a367]"
                  }`}
                >
                  {link.name}
                </Link>
                {/* Active / hover underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#c5a367] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-6">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-[#c5a367] hover:bg-white hover:text-black text-black px-10 py-4 rounded-none text-[15px] font-black tracking-[2px] uppercase transition-all duration-500 font-sans shadow-[0_0_20px_rgba(197,163,103,0.3)]"
          >
            Book Now
          </a>

          <button
            className="lg:hidden text-[#c5a367] text-3xl p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-screen bg-[#0a0f12] z-[60] flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <Image src="/THC_logo.svg" alt="Logo" width={80} height={80} />
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#c5a367] text-4xl"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <ul className="flex flex-col gap-10 text-3xl font-bold tracking-[4px] uppercase font-sans">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={
                      isActive(link.href)
                        ? "text-[#c5a367]"
                        : "hover:text-[#c5a367] active:text-[#c5a367]"
                    }
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto pb-10 flex flex-col gap-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="bg-[#c5a367] text-black text-center py-5 text-xl rounded-none font-black uppercase tracking-widest"
              >
                Book Now
              </a>
              <div className="flex justify-center gap-12 text-2xl text-gray-400">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-[#c5a367] transition-colors"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-[#c5a367] transition-colors"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
