"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % processSection.steps.length);
    }, STEP_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const step = processSection.steps[active];
  // Highlight everything up to (and including) the active step's column —
  // progress accumulates. The clip on the highlight layer animates the sweep.
  const hiddenRight = 100 - ((active + 1) / processSection.steps.length) * 100;

  return (
    <Section tone="light" frameClassName="!py-24">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {processSection.heading}
        </h2>
        <Link
          href={processSection.cta.href}
          className="inline-flex shrink-0 items-center gap-2 rounded-[6px] bg-accent px-6 py-3 text-body font-medium text-accent-ink transition hover:bg-accent-hover"
        >
          {processSection.cta.label} <span aria-hidden>&rarr;</span>
        </Link>
      </div>

      {/* Curve + grid */}
      <div className="relative">
        {/* Active step's text overlay, top-left */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 max-w-sm">
          <p className="font-mono text-label uppercase track-label text-light-muted">
            {step.step} · {step.label}
          </p>
          <h3 className="mt-3 font-display text-h3 font-medium leading-tight text-light-text text-balance">
            {step.heading}
          </h3>
          <ul className="mt-5 flex flex-col gap-2">
            {step.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-body text-light-muted">
                <span className="h-2 w-2 shrink-0 bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Chart area */}
        <div className="relative h-[440px] w-full">
          {/* Vertical dotted grid segments */}
          <div className="absolute inset-0 grid grid-cols-5">
            {processSection.steps.map((_, i) => (
              <div key={i} className="border-l border-dashed border-light-border first:border-l-0" />
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
            <path d={fullCurve} fill="none" stroke="var(--color-light-border)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
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
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
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
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="group min-w-0 border-t-2 pt-4 text-left transition-colors duration-500"
                style={{ borderColor: lit ? "var(--color-accent)" : "transparent" }}
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
                    lit ? "text-light-text" : "text-light-muted group-hover:text-light-text",
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
