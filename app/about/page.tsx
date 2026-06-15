import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountainSun,
  faHandshakeAngle,
  faUtensils,
  faLeaf,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "About Us | The Himalayan Chester",
  description:
    "Discover the story of The Himalayan Chester, a heritage Pahari resort in Manali blending authentic mountain culture with modern luxury.",
};

const stats = [
  { value: "25+", label: "Years of Hospitality" },
  { value: "5", label: "Curated Room Types" },
  { value: "10+", label: "Amenities & Experiences" },
  { value: "100%", label: "Pahari at Heart" },
];

const values = [
  {
    icon: faMountainSun,
    title: "Pahari Heritage",
    desc: "Every corner celebrates the architecture, craft and warmth of the Himalayan hills.",
  },
  {
    icon: faHandshakeAngle,
    title: "Heartfelt Hospitality",
    desc: "We treat every guest like family, with the genuine warmth our mountains are known for.",
  },
  {
    icon: faUtensils,
    title: "Authentic Cuisine",
    desc: "From traditional Himachali Dham to global comfort food, crafted with local produce.",
  },
  {
    icon: faLeaf,
    title: "Mindful & Sustainable",
    desc: "Rooted in nature, we tread lightly, honouring the land that hosts us.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#0a0f12]">
      {/* Header Banner */}
      <section className="grain relative h-[55vh] min-h-[360px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/IMG%2010.png"
            alt="The Himalayan Chester landscape"
            fill
            priority
            className="object-cover brightness-[0.65]"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-linear-to-b from-black/60 via-black/25 to-[#0a0f12]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-10 md:pb-14">
          <nav className="flex items-center gap-2 text-[11px] md:text-[12px] font-sans uppercase tracking-[2px] text-gray-300 mb-5">
            <Link href="/" className="hover:text-[#c5a367] transition-colors">
              Home
            </Link>
            <span className="text-[#c5a367]">/</span>
            <span className="text-white">About</span>
          </nav>

          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-xs md:text-sm font-bold mb-3 block">
            <span className="eyebrow-rule">Our Story</span>
          </span>
          <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            About <span className="italic text-gold-gradient">Us</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image with badge */}
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-[4/5] w-full border border-white/10 p-3 lg:p-4">
              <span className="absolute -top-px -left-px w-10 h-10 border-t-2 border-l-2 border-[#c5a367]" />
              <span className="absolute -bottom-px -right-px w-10 h-10 border-b-2 border-r-2 border-[#c5a367]" />
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/LB-7.png"
                  alt="The Himalayan Chester interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-[-20px] right-[-10px] md:bottom-[-30px] md:right-[-30px] bg-[#0d1317] border-l-4 border-[#c5a367] p-6 md:p-8 shadow-2xl z-10 w-[200px] md:w-[260px]">
              <h3 className="font-serif text-[#c5a367] text-3xl md:text-4xl mb-2">
                25+
              </h3>
              <p className="font-sans text-white text-[10px] md:text-[12px] font-bold uppercase tracking-[2px] leading-tight">
                Years of Preserving Pahari Heritage
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2">
            <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-[13px] font-bold mb-6 block">
              <span className="eyebrow-rule">Welcome to Our World</span>
            </span>
            <h2 className="font-serif text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
              A Sanctuary of <br />
              <span className="italic text-gold-gradient">
                Peace &amp; Culture
              </span>
            </h2>
            <div className="space-y-5 text-gray-400 font-sans text-[15px] md:text-[17px] leading-relaxed font-light">
              <p>
                Nestled in the breathtaking valleys of the Himalayas, The
                Himalayan Chester offers an exquisite blend of traditional
                Pahari architecture and modern luxury. What began as a humble
                mountain home has grown into a heritage resort loved by
                travellers from across the world.
              </p>
              <p>
                Every room tells a story, adorned with local craftsmanship and
                warm earthy textures. Here, the fresh alpine air meets the
                comforting scent of deodar wood, and every detail echoes the
                warmth of the hills.
              </p>
              <p>
                Our promise is simple: to share the soul of the mountains with
                you, and to make every stay feel like coming home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-10 lg:px-20 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0d1317] p-8 md:p-10 text-center">
              <p className="font-serif text-[#c5a367] text-4xl md:text-5xl mb-3">
                {s.value}
              </p>
              <p className="font-sans text-gray-400 text-[11px] md:text-[12px] uppercase tracking-[2px] font-bold leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-linear-to-b from-[#0a0f12] to-[#0d141b] py-16 md:py-24 px-6 md:px-10 lg:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-[13px] font-bold mb-4 block">
              <span className="eyebrow-rule">What We Stand For</span>
            </span>
            <h2 className="font-serif text-white text-3xl md:text-4xl lg:text-5xl leading-tight">
              Our <span className="text-gold-gradient italic">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="group bg-linear-to-b from-[#11191f] to-[#0b1013] border border-white/5 p-8 hover:border-[#c5a367]/40 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-full bg-[#0a0f12] border border-[#c5a367]/30 flex items-center justify-center mb-6 group-hover:bg-[#c5a367] transition-colors duration-500">
                  <FontAwesomeIcon
                    icon={v.icon}
                    className="text-[#c5a367] text-lg group-hover:text-black transition-colors duration-500"
                  />
                </div>
                <h3 className="font-serif text-white text-xl mb-3">
                  {v.title}
                </h3>
                <p className="font-sans text-gray-400 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder quote */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-14 lg:gap-20">
            {/* Portrait */}
            <div className="shrink-0">
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 mx-auto">
                {/* Offset gold frame for a refined, respectful presentation */}
                <span className="absolute -inset-3 border border-[#c5a367]/35 pointer-events-none" />
                <Image
                  src="/founder.png"
                  alt="Tara Chand Thakur, Founder &amp; Host of The Himalayan Chester"
                  fill
                  quality={75}
                  sizes="(min-width: 640px) 256px, 224px"
                  className="object-cover object-top shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>

            {/* Quote */}
            <div className="text-center md:text-left">
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="text-[#c5a367]/40 text-4xl md:text-5xl mb-6"
              />
              <p className="font-serif italic text-white text-xl sm:text-2xl md:text-3xl leading-snug mb-8">
                “We don&apos;t just offer a place to stay, we offer a piece of
                the mountains, and a welcome that stays with you long after you
                leave.”
              </p>
              <div className="flex flex-col items-center md:items-start">
                <span className="block h-[2px] w-12 bg-[#c5a367] mb-5" />
                <span className="font-serif text-white text-2xl">
                  Tara Chand Thakur
                </span>
                <span className="font-sans text-[#c5a367] text-[12px] font-bold uppercase tracking-[3px] mt-1">
                  Founder &amp; Host
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <CTA />
    </main>
  );
}
