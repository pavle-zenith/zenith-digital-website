import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { BookHero } from "@/components/sections/BookHero";
import { CallCovers } from "@/components/sections/CallCovers";
import { BeforeAfterWork } from "@/components/sections/BeforeAfterWork";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { bookFaq, bookFinalCta } from "@/content/book-a-call";

export const metadata: Metadata = {
  title: "Book a free website call — Zenith Digital",
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
      <BookHero />
      <CallCovers />
      <BeforeAfterWork />
      <QuoteBand />
      <Faq data={bookFaq} />
      <CtaBanner data={bookFinalCta} />
    </>
  );
}
