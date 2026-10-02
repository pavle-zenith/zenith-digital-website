"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { cn, servesRaw } from "@/lib/utils";
import { partnerShowcaseUi as ui } from "@/content/partner-showcase";
import type { ShowcaseSlide } from "@/content/partner-showcase";

/** A slide plus where its crop is anchored, worked out on the server. */
export type SlideView = ShowcaseSlide & { focus: string };

/**
 * One service's examples: a 4:3 card per project, snap-scrolling
 * (CLAUDE.md §15), with the project's name and line carried on the card and
 * the arrows on the picture's bottom-right corner.
 *
 * - The first card is complete on load and nothing moves on its own: on a
 *   phone or a shared screen, autoplay would pull the picture away
 *   mid-sentence.
 * - It does NOT loop: a counter that wraps from 4 back to 1 reads as a reset.
 *   Each end disables its arrow, with `aria-disabled` so the button keeps its
 *   place in the tab order. One slide: no arrows, no counter.
 * - The project text sits in a card under the picture, so nothing covers the
 *   screenshot.
 * - The arrows are static and sit in a solid white cluster on the picture's
 *   bottom-right corner, so a picture sliding underneath never shows through
 *   them. They are pinned to an overlay the size of the picture, which keeps
 *   them on the corner while the caption below changes height.
 *
 * The box is 4:3, the shape of the project pictures, so they show whole.
 * Anything of another shape is cropped with `object-cover`, never
 * letterboxed, anchored where the server says: a 2:1 shot of two browser
 * windows side by side is pinned near the left to keep the first window
 * whole; everything else is centred. Images are served as the project grid
 * serves them, so each is fetched once for both.
 */
export function ServiceSlides({
  service,
  slides,
  priority = false,
}: {
  service: string;
  slides: SlideView[];
  /** Above the fold on load: fetch the first image eagerly. */
  priority?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const trackId = useId();
  const [index, setIndex] = useState(0);
  const many = slides.length > 1;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !many) return;
    const onScroll = () => {
      const w = track.clientWidth;
      if (w) setIndex(Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / w))));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [many, slides.length]);

  const go = (to: number) => {
    const track = trackRef.current;
    if (!track || to < 0 || to >= slides.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: to * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      <div
        id={trackId}
        ref={trackRef}
        role="region"
        aria-label={ui.examples(service)}
        // Focusable, so the track scrolls from the keyboard as well as by swipe.
        tabIndex={many ? 0 : undefined}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-card [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <figure key={slide.image} className="relative w-full shrink-0 snap-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-light-border bg-light-surface">
              <Image
                src={slide.image}
                unoptimized={servesRaw(slide.image)}
                alt={`${slide.client} website`}
                fill
                sizes="(min-width: 1440px) 640px, (min-width: 1024px) 46vw, 100vw"
                priority={priority && i === 0}
                className="object-cover"
                style={{ objectPosition: slide.focus }}
              />
            </div>
            <figcaption className="mt-3 rounded-[8px] border border-light-border bg-light-surface px-4 py-3 text-body">
              <span className="block font-medium text-light-text">{slide.client}</span>
              {/* A caption that only repeats the client's name is shown once. */}
              {slide.caption !== slide.client ? (
                <span className="mt-0.5 block text-light-muted">{slide.caption}</span>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {many ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[4/3]">
          <div className="pointer-events-auto absolute bottom-3 right-3 flex items-center gap-1 rounded-[8px] border border-light-border bg-light-bg p-1">
            <p
              aria-live="polite"
              aria-atomic="true"
              className="px-2 font-mono text-label uppercase track-label text-light-muted tabular-nums"
            >
              <span aria-hidden>{ui.counter(index + 1, slides.length)}</span>
              <span className="sr-only">{ui.counterSr(index + 1, slides.length)}</span>
            </p>
            {([-1, 1] as const).map((dir) => {
              const disabled = dir === -1 ? index === 0 : index === slides.length - 1;
              return (
                <button
                  key={dir}
                  type="button"
                  aria-label={dir === -1 ? ui.previous(service) : ui.next(service)}
                  aria-controls={trackId}
                  aria-disabled={disabled}
                  onClick={() => !disabled && go(index + dir)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition",
                    disabled ? "cursor-default opacity-40" : "hover:bg-light-surface",
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
                    {/* The site's slider arrow. */}
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
