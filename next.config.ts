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
