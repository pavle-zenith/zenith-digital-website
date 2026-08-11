"use client";

import Image from "next/image";
import { useRef } from "react";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { pHero, pProjects } from "@/content/partnerships";

/**
 * /partnerships hero — light. Eyebrow, keyword-led H1, subhead and CTAs sit
 * bottom-left; the projects-slider controls sit bottom-right on the same
 * baseline. A rail-to-rail divider separates them from the completed-project
 * screenshots, which snap-scroll edge to edge (Industries carousel mechanics:
 * arrows step one card, touch scrolls freely).
 */
export function PartnershipsHero() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // step = width of the first card + the flex gap (16px)
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="!pb-8 !pt-14 md:!pt-24"
    >
      {/* Content block on the inverted studio texture — the layer stretches up
          over the frame's top padding and down to the divider, rail to rail. */}
      <div className="relative">
        <div
          className="frame-bleed pointer-events-none absolute inset-x-0 -bottom-8 -top-14 overflow-hidden md:-top-24"
          aria-hidden
        >
          <Image
            src="/textures/studio-texture.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.28] invert"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 92%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 60%, color-mix(in srgb, var(--color-light-bg) 20%, transparent) 100%)",
            }}
          />
        </div>

        <div className="relative">
          <span className="inline-flex w-fit items-center rounded-full border border-light-border px-3.5 py-1.5 font-mono text-label uppercase track-label text-light-muted">
            {pHero.eyebrow}
          </span>

      {/* Full-width headline — runs the whole frame, like the homepage hero */}
      <h1 className="mt-8 font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
        {pHero.heading}
      </h1>

      {/* Support copy + CTAs bottom-left, slider controls bottom-right */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-2xl">
          <p className="text-body-lg font-medium leading-relaxed text-light-muted">
            {pHero.subhead}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {pHero.ctas.map((cta) => (
              <Button key={cta.href} cta={cta} tone="light" />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous projects"
            className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition hover:bg-light-surface"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next projects"
            className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition hover:bg-light-surface"
          >
            <Arrow dir="right" />
          </button>
        </div>
      </div>
        </div>
      </div>

      {/* Divider between the controls and the screenshots */}
      <div
        className="frame-bleed mt-8 border-t border-light-border"
        aria-hidden
      />

      {/* Scroll track — bleeds to the frame rails so the screenshots run edge
          to edge, then continues off the right to scroll. */}
      <div
        ref={trackRef}
        className="frame-bleed mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pProjects.items.map((it) => (
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
