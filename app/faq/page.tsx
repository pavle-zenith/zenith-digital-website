import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { FaqHero } from "@/components/sections/FaqHero";
import { FaqMaster } from "@/components/sections/FaqMaster";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { fCategories, fFinalCta } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ | pricing, process, and straight answers | Zenith Digital",
  description:
    "Everything people ask before working with Zenith Digital: real prices, timelines, who we're a fit for (and who we're not), and what happens after launch.",
  alternates: { canonical: "/faq" },
};

const SITE = "https://www.thezenithdigital.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE}/faq` },
  ],
};

// The site's primary FAQPage target: the full question set, verbatim from the
// rendered content (answers must match the accordion text exactly).
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: fCategories.flatMap((cat) =>
    cat.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <FaqHero />
      <FaqMaster />
      <CtaBanner data={fFinalCta} />
    </>
  );
}
