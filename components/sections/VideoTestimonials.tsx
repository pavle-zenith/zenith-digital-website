"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { cn, isFlatMark } from "@/lib/utils";
import type { Tone } from "@/lib/types";
import { videoTestimonials } from "@/content/home";

type VideoItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
  logo: string;
  poster: string;
  video: string;
};

/**
 * Card quotes run to one sentence: the panel sits over a face, so a full
 * paragraph buries it. The full quote is still what plays in the video and
 * what the wall and schema carry.
 */
function firstSentence(quote: string): string {
  const end = quote.search(/[.!?](\s|$)/);
  return end === -1 ? quote : quote.slice(0, end + 1);
}

/** Prev/next square arrows, tone-matched to the section. */
function Arrows({
  onScroll,
  dark,
}: {
  onScroll: (dir: 1 | -1) => void;
  dark: boolean;
}) {
  return (
    <div className="flex shrink-0 gap-2">
      {([-1, 1] as const).map((dir) => (
        <button
          key={dir}
          type="button"
          onClick={() => onScroll(dir)}
          aria-label={
            dir === -1
              ? "Previous video testimonial"
              : "Next video testimonial"
          }
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-[6px] border transition",
            dark
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
  );
}

/** Heading and intro are optional: the bare slider on /testimonials has neither. */
type VideoData = { heading?: string; intro?: string; items: VideoItem[] };

/**
 * Video testimonials on a faint textured navy background with the white hairline
 * frame. Heading left, intro right, then portrait cards: company logo top-left,
 * play button top-right, the person's video/poster filling the card, and a bottom
 * panel with the quote, name + verified check, and role - company. Clicking a card
 * opens a blurred full-screen overlay that plays the portrait video.
 *
 * Defaults to the homepage set: dark, three-up grid, with a heading and intro.
 * `slider` swaps the grid for a snap-scroll track with arrows, `tone="light"`
 * drops the navy texture, and omitting heading/intro drops the header row
 * entirely (that combination is the bare slider on /testimonials). The card
 * itself is identical in every mode.
 */
export function VideoTestimonials({
  data = videoTestimonials,
  slider = false,
  tone = "dark",
  trackId,
}: {
  data?: VideoData;
  slider?: boolean;
  tone?: Tone;
  /** Set when another section hosts the arrows (see SliderArrows). */
  trackId?: string;
}) {
  const dark = tone === "dark";
  const hasHeader = Boolean(data.heading || data.intro);
  // Arrows hosted elsewhere (the hero) means this section renders none.
  const ownArrows = slider && !trackId;
  const [active, setActive] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  // The card that opened the dialog, so focus can return to it on close.
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active === null) return;

    const dialog = dialogRef.current;
    openerRef.current = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'button, [href], video[controls], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    // Move focus into the dialog; without this the keyboard user is still
    // outside it and Tab walks the page behind the scrim.
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        return;
      }
      if (e.key !== "Tab") return;
      // Trap: wrap at both ends so Tab and Shift+Tab stay inside the dialog.
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === first || !dialog?.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      openerRef.current?.focus();
    };
  }, [active]);

  const activeItem = active !== null ? data.items[active] : null;

  // Arrows step one card plus the 24px track gap.
  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background — dark tone only */}
      {dark ? (
        <div className="absolute inset-0 -z-10 bg-bg">
          <Image
            src="/textures/studio-texture.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.16]"
            aria-hidden
          />
        </div>
      ) : null}

      <Section
        tone={tone}
        className={cn(dark && "bg-transparent")}
        // The bare slider runs tight (32px), matching the project slider on
        // /partnerships. With a header it keeps the usual section rhythm.
        frameClassName={hasHeader ? "!py-12 md:!py-20" : "!py-8"}
      >
        {/* Header: heading left, intro right (plus arrows in slider mode).
            Skipped entirely when the section has no heading or intro. */}
        {hasHeader ? (
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            {data.heading ? (
              <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
                {data.heading}
              </h2>
            ) : null}
            <div
              className={cn(
                slider && "flex flex-wrap items-end justify-between gap-6",
              )}
            >
              {data.intro ? (
                <p
                  className={cn(
                    "max-w-xl text-body-lg font-medium",
                    dark ? "text-text-muted" : "text-light-muted",
                  )}
                >
                  {data.intro}
                </p>
              ) : null}
              {ownArrows ? <Arrows onScroll={scrollByCard} dark={dark} /> : null}
            </div>
          </div>
        ) : ownArrows ? (
          // Bare slider: arrows sit alone above the track, right-aligned.
          <div className="flex justify-end">
            <Arrows onScroll={scrollByCard} dark={dark} />
          </div>
        ) : null}

        <div
          ref={trackRef}
          id={trackId}
          className={cn(
            hasHeader ? "mt-12" : trackId ? "mt-0" : "mt-6",
            slider
              ? "flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "grid grid-cols-1 gap-6 md:grid-cols-3",
          )}
        >
          {data.items.map((item, i) => (
            <button
              key={item.name}
              data-card
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                // text-white is deliberate: this content sits over video, so
                // it must not inherit a light section's dark ink.
                "group relative flex aspect-[3/3.7] flex-col sm:aspect-[3/4.4] overflow-hidden rounded-[8px] border border-border text-left text-white",
                slider &&
                  "w-[280px] shrink-0 snap-start sm:w-[320px] lg:w-[360px]",
              )}
            >
              {/* Poster / video first-frame area */}
              {item.poster ? (
                <Image
                  src={item.poster}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : item.video ? (
                /* No poster: mobile browsers will not paint a frame from
                   preload="metadata", so the branded panel sits underneath as
                   a visible ground rather than leaving a void. Give the entry
                   a `poster` and this branch is skipped entirely. */
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-surface-2 to-surface" />
                  <video
                    src={item.video}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    aria-hidden
                  />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-surface-2 to-surface" />
              )}

              {/* Legibility gradient — hard at the bottom for the text, clear up top.
                  Base --color-scrim matches the case-study panel gradient. */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-scrim via-scrim/80 to-transparent" />

              {/* Matching scrim at the top, for the white client logo. The
                  bottom gradient only ever covered the text, so the logo was
                  relying on the poster happening to be dark up there. Measured
                  across the set, every poster reads 49-119 in that corner
                  except John Smyth's, a cutout on a white ground at 180, where
                  the white AdVantage mark disappeared entirely. This holds for
                  any light poster rather than special-casing one client. */}
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-scrim/70 to-transparent" />

              {/* Top row: logo left, play right */}
              <div className="relative flex items-start justify-between p-5">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    unoptimized={isFlatMark(item.logo)}
                    alt={item.company}
                    width={160}
                    height={40}
                    className="h-7 w-auto object-contain"
                  />
                ) : (
                  <span className="font-display font-medium">
                    {item.company}
                  </span>
                )}
                <span className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-black/40 backdrop-blur transition group-hover:bg-black/60">
                  <span className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
                </span>
              </div>

              {/* Bottom panel: quote, name + check, role - company */}
              <div className="relative mt-auto flex flex-col gap-4 p-5">
                <p className="font-display text-body-lg font-medium leading-snug tracking-tight">
                  {firstSentence(item.quote)}
                </p>
                <div>
                  <div className="flex items-center gap-1.5 font-display text-body-lg font-medium">
                    {item.name}
                    <VerifiedCheck className="text-white" />
                  </div>
                  <div className="text-body text-white/70">
                    {item.role} - {item.company}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Blurred video overlay */}
      {activeItem ? (
        <div
          ref={dialogRef}
          // tone-dark: the scrim is near-black, so the dialog owns the
          // near-white focus ring rather than inheriting the section's accent.
          className="tone-dark fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-xl"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Video testimonial from ${activeItem.name}`}
        >
          <button
            type="button"
            aria-label="Close video"
            className="absolute right-6 top-[max(1.5rem,env(safe-area-inset-top))] z-10 flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/20 bg-black/40 text-text backdrop-blur transition hover:bg-white/10"
            onClick={() => setActive(null)}
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
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative aspect-[9/16] h-[70dvh] max-w-full overflow-hidden rounded-[8px] border border-white/15 bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.video ? (
              <video
                src={activeItem.video}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            ) : activeItem.poster ? (
              <Image
                src={activeItem.poster}
                alt={activeItem.name}
                fill
                // The dialog frame is a 9/16 box at 80vh, so the widest it
                // ever renders is roughly 45vh. 50vh covers it with headroom.
                sizes="50vh"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8 text-center">
                <div className="font-display text-h3 font-medium">
                  {activeItem.name}
                </div>
                <div className="text-body text-text-muted">
                  {activeItem.company}
                </div>
                <p className="mt-4 text-body text-text-muted">
                  Video testimonial coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
