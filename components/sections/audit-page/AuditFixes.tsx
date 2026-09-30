import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pill } from "@/components/ui/Pill";
import type { AuditPage } from "@/content/audits/types";

/**
 * The three fixes, as ruled rows rather than three equal cards.
 *
 * The numbers are load-bearing here: this is a ranked list of what to do first,
 * and the order is the recommendation. That is the one condition under which
 * numbering a sequence earns its place rather than decorating it.
 *
 * "Why" and "Fix" are the same two questions on every row, so they are set as
 * inline labels: the reader learns the shape once and can then scan either
 * column down the page.
 */
export function AuditFixes({ fixes }: { fixes: AuditPage["fixes"] }) {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <SectionHeader heading={fixes.heading} tone="light" />

      <ol role="list" className="frame-bleed-md grid gap-px border-t border-light-border bg-light-border">
        {fixes.items.map((item, i) => (
          <li
            key={item.title}
            className="bg-light-bg px-0 py-8 md:px-[clamp(20px,4vw,64px)] md:py-10"
          >
            <div className="grid gap-5 md:grid-cols-[auto_1fr] md:gap-8">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-surface font-display text-body-lg font-medium text-light-text"
                aria-hidden
              >
                {i + 1}
              </span>

              <div>
                <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
                  {item.title}
                </h3>
                <dl className="mt-4 flex flex-col gap-3 text-body-lg">
                  <div>
                    <dt className="inline font-semibold text-light-text">Why: </dt>
                    <dd className="inline text-light-muted">{item.why}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-light-text">Fix: </dt>
                    <dd className="inline text-light-muted">{item.fix}</dd>
                  </div>
                </dl>
                <div className="mt-5">
                  <Pill tone="light">{item.effort}</Pill>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
