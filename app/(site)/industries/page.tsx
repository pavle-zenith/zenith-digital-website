import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { defaultShareImages } from "@/lib/shareImage";
import { IndustriesHub } from "@/components/sections/industry/IndustriesHub";
import { SITE, WEBSITE_ID, personSchema } from "@/lib/schema";
import { hubLive, hubRoutable, hubRows } from "@/content/industries";
import { industriesHub as hub } from "@/content/industries/hub";
import { industryTemplate } from "@/content/industries/template";

const URL = `${SITE}/industries`;

export function generateMetadata(): Metadata {
  return {
    title: hub.seo.title,
    description: hub.seo.description,
    alternates: { canonical: "/industries" },
    // A page-level openGraph replaces the layout's, so the share image is
    // restated (lib/shareImage); without this, shares showed the site default title.
    openGraph: {
      type: "website",
      url: "/industries",
      title: hub.seo.title,
      description: hub.seo.description,
      images: defaultShareImages.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: hub.seo.title,
      description: hub.seo.description,
      images: defaultShareImages.twitter,
    },
    // A preview build routes the unpublished hub; it must never be indexed.
    ...(hubLive ? {} : { robots: { index: false, follow: false } }),
  };
}

export default function IndustriesHubPage() {
  // Unpublished and not in a preview build: no hub yet.
  if (!hubRoutable) notFound();

  // The schema lists real destinations only: published industry pages and
  // Agencies' /partnerships. A row still pointing at the filtered case-study
  // grid is a stopgap link, not an item of this collection.
  const listed = hubRows().filter(
    (r) => r.href.startsWith("/industries/") || r.href === "/partnerships",
  );

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: hub.seo.title,
    description: hub.seo.description,
    inLanguage: "en-GB",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": `${URL}#breadcrumb` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: listed.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.name,
        url: `${SITE}${r.href}`,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${URL}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: industryTemplate.breadcrumbHub,
        item: URL,
      },
    ],
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={personSchema} />

      <IndustriesHub />
    </>
  );
}
