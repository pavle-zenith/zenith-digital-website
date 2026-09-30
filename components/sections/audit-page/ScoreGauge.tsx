import { cn } from "@/lib/utils";
import { BAND_FILL, BAND_LABEL, BAND_STROKE, type Tally } from "@/content/audits/score";

/**
 * The overall score as a semicircle, for the dark hero.
 *
 * The arc uses `pathLength="100"`, so the dash offset is simply 100 minus the
 * score and no one has to know the circumference. It draws in once on load
 * (`gauge-draw` in globals.css) and the global reduced-motion rule collapses
 * that to its end state.
 *
 * The SVG is decoration: it is aria-hidden, and a visually hidden sentence
 * carries every number it shows.
 *
 * WHY THE BAND WORD IS NEAR-WHITE HERE. On light grounds status text uses the
 * -ink tokens, but those are tuned for white and fail on navy (negative-ink
 * measures about 3:1 against #0a1020). So on this dark panel the word stays in
 * body ink and the colour rides on a dot beside it, a graphic, which keeps the
 * brief's rule (fill tokens never set text) and still clears AA.
 */
export function ScoreGauge({
  tally,
  heading,
  method,
}: {
  tally: Tally;
  heading: string;
  method: string;
}) {
  const { score, band, passed, partial, failed, total } = tally;

  return (
    <div className="rounded-card border border-border bg-surface p-6 sm:p-8">
      <h2 className="font-display text-body-lg font-medium text-text">{heading}</h2>

      <p className="sr-only">
        Your site scores {score} out of 100, which is {BAND_LABEL[band].toLowerCase()}.{" "}
        {passed} of {total} checks passed, {partial} partly, and {failed} need fixing.
      </p>

      <div aria-hidden className="relative mx-auto mt-6 w-full max-w-[280px]">
        <svg viewBox="0 0 220 122" className="w-full overflow-visible">
          <path
            d="M 14 110 A 96 96 0 0 1 206 110"
            fill="none"
            strokeWidth="14"
            strokeLinecap="round"
            pathLength={100}
            className="stroke-white/10"
          />
          <path
            d="M 14 110 A 96 96 0 0 1 206 110"
            fill="none"
            strokeWidth="14"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            className={cn(BAND_STROKE[band], "[animation:gauge-draw_1.1s_cubic-bezier(.22,1,.36,1)_both]")}
            style={{ strokeDashoffset: 100 - score }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-center gap-1">
          <span className="font-display text-display font-medium leading-none tracking-tight text-text">
            {score}
          </span>
          <span className="font-display text-body-lg text-text-muted">/100</span>
        </div>
      </div>

      <div aria-hidden className="mt-5 text-center">
        <p className="inline-flex items-center gap-2 font-display text-h3 font-medium text-text">
          <span className={cn("h-2.5 w-2.5 rounded-full", BAND_FILL[band])} />
          {BAND_LABEL[band]}
        </p>
        <p className="mt-2 font-mono text-label uppercase track-label text-text-muted">
          {passed} passed &middot; {partial} partly &middot; {failed} to fix
        </p>
      </div>

      <p className="mt-6 border-t border-border pt-5 text-label tracking-normal text-text-muted">
        {method}
      </p>
    </div>
  );
}
