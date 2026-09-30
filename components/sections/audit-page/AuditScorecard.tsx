import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { BAND_FILL, BAND_LABEL, BAND_PILL, type Tally } from "@/content/audits/score";

export type ScorecardRow = { id: string; name: string; tally: Tally };

/**
 * One bar per segment, in content order: the stand-in for Flow Ninja's radar
 * chart. A radar is hard to read and harder on a phone; a column of bars reads
 * in one pass and each row is a link to the segment it summarises.
 *
 * Content order, never sorted by score, so the scorecard and the page below it
 * list the segments in the same sequence.
 *
 * The bar is decoration: its number and band word sit beside it as text, so the
 * fill colour (a fill token, which is for graphics only) is never the signal.
 */
export function AuditScorecard({ rows }: { rows: ScorecardRow[] }) {
  return (
    <Section tone="light" frameClassName="!py-12 md:!py-16" divide={false}>
      <ol role="list" className="frame-bleed-md grid gap-px border-y border-light-border bg-light-border">
        {rows.map(({ id, name, tally }) => (
          <li
            key={id}
            className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 bg-light-bg px-0 py-5 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_10rem] md:gap-x-8 md:px-[clamp(20px,4vw,64px)]"
          >
            <a
              href={`#${id}`}
              className="font-display text-body-lg font-medium text-light-text underline-offset-4 hover:underline md:order-1"
            >
              {name}
            </a>
            <p className="flex items-center justify-end gap-2 md:order-3">
              <span className="font-display text-h3 font-medium leading-none tabular-nums text-light-text">
                {tally.score}
              </span>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border bg-light-bg px-2.5 py-0.5 font-mono text-label uppercase track-label",
                  BAND_PILL[tally.band],
                )}
              >
                {BAND_LABEL[tally.band]}
              </span>
            </p>
            <div
              aria-hidden
              className="col-span-2 h-2 overflow-hidden rounded-[2px] bg-light-border md:order-2 md:col-span-1"
            >
              <div
                className={cn("h-full rounded-[2px]", BAND_FILL[tally.band])}
                style={{ width: `${tally.score}%` }}
              />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
