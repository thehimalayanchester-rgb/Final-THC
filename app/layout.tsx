import type { Metadata } from "next";
import { Inter, PT_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import SmoothScroll from "@/components/animations/SmoothScroll";
import Footer from "@/components/common/Footer";
import Preloader from "@/components/common/Preloader";
import WhatsAppButton from "@/components/common/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
});

export const metadata: Metadata = {
  title: "The Himalayan Chester | Luxury Stay in Manali",
  description: "Book your perfect stay at The Himalayan Chester, Manali.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ptSerif.variable}`}>
      <body
        className="bg-[#0a0f12] text-white antialiased font-sans"
        suppressHydrationWarning={true}
      >
        <Preloader />
        <WhatsAppButton />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
