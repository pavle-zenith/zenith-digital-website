import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { TestimonialsHero } from "@/components/sections/TestimonialsHero";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import { WallOfLove } from "@/components/sections/WallOfLove";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import {
  allTestimonials,
  tFaq,
  tFinalCta,
  tVideos,
} from "@/content/testimonials";

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

// Review markup for every quote actually shown on this page: the 28 in the
// wall plus the 3 in the video slider, which is all of them. No
// AggregateRating until the live Clutch profile supplies a real rating value
// and count.
const reviewSchema = {
  "@context": "https://schema.org",
  "@graph": allTestimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
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
      <VideoTestimonials data={tVideos} slider />
      <WallOfLove />
      <Faq data={tFaq} />
      <CtaBanner data={tFinalCta} />
    </>
  );
}
