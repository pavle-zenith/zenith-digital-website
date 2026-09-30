import { Section } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import type { AuditPage } from "@/content/audits/types";

/**
 * The four headline numbers, as a hairline grid: 1px gaps over a rule-coloured
 * ground with solid cells, so the gaps are the rules (DESIGN.md, Layout).
 *
 * `frame-bleed-md` rather than `frame-bleed`: this is grid-shaped, so phones
 * keep the site gutter and only desktop reaches the rails.
 */
export function AuditStats({ stats }: { stats: AuditPage["stats"] }) {
  return (
    <Section tone="light" frameClassName="!py-0" divide={false}>
      <div className="frame-bleed-md grid grid-cols-2 gap-px border-t border-light-border bg-light-border md:grid-cols-4">
        {stats.map((metric) => (
          <div
            key={metric.label}
            className="bg-light-bg px-4 py-7 md:px-6 md:py-10 lg:px-8 lg:py-12"
          >
            {/* The value never breaks mid-figure from 360px up, where the cell
                has room for it even if the glyph estimate runs a few px long:
                the overflow lands in the cell's own padding. Below 360 it may
                wrap, because there the alternative is the figure crossing the
                hairline into the next cell, and a clean two-line number reads
                better than text through a rule. */}
            <StatBlock
              metric={metric}
              tone="light"
              className="min-[360px]:[&>span:first-child]:whitespace-nowrap"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
