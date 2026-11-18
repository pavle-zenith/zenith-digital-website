"use client";

import { useRef } from "react";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";
import type { CaseStudyCard } from "@/content/case-studies";

/** Track gap between cards in px (gap-6); part of the arrow step. */
const GAP = 24;

/**
 * An industry page's projects: every one on the grid's own card, all equal
 * height, in a snap-scroll track (owner, 18 Nov 2026). Three per view from
 * lg, two from sm, one and a peek on phones.
 *
 * Header follows the homepage industries slider: the caller's heading block
 * (`children`, server-rendered) on the left, square arrows bottom-right.
 * Arrows step one card and LOOP rather than dead-end (DESIGN.md): next from
 * the last view returns to the start, previous from the first jumps to the
 * end. The 2px tolerance absorbs sub-pixel scroll positions that never quite
 * reach the computed end. Arrows hide at the breakpoints where every card
 * already fits, since there is nothing to step to.
 */
export function ProjectSlider({
  cards,
  details,
  labels,
  children,
}: {
  cards: CaseStudyCard[];
  /** Slugs with a shipped detail page; the rest link to their live site. */
  details: string[];
  labels: { prev: string; next: string; region: string };
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hasDetail = new Set(details);
  const n = cards.length;

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (dir === 1 && track.scrollLeft >= max - 2) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (dir === -1 && track.scrollLeft <= 2) {
      track.scrollTo({ left: max, behavior: "smooth" });
      return;
    }
    const card = track.querySelector<HTMLElement>("[data-slide]");
    const stride = card ? card.offsetWidth + GAP : track.clientWidth;
    track.scrollBy({ left: dir * stride, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6 md:gap-8">
        <div className="max-w-3xl">{children}</div>
        <div
          className={cn(
            "flex gap-2",
            n <= 1 && "hidden",
            n <= 2 && "sm:hidden",
            n <= 3 && "lg:hidden",
          )}
        >
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              aria-label={dir === -1 ? labels.prev : labels.next}
              aria-controls="industry-projects"
              className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition hover:bg-light-surface"
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
        ref={trackRef}
        id="industry-projects"
        role="region"
        aria-label={labels.region}
        tabIndex={0}
        className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1 [scrollbar-width:none] md:mt-12 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c) => (
          <div
            key={c.slug}
            data-slide
            className="flex w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
          >
            <ProjectCard
              card={c}
              detail={hasDetail.has(c.slug)}
              liveUrl={c.liveUrl}
              showIndustry={false}
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </>
  );
}
