"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";

import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";

export type Driver = {
  icon: string;
  title: string;
  body: string;
  links: { label: string; href: string }[];
};

/**
 * "What drives the cost" tabs (owner, 20 Nov 2026): four small vertical
 * tabs, the chosen one's line and links under them. The looping strip of
 * client sites beside them is CSS only, in CostCalculatorPage.
 *
 * Every panel is in the server HTML (inactive ones `hidden`), so the copy
 * and links stay crawlable. Tabs follow the ARIA pattern: one tab stop,
 * arrow keys move, Home and End jump to the ends.
 */
export function DriverTabs({ items, label }: { items: Driver[]; label: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // Unique per instance, so two sets of tabs on one page never share ids.
  const uid = useId();

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
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
    <div>
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label={label}
        className="grid gap-1 rounded-card border border-light-border bg-light-bg p-1"
      >
        {items.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 text-left transition-colors",
                on ? "tone-dark bg-accent text-accent-ink" : "text-light-text hover:bg-light-surface",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border",
                  on ? "border-white/20 bg-white/5" : "border-light-border bg-light-surface",
                )}
              >
                <FeatureIcon name={item.icon} className="h-4 w-4" />
              </span>
              <span className="font-display text-body font-medium leading-tight">{item.title}</span>
            </button>
          );
        })}
      </div>

      {items.map((item, i) => (
        <div
          key={item.title}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={i !== active}
          className="mt-6 px-1"
        >
          <p className="text-body leading-relaxed text-light-muted">{item.body}</p>
          {item.links.length ? (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {item.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-1.5 text-body font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
              >
                {link.label}
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
