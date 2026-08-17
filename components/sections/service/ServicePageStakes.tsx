import { Section } from "@/components/ui/Section";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * "What staying put costs" — the cost-of-inaction layer: whoFor mirrors the
 * reader's situation, this prices staying in it.
 *
 * The surface tint is on the inner block rather than the section, so the grey
 * stops at the frame's max width instead of running to the viewport edges.
 * The frame's own vertical padding is dropped (`!py-0`) and re-applied inside
 * the tint, so the grey fills the full height of the band rather than
 * floating inside it. Each cell leads with a line icon at the top and drops
 * its copy to the bottom, so the bodies land on one baseline across the row
 * however long they run. Renders nothing when a page has no `stakes`.
 */
export function ServicePageStakes({ data }: { data: ServicePageContent }) {
  const stakes = data.stakes;
  if (!stakes || stakes.items.length === 0) return null;

  return (
    <Section tone="light" frameClassName="!py-0">
      {/* frame-bleed cancels the frame gutter so the tint runs rail to rail;
          the gutter is re-applied inside it for the content (§15). */}
      <div className="frame-bleed bg-light-surface px-[clamp(20px,4vw,64px)] py-14 md:py-24">
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
            <article key={item.title} className="flex flex-col bg-light-bg p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-surface text-light-text">
                <FeatureIcon name={item.icon ?? ""} />
              </span>
              {/* mt-auto drops the copy to the foot of the cell, so titles
                  sit on one line across a row of uneven bodies. */}
              <h3 className="mt-auto pt-10 font-display text-h3 font-medium leading-tight tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-body leading-relaxed text-light-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
