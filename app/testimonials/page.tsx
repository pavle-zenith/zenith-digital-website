import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { TestimonialsHero } from "@/components/sections/TestimonialsHero";
import { WallOfLove } from "@/components/sections/WallOfLove";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { tFaq, tFinalCta, wall } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Testimonials | Zenith Digital client reviews & results",
  description:
    "What business owners say after Zenith launches their website. Real names, real companies, video testimonials, and the numbers behind them.",
  alternates: { canonical: "/testimonials" },
};

const SITE = "https://www.thezenithdigital.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Testimonials",
      item: `${SITE}/testimonials`,
    },
  ],
};

// Review markup for the real, attributed quotes only — placeholders and
// video-only cards stay out. No AggregateRating until the live Clutch
// profile supplies a real rating value and count.
const reviewSchema = {
  "@context": "https://schema.org",
  "@graph": wall
    .filter(
      (c): c is Extract<typeof wall[number], { type: "quote" }> =>
        c.type === "quote" && !c.placeholder,
    )
    .map((c) => ({
      "@type": "Review",
      author: { "@type": "Person", name: c.name },
      reviewBody: c.quote,
      itemReviewed: {
        "@type": "Organization",
        name: "Zenith Digital",
        url: SITE,
      },
    })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: tFaq.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={reviewSchema} />
      <JsonLd data={faqSchema} />

      <TestimonialsHero />
      <WallOfLove />
      <Faq data={tFaq} />
      <CtaBanner data={tFinalCta} />
    </>
  );
}
