import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { ChecklistPage } from "@/components/sections/resources/ChecklistPage";
import { resourceTemplate as t } from "@/content/resources/template";
import { resourcesHub } from "@/content/resources/hub";
import { getRoutableResource, resourceHref, resourcesHubRoutable, routableResources } from "@/lib/resources-index";
import { defaultShareImages } from "@/lib/shareImage";
import { ORG_ID, SITE, WEBSITE_ID } from "@/lib/schema";

/**
 * /resources/[slug]: a free resource page. Routed from the published
 * resources (plus drafts in a preview build, noindexed), like the
 * comparisons. Unknown slugs 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routableResources.map((r) => ({ slug: r.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getRoutableResource(slug);
  if (!r) return {};
  const path = resourceHref(r.slug);
  return {
    title: r.seo.title,
    description: r.seo.description,
    alternates: { canonical: path },
    ...(r.publish ? {} : { robots: { index: false, follow: false } }),
    openGraph: { type: "article", url: path, title: r.seo.title, description: r.seo.description, images: defaultShareImages.openGraph },
    twitter: { card: "summary_large_image", title: r.seo.title, description: r.seo.description, images: defaultShareImages.twitter },
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const r = getRoutableResource(slug);
  if (!r) notFound();

  const url = `${SITE}${resourceHref(r.slug)}`;
  const hubUrl = `${SITE}${resourcesHub.path}`;

  // Article, FAQPage and BreadcrumbList. Not HowTo: Google no longer shows
  // HowTo rich results.
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: r.hero.h1,
        description: r.seo.description,
        url,
        mainEntityOfPage: url,
        dateModified: r.updated,
        inLanguage: "en-GB",
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
        citation: r.sources.map((s) => s.href),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.breadcrumb.home, item: `${SITE}/` },
          // The hub carries its URL only once it has a page (resourcesHubLive).
          { "@type": "ListItem", position: 2, name: t.breadcrumb.hub, ...(resourcesHubRoutable ? { item: hubUrl } : {}) },
          { "@type": "ListItem", position: 3, name: r.card.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: r.faq.map((f) => ({
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
      <ChecklistPage data={r} hubHref={resourcesHubRoutable ? resourcesHub.path : null} />
    </>
  );
}
