import Image from "next/image";
import Link from "next/link";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

const LegalShell = ({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}) => {
  return (
    <main className="bg-[#0a0f12]">
      {/* Header Banner */}
      <section className="grain relative h-[42vh] min-h-[300px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/LB-9.png"
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
            <span className="text-white">{title}</span>
          </nav>

          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-xs md:text-sm font-bold mb-3 block">
            <span className="eyebrow-rule">Legal</span>
          </span>
          <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            {title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 font-sans text-[13px] uppercase tracking-[2px] mb-10">
            Last updated: {lastUpdated}
          </p>

          {intro && (
            <p className="text-gray-400 font-sans text-[15px] md:text-[17px] leading-relaxed font-light mb-12">
              {intro}
            </p>
          )}

          <div className="space-y-12">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-serif text-white text-2xl md:text-3xl mb-2">
                  {i + 1}. {section.heading}
                </h2>
                <span className="block h-[2px] w-12 bg-[#c5a367] mb-6" />

                {section.paragraphs?.map((p, j) => (
                  <p
                    key={j}
                    className="text-gray-400 font-sans text-[15px] md:text-base leading-relaxed font-light mb-4"
                  >
                    {p}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-2 space-y-3">
                    {section.bullets.map((b, k) => (
                      <li
                        key={k}
                        className="flex items-start gap-3 text-gray-400 font-sans text-[15px] md:text-base leading-relaxed font-light"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c5a367] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Contact footnote */}
          <div className="mt-16 border-t border-white/5 pt-10">
            <p className="text-gray-400 font-sans text-[15px] leading-relaxed font-light">
              Questions about this page? Reach us at{" "}
              <a
                href="mailto:info@thehimalayanchester.com"
                className="text-[#c5a367] hover:text-white transition-colors"
              >
                info@thehimalayanchester.com
              </a>{" "}
              or visit our{" "}
              <Link
                href="/contact"
                className="text-[#c5a367] hover:text-white transition-colors"
              >
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LegalShell;
