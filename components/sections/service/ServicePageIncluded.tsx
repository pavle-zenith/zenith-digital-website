"use client";

import { useState } from "react";

import { Section } from "@/components/ui/Section";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * "What's included" — the homepage "Everything you'd expect" register:
 * centered heading and intro, a row of tabs (active = accent fill, inactive =
 * hairline outline), then the boxes for the open tab with the icon in an
 * accent square. One component register for both, so the two can't drift.
 *
 * Tabs come from each item's `group`, in first-seen order. A page whose items
 * carry no group renders the boxes with no tab row rather than one dead tab.
 */
export function ServicePageIncluded({ data }: { data: ServicePageContent }) {
  const groups = groupItems(data.included.items);
  const [active, setActive] = useState(0);
  const tab = groups[Math.min(active, groups.length - 1)];
  const showTabs = groups.length > 1;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="mx-auto mb-8 max-w-2xl text-center md:mb-12">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.included.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium text-light-muted md:mt-5">
          {data.included.intro}
        </p>
      </div>

      {showTabs ? (
        <div
          className={cn(
            "mb-6 grid gap-4",
            groups.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
          )}
        >
          {groups.map((g, i) => (
            <button
              key={g.label}
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
              {g.label}
            </button>
          ))}
        </div>
      ) : null}

      {/* Boxes for the open tab. Two-item tabs run two across rather than
          leaving a hole in a three-column row. */}
      <div
        className={cn(
          "grid gap-4",
          tab.items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
        )}
      >
        {tab.items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col rounded-[8px] border border-light-border bg-light-surface p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-accent text-accent-ink">
              <FeatureIcon name={item.icon ?? ""} />
            </span>
            <h3 className="mt-10 font-display text-body-lg font-medium">
              {item.title}
            </h3>
            <p className="mt-2 text-body leading-snug text-light-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

type IncludedItem = ServicePageContent["included"]["items"][number];

/** Bucket items by `group`, preserving the order they appear in content. */
function groupItems(items: IncludedItem[]) {
  const groups: { label: string; items: IncludedItem[] }[] = [];
  for (const item of items) {
    const label = item.group ?? "";
    const existing = groups.find((g) => g.label === label);
    if (existing) existing.items.push(item);
    else groups.push({ label, items: [item] });
  }
  return groups;
}
