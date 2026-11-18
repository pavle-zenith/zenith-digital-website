import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { defaultShareImages } from "@/lib/shareImage";
import { IndustryPage } from "@/components/sections/industry/IndustryPage";
import { ORG_ID, SITE, WEBSITE_ID, personSchema } from "@/lib/schema";
import {
  getIndustryPage,
  routableIndustryPages,
} from "@/content/industries";
import { PACKAGES, priceNumber } from "@/content/industries/proof";
import { industryTemplate } from "@/content/industries/template";

// Only routable pages get a route (published ones, plus unpublished ones in a
// PREVIEW_UNPUBLISHED=1 build); anything else 404s rather than leaking a page
// the owner hasn't read.
export const dynamicParams = false;

export function generateStaticParams() {
  return routableIndustryPages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) return {};

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: `/industries/${page.slug}` },
    // A page-level openGraph replaces the layout's, so the share image is
    // restated (lib/shareImage); without this, shares showed the site default title.
    openGraph: {
      type: "website",
      url: `/industries/${page.slug}`,
      title: page.seo.title,
      description: page.seo.description,
      images: defaultShareImages.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
      images: defaultShareImages.twitter,
    },
    // A preview build routes unpublished pages; they must never be indexed.
    ...(page.publish ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) notFound();

  const url = `${SITE}/industries/${page.slug}`;
  const hubUrl = `${SITE}/industries`;

  /*
   * One graph per page, cross-referenced by @id: the WebPage is about the
   * Service, sits in the WebSite, and carries the breadcrumb. The Service's
   * provider is the sitewide Organization node, referenced rather than
   * redeclared, so the entity graph stays single-rooted.
   */
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.seo.title,
    description: page.seo.description,
    inLanguage: "en-GB",
    dateModified: page.updated,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": `${url}#service` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.schema.serviceName,
    serviceType: page.schema.serviceName,
    description: page.schema.description,
    url,
    provider: { "@id": ORG_ID },
    areaServed: ["United Kingdom", "European Union", "United States"],
    // The lowest published full-site price; the page shows the rest.
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: priceNumber(PACKAGES.minimum.price),
      url,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: industryTemplate.breadcrumbHub,
        item: hubUrl,
      },
      { "@type": "ListItem", position: 3, name: page.name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* The founder node the sitewide Organization references by @id, as on
          the service pages, so the graph has no dangling reference. */}
      <JsonLd data={personSchema} />

      <IndustryPage data={page} />
    </>
  );
}
