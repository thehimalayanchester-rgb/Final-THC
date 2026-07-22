import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/supabase";
import JsonLd from "@/components/common/JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { processBlogContent } from "@/lib/blogContent";
import BlogTOC from "@/components/blog/BlogTOC";
import BlogBookingBanner from "@/components/blog/BlogBookingBanner";

export const dynamic = "force-dynamic";

// Plain-text excerpt for description fallback / Article body length.
function stripHtml(html: string, len = 150) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > len ? text.slice(0, len).trimEnd() + "…" : text;
}

export async function generateMetadata({
  params,
}: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Post Not Found" };

  const description = blog.meta_description || stripHtml(blog.content);
  const url = `${SITE_URL}/blogs/${blog.slug}`;
  const image = blog.featured_image || "/hero-Background.png";

  return {
    // A custom meta_title is used verbatim; otherwise the title template adds the brand.
    title: blog.meta_title ? { absolute: blog.meta_title } : blog.title,
    description,
    alternates: { canonical: `/blogs/${blog.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: blog.meta_title || blog.title,
      description,
      images: [{ url: image }],
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.meta_title || blog.title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const { segments, headings } = processBlogContent(blog.content);

  const articleSchema = [
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blogs" },
      { name: blog.title, path: `/blogs/${blog.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.meta_title || blog.title,
      description: blog.meta_description || stripHtml(blog.content),
      image: blog.featured_image || `${SITE_URL}/hero-Background.png`,
      datePublished: blog.created_at,
      dateModified: blog.updated_at,
      url: `${SITE_URL}/blogs/${blog.slug}`,
      mainEntityOfPage: `${SITE_URL}/blogs/${blog.slug}`,
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/THC_logo.svg`,
        },
      },
    },
  ];

  return (
    <main className="bg-[#0a0f12]">
      <JsonLd data={articleSchema} />
      {/* Header */}
      <section className="grain relative h-[55vh] min-h-[380px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {blog.featured_image ? (
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              priority
              className="object-cover brightness-[0.6]"
            />
          ) : (
            <Image
              src="/hero-Background.png"
              alt={blog.title}
              fill
              priority
              className="object-cover brightness-[0.6]"
            />
          )}
        </div>
        <div className="absolute inset-0 z-0 bg-linear-to-b from-black/60 via-black/30 to-[#0a0f12]" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-10 lg:px-20 pb-10 md:pb-14">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] md:text-[12px] font-sans uppercase tracking-[2px] text-gray-300 mb-5">
            <Link href="/" className="hover:text-[#c5a367] transition-colors">
              Home
            </Link>
            <span className="text-[#c5a367]">/</span>
            <Link href="/blogs" className="hover:text-[#c5a367] transition-colors">
              Blog
            </Link>
          </nav>
          <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-[1.15]">
            {blog.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <article className="py-14 md:py-20 px-6 md:px-10 lg:px-20">
        <div
          className={
            headings.length > 0
              ? "max-w-6xl mx-auto lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16"
              : "max-w-6xl mx-auto"
          }
        >
          {headings.length > 0 && <BlogTOC headings={headings} />}

          <div className="max-w-3xl mx-auto lg:mx-0">
            <BlogBookingBanner />

            {segments.map((segment, i) =>
              segment.type === "banner" ? (
                <BlogBookingBanner key={i} />
              ) : (
                <div
                  key={i}
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: segment.html }}
                />
              )
            )}

            <div className="mt-16 border-t border-white/5 pt-10">
              <Link
                href="/blogs"
                className="inline-block border border-[#c5a367]/40 px-8 py-3 text-[#c5a367] text-[12px] font-bold uppercase tracking-[2px] hover:bg-[#c5a367] hover:text-black transition-all duration-300"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
