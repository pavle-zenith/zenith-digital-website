"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";

import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { cn, servesRaw } from "@/lib/utils";

export type TransformationView = {
  slug: string;
  client: string;
  /** Dark-ink wordmark for the light panel; the name is set without one. */
  logo?: string;
  domain?: string;
  labels: { before: string; after: string };
  before: string;
  after: string;
  summary: string;
  points: string[];
  /** The case study, when it has a detail page. */
  href?: string;
};

/**
 * The client island behind Transformation.
 *
 * LAYOUT (owner, 25 Nov 2026). A hairline band, built like the testimonials
 * band: the client names as one full-width row of tabs split by vertical
 * rules (the active one on the surface tint with an accent bar under it),
 * then the panel. From lg up the panel is two cells split by a rule: the
 * project on the left (who it was for, what changed, the case study link)
 * and the browser window on the right, on the surface tint. Below lg, and in
 * a compact host column, the window comes first and the project under it.
 * One entry has no tab row.
 *
 * The band bleeds to the frame rails from md up, like every other hairline
 * band; on a phone it keeps the site gutter and the tab row scrolls sideways.
 * In a compact host column it can't bleed, so it closes into a bordered card.
 *
 * Every entry is in the server HTML, so the summaries and points are indexed
 * and readable without JS; inactive panels are `hidden`, and their images are
 * lazy, so they load only once a tab opens them. Switching tabs remounts the
 * sliders (a fresh key), which puts the handle back at 50%. The window holds
 * its aspect ratio whatever it shows.
 *
 * Tabs follow the ARIA tabs pattern: one tab stop; Left/Right and Home/End
 * move between tabs and open them; Tab goes on into the panel.
 */
