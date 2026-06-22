import type { Metadata } from "next";
import LegalShell, { type LegalSection } from "@/components/legal/LegalShell";
import JsonLd from "@/components/common/JsonLd";
import { pageMeta, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service | Himalayan Chester",
  description:
    "The terms and conditions that govern bookings, payments and stays at The Himalayan Chester, our luxury boutique resort in Manali, Himachal Pradesh.",
  path: "/legal/terms",
});

const breadcrumb = breadcrumbLd([
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: "/legal/terms" },
]);

const sections: LegalSection[] = [
  {
    heading: "Acceptance of Terms",
    paragraphs: [
      "By making a booking or using our website and services, you agree to be bound by these Terms of Service together with our Payment & Cancellation Policy. If you do not agree, please do not use our services.",
    ],
  },
  {
    heading: "Bookings & Rates",
    paragraphs: [
      "All bookings are subject to availability and confirmation. Room rates are quoted per night and may vary between seasonal and off-season periods. Quoted prices are exclusive of applicable taxes and charges unless stated otherwise.",
      "We reserve the right to correct any pricing errors and to amend rates prior to confirmation of your booking.",
    ],
  },
  {
    heading: "Payments",
    bullets: [
      "Accepted modes of payment: Cash, UPI and Credit Card.",
      "A pre-authorisation on your credit card is standard at check-in.",
      "A 2% surcharge applies to all payments made by credit card.",
    ],
  },
  {
    heading: "Cancellation & Refunds",
    paragraphs: [
      "All bookings are non-refundable. Once confirmed, the booking amount is not eligible for refund in the case of cancellation, no-show or early departure. Please see our Payment & Cancellation Policy for full details.",
    ],
  },
  {
    heading: "Check-In & Check-Out",
    bullets: [
      "Check-in time is 1:00 PM and check-out time is 11:00 AM.",
      "Early check-in or late check-out often incurs a fee and is subject to availability.",
      "Please allow a minimum of 15 minutes at reception to complete check-out.",
      "Before checking out, it is your responsibility to hand over the room key / card to the room attendant.",
    ],
  },
  {
    heading: "Guest Identification",
    paragraphs: [
      "A valid photo identification is required for all guests at check-in: Passport, Driving Licence, Aadhaar Card or PAN Card. International guests must present a valid passport and visa.",
    ],
  },
  {
    heading: "Occupancy & Child Policy",
    bullets: [
      "Standard rooms usually accommodate up to 3 people with an extra bed; extra-person charges apply.",
      "A child above the age of 6 years is considered an adult; younger children are treated as infants.",
    ],
  },
  {
    heading: "Guest Conduct & Prohibited Activities",
    paragraphs: [
      "Guests are expected to behave respectfully towards staff, other guests and the property. We reserve the right to refuse service or require a guest to leave, without refund, in cases of unlawful, unsafe or disruptive behaviour. The following are prohibited:",
    ],
    bullets: [
      "Outside guests are not allowed to stay on the premises overnight.",
      "Outside female guests are not allowed on the hotel premises.",
      "Smoking is prohibited in the hotel's public areas.",
      "Outside food and alcohol, as well as any illegal activities, are prohibited on the premises.",
      "Pets are not allowed on the hotel premises.",
    ],
  },
  {
    heading: "Liability & Damages",
    paragraphs: [
      "Guests are liable for the cost of any damage caused to hotel property during their stay. While we take care to provide a safe and comfortable environment, The Himalayan Chester is not liable for loss, theft or damage to personal belongings, or for any injury, except where caused by our negligence. Outdoor activities and excursions are undertaken at the guest’s own risk.",
    ],
  },
  {
    heading: "Changes to These Terms",
    paragraphs: [
      "We may revise these Terms of Service from time to time. The version in effect at the time of your booking governs that booking. Continued use of our services constitutes acceptance of the updated terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <LegalShell
        title="Terms of Service"
        lastUpdated="June 14, 2026"
        intro="These terms govern your booking and stay at The Himalayan Chester. Please read them carefully, they set out the rights and responsibilities of both you and us."
        sections={sections}
      />
    </>
  );
}
