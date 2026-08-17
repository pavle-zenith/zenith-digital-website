import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatBlock } from "@/components/ui/StatBlock";
import { DividedList, DividedRow } from "@/components/ui/DividedList";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { FounderSection } from "@/components/sections/FounderSection";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { WorkStrip } from "@/components/sections/WorkStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { founderServices } from "@/content/founder";
import {
  aboutFaq,
  aboutFinalCta,
  aboutHow,
  aboutLegal,
  aboutNumbers,
  aboutVouch,
} from "@/content/about";
import { ORG_ID, SITE, personSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Zenith Digital: Wix Studio Web Design Agency",
  description:
    "Zenith Digital is a Wix Studio web design agency in Belgrade, run by Pavle Maodus. Wix Legend Partner, 100+ websites shipped for UK, EU and US clients.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: "About Zenith Digital: Wix Studio Web Design Agency",
    description:
      "A Wix Studio web design agency in Belgrade, run by Pavle Maodus. Wix Legend Partner, 100+ websites shipped.",
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
      <AboutTimeline />

      {/* Who runs it, immediately after the dates that describe it. */}
      <FounderSection data={founderServices} />

      {/* The record, in numbers */}
      <Section tone="dark" frameClassName="!py-14 md:!py-24">
        <SectionHeader heading={aboutNumbers.heading} tone="dark" />
        <div className="grid grid-cols-2 gap-8 border-t border-border pt-10 md:grid-cols-4">
          {aboutNumbers.stats.map((metric) => (
            <StatBlock key={metric.label} metric={metric} tone="dark" />
          ))}
        </div>
        <p className="mt-10 max-w-[68ch] text-body text-text-muted">
          {aboutNumbers.note}{" "}
          <Link
            href="/case-studies"
            className="underline underline-offset-4 transition hover:text-text"
          >
            Read the case studies
          </Link>
          .
        </p>
      </Section>

      {/* How we work */}
      <Section tone="light" frameClassName="!py-14 md:!py-24">
        <SectionHeader heading={aboutHow.heading} tone="light" />
        <DividedList tone="light" className="border-b border-light-border">
          {aboutHow.items.map((item) => (
            <DividedRow
              key={item.title}
              className="grid gap-2 py-6 md:grid-cols-[22rem_1fr] md:gap-8"
            >
              <h3 className="font-display text-body-lg font-medium">
                {item.title}
              </h3>
              <p className="max-w-[68ch] text-body-lg leading-relaxed text-light-muted">
                {item.body}
              </p>
            </DividedRow>
          ))}
        </DividedList>
      </Section>

      {/* Who vouches for us */}
      <Section tone="dark" frameClassName="!py-14 md:!py-24">
        <SectionHeader
          heading={aboutVouch.heading}
          intro={aboutVouch.intro}
          tone="dark"
        />
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {aboutVouch.items.map((item) => (
            <div key={item.name} className="bg-bg p-6 md:p-8">
              <h3 className="font-display text-h3 font-medium">{item.name}</h3>
              <p className="mt-3 text-body leading-relaxed text-text-muted">
                {item.body}
              </p>
              {item.link ? (
                <ExternalOrInternalLink
                  href={item.link.href}
                  label={item.link.label}
                />
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      {/* Partner and client marks */}
      <ClientLogos />

      {/* Selected work, then the clients saying it in their own words */}
      <WorkStrip slugs={["knode-ai", "belistria"]} />
      <Testimonials />

      <Faq data={aboutFaq} />

      {/* Registered entity. Legal footnote register: small, muted, last. */}
      <Section tone="light" frameClassName="!py-8">
        <p className="text-body text-light-muted">{aboutLegal}</p>
      </Section>

      <CtaBanner data={aboutFinalCta} />
    </>
  );
}

/** Profile links leave the site; the partnerships link stays on it. */
function ExternalOrInternalLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const cls =
    "group mt-4 inline-flex items-center gap-2 font-display font-medium text-text underline underline-offset-4 transition hover:text-accent";
  const inner = (
    <>
      {label}
      <span aria-hidden className="btn-arrow">
        &rarr;
      </span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener">
      {inner}
    </a>
  );
}
