import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { PartnershipsHero } from "@/components/sections/PartnershipsHero";
import { PartnerProblems } from "@/components/sections/PartnerProblems";
import { PartnerTracks } from "@/components/sections/PartnerTracks";
import { PartnerProcess } from "@/components/sections/PartnerProcess";
import { PartnerServices } from "@/components/sections/PartnerServices";
import { PartnerPricing } from "@/components/sections/PartnerPricing";
import { PartnerBenefits } from "@/components/sections/PartnerBenefits";
import { PartnerExpectations } from "@/components/sections/PartnerExpectations";
import { PartnerStories } from "@/components/sections/PartnerStories";
import { PartnerApply } from "@/components/sections/PartnerApply";
import { Faq } from "@/components/sections/Faq";
import { pFaq } from "@/content/partnerships";

export const metadata: Metadata = {
  title: "White-label web design for agencies | Zenith Digital partnerships",
  description:
    "Resell premium Wix Studio and custom builds under your own brand. Unbranded deliverables, NDA, partner pricing, and a dedicated team behind 150+ launches.",
  alternates: { canonical: "/partnerships" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.thezenithdigital.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Partnerships",
      item: "https://www.thezenithdigital.com/partnerships",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pFaq.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PartnershipsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <PartnershipsHero />
      <PartnerProblems />
      <PartnerTracks />
      {/* Proof sits directly under the two tracks: the reader has just picked
          a lane, so the partners who took each one are the next thing they
          want. Everything below is the mechanics of working together. */}
      <PartnerStories />
      <PartnerProcess />
      <PartnerServices />
      <PartnerPricing />
      <PartnerBenefits />
      <PartnerExpectations />
      <Faq data={pFaq} />
      <PartnerApply />
    </>
  );
}
