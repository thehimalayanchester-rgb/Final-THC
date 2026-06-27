// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a hard noindex/nofollow on the admin panel so it can never be indexed
  // (an HTTP header is honoured even when a crawler doesn't execute the page).
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/admin",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  images: {
    // Serve images directly from /public (and remote sources) without going
    // through Vercel's Image Optimization endpoint. That endpoint is returning
    // HTTP 402 (plan image-optimization quota exceeded), which was breaking
    // every next/image on the site. Raw assets serve fine, so bypass the
    // optimizer to restore visibility. Trade-off: no on-the-fly resize/webp,
    // so keep source images reasonably compressed.
    unoptimized: true,
    // Allowlist of quality levels the optimizer may produce (required in Next 16).
    // 60 is used for gallery thumbnails to keep them light; 75 is the default.
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
