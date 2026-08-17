import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { personSchema } from "@/lib/schema";
import { AuditPageHero } from "@/components/sections/AuditPageHero";
import { AuditCovers } from "@/components/sections/AuditCovers";
import { AuditWhoFor } from "@/components/sections/AuditWhoFor";
import { AuditExample } from "@/components/sections/AuditExample";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FounderSection } from "@/components/sections/FounderSection";
import { Faq } from "@/components/sections/Faq";
import { auditCta, auditFaq } from "@/content/free-website-audit";
import { founderFreeAudit } from "@/content/founder";

export const metadata: Metadata = {
  title: "Free website audit | Zenith Digital",
  description:
    "Get a free, hand-reviewed audit of your website: a short video walkthrough of the fixes that would move conversions, rankings, and speed first.",
  alternates: { canonical: "/free-website-audit" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: auditFaq.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FreeWebsiteAuditPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={personSchema} />
      <AuditPageHero />
      <AuditCovers />
      <AuditWhoFor />
      <AuditExample />
      {/* Turns the form from "submit to a company" into "hand your site to a
          person". Tinted: AuditExample above and the FAQ below are both white. */}
      <FounderSection data={founderFreeAudit} size="expert" surface />
      <Faq data={auditFaq} />
      <CtaBanner data={auditCta} />
    </>
  );
}
