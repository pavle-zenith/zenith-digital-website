import { Section } from "@/components/ui/Section";
import { AuditReport } from "@/components/ui/AuditReport";
import { TransformationShowcase } from "@/components/sections/Transformation";
import { auditExample } from "@/content/free-website-audit";

/**
 * "What an audit actually looks like" — light split. Left: the mock report
 * (score + findings written in plain language) with the caption, sticky so it
 * follows as you scroll. Right: the featured before/after (Transformation,
 * compact), showing where audits led.
 */
export function AuditExample() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <h2 className="mx-auto mb-8 md:mb-12 text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {auditExample.heading}
      </h2>

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Sticky report */}
        <div className="lg:sticky lg:top-[calc(6rem+var(--announce-h))] lg:self-start">
          <div className="flex flex-col items-center gap-6 rounded-card bg-light-surface p-6 sm:p-10">
            <AuditReport report={auditExample.report} />
          </div>
          <p className="mt-5 max-w-md text-body text-light-muted">
            {auditExample.caption}
          </p>
        </div>

        {/* Before/after column */}
        <div className="min-w-0">
          <TransformationShowcase slugs={auditExample.transformationSlugs} compact />
        </div>
      </div>
    </Section>
  );
}
