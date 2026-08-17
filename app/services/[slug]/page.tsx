import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { ORG_ID, personSchema } from "@/lib/schema";
import { ServicePageHero } from "@/components/sections/service/ServicePageHero";
import { ServicePageWhoFor } from "@/components/sections/service/ServicePageWhoFor";
import { ServicePageStakes } from "@/components/sections/service/ServicePageStakes";
import { ServicePageOutcomes } from "@/components/sections/service/ServicePageOutcomes";
import { ServicePageIncluded } from "@/components/sections/service/ServicePageIncluded";
import { ServicePageProcess } from "@/components/sections/service/ServicePageProcess";
import { ServicePagePricing } from "@/components/sections/service/ServicePagePricing";
import { ServicePageUnique } from "@/components/sections/service/ServicePageUnique";
import { ServicePageRelated } from "@/components/sections/service/ServicePageRelated";
import { founderServices } from "@/content/founder";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FounderSection } from "@/components/sections/FounderSection";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ProjectsSlider } from "@/components/sections/ProjectsSlider";
import { WorkStrip } from "@/components/sections/WorkStrip";
import { Testimonials } from "@/components/sections/Testimonials";
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
    // Reference the sitewide Organization node by @id rather than declaring a
    // second one, so the entity graph stays single-rooted.
    provider: { "@id": ORG_ID },
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
      <JsonLd data={personSchema} />

      <ServicePageHero data={page} />
      {/* Completed work directly under the hero — the hero's proof stats head
          the strip, slider arrows on their right. */}
      <ProjectsSlider stats={page.hero.chips} />
      <ServicePageWhoFor data={page} />
      <ClientLogos />
      {/* The arc: where you are, proof it works, what changes, what we do,
          how it runs, then what staying put costs. Per-service case studies
          as partner-story rows, under the sitewide "Real examples" heading. */}
      <WorkStrip slugs={page.workSlugs} />
      <ServicePageOutcomes data={page} />
      <ServicePageIncluded data={page} />
      <ServicePageProcess data={page} />
      <ServicePageStakes data={page} />
      {/* Full stats + testimonials, same as the homepage. */}
      <Testimonials />
      <ServicePagePricing data={page} />
      {/* The trust gap: pricing is settled, the reader now asks who these
          people are. Light per the founder spec, tinted so it separates from
          the white Pricing section directly above. */}
      <FounderSection data={founderServices} surface />
      <ServicePageUnique data={page} />
      <Faq data={page.faq} />
      <ServicePageRelated data={page} />
      <CtaBanner data={page.finalCta} />
    </>
  );
}
