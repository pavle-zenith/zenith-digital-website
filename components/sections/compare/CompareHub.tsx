import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PostTile } from "@/components/sections/blog/PostCard";
import { HeroTexture } from "@/components/sections/compare/ComparePage";
import { CompareList } from "@/components/sections/compare/CompareList";
import {
  caseStudyCards,
  detailSlugs,
  onPlatform,
} from "@/content/case-studies";
import { comparisonFor, routableComparisons } from "@/content/comparisons";
import { compareHub as hub } from "@/content/comparisons/hub";
import { platformLogo } from "@/content/comparisons/logos";
import type { PostCard } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

/**
 * /compare (resources brief, Part D): the hero, every comparison as a card
 * with platform chips, "which platform fits which team", the guides, FAQ and
 * the closing band. Only routable comparisons appear (published ones, plus
 * the rest in a preview build).
 */
export function CompareHub({ guides }: { guides: PostCard[] }) {
  return (
    <>
      <Hero />
      <List />
      <Fit />
      <Guides posts={guides} />
      <Faq data={{ ...hub.faq, ctas: [] }} />
      <CtaBanner data={hub.finalCta} />
    </>
  );
}

function Hero() {
  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="relative !pb-14 !pt-10 md:!pb-20 md:!pt-14"
    >
      <HeroTexture />
      <div className="relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-light-border bg-light-bg/80 py-1 pl-1 pr-3 font-mono text-label uppercase track-label text-light-muted">
          <span className="flex h-6 w-6 items-center justify-center rounded-[4px] border border-light-border bg-light-bg font-mono text-[9px] font-medium leading-none text-light-text">
            VS
          </span>
          {hub.hero.eyebrow}
        </span>
        <h1 className="mx-auto mt-8 max-w-4xl font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance md:mt-10">
          {hub.hero.h1}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted text-pretty">
          {hub.hero.lead}
        </p>
      </div>
    </Section>
  );
}

function List() {
  const items = routableComparisons.map((c) => ({
    slug: c.slug,
    rival: c.rival.key,
    rivalName: c.rival.name,
    title: c.hero.h1,
    logos: [platformLogo.wix, platformLogo[c.rival.key]].filter(Boolean),
  }));
  if (items.length === 0) return null;
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {hub.list.heading}
      </h2>
      <CompareList
        items={items}
        allLabel={hub.list.allLabel}
        readLabel={hub.list.readLabel}
      />
    </Section>
  );
}

/**
 * A project as a chip: the client, linked to its case study when it has
 * one, and its card's headline beside it, with the card's credit where a
 * result was shared ("with MOD Digital"), so a chip never claims more than
 * the case study does.
 */
function ProjectChip({ slug }: { slug: string }) {
  const card = caseStudyCards.find((c) => c.slug === slug);
  if (!card) throw new Error(`compare hub: no project "${slug}"`);
  const body = (
    <>
      <span className="font-medium text-light-text">{card.client}</span>
      <span className="text-light-muted">
        {card.metric}
        {card.metricCredit ? `, ${card.metricCredit}` : ""}
      </span>
    </>
  );
  const chip =
    "inline-flex flex-wrap items-baseline gap-x-1.5 rounded-[6px] border border-light-border bg-light-bg px-2 py-1 text-[0.8125rem] leading-snug";
  return detailSlugs.has(slug) ? (
    <Link href={`/case-studies/${slug}`} className={cn(chip, "transition hover:border-light-muted/60 hover:bg-light-surface")}>
      {body}
    </Link>
  ) : (
    <span className={chip}>{body}</span>
  );
}

/** A platform's mark in a small bordered tile. */
function PlatformMark({ logoKey }: { logoKey: string }) {
  const src = platformLogo[logoKey];
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg">
      {src ? <Image src={src} alt="" width={22} height={22} unoptimized className="h-[22px] w-[22px] object-contain" /> : null}
    </span>
  );
}

/**
 * "Which platform fits which team" (owner, 20 Nov 2026: "much simpler, less
 * text"): one row per platform with its mark, a one-line "best if", the
 * projects as chips and one link. A table from md, a block per platform on
 * phones. Built-with names must carry the platform's tag, so the table
 * can't claim a build that isn't on record.
 */
