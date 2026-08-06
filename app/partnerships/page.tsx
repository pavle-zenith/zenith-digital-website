import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { PartnershipsHero } from "@/components/sections/PartnershipsHero";
import { PartnerProblems } from "@/components/sections/PartnerProblems";
import { PartnerTracks } from "@/components/sections/PartnerTracks";
import { PartnerProcess } from "@/components/sections/PartnerProcess";
import { PartnerBenefits } from "@/components/sections/PartnerBenefits";
import { PartnerExpectations } from "@/components/sections/PartnerExpectations";
import { PartnerProof } from "@/components/sections/PartnerProof";
import { PartnerApply } from "@/components/sections/PartnerApply";
import { Faq } from "@/components/sections/Faq";
import { pFaq } from "@/content/partnerships";

export const metadata: Metadata = {
  title: "White-label web design for agencies — Zenith Digital partnerships",
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
      <PartnerProcess />
      <PartnerBenefits />
      <PartnerExpectations />
      <PartnerProof />
      <Faq data={pFaq} />
      <PartnerApply />
    </>
  );
}
