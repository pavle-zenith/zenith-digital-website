"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { CARD_LIFT, CardWash } from "@/components/sections/pricing/cardStyles";
import { cn } from "@/lib/utils";

type Side = "wix" | "rival";

export type DeckCopy = {
  progress: string;
  of: string;
  result: string;
  prev: string;
  next: string;
  wixIf: string;
  rivalIf: string;
  wixName: string;
  rivalName: string;
  yourAnswers: string;
  leans: { wix: string; rival: string; split: string };
  splitBody: string;
  tally: string;
  restart: string;
  verdict: { label: string; href: string };
  cta: { label: string; href: string };
};

export type DeckQuestion = {
  q: string;
  wix: string;
  rival: string;
  detail?: string;
};

/**
 * "Five questions that decide it" as a slide deck (owner, 20 Nov 2026): one
 * question per slide, two answers to pick from, and a last slide that tallies
 * the picks into a lean, using the page's own "which should you choose"
 * wording. Picking an answer moves to the next slide; the arrows step back
 * and forth.
 *
 * Every slide, question and answer is in the server HTML; only the picks are
 * client state. Off-screen slides are inert, a live region reads out where
 * you are, and focus moves to each new slide's question.
 */
export function QuestionDeck({
  items,
  copy,
  choose,
}: {
  items: DeckQuestion[];
  copy: DeckCopy;
  choose: {
    wix: { label: string; body: string };
    rival: { label: string; body: string };
  };
}) {
  const total = items.length;
  const [active, setActive] = useState(0);
  const [picks, setPicks] = useState<(Side | null)[]>(() =>
    items.map(() => null),
  );
  const heads = useRef<(HTMLElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moved = useRef(false);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  // Focus the new slide's heading after a move (not on first render).
  useEffect(() => {
    if (!moved.current) return;
    heads.current[active]?.focus({ preventScroll: true });
  }, [active]);

  const go = (i: number) => {
    if (timer.current) clearTimeout(timer.current);
    moved.current = true;
    setActive(Math.max(0, Math.min(total, i)));
  };

  const pick = (i: number, side: Side) => {
    setPicks((p) => p.map((v, j) => (j === i ? side : v)));
    if (timer.current) clearTimeout(timer.current);
    // A beat to see the choice land, then on to the next slide.
    timer.current = setTimeout(() => go(i + 1), 450);
  };

  const wix = picks.filter((p) => p === "wix").length;
  const rival = picks.filter((p) => p === "rival").length;
  const lean: Side | "split" =
    wix > rival ? "wix" : rival > wix ? "rival" : "split";
  const onResult = active === total;

  const arrow = (dir: -1 | 1) => {
    const disabled = dir === -1 ? active === 0 : onResult;
    return (
      <button
        type="button"
        onClick={() => go(active + dir)}
        disabled={disabled}
        aria-label={dir === -1 ? copy.prev : copy.next}
        aria-controls="question-deck"
        className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-border bg-bg text-text transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-35"
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
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    );
  };

  return (
    // Less flat (owner, 20 Nov 2026): two slides peek out under the card so
    // it reads as a deck, the card lifts off the page like the pricing
    // cards, and a navy bar carries the progress.
    <div className="relative pb-5 md:pb-6">
      <div
        aria-hidden
        className="absolute inset-x-8 bottom-0 top-8 rounded-card border border-light-border bg-light-surface md:inset-x-14"
      />
      <div
        aria-hidden
        className="absolute inset-x-4 bottom-2.5 top-4 rounded-card border border-light-border bg-light-bg md:inset-x-7 md:bottom-3"
      />
      <div
        className={cn(
          "type-card relative overflow-hidden rounded-card border border-light-border bg-light-bg",
          CARD_LIFT,
        )}
      >
        {/* Top bar: where you are, the progress, the arrows. */}
        <div className="tone-dark flex items-center justify-between gap-4 bg-bg px-5 py-3 text-text md:px-8">
          <p
            className="font-mono text-label uppercase track-label text-text-muted"
            aria-live="polite"
          >
            {onResult
              ? copy.result
              : `${copy.progress} ${active + 1} ${copy.of} ${total}`}
          </p>
          <div className="flex items-center gap-4">
            <ol className="hidden items-center gap-1.5 sm:flex" aria-hidden>
              {items.map((item, i) => (
                <li key={item.q}>
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => go(i)}
                    className={cn(
                      "block h-1.5 w-7 rounded-[2px] transition-colors",
                      i === active
                        ? "bg-white"
                        : picks[i]
                          ? "bg-white/45"
                          : "bg-white/15 hover:bg-white/30",
                    )}
                  />
                </li>
              ))}
            </ol>
            <div className="flex gap-2">
              {arrow(-1)}
              {arrow(1)}
            </div>
          </div>
        </div>

        {/* The slides, side by side; the track slides one width per step.
          overflow-clip, not hidden: a hidden box can still be scrolled
          sideways by focus landing on a half-visible slide, which left the
          deck stuck 20px off. A clipped box can't scroll at all. */}
        <div className="relative overflow-clip">
          <CardWash />
          <div
            id="question-deck"
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {items.map((item, i) => {
              const here = i === active;
              const chosen = picks[i];
              return (
                <section
                  key={item.q}
                  inert={!here}
                  aria-hidden={!here}
                  aria-labelledby={`deck-q-${i}`}
                  className="flex w-full shrink-0 flex-col justify-center px-5 py-8 md:px-12 md:py-14"
                >
                  <p className="font-mono text-label uppercase track-label text-light-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    id={`deck-q-${i}`}
                    ref={(el) => {
                      heads.current[i] = el;
                    }}
                    tabIndex={-1}
                    className="mt-3 max-w-3xl font-display text-[clamp(1.625rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-tight text-balance outline-none"
                  >
                    {item.q}
                  </h3>

                  <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-2">
                    {(["wix", "rival"] as const).map((side) => {
                      const on = chosen === side;
                      return (
                        <button
                          key={side}
                          type="button"
                          aria-pressed={on}
                          onClick={() => pick(i, side)}
                          className={cn(
                            "relative flex flex-col items-start rounded-card border p-5 text-left transition duration-200 md:p-6",
                            on
                              ? "border-accent bg-accent text-accent-ink shadow-[0_1px_2px_rgba(2,1,58,0.1),0_14px_28px_-14px_rgba(2,1,58,0.55)]"
                              : cn(
                                  "bg-light-bg shadow-[0_1px_2px_rgba(10,16,32,0.04),0_8px_20px_-12px_rgba(10,16,32,0.2)] hover:-translate-y-0.5 hover:border-light-muted/60 hover:shadow-[0_1px_2px_rgba(10,16,32,0.05),0_16px_32px_-14px_rgba(10,16,32,0.28)] motion-reduce:hover:translate-y-0",
                                  chosen
                                    ? "border-light-border text-light-muted"
                                    : "border-light-border text-light-text",
                                ),
                          )}
                        >
                          <span
                            className={cn(
                              "font-mono text-label uppercase track-label",
                              on ? "text-accent-ink/70" : "text-light-muted",
                            )}
                          >
                            {side === "wix" ? copy.wixIf : copy.rivalIf}
                          </span>
                          <span className="mt-2 text-body-lg font-medium leading-snug">
                            {side === "wix" ? item.wix : item.rival}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {item.detail ? (
                    <p className="mt-5 max-w-[68ch] text-[0.875rem] leading-relaxed text-light-muted">
                      {item.detail}
                    </p>
                  ) : null}
                </section>
              );
            })}

            {/* The result: the picks tallied into a lean. */}
            <section
              inert={!onResult}
              aria-hidden={!onResult}
              aria-labelledby="deck-result"
              className="flex w-full shrink-0 flex-col justify-center px-5 py-8 md:px-12 md:py-14"
            >
              <p className="font-mono text-label uppercase track-label text-light-muted">
                {copy.yourAnswers}
              </p>
              {/* All three verdicts share one grid cell, only the current one
                  visible, so the slide (and with it the deck, which takes its
                  tallest slide's height) is the same height from the first
                  render, whatever the answers (owner, 20 Nov 2026: no jumps). */}
              <div className="grid">
                {(["wix", "rival", "split"] as const).map((v) => {
                  const shown = v === lean;
                  return (
                    <div
                      key={v}
                      aria-hidden={!shown}
                      className={cn("[grid-area:1/1]", !shown && "invisible")}
                    >
                      <h3
                        id={shown ? "deck-result" : undefined}
                        ref={
                          shown
                            ? (el) => {
                                heads.current[total] = el;
                              }
                            : undefined
                        }
                        tabIndex={shown ? -1 : undefined}
                        className="mt-3 max-w-3xl font-display text-[clamp(1.625rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-tight text-balance outline-none"
                      >
                        {copy.leans[v]}
                      </h3>

                      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <ol className="flex gap-1.5" aria-hidden>
                          {picks.map((p, i) => (
                            <li
                              key={i}
                              className={cn(
                                "h-2 w-9 rounded-[2px]",
                                p === "wix"
                                  ? "bg-accent"
                                  : p === "rival"
                                    ? "bg-light-muted"
                                    : "bg-light-border",
                              )}
                            />
                          ))}
                        </ol>
                        <p className="font-mono text-label uppercase track-label text-light-muted">
                          {copy.tally
                            .replace("{wix}", `${copy.wixName} ${wix}`)
                            .replace("{rival}", `${copy.rivalName} ${rival}`)}
                        </p>
                      </div>

                      {v === "split" ? (
                        <p className="mt-6 max-w-[62ch] text-body-lg leading-relaxed text-light-muted">
                          {copy.splitBody}
                        </p>
                      ) : (
                        <div className="mt-6 max-w-[62ch]">
                          <span className="inline-flex rounded-full border border-light-border px-3 py-1 font-mono text-label uppercase track-label text-light-muted">
                            {choose[v].label}
                          </span>
                          <p className="mt-3 text-body-lg leading-relaxed text-light-muted">
                            {choose[v].body}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  cta={{ label: copy.cta.label, href: copy.cta.href }}
                  tone="light"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPicks(items.map(() => null));
                    go(0);
                  }}
                  className="inline-flex w-full items-center justify-center rounded-[6px] border border-light-border px-6 py-3 text-body font-medium text-light-text transition hover:bg-light-surface sm:w-auto"
                >
                  {copy.restart}
                </button>
                <a
                  href={copy.verdict.href}
                  className="group inline-flex items-center justify-center gap-1.5 text-body font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text sm:ml-2"
                >
                  {copy.verdict.label}
                  <span aria-hidden className="btn-arrow">
                    &rarr;
                  </span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
