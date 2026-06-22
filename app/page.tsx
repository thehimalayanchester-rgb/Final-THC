import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Rooms from "@/components/home/Rooms";
import Amenities from "@/components/home/Amenities";
import CTA from "@/components/home/CTA";
import Testimonials from "@/components/home/Testimonials";
import JsonLd from "@/components/common/JsonLd";
import { pageMeta, faqLd } from "@/lib/seo";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Luxury Hotel in Manali | Himalayan Chester",
  description:
    "Stay at The Himalayan Chester, a luxury boutique resort in Manali with heritage Pahari interiors, Himalayan views, fine dining and elegant suites.",
  path: "/",
});

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

const homeFaqLd = faqLd([
  {
    q: "Where is The Himalayan Chester located?",
    a: "The Himalayan Chester is a luxury boutique resort in Simsa, Manali, Himachal Pradesh, set amid the Himalayas with panoramic valley and mountain views.",
  },
  {
    q: "What types of rooms and suites are available?",
    a: "We offer Superior Rooms and signature suites including the Honeymoon Suite, Opus Suite, Sanctuary Suite and the Himalayan Chester Suite — several with valley views and a private jacuzzi.",
  },
  {
    q: "Is The Himalayan Chester a good choice for a honeymoon?",
    a: "Yes. Our Honeymoon Suite with curated romantic experiences — candlelight dinners, private balconies and sweeping mountain views — make it a popular honeymoon stay in Manali.",
  },
  {
    q: "How far is the resort from Hadimba Temple and Solang Valley?",
    a: "The resort is a short drive from Manali's Mall Road, Hadimba Devi Temple and Solang Valley, making it convenient for sightseeing and adventure activities.",
  },
  {
    q: "Does the resort have a restaurant?",
    a: "Yes, our in-house multi-cuisine restaurant serves Indian, Chinese, tandoori and Continental dishes along with all-day dining.",
  },
]);

export default function Home() {
  return (
    <main>
      <JsonLd data={[websiteLd, homeFaqLd]} />
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <CTA />
      <Testimonials />
    </main>
  );
}
