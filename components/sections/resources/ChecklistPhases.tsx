"use client";

import { useEffect, useState } from "react";

import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { ChecklistResource } from "@/content/resources/types";
import { cn } from "@/lib/utils";
import { phaseAnchor } from "./anchors";

type Copy = { phase: string; print: string; clear: string; saved: string; sourcePrefix: string };


/**
 * A checklist's phases with tickable rows (resources hub brief, 23 Nov 2026).
 *
 * The ticks are a convenience, nothing more: the server renders every phase
 * and item unticked, the page reads in full with JavaScript off, and the
 * ticks are saved in this browser only. Every localStorage read and write is
 * in try/catch, so a blocked or full storage just means ticks don't persist.
 * "Print this checklist" prints a fresh copy: the print stylesheet draws
 * every box empty (.print-checklist .print-box in globals.css).
 */
export function ChecklistPhases({
  slug,
  phases,
  copy,
}: {
  slug: string;
  phases: ChecklistResource["phases"];
  copy: Copy;
}) {
  const key = `zd-checklist-${slug}`;
  const [ticked, setTicked] = useState<Record<string, boolean>>({});

  // After hydration, so the server HTML (all unticked) and the first client
  // render match.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved) setTicked(JSON.parse(saved) as Record<string, boolean>);
    } catch {
      // Storage blocked or unreadable: start unticked.
    }
  }, [key]);

  const save = (next: Record<string, boolean>) => {
    setTicked(next);
    try {
      if (Object.values(next).some(Boolean)) window.localStorage.setItem(key, JSON.stringify(next));
      else window.localStorage.removeItem(key);
    } catch {
      // Not saved; the ticks still hold for this visit.
    }
  };

  const anyTicked = Object.values(ticked).some(Boolean);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-[6px] border border-light-border px-4 py-2 text-body font-medium text-light-text transition hover:bg-light-surface"
        >
          <PrintIcon />
          {copy.print}
        </button>
        <span className="flex items-center gap-4 text-[0.8125rem] text-light-muted">
          {anyTicked ? (
            <>
              <span>{copy.saved}</span>
              <button
                type="button"
                onClick={() => save({})}
                className="font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
              >
                {copy.clear}
              </button>
            </>
          ) : null}
        </span>
      </div>

      <ol className="mt-8 space-y-14 md:space-y-16">
        {phases.map((phase, p) => (
          <li key={phase.id} id={phaseAnchor(phase.id)} className="scroll-mt-[calc(6rem+var(--announce-h))]">
            <section aria-labelledby={`${phaseAnchor(phase.id)}-title`}>
              <p className="font-mono text-label uppercase track-label text-light-muted">
                {copy.phase} {String(p + 1).padStart(2, "0")}
                <span aria-hidden className="mx-2">
                  ·
                </span>
                {phase.when}
              </p>
              <h2
                id={`${phaseAnchor(phase.id)}-title`}
                className="mt-3 font-display text-h3 font-medium leading-snug tracking-tight text-balance"
              >
                {phase.title}
              </h2>
              <ul className="mt-5 border-t border-light-border">
                {phase.items.map((item, i) => {
                  const id = `${phase.id}-${i}`;
                  const on = Boolean(ticked[id]);
                  return (
                    <li key={item.title} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4 border-b border-light-border py-5">
                      <input
                        id={`check-${id}`}
                        type="checkbox"
                        checked={on}
                        onChange={() => save({ ...ticked, [id]: !on })}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`check-${id}`}
                        aria-hidden
                        className={cn(
                          "print-box mt-0.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-[4px] border transition peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                          on ? "border-accent bg-accent text-accent-ink" : "border-light-muted/60 bg-light-bg text-transparent",
                        )}
                      >
                        <FeatureIcon name="check" className="h-3.5 w-3.5" />
                      </label>
                      <div className="min-w-0">
                        <label
                          htmlFor={`check-${id}`}
                          className={cn(
                            "block cursor-pointer font-display text-body-lg font-medium leading-snug transition",
                            on ? "text-light-muted line-through decoration-light-muted/60" : "text-light-text",
                          )}
                        >
                          {item.title}
                        </label>
                        <p className="mt-1.5 text-body leading-relaxed text-light-muted">{item.body}</p>
                        {item.source ? (
                          <p className="mt-2 text-[0.8125rem] text-light-muted">
                            {copy.sourcePrefix}{" "}
                            <a
                              href={item.source.href}
                              target="_blank"
                              rel="noopener nofollow"
                              className="text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
                            >
                              {item.source.label}
                            </a>
                          </p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PrintIcon() {
  // lucide:printer
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v8H6z" />
    </svg>
  );
}
