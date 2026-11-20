"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FilterTab } from "@/components/ui/FilterTab";

export type CompareListItem = {
  slug: string;
  rival: string;
  rivalName: string;
  title: string;
  /** The two platforms' marks, Wix Studio first. */
  logos: string[];
};

/**
 * The hub's comparison cards. Each card: the two platforms' marks, the
 * title and the link (owner, 20 Nov 2026: less text; the short answer is
 * the first thing on the page itself). The filter row appears only once
 * there are enough comparisons for it to help, one chip per platform that
 * has one, so a chip never empties the grid.
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
      {rivals.length > 3 ? (
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

      <div className="type-card mt-8 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:grid-cols-2">
        {shown.map((it) => (
          <Link
            key={it.slug}
            href={`/compare/${it.slug}`}
            className="group flex flex-col bg-light-bg p-6 transition hover:bg-light-surface md:p-8"
          >
            <span className="flex -space-x-2">
              {it.logos.map((src) => (
                <span
                  key={src}
                  className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-bg ring-2 ring-light-bg"
                >
                  <Image src={src} alt="" width={22} height={22} unoptimized className="h-[22px] w-[22px] object-contain" />
                </span>
              ))}
            </span>
            <h3 className="mt-6 font-display text-h3 font-medium leading-snug tracking-tight">
              {it.title}
            </h3>
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
