"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { detailSlugs, type CaseStudyCard } from "@/content/case-studies";

/** Track gap between cards, in px — also the arrow step's spacing term. */
const GAP = 24;

/**
 * The case-study slider, shared verbatim between the related-studies section
 * on /case-studies/[slug] and the featured-work strip on the service pages —
 * one component so the two can't drift. Two cards per view on desktop, one on
 * phones, square arrows stepping a full view. Cards are media-forward (shot,
 * client, the card's one-line story) and link to a detail page where one has
 * shipped, to the live site until then, matching the index grid.
 *
 * `allCta` closes the section with the full-width "All case studies" strip on
 * the inverted studio texture (the detail-page treatment). Without it the
 * section keeps its own bottom padding instead.
 */
export function CaseStudySlider({
  heading,
  items,
  allCta = false,
}: {
  heading: string;
  items: CaseStudyCard[];
  allCta?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  // Step one full view: cards-per-view is measured rather than assumed, so
  // the phone (one card) and desktop (two) both advance by exactly a page.
  const scrollByView = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    if (!card) {
      track.scrollBy({ left: dir * track.clientWidth, behavior: "smooth" });
      return;
    }
    const stride = card.offsetWidth + GAP;
    const perView = Math.max(1, Math.round(track.clientWidth / stride));
    track.scrollBy({ left: dir * stride * perView, behavior: "smooth" });
  };

  return (
    <Section
      tone="light"
      frameClassName={allCta ? "!pb-0 !pt-12 md:!pt-20" : "!py-12 md:!py-20"}
    >
      {/* Header: heading left, arrows right, sharing a baseline */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-8 md:mb-12">
        <h2 className="max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {heading}
        </h2>
        <div className="flex gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollByView(dir)}
              aria-label={
                dir === -1 ? "Previous case studies" : "Next case studies"
              }
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

      {/* Scroll track — two cards fill the frame width exactly, so a view step
          lands flush with the content edges. */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((c) => (
          <SliderCard key={c.slug} study={c} />
        ))}
      </div>

      {allCta ? (
        // Full-width strip CTA closing the section, on the inverted studio
        // texture the page heroes use. It draws only its top rule; the next
        // section's divide owns the boundary beneath it.
        <Link
          href="/case-studies"
          className="group frame-bleed relative isolate mt-12 flex items-center justify-between gap-6 overflow-hidden border-t border-light-border px-[clamp(20px,4vw,64px)] py-7 transition hover:bg-light-surface md:mt-16 md:py-9"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10"
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
          <span className="font-display text-h3 font-medium tracking-tight">
            All case studies
          </span>
          <span aria-hidden className="btn-arrow text-h3">
            &rarr;
          </span>
        </Link>
      ) : null}
    </Section>
  );
}

function SliderCard({ study: c }: { study: CaseStudyCard }) {
  const href = detailSlugs.has(c.slug) ? `/case-studies/${c.slug}` : c.liveUrl;

  const card = (
    <>
      {/* Shot, or the styled wordmark placeholder (never a broken image) */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-light-border bg-bg">
        {c.thumb ? (
          <Image
            src={c.thumb}
            alt={`${c.client} website`}
            fill
            sizes="(max-width: 640px) 88vw, 640px"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        ) : c.logo ? (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={c.logo}
              alt={c.client}
              width={220}
              height={56}
              className="h-8 w-auto max-w-[60%] object-contain opacity-90"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-h3 font-medium text-text">
              {c.client}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-display text-h3 font-medium leading-tight tracking-tight transition group-hover:text-accent">
          {c.client}
        </h3>
        <p className="mt-2 text-body leading-snug text-light-muted">
          {c.story}
        </p>
      </div>
    </>
  );

  // Two per view from sm up: each card is half the track minus half the gap.
  const shell =
    "group flex w-[88vw] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light-border bg-light-bg sm:w-[calc(50%-12px)]";

  if (!href) {
    return (
      <article data-card className={shell}>
        {card}
      </article>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link data-card href={href} className={shell}>
        {card}
      </Link>
    );
  }
  return (
    <a data-card href={href} target="_blank" rel="noopener" className={shell}>
      {card}
    </a>
  );
}
