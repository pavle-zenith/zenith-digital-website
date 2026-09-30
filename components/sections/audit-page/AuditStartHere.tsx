import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pill } from "@/components/ui/Pill";
import type { AuditPage } from "@/content/audits/types";

/**
 * "Start here": the three fixes that matter most, lifted above the detail so a
 * skimmer gets the answer before the evidence.
 *
 * Numbered because the order is the advice (the one condition under which a
 * numbered sequence earns its place rather than decorating it). Three across
 * from `lg` in a hairline grid, each linking down to the segment that carries
 * its evidence, so "why should I believe this" is one click away.
 */
export function AuditStartHere({ keyFixes }: { keyFixes: AuditPage["keyFixes"] }) {
  return (
    <Section tone="light" className="bg-light-surface" frameClassName="!py-14 md:!py-20">
      <SectionHeader heading={keyFixes.heading} tone="light" />
      <ol role="list" className="frame-bleed-md grid gap-px border-y border-light-border bg-light-border lg:grid-cols-3">
        {keyFixes.items.map((item, i) => (
          <li key={item.title} className="flex flex-col bg-light-bg px-6 py-8 md:px-8 md:py-10">
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-surface font-display text-body-lg font-medium text-light-text"
            >
              {i + 1}
            </span>
            <h3 className="mt-6 font-display text-h3 font-medium leading-tight tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 flex-1 text-body-lg text-light-muted">{item.body}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Pill tone="light">{item.effort}</Pill>
              <a
                href={`#${item.segmentId}`}
                className="group inline-flex items-center gap-1.5 font-medium text-light-text underline underline-offset-4 transition hover:text-accent"
              >
                See details
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </a>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
