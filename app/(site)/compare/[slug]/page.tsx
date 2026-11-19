import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { ComparePage } from "@/components/sections/compare/ComparePage";
import {
  compareHubRoutable,
  getComparison,
  isPublished,
  routableComparisons,
} from "@/content/comparisons";
import { compareTemplate } from "@/content/comparisons/template";
import { defaultShareImages } from "@/lib/shareImage";
import { ORG_ID, PERSON_ID, SITE, WEBSITE_ID, personSchema } from "@/lib/schema";

// Only routable comparisons get a route (published ones, plus unpublished
// ones in a PREVIEW_UNPUBLISHED=1 build); anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return routableComparisons.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparison(slug);
  if (!page) return {};
  const url = `/compare/${page.slug}`;
  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: page.seo.title,
      description: page.seo.description,
      modifiedTime: page.updated,
      images: defaultShareImages.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
      images: defaultShareImages.twitter,
    },
    // A preview build routes unpublished comparisons; never indexed.
    ...(isPublished(page) ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const page = getComparison(slug);
  if (!page) notFound();

  const url = `${SITE}/compare/${page.slug}`;

  /*
   * One graph, cross-referenced by @id: the WebPage carries the breadcrumb
   * and has the Article as its main entity; the Article's author and
   * publisher are the sitewide Person and Organization nodes, referenced
   * rather than redeclared.
   */
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.seo.title,
        description: page.seo.description,
        inLanguage: "en-GB",
        dateModified: page.updated,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#article` },
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: page.hero.h1,
        description: page.hero.shortAnswer,
        inLanguage: "en-GB",
        dateModified: page.updated,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORG_ID },
        about: [
          { "@type": "Thing", name: "Wix Studio" },
          { "@type": "Thing", name: page.rival.name },
        ],
        citation: page.sources.map((s) => s.href),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          // The hub level is named only once it has a route to point at.
          ...(compareHubRoutable
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: compareTemplate.breadcrumbHub,
                  item: `${SITE}/compare`,
                },
              ]
            : []),
          {
            "@type": "ListItem",
            position: compareHubRoutable ? 3 : 2,
            name: page.hero.h1,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faq.items.map((f) => ({
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
      <JsonLd data={personSchema} />
      <ComparePage data={page} />
    </>
  );
}
