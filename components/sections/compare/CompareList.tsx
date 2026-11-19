"use client";

import Link from "next/link";
import { useState } from "react";

import { FilterTab } from "@/components/ui/FilterTab";

export type CompareListItem = {
  slug: string;
  rival: string;
  rivalName: string;
  title: string;
  shortAnswer: string;
};

/**
 * The hub's comparison cards with a filter chip per platform (only platforms
 * that have a comparison, so a chip never empties the grid). Each card: the
 * VS mark, the title, the page's short answer, and the link.
 */
export function CompareList({
  items,
  allLabel,
  readLabel,
}: {
  items: CompareListItem[];
  allLabel: string;
  readLabel: string;
}) {
  const [rival, setRival] = useState<string | null>(null);
  const rivals = items.filter(
    (it, i) => items.findIndex((x) => x.rival === it.rival) === i,
  );
  const shown = rival ? items.filter((it) => it.rival === rival) : items;

  return (
    <>
      {rivals.length > 1 ? (
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] max-lg:mx-[calc(-1*clamp(20px,4vw,64px))] max-lg:px-[clamp(20px,4vw,64px)] lg:flex-wrap lg:overflow-visible lg:pb-0 md:mt-10 [&::-webkit-scrollbar]:hidden">
          <FilterTab active={rival === null} onClick={() => setRival(null)}>
            {allLabel}
          </FilterTab>
          {rivals.map((it) => (
            <FilterTab
              key={it.rival}
              active={rival === it.rival}
              onClick={() => setRival(it.rival)}
            >
              {it.rivalName}
            </FilterTab>
          ))}
        </div>
      ) : null}

      <div className="type-card mt-6 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:grid-cols-2">
        {shown.map((it) => (
          <Link
            key={it.slug}
            href={`/compare/${it.slug}`}
            className="group flex flex-col bg-light-bg p-6 transition hover:bg-light-surface md:p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-surface font-mono text-[11px] font-medium leading-none text-light-text">
              VS
            </span>
            <h3 className="mt-6 font-display text-h3 font-medium leading-snug tracking-tight">
              {it.title}
            </h3>
            <p className="mt-3 text-body leading-relaxed text-light-muted">
              {it.shortAnswer}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-body font-medium transition group-hover:text-accent">
              {readLabel}
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </span>
          </Link>
        ))}
        {/* Keeps the block rectangular on an odd count. */}
        {shown.length % 2 === 1 ? (
          <div aria-hidden className="hidden bg-light-bg md:block" />
        ) : null}
      </div>
    </>
  );
}
