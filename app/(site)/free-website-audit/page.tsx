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
  title: "Free Website Audit | SEO & Speed Review | Zenith Digital",
  description:
    "A free hand-reviewed website audit from a Wix Legend Partner. Short video walkthrough of what's costing you leads, rankings, and speed.",
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
