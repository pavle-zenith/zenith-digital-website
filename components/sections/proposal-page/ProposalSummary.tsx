import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProposalPage } from "@/content/proposals/types";
import { NumberChip } from "./parts";

/**
 * "The short version": the three things to know, for a reader who stops here.
 * A hairline grid, three across from `lg`, on the surface tint so the white
 * cells read as one ruled sheet.
 */
export function ProposalSummary({ summary }: { summary: ProposalPage["summary"] }) {
  return (
    <Section tone="light" className="bg-light-surface" frameClassName="!py-14 md:!py-20">
      <SectionHeader heading={summary.heading} tone="light" />
      <ol
        role="list"
        className="frame-bleed-md grid gap-px border-y border-light-border bg-light-border lg:grid-cols-3"
      >
        {summary.cards.map((card, i) => (
          <li key={card.title} className="flex flex-col bg-light-bg px-6 py-8 md:px-8 md:py-10">
            <NumberChip n={i + 1} tone="light" />
            <h3 className="mt-6 font-display text-h3 font-medium leading-tight tracking-tight text-balance">
              {card.title}
            </h3>
            <p className="mt-3 text-body-lg text-light-muted">{card.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
