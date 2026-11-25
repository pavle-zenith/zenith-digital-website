import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";

export type RelatedCard = { kind: string; label: string; href: string; icon: string };

/**
 * Further reading as a compact strip of cards: an icon, the kind, the name.
 * Shared by the comparison pages, the free resource pages and the cost
 * calculator, so "related" reads the same everywhere (moved out of
 * ComparePage for the resources hub, 23 Nov 2026).
 *
 * Columns follow the count (three across for three, four for four) so a
 * short row never leaves an empty cell. Phones get a list.
 */
export function RelatedCards({ heading, items }: { heading: string; items: RelatedCard[] }) {
  if (items.length === 0) return null;
  return (
    <Section tone="light" frameClassName="!py-10 md:!py-16">
      <h2 className="max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {heading}
      </h2>
      <div
        className={cn(
          "type-card mt-8 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border sm:grid-cols-2 md:mt-10",
          items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : "",
        )}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-4 bg-light-bg p-4 transition hover:bg-light-surface sm:flex-col sm:items-start sm:gap-0 sm:p-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text">
              <FeatureIcon name={item.icon} />
            </span>
            <span className="min-w-0 sm:mt-5">
              <span className="block font-mono text-label uppercase track-label text-light-muted">{item.kind}</span>
              <span className="mt-1 block font-display text-body-lg font-medium leading-snug tracking-tight">
                {item.label}{" "}
                <span className="btn-arrow whitespace-nowrap" aria-hidden>
                  &rarr;
                </span>
              </span>
            </span>
          </Link>
        ))}
        {/* Two across with an odd count: fill the last cell. */}
        {items.length % 2 === 1 ? <span aria-hidden className="hidden bg-light-bg sm:block lg:hidden" /> : null}
      </div>
    </Section>
  );
}
