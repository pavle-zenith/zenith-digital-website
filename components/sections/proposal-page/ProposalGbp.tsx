import { Section } from "@/components/ui/Section";
import type { ProposalPage } from "@/content/proposals/types";
import { TickList } from "./parts";

/**
 * Google Business Profiles. Heading left and the list right from `lg`, so this
 * short section reads as one line of the plan rather than another full-width
 * block of rows.
 */
export function ProposalGbp({ gbp }: { gbp: ProposalPage["gbp"] }) {
  return (
    <Section id="gbp" tone="light" className="doc-anchor" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 font-semibold leading-tight text-balance">
            {gbp.heading}
          </h2>
          <p className="mt-4 text-body-lg text-light-muted">{gbp.intro}</p>
        </div>
        <TickList items={gbp.items} />
      </div>
    </Section>
  );
}
