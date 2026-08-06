import { Section } from "@/components/ui/Section";
import { pProcess } from "@/content/partnerships";

/**
 * How a white-label build runs — a simple numbered four-step row (NOT the
 * homepage curve). Each step: mono index over a hairline, title, body.
 */
export function PartnerProcess() {
  return (
    <Section tone="light" frameClassName="!py-24">
      <h2 className="mb-12 max-w-2xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {pProcess.heading}
      </h2>

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {pProcess.steps.map((step, i) => (
          <div key={step.title} className="border-t border-light-border pt-6">
            <span className="font-mono text-label uppercase track-label text-light-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-body-lg font-medium">
              {step.title}
            </h3>
            <p className="mt-2 text-body leading-snug text-light-muted">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
