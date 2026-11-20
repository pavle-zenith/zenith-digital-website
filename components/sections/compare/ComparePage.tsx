import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { ProjectSlider } from "@/components/sections/industry/ProjectSlider";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ShortAnswer } from "@/components/sections/ShortAnswer";
import { QuestionDeck } from "@/components/sections/compare/QuestionDeck";
import { CompareGrid, criterionIcon } from "@/components/sections/compare/CompareGrid";
import { DetailToggle } from "@/components/sections/compare/DetailToggle";
import { platformLogo } from "@/content/comparisons/logos";
import { cardsOnPlatform, detailSlugs } from "@/content/case-studies";
import { compareHubRoutable } from "@/content/comparisons";
import type { ComparisonContent } from "@/content/comparisons";
import type { ScoreEdge } from "@/content/comparisons/types";
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
  // Both platforms' marks in place of a "VS" chip (owner, 20 Nov 2026).
  const marks = [
    { src: platformLogo.wix, name: t.wixName },
    { src: platformLogo[data.rival.key], name: data.rival.name },
  ].filter((m) => m.src);
  const eyebrow = (
    <>
      {/* Side by side, not overlapped: the Wix mark is a wordmark and an
          overlap clipped its X. */}
      <span className="flex gap-1">
        {marks.map((m) => (
          <span
            key={m.name}
            className="flex h-7 w-7 items-center justify-center rounded-[5px] border border-light-border bg-light-bg"
          >
            <Image src={m.src} alt="" width={16} height={16} unoptimized className="h-4 w-4 object-contain" />
          </span>
        ))}
      </span>
      {t.eyebrow}
    </>
  );
  const eyebrowClass =
    "inline-flex items-center gap-2.5 rounded-full border border-light-border bg-light-bg/80 py-1 pl-1 pr-3.5 font-mono text-label uppercase track-label text-light-muted";

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
 * The scorecard (owner, 20 Nov 2026: "more cleanly and spaced out"): the
 * criteria down the left, each platform its own column card under its logo,
 * the edge set in full ink, and one "Show details" switch for the verified
 * sentences instead of a toggle per row. Then the tally, computed from the
 * rows, never typed.
 */
function CompareTable({ data }: { data: ComparisonContent }) {
  const s = t.scorecard;
  const rival = data.rival.name;
  const count: Record<ScoreEdge, number> = { wix: 0, rival: 0, even: 0, depends: 0 };
  data.table.rows.forEach((row) => (count[row.edge] += 1));

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

      <div className="mt-8 md:mt-10">
        <DetailToggle show={s.showDetails} hide={s.hideDetails}>
          <CompareGrid
            caption={data.table.heading}
            edgeLabel={s.edgeColumn}
            columns={[
              { name: t.wixName, logo: platformLogo.wix },
              { name: rival, logo: platformLogo[data.rival.key] },
            ]}
            rows={data.table.rows.map((row) => ({
              label: row.criterion,
              icon: criterionIcon(row.criterion),
              cells: [
                { text: row.wix.short, detail: row.detail.wix, edge: row.edge === "wix" },
                { text: row.rival.short, detail: row.detail.rival, edge: row.edge === "rival" },
              ],
            }))}
          />
        </DetailToggle>
      </div>

      <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="text-body font-medium text-light-text">{s.tally(count, rival)}</span>
        <span className="font-mono text-label uppercase track-label text-light-muted">
          {t.lastCheckedLabel} <time dateTime={data.checked}>{monthYear(data.checked)}</time>
        </span>
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Five questions as a slide deck (owner, 20 Nov 2026): one question per
 * slide, "Wix Studio if ..." or "{Rival} if ...", then a last slide that
 * tallies the picks into this page's own verdict. The deck is a client
 * island; every question and answer is still in the server HTML.
 */
function FiveQuestions({ data }: { data: ComparisonContent }) {
  const rival = data.rival.name;
  const d = t.deck;
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
      <div className="mt-8 md:mt-10">
        <QuestionDeck
          items={data.questions.items}
          choose={{ wix: data.choose.wix, rival: data.choose.rival }}
          copy={{
            progress: d.progress,
            of: d.of,
            result: d.result,
            prev: d.prev,
            next: d.next,
            wixIf: t.questionsIf.wix,
            rivalIf: t.questionsIf.rival(rival),
            wixName: t.wixName,
            rivalName: rival,
            yourAnswers: d.yourAnswers,
            leans: { wix: d.leans(t.wixName), rival: d.leans(rival), split: d.split },
            splitBody: d.splitBody,
            tally: d.tally,
            restart: d.restart,
            verdict: { label: d.verdict, href: "#choose" },
            cta: d.cta,
          }}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Choose({ data }: { data: ComparisonContent }) {
  const boxes = [
    { title: t.choose.wix, ...data.choose.wix },
    { title: t.choose.rival(data.rival.name), ...data.choose.rival },
    { title: data.choose.customTitle ?? t.choose.custom, ...data.choose.custom },
  ];
  return (
    <Section
      tone="light"
      id="choose"
      frameClassName="!py-10 md:!py-16"
      className="scroll-mt-[calc(4rem+var(--announce-h))]"
    >
      <h2 className="max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {data.choose.heading}
      </h2>
      <div className="type-card mt-8 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-10 lg:grid-cols-3">
        {boxes.map((b) => (
          <div key={b.title} className="flex flex-col bg-light-bg p-6 md:p-8">
            {/* The label as a quiet caption: no icon tile or pill (owner,
                20 Nov 2026: less text, fewer boxes). */}
            <p className="font-mono text-label uppercase track-label text-light-muted">{b.label}</p>
            <h3 className="mt-3 font-display text-h3 font-medium leading-snug tracking-tight">
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
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">{data.cost.setup}</p>
      </div>

      <div className="mt-8 md:mt-10">
        <CompareGrid
          caption={data.cost.heading}
          columns={[
            { name: t.wixName, logo: platformLogo.wix },
            { name: data.rival.name, logo: platformLogo[data.rival.key] },
          ]}
          rows={data.cost.rows.map((row) => ({
            label: row.label,
            icon: criterionIcon(row.label),
            cells: [{ text: row.wix }, { text: row.rival }],
          }))}
        />
      </div>
      {/* The method, the step-up plan and the currency note, folded under
          the table (owner, 20 Nov 2026: less text). Still in the HTML. */}
      <details className="group/costnote mt-6 max-w-3xl">
        <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-1 text-body font-medium text-light-text">
            {t.costNotes}
            <FeatureIcon
              name="chevron-down"
              className="h-4 w-4 text-light-muted transition-transform duration-200 group-open/costnote:rotate-180"
            />
          </span>
          <span className="font-mono text-label uppercase track-label text-light-muted">
            {t.lastCheckedLabel} <time dateTime={data.checked}>{monthYear(data.checked)}</time>
          </span>
        </summary>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-light-muted">
          {t.costMethod} {t.costStepUp} {data.cost.note} {t.costCurrencyNote}
        </p>
      </details>
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
  // A platform we also build on: our projects on it follow the Wix Studio ones.
  const rivalPlatform = data.rival.weBuildOnIt ? data.rival.platform : undefined;
  if (rivalPlatform && data.proof.rivalPicks) {
    const onRival = cardsOnPlatform(rivalPlatform);
    for (const slug of data.proof.rivalPicks) {
      const card = onRival.find((c) => c.slug === slug);
      if (!card) {
        throw new Error(`compare/${data.slug}: "${slug}" isn't tagged ${rivalPlatform}`);
      }
      cards.push(card);
    }
  }
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
