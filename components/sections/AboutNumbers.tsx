import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatBlock } from "@/components/ui/StatBlock";
import { aboutNumbers } from "@/content/about";

/**
 * The record in numbers — now the page's ONLY stat block. The hero used to
 * carry four near-identical figures under weaker labels, so a reader met the
 * same evidence twice within two screens and the second showing added nothing.
 *
 * The note underneath is doing real work and is not boilerplate: it says every
 * figure traces to a named client and links to where. That sentence is the
 * difference between a stat row and a claim.
 */
export function AboutNumbers() {
  return (
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
  );
}
