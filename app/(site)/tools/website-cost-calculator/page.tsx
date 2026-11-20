import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { CostCalculatorPage } from "@/components/sections/tools/CostCalculatorPage";
import { COST_CALCULATOR_UPDATED, costCalculatorPage as c } from "@/content/tools/website-cost";
import { costCalculatorLive, costCalculatorRoutable } from "@/content/tools/status";
import { defaultShareImages } from "@/lib/shareImage";
import { ORG_ID, SITE, WEBSITE_ID } from "@/lib/schema";

const URL = `${SITE}${c.path}`;

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: c.path },
  // Unpublished: routed only in a preview build, and never indexed there.
  ...(costCalculatorLive ? {} : { robots: { index: false, follow: false } }),
  openGraph: {
    type: "website",
    url: c.path,
    title: c.seo.title,
    description: c.seo.description,
    images: defaultShareImages.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: c.seo.title,
    description: c.seo.description,
    images: defaultShareImages.twitter,
  },
};

export default function WebsiteCostCalculator() {
  // Off until the owner signs it off (content/tools/status.ts).
  if (!costCalculatorRoutable) notFound();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${URL}#webpage`,
        url: URL,
        name: c.seo.title,
        description: c.seo.description,
        inLanguage: "en-GB",
        dateModified: COST_CALCULATOR_UPDATED,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        breadcrumb: { "@id": `${URL}#breadcrumb` },
        mainEntity: { "@id": `${URL}#app` },
      },
      {
        "@type": "WebApplication",
        "@id": `${URL}#app`,
        name: c.hero.h1,
        url: URL,
        description: c.seo.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
        provider: { "@id": ORG_ID },
      },
      {
        // Home > Tools > Website cost calculator. /tools has no page yet, so
        // "Tools" carries no URL (brief); add `item` once it exists.
        "@type": "BreadcrumbList",
        "@id": `${URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.breadcrumb.home, item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: c.breadcrumb.tools },
          { "@type": "ListItem", position: 3, name: c.breadcrumb.page, item: URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: c.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={graph} />
      <CostCalculatorPage />
    </>
  );
}
