import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { FaqHero } from "@/components/sections/FaqHero";
import { FaqMaster } from "@/components/sections/FaqMaster";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { fCategories, fFinalCta } from "@/content/faq";

export const metadata: Metadata = {
  title:
    "What to ask a Wix agency before you hire one | Zenith Digital",
  description:
    "The questions worth asking any Wix Studio agency before you sign, answered in full: real prices, timelines, who owns the site, who can edit it after launch, and what happens if you outgrow the scope.",
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
