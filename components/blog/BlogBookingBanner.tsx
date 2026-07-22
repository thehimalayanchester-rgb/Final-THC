import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { WHATSAPP_URL } from "@/lib/site";

export default function BlogBookingBanner() {
  return (
    <div className="my-12 flex flex-col sm:flex-row items-center justify-between gap-5 border border-[#c5a367]/30 bg-gradient-to-br from-[#c5a367]/10 to-transparent px-6 py-6 sm:px-8 sm:py-7">
      <div className="text-center sm:text-left">
        <p className="font-serif text-white text-xl sm:text-2xl">
          Ready for your Himalayan escape?
        </p>
        <p className="mt-1 text-[13px] text-gray-400">
          Book your stay at The Himalayan Chester directly on WhatsApp.
        </p>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center gap-2.5 rounded-sm bg-[#25D366] px-6 py-3.5 text-[12px] font-bold tracking-[1.5px] text-black uppercase no-underline hover:brightness-110 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
        Book Now
      </a>
    </div>
  );
}
