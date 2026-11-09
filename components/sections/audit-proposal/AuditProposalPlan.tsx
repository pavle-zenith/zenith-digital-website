import { NumberChip, TickList } from "@/components/sections/private-doc/parts";
import type { AuditProposalPage } from "@/content/proposals/types";
import { DocHeading, DocSection } from "./parts";

/**
 * "Kako izgleda saradnja": the steps in order, numbered because the order is
 * the plan. Each row is the step, then when it happens: beside it from `sm`,
 * under it on a phone. The timing is a mono label, as on the proposal
 * timeline, so the eye can run down the weeks alone.
 */
export function AuditProposalTimeline({ timeline }: { timeline: AuditProposalPage["timeline"] }) {
  return (
    <DocSection id={timeline.id}>
      <DocHeading heading={timeline.heading} />
      <ol role="list">
        {timeline.rows.map((row, i) => (
          <li
            key={row.what}
            className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-1 border-t border-light-border py-4 break-inside-avoid sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-x-6"
          >
            <NumberChip n={i + 1} tone="light" />
            <p className="text-body text-light-text md:text-body-lg">
              <span className="font-medium">{row.what}</span>
              {row.detail ? <span className="text-light-muted"> {row.detail}</span> : null}
              {row.description ? (
                <span className="mt-1 block text-body text-light-muted">{row.description}</span>
              ) : null}
            </p>
            <p className="col-start-2 font-mono text-label uppercase track-label text-light-muted sm:col-start-3 sm:text-right">
              {row.when}
            </p>
          </li>
        ))}
      </ol>
    </DocSection>
  );
}

/**
 * "Šta nam treba od vas": a checklist, so each row starts with an empty box:
 * these are things still to answer or send, not things already done.
 */
export function AuditProposalNeeds({ needs }: { needs: AuditProposalPage["needs"] }) {
  return (
    <DocSection id={needs.id} tinted>
      <DocHeading heading={needs.heading} />
      <TickList items={needs.items} columns={1} icon="box" />
    </DocSection>
  );
}
