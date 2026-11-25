import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export type MetaRow = {
  label: string;
  value?: string | null;
  /**
   * Optional mark shown to the LEFT of the label and value, sized to span from
   * the top of the label to the bottom of the value: the blog's author avatar.
   * Square, so its width tracks that height. Pass a node that fills its box
   * (`h-full w-full`).
   *
   * It is absolutely positioned inside a padded cell rather than being a third
   * child of the cell. A `dl` may only contain `dt`/`dd` (optionally wrapped in
   * a `div`), so a sibling `<span>` beside them would put the list outside its
   * own content model. Positioning keeps the markup a clean description list
   * and still centres the mark across the two lines.
   */
  media?: React.ReactNode;
};

/**
 * The facts strip that sits directly under a detail-page hero.
 *
 * One quiet hairline-divided row from sm up, first cell flush to the frame
 * gutter. It never wraps onto a second line (a wrapped fact lost its place in
 * the row and left a dangling rule; Bianomics, Nov 2026): a long value breaks
 * onto two lines inside its own cell instead, and when the row still runs out
 * of room it scrolls sideways, its right edge fading out to show there's
 * more. On phones it stacks into one hairline-divided column, label left and
 * value right. Rows with no value are dropped, so a caller can list every
 * possible fact and let the data decide which appear.
 *
 * Extracted from the case studies when the blog needed the same object for a
 * post's byline. Two call sites, one implementation, so a case study and an
 * article state their facts in exactly the same voice. `children` is the
 * optional trailing action (the case studies' "View live site" link).
 */
export function MetaStrip({
  rows,
  children,
  actionBeside = "lg",
}: {
  rows: MetaRow[];
  children?: React.ReactNode;
  /**
   * The width from which the action sits beside the row rather than under
   * it. The case studies hold it under until xl, since five facts and the
   * live-site link need the room; the blog's three short facts don't.
   */
  actionBeside?: "lg" | "xl";
}) {
  const shown = rows.filter((row) => row.value);
  if (shown.length === 0) return null;

  return (
    <Section tone="light" frameClassName="!py-6 md:!py-7">
      <div
        className={cn(
          "flex flex-col gap-6",
          actionBeside === "lg"
            ? "lg:flex-row lg:items-center lg:justify-between lg:gap-10"
            : "xl:flex-row xl:items-center xl:justify-between xl:gap-10",
        )}
      >
        {/* Until the action sits beside the row (`actionBeside`) it goes
            under it, leaving the facts the frame's full width. min-w-0 lets
            the row shrink beside the action and scroll, rather than pushing
            the action off the frame. The fade covers the row's
            end padding plus the last cell's (3rem together), so it only shows
            over a fact when the row actually overflows. */}
        <dl className="flex min-w-0 flex-col divide-y divide-light-border sm:flex-row sm:items-baseline sm:divide-x sm:divide-y-0 sm:overflow-x-auto sm:pr-6 sm:[mask-image:linear-gradient(to_right,#000_calc(100%-3rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shown.map((row) => (
            <div
              key={row.label}
              className={cn(
                "flex items-baseline justify-between gap-6 py-3 first:pt-0 sm:block sm:shrink-0 sm:px-6 sm:py-0 sm:first:pl-0",
                // `!` because the first cell otherwise zeroes its left
                // padding to sit flush with the gutter, which would sit the
                // mark on top of its own label. The inset clears the square
                // mark plus a gap.
                row.media ? "relative !pl-[3.5rem]" : null,
              )}
            >
              <dt className="font-mono text-label uppercase track-label text-light-muted">
                {/* The mark sits inside the <dt> (a <dl> group may hold only
                    <dt>/<dd>); it is still positioned against the row. */}
                {row.media ? (
                  // `inset-y-1`, not `inset-y-0`. Stretching to the cell's full
                  // height matches the two LINE BOXES, and a line box carries
                  // leading above and below the glyphs it holds, so the mark
                  // ended up visibly taller than the text beside it. Trimming
                  // 4px off each end lands its edges on the cap height of the
                  // label and the baseline of the value, which is where the eye
                  // expects them.
                  <span className="absolute inset-y-1 left-0 aspect-square">
                    {row.media}
                  </span>
                ) : null}
                {row.label}
              </dt>
              {/* Capped so a long value takes two even lines in its cell
                  rather than the row's whole width. */}
              <dd className="text-right font-display font-medium sm:mt-1.5 sm:max-w-[12rem] sm:text-left sm:text-balance">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {children}
      </div>
    </Section>
  );
}
