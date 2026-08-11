import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { ServicePageHero } from "@/components/sections/service/ServicePageHero";
import { ServicePageWhoFor } from "@/components/sections/service/ServicePageWhoFor";
import { ServicePageIncluded } from "@/components/sections/service/ServicePageIncluded";
import { ServicePageProcess } from "@/components/sections/service/ServicePageProcess";
import { ServicePageProof } from "@/components/sections/service/ServicePageProof";
import { ServicePagePricing } from "@/components/sections/service/ServicePagePricing";
import { ServicePageUnique } from "@/components/sections/service/ServicePageUnique";
import { ServicePageRelated } from "@/components/sections/service/ServicePageRelated";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getServicePage, servicePages } from "@/content/service-pages";

const SITE = "https://www.thezenithdigital.com";

// Only published pages get routes; anything else 404s rather than leaking a
// half-finished page into the index.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: `/services/${page.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const url = `${SITE}/services/${page.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.hero.name,
    description: page.schema.description,
    url,
    serviceType: page.hero.name,
    provider: {
      "@type": "Organization",
      name: "Zenith Digital",
      url: SITE,
    },
    areaServed: ["United Kingdom", "European Union", "United States"],
    // Only published prices become offers; a page priced per project says so
    // in copy rather than asserting a number in markup.
    ...(page.schema.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: page.schema.priceFrom,
            url,
          },
        }
      : {}),
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
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE}/services`,
      },
      { "@type": "ListItem", position: 3, name: page.hero.name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <ServicePageHero data={page} />
      <ServicePageWhoFor data={page} />
      <ServicePageIncluded data={page} />
      <ServicePageProcess data={page} />
      <ServicePageProof data={page} />
      <ServicePagePricing data={page} />
      <ServicePageUnique data={page} />
      <Faq data={page.faq} />
      <ServicePageRelated data={page} />
      <CtaBanner data={page.finalCta} />
    </>
  );
}
