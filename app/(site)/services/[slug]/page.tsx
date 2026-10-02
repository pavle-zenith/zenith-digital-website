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
import {
  ServicePageUnique,
  ServicePagePlatforms,
} from "@/components/sections/service/ServicePageUnique";
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
import { MigrationGuide } from "@/components/sections/migration/MigrationGuide";
import { getMigrationGuide, migrationGuides } from "@/content/migration-guides";
import type { MigrationGuideContent } from "@/content/migration-guides";

const SITE = "https://www.thezenithdigital.com";

// Only published pages get routes; anything else 404s rather than leaking a
// half-finished page into the index.
export const dynamicParams = false;

/**
 * Two content types share this route. Service pages are the five core
 * services; migration guides are the platform spokes hanging off
 * /services/website-migration (wix-classic-to-wix-studio and siblings). They
 * sit as URL siblings because the /services/[slug] taxonomy is locked flat
 * (CLAUDE.md §5), and they use a leaner template of their own rather than
 * cloning ServicePageContent, which would produce near-duplicate pages.
 *
 * Slugs can't collide: both collections are filtered to `publish: true` and
 * the service page is resolved first.
 */
export function generateStaticParams() {
  return [
    ...servicePages.map((p) => ({ slug: p.slug })),
    ...migrationGuides.map((g) => ({ slug: g.slug })),
  ];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug) ?? getMigrationGuide(slug);
  if (!page) return {};

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: `/services/${page.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const guide = getMigrationGuide(slug);
  if (guide) return <MigrationGuidePage guide={guide} />;

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
      {/* The platform directory sits above "what a migration covers": it's the
          migration hub's signpost to its guide spokes, so it belongs where a
          reader is still choosing, not after the pitch. Renders only on the
          page whose `unique` block is the platforms kind. */}
      <ServicePagePlatforms data={page} />
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

/**
 * A migration guide spoke. Same schema discipline as the service pages:
 * Service referencing the sitewide Organization by @id, BreadcrumbList, and
 * FAQPage for the visible FAQ. No Review or AggregateRating, because nothing
 * on these pages is a review.
 *
 * The breadcrumb trail names the migration hub as the parent even though the
 * guide is a URL sibling. That matches the trail the hero renders, which is
 * the requirement: breadcrumbs describe the site's hierarchy, not its paths.
 */
function MigrationGuidePage({ guide }: { guide: MigrationGuideContent }) {
  const url = `${SITE}/services/${guide.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: guide.hero.name,
    description: guide.schema.description,
    url,
    serviceType: guide.hero.name,
    provider: { "@id": ORG_ID },
    areaServed: ["United Kingdom", "European Union", "United States"],
    ...(guide.schema.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: guide.schema.priceFrom,
            url,
          },
        }
      : {}),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.items.map((f) => ({
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Website migration",
        item: `${SITE}/services/website-migration`,
      },
      { "@type": "ListItem", position: 4, name: guide.platform, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <MigrationGuide data={guide} />
    </>
  );
}
