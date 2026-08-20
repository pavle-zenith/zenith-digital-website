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
 * gutter. On phones it stacks into one hairline-divided column, label left and
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
}: {
  rows: MetaRow[];
  children?: React.ReactNode;
}) {
  const shown = rows.filter((row) => row.value);
  if (shown.length === 0) return null;

  return (
    <Section tone="light" frameClassName="!py-6 md:!py-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <dl className="flex flex-col divide-y divide-light-border sm:flex-row sm:flex-wrap sm:items-baseline sm:divide-x sm:divide-y-0">
          {shown.map((row) => (
            <div
              key={row.label}
              className={cn(
                "flex items-baseline justify-between gap-6 py-3 first:pt-0 sm:block sm:px-8 sm:py-0 sm:first:pl-0",
                // `!` because the first cell otherwise zeroes its left
                // padding to sit flush with the gutter, which would sit the
                // mark on top of its own label. The inset clears the square
                // mark plus a gap.
                row.media ? "relative !pl-[3.5rem]" : null,
              )}
            >
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
              <dt className="font-mono text-label uppercase track-label text-light-muted">
                {row.label}
              </dt>
              <dd className="text-right font-display font-medium sm:mt-1.5 sm:text-left">
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
