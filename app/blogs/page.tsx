import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "@/lib/supabase";
import JsonLd from "@/components/common/JsonLd";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMeta({
  title: "Manali Travel Blog | Himalayan Chester",
  description:
    "Travel tips, local culture and Himalayan stories from The Himalayan Chester, Manali — your guide to exploring the mountains and planning a memorable stay.",
  path: "/blogs",
});

const blogIndexSchema = [
  breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blogs" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blogs`,
    description:
      "Travel tips, local culture and Himalayan stories from The Himalayan Chester, Manali.",
  },
];

function excerpt(html: string, len = 150) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > len ? text.slice(0, len).trimEnd() + "…" : text;
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="bg-[#0a0f12]">
      <JsonLd data={blogIndexSchema} />
      {/* Header Banner */}
      <section className="grain relative h-[48vh] min-h-[320px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-Background.png"
            alt="The Himalayan Chester blog"
            fill
            priority
            className="object-cover brightness-[0.65]"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-linear-to-b from-black/60 via-black/25 to-[#0a0f12]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-10 md:pb-12">
          <nav className="flex items-center gap-2 text-[11px] md:text-[12px] font-sans uppercase tracking-[2px] text-gray-300 mb-5">
            <Link href="/" className="hover:text-[#c5a367] transition-colors">
              Home
            </Link>
            <span className="text-[#c5a367]">/</span>
            <span className="text-white">Blog</span>
          </nav>

          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-xs md:text-sm font-bold mb-3 block">
            <span className="eyebrow-rule">Journal</span>
          </span>
          <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            Our <span className="italic text-gold-gradient">Blog</span>
          </h1>
        </div>
      </section>

      {/* Posts */}
      <section className="py-14 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500 font-sans py-16">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.slug}`}
                  className="group flex flex-col bg-linear-to-b from-[#0f161c] to-[#0b1013] border border-white/5 hover:border-[#c5a367]/40 hover:-translate-y-2 transition-all duration-500 shadow-xl overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0d1317]">
                    {blog.featured_image ? (
                      <Image
                        src={blog.featured_image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[#c5a367]/30 font-serif text-2xl">
                        The Himalayan Chester
                      </div>
                    )}
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h2 className="font-serif text-white text-xl md:text-2xl mb-3 leading-snug group-hover:text-[#c5a367] transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-gray-500 font-sans text-sm leading-relaxed mb-6 flex-1">
                      {excerpt(blog.content)}
                    </p>
                    <span className="text-[#c5a367] text-[12px] font-bold uppercase tracking-[2px]">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
