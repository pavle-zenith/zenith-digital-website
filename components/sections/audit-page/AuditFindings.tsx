import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { AuditPage, AuditPriority } from "@/content/audits/types";
import { ChevronIcon } from "./icons";

/**
 * The full findings list, collapsed. The page is meant to be read in three
 * minutes and the PDF is the full record, so this section is the index to the
 * record rather than the record itself: five closed groups, opened on demand.
 *
 * Native <details>, so it works with JavaScript off, is keyboard operable and
 * announced as a disclosure without any ARIA of our own.
 *
 * GROUP VS FINDING. The open rows are children of the group title and have to
 * read that way at a glance. This system separates levels with tonal fill, not
 * shadow or a coloured bar (DESIGN.md, Elevation), so the rows are recessed
 * onto `light-surface`, indented from the title, and ruled with inset lines,
 * while the rules between groups still run rail to rail. The title steps up to
 * the sub-heading size and the rows stay at body size, so the scale says it too.
 *
 * PRIORITY IS NEVER COLOUR ALONE. Each pill prints its word; colour is a second
 * channel for skimming. The pills are WHITE-filled with a tinted border, not
 * tinted-filled: on the grey panel a 10% amber tint drops warning-ink to
 * 4.27:1, which fails AA for 13px text. White keeps all three at 4.93:1 or
 * better.
 */

const PRIORITY_STYLES: Record<AuditPriority, string> = {
  high: "border-negative/40 text-negative-ink",
  medium: "border-warning/55 text-warning-ink",
  low: "border-light-border text-light-muted",
};

const PRIORITY_LABEL: Record<AuditPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function AuditFindings({
  findings,
}: {
  findings: AuditPage["findings"];
}) {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <SectionHeader
        heading={findings.heading}
        intro={findings.summary}
        tone="light"
      />

      <div className="frame-bleed-md border-t border-light-border">
        {findings.groups.map((group) => (
          <details
            key={group.name}
            className="group border-b border-light-border"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-0 py-6 transition hover:bg-light-surface md:px-[clamp(20px,4vw,64px)] md:py-7 [&::-webkit-details-marker]:hidden">
              <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-h3 font-medium leading-tight tracking-tight text-light-text">
                  {group.name}
                </span>
                <span className="font-mono text-label uppercase track-label text-light-muted">
                  {group.items.length}{" "}
                  {group.items.length === 1 ? "finding" : "findings"}
                </span>
              </span>
              <ChevronIcon className="h-5 w-5 shrink-0 text-light-muted transition-transform duration-200 group-open:-rotate-180 motion-reduce:transition-none" />
            </summary>

            {/* Recessed panel. Its own top rule keeps the boundary with the
                title visible even while the title's hover wash is showing. */}
            <div className="border-t border-light-border bg-light-surface px-4 py-2 md:px-[clamp(20px,4vw,64px)]">
              {/* Rows, not a <table>: a list of findings rather than a matrix,
                  and the CSS that stacks table cells into cards on phones drops
                  the table from the accessibility tree in several browsers.
                  `md:pl-10` indents the rows under the title; the dividers sit
                  on the rows, so they inherit the indent and stop short of the
                  rails. The priority column is a fixed width so HIGH and MEDIUM
                  pills no longer shift the column beside them. */}
              <ul className="divide-y divide-light-border md:pl-10">
                {group.items.map((item) => (
                  <li
                    key={item.finding}
                    className="grid gap-x-8 gap-y-2 py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_6rem] md:items-baseline"
                  >
                    <p className="font-medium text-light-text">
                      {item.finding}
                    </p>
                    <p className="text-body text-light-muted">{item.why}</p>
                    <span
                      className={cn(
                        "inline-flex w-fit items-center rounded-full border bg-light-bg px-3 py-1 font-mono text-label uppercase track-label md:justify-self-end",
                        PRIORITY_STYLES[item.priority],
                      )}
                    >
                      {PRIORITY_LABEL[item.priority]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
