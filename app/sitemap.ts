import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getBlogs } from "@/lib/supabase";

// Re-fetch on each request so newly published blog posts appear without a rebuild.
export const dynamic = "force-dynamic";

// Served at /sitemap.xml
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/rooms", priority: 0.9, changeFrequency: "weekly" },
    { path: "/gallery", priority: 0.8, changeFrequency: "weekly" },
    { path: "/menu", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blogs", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/legal/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.2, changeFrequency: "yearly" },
    {
      path: "/legal/payment-cancellation",
      priority: 0.2,
      changeFrequency: "yearly",
    },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Blog posts (gracefully empty if Supabase is unconfigured/unreachable).
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getBlogs();
    blogEntries = blogs.map((b) => ({
      url: `${SITE_URL}/blogs/${b.slug}`,
      lastModified: new Date(b.updated_at || b.created_at || now),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    blogEntries = [];
  }

  return [...staticEntries, ...blogEntries];
}
