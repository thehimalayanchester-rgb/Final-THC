import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served at /robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // NOTE: /admin is intentionally NOT disallowed. It is marked noindex via a
      // meta tag and the X-Robots-Tag header — but a crawler must be allowed to
      // fetch the page to *see* that noindex, otherwise the URL can still be
      // indexed. Only block the API, which has no indexable content.
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
