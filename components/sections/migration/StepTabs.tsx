"use client";

import { useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A guide's steps as numbered tabs (owner, 20 Nov 2026: cleaner, less text):
 * every step listed on the left by number, title and duration, the chosen
 * step's detail on the right. The panels are rendered on the server and
 * passed in, all of them in the HTML (inactive ones `hidden`), so search and
 * answer engines still read every stage. Tabs follow the ARIA pattern: one
 * tab stop, arrow keys move, Home and End jump to the ends.
 */
export function StepTabs({
  label,
  steps,
  panels,
  panelIds,
}: {
  label: string;
  steps: { title: string; duration?: string }[];
  panels: React.ReactNode[];
  /** Kept as each panel's id, so an anchor to a step still resolves. */
  panelIds: string[];
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = steps.length;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % n
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-12">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label={label}
        className="grid gap-1 rounded-card border border-light-border bg-light-bg p-1 lg:sticky lg:top-[calc(9rem+var(--announce-h))]"
      >
        {steps.map((step, i) => {
          const on = i === active;
          return (
            <button
              key={step.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={on}
              aria-controls={panelIds[i]}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "grid w-full grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-3 rounded-[6px] px-3 py-3 text-left transition-colors",
                on ? "tone-dark bg-accent text-accent-ink" : "text-light-text hover:bg-light-surface",
              )}
            >
              <span className={cn("font-mono text-label", on ? "text-accent-ink/70" : "text-light-muted")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-body font-medium leading-snug">{step.title}</span>
              {step.duration ? (
                <span
                  className={cn(
                    "whitespace-nowrap font-mono text-label uppercase track-label",
                    on ? "text-accent-ink/70" : "text-light-muted",
                  )}
                >
                  {step.duration}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div>
        {panels.map((panel, i) => (
          <div
            key={panelIds[i]}
            id={panelIds[i]}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${i}`}
            hidden={i !== active}
            className="scroll-mt-[calc(9rem+var(--announce-h))]"
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
