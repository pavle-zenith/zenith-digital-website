import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { ProjectSlider } from "@/components/sections/industry/ProjectSlider";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ShortAnswer } from "@/components/sections/ShortAnswer";
import { cardsOnPlatform, detailSlugs } from "@/content/case-studies";
import { compareHubRoutable } from "@/content/comparisons";
import type { ComparisonContent } from "@/content/comparisons";
import type { ScoreEdge, ScoreRow, ScoreTag } from "@/content/comparisons/types";
import { compareTemplate as t } from "@/content/comparisons/template";
import { cn } from "@/lib/utils";

/**
 * One /compare/[slug] page (resources brief, Part B). The same nine blocks
 * in the same order on every comparison, so readers and AI answers find the
 * same thing in the same place:
 *
 *   hero with the short answer, the 12-criteria table, five questions that
 *   decide it, "so, which should you choose?", the year-one cost table,
 *   proof from the platform tags, FAQ, related, sources, closing CTA.
 *
 * Built from existing parts: the industry pages' textured hero, the light
 * hairline tables and grids, ProjectCard, Faq and CtaBanner. The sources are
 * a compact two-column list rather than SourcesGrid's cards: a comparison
 * cites twenty-odd vendor pages, and as cards they took a quarter of the page.
 * Every price on the page comes from the comparison's content file, which
 * reads ours from PACKAGES and the vendors' from ./vendors (dated, sourced).
 */
export function ComparePage({ data }: { data: ComparisonContent }) {
  return (
    <>
      <CompareHero data={data} />
      {/* Never inside the hero (owner, 20 Nov 2026): its own band after the CTAs. */}
      <ShortAnswer
        label={t.shortAnswerLabel}
        text={data.hero.shortAnswer}
        updated={data.updated}
        updatedLabel={t.updatedLabel}
      />
      <CompareTable data={data} />
      <FiveQuestions data={data} />
      <Choose data={data} />
      <CostTable data={data} />
      <Proof data={data} />
      <Faq data={{ ...data.faq, ctas: [] }} />
      <Related data={data} />
      <Sources data={data} />
      <CtaBanner
        data={{
          heading: t.finalCta.heading(data.rival.name),
          paragraph: t.finalCta.paragraph,
          cta: t.finalCta.cta,
          ctaSecondary: t.finalCta.ctaSecondary,
          image: t.finalCta.image,
        }}
      />
    </>
  );
}

/** "19 Nov 2026". */
function dayMonthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* ------------------------------------------------------------------ */

function CompareHero({ data }: { data: ComparisonContent }) {
  const eyebrow = (
    <>
      <span className="flex h-6 w-6 items-center justify-center rounded-[4px] border border-light-border bg-light-bg font-mono text-[9px] font-medium leading-none text-light-text">
        VS
      </span>
      {t.eyebrow}
    </>
  );
  const eyebrowClass =
    "inline-flex items-center gap-2 rounded-full border border-light-border bg-light-bg/80 py-1 pl-1 pr-3 font-mono text-label uppercase track-label text-light-muted";

  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="relative !pb-14 !pt-10 md:!pb-20 md:!pt-14"
    >
      <HeroTexture />
      <div className="relative text-center">
        {/* The eyebrow doubles as the way back to the hub once it's live. */}
        {compareHubRoutable ? (
          <Link
            href="/compare"
            className={cn(eyebrowClass, "transition hover:text-light-text")}
          >
            {eyebrow}
          </Link>
        ) : (
          <span className={eyebrowClass}>{eyebrow}</span>
        )}

        <h1 className="mx-auto mt-8 max-w-4xl font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance md:mt-10">
          {data.hero.h1}
        </h1>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Button cta={t.ctas.call} tone="light" />
          <Button cta={t.ctas.see} tone="light" />
        </div>
      </div>
    </Section>
  );
}

