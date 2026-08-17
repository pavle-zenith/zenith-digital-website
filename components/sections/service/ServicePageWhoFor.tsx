"use client";

import { useEffect, useState } from "react";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { ServicePageContent, WhoForCard } from "@/content/service-pages";

const CYCLE_MS = 6000;

const DOT: Record<string, string> = {
  bad: "bg-[#E5484D]",
  warn: "bg-[#F5A623]",
  good: "bg-positive",
};

/**
 * "Who this is for" — light, the homepage free-audit split. Heading and intro
 * top-left, accordion tabs beneath them (auto-cycling on a timer, pause on
 * hover, click to jump), and a diagnostic card on the right that swaps with the
 * open tab. Named situations rather than benefits, so a reader can self-select
 * in one pass and see their own symptoms spelled out beside the description.
 */
export function ServicePageWhoFor({ data }: { data: ServicePageContent }) {
  const [open, setOpen] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = data.whoFor.items.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setInterval(() => setOpen((o) => (o + 1) % count), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const card = data.whoFor.items[open]?.card;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: heading, intro, accordion tabs */}
        <div
          className="flex flex-col"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <h2 className="max-w-lg font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {data.whoFor.heading}
          </h2>
          <p className="mt-4 max-w-md text-body-lg font-medium text-light-muted md:mt-5">
            {data.whoFor.intro}
          </p>

          <div className="mt-10 border-r border-t border-light-border">
            {data.whoFor.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.title} className="border-b border-light-border">
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className={cn(
                      "flex w-full items-center border-l-2 py-5 pl-5 pr-4 text-left transition",
                      isOpen ? "border-accent" : "border-light-border hover:pl-6",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-body-lg font-medium transition",
                        isOpen ? "text-light-text" : "text-light-muted",
                      )}
                    >
                      {item.title}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="border-l-2 border-accent pb-6 pl-5 pr-4 text-body leading-relaxed text-light-muted">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: the diagnostic card for the open situation */}
        <div className="flex items-center justify-center rounded-[8px] bg-light-surface p-5 sm:p-8 lg:p-12">
          {card ? <SituationCard card={card} /> : null}
        </div>
      </div>
    </Section>
  );
}

/**
 * Mock diagnostic card: one headline reading, then the symptoms with severity
 * dots. Same register as the homepage audit report, so the two read as the
 * same product rather than two visual systems.
 */
function SituationCard({ card }: { card: WhoForCard }) {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-[8px] border border-light-border bg-light-bg p-6">
        <p className="font-mono text-label uppercase track-label text-light-muted">
          {card.label}
        </p>
        <p className="mt-3 font-display text-h1 font-medium leading-none tracking-tight text-light-text">
          {card.value}
        </p>
        <p className="mt-2 text-body text-light-muted">{card.valueNote}</p>
      </div>

      <div className="mt-3 rounded-[8px] border border-light-border bg-light-bg p-6">
        <p className="mb-4 font-mono text-label uppercase track-label text-light-muted">
          What that looks like
        </p>
        <ul className="flex flex-col gap-4">
          {card.rows.map((row) => (
            <li key={row.text} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                  DOT[row.state],
                )}
              />
              <span className="text-body text-light-text">{row.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
