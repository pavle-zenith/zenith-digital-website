import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { TestimonialsHero } from "@/components/sections/TestimonialsHero";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import { WallOfLove } from "@/components/sections/WallOfLove";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { CtaBanner } from "@/components/sections/CtaBanner";
import {
  tFinalCta,
  tVideos,
  VIDEO_TRACK_ID,
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

// No Review or AggregateRating markup on this page. Reviews a business
// publishes about itself are self-serving: Google excludes them from review
// rich results, and emitting one node per quote reads as an attempt to farm
// stars. The quotes render as visible proof, which is what they are for.
// Third-party ratings belong on the Trustpilot profile linked from the footer.

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <TestimonialsHero />
      <VideoTestimonials
        data={tVideos}
        slider
        tone="light"
        trackId={VIDEO_TRACK_ID}
      />
      <WallOfLove />
      <ClientLogos />
      <CtaBanner data={tFinalCta} />
    </>
  );
}