/** The industry pages' hero texture: the studio photo, inverted and washed. */
export function HeroTexture() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Image
        src="/textures/studio-texture.jpg"
        // The hero texture is the largest paint on a phone: load it first.
        priority
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.28] invert"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 45%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 88%, transparent) 50%, color-mix(in srgb, var(--color-light-bg) 45%, transparent) 100%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The scorecard (table simplify brief, 20 Nov 2026). One row per criterion:
 * short cells with a tag icon, the Edge pill, and a Details toggle holding
 * the verified sentences, so they stay in the page for search and AI answers
 * while the default view scans in one screen. From lg, every row shares one
 * five-column template, so an open row never shifts the columns; below lg
 * each row is a compact card. The tally under it is computed from `edge`.
 */
const SCORE_COLS =
  "lg:grid-cols-[minmax(0,1.7fr)_minmax(0,3fr)_minmax(0,3fr)_minmax(0,1.4fr)_6rem]";

function CompareTable({ data }: { data: ComparisonContent }) {
  const s = t.scorecard;
  const rival = data.rival.name;
  const count: Record<ScoreEdge, number> = { wix: 0, rival: 0, even: 0, depends: 0 };
  data.table.rows.forEach((row) => (count[row.edge] += 1));
  const tags = Object.keys(s.tags) as ScoreTag[];

  return (
    <Section tone="light" frameClassName="!py-10 md:!py-16" id="comparison" className="scroll-mt-[calc(4rem+var(--announce-h))]">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.table.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {data.table.intro}
        </p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] text-light-muted md:mt-10 md:gap-x-6">
        {tags.map((tag) => (
          <li key={tag} className="inline-flex items-center gap-1.5">
            <TagIcon tag={tag} />
            {s.tags[tag].label}
          </li>
        ))}
      </ul>

      <div className="mt-4 overflow-hidden rounded-card border border-light-border">
        {/* Column heads for sighted readers; each cell also names its
            platform for screen readers, so the heads are hidden from them. */}
        <div aria-hidden className={cn("hidden bg-light-surface lg:grid", SCORE_COLS)}>
          <span className="px-5 py-3 font-mono text-label uppercase track-label text-light-muted">
            {s.criterionColumn}
          </span>
          <span className="px-5 py-3 font-display text-body font-medium">{t.wixName}</span>
          <span className="px-5 py-3 font-display text-body font-medium">{rival}</span>
          <span className="px-5 py-3 font-mono text-label uppercase track-label text-light-muted">
            {s.edgeColumn}
          </span>
          <span />
        </div>
        <ul>
          {data.table.rows.map((row) => (
            <ScoreRowItem key={row.criterion} row={row} rival={rival} />
          ))}
        </ul>
      </div>

      <p className="mt-4 text-body font-medium text-light-text">{s.tally(count, rival)}</p>
      <p className="mt-2 font-mono text-label uppercase track-label text-light-muted">
        {t.lastCheckedLabel} <time dateTime={data.checked}>{monthYear(data.checked)}</time>
      </p>
    </Section>
  );
}

function ScoreRowItem({ row, rival }: { row: ScoreRow; rival: string }) {
  const s = t.scorecard;
  return (
    <li className="border-t border-light-border first:border-t-0 lg:first:border-t">
      <details className="group">
        <summary
          className={cn(
            "grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 px-4 py-3 transition-colors hover:bg-light-surface/50 lg:gap-0 lg:p-0 [&::-webkit-details-marker]:hidden",
            SCORE_COLS,
          )}
        >
          <span className="self-center font-display text-body font-medium text-light-text lg:px-5 lg:py-3">
            {row.criterion}
          </span>
          <ScoreCell name={t.wixName} cell={row.wix} wins={row.edge === "wix"} />
          <ScoreCell name={rival} cell={row.rival} wins={row.edge === "rival"} />
          {/* First line on phones, beside the criterion; its own column from lg. */}
          <span className="col-start-2 row-start-1 self-center lg:col-auto lg:row-auto lg:px-5 lg:py-3">
            <span className="sr-only">{s.edgeColumn}: </span>
            <EdgePill edge={row.edge} rival={rival} />
          </span>
          <span className="col-span-2 inline-flex items-center gap-1 self-center text-[0.8125rem] text-light-muted lg:col-auto lg:justify-end lg:px-5 lg:py-3">
            {s.details}
            <FeatureIcon
              name="chevron-down"
              className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
            />
          </span>
        </summary>
        <div className={cn("grid gap-2 px-4 pb-4 lg:gap-0 lg:px-0 lg:pb-4", SCORE_COLS)}>
          <p className="text-[0.9375rem] leading-relaxed text-light-muted lg:col-start-2 lg:px-5">
            <span className="font-medium text-light-text lg:sr-only">{t.wixName}: </span>
            {row.detail.wix}
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-light-muted lg:col-start-3 lg:px-5">
            <span className="font-medium text-light-text lg:sr-only">{rival}: </span>
            {row.detail.rival}
          </p>
        </div>
      </details>
    </li>
  );
}

