import type { Metadata } from "next";
import LegalShell, { type LegalSection } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy | The Himalayan Chester",
  description:
    "How The Himalayan Chester collects, uses, and protects your personal information.",
};

const sections: LegalSection[] = [
  {
    heading: "Information We Collect",
    paragraphs: [
      "We collect information you provide directly to us when you make a booking, contact us, or otherwise interact with our services. This may include:",
    ],
    bullets: [
      "Name, email address, phone number and postal address",
      "Booking details such as check-in / check-out dates and guest count",
      "Identification documents required at check-in as per law — Passport, Visa, nationality, Driving Licence, Aadhaar Card or PAN Card",
      "Payment information processed securely through our payment partners",
      "Any preferences or requests you share with us to personalise your stay",
    ],
  },
  {
    heading: "How We Use Your Information",
    paragraphs: ["We use the information we collect to:"],
    bullets: [
      "Process and manage your reservations and stay",
      "Communicate with you about your booking and respond to enquiries",
      "Improve our services, facilities and guest experience",
      "Send you offers and updates, where you have chosen to receive them",
      "Comply with legal, tax and regulatory obligations",
    ],
  },
  {
    heading: "Sharing of Information",
    paragraphs: [
      "We do not sell your personal information. We may share it with trusted service providers who help us operate — such as payment processors, booking platforms and communication tools — strictly to deliver our services. We may also disclose information where required by law or to protect our rights and the safety of our guests.",
    ],
  },
  {
    heading: "Data Security",
    paragraphs: [
      "We take reasonable technical and organisational measures to protect your personal information against unauthorised access, loss or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "Our website may use cookies and similar technologies to remember your preferences and understand how the site is used. You can control cookies through your browser settings; disabling them may affect certain features of the site.",
    ],
  },
  {
    heading: "Your Rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of the personal information we hold about you, and you may opt out of marketing communications at any time. To exercise these rights, please contact us using the details below.",
    ],
  },
  {
    heading: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “Last updated” date.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      lastUpdated="June 14, 2026"
      intro="Your privacy matters to us. This policy explains what information The Himalayan Chester collects, how we use it, and the choices you have. By using our website or services, you agree to the practices described below."
      sections={sections}
    />
  );
}
