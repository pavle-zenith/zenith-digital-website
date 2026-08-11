import Link from "next/link";

import { Section } from "@/components/ui/Section";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * Related services — light. Three hairline-divided rows linking to the
 * siblings and the hub, each with a one-line reason to click, so the page
 * never dead-ends and the internal link graph stays connected.
 */
export function ServicePageRelated({ data }: { data: ServicePageContent }) {
  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
        {data.related.heading}
      </h2>

      <ul className="mt-8 divide-y divide-light-border border-t border-light-border md:mt-10">
        {data.related.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group grid gap-2 py-6 transition md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto] md:items-baseline md:gap-8"
            >
              <span className="font-display text-h3 font-medium leading-tight tracking-tight transition group-hover:text-accent">
                {item.label}
              </span>
              <span className="text-body leading-relaxed text-light-muted">
                {item.desc}
              </span>
              <span
                aria-hidden
                className="btn-arrow hidden font-display text-h3 md:block"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
