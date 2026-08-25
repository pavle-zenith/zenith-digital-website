import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { ORG_ID } from "@/lib/schema";
import { CaseStudyDetailHero } from "@/components/sections/CaseStudyDetailHero";
import { CaseStudyMetaStrip } from "@/components/sections/CaseStudyMetaStrip";
import { CaseStudyShot } from "@/components/sections/CaseStudyShot";
import { CaseStudyIntro } from "@/components/sections/CaseStudyIntro";
import { CaseStudyMedia } from "@/components/sections/CaseStudyMedia";
import { CaseStudyStory } from "@/components/sections/CaseStudyStory";
import { CaseStudyScrollShot } from "@/components/sections/CaseStudyScrollShot";
import { CaseStudyTestimonial } from "@/components/sections/CaseStudyTestimonial";
import { CaseStudyRelated } from "@/components/sections/CaseStudyRelated";
import { CtaBanner } from "@/components/sections/CtaBanner";
import {
  caseStudyDetails,
  csDetailCta,
  getCaseStudyDetail,
} from "@/content/case-studies";

const SITE = "https://www.thezenithdigital.com";

// Only studies with shipped detail data get a page; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyDetails.map((d) => ({ slug: d.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyDetail(slug);
  if (!study) return {};

  const image = study.gallery?.[0]?.src ?? study.thumb;
  return {
    title:
      study.seo?.title ??
      `${study.headline} | ${study.client} case study | Zenith Digital`,
    description: study.seo?.description ?? study.challenge[0],
    alternates: { canonical: `/case-studies/${study.slug}` },
    // Per-study OG: the hero screenshot rather than the generic site card, and
    // `article` rather than `website`, since these are dated, authored pieces.
    openGraph: {
      type: "article",
      url: `/case-studies/${study.slug}`,
      title: study.seo?.title ?? study.headline,
      description: study.seo?.description ?? study.challenge[0],
      publishedTime: study.publishedAt,
      ...(image
        ? { images: [{ url: image, alt: study.heroShot?.alt ?? study.client }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: study.seo?.title ?? study.headline,
      description: study.seo?.description ?? study.challenge[0],
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyDetail(slug);
  if (!study) notFound();

  const url = `${SITE}/case-studies/${study.slug}`;
  const image = study.gallery?.[0]?.src ?? study.thumb;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.headline,
    ...(image ? { image: [`${SITE}${image}`] } : {}),
    datePublished: study.publishedAt,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: { "@type": "Organization", name: study.client },
    mainEntityOfPage: url,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case studies",
        item: `${SITE}/case-studies`,
      },
      { "@type": "ListItem", position: 3, name: study.client, item: url },
    ],
  };

  // No Review markup here. A review Zenith publishes about Zenith is
  // self-serving: ineligible for Google review rich results and a needless
  // manual-action risk. The testimonial still renders as visible proof.
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <CaseStudyDetailHero study={study} />
      <CaseStudyMetaStrip study={study} />
      {study.heroShot ? <CaseStudyShot image={study.heroShot} /> : null}
      <CaseStudyIntro study={study} />
      <CaseStudyMedia study={study} />
      <CaseStudyStory study={study} />

      {/* The whole design in one band, after the numbers that justify it and
          before the client says it in their own words. */}
      {study.scrollShot ? <CaseStudyScrollShot {...study.scrollShot} /> : null}

      {study.testimonial ? (
        <CaseStudyTestimonial testimonial={study.testimonial} />
      ) : null}
      {/* Per-study CTA copy when the outcome is specific enough to beat the
          generic line; buttons and texture always come from csDetailCta. */}
      <CtaBanner data={{ ...csDetailCta, ...(study.cta ?? {}) }} />
      <CaseStudyRelated currentSlug={study.slug} />
    </>
  );
}
