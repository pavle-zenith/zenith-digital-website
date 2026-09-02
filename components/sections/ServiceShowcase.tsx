"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn, servesRaw } from "@/lib/utils";
import type { ServiceSlide, ServiceUsp } from "@/content/services";

/**
 * Per-service showcase (Stripe customer-story register). A full-width
 * horizontal slider where each slide is a header row (client logo or wordmark
 * + claim title) over a wide screenshot — logo, title, and picture slide
 * together; the arrows stay put. Below, a static row of three USP cards:
 * icon tile, then "Title. Text" in one paragraph.
 */
export function ServiceShowcase({
  slides,
  usps,
  dark,
}: {
  slides: ServiceSlide[];
  usps: ServiceUsp[];
  dark: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const muted = dark ? "text-text-muted" : "text-light-muted";
  const rule = dark ? "border-border" : "border-light-border";

  // Infinite loop: a clone of the first slide is appended to the track. When
  // the scroll settles on the clone, silently jump back to the real first
  // slide (visually identical); going prev from the first slide jumps onto
  // the clone first, then sweeps back to the last.
  const loop = slides.length > 1;
  const extended = loop ? [...slides, slides[0]] : slides;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !loop) return;
    let timer: number;
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const w = track.clientWidth;
        if (Math.round(track.scrollLeft / w) === slides.length) {
          track.scrollLeft = 0;
        }
      }, 120);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      track.removeEventListener("scroll", onScroll);
    };
  }, [loop, slides.length]);

  const scroll = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const w = track.clientWidth;
    if (loop && dir === -1 && track.scrollLeft < w / 2) {
      // At the first slide: jump onto the identical end clone, then animate
      // one step back so prev lands on the last real slide.
      track.scrollLeft = slides.length * w;
      requestAnimationFrame(() =>
        track.scrollBy({ left: -w, behavior: "smooth" }),
      );
      return;
    }
    track.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="mt-14 md:mt-20">
      {/* Slider — bleeds to the frame rails so the rules (above the header
          row, before and after the image) run edge to edge; header and image
          re-apply the gutter. Arrows are pinned top-right on a solid fill so
          sliding text never shows through them. */}
      <div className={cn("frame-bleed relative border-t", rule)}>
        {slides.length > 1 ? (
          <div className="absolute bottom-4 right-[clamp(20px,4vw,64px)] z-10 flex gap-2 sm:bottom-auto sm:top-4">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                aria-label={dir === -1 ? "Previous example" : "Next example"}
                onClick={() => scroll(dir)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-[6px] border transition",
                  rule,
                  dark
                    ? "bg-bg hover:bg-surface-2"
                    : "bg-light-bg hover:bg-light-surface",
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
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        ) : null}

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {extended.map((slide, i) => (
            <figure
              key={`${i}-${slide.title}`}
              aria-hidden={i >= slides.length}
              className="w-full shrink-0 snap-start"
            >
              {/* Header row: logo/wordmark + claim title, clear of the arrows */}
              <div className="hidden min-h-[72px] flex-wrap items-center gap-x-4 gap-y-2 py-4 pl-[clamp(20px,4vw,64px)] pr-[calc(clamp(20px,4vw,64px)+100px)] sm:flex">
                {slide.logo ? (
                  <Image
                    src={slide.logo}
                    unoptimized={servesRaw(slide.logo)}
                    alt={slide.client}
                    width={140}
                    height={32}
                    className="h-6 w-auto shrink-0 object-contain"
                  />
                ) : (
                  <span className="font-display text-body-lg font-medium">
                    {slide.client}
                  </span>
                )}
                <figcaption className={cn("text-body-lg font-medium", muted)}>
                  {slide.title}
                </figcaption>
              </div>

              {/* Rule before the image (spans the slide, reads continuous).
                  Hidden with the header on phones: with nothing between it and
                  the track's own top rule the two stack into a double
                  hairline. */}
              <div className={cn("hidden border-t sm:block", rule)} aria-hidden />

              {/* Image fills the slot rail to rail, flush against the rules —
                  no padding, radius, or border around it */}
              <div className="relative aspect-[16/9] overflow-hidden md:aspect-[2/1]">
                <Image
                  src={slide.image}
                  alt={`${slide.client} website`}
                  fill
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  className="object-cover object-top"
                />
              </div>

              {/* Rule after the image */}
              <div className={cn("border-t", rule)} aria-hidden />
            </figure>
          ))}
        </div>
      </div>

      {/* Static USP row — plain columns under the closing rule */}
      <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3">
        {usps.map((usp) => (
          <article key={usp.title}>
            <span
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-[6px] border",
                rule,
                dark ? "bg-surface text-text" : "bg-light-surface text-light-text",
              )}
            >
              <UspIcon name={usp.icon} />
            </span>
            <h3 className="mt-6 font-display text-body-lg font-medium">
              {usp.title}
            </h3>
            <p className={cn("mt-2 text-body leading-relaxed", muted)}>
              {usp.text}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

/** Small line icon per USP (Lucide via Iconify). */
function UspIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    // lucide:target
    target: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    // lucide:gauge
    gauge: (
      <>
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </>
    ),
    // lucide:pen-line
    pen: (
      <>
        <path d="M13 21h8" />
        <path d="m21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      </>
    ),
    // lucide:shield-check
    shield: (
      <>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    // lucide:search
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    // lucide:clock
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    // lucide:layers
    layers: (
      <>
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
      </>
    ),
    // lucide:trending-up
    chart: (
      <>
        <path d="M16 7h6v6" />
        <path d="m22 7-8.5 8.5-5-5L2 17" />
      </>
    ),
    // lucide:file-text
    file: (
      <>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </>
    ),
    // lucide:code
    code: (
      <>
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </>
    ),
    // lucide:plug
    plug: (
      <>
        <path d="M12 22v-5" />
        <path d="M9 8V2" />
        <path d="M15 8V2" />
        <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
      </>
    ),
    // lucide:eye-off
    eyeOff: (
      <>
        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
        <path d="m2 2 20 20" />
      </>
    ),
    // lucide:percent
    percent: (
      <>
        <path d="M19 5 5 19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </>
    ),
    // lucide:users
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
