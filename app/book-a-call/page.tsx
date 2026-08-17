import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { personSchema } from "@/lib/schema";
import { BookHero } from "@/components/sections/BookHero";
import { CallCovers } from "@/components/sections/CallCovers";
import { BeforeAfterWork } from "@/components/sections/BeforeAfterWork";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { FounderSection } from "@/components/sections/FounderSection";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { bookFaq, bookFinalCta } from "@/content/book-a-call";
import { founderBookACall } from "@/content/founder";

export const metadata: Metadata = {
  title: "Book a free website call | Zenith Digital",
  description:
    "A free 20-minute call. We'll review your site live, show you what's costing you leads, and send a fixed-price proposal the same day.",
  alternates: { canonical: "/book-a-call" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: bookFaq.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function BookACallPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={personSchema} />
      <BookHero />
      <CallCovers />
      <BeforeAfterWork />
      <QuoteBand />
      {/* Who the call is actually with, right before the questions people
          check before picking a slot. Plain white after the dark QuoteBand. */}
      <FounderSection data={founderBookACall} size="expert" />
      <Faq data={bookFaq} />
      {/* The out for anyone who won't book a slot. The calendar's fallback
          line links down to it. */}
      <ContactSection />
      <CtaBanner data={bookFinalCta} />
    </>
  );
}
