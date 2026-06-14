import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | The Himalayan Chester",
  description:
    "Get in touch with The Himalayan Chester, Manali. Send us a message or reach us by phone or email for bookings and enquiries.",
};

const details = [
  {
    icon: faLocationDot,
    title: "Address",
    lines: [
      "Mall Road, Near Old Temple,",
      "Manali, Himachal Pradesh, India 175131",
    ],
  },
  {
    icon: faPhone,
    title: "Phone",
    lines: ["+91 98765 43210"],
    href: "tel:+919876543210",
  },
  {
    icon: faEnvelope,
    title: "Email",
    lines: ["info@thehimalayanchester.com"],
    href: "mailto:info@thehimalayanchester.com",
  },
  {
    icon: faClock,
    title: "Reception Hours",
    lines: ["Open 24 hours, all week"],
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#0a0f12]">
      {/* Header Banner */}
      <section className="grain relative h-[48vh] min-h-[320px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/LB-3.png"
            alt="The Himalayan Chester"
            fill
            priority
            className="object-cover brightness-[0.4]"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-linear-to-b from-black/60 via-black/30 to-[#0a0f12]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-10 md:pb-12">
          <nav className="flex items-center gap-2 text-[11px] md:text-[12px] font-sans uppercase tracking-[2px] text-gray-300 mb-5">
            <Link href="/" className="hover:text-[#c5a367] transition-colors">
              Home
            </Link>
            <span className="text-[#c5a367]">/</span>
            <span className="text-white">Contact</span>
          </nav>

          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-xs md:text-sm font-bold mb-3 block">
            <span className="eyebrow-rule">Get In Touch</span>
          </span>
          <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            Contact <span className="italic text-gold-gradient">Us</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact details */}
          <div>
            <h2 className="font-serif text-white text-3xl md:text-4xl mb-2">
              We&apos;d love to hear from you
            </h2>
            <span className="block h-[2px] w-12 bg-[#c5a367] mb-6" />
            <p className="text-gray-400 font-sans text-[15px] md:text-base leading-relaxed font-light mb-10">
              Whether you&apos;re planning a stay, an event, or simply have a
              question, our team is here to help. Send us a message and
              we&apos;ll get back to you shortly.
            </p>

            <div className="space-y-6">
              {details.map((d) => (
                <div key={d.title} className="flex items-start gap-4">
                  <span className="w-11 h-11 shrink-0 rounded-full border border-[#c5a367]/30 bg-[#0d1317] flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={d.icon}
                      className="text-[#c5a367] text-sm"
                    />
                  </span>
                  <div>
                    <h3 className="font-sans text-white text-[12px] font-bold uppercase tracking-[2px] mb-1">
                      {d.title}
                    </h3>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="text-gray-400 font-sans text-[15px] hover:text-[#c5a367] transition-colors"
                      >
                        {d.lines.join(" ")}
                      </a>
                    ) : (
                      d.lines.map((l) => (
                        <p
                          key={l}
                          className="text-gray-400 font-sans text-[15px] leading-relaxed"
                        >
                          {l}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-10">
              {[faFacebookF, faInstagram, faTwitter].map((icon, i) => (
                <Link
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#c5a367] hover:text-black hover:border-[#c5a367] transition-all duration-300"
                >
                  <FontAwesomeIcon icon={icon} className="text-sm" />
                </Link>
              ))}
            </div>
          </div>

          {/* Form (client component: posts to Zoho via hidden iframe + thank-you popup) */}
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
