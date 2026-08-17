import { Section } from "@/components/ui/Section";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * "What staying put costs" — light, on the surface tint. The cost-of-inaction
 * layer: whoFor mirrors the reader's situation, this prices staying in it, and
 * included then answers it.
 *
 * Prose cells in a hairline grid, no icons: these are arguments, and an icon
 * above each one would decorate rather than inform (§14). The section renders
 * nothing when a page has no `stakes`, so the field stays optional.
 */
export function ServicePageStakes({ data }: { data: ServicePageContent }) {
  const stakes = data.stakes;
  if (!stakes || stakes.items.length === 0) return null;

  return (
    <Section
      tone="light"
      className="bg-light-surface"
      frameClassName="!py-14 md:!py-24"
    >
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {stakes.heading}
        </h2>
        {stakes.intro ? (
          <p className="max-w-md text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
            {stakes.intro}
          </p>
        ) : null}
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-cols-3">
        {stakes.items.map((item) => (
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
