"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { PricePackage } from "@/content/pricing";
import { CARD_LIFT, CardWash } from "@/components/sections/pricing/cardStyles";
import { cn } from "@/lib/utils";

/**
 * The website packages as a vertical tab list (owner, 20 Nov 2026: "easily
 * scannable and tabbed"). Left: every package on one line, name and price,
 * grouped fixed-price and monthly, so the whole range reads in one glance.
 * Right: the selected package in full. Every panel is in the server HTML
 * (inactive ones `hidden`), so search engines and AI answers see all of
 * them; only the selection is client state.
 *
 * Tabs follow the ARIA pattern: one tab stop (roving tabindex), arrow keys
 * move across both groups, Home and End jump to the ends. The panel sticks
 * beside the list from lg.
 */
export function PackageExplorer({
  packages,
  groups,
  defaultKey,
  serviceLinkLabel,
  aside,
}: {
  packages: PricePackage[];
  groups: { key: PricePackage["group"]; label: string }[];
  defaultKey: PricePackage["key"];
  serviceLinkLabel: string;
  /** Under the list (server-rendered): the "not sure which" prompt. */
  aside?: React.ReactNode;
}) {
  const [active, setActive] = useState(defaultKey);
  const tabs = useRef<Partial<Record<string, HTMLButtonElement | null>>>({});
  const order = packages.map((p) => p.key);

  const onKeyDown = (e: React.KeyboardEvent, key: PricePackage["key"]) => {
    const i = order.indexOf(key);
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? order[(i + 1) % order.length]
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? order[(i - 1 + order.length) % order.length]
          : e.key === "Home"
            ? order[0]
            : e.key === "End"
              ? order[order.length - 1]
              : null;
    if (!next) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    // From lg: list top-left, the prompt under it, the panel spanning both
    // rows on the right. On phones the order is list, panel, prompt, so the
    // prompt never splits a package from its details.
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-10">
      {/* The list */}
      <div className="flex flex-col gap-8 lg:col-start-1 lg:row-start-1">
        {groups.map((group) => {
          const items = packages.filter((p) => p.group === group.key);
          if (!items.length) return null;
          return (
            <div key={group.key}>
              <p
                id={`pricing-group-${group.key}`}
                className="mb-3 font-mono text-label uppercase track-label text-light-muted"
              >
                {group.label}
              </p>
              <div
                role="tablist"
                aria-labelledby={`pricing-group-${group.key}`}
                aria-orientation="vertical"
                className="overflow-hidden rounded-card border border-light-border divide-y divide-light-border"
              >
                {items.map((p) => {
                  const selected = p.key === active;
                  const price = splitFrom(p.price);
                  return (
                    <button
                      key={p.key}
                      ref={(el) => {
                        tabs.current[p.key] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`pricing-tab-${p.key}`}
                      aria-selected={selected}
                      aria-controls={`pricing-panel-${p.key}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(p.key)}
                      onKeyDown={(e) => onKeyDown(e, p.key)}
                      className={cn(
                        "flex w-full items-center gap-4 px-4 py-4 text-left transition-colors sm:px-5",
                        selected
                          ? "tone-dark bg-accent text-accent-ink"
                          : "bg-light-bg text-light-text hover:bg-light-surface",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border",
                          selected
                            ? "border-white/20 bg-white/5"
                            : "border-light-border bg-light-surface",
                        )}
                      >
                        <FeatureIcon name={p.icon} className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-body-lg font-medium leading-tight">
                          {p.name}
                        </span>
                        {p.badge ? (
                          <span
                            className={cn(
                              "mt-1 block text-[0.8125rem]",
                              selected ? "text-accent-ink/70" : "text-light-muted",
                            )}
                          >
                            {p.badge}
                          </span>
                        ) : null}
                      </span>
                      <span className="shrink-0 text-right font-display text-body-lg font-medium tabular-nums">
                        {price.from ? (
                          <span
                            className={cn(
                              "mr-1 text-body font-normal",
                              selected ? "text-accent-ink/70" : "text-light-muted",
                            )}
                          >
                            {price.from.toLowerCase()}
                          </span>
                        ) : null}
                        {price.amount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* The selected package */}
      <div className="lg:sticky lg:top-[calc(6rem+var(--announce-h))] lg:col-start-2 lg:row-span-2 lg:row-start-1">
        {packages.map((p) => {
          const price = splitFrom(p.price);
          return (
            <div
              key={p.key}
              role="tabpanel"
              id={`pricing-panel-${p.key}`}
              aria-labelledby={`pricing-tab-${p.key}`}
              tabIndex={0}
              hidden={p.key !== active}
              className={cn("type-card relative overflow-hidden rounded-card border border-light-border bg-light-bg p-6 md:p-8", CARD_LIFT)}
            >
              <CardWash />
              <div className="relative flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-light-border bg-light-bg/80 px-3 py-1 font-mono text-label uppercase track-label text-light-muted">
                  {p.billing}
                </span>
                {p.badge ? (
                  <span className="rounded-full bg-accent px-3 py-1 font-mono text-label uppercase track-label text-accent-ink">
                    {p.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="relative mt-4 font-display text-h3 font-medium leading-snug tracking-tight">
                {p.name}
              </h3>
              <p className="relative mt-2 max-w-xl text-body leading-relaxed text-light-muted">{p.summary}</p>

              <p className="relative mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                {price.from ? (
                  <span className="text-body-lg font-medium text-light-muted">{price.from}</span>
                ) : null}
                <span className="font-display text-[clamp(2.5rem,4vw,3.25rem)] font-medium leading-none tracking-tight tabular-nums">
                  {price.amount}
                </span>
                <span className="text-body text-light-muted">{p.priceNote}</span>
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-body text-light-text">
                <FeatureIcon name="calendar" className="h-4 w-4 text-light-muted" />
                {p.timeline}
              </p>

              <div className="mt-6">
                <Button cta={p.cta} tone="light" className="sm:!w-full" />
              </div>

              <div className="mt-8 border-t border-light-border pt-6">
                <p className="font-mono text-label uppercase track-label text-light-muted">
                  {p.featuresLabel}
                </p>
                <ul className="mt-3 divide-y divide-light-border">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 py-2.5 text-body text-light-text">
                      <FeatureIcon name="check" className="mt-1 h-4 w-4 shrink-0 text-light-text" />
                      {f}
                    </li>
                  ))}
                </ul>
                {p.href ? (
                  <Link
                    href={p.href}
                    className="group mt-5 inline-flex items-center gap-1.5 text-body font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
                  >
                    {serviceLinkLabel}
                    <span aria-hidden className="btn-arrow">
                      &rarr;
                    </span>
                  </Link>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {aside ? <div className="lg:col-start-1 lg:row-start-2">{aside}</div> : null}
    </div>
  );
}

/** "From €1,250" -> { from: "From", amount: "€1,250" }. */
function splitFrom(price: string) {
  const m = price.match(/^(from)\s+(.+)$/i);
  return m ? { from: m[1], amount: m[2] } : { from: "", amount: price };
}
