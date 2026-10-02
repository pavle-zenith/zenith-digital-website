"use client";

import Image from "next/image";
import { useState } from "react";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn, servesRaw } from "@/lib/utils";
import { partnerShowcaseUi as ui } from "@/content/partner-showcase";

export type ReelItem = { client: string; image: string };

/** Time each picture takes to pass: about 60px/s on desktop, 37px/s on a phone. */
const SECONDS_PER_SHOT = 7;

/**
 * "A sample of what we ship": the proof stats, then two rows of real project
 * screenshots (the same pictures as the project grid further down) drifting
 * in opposite directions, the top row leftwards and the bottom row rightwards.
 * No arrows: nothing to operate on a shared screen.
 *
 * Moving content needs a way to stop it (WCAG 2.2.2), so the control the
 * arrows used to occupy is a pause / play button. Hovering or focusing inside
 * the reel also holds it still, and under reduced motion it never moves.
 *
 * Each row renders its set twice so the -50% marquee loops seamlessly; the
 * second copy is hidden from assistive tech. The loop's duration scales with
 * the row's length (SECONDS_PER_SHOT per picture), so adding projects makes a
 * row longer, never faster. Images are served exactly as the
 * grid serves them, so the browser fetches each once for both sections.
 */
export function ShowcaseWork({
  heading,
  intro,
  stats,
  rows,
}: {
  heading: string;
  intro: string;
  stats: string[];
  rows: [ReelItem[], ReelItem[]];
}) {
  const [paused, setPaused] = useState(false);

  return (
    <Section id="work" tone="light" className="doc-anchor" frameClassName="!pt-14 !pb-12 md:!pt-24 md:!pb-16">
      <SectionHeader heading={heading} intro={intro} tone="light" />

      {/* Phones: the stats run the full width, the control sits under them. */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <ul className="flex w-full flex-col divide-y divide-light-border sm:w-auto sm:flex-row sm:flex-wrap sm:items-baseline sm:divide-x sm:divide-y-0">
          {stats.map((chip) => (
            <li
              key={chip}
              className="py-3 font-display font-medium first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0"
            >
              {chip}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? ui.playReel : ui.pauseReel}
          aria-pressed={paused}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition hover:bg-light-surface"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {paused ? (
              // lucide:play
              <path d="M6 3v18l15-9z" />
            ) : (
              // lucide:pause
              <>
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Rule between the stats and the reel. */}
      <div className="frame-bleed mt-6 border-t border-light-border" aria-hidden />

      {/* The reel bleeds to the rails; the rails clip it. */}
      <div
        role="region"
        aria-label={ui.reelLabel}
        className="group frame-bleed mt-6 flex flex-col gap-4 overflow-hidden"
      >
        {rows.map((row, r) => (
          <ul
            key={r}
            className={cn(
              "flex w-max gap-4 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
              r === 0 ? "animate-marquee-slow" : "animate-marquee-slow-reverse",
            )}
            style={{
              animationDuration: `${row.length * SECONDS_PER_SHOT}s`,
              ...(paused ? { animationPlayState: "paused" } : null),
            }}
          >
            {[...row, ...row].map((item, i) => {
              const copy = i >= row.length;
              return (
                <li
                  key={`${item.image}-${i}`}
                  aria-hidden={copy || undefined}
                  className="relative aspect-[4/3] w-[240px] shrink-0 overflow-hidden rounded-[6px] border border-light-border bg-light-surface sm:w-[320px] lg:w-[400px]"
                >
                  <Image
                    src={item.image}
                    unoptimized={servesRaw(item.image)}
                    alt={copy ? "" : `${item.client} website`}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 240px"
                    className="object-cover"
                  />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </Section>
  );
}