/** A short cell: "{Platform}: " on phones (screen readers only from lg), the tag icon, the text. */
function ScoreCell({ name, cell, wins }: { name: string; cell: ScoreRow["wix"]; wins: boolean }) {
  return (
    <span
      className={cn(
        "col-span-2 min-w-0 text-[0.9375rem] leading-snug text-light-text lg:col-auto lg:flex lg:items-center lg:gap-2 lg:px-5 lg:py-3 lg:text-body",
        wins && "lg:bg-light-surface",
      )}
    >
      <span className="mr-1.5 text-light-muted lg:sr-only">{name}:</span>
      {/* Inline on phones, so a long value wraps under its label. */}
      {cell.tag ? (
        <TagIcon tag={cell.tag} className="mr-1.5 inline-block align-[-3px] lg:mr-0" />
      ) : null}
      <span className="min-w-0">{cell.short}</span>
      {cell.tag ? <span className="sr-only"> ({t.scorecard.tags[cell.tag].label})</span> : null}
    </span>
  );
}

function TagIcon({ tag, className }: { tag: ScoreTag; className?: string }) {
  return (
    <FeatureIcon
      name={t.scorecard.tags[tag].icon}
      className={cn("h-4 w-4 shrink-0 text-light-text", className)}
    />
  );
}

/** Wix Studio in the ink wash, the rival on a surface fill, Even and Depends dashed. */
function EdgePill({ edge, rival }: { edge: ScoreEdge; rival: string }) {
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-label uppercase track-label",
        edge === "wix"
          ? "border-accent-line bg-accent-subtle text-accent"
          : edge === "rival"
            ? "border-light-border bg-light-surface text-light-text"
            : "border-dashed border-light-border text-light-muted",
      )}
    >
      {t.scorecard.edge(edge, rival)}
    </span>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Five questions as a compact list (brief, 20 Nov 2026): the question, then
 * "Wix Studio if ..." and "{Rival} if ..." side by side. Where the old answer
 * adds a fact, it sits under a Details toggle on that row.
 */
