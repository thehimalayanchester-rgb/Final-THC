import type { Metadata } from "next";
import LegalShell, { type LegalSection } from "@/components/legal/LegalShell";
import JsonLd from "@/components/common/JsonLd";
import { pageMeta, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Cancellation & Refund Policy | Manali",
  description:
    "Payment, cancellation, check-in, identification and occupancy policies for your stay at The Himalayan Chester, the luxury boutique resort in Manali.",
  path: "/legal/payment-cancellation",
});

const breadcrumb = breadcrumbLd([
  { name: "Home", path: "/" },
  { name: "Payment & Cancellation Policy", path: "/legal/payment-cancellation" },
]);

const sections: LegalSection[] = [
  {
    heading: "Payment",
    bullets: [
      "A pre-authorisation on your credit card is standard at check-in.",
      "A 2% surcharge applies to all payments made by credit card.",
      "Accepted modes of payment: Cash, UPI and Credit Card.",
    ],
  },
  {
    heading: "Cancellation & Refunds",
    paragraphs: [
      "All bookings at The Himalayan Chester are non-refundable. Once confirmed, the booking amount is not eligible for refund in the event of cancellation, no-show or early departure.",
    ],
  },
  {
    heading: "Check-In & Check-Out",
    bullets: [
      "Check-in time: 1:00 PM.",
      "Check-out time: 11:00 AM.",
      "Early check-in or late check-out often incurs a fee and is subject to availability.",
      "Please allow a minimum of 15 minutes at reception to complete check-out.",
      "Before checking out, it is your responsibility to hand over the room key / card to the room attendant.",
    ],
  },
  {
    heading: "Guest Identification",
    paragraphs: [
      "Valid photo identification is required for all guests at check-in. Acceptable documents include Passport, Driving Licence, Aadhaar Card and PAN Card. International guests must present a valid passport and visa.",
    ],
  },
  {
    heading: "Occupancy & Child Policy",
    bullets: [
      "Standard rooms usually accommodate up to 3 people with an extra bed. Extra-person charges apply.",
      "A child above the age of 6 years is considered an adult; younger children are treated as infants.",
    ],
  },
  {
    heading: "Prohibited Activities",
    bullets: [
      "Guests from outside are not allowed to stay on the hotel premises overnight.",
      "Female guests from outside are not allowed on the hotel premises.",
      "Smoking is prohibited in the hotel's public areas.",
      "Outside food and alcohol, as well as any illegal activities, are prohibited on the premises.",
    ],
  },
  {
    heading: "Liability & Damages",
    paragraphs: [
      "Guests are liable for the cost of any damage caused to hotel property during their stay.",
    ],
  },
  {
    heading: "Pet Policy",
    paragraphs: ["Pets are not allowed on the hotel premises."],
  },
];

export default function PaymentCancellationPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <LegalShell
        title="Payment & Cancellation Policy"
        lastUpdated="June 14, 2026"
        intro="The following policies apply to all bookings and stays at The Himalayan Chester. Please review them carefully, confirming a booking constitutes acceptance of these terms."
        sections={sections}
      />
    </>
  );
}
