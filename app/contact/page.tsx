import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
  faDiamondTurnRight,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import ContactForm from "@/components/contact/ContactForm";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  ADDRESS,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | The Himalayan Chester",
  description:
    "Get in touch with The Himalayan Chester, Manali. Send us a message or reach us by phone or email for bookings and enquiries.",
};

const details = [
  {
    icon: faLocationDot,
    title: "Address",
    lines: [ADDRESS],
  },
  {
    icon: faPhone,
    title: "Phone",
    lines: [PHONE_DISPLAY],
    href: `tel:${PHONE_TEL}`,
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
            className="object-cover brightness-[0.6]"
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

          {/* Form (client component: posts to Zoho via hidden iframe + thank-you popup) */}
          <ContactForm />
        </div>
      </section>

      {/* Map */}
      <section className="px-6 md:px-10 lg:px-20 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-xs md:text-sm font-bold mb-3 block">
              <span className="eyebrow-rule">Find Us</span>
            </span>
            <h2 className="font-serif text-white text-3xl md:text-4xl lg:text-5xl leading-tight">
              Visit The{" "}
              <span className="italic text-gold-gradient">Himalayan Chester</span>
            </h2>
          </div>

          <div className="relative border border-white/10 bg-[#11191f] p-1.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]">
            {/* Gold corner accent */}
            <span className="pointer-events-none absolute -top-px -left-px z-20 h-10 w-10 border-t-2 border-l-2 border-[#c5a367]" />
            <span className="pointer-events-none absolute -bottom-px -right-px z-20 h-10 w-10 border-b-2 border-r-2 border-[#c5a367]" />

            <div className="relative overflow-hidden">
              {/* Dark-themed map (filter tints the embed to match the site) */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3375.4348127559606!2d77.18345607638014!3d32.21945691226984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390489cbbf1dc1fb%3A0x3967b549ce8d5d63!2sThe%20himalayan%20chester!5e0!3m2!1sen!2sin!4v1781455390112!5m2!1sen!2sin"
                title="The Himalayan Chester location on Google Maps"
                width="600"
                height="450"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  filter:
                    "invert(0.9) hue-rotate(180deg) brightness(0.95) contrast(0.88) saturate(0.8)",
                }}
                className="block w-full h-[380px] md:h-[480px] border-0"
              />

              {/* Subtle vignette so the map edges blend into the dark theme
                  (kept out of pointer events so the map stays draggable) */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(10,15,18,0.55)]" />

              {/* Floating info card */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs">
                <div className="pointer-events-auto bg-[#0a0f12]/85 backdrop-blur-md border border-white/10 border-l-2 border-l-[#c5a367] p-5 shadow-2xl">
                  <h3 className="font-serif text-white text-lg mb-2">
                    The Himalayan Chester
                  </h3>
                  <p className="flex items-start gap-2.5 text-gray-300 font-sans text-[13px] leading-relaxed mb-4">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-[#c5a367] text-sm mt-0.5 shrink-0"
                    />
                    <span>
                      Mahul Gardening, Village Simsa, Manali, Distt. Kullu
                      (H.P.)
                    </span>
                  </p>
                  <a
                    href="https://www.google.com/maps/dir//The+himalayan+chester,+Khasra+no+142,+143,+Muhal+Gadherani,+Simsa,+manali,+Manali,+Gadherni,+Himachal+Pradesh+175131/@26.3721451,88.3759429,7z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390489cbbf1dc1fb:0x3967b549ce8d5d63!2m2!1d77.186031!2d32.2194524?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#c5a367] hover:bg-white text-black px-5 py-2.5 text-[11px] font-black uppercase tracking-[1.5px] transition-colors duration-300"
                  >
                    <FontAwesomeIcon icon={faDiamondTurnRight} />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
