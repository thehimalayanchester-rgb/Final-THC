"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  ADDRESS,
} from "@/lib/site";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Rooms", href: "/rooms" },
    { name: "Menu", href: "/menu" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#0d1317] text-white pt-20 pb-10 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
        {/* Column 1: Brand & Bio */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="relative h-20 w-40">
            <Image
              src="/THC_logo.svg"
              alt="The Himalayan Chester"
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="text-gray-400 font-sans leading-relaxed text-[15px] max-w-xs">
            The Himalayan Chester brings you the finest blend of authentic
            Pahari culture and premium luxury, nestled in the pristine heights.
          </p>
          <div className="flex gap-4 mt-2">
            {[
              { icon: faFacebookF, href: FACEBOOK_URL, label: "Facebook" },
              { icon: faInstagram, href: INSTAGRAM_URL, label: "Instagram" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300"
              >
                <FontAwesomeIcon icon={s.icon} className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-serif text-2xl mb-8 border-b border-[#c5a367] w-fit pb-2">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-4">
            {quickLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.name} className="group flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={`text-[#c5a367] text-[10px] transition-all ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-sans transition-colors duration-300 ${
                      active
                        ? "text-[#c5a367] translate-x-0"
                        : "text-gray-400 hover:text-[#c5a367] -translate-x-3 group-hover:translate-x-0"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h4 className="font-serif text-2xl mb-8 border-b border-[#c5a367] w-fit pb-2">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-6 text-gray-400 font-sans text-[15px]">
            <li className="flex gap-4">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-[#c5a367] mt-1"
              />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faPhone} className="text-[#c5a367]" />
              <Link
                href={`tel:${PHONE_TEL}`}
                className="hover:text-white transition-colors"
              >
                {PHONE_DISPLAY}
              </Link>
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#c5a367]" />
              <Link
                href="mailto:info@thehimalayanchester.com"
                className="hover:text-white transition-colors"
              >
                info@thehimalayanchester.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-sans text-sm">
        <p>© {currentYear} The Himalayan Chester. All Rights Reserved.</p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Link
            href="/legal/privacy-policy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/legal/terms"
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/legal/payment-cancellation"
            className="hover:text-white transition-colors"
          >
            Payment &amp; Cancellation
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
