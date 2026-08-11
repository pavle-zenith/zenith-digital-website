import { Section } from "@/components/ui/Section";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * "What we did" — dark section of 2–4 titled moves (the Flow Ninja
 * focus-areas pattern), stacked as hairline-divided editorial rows rather
 * than an essay or an equal-card grid.
 */
export function CaseStudyApproach({ study }: { study: CaseStudyDetail }) {
  return (
    <Section tone="dark" frameClassName="!py-14 md:!py-24">
      <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
        What we did
      </h2>
      <div className="mt-8 divide-y divide-border border-t border-border md:mt-10">
        {study.approach.map((move, i) => (
          <div
            key={move.heading}
            className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12 md:py-10"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-label text-text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-h3 font-medium leading-tight">
                {move.heading}
              </h3>
            </div>
            <p className="max-w-2xl text-body-lg leading-relaxed text-text-muted">
              {move.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
