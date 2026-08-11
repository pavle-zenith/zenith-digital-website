import { Section } from "@/components/ui/Section";
import { Fragment } from "react";

/**
 * Scope strip — one quiet mono-label line listing what the engagement
 * covered ("Wix Studio · CMS · SEO & schema").
 */
export function CaseStudyScope({ items }: { items: string[] }) {
  return (
    <Section tone="light" frameClassName="!py-6 md:!py-8">
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2 font-mono text-label uppercase track-label text-light-muted">
        <span className="text-light-text">Scope</span>
        {items.map((item, i) => (
          <Fragment key={item}>
            {i > 0 ? <span aria-hidden>&middot;</span> : null}
            <span>{item}</span>
          </Fragment>
        ))}
      </p>
    </Section>
  );
}