function FiveQuestions({ data }: { data: ComparisonContent }) {
  const rival = data.rival.name;
  const q = t.questionsIf;
  return (
    <Section tone="light" frameClassName="!py-10 md:!py-16">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.questions.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {data.questions.intro}
        </p>
      </div>

      <ol className="mt-6 border-b border-light-border md:mt-10">
        {data.questions.items.map((item) => {
          const row = (
            <div className="grid gap-1.5 py-4 md:grid-cols-[minmax(0,3fr)_minmax(0,4.5fr)_minmax(0,4.5fr)] md:gap-8">
              <div>
                <h3 className="font-display text-body font-medium leading-snug text-light-text">
                  {item.q}
                </h3>
                {item.detail ? (
                  <span className="mt-1 inline-flex items-center gap-1 text-[0.8125rem] text-light-muted">
                    {q.details}
                    <FeatureIcon
                      name="chevron-down"
                      className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                    />
                  </span>
                ) : null}
              </div>
              <Outcome label={q.wix} text={item.wix} />
              <Outcome label={q.rival(rival)} text={item.rival} />
            </div>
          );
          return (
            <li key={item.q} className="border-t border-light-border">
              {item.detail ? (
                <details className="group">
                  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    {row}
                  </summary>
                  <p className="max-w-[68ch] pb-4 text-[0.9375rem] leading-relaxed text-light-muted md:-mt-1 md:ml-[calc((100%-4rem)*0.25+2rem)]">
                    {item.detail}
                  </p>
                </details>
              ) : (
                row
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

function Outcome({ label, text }: { label: string; text: string }) {
  return (
    <p className="flex gap-2 text-[0.9375rem] leading-snug text-light-text">
      <span aria-hidden className="arrow-glyph shrink-0 text-light-muted">
        &rarr;
      </span>
      <span>
        <span className="font-medium">{label}</span> {text}
      </span>
    </p>
  );
}

/* ------------------------------------------------------------------ */

function Choose({ data }: { data: ComparisonContent }) {
  const boxes = [
    { title: t.choose.wix, ...data.choose.wix, icon: "layers" },
    { title: t.choose.rival(data.rival.name), ...data.choose.rival, icon: "split" },
    { title: t.choose.custom, ...data.choose.custom, icon: "braces" },
  ];
  return (
    <Section tone="light" frameClassName="!py-10 md:!py-16">
      <h2 className="max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {data.choose.heading}
      </h2>
      <div className="type-card mt-8 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-10 lg:grid-cols-3">
        {boxes.map((b) => (
          <div key={b.title} className="flex flex-col bg-light-bg p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-surface text-light-text">
                <FeatureIcon name={b.icon} />
              </span>
              <span className="rounded-full border border-light-border px-3 py-1 font-mono text-label uppercase track-label text-light-muted">
                {b.label}
              </span>
            </div>
            <h3 className="mt-6 font-display text-h3 font-medium leading-snug tracking-tight">
              {b.title}
            </h3>
            <p className="mt-3 text-body leading-relaxed text-light-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function CostTable({ data }: { data: ComparisonContent }) {
  return (
    <Section tone="light" frameClassName="!py-10 md:!py-16">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.cost.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {data.cost.setup} {t.costMethod}
        </p>
      </div>

      <div className="type-card mt-8 overflow-hidden rounded-card border border-light-border md:mt-10">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{data.cost.heading}</caption>
          <thead className="max-md:sr-only">
            <tr className="bg-light-surface">
              <th
                scope="col"
                className="w-[28%] px-5 py-4 font-mono text-label font-normal uppercase track-label text-light-muted"
              >
                {t.costItemColumn}
              </th>
              <th scope="col" className="w-[36%] px-5 py-4 font-display text-body-lg font-medium">
                {t.wixName}
              </th>
              <th scope="col" className="w-[36%] px-5 py-4 font-display text-body-lg font-medium">
                {data.rival.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.cost.rows.map((row) => (
              <tr
                key={row.label}
                className="border-t border-light-border first:border-t-0 max-md:block max-md:space-y-3 max-md:px-5 max-md:py-5 md:first:border-t"
              >
                <th
                  scope="row"
                  className="px-5 py-4 align-top font-display text-body font-medium text-light-text max-md:block max-md:p-0"
                >
                  {row.label}
                </th>
                {[
                  { name: t.wixName, value: row.wix },
                  { name: data.rival.name, value: row.rival },
                ].map((c) => (
                  <td
                    key={c.name}
                    className="px-5 py-4 align-top text-body leading-relaxed text-light-text tabular-nums max-md:block max-md:p-0"
                  >
                    <span className="mb-1 block font-mono text-label uppercase track-label text-light-muted md:hidden">
                      {c.name}
                    </span>
                    {c.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-3xl text-body leading-relaxed text-light-muted">
        {t.costStepUp} {data.cost.note} {t.costCurrencyNote}
      </p>
      <p className="mt-2 font-mono text-label uppercase track-label text-light-muted">
        {t.lastCheckedLabel} <time dateTime={data.checked}>{monthYear(data.checked)}</time>
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Proof from the platform tags: up to three Wix Studio projects (case
 * studies first), the Legend Partner line, and for a platform we don't build
 * on, a plain line that we move sites off it, with its migration guide.
 */
function Proof({ data }: { data: ComparisonContent }) {
  const tagged = cardsOnPlatform("wix-studio");
  const cards = data.proof.picks
    ? data.proof.picks.map((slug) => {
        const card = tagged.find((c) => c.slug === slug);
        // Proof must come from the platform tags, never a hand-picked card
        // that isn't on record as a Wix Studio build.
        if (!card) {
          throw new Error(`compare/${data.slug}: "${slug}" isn't tagged wix-studio`);
        }
        return card;
      })
    : tagged.slice(0, 3);
  return (
    <Section tone="light" frameClassName="!py-10 md:!py-16">
      {/* The industry pages' slider: one card and a peek on phones, three
          across from lg (arrows hide there). Lighter than three stacked
          cards (brief, 20 Nov 2026). */}
      <ProjectSlider
        cards={cards}
        details={cards.filter((c) => detailSlugs.has(c.slug)).map((c) => c.slug)}
        labels={{ prev: t.proof.prev, next: t.proof.next, region: data.proof.heading }}
        showIndustry
      >
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.proof.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {t.proof.legend}{" "}
          <a
            href={t.proof.legendHref}
            target="_blank"
            rel="noopener"
            className="text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
          >
            {t.proof.legendLink}
          </a>
        </p>
        {!data.rival.weBuildOnIt ? (
          <p className="mt-3 text-body leading-relaxed text-light-text">
            {data.proof.rivalLine}{" "}
            {data.rival.guide ? (
              <Link
                href={data.rival.guide.href}
                className="group inline-flex items-center gap-1.5 whitespace-nowrap font-medium underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
              >
                {data.rival.guide.label}
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </Link>
            ) : null}
          </p>
        ) : null}
      </ProjectSlider>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/** Further reading: the migration guide, posts and industry pages. */
function Related({ data }: { data: ComparisonContent }) {
  return (
    <Section tone="light" frameClassName="!py-10 md:!py-16">
      <h2 className="max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {data.related.heading}
      </h2>
      {/* A compact strip (brief, 20 Nov 2026): four across from lg, two from
          sm; phones get the name and kind only, as a list. */}
      <div className="type-card mt-8 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
        {data.related.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-4 bg-light-bg p-4 transition hover:bg-light-surface sm:flex-col sm:items-start sm:gap-0 sm:p-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text">
              <FeatureIcon name={item.icon} />
            </span>
            <span className="min-w-0 sm:mt-5">
              <span className="block font-mono text-label uppercase track-label text-light-muted">
                {item.kind}
              </span>
              <span className="mt-1 block font-display text-body-lg font-medium leading-snug tracking-tight">
                {item.label}{" "}
                <span className="btn-arrow whitespace-nowrap" aria-hidden>
                  &rarr;
                </span>
              </span>
              <span className="mt-2 hidden text-[0.875rem] leading-relaxed text-light-muted sm:block">
                {item.desc}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Every vendor page the comparison cites, folded into one closed toggle at
 * the foot of the page (brief, 20 Nov 2026): the links stay in the page and
 * in the Article schema's citations, without taking a screen of their own.
 */
function Sources({ data }: { data: ComparisonContent }) {
  return (
    <Section tone="light" frameClassName="!py-10 md:!py-14">
      {/* A named group: the links' own `group` drives their arrow nudge. */}
      <details className="group/sources">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
          <h2 className="font-display text-h3 font-medium leading-snug tracking-tight">
            {t.sources.summary(data.sources.length, dayMonthYear(data.checked))}
          </h2>
          <FeatureIcon
            name="chevron-down"
            className="h-5 w-5 shrink-0 text-light-muted transition-transform duration-200 group-open/sources:rotate-180"
          />
        </summary>
        <p className="mt-4 max-w-3xl text-body leading-relaxed text-light-muted">
          {t.sources.intro}
        </p>
        <ul className="type-card mt-6 grid border-t border-light-border md:grid-cols-2 md:gap-x-12">
          {data.sources.map((source) => (
            <li key={source.href} className="border-b border-light-border py-3">
              <a
                href={source.href}
                target="_blank"
                rel="noopener nofollow"
                className="group inline-flex items-baseline gap-1.5 font-display text-body font-medium text-light-text transition hover:text-accent"
              >
                {source.label}
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </a>
              <p className="mt-0.5 text-[0.8125rem] leading-snug text-light-muted">
                {source.note}
              </p>
            </li>
          ))}
        </ul>
      </details>
    </Section>
  );
}
