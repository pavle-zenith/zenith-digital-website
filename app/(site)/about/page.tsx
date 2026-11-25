import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { AboutVerify } from "@/components/sections/AboutVerify";
import { AboutNumbers } from "@/components/sections/AboutNumbers";
import { AboutHow } from "@/components/sections/AboutHow";
import { FounderSection } from "@/components/sections/FounderSection";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { WorkStrip } from "@/components/sections/WorkStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { founderServices } from "@/content/founder";
import { aboutFaq, aboutFinalCta, aboutVideo } from "@/content/about";
import { ORG_ID, SITE, personSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Zenith Digital | Web Design and Development Studio",
  description:
    "Zenith Digital is a web design and development studio in Belgrade, run by Pavle Maodus. Wix Legend Partner, 100+ websites on Wix Studio, Shopify and custom code.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: "About Zenith Digital | Web Design and Development Studio",
    description:
      "A web design and development studio in Belgrade, run by Pavle Maodus. Wix Legend Partner, 100+ websites shipped.",
  },
};

/**
 * AboutPage points at the one Organization node by @id rather than restating
 * it. There is exactly one Organization on the site (lib/schema.ts) and this
 * page is its description surface, not a second copy of it.
 */
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE}/about`,
  name: "About Zenith Digital",
  mainEntity: { "@id": ORG_ID },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aboutFaq.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <AboutHero />

      {/* Who trusts us, in logos, straight under the claim: the fastest
          signal on the page (owner brief, 25 Nov 2026). */}
      <ClientLogos />

      {/* The records behind the claims, before the story that rests on them. */}
      <AboutVerify />

      <AboutTimeline />

      {/* Who runs it, immediately after the dates that describe it. */}
      <FounderSection data={founderServices} />

      {/* One client on camera, breaking the run of text before the numbers:
          Finlay, on the partnership itself. */}
      <VideoTestimonials data={aboutVideo} layout="feature" />

      {/* The record, in numbers, then what it means to work with us. */}
      <AboutNumbers />
      <AboutHow />

      {/* Selected work, then the clients saying it in their own words */}
      <WorkStrip slugs={["knode-ai", "belistria"]} />
      <Testimonials />

      <Faq data={aboutFaq} />

      <CtaBanner data={aboutFinalCta} />
    </>
  );
}
