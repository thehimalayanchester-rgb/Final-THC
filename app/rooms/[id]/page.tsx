import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faRulerCombined,
  faUsers,
  faBed,
  faMountainSun,
} from "@fortawesome/free-solid-svg-icons";
import { roomsData, getRoomById } from "@/lib/rooms";
import RoomCard from "@/components/common/RoomCard";

export function generateStaticParams() {
  return roomsData.map((room) => ({ id: String(room.id) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/rooms/[id]">): Promise<Metadata> {
  const { id } = await params;
  const room = getRoomById(Number(id));
  if (!room) return { title: "Room Not Found | The Himalayan Chester" };

  return {
    title: `${room.name} | The Himalayan Chester`,
    description: room.desc,
  };
}

// Small reusable section heading with a gold accent rule
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="font-serif text-white text-2xl md:text-3xl">{children}</h2>
      <span className="block h-[2px] w-12 bg-[#c5a367] mt-3" />
    </div>
  );
}

export default async function RoomDetailPage({
  params,
}: PageProps<"/rooms/[id]">) {
  const { id } = await params;
  const room = getRoomById(Number(id));

  if (!room) notFound();

  const specs = [
    { icon: faRulerCombined, label: "Room Size", value: room.size },
    { icon: faUsers, label: "Occupancy", value: room.occupancy },
    { icon: faBed, label: "Bed", value: room.bed },
    { icon: faMountainSun, label: "View", value: room.view },
  ];

  const otherRooms = roomsData.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <main className="bg-[#0a0f12]">
      {/* Header Banner */}
      <section className="grain relative h-[58vh] min-h-[380px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={room.image}
            alt={room.name}
            fill
            priority
            className="object-cover brightness-[0.5]"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-linear-to-b from-black/50 via-black/20 to-[#0a0f12]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-10 md:pb-14">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-[11px] md:text-[12px] font-sans uppercase tracking-[2px] text-gray-300 mb-5">
            <Link href="/" className="hover:text-[#c5a367] transition-colors">
              Home
            </Link>
            <span className="text-[#c5a367]">/</span>
            <Link
              href="/rooms"
              className="hover:text-[#c5a367] transition-colors"
            >
              Rooms
            </Link>
            <span className="text-[#c5a367]">/</span>
            <span className="text-white">{room.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-xs font-bold mb-3 block">
                Accommodation
              </span>
              <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                {room.name}
              </h1>
            </div>

            {/* Price chip */}
            <div className="shrink-0 bg-[#0d1317]/80 backdrop-blur-md border-b-2 border-[#c5a367] px-6 py-3">
              <span className="block text-gray-400 text-[10px] font-sans uppercase tracking-[2px] mb-1">
                Starting from
              </span>
              <span className="text-white font-sans text-2xl font-bold">
                ₹{room.offSeason}
                <span className="text-gray-400 text-sm font-normal"> / night</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: Details */}
          <div className="w-full lg:w-2/3 min-w-0">
            {/* Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-[#0d1317] border border-white/5 p-5 flex flex-col items-center text-center gap-2"
                >
                  <FontAwesomeIcon
                    icon={spec.icon}
                    className="text-[#c5a367] text-lg mb-1"
                  />
                  <span className="text-[10px] font-sans uppercase tracking-[1.5px] text-gray-500">
                    {spec.label}
                  </span>
                  <span className="text-white font-sans text-sm font-semibold leading-snug">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Overview */}
            <SectionHeading>Overview</SectionHeading>
            <div className="space-y-5 text-gray-400 font-sans text-[15px] md:text-[17px] leading-relaxed font-light mb-14">
              {room.longDesc.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Inclusions */}
            {room.inclusions.length > 0 && (
              <div className="mb-14">
                <SectionHeading>Inclusions</SectionHeading>
                <div className="flex flex-wrap gap-3">
                  {room.inclusions.map((inc) => (
                    <span
                      key={inc}
                      className="flex items-center gap-2 text-gray-200 text-sm font-sans border border-[#c5a367]/30 bg-[#c5a367]/5 px-4 py-2.5"
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-[#c5a367] text-xs"
                      />
                      {inc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-14">
              <SectionHeading>Room Features</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {room.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-gray-300 font-sans text-[15px] border-b border-white/5 py-4"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#c5a367] text-xs shrink-0"
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <SectionHeading>Gallery</SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {room.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden group"
                >
                  <Image
                    src={img}
                    alt={`${room.name} gallery ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking Card (sticky on desktop) */}
          <aside className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-28 bg-linear-to-b from-[#11191f] to-[#0b1013] border border-white/5 border-t-4 border-t-[#c5a367] p-6 md:p-8 shadow-2xl">
              <span className="font-sans text-[#c5a367] uppercase tracking-[3px] text-[11px] font-bold block">
                Tariff
              </span>

              {/* Rates */}
              <div className="grid grid-cols-2 gap-3 my-6">
                <div className="border border-white/5 bg-white/[0.02] p-4">
                  <span className="block text-[#c5a367] text-[10px] font-bold uppercase tracking-[1.5px] mb-2">
                    Seasonal
                  </span>
                  <span className="text-white font-sans text-xl font-bold block">
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
                  <span className="text-white font-sans text-xl font-bold block">
                    ₹{room.offSeason}
                  </span>
                  <span className="text-gray-500 font-sans text-[11px]">
                    {room.offSeasonNote}
                  </span>
                </div>
              </div>

              <p className="text-gray-500 font-sans text-[13px] leading-relaxed mb-6">
                Rates are per night. Seasonal pricing applies during peak
                periods; off-season rates carry applicable charges.
              </p>

              <Link
                href="/checkout"
                className="block w-full text-center bg-[#c5a367] hover:bg-white text-black py-4 text-[13px] font-black uppercase tracking-[2px] transition-all duration-500 shadow-lg active:scale-[0.98] mb-3"
              >
                Book Now
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center border border-[#c5a367]/40 py-4 text-[#c5a367] text-[12px] font-bold uppercase tracking-[2px] hover:bg-[#c5a367] hover:text-black transition-all duration-300"
              >
                Enquire
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Other Rooms */}
      <section className="bg-linear-to-b from-[#0a0f12] to-[#0d141b] py-16 md:py-20 px-6 md:px-10 lg:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-[13px] font-bold mb-4 block">
              <span className="eyebrow-rule">Keep Exploring</span>
            </span>
            <h2 className="font-serif text-white text-3xl md:text-4xl lg:text-5xl leading-tight">
              Other <span className="text-gold-gradient italic">Stays</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {otherRooms.map((r, i) => (
              <RoomCard key={r.id} room={r} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
