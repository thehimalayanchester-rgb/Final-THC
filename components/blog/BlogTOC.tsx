"use client";

import { useEffect, useState } from "react";
import type { BlogHeading } from "@/lib/blogContent";

export default function BlogTOC({ headings }: { headings: BlogHeading[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const list = (
    <ul className="space-y-2.5">
      {headings.map((h) => (
        <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
          <a
            href={`#${h.id}`}
            className={`block text-[12.5px] leading-snug transition-colors ${
              activeId === h.id
                ? "text-[#c5a367]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile / tablet: collapsible, sits above the article */}
      <details className="lg:hidden mb-10 max-w-3xl mx-auto border border-white/10 bg-white/[0.02] px-5 py-4 group">
        <summary className="flex items-center justify-between list-none cursor-pointer text-[11px] font-sans font-bold uppercase tracking-[2px] text-[#c5a367]">
          Table of Contents
          <span className="text-sm transition-transform duration-300 group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <nav className="mt-4">{list}</nav>
      </details>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block">
        <nav className="sticky top-28">
          <p className="mb-4 text-[11px] font-sans font-bold uppercase tracking-[2px] text-[#c5a367]">
            Table of Contents
          </p>
          {list}
        </nav>
      </aside>
    </>
  );
}