function Fit() {
  const { fit } = hub;
  // Column names on phones, for screen readers only: the line and the chips
  // read on their own, and seven repeats of each label was most of the text.
  const cellLabel = "sr-only";
  // Inline, so a link that wraps keeps its arrow on the last word.
  const linkClass =
    "group font-display font-medium underline decoration-light-border underline-offset-4 transition hover:decoration-light-text";

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">{fit.heading}</h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">{fit.intro}</p>
      </div>

      <div className="type-card mt-10 overflow-hidden rounded-card border border-light-border md:mt-12">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{fit.heading}</caption>
          <thead className="max-md:sr-only">
            <tr className="bg-light-surface">
              {[fit.columns.platform, fit.columns.bestIf, fit.columns.builtWith, fit.columns.compare].map((label) => (
                <th key={label} scope="col" className="px-5 py-3.5 font-mono text-label font-normal uppercase track-label text-light-muted">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fit.rows.map((row) => {
              const comparison = row.rival ? comparisonFor(row.rival) : undefined;
              if (row.built) {
                for (const slug of row.built.slugs) {
                  const card = caseStudyCards.find((c) => c.slug === slug);
                  if (!card || !onPlatform(card, row.built.platform)) {
                    throw new Error(`compare hub: "${slug}" isn't tagged ${row.built.platform}`);
                  }
                }
              }
              // One link per row: the comparison, else its guide (the shorter
              // label), else the row's own link.
              const link = comparison
                ? { label: comparison.hero.h1, href: `/compare/${comparison.slug}` }
                : (row.guide ?? row.link);
              return (
                <tr
                  key={row.name}
                  className="border-t border-light-border first:border-t-0 max-md:block max-md:space-y-4 max-md:px-5 max-md:py-5 md:first:border-t"
                >
                  <th scope="row" className="px-5 py-5 align-middle max-md:block max-md:p-0 md:w-[19%]">
                    <span className="flex items-center gap-3 font-display text-body-lg font-medium text-light-text">
                      <PlatformMark logoKey={row.rival ?? "wix"} />
                      {row.name}
                    </span>
                  </th>
                  <td className="px-5 py-5 align-middle text-[0.9375rem] leading-snug text-light-muted max-md:block max-md:p-0 md:w-[24%]">
                    <span className={cellLabel}>{fit.columns.bestIf}</span>
                    {row.bestIf}
                  </td>
                  <td className="px-5 py-5 align-middle max-md:block max-md:p-0 md:w-[41%]">
                    <span className={cellLabel}>{fit.columns.builtWith}</span>
                    {row.built ? (
                      <span className="flex flex-wrap gap-2">
                        {row.built.slugs.map((slug) => (
                          <ProjectChip key={slug} slug={slug} />
                        ))}
                      </span>
                    ) : (
                      <span className="text-body text-light-muted">{fit.moveOff}</span>
                    )}
                  </td>
                  <td className={cn("px-5 py-5 align-middle text-[0.9375rem] max-md:block max-md:p-0 md:w-[16%]", !link && "max-md:hidden")}>
                    {link ? (
                      <Link href={link.href} className={linkClass}>
                        {/* The last word and the arrow never part on a wrap. */}
                        {link.label.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="whitespace-nowrap">
                          {link.label.split(" ").slice(-1)[0]}
                          <span aria-hidden className="btn-arrow ml-1.5">
                            &rarr;
                          </span>
                        </span>
                      </Link>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/** The guide posts that are live, in the hub's order. */
function Guides({ posts }: { posts: PostCard[] }) {
  const ordered = hub.guides.slugs
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is PostCard => Boolean(p));
  if (ordered.length === 0) return null;
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {hub.guides.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {hub.guides.intro}
        </p>
      </div>
      {/* Columns follow the count, so a guide that isn't live yet never
          leaves an empty slot in the row. */}
      <div
        className={cn(
          "mt-10 grid gap-6 md:mt-12 md:grid-cols-2",
          ordered.length >= 4 && "lg:grid-cols-4",
          ordered.length === 3 && "lg:grid-cols-3",
        )}
      >
        {ordered.map((post) => (
          <PostTile key={post.slug} post={post} excerpt={false} />
        ))}
      </div>
    </Section>
  );
}
