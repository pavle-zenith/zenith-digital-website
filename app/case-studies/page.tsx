import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { CaseStudiesHero } from "@/components/sections/CaseStudiesHero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Testimonials } from "@/components/sections/Testimonials";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { caseStudyCards, csFinalCta } from "@/content/case-studies";

export const metadata: Metadata = {
  title:
    "Case studies — Wix Studio websites with real results | Zenith Digital",
  description:
    "150+ websites shipped. Browse Zenith Digital's case studies: Wix Studio and custom builds with the revenue, bookings, and traffic numbers behind each one.",
  alternates: { canonical: "/case-studies" },
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
      name: "Case studies",
      item: "https://www.thezenithdigital.com/case-studies",
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: caseStudyCards.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.client,
    ...(c.liveUrl ? { url: c.liveUrl } : {}),
  })),
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <CaseStudiesHero />
      <WorkGallery />
      <CaseStudies />
      <Testimonials showStats={false} />
      <ClientLogos />
      <CaseStudyGrid />
      <ComparisonTable />
      {/* FAQPage JSON-LD stays on the homepage only — same items, no duplicate markup. */}
      <Faq />
      <CtaBanner data={csFinalCta} />
    </>
  );
}
