import { Section } from "@/components/ui/Section";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * "How it runs" — light. Service-specific steps, each carrying its own
 * duration as a mono label, laid out as a hairline-divided column. The
 * durations are the point: they're what a prospect is actually shopping for.
 */
export function ServicePageProcess({ data }: { data: ServicePageContent }) {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.process.heading}
        </h2>
        <p className="max-w-md text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
          {data.process.intro}
        </p>
      </div>

      <ol className="mt-10 divide-y divide-light-border border-t border-light-border md:mt-12">
        {data.process.steps.map((step, i) => (
          <li
            key={step.title}
            className="grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12 md:py-8"
          >
            <div>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-label text-light-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 pl-8 font-mono text-label uppercase track-label text-accent">
                {step.duration}
              </p>
            </div>
            <p className="max-w-2xl text-body leading-relaxed text-light-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
