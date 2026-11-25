"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Section } from "@/components/ui/Section";
import { projectShots } from "@/content/project-shots";

type Shot = { name: string; image: string };

/**
 * Completed-work track under the service hero. The header row is the hero's
 * proof stats in the case-study meta-strip register (hairline-divided,
 * stacking to a labelled column on phones) with the slider arrows on their
 * right; below, a full-bleed divider and the 4:3 shots bleeding to the frame
 * rails. Only the stats are page-supplied; the shots are every new case-study
 * thumbnail plus the original slider set (content/project-shots.ts).
 *
 * MIXED ORDER (owner, 25 Nov 2026: "always mix their order"). The server
 * HTML holds an order shuffled from the page's slug, so every service page
 * starts on different work, without JS too. After hydration the order is
 * reshuffled at random, so each visit differs. The cards are keyed by
 * position and stay where they are; only the shot inside each one changes,
 * so the mix never moves anything on the page (no layout shift).
 */
export function ProjectsSlider({
  stats,
  items = projectShots,
  seed = "",
}: {
  stats: string[];
  items?: Shot[];
  /** Seeds the server-rendered order: the page's slug. */
  seed?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState(() => shuffle(items, seeded(seed)));

  // A fresh mix on every visit, once on the client.
  useEffect(() => {
    setOrder(shuffle(items, Math.random));
  }, [items]);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Section tone="light" frameClassName="!pb-10 !pt-6 md:!pb-12 md:!pt-7">
      {/* Phones: the stats run the full width and the arrows sit under them.
          Side by side, the arrow block squeezed the stats column to about half
          the screen and wrapped every figure. */}
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
        <div className="flex shrink-0 gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollByCard(dir)}
              aria-label={dir === -1 ? "Previous projects" : "Next projects"}
              className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition hover:bg-light-surface"
            >
              <svg
                viewBox="0 0 24 24"
                className={dir === -1 ? "h-4 w-4 rotate-180" : "h-4 w-4"}
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

      {/* Divider between the stats strip and the screenshots */}
      <div
        className="frame-bleed mt-6 border-t border-light-border"
        aria-hidden
      />

      {/* Scroll track — bleeds to the frame rails so the screenshots run edge
          to edge, then continues off the right to scroll. */}
      {/* Focusable and labelled: a scroll region holding nothing focusable
          can't be scrolled from the keyboard otherwise (WCAG 2.1.1). */}
      <div
        ref={trackRef}
        role="region"
        aria-label="Projects"
        tabIndex={0}
        className="frame-bleed mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {order.map((it, i) => (
          <div
            // By position, not name: the card stays put and only its shot
            // changes when the order is mixed.
            key={i}
            data-card
            className="w-[320px] shrink-0 snap-start sm:w-[420px] lg:w-[520px]"
          >
            {/* Images only — 4:3 to match the source shots, nothing cropped. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-light-surface">
              <Image
                src={it.image}
                alt={`${it.name} website`}
                fill
                // The slide's own widths: 320px, 420px from sm, 520px from lg.
                sizes="(max-width: 639px) 320px, (max-width: 1023px) 420px, 520px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/** Fisher-Yates over a copy, drawing from `random`. */
function shuffle(items: Shot[], random: () => number): Shot[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** A repeatable random sequence from a string (FNV-1a hash into mulberry32). */
function seeded(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
