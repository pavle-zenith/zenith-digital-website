"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { cn } from "@/lib/utils";
import { wall, type WallCard } from "@/content/testimonials";

/**
 * Wall of love (Crisp register) — a masonry of five card types (video, quote,
 * rating, pull-quote, site-shot) hand-ordered in content so no two adjacent
 * cards share a type. CSS columns handle the masonry; every card is a solid
 * bordered tile. Video cards open a blurred lightbox player (sound only after
 * the explicit click, never on autoplay).
 */
// Site-shot cards are parked for now (owner request); the data stays in
// content so restoring them is a one-line change here.
const cards = wall.filter((c) => c.type !== "site");

export function WallOfLove() {
  const [active, setActive] = useState<number | null>(null);

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

  const activeCard = active !== null ? cards[active] : null;

  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {cards.map((card, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <Card card={card} onPlay={() => setActive(i)} />
          </div>
        ))}
      </div>

      {/* Blurred lightbox player */}
      {activeCard && activeCard.type === "video" ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-xl"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/20 text-white hover:bg-white/10"
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
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative aspect-[9/16] h-[80vh] max-w-full overflow-hidden rounded-[8px] border border-white/15 bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            {activeCard.video ? (
              <video
                src={activeCard.video}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            ) : activeCard.poster ? (
              <Image
                src={activeCard.poster}
                alt={activeCard.name}
                fill
                className="object-cover"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </Section>
  );
}

function Card({ card, onPlay }: { card: WallCard; onPlay: () => void }) {
  if (card.type === "video") {
    return (
      <button
        type="button"
        onClick={onPlay}
        className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[8px] border border-light-border text-left text-white"
      >
        {card.poster ? (
          <Image
            src={card.poster}
            alt={card.name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : card.video ? (
          <video
            src={card.video}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            aria-hidden
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-surface-2 to-surface" />
        )}

        {/* Legibility gradient + centered play */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-scrim via-scrim/70 to-transparent" />
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[6px] bg-black/40 backdrop-blur transition group-hover:bg-black/60">
          <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
        </span>

        {/* Bottom: name/role above the logo chip */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
          <div>
            <div className="flex items-center gap-1.5 font-display text-body-lg font-medium">
              {card.name}
              <VerifiedCheck className="text-white" />
            </div>
            <div className="text-body text-white/70">
              {[card.role, card.company].filter(Boolean).join(" - ")}
            </div>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-bg/55 px-3 py-1.5 backdrop-blur-md">
            <Image
              src={card.logo}
              alt={card.company}
              width={120}
              height={24}
              className="h-4 w-auto object-contain"
            />
          </span>
        </div>
      </button>
    );
  }

  if (card.type === "quote") {
    return (
      <figure className="rounded-[8px] border border-light-border bg-light-bg p-6">
        <figcaption className="flex items-center gap-3">
          {card.avatar ? (
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <Image
                src={card.avatar}
                alt={card.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
          ) : (
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-display font-medium text-accent-ink"
              aria-hidden
            >
              {card.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
          )}
          <span>
            <span className="flex items-center gap-1.5 font-display font-medium">
              {card.name}
              <VerifiedCheck className="text-light-text" />
            </span>
            <span className="block text-body text-accent">
              {[card.role, card.company].filter(Boolean).join(" - ")}
            </span>
          </span>
        </figcaption>
        <blockquote
          className={cn(
            "mt-4 text-body leading-relaxed",
            card.placeholder
              ? "italic text-light-muted"
              : "text-light-text",
          )}
        >
          {card.quote}
        </blockquote>
        {card.tag ? (
          <Link
            href={card.tag.href}
            className="mt-4 inline-flex items-center rounded-full border border-light-border px-3 py-1 font-mono text-[11px] uppercase track-label text-light-muted transition hover:bg-light-surface hover:text-light-text"
          >
            {card.tag.label}
          </Link>
        ) : null}
      </figure>
    );
  }

  if (card.type === "rating") {
    return (
      <figure className="rounded-[8px] border border-light-border bg-light-surface p-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-body-lg font-medium">Clutch</span>
          <span className="flex gap-1 text-accent" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} />
            ))}
          </span>
        </div>
        <blockquote className="mt-4 text-body-lg leading-snug text-light-text">
          {card.line}
        </blockquote>
      </figure>
    );
  }

  if (card.type === "pull") {
    return (
      <figure className="rounded-[8px] border border-light-border bg-light-bg p-8 text-center">
        <span
          className="font-display text-[3rem] font-medium leading-none text-accent-line"
          aria-hidden
        >
          &ldquo;
        </span>
        <blockquote className="mt-2 font-display text-h3 font-medium italic leading-snug text-balance">
          {card.line}
        </blockquote>
        <figcaption className="mt-4 flex items-center justify-center gap-1.5 text-body text-light-muted">
          {card.attribution}
          <VerifiedCheck className="text-light-text" />
        </figcaption>
      </figure>
    );
  }

  // Site-shot card — visual breather linking to the case work
  return (
    <Link
      href={card.href}
      className="group relative block aspect-[4/3] overflow-hidden rounded-[8px] border border-light-border"
    >
      <Image
        src={card.image}
        alt={`${card.client} website`}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full border border-white/15 bg-bg/55 px-3.5 py-1.5 font-display text-body font-medium text-white backdrop-blur-md">
        {card.client}
      </span>
    </Link>
  );
}

/** Filled five-point star for the rating cards. */
function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2l2.92 6.26 6.58.57-5 4.73 1.5 6.44L12 16.77 6 20l1.5-6.44-5-4.73 6.58-.57z" />
    </svg>
  );
}
