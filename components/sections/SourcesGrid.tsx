import { Section } from "@/components/ui/Section";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { formatLongDate } from "@/lib/utils";

type Source = { label: string; href: string; note: string };

/**
 * Primary sources as a two-across card grid. This is the citability moat the
 * migration guides were built around: every competing guide reviewed cites
 * nothing, so linking the vendor's own documentation is what makes a claim
 * checkable instead of assertable. Blog posts get the same treatment for the
 * same reason, from the same component.
 *
 * `verified` is optional: the guides print it here, posts print it in the
 * byline under the title and would otherwise say it twice.
 */
export function SourcesGrid({
  heading,
  intro,
  verified,
  items,
}: {
  heading: string;
  intro: string;
  verified?: string;
  items: Source[];
}) {
  if (items.length === 0) return null;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {intro}
        </p>
        {verified ? (
          <p className="mt-3 font-mono text-label uppercase track-label text-light-muted">
            {`Last verified ${formatLongDate(verified)}`}
          </p>
        ) : null}
      </div>

      {/* The trailing filler keeps the block rectangular on an odd count. */}
      <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-cols-2">
        {items.map((source) => (
          <a
            key={source.href}
            href={source.href}
            rel="noopener nofollow"
            target="_blank"
            className="group flex flex-col bg-light-bg p-6 transition hover:bg-light-surface"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text">
              <FeatureIcon name="clipboard" />
            </span>
            <h3 className="mt-5 font-display text-body-lg font-medium leading-snug text-light-text">
              {source.label}{" "}
              <span className="btn-arrow whitespace-nowrap" aria-hidden>
                &rarr;
              </span>
            </h3>
            <p className="mt-2 text-body leading-relaxed text-light-muted">
              {source.note}
            </p>
          </a>
        ))}
        {items.length % 2 === 1 ? (
          <div aria-hidden className="hidden bg-light-bg md:block" />
        ) : null}
      </div>
    </Section>
  );
}
