import { Section } from "@/components/ui/Section";
import { AuditReport } from "@/components/ui/AuditReport";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { auditExample } from "@/content/free-website-audit";
import { beforeAfter } from "@/content/book-a-call";

/**
 * "What an audit actually looks like" — light split. Left: the mock report
 * (score + findings written in plain language) with the caption, sticky so it
 * follows as you scroll. Right: a column of draggable before/after sliders
 * showing where audits led.
 */
export function AuditExample() {
  return (
    <Section tone="light" frameClassName="!py-24">
      <h2 className="mx-auto mb-12 text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {auditExample.heading}
      </h2>

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Sticky report */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col items-center gap-6 rounded-card bg-light-surface p-6 sm:p-10">
            <AuditReport report={auditExample.report} />
          </div>
          <p className="mt-5 max-w-md text-body text-light-muted">{auditExample.caption}</p>
        </div>

        {/* Before/after column */}
        <div className="flex flex-col gap-10">
          {beforeAfter.items.map((item) => (
            <BeforeAfterSlider
              key={item.title}
              title={item.title}
              before={item.before}
              after={item.after}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
