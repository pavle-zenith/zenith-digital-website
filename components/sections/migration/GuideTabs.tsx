"use client";

import { useEffect, useRef, useState } from "react";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/sections/service/who-for-scenes/shell";
import { PointList } from "./PointList";
import { cn } from "@/lib/utils";
import type { LongFormBlock } from "@/content/migration-guides";

/**
 * A long-form section rendered as tabs instead of a stack. Used by the
 * migration guides ("mistakes") and the industry pages ("how we build it").
 *
 * WHY THIS EXISTS: variety. A page that presents every section as divided
 * prose reads as one long undifferentiated document, and a small closed set
 * of choices or stages reads better picked between than scrolled through.
 *
 * The tab register is the site's existing one, lifted from
 * ServicePageIncluded: accent fill on the active tab, hairline outline on the
 * rest, and the panel on the surface tint below.
 *
 * EVERY PANEL IS IN THE HTML. All panels render, stacked in one grid cell; the
 * inactive ones are `invisible` (out of sight and out of the accessibility
 * tree, but still in the markup). Rendering only the active panel meant every
 * other tab's content never reached the server-rendered HTML, so crawlers and
 * answer engines read one tab in five. Stacking also sizes the panel to the
 * tallest tab, so switching never makes the page below jump.
 *
 * `numbered` puts the stage number on each tab and panel, for a sequence.
 * `split` lays the panel out in two columns from lg: the stage and its
 * explanation on the left, the points (for the industry pages, the
 * deliverables) on the right, so a full-width panel isn't half empty.
 *
 * Labels prefer `navLabel` (short, written for exactly this job) and fall back
 * to the block title where a page hasn't authored one.
 *
 * `checklist` replaces the points with bare titles under the lead (the
 * industry pages' "What you get"). `visual` is an animated scene for the
 * item (components/sections/industry/step-scenes). When a panel has one, the
 * split layout changes: the explanation and its list stack on the left and
 * the scene takes the right (owner, 18 Nov 2026). The scene sits in a fixed
 * box, mounts only for the open tab and only once the section has scrolled
 * into view, and remounts each time its tab is opened, so it always plays
 * from the start. The box is the same size on every tab, so switching still
 * never moves the page. Scenes are illustration, so they stay out of the
 * server HTML and the accessibility tree.
 *
 * PHONES. Stacked, five tabs pushed the panel about 400px down the screen, so
 * below sm the tabs become one sideways-scrolling rail (the case-study filter
 * pills' pattern, bleeding to the screen edge), and a tapped tab scrolls
 * itself fully into view.
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
  numbered = false,
  split = false,
  stepLabel = "Step",
}: {
  id: string;
  heading: string;
  intro?: string;
  items: (LongFormBlock & { checklist?: string[]; visual?: React.ReactNode })[];
  numbered?: boolean;
  split?: boolean;
  /** The word before the number on a numbered panel ("Step 01"). */
  stepLabel?: string;
}) {
  const [active, setActive] = useState(0);
  // Scenes wait until the section is on screen, so the first one isn't spent
  // playing to nobody while the reader is still at the top of the page.
  const [seen, setSeen] = useState(false);
  const panelsRef = useRef<HTMLDivElement>(null);
  const hasVisuals = items.some((item) => item.visual);

  useEffect(() => {
    if (!hasVisuals) return;
    const el = panelsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasVisuals]);

  if (items.length === 0) return null;

  const current = Math.min(active, items.length - 1);
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24" id={id}>
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {heading}
        </h2>
        {intro ? (
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
            {intro}
          </p>
        ) : null}
      </div>

      <div
        role="tablist"
        aria-label={heading}
        className={cn(
          "mt-10 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] max-sm:mx-[calc(-1*clamp(20px,4vw,64px))] max-sm:px-[clamp(20px,4vw,64px)] sm:grid sm:gap-4 sm:overflow-visible sm:pb-0 md:mt-12 [&::-webkit-scrollbar]:hidden",
          TAB_COLS[items.length] ?? "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === current}
            aria-controls={`${id}-panel-${i}`}
            onClick={(e) => {
              setActive(i);
              e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
            }}
            className={cn(
              "shrink-0 rounded-[6px] border px-6 py-4 text-center font-display text-body-lg font-medium leading-snug whitespace-nowrap transition sm:whitespace-normal",
              i === current
                ? "border-accent bg-accent text-accent-ink"
                : "border-light-border text-light-text hover:bg-light-surface",
            )}
          >
            {numbered ? (
              <span
                className={cn(
                  "mb-1 block font-mono text-label font-normal uppercase track-label",
                  i === current ? "text-accent-ink/70" : "text-light-muted",
                )}
              >
                {num(i)}
              </span>
            ) : null}
            {item.navLabel ?? item.title}
          </button>
        ))}
      </div>

      <div
        ref={panelsRef}
        className="type-card mt-4 grid rounded-[8px] border border-light-border bg-light-surface"
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            role="tabpanel"
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
            className={cn(
              "col-start-1 row-start-1 p-5 sm:p-8 md:p-10",
              i === current ? "visible" : "invisible",
              split &&
                "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16",
            )}
          >
            <div className="max-w-[68ch]">
              {numbered ? (
                <p className="font-mono text-label uppercase track-label text-light-muted">
                  {`${stepLabel} ${num(i)}`}
                </p>
              ) : null}
              <h3
                className={cn(
                  "font-display text-h3 font-medium leading-snug tracking-tight text-balance",
                  numbered && "mt-3",
                )}
              >
                {item.title}
              </h3>
              <p className="mt-4 text-body leading-relaxed text-light-muted">
                {item.body}
              </p>

              {!split && item.points?.length ? (
                <>
                  {item.lead ? (
                    <p className="mt-6 text-body text-light-muted">
                      {item.lead}
                    </p>
                  ) : null}
                  <PointList points={item.points} tone="light" />
                </>
              ) : null}

              {/* With a scene on the right, the list moves under the
                  explanation. */}
              {split && hasVisuals ? <PanelList item={item} /> : null}

              {item.cta ? (
                <div className="mt-8 rounded-card border border-light-border bg-light-bg p-6">
                  <p className="font-display text-body-lg font-medium">
                    {item.cta.heading}
                  </p>
                  <p className="mt-2 text-body leading-relaxed text-light-muted">
                    {item.cta.paragraph}
                  </p>
                  <div className="mt-5">
                    <Button cta={item.cta.cta} tone="light" />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Split layout, right-hand column: the scene when the page has
                them (a fixed box on every tab, so every panel stacks to the
                same height), otherwise the list under a rule on phones and
                beside the explanation from lg. */}
            {split && hasVisuals ? (
              <div
                className="mt-8 h-[282px] w-full max-w-md lg:mt-0 lg:justify-self-end"
                aria-hidden
              >
                {seen && i === current && item.visual ? (
                  <div key={`${id}-visual-${i}`}>{item.visual}</div>
                ) : null}
              </div>
            ) : split ? (
              <div className="mt-8 border-t border-light-border pt-8 lg:mt-0 lg:border-t-0 lg:pt-0">
                <PanelList item={item} first />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

/**
 * A panel's list in the split layout: the lead as a mono label, then the
 * checklist (bare titles with a check) or the label-and-body points.
 * `first` drops the top margin where the list opens its own column.
 */
function PanelList({
  item,
  first = false,
}: {
  item: LongFormBlock & { checklist?: string[] };
  first?: boolean;
}) {
  if (!item.checklist?.length && !item.points?.length) return null;
  return (
    <div className={first ? undefined : "mt-8"}>
      {item.lead ? (
        <p className="font-mono text-label uppercase track-label text-light-muted">
          {item.lead}
        </p>
      ) : null}
      {item.checklist?.length ? (
        <ul className="mt-4 flex flex-col gap-3">
          {item.checklist.map((entry) => (
            <li
              key={entry}
              className="flex items-center gap-3 text-body font-medium text-light-text"
            >
              <Check className="h-4 w-4 text-accent" />
              {entry}
            </li>
          ))}
        </ul>
      ) : item.points?.length ? (
        <PointList points={item.points} tone="light" />
      ) : null}
    </div>
  );
}
