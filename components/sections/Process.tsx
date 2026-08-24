"use client";

import Link from "next/link";
import { useAutoCycle } from "@/lib/useAutoCycle";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { processSection } from "@/content/home";

const STEP_MS = 4000;

// Curve geometry in a 1000x420 viewBox. One smooth constant convex curve (no
// per-step fluctuations, Lightdash-style): low at the far left, highest at the
// far right (Launch). Each step owns a full fifth of the width; the active
// step's whole column is highlighted.
const VIEW_W = 1000;
const VIEW_H = 420;
const BASE_Y = 400; // curve start (bottom-left)
const TOP_Y = 24; // curve end (top-right)

/** The curve: slow start, steep finish. t in [0,1] -> y in SVG coords. */
function curveY(t: number) {
  return BASE_Y - (BASE_Y - TOP_Y) * Math.pow(t, 2.1);
}

/** Dense polyline samples of the curve between two x positions. */
function samples(x0: number, x1: number) {
  const n = Math.max(2, Math.round(((x1 - x0) / VIEW_W) * 120));
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    pts.push(`${x.toFixed(1)} ${curveY(x / VIEW_W).toFixed(1)}`);
  }
  return pts;
}

const fullCurve = `M ${samples(0, VIEW_W).join(" L ")}`;
const fullFill = `M ${samples(0, VIEW_W).join(" L ")} L ${VIEW_W} ${VIEW_H} L 0 ${VIEW_H} Z`;

export function Process() {
  const { active, select: setActive, setPaused } = useAutoCycle(
    processSection.steps.length,
    STEP_MS,
  );

  // Highlight everything up to (and including) the active step's column —
  // progress accumulates. The clip on the highlight layer animates the sweep.
  const hiddenRight = 100 - ((active + 1) / processSection.steps.length) * 100;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {processSection.heading}
        </h2>
        <Link
          href={processSection.cta.href}
          className="btn-animated group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-[6px] px-6 py-3 sm:w-auto text-body font-medium text-accent-ink transition"
        >
          {processSection.cta.label}{" "}
          <span aria-hidden className="btn-arrow">
            &rarr;
          </span>
        </Link>
      </div>

      {/* Curve + grid. Hover pause lives here, not on the step buttons: the
          text that mutates is the overlay below, so pausing only when the
          buttons are hovered meant the copy still changed under the reader. */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Step text overlays, top-left. EVERY step is in the markup and the
            inactive ones are hidden with CSS, rather than mounting one at a
            time: previously four of the five headings and all their bullets
            never reached the server-rendered HTML, so the answer engines this
            site is explicitly built for could read one fifth of the process.
            The panels stack in the same grid cell so they occupy one footprint. */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 grid max-w-sm">
          {processSection.steps.map((s, i) => (
            <div
              key={s.label}
              // Same cell for every panel, so the block is as tall as its
              // tallest step and the curve never shifts as steps change.
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none",
                i === active ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={i !== active}
            >
              <p className="font-mono text-label uppercase track-label text-light-muted">
                {s.step} · {s.label}
              </p>
              <h3 className="mt-3 font-display text-h3 font-medium leading-tight text-light-text text-balance">
                {s.heading}
              </h3>
              <ul className="mt-5 flex flex-col gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 text-body text-light-muted"
                  >
                    <span className="h-2 w-2 shrink-0 bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="relative h-[440px] w-full">
          {/* Vertical dotted grid segments */}
          <div className="absolute inset-0 grid grid-cols-5">
            {processSection.steps.map((_, i) => (
              <div
                key={i}
                className="border-l border-dashed border-light-border first:border-l-0"
              />
            ))}
            <div className="absolute inset-y-0 right-0 border-l border-dashed border-light-border" />
          </div>

          {/* Base: full faint curve */}
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <path
              d={fullCurve}
              fill="none"
              stroke="var(--color-light-border)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Highlight layer: full accent curve + fade-to-white fill, revealed by
              an animated clip that sweeps to the end of the active step's column. */}
          <div
            className="absolute inset-0 transition-[clip-path] duration-700 ease-out motion-reduce:transition-none"
            style={{ clipPath: `inset(0 ${hiddenRight}% 0 0)` }}
            aria-hidden
          >
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <defs>
                {/* Fade from the curve down to white */}
                <linearGradient id="process-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-accent)"
                    stopOpacity="0.16"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-accent)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <path d={fullFill} fill="url(#process-fade)" />
              <path
                d={fullCurve}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        {/* Step labels along the bottom — click a step to activate it. Steps up
            to the active one stay lit, echoing the curve's progress. */}
        <div className="grid grid-cols-5">
          {processSection.steps.map((s, i) => {
            const lit = i <= active;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className="group min-w-0 border-t-2 pt-4 text-left transition-colors duration-500"
                style={{
                  borderColor: lit ? "var(--color-accent)" : "transparent",
                }}
              >
                <span
                  className={cn(
                    "block font-mono text-label uppercase track-label transition-colors duration-500",
                    lit ? "text-accent" : "text-light-muted",
                  )}
                >
                  {s.step}
                </span>
                {/* Names don't fit five-up at phone widths; the overlay already
                    announces the active step there. */}
                <span
                  className={cn(
                    "mt-1.5 hidden font-display text-body-lg font-medium transition-colors duration-500 sm:block",
                    lit
                      ? "text-light-text"
                      : "text-light-muted group-hover:text-light-text",
                  )}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
