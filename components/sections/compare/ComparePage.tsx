import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { cardsOnPlatform, detailSlugs } from "@/content/case-studies";
import { compareHubRoutable } from "@/content/comparisons";
import type { ComparisonContent } from "@/content/comparisons";
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

        {/* The short answer: the passage AI answers lift, so it stands on
            its own, labelled, before anything else. */}
        <div className="type-card mx-auto mt-8 max-w-2xl rounded-card border border-light-border bg-light-bg/80 p-6 text-left backdrop-blur-sm md:p-7">
          <p className="font-mono text-label uppercase track-label text-light-muted">
            {t.shortAnswerLabel}
          </p>
          <p className="mt-2 text-body-lg font-medium leading-relaxed text-light-text">
            {data.hero.shortAnswer}
          </p>
          <p className="mt-4 font-mono text-label uppercase track-label text-light-muted">
            {t.updatedLabel} <time dateTime={data.updated}>{monthYear(data.updated)}</time>
          </p>
        </div>

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
 * The 12 criteria, in the template's order; a row the page leaves out is
 * skipped, never padded. A real table from md; on phones each row becomes a
 * block (criterion, then each platform's cell with its name), keeping the
 * table semantics for screen readers.
 */
function CompareTable({ data }: { data: ComparisonContent }) {
  const rows = t.criteria.filter((c) => data.table.rows[c.key]);
  const cell =
    "px-5 py-4 align-top text-body leading-relaxed text-light-text max-md:block max-md:px-0 max-md:py-0";
  const cellLabel =
    "mb-1 block font-mono text-label uppercase track-label text-light-muted md:hidden";

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24" id="comparison" className="scroll-mt-16">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.table.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {data.table.intro}
        </p>
      </div>

      <div className="type-card mt-10 overflow-hidden rounded-card border border-light-border md:mt-12">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{data.table.heading}</caption>
          <thead className="max-md:sr-only">
            <tr className="bg-light-surface">
              <th
                scope="col"
                className="w-[22%] px-5 py-4 font-mono text-label font-normal uppercase track-label text-light-muted"
              >
                {t.criterionColumn}
              </th>
              <th scope="col" className="w-[39%] px-5 py-4 font-display text-body-lg font-medium">
                {t.wixName}
              </th>
              <th scope="col" className="w-[39%] px-5 py-4 font-display text-body-lg font-medium">
                {data.rival.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ key, label }) => {
              const row = data.table.rows[key]!;
              return (
                <tr
                  key={key}
                  className="border-t border-light-border first:border-t-0 max-md:block max-md:space-y-3 max-md:px-5 max-md:py-5 md:first:border-t"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 align-top font-display text-body font-medium text-light-text max-md:block max-md:p-0"
                  >
                    {label}
                  </th>
                  <td className={cell}>
                    <span className={cellLabel}>{t.wixName}</span>
                    {row.wix}
                  </td>
                  <td className={cell}>
                    <span className={cellLabel}>{data.rival.name}</span>
                    {row.rival}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-mono text-label uppercase track-label text-light-muted">
        {t.lastCheckedLabel} <time dateTime={data.checked}>{monthYear(data.checked)}</time>
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Five questions, as editorial rows rather than another card grid: number
 * and question on the left, the answer and which way it points on the right.
 */
function FiveQuestions({ data }: { data: ComparisonContent }) {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.questions.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {data.questions.intro}
        </p>
      </div>

      <ol className="mt-10 border-b border-light-border md:mt-12">
        {data.questions.items.map((item, i) => (
          <li
            key={item.q}
            className="grid gap-4 border-t border-light-border py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12"
          >
            <div className="flex gap-4">
              <span className="font-mono text-label uppercase track-label text-light-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-h3 font-medium leading-snug tracking-tight">
                {item.q}
              </h3>
            </div>
            <div>
              <p className="max-w-[60ch] text-body-lg leading-relaxed text-light-text">
                {item.a}
              </p>
              <p
                className={cn(
                  "mt-4 inline-flex rounded-full border px-3 py-1 font-mono text-label uppercase track-label",
                  item.leans === "wix"
                    ? "border-accent-line bg-accent-subtle text-light-text"
                    : item.leans === "rival"
                      ? "border-light-border bg-light-surface text-light-text"
                      : "border-dashed border-light-border text-light-muted",
                )}
              >
                {item.leans === "wix"
                  ? t.leans.wix
                  : item.leans === "rival"
                    ? t.leans.rival(data.rival.name)
                    : t.leans.either}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
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
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <h2 className="max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {data.choose.heading}
      </h2>
      <div className="type-card mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 lg:grid-cols-3">
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
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.cost.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {data.cost.setup} {t.costMethod}
        </p>
      </div>

      <div className="type-card mt-10 overflow-hidden rounded-card border border-light-border md:mt-12">
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
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
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
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <ProjectCard
            key={c.slug}
            card={c}
            detail={detailSlugs.has(c.slug)}
            liveUrl={c.liveUrl}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ))}
      </div>

      {!data.rival.weBuildOnIt ? (
        <div className="type-card mt-8 flex flex-col gap-4 rounded-card border border-light-border bg-light-surface p-6 md:flex-row md:items-center md:justify-between md:p-7">
          <p className="max-w-2xl text-body-lg leading-relaxed text-light-text">
            {data.proof.rivalLine}
          </p>
          {data.rival.guide ? (
            <Link
              href={data.rival.guide.href}
              className="group inline-flex shrink-0 items-center gap-2 font-display text-body font-medium transition hover:text-accent"
            >
              {data.rival.guide.label}
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </Link>
          ) : null}
        </div>
      ) : null}
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/** Further reading: the migration guide, posts and industry pages. */
function Related({ data }: { data: ComparisonContent }) {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <h2 className="max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {data.related.heading}
      </h2>
      <div className="type-card mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-cols-2">
        {data.related.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col bg-light-bg p-6 transition hover:bg-light-surface md:p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text">
              <FeatureIcon name={item.icon} />
            </span>
            <span className="mt-6 font-mono text-label uppercase track-label text-light-muted">
              {item.kind}
            </span>
            <h3 className="mt-2 font-display text-h3 font-medium leading-snug tracking-tight">
              {item.label}
              {" "}
              <span className="btn-arrow whitespace-nowrap" aria-hidden>
                &rarr;
              </span>
            </h3>
            <p className="mt-3 text-body leading-relaxed text-light-muted">{item.desc}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Every vendor page the comparison cites, with what it was used for and the
 * date it was read: compact, but complete and linkable.
 */
function Sources({ data }: { data: ComparisonContent }) {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {t.sources.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {t.sources.intro}
        </p>
        <p className="mt-3 font-mono text-label uppercase track-label text-light-muted">
          {t.sources.checked} <time dateTime={data.checked}>{monthYear(data.checked)}</time>
        </p>
      </div>
      <ul className="type-card mt-10 grid border-t border-light-border md:mt-12 md:grid-cols-2 md:gap-x-12">
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
    </Section>
  );
}
