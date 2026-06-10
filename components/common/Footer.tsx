"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            {[faFacebookF, faInstagram, faTwitter].map((icon, i) => (
              <Link
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300"
              >
                <FontAwesomeIcon icon={icon} className="text-sm" />
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-serif text-2xl mb-8 border-b border-[#c5a367] w-fit pb-2">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-4">
            {quickLinks.map((link) => (
              <li key={link.name} className="group flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-[#c5a367] text-[10px] opacity-0 group-hover:opacity-100 transition-all"
                />
                <Link
                  href={link.href}
                  className="text-gray-400 font-sans hover:text-[#c5a367] transition-colors translate-x-[-12px] group-hover:translate-x-0 duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
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
              <span>
                Mall Road, Near Old Temple, Manali, Himachal Pradesh, India
                175131
              </span>
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faPhone} className="text-[#c5a367]" />
              <Link
                href="tel:+919876543210"
                className="hover:text-white transition-colors"
              >
                +91 98765 43210
              </Link>
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#c5a367]" />
              <Link
                href="mailto:stay@himalayanchester.com"
                className="hover:text-white transition-colors"
              >
                stay@himalayanchester.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-sans text-sm">
        <p>© {currentYear} The Himalayan Chester. All Rights Reserved.</p>
        <div className="flex gap-8">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
