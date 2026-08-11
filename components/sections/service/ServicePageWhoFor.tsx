import { Section } from "@/components/ui/Section";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * "Who this is for" — light. Heading and intro left, then the three buyer
 * situations as a hairline grid. Named situations rather than benefits, so a
 * reader can self-select in one pass.
 */
export function ServicePageWhoFor({ data }: { data: ServicePageContent }) {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.whoFor.heading}
        </h2>
        <p className="max-w-md text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
          {data.whoFor.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-cols-3">
        {data.whoFor.items.map((item) => (
          <article key={item.title} className="bg-light-bg p-8">
            <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 text-body leading-relaxed text-light-muted">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
