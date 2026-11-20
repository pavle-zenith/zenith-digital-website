"use client";

import { Children, useRef } from "react";

import { cn } from "@/lib/utils";

/** Track gap in px (gap-6), part of the arrow step. */
const GAP = 24;

/**
 * A snap-scroll track of server-rendered slides with the site's slider
 * arrows (CLAUDE.md §15, DESIGN.md): bordered 40px squares on a solid fill,
 * static while the slides move, and looping rather than dead-ending. Same
 * mechanics as the industry pages' ProjectSlider, for any card.
 *
 * `slideClassName` sets the slide width per breakpoint; `fitAt` hides the
 * arrows at the breakpoint from which every slide already fits.
 */
export function SnapSlider({
  children,
  header,
  labels,
  slideClassName,
  fitAt,
  trackClassName = "pb-1",
  tone = "light",
}: {
  children: React.ReactNode;
  /** Left of the arrows (server-rendered heading block). */
  header: React.ReactNode;
  labels: { prev: string; next: string; region: string };
  slideClassName: string;
  /** Tailwind breakpoint at which all slides fit, e.g. "xl". */
  fitAt?: "md" | "lg" | "xl";
  /** Track padding; cards with shadows need room, or overflow clips them. */
  trackClassName?: string;
  /** The arrows' fill matches the section ground. */
  tone?: "light" | "dark";
}) {
  const track = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // Loop: next from the end returns to the start, previous from the start
    // jumps to the end. 2px absorbs sub-pixel positions.
    if (dir === 1 && el.scrollLeft >= max - 2) return el.scrollTo({ left: 0, behavior: "smooth" });
    if (dir === -1 && el.scrollLeft <= 2) return el.scrollTo({ left: max, behavior: "smooth" });
    const first = el.querySelector<HTMLElement>("[data-slide]");
    const stride = first ? first.getBoundingClientRect().width + GAP : el.clientWidth;
    el.scrollBy({ left: dir * stride, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6 md:gap-8">
        <div className="max-w-3xl">{header}</div>
        <div
          className={cn(
            "flex gap-2",
            fitAt === "md" && "md:hidden",
            fitAt === "lg" && "lg:hidden",
            fitAt === "xl" && "xl:hidden",
          )}
        >
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              aria-label={dir === -1 ? labels.prev : labels.next}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-[6px] border transition",
                tone === "dark"
                  ? "border-border bg-bg text-text hover:bg-surface-2"
                  : "border-light-border bg-light-bg text-light-text hover:bg-light-surface",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                className={cn("h-4 w-4", dir === -1 && "rotate-180")}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-label={labels.region}
        tabIndex={0}
        className={cn(
          "mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] md:mt-10 [&::-webkit-scrollbar]:hidden",
          trackClassName,
        )}
      >
        {slides.map((slide, i) => (
          <div key={i} data-slide className={cn("flex shrink-0 snap-start", slideClassName)}>
            {slide}
          </div>
        ))}
      </div>
    </>
  );
}
