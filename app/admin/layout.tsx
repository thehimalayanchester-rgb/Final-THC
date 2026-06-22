import type { Metadata } from "next";

// Keep the admin panel out of search engines (the page itself is a client component).
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
