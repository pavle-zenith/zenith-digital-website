"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Shot = { src: string; alt: string };

/**
 * The industry hero's three shots as a rotating stack (owner, 18 Nov 2026).
 * One shot sits large in front; the other two sit smaller behind it, left
 * and right, on the same vertical midline. The arrows rotate the stack:
 * next brings the right shot to the front, sends the front one left and the
 * left one round to the right; previous does the reverse. It loops.
 *
 * MOTION IS TRANSFORM ONLY. Every shot has the same layout box (the front
 * slot); the side positions are a translate + scale of that box, so a
 * rotation never moves layout and the stage height never changes. Because
 * every shot renders at the front slot's size, all three share one `sizes`
 * and stay sharp when they come forward. Reduced motion swaps instantly.
 *
 * Geometry (percent of the stage width): front slot 58% wide from sm (70%
 * on phones), sides 42% (44%) flush to the stage edges. Scale = side/front
 * width; translate = how far the side's centre sits from the stage centre,
 * as a share of the front slot's own width. The stage's aspect ratio is the
 * front slot's 3:2 crop, so the box exactly fits the image.
 *
 * Arrows sit either side of the stage from sm; on phones they drop below it,
 * one under each edge, so they don't cover the side shots.
 */
export function HeroShotCarousel({
  shots,
  labels,
}: {
  /** In starting order: front, right, left. */
  shots: [Shot, Shot, Shot];
  labels: { prev: string; next: string };
}) {
  const [active, setActive] = useState(0);
  const [rotated, setRotated] = useState(false);
  const n = shots.length;
  const rotate = (dir: 1 | -1) => {
    setActive((a) => (a + dir + n) % n);
    setRotated(true);
  };

  const arrow = (dir: 1 | -1) => (
    <button
      type="button"
      onClick={() => rotate(dir)}
      aria-label={dir === -1 ? labels.prev : labels.next}
      aria-controls="hero-shots"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition hover:bg-light-surface"
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
  );

  return (
    <div className="mx-auto mt-12 flex max-w-[68rem] flex-wrap items-center justify-between gap-x-6 gap-y-6 sm:flex-nowrap md:mt-16">
      {arrow(-1)}
      <div
        id="hero-shots"
        className="relative order-first aspect-[15/7] w-full sm:order-none sm:aspect-[75/29] sm:flex-1"
      >
        {shots.map((shot, i) => {
          // 0 = front, 1 = right, 2 = left.
          const slot = (i - active + n) % n;
          return (
            <div
              key={shot.src}
              className={cn(
                "absolute inset-y-0 left-[15%] w-[70%] overflow-hidden rounded-card border border-light-border bg-light-surface sm:left-[21%] sm:w-[58%]",
                "transition-[translate,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                slot === 0 && "z-10",
                slot === 1 &&
                  "translate-x-[40%] scale-[0.629] sm:translate-x-1/2 sm:scale-[0.724]",
                slot === 2 &&
                  "-translate-x-[40%] scale-[0.629] sm:-translate-x-1/2 sm:scale-[0.724]",
              )}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "eager"}
                sizes="(max-width: 640px) 94vw, (max-width: 1088px) 70vw, 743px"
                className="object-cover"
              />
            </div>
          );
        })}
        {/* Announces the new front shot after a rotation (not on load). */}
        <p className="sr-only" aria-live="polite">
          {rotated ? shots[active].alt : ""}
        </p>
      </div>
      {arrow(1)}
    </div>
  );
}
