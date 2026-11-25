import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { ResourcesHub } from "@/components/sections/resources/ResourcesHub";
import { resourcesHubLive } from "@/content/resources";
import { resourcesHub as c } from "@/content/resources/hub";
import { getResourceEntries, resourcesHubRoutable } from "@/lib/resources-index";
import { defaultShareImages } from "@/lib/shareImage";
import { ORG_ID, SITE, WEBSITE_ID } from "@/lib/schema";

const URL = `${SITE}${c.path}`;

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  // Every filtered view (?topic=, ?type=) is a view of this page, not a page.
  alternates: { canonical: c.path },
  // Off until the owner signs off (content/resources resourcesHubLive):
  // routed only in a preview build, and never indexed there.
  ...(resourcesHubLive ? {} : { robots: { index: false, follow: false } }),
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

export default async function ResourcesPage() {
  if (!resourcesHubRoutable) notFound();
  const entries = await getResourceEntries();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${URL}#webpage`,
        url: URL,
        name: c.seo.title,
        description: c.seo.description,
        inLanguage: "en-GB",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        breadcrumb: { "@id": `${URL}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: entries.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE}${e.href}`,
            name: e.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.breadcrumb.home, item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: c.breadcrumb.hub, item: URL },
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
      <ResourcesHub entries={entries} />
    </>
  );
}
