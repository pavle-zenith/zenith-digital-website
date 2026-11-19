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
    shortAnswer: c.hero.shortAnswer,
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

/** A project name, linked to its case study when it has one. */
function ProjectName({ slug }: { slug: string }) {
  const card = caseStudyCards.find((c) => c.slug === slug);
  if (!card) throw new Error(`compare hub: no project "${slug}"`);
  return detailSlugs.has(slug) ? (
    <Link
      href={`/case-studies/${slug}`}
      className="underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
    >
      {card.client}
    </Link>
  ) : (
    <span>{card.client}</span>
  );
}

/**
 * "Which platform fits which team": a table from md, a block per platform on
 * phones (the comparison pages' table pattern). Built-with names must carry
 * the platform's tag, so the table can't claim a build that isn't on record.
 */
function Fit() {
  const { fit } = hub;
  const cell =
    "px-5 py-4 align-top text-body leading-relaxed text-light-text max-md:block max-md:px-0 max-md:py-0";
  const cellLabel =
    "mb-1 block font-mono text-label uppercase track-label text-light-muted md:hidden";
  const linkClass =
    "group inline-flex items-center gap-1.5 font-display font-medium transition hover:text-accent";

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {fit.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {fit.intro}
        </p>
      </div>

      <div className="type-card mt-10 overflow-hidden rounded-card border border-light-border md:mt-12">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{fit.heading}</caption>
          <thead className="max-md:sr-only">
            <tr className="bg-light-surface">
              {[fit.columns.platform, fit.columns.bestIf, fit.columns.builtWith, fit.columns.compare].map(
                (label) => (
                  <th
                    key={label}
                    scope="col"
                    className="px-5 py-4 font-mono text-label font-normal uppercase track-label text-light-muted"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {fit.rows.map((row) => {
              const comparison = row.rival ? comparisonFor(row.rival) : undefined;
              if (row.built) {
                for (const slug of row.built.slugs) {
                  const card = caseStudyCards.find((c) => c.slug === slug);
                  if (!card || !onPlatform(card, row.built.platform)) {
                    throw new Error(
                      `compare hub: "${slug}" isn't tagged ${row.built.platform}`,
                    );
                  }
                }
              }
              return (
                <tr
                  key={row.name}
                  className="border-t border-light-border first:border-t-0 max-md:block max-md:space-y-3 max-md:px-5 max-md:py-5 md:first:border-t"
                >
                  <th
                    scope="row"
                    className="w-[18%] px-5 py-4 align-top font-display text-body-lg font-medium text-light-text max-md:block max-md:w-auto max-md:p-0"
                  >
                    {row.name}
                  </th>
                  <td className={`${cell} md:w-[34%]`}>
                    <span className={cellLabel}>{fit.columns.bestIf}</span>
                    {row.bestIf}
                  </td>
                  <td className={`${cell} md:w-[26%]`}>
                    <span className={cellLabel}>{fit.columns.builtWith}</span>
                    {row.built ? (
                      <span className="flex flex-wrap gap-x-2 gap-y-1">
                        {row.built.slugs.map((slug, i) => (
                          <span key={slug}>
                            <ProjectName slug={slug} />
                            {i < row.built!.slugs.length - 1 ? "," : ""}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="flex flex-col gap-1">
                        <span className="text-light-muted">{fit.moveOff}</span>
                        {/* The guide link, unless the compare column
                            already points at the same guide. */}
                        {row.guide && !(!comparison && row.link?.href === row.guide.href) ? (
                          <Link href={row.guide.href} className={linkClass}>
                            {row.guide.label}
                            <span aria-hidden className="btn-arrow">
                              &rarr;
                            </span>
                          </Link>
                        ) : null}
                      </span>
                    )}
                  </td>
                  {/* Its comparison once published; otherwise the row's
                      stand-in link; otherwise empty (and gone on phones). */}
                  <td
                    className={`${cell} md:w-[22%] ${!comparison && !row.link ? "max-md:hidden" : ""}`}
                  >
                    {comparison || row.link ? (
                      <span className={cellLabel}>{fit.columns.compare}</span>
                    ) : null}
                    {comparison ? (
                      <Link href={`/compare/${comparison.slug}`} className={linkClass}>
                        {comparison.hero.h1}
                        <span aria-hidden className="btn-arrow">
                          &rarr;
                        </span>
                      </Link>
                    ) : row.link ? (
                      <Link href={row.link.href} className={linkClass}>
                        {row.link.label}
                        <span aria-hidden className="btn-arrow">
                          &rarr;
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
      <p className="mt-4 max-w-3xl text-body leading-relaxed text-light-muted">{fit.note}</p>
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
          <PostTile key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
