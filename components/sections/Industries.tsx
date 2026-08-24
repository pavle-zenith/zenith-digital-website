"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Section } from "@/components/ui/Section";
import { industries } from "@/content/home";

/**
 * Industries slider (Stripe "startups" carousel style). Header row: heading left,
 * intro right, prev/next arrows top-right. Below, a horizontally scrollable track
 * of tall portrait cards that bleeds to the frame side rails. Each card is a
 * placeholder image with the industry name overlaid bottom-left, and a "View work"
 * link beneath it. Arrows scroll by one card; the track also scrolls/snaps by touch.
 */
export function Industries() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // step = width of the first card + the flex gap (32px)
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 32 : track.clientWidth * 0.8;

    // Wrap instead of dead-ending. Previously both arrows stayed enabled at the
    // ends and a press did nothing at all, so the control silently stopped
    // responding. Now the track returns to the opposite end (DESIGN.md: sliders
    // loop rather than dead-ending). The 2px tolerance absorbs sub-pixel
    // scrollLeft values that never quite reach the computed maximum.
    const max = track.scrollWidth - track.clientWidth;
    if (dir === 1 && track.scrollLeft >= max - 2) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (dir === -1 && track.scrollLeft <= 2) {
      track.scrollTo({ left: max, behavior: "smooth" });
      return;
    }
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      {/* Header: heading + intro on the left, arrows on the right, all aligned to
          the bottom so the text and controls share one baseline above the cards. */}
      <div className="mb-8 flex md:mb-12 flex-wrap items-end justify-between gap-8">
        <div>
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {industries.heading}
          </h2>
          <p className="mt-4 max-w-xl text-body-lg md:mt-5 font-medium text-light-muted">
            {industries.intro}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous industries"
            className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-light-border text-light-text transition hover:bg-light-surface"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next industries"
            className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-light-border text-light-text transition hover:bg-light-surface"
          >
            <Arrow dir="right" />
          </button>
        </div>
      </div>

      {/* Scroll track — cards start flush with the frame content (left-aligned),
          then run off the right edge to scroll. */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {industries.items.map((it) => (
          <div
            key={it.name}
            data-card
            className="w-[280px] shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
          >
            {/* The heading sits INSIDE the link. Previously the link wrapped
                only the image, which is alt="" and aria-hidden, so all eight
                cards announced as an unnamed "link" (WCAG 2.4.4). The name is
                what gives each card its accessible name now. */}
            <Link href={it.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[8px] bg-light-surface">
                <Image
                  src={it.image}
                  alt=""
                  fill
                  sizes="340px"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  aria-hidden
                />
              </div>
              <h3 className="mt-5 font-display text-body-lg font-medium tracking-tight text-light-text transition group-hover:text-accent">
                {it.name}
              </h3>
            </Link>
            <p className="mt-2 text-body leading-snug text-light-muted">
              {it.blurb}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
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
      {dir === "left" ? (
        <path d="M19 12H5m0 0l6-6m-6 6l6 6" />
      ) : (
        <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
      )}
    </svg>
  );
}
