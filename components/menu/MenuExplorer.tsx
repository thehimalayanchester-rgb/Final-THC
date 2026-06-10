"use client";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faUtensils,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { MenuCategory, Tag } from "@/lib/menu";

type Diet = "all" | "veg" | "nonveg";

function priceDisplay(price: string) {
  return /^\d/.test(price) ? `₹${price}` : price;
}

// Lowest number found in a price string = the "starting from" price used for filtering.
function startPrice(price: string): number {
  const nums = price.match(/\d+/g)?.map(Number) ?? [];
  return nums.length ? Math.min(...nums) : 0;
}

function matchesDiet(tag: Tag | undefined, diet: Diet): boolean {
  if (diet === "all" || !tag) return true;
  if (diet === "veg") return tag === "veg" || tag === "both";
  return tag === "nonveg" || tag === "both";
}

// Custom per-dish SVG food icon (from /public/menu-icons), tinted by dietary type
// via CSS mask (green = veg, red = non-veg, gold = both / unspecified)
function FoodIcon({ icon, tag }: { icon: string; tag?: Tag }) {
  const color =
    tag === "veg"
      ? "bg-green-500"
      : tag === "nonveg"
        ? "bg-red-500"
        : "bg-[#c5a367]";
  const maskUrl = `url(/menu-icons/${icon}.svg)`;
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/4 border border-white/10 shrink-0"
      title={tag === "nonveg" ? "Non-Veg" : tag === "veg" ? "Veg" : undefined}
    >
      <span
        className={`w-4.5 h-4.5 ${color}`}
        style={{
          maskImage: maskUrl,
          WebkitMaskImage: maskUrl,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
    </span>
  );
}

const MenuExplorer = ({ menu }: { menu: MenuCategory[] }) => {
  const { min, max } = useMemo(() => {
    const prices = menu.flatMap((c) => c.items.map((i) => startPrice(i.price)));
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [menu]);

  const [activeTab, setActiveTab] = useState<string>(menu[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<Diet>("all");
  const [maxPrice, setMaxPrice] = useState<number>(max);

  // Tab bar horizontal scroll controls
  const tabsRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useLayoutEffect(() => {
    updateArrows();
  }, [updateArrows]);

  useEffect(() => {
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateArrows]);

  const scrollTabs = (dir: "left" | "right") => {
    const el = tabsRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.7, 200);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const q = query.trim().toLowerCase();
  const priceActive = maxPrice < max;
  const filtersActive = q !== "" || diet !== "all" || priceActive;

  // Apply tab + search + diet + price filters
  const visible = useMemo(() => {
    return menu
      .filter((c) => c.id === activeTab)
      .map((c) => ({
        ...c,
        items: c.items.filter((item) => {
          const tag = item.tag ?? c.defaultTag;
          if (!matchesDiet(tag, diet)) return false;
          if (startPrice(item.price) > maxPrice) return false;
          if (q) {
            const hay = `${item.name} ${item.desc ?? ""}`.toLowerCase();
            if (!hay.includes(q)) return false;
          }
          return true;
        }),
      }))
      .filter((c) => c.items.length > 0);
  }, [menu, activeTab, diet, maxPrice, q]);

  const resultCount = visible.reduce((n, c) => n + c.items.length, 0);

  const dietOptions: { key: Diet; label: string }[] = [
    { key: "all", label: "All" },
    { key: "veg", label: "Veg" },
    { key: "nonveg", label: "Non-Veg" },
  ];

  const clearFilters = () => {
    setQuery("");
    setDiet("all");
    setMaxPrice(max);
  };

  return (
    <div>
      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pt-12">
        <div className="bg-linear-to-b from-[#11191f] to-[#0d1317] border border-white/5 p-5 md:p-6 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c5a367] text-sm"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full bg-[#0a0f12] border border-white/10 py-3.5 pl-11 pr-10 text-white font-sans text-sm focus:outline-none focus:border-[#c5a367] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>

          {/* Diet toggle */}
          <div className="flex items-center border border-white/10 p-1 shrink-0 self-start lg:self-auto">
            {dietOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setDiet(opt.key)}
                className={`px-4 py-2 text-[11px] font-sans font-bold uppercase tracking-[1.5px] transition-colors duration-300 ${
                  diet === opt.key
                    ? "bg-[#c5a367] text-black"
                    : "text-gray-300 hover:text-[#c5a367]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Price filter */}
          <div className="shrink-0 lg:w-56">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[1.5px] text-gray-400">
                Max Price
              </span>
              <span className="text-[#c5a367] font-sans text-sm font-bold">
                ₹{maxPrice}
              </span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#c5a367] cursor-pointer"
              aria-label="Maximum price"
            />
          </div>
        </div>

        {/* Result meta */}
        <div className="flex items-center justify-between flex-wrap gap-3 mt-4">
          <span className="text-gray-500 font-sans text-[13px]">
            {resultCount} {resultCount === 1 ? "dish" : "dishes"}
          </span>
          {filtersActive && (
            <button
              onClick={clearFilters}
              className="text-[#c5a367] font-sans text-[12px] font-bold uppercase tracking-[1.5px] hover:text-white transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-[#0a0f12]/95 backdrop-blur-md border-y border-white/5 mt-6">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex items-center gap-2 md:gap-3 py-4">
            {/* Left arrow */}
            <button
              type="button"
              onClick={() => scrollTabs("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll categories left"
              className="hidden sm:flex shrink-0 w-9 h-9 items-center justify-center border border-white/10 text-[#c5a367] transition-all duration-300 enabled:hover:bg-[#c5a367] enabled:hover:text-black disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            </button>

            <ul
              ref={tabsRef}
              onScroll={updateArrows}
              className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-1 min-w-0"
            >
              {menu.map((c) => (
                <li key={c.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab(c.id)}
                    className={`whitespace-nowrap border px-4 py-2 text-[11px] font-sans font-bold uppercase tracking-[1.5px] transition-colors duration-300 ${
                      activeTab === c.id
                        ? "bg-[#c5a367] border-[#c5a367] text-black"
                        : "border-white/10 text-gray-300 hover:border-[#c5a367] hover:text-[#c5a367]"
                    }`}
                  >
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right arrow */}
            <button
              type="button"
              onClick={() => scrollTabs("right")}
              disabled={!canScrollRight}
              aria-label="Scroll categories right"
              className="hidden sm:flex shrink-0 w-9 h-9 items-center justify-center border border-white/10 text-[#c5a367] transition-all duration-300 enabled:hover:bg-[#c5a367] enabled:hover:text-black disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-14 md:py-16">
        {visible.length === 0 ? (
          <div className="text-center py-20">
            <FontAwesomeIcon
              icon={faUtensils}
              className="text-[#c5a367]/40 text-4xl mb-6"
            />
            <h3 className="font-serif text-white text-2xl mb-3">
              No dishes found
            </h3>
            <p className="text-gray-500 font-sans text-sm mb-8">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="inline-block border border-[#c5a367]/40 px-8 py-3 text-[#c5a367] text-[12px] font-bold uppercase tracking-[2px] hover:bg-[#c5a367] hover:text-black transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          visible.map((category) => (
            <section key={category.id} className="mb-14 md:mb-16 last:mb-0">
              <div className="mb-8 text-center">
                <h2 className="font-serif text-white text-3xl md:text-4xl">
                  {category.title}
                </h2>
                <span className="block h-[2px] w-14 bg-[#c5a367] mx-auto mt-4" />
                {category.note && (
                  <p className="mt-4 text-[#c5a367] font-sans text-[12px] uppercase tracking-[2px] font-bold">
                    {category.note}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-1">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 py-4 border-b border-white/5"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="mt-0.5">
                        <FoodIcon
                          icon={item.icon}
                          tag={item.tag ?? category.defaultTag}
                        />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-sans text-white text-[15px] md:text-base font-semibold leading-snug">
                          {item.name}
                        </h3>
                        {item.desc && (
                          <p className="text-gray-500 font-sans text-[13px] leading-relaxed mt-1">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-sans text-[#c5a367] text-sm md:text-[15px] font-bold whitespace-nowrap shrink-0">
                      {priceDisplay(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}

        <p className="mt-16 text-center text-gray-500 font-sans text-[12px] leading-relaxed">
          All prices are in INR and exclusive of applicable taxes. Please inform
          our staff of any allergies or dietary requirements.
        </p>
      </div>
    </div>
  );
};

export default MenuExplorer;
