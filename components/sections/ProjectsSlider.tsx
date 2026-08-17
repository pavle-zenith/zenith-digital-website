"use client";

import Image from "next/image";
import { useRef } from "react";

import { Section } from "@/components/ui/Section";
import { pProjects } from "@/content/partnerships";

/**
 * Completed-work track under the service hero. The header row is the hero's
 * proof stats in the case-study meta-strip register (hairline-divided,
 * stacking to a labelled column on phones) with the slider arrows on their
 * right; below, a full-bleed divider and the 4:3 shots bleeding to the frame
 * rails. Items come from pProjects, the single source for this set; only the
 * stats are page-supplied.
 */
export function ProjectsSlider({
  stats,
  items = pProjects.items,
}: {
  stats: string[];
  items?: { name: string; image: string }[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Section tone="light" frameClassName="!pb-10 !pt-6 md:!pb-12 md:!pt-7">
      <div className="flex items-center justify-between gap-6">
        <ul className="flex flex-col divide-y divide-light-border sm:flex-row sm:flex-wrap sm:items-baseline sm:divide-x sm:divide-y-0">
          {stats.map((chip) => (
            <li
              key={chip}
              className="py-3 font-display font-medium first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0"
            >
              {chip}
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollByCard(dir)}
              aria-label={dir === -1 ? "Previous projects" : "Next projects"}
              className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition hover:bg-light-surface"
            >
              <svg
                viewBox="0 0 24 24"
                className={dir === -1 ? "h-4 w-4 rotate-180" : "h-4 w-4"}
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

      {/* Divider between the stats strip and the screenshots */}
      <div
        className="frame-bleed mt-6 border-t border-light-border"
        aria-hidden
      />

      {/* Scroll track — bleeds to the frame rails so the screenshots run edge
          to edge, then continues off the right to scroll. */}
      <div
        ref={trackRef}
        className="frame-bleed mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it) => (
          <div
            key={it.name}
            data-card
            className="w-[320px] shrink-0 snap-start sm:w-[420px] lg:w-[520px]"
          >
            {/* Images only — 4:3 to match the source shots, nothing cropped. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-light-surface">
              <Image
                src={it.image}
                alt={`${it.name} website`}
                fill
                sizes="520px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
