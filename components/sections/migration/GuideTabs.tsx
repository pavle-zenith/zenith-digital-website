"use client";

import { useState } from "react";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PointList } from "./PointList";
import { cn } from "@/lib/utils";
import type { LongFormBlock } from "@/content/migration-guides";

/**
 * A long-form section rendered as tabs instead of a stack.
 *
 * WHY THIS EXISTS: variety. A guide that presents every section as divided
 * prose reads as one long undifferentiated document, and this block is a small
 * closed set of choices rather than a sequence, so a reader is picking between
 * them rather than reading through them.
 *
 * The tab register is the site's existing one, lifted from
 * ServicePageIncluded: accent fill on the active tab, hairline outline on the
 * rest, and the panel on the surface tint below.
 *
 * Labels prefer `navLabel` (short, written for exactly this job) and fall back
 * to the block title where a guide hasn't authored one.
 */

/** Static column classes; Tailwind can't see a computed one. */
const TAB_COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
  6: "sm:grid-cols-3 lg:grid-cols-6",
};

export function GuideTabs({
  id,
  heading,
  intro,
  items,
}: {
  id: string;
  heading: string;
  intro: string;
  items: LongFormBlock[];
}) {
  const [active, setActive] = useState(0);
  if (items.length === 0) return null;

  const current = items[Math.min(active, items.length - 1)];

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24" id={id}>
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {intro}
        </p>
      </div>

      <div
        role="tablist"
        aria-label={heading}
        className={cn(
          "mt-10 grid gap-4 md:mt-12",
          TAB_COLS[items.length] ?? "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-[6px] border px-6 py-4 text-center font-display text-body-lg font-medium leading-snug transition",
              i === active
                ? "border-accent bg-accent text-accent-ink"
                : "border-light-border text-light-text hover:bg-light-surface",
            )}
          >
            {item.navLabel ?? item.title}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-${Math.min(active, items.length - 1)}`}
        aria-labelledby={`${id}-tab-${Math.min(active, items.length - 1)}`}
        className="mt-4 rounded-[8px] border border-light-border bg-light-surface p-8 md:p-10"
      >
        <div className="max-w-[68ch]">
          <h3 className="font-display text-h3 font-medium leading-snug tracking-tight text-balance">
            {current.title}
          </h3>
          <p className="mt-4 text-body leading-relaxed text-light-muted">
            {current.body}
          </p>

          {current.points?.length ? (
            <>
              {current.lead ? (
                <p className="mt-6 text-body text-light-muted">
                  {current.lead}
                </p>
              ) : null}
              <PointList points={current.points} tone="light" />
            </>
          ) : null}

          {current.cta ? (
            <div className="mt-8 rounded-card border border-light-border bg-light-bg p-6">
              <p className="font-display text-body-lg font-medium">
                {current.cta.heading}
              </p>
              <p className="mt-2 text-body leading-relaxed text-light-muted">
                {current.cta.paragraph}
              </p>
              <div className="mt-5">
                <Button cta={current.cta.cta} tone="light" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
