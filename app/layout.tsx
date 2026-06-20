import type { Metadata } from "next";
import { Inter, PT_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import SmoothScroll from "@/components/animations/SmoothScroll";
import Footer from "@/components/common/Footer";
import Preloader from "@/components/common/Preloader";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import {
  SITE_URL,
  SITE_NAME,
  ADDRESS,
  PHONE_TEL,
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
});

const DESCRIPTION =
  "The Himalayan Chester is a luxury boutique stay in Simsa, Manali — heritage Pahari interiors, panoramic Himalayan views, fine dining and curated experiences. Book superior rooms and signature suites.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Himalayan Chester | Luxury Stay in Manali",
    template: "%s | The Himalayan Chester",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "The Himalayan Chester",
    "luxury stay Manali",
    "hotels in Manali",
    "boutique resort Manali",
    "Simsa Manali",
    "Himalayan resort",
    "honeymoon suite Manali",
    "rooms in Manali",
    "best hotel Manali",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "The Himalayan Chester | Luxury Stay in Manali",
    description: DESCRIPTION,
    images: [
      {
        url: "/hero-Background.png",
        width: 1200,
        height: 630,
        alt: "The Himalayan Chester, Manali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Himalayan Chester | Luxury Stay in Manali",
    description: DESCRIPTION,
    images: ["/hero-Background.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/THC_logo.svg",
    shortcut: "/THC_logo.svg",
    apple: "/THC_logo.svg",
  },
  verification: {
    google: "290NUw0zquZhkAxjt2SFYvGzjNU0zN_aGSRqHALeXUM",
  },
};

// Structured data for rich results & local/maps SEO.
const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${SITE_URL}/#lodging`,
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: PHONE_TEL,
  email: CONTACT_EMAIL,
  image: `${SITE_URL}/hero-Background.png`,
  logo: `${SITE_URL}/THC_logo.svg`,
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS,
    addressLocality: "Manali",
    addressRegion: "Himachal Pradesh",
    postalCode: "175131",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.2194524,
    longitude: 77.186031,
  },
  sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
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
