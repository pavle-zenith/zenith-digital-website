"use client";

import { useState } from "react";

import { Section } from "@/components/ui/Section";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";
import { included } from "@/content/home";

/**
 * "Everything included" — tabbed feature grid. Centered heading + intro, a row
 * of three equal tabs (active = accent fill, inactive = hairline outline), and
 * three boxes for the active tab: icon in a navy square, title, description.
 * Flat surfaces and hairlines, per the section system.
 */
export function Included() {
  const [active, setActive] = useState(0);
  const tab = included.tabs[active];

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      {/* Header */}
      <div className="mx-auto mb-8 md:mb-12 max-w-2xl text-center">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {included.heading}
        </h2>
        <p className="mt-4 text-body-lg md:mt-5 font-medium text-light-muted">
          {included.intro}
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {included.tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "rounded-[6px] border px-6 py-4 text-center font-display text-body-lg font-medium transition",
              i === active
                ? "border-accent bg-accent text-accent-ink"
                : "border-light-border text-light-text hover:bg-light-surface",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Boxes for the active tab */}
      <div className="grid gap-4 md:grid-cols-3">
        {tab.boxes.map((box) => (
          <div
            key={box.title}
            className="flex flex-col rounded-[8px] border border-light-border bg-light-surface p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-accent text-accent-ink">
              <FeatureIcon name={box.icon} />
            </span>
            <h3 className="mt-10 font-display text-body-lg font-medium">
              {box.title}
            </h3>
            <p className="mt-2 text-body leading-snug text-light-muted">
              {box.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