export function TransformationTabs({
  views,
  compact,
  ruled,
}: {
  views: TransformationView[];
  compact: boolean;
  ruled: boolean;
}) {
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0);
  const tablist = useRef<HTMLDivElement>(null);
  const id = useId();
  const tabbed = views.length > 1;

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    setRound((r) => r + 1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = views.length - 1;
    const next =
      e.key === "ArrowRight"
        ? active === last ? 0 : active + 1
        : e.key === "ArrowLeft"
          ? active === 0 ? last : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tablist.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  // Image widths per layout, for the optimiser: the right-hand cell, or a
  // compact host column.
  const sizes = compact
    ? "(min-width: 1440px) 640px, (min-width: 1024px) 50vw, 100vw"
    : "(min-width: 1440px) 760px, (min-width: 1024px) 56vw, 100vw";

  return (
    <div
      className={cn(
        compact
          ? "type-card overflow-hidden rounded-card border border-light-border"
          : cn("frame-bleed-md", ruled && "border-t border-light-border"),
      )}
    >
      {tabbed ? (
        <div
          ref={tablist}
          role="tablist"
          aria-label="Projects"
          onKeyDown={onKeyDown}
          // A phone scrolls the row as a rail with a fixed tab width (five
          // names in 335px would wrap each to four lines), narrow enough that
          // the third tab peeks in to show the row goes on; from md up it's
          // an even row of equal cells, one per client.
          className="flex snap-x snap-mandatory overflow-x-auto border-b border-light-border [scrollbar-width:none] md:grid md:overflow-visible [&::-webkit-scrollbar]:hidden"
          style={{ gridTemplateColumns: `repeat(${views.length}, minmax(0, 1fr))` }}
        >
          {views.map((v, i) => {
            const on = i === active;
            return (
              <button
                key={v.slug}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${id}-panel-${i}`}
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  "relative flex w-36 shrink-0 snap-start items-center justify-center border-l border-light-border px-3 py-5 text-center font-display text-body font-medium leading-snug text-balance transition first:border-l-0 focus-visible:-outline-offset-2 md:w-auto md:min-w-0 md:py-6",
                  on
                    ? "bg-light-surface text-light-text"
                    : "bg-light-bg text-light-muted hover:bg-light-surface/60 hover:text-light-text",
                )}
              >
                {v.client}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 transition-colors",
                    on ? "bg-accent" : "bg-transparent",
                  )}
                />
              </button>
            );
          })}
        </div>
      ) : null}

      {views.map((v, i) => (
        <div
          key={v.slug}
          id={`${id}-panel-${i}`}
          hidden={i !== active}
          {...(tabbed ? { role: "tabpanel", "aria-labelledby": `${id}-tab-${i}` } : {})}
          className={cn(
            "grid",
            !compact && "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
          )}
        >
          <Media view={v} sizes={sizes} round={round} compact={compact} />
          <Project view={v} compact={compact} />
        </div>
      ))}
    </div>
  );
}

/**
 * The right-hand cell: the browser window on the surface tint. First in the
 * DOM, so a stacked panel shows the work before the words; from lg up it's
 * placed in the second column.
 */
function Media({
  view: v,
  sizes,
  round,
  compact,
}: {
  view: TransformationView;
  sizes: string;
  round: number;
  compact: boolean;
}) {
  return (
    <div
      className={cn(
        "@container flex min-w-0 items-center",
        compact
          ? "bg-light-surface p-4 sm:p-6"
          : // A phone keeps the window at the full gutter width, on white;
            // the tint arrives with the bleed. From lg the outer padding
            // matches the frame gutter, the inner the gap to the rule.
            "py-6 md:bg-light-surface md:px-[clamp(20px,4vw,64px)] md:py-10 lg:col-start-2 lg:row-start-1 lg:border-l lg:border-light-border lg:py-12 lg:pl-10 xl:pl-12",
      )}
    >
      <Window view={v} sizes={sizes} round={round} />
    </div>
  );
}

/**
 * The browser window (BrowserFrame, shared with the /about timeline), its
 * address pill showing the client's name when there's no public domain, then
 * the slider at 16:10 (4:3 in a phone-width cell). The images are 4:3 mockups, so 16:10 is
 * cropped from the centre: it trims their background and keeps the site
 * window inside whole.
 */
function Window({
  view: v,
  sizes,
  round,
}: {
  view: TransformationView;
  sizes: string;
  round: number;
}) {
  const what = `${v.labels.before.toLowerCase()} and ${v.labels.after.toLowerCase()}`;
  return (
    <BrowserFrame
      address={v.domain ?? v.client}
      role="group"
      aria-label={`${v.client} website, ${what}`}
    >
      <BeforeAfterSlider
        key={`${v.slug}-${round}`}
        title={v.client}
        before={v.before}
        after={v.after}
        caption={false}
        labels={v.labels}
        beforeAlt={`${v.client} website, ${v.labels.before.toLowerCase()}`}
        afterAlt={`${v.client} website, ${v.labels.after.toLowerCase()}`}
        frameClassName="aspect-[4/3] bg-light-surface @xl:aspect-[16/10]"
        imageClassName="object-cover"
        sizes={sizes}
      />
    </BrowserFrame>
  );
}

/**
 * The left-hand cell: who it was for (the wordmark, or the name in the
 * display face), the summary, the numbered points split by hairlines, and the
 * case study link, held to the bottom so it lines up with the window's edge.
 */
function Project({
  view: v,
  compact,
}: {
  view: TransformationView;
  compact: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col",
        compact
          ? "border-t border-light-border p-5 sm:p-8"
          : "pb-10 pt-2 md:px-[clamp(20px,4vw,64px)] md:py-10 lg:col-start-1 lg:row-start-1 lg:py-12 lg:pr-10 xl:pr-12",
      )}
    >
      <h3 className="flex h-10 items-center">
        {v.logo ? (
          <Image
            src={v.logo}
            unoptimized={servesRaw(v.logo)}
            alt={v.client}
            width={220}
            height={56}
            // The /logos-dark wordmarks carry heavy transparent padding, so
            // they're set taller than a plain h-7 (as on the detail hero).
            className="h-10 w-auto object-contain object-left"
          />
        ) : (
          <span className="font-display text-[1.5rem] font-medium leading-none tracking-tight">
            {v.client}
          </span>
        )}
      </h3>
      <p className="mt-4 text-body-lg leading-snug text-light-muted">{v.summary}</p>

      <ol className="mt-8 divide-y divide-light-border border-t border-light-border">
        {v.points.map((point, i) => (
          <li key={point} className="flex items-start gap-4 py-4">
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-surface font-mono text-label text-light-text"
            >
              {i + 1}
            </span>
            {/* pt-0.5 sets the first line level with the chip. */}
            <p className="pt-0.5 text-body leading-relaxed text-light-text">{point}</p>
          </li>
        ))}
      </ol>

      {v.href ? (
        <div className="mt-auto pt-6">
          <Link
            href={v.href}
            className="group inline-flex items-center gap-1.5 font-display text-body font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
          >
            Read the case study<span className="sr-only">: {v.client}</span>
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
