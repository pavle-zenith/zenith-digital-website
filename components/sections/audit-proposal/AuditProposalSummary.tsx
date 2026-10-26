import { StatBlock } from "@/components/ui/StatBlock";
import { TickList } from "@/components/sections/private-doc/parts";
import type { AuditProposalPage } from "@/content/proposals/types";
import { DocHeading, DocSection } from "./parts";

/**
 * "Ukratko": the short version for a reader who stops here. Two paragraphs,
 * then the three problems as ruled rows marked with a cross (what the site is
 * missing), followed straight on by the three changes marked with a tick
 * (what the new site does), so the pair reads as problem, then answer.
 */
export function AuditProposalSummary({ summary }: { summary: AuditProposalPage["summary"] }) {
  const [first, ...rest] = summary.body;
  return (
    <DocSection id={summary.id}>
      <DocHeading heading={summary.heading} />
      <div className="space-y-4">
        {first ? <p className="text-body-lg text-light-text">{first}</p> : null}
        {rest.map((para) => (
          <p key={para} className="text-body-lg text-light-muted">
            {para}
          </p>
        ))}
      </div>
      <TickList items={summary.points} columns={1} icon="cross" className="mt-8" />
      <TickList items={summary.fixes} columns={1} icon="check" className="mt-6" />
    </DocSection>
  );
}

/**
 * "Brzi pregled": the numbers, as a hairline grid of stat cells (gap-px over
 * the rule colour, solid cells). Two across on a phone, three from `sm`, so
 * the six figures read as two clean rows on anything wider than a phone.
 */
export function AuditProposalStats({ stats }: { stats: AuditProposalPage["stats"] }) {
  return (
    <DocSection id={stats.id} tinted>
      <DocHeading heading={stats.heading} />
      <ul
        role="list"
        className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-light-border bg-light-border sm:grid-cols-3"
      >
        {stats.items.map((item) => (
          <li key={item.label} className="bg-light-bg p-5 break-inside-avoid md:p-6">
            <StatBlock metric={item} tone="light" size="h2" className="gap-2" />
          </li>
        ))}
      </ul>
    </DocSection>
  );
}
