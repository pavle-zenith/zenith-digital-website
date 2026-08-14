import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { CaseStudyDetailHero } from "@/components/sections/CaseStudyDetailHero";
import { CaseStudyMetaStrip } from "@/components/sections/CaseStudyMetaStrip";
import { CaseStudyShot } from "@/components/sections/CaseStudyShot";
import { CaseStudyIntro } from "@/components/sections/CaseStudyIntro";
import { CaseStudyMedia } from "@/components/sections/CaseStudyMedia";
import { CaseStudyStory } from "@/components/sections/CaseStudyStory";
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
    // Per-study OG image (the hero screenshot), not the generic site OG.
    ...(image ? { openGraph: { images: [image] } } : {}),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyDetail(slug);
  if (!study) notFound();

  const url = `${SITE}/case-studies/${study.slug}`;
  const image = study.gallery?.[0]?.src ?? study.thumb;
  const zenith = { "@type": "Organization", name: "Zenith Digital", url: SITE };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.headline,
    ...(image ? { image: [`${SITE}${image}`] } : {}),
    datePublished: study.publishedAt,
    author: zenith,
    publisher: zenith,
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

  // Review markup rides with the visible quote — it ships only when the
  // testimonial section actually renders.
  const reviewSchema = study.testimonial
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: zenith,
        author: { "@type": "Person", name: study.testimonial.name },
        reviewBody: study.testimonial.quote,
      }
    : null;

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {reviewSchema ? <JsonLd data={reviewSchema} /> : null}

      <CaseStudyDetailHero study={study} />
      <CaseStudyMetaStrip study={study} />
      {study.heroShot ? <CaseStudyShot image={study.heroShot} /> : null}
      <CaseStudyIntro study={study} />
      <CaseStudyMedia study={study} />
      <CaseStudyStory study={study} />
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
