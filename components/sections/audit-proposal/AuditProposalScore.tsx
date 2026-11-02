import { cn } from "@/lib/utils";
import { BAND_FILL, tally, type Band, type Tally } from "@/content/audits/score";
import type { AuditCheck } from "@/content/audits/types";
import type { AuditProposalPage } from "@/content/proposals/types";
import { DocHeading, DocSection } from "./parts";

type Score = NonNullable<AuditProposalPage["score"]>;

/** Where the bands start, as on the audit pages (content/audits/score.ts). */
const FAIR_FROM = 40;
const GOOD_FROM = 75;

/** -ink text per band, for the stage word on a light ground. */
const BAND_INK: Record<Band, string> = {
  poor: "text-negative-ink",
  fair: "text-warning-ink",
  good: "text-positive-ink",
};

const toChecks = (checks: Score["areas"][number]["checks"]): AuditCheck[] =>
  checks.map((c) => ({ ...c, detail: "" }));

/**
 * The audit score under the offer: one bar split into the three stages
 * (Critical, Needs attention, Pass) with the site's score filled in and
 * marked, then one bar per area of the review.
 *
 * Every number is computed from the checks in the content with the audit
 * pages' own `tally`, never typed, and the method is printed under the bar,
 * so a reader can recount it. The stage word is always printed beside its
 * colour: colour is never the only signal. The bars are drawings of numbers
 * that are already in the text, so they are hidden from screen readers.
 */
export function AuditProposalScore({ score }: { score: Score }) {
  const all = tally(score.areas.flatMap((a) => toChecks(a.checks)));
  const stage = (t: Tally) => score.stages[t.band];

  return (
    <DocSection id={score.id}>
      <DocHeading heading={score.heading} intro={score.intro} />

      <div className="rounded-card border border-light-border bg-light-bg p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <p className="flex items-baseline gap-3">
            <span className="font-mono text-label uppercase track-label text-light-muted">
              {score.todayLabel}
            </span>
            <span className="font-display text-h1 font-medium leading-none tracking-tight tabular-nums">
              {all.score}
            </span>
            <span className="font-display text-body-lg text-light-muted">/100</span>
          </p>
          <p className={cn("inline-flex items-center gap-2 font-display text-h3 font-medium", BAND_INK[all.band])}>
            <span aria-hidden className={cn("h-2.5 w-2.5 rounded-full", BAND_FILL[all.band])} />
            {stage(all)}
          </p>
        </div>

        {/* The stages as three tinted zones, the score filled over them in its
            band's colour, and a tick where it lands. */}
        <div aria-hidden className="relative mt-6">
          <div className="flex h-3 overflow-hidden rounded-[2px]">
            <span className="bg-negative/20" style={{ width: `${FAIR_FROM}%` }} />
            <span className="bg-warning/25" style={{ width: `${GOOD_FROM - FAIR_FROM}%` }} />
            <span className="bg-positive/25" style={{ width: `${100 - GOOD_FROM}%` }} />
          </div>
          <span
            className={cn("absolute inset-y-0 left-0 rounded-l-[2px]", BAND_FILL[all.band])}
            style={{ width: `${all.score}%` }}
          />
          <span
            className="absolute -top-1.5 -bottom-1.5 w-[3px] -translate-x-1/2 rounded-full bg-light-text"
            style={{ left: `${all.score}%` }}
          />
        </div>
        <div aria-hidden className="relative mt-2 h-5 font-mono text-label uppercase track-label">
          <span className="absolute left-0 text-negative-ink">{score.stages.poor}</span>
          <span className="absolute text-warning-ink" style={{ left: `${FAIR_FROM}%` }}>
            {score.stages.fair}
          </span>
          <span className="absolute right-0 text-positive-ink">{score.stages.good}</span>
        </div>

        <p className="mt-6 border-t border-light-border pt-5 text-body text-light-text">
          {score.launchNote}
        </p>
        <p className="mt-2 text-label tracking-normal text-light-muted">
          {score.method(all.total)}
        </p>
      </div>

      <ul role="list" className="mt-8">
        {score.areas.map((area) => {
          const t = tally(toChecks(area.checks));
          return (
            <li key={area.name} className="border-t border-light-border py-4 break-inside-avoid">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-body font-medium text-light-text md:text-body-lg">{area.name}</p>
                <p className="flex shrink-0 items-baseline gap-3">
                  <span className={cn("font-mono text-label uppercase track-label", BAND_INK[t.band])}>
                    {stage(t)}
                  </span>
                  <span className="w-8 text-right font-medium tabular-nums text-light-text">{t.score}</span>
                </p>
              </div>
              <div aria-hidden className="mt-2.5 h-2 overflow-hidden rounded-[2px] bg-light-border">
                <span
                  className={cn("block h-full rounded-[2px]", BAND_FILL[t.band])}
                  style={{ width: `${t.score}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </DocSection>
  );
}
