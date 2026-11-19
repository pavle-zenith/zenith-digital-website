import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { CompareHub } from "@/components/sections/compare/CompareHub";
import {
  compareHubLive,
  compareHubRoutable,
  routableComparisons,
} from "@/content/comparisons";
import { compareHub as hub } from "@/content/comparisons/hub";
import { compareTemplate } from "@/content/comparisons/template";
import { defaultShareImages } from "@/lib/shareImage";
import { SITE, WEBSITE_ID } from "@/lib/schema";
import { sanityFetchSafe } from "@/sanity/lib/client";
import { postsBySlugQuery } from "@/sanity/lib/queries";
import type { PostCard } from "@/sanity/lib/types";

const URL = `${SITE}/compare`;

export function generateMetadata(): Metadata {
  return {
    title: hub.seo.title,
    description: hub.seo.description,
    alternates: { canonical: "/compare" },
    openGraph: {
      type: "website",
      url: "/compare",
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
    // A preview build routes the unpublished hub; never indexed.
    ...(compareHubLive ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function CompareHubPage() {
  // Unpublished and not in a preview build: no hub yet.
  if (!compareHubRoutable) notFound();

  // Guide cards for the posts that are live; a post that isn't (yet) is left
  // out rather than linked. Build-safe: an unreachable Sanity drops the row.
  const guides = await sanityFetchSafe<PostCard[]>(postsBySlugQuery, [], {
    slugs: hub.guides.slugs,
  });

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${URL}#webpage`,
        url: URL,
        name: hub.seo.title,
        description: hub.seo.description,
        inLanguage: "en-GB",
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${URL}#breadcrumb` },
        mainEntity: { "@id": `${URL}#list` },
      },
      {
        "@type": "ItemList",
        "@id": `${URL}#list`,
        itemListElement: routableComparisons.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.hero.h1,
          url: `${URL}/${c.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: compareTemplate.breadcrumbHub,
            item: URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: hub.faq.items.map((f) => ({
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
      <CompareHub guides={guides} />
    </>
  );
}
