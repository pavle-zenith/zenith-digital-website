"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { cn } from "@/lib/utils";
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

type VideoData = { heading: string; intro: string; items: VideoItem[] };

/**
 * Video testimonials on a faint textured navy background with the white hairline
 * frame. Heading left, intro right, then portrait cards: company logo top-left,
 * play button top-right, the person's video/poster filling the card, and a bottom
 * panel with the quote, name + verified check, and role - company. Clicking a card
 * opens a blurred full-screen overlay that plays the portrait video.
 *
 * Defaults to the homepage set and its three-up grid. `slider` swaps the grid
 * for a snap-scroll track with arrows (used on /testimonials); the card itself
 * is identical either way.
 */
export function VideoTestimonials({
  data = videoTestimonials,
  slider = false,
}: {
  data?: VideoData;
  slider?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
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
      {/* Faint texture background */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>

      <Section
        tone="dark"
        className="bg-transparent"
        frameClassName="!py-12 md:!py-20"
      >
        {/* Header: heading left, intro right (plus arrows in slider mode) */}
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {data.heading}
          </h2>
          <div
            className={cn(
              slider && "flex flex-wrap items-end justify-between gap-6",
            )}
          >
            <p className="max-w-xl text-body-lg font-medium text-text-muted">
              {data.intro}
            </p>
            {slider ? (
              <div className="flex shrink-0 gap-2">
                {([-1, 1] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => scrollByCard(dir)}
                    aria-label={
                      dir === -1
                        ? "Previous video testimonial"
                        : "Next video testimonial"
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-border bg-bg text-text transition hover:bg-surface-2"
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
            ) : null}
          </div>
        </div>

        <div
          ref={trackRef}
          className={cn(
            "mt-12",
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
                "group relative flex aspect-[3/4.4] flex-col overflow-hidden rounded-[8px] border border-border text-left",
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
                <video
                  src={item.video}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  aria-hidden
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-surface-2 to-surface" />
              )}

              {/* Legibility gradient — hard at the bottom for the text, clear up top.
                  Base #010020 matches the case-study panel gradient. */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#010020] via-[#010020]/80 to-transparent" />

              {/* Top row: logo left, play right */}
              <div className="relative flex items-start justify-between p-5">
                {item.logo ? (
                  <Image
                    src={item.logo}
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
                <p className="text-body leading-relaxed">{item.quote}</p>
                <div>
                  <div className="flex items-center gap-1.5 font-display text-body-lg font-medium">
                    {item.name}
                    <VerifiedCheck />
                  </div>
                  <div className="text-body text-text-muted">
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-xl"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-text hover:bg-white/10"
            onClick={() => setActive(null)}
          >
            ✕
          </button>
          <div
            className="relative aspect-[9/16] h-[80vh] max-w-full overflow-hidden rounded-[8px] border border-white/15 bg-surface"
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
