import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { WorkStrip } from "@/components/sections/WorkStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { cn } from "@/lib/utils";
import { TransfersTable } from "./TransfersTable";
import {
  GUIDE_ASIDE_GRID,
  GUIDE_SECTION_FRAME,
  GuideAside,
  GuideContentCol,
  guideAsideRow,
} from "./GuideAside";
import type {
  LongFormBlock,
  MigrationGuideContent,
} from "@/content/migration-guides";
import type { Tone } from "@/lib/types";

/**
 * The migration guide template — /services/[platform]-to-wix-studio.
 *
 * THE LAYOUT PRINCIPLE. The page alternates two treatments. Long stretches of
 * reading sit in a single column at the 68ch measure with a sticky jump-to
 * list beside them, like a long article. Between them, designed sections break
 * the rhythm and carry the things worth looking at.
 *
 * TONE RHYTHM: the three long-form sections land light, dark, light, so no two
 * adjacent reading stretches share a background.
 */
export function MigrationGuide({ data }: { data: MigrationGuideContent }) {
  return (
    <>
      <GuideHero data={data} />
      <GuideStats data={data} />
      <GuideFit data={data} />
      <TransfersTable data={data} />

      <LongForm
        idPrefix="stage"
        navLabel="Jump to"
        heading={data.steps.heading}
        intro={data.steps.intro}
        items={data.steps.items}
        tone="light"
        numbered
      />
      {/* Proof between two stretches of reading: the testimonials band and the
          logo marquee are built to sit together (ClientLogos draws the rule
          that closes the band above it). */}
      <Testimonials />
      <ClientLogos />

      <LongForm
        idPrefix="seo"
        navLabel="Jump to"
        heading={data.seoMechanics.heading}
        intro={data.seoMechanics.intro}
        items={data.seoMechanics.items}
        tone="dark"
      />
      <GuideAuditCta data={data} />

      <LongForm
        idPrefix="mistake"
        navLabel="Jump to"
        heading={data.mistakes.heading}
        intro={data.mistakes.intro}
        items={data.mistakes.items}
        tone="light"
      />

      <GuideLogistics data={data} />
      {data.proof ? (
        <WorkStrip
          slugs={data.proof.workSlugs}
          heading={data.proof.heading}
          intro={data.proof.intro}
        />
      ) : null}
      <Faq data={data.faq} />
      <GuideRelated data={data} />
      <CtaBanner data={data.finalCta} />
    </>
  );
}

/** Stable anchor id from a block title, scoped by section. */
function anchorId(prefix: string, title: string) {
  return `${prefix}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

/* ------------------------------------------------------------------ *
 * Long-form treatment
 * ------------------------------------------------------------------ */

/**
 * A long-form section: centred heading, then a reading column at 68ch with a
 * sticky jump-to list beside it. The column and its list are centred together,
 * so the reading measure sits in the middle of the page rather than hard left.
 *
 * The jump list borrows the case-study "Scope" register: a mono label over
 * hairline-divided rows, each with the body-face arrow. It leads on mobile,
 * where it works as a contents list for a section that can run past a
 * thousand words.
 *
 * Steps are numbered from their index, so inserting a stage never means a copy
 * edit. The number is its own mono label rather than a dash-joined prefix,
 * because CLAUDE.md §14 rules out em dashes.
 */
function LongForm({
  idPrefix,
  navLabel,
  heading,
  intro,
  items,
  tone,
  numbered = false,
}: {
  idPrefix: string;
  navLabel: string;
  heading: string;
  intro: string;
  items: LongFormBlock[];
  tone: Tone;
  numbered?: boolean;
}) {
  const dark = tone === "dark";
  const muted = dark ? "text-text-muted" : "text-light-muted";

  return (
    <Section tone={tone} frameClassName={GUIDE_SECTION_FRAME}>
      <div className={GUIDE_ASIDE_GRID}>
        {/* Content column: heading, intro, and the reading stack, all flush
            left so the section title lines up with the text beneath it. */}
        <GuideContentCol>
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {heading}
          </h2>
          <p
            className={cn(
              "mt-4 text-body-lg font-medium leading-relaxed",
              muted,
            )}
          >
            {intro}
          </p>

          {/* ~64px between blocks. Whitespace is the separator, not a rule. */}
          <div className="mt-12 flex flex-col gap-16 md:mt-14">
            {items.map((item, i) => (
              <article key={item.title} id={anchorId(idPrefix, item.title)}>
                {numbered ? (
                  <p
                    className={cn(
                      "font-mono text-label uppercase track-label",
                      muted,
                    )}
                  >
                    {`Step ${String(i + 1).padStart(2, "0")}`}
                  </p>
                ) : null}
                <div
                  className={cn(
                    "flex flex-wrap items-center gap-x-4 gap-y-3",
                    numbered && "mt-3",
                  )}
                >
                  <h3 className="font-display text-h3 font-medium leading-snug tracking-tight text-balance">
                    {item.title}
                  </h3>
                  {item.duration ? (
                    <Pill tone={tone}>{item.duration}</Pill>
                  ) : null}
                </div>

                <p className={cn("mt-4 text-body leading-relaxed", muted)}>
                  {item.body}
                </p>

                {item.points?.length ? (
                  <>
                    {item.lead ? (
                      <p className={cn("mt-6 text-body", muted)}>{item.lead}</p>
                    ) : null}
                    {/* 16px between bullets, tighter than between blocks. */}
                    <ul className="mt-4 flex flex-col gap-4">
                      {item.points.map((point) => (
                        <li key={point.label} className="flex gap-3">
                          {/* The accent is a near-black that vanishes on navy
                              (CLAUDE.md §15), so the marker takes the
                              section's own text colour on dark. */}
                          <span
                            aria-hidden
                            className={cn(
                              "mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full",
                              dark ? "bg-text" : "bg-accent",
                            )}
                          />
                          <p
                            className={cn(
                              "text-body leading-relaxed",
                              dark ? "text-text-muted" : "text-light-text",
                            )}
                          >
                            {/* The colon is inserted here, so labels stay free
                                of trailing punctuation in content. */}
                            <strong
                              className={cn(
                                "font-medium",
                                dark ? "text-text" : "text-light-text",
                              )}
                            >
                              {`${point.label}:`}
                            </strong>{" "}
                            {point.body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </article>
            ))}
          </div>
        </GuideContentCol>

        <GuideAside label={navLabel} tone={tone}>
          <ul aria-label={`${heading}: jump to`}>
            {items.map((item) => (
              <li
                key={item.title}
                className={cn(guideAsideRow(tone), "font-display font-medium")}
              >
                <a
                  href={`#${anchorId(idPrefix, item.title)}`}
                  className={cn(
                    // justify-between pins the arrow to the row's right edge,
                    // so a column of links has one arrow rail rather than an
                    // arrow trailing each title at a different x.
                    "group flex items-start justify-between gap-4 py-3.5 transition",
                    dark ? "hover:text-white" : "hover:text-accent",
                  )}
                >
                  {item.title}
                  <span aria-hidden className="btn-arrow mt-0.5 shrink-0">
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </GuideAside>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Highlight sections
 * ------------------------------------------------------------------ */

/**
 * Hero — white on the inverted studio texture, the same register as the
 * service page and case study heroes.
 *
 * The breadcrumb names the hub as the parent even though the guide is a URL
 * sibling under /services (the taxonomy is locked flat, CLAUDE.md §5). The
 * trail describes the site's information hierarchy rather than its paths,
 * which is what breadcrumbs are for, and it puts the link back to the hub in
 * the most prominent place on the page. The BreadcrumbList schema on the route
 * matches this trail exactly.
 */
function GuideHero({ data }: { data: MigrationGuideContent }) {
  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="relative !pb-14 !pt-10 md:!pb-20 md:!pt-14"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
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

      <div className="relative text-center">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-label uppercase track-label text-light-muted"
        >
          <Link href="/services" className="transition hover:text-light-text">
            Services
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <Link
            href="/services/website-migration"
            className="transition hover:text-light-text"
          >
            Website migration
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-light-text">{data.platform}</span>
        </nav>

        <div className="mx-auto mt-10 max-w-4xl md:mt-14">
          <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
            {data.hero.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted">
            {data.hero.subhead}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {data.hero.ctas.map((cta) => (
              <Button key={cta.href} cta={cta} tone="light" />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * Platform proof stats, directly under the hero, in the same hairline-divided
 * strip the service pages and case study details use: a single row from sm up,
 * a labelled column on phones.
 */
function GuideStats({ data }: { data: MigrationGuideContent }) {
  if (data.hero.chips.length === 0) return null;

  return (
    <Section tone="light" frameClassName="!py-6 md:!py-7">
      <ul className="flex flex-col divide-y divide-light-border sm:flex-row sm:flex-wrap sm:items-baseline sm:divide-x sm:divide-y-0">
        {data.hero.chips.map((chip) => (
          <li
            key={chip}
            className="py-3 font-display font-medium first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0"
          >
            {chip}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Lucide "x" glyph, inline per CLAUDE.md §15 (no icon packages). */
function XMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/**
 * Who should move and who shouldn't: two short scannable lists rather than two
 * columns of prose. Ticks against crosses, so the two sides are told apart by
 * marker SHAPE as well as colour and survive greyscale. The cons are
 * deliberately quieter than the pros: they qualify the reader out, they don't
 * argue with them. goodFit leads in the DOM, so it comes first on mobile.
 */
function GuideFit({ data }: { data: MigrationGuideContent }) {
  const { fit } = data;

  return (
    <Section tone="dark" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {fit.heading}
        </h2>
        <p className="max-w-md text-body-lg font-medium text-text-muted md:justify-self-end md:text-right">
          {fit.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border md:mt-12 md:grid-cols-2">
        <div className="bg-bg p-8">
          <h3 className="font-mono text-label uppercase track-label text-text-muted">
            Worth moving
          </h3>
          <ul className="mt-6 flex flex-col gap-4">
            {fit.goodFit.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <VerifiedCheck className="mt-0.5 shrink-0 text-positive" />
                <span className="text-body font-medium leading-snug text-text">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface p-8">
          <h3 className="font-mono text-label uppercase track-label text-text-muted">
            Stay where you are
          </h3>
          <ul className="mt-6 flex flex-col gap-4">
            {fit.notAFit.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <XMark className="mt-0.5 shrink-0 text-text-muted" />
                <span className="text-body leading-snug text-text-muted">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {fit.footnote ? (
        <p className="measure mt-10 border-t border-border pt-8 text-body-lg leading-relaxed text-text-muted">
          {fit.footnote}
        </p>
      ) : null}
    </Section>
  );
}

/**
 * Mid-page lead magnet, white on the inverted studio texture, the same
 * treatment as the hero and the hub's platform directory. Compact and centred
 * on purpose: it interrupts a long read, so it states one question and offers
 * two ways to answer it rather than becoming a section of its own.
 */
function GuideAuditCta({ data }: { data: MigrationGuideContent }) {
  const { auditCta } = data;

  return (
    <Section tone="light" frameClassName="relative !py-14 md:!py-20">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
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

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {auditCta.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {auditCta.paragraph}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          {auditCta.ctas.map((cta) => (
            <Button key={cta.href} cta={cta} tone="light" />
          ))}
        </div>
      </div>
    </Section>
  );
}

/** Timeline and price — the one block that repeats across guides, kept short. */
function GuideLogistics({ data }: { data: MigrationGuideContent }) {
  const { logistics } = data;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
        <div>
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {logistics.heading}
          </h2>
          <div className="mt-8 flex flex-col gap-6">
            <div>
              <div className="font-display text-h1 font-medium leading-none tracking-tight">
                {logistics.priceFrom}
              </div>
              <p className="mt-2 font-mono text-label uppercase track-label text-light-muted">
                Fixed, one-time
              </p>
            </div>
            <div className="border-t border-light-border pt-6">
              <div className="font-display text-h3 font-medium leading-tight tracking-tight">
                {logistics.timeline}
              </div>
              <p className="mt-2 font-mono text-label uppercase track-label text-light-muted">
                Typical timeline
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-card bg-light-surface p-8 md:p-10">
          <p className="text-body-lg leading-relaxed text-light-text">
            {logistics.note}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {logistics.ctas.map((cta) => (
              <Button key={cta.href} cta={cta} tone="light" />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Back to the hub, plus the sibling guides. The hub card leads. */
function GuideRelated({ data }: { data: MigrationGuideContent }) {
  const { related } = data;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {related.heading}
        </h2>
        <p className="max-w-md text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
          {related.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-cols-2">
        {related.items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col bg-light-bg p-8 transition hover:bg-light-surface"
          >
            {/* One chip for every card: the same white rounded square the
                hub's platform directory uses. Only the contents differ, a real
                platform mark where one exists and an icon otherwise, so a row
                of mixed cards reads as one set rather than two treatments. */}
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[6px] border border-light-border bg-light-bg text-light-text">
              {item.logo ? (
                <Image
                  src={item.logo}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <FeatureIcon name={item.icon ?? ""} />
              )}
            </span>
            {i === 0 ? (
              <span className="mt-6 font-mono text-label uppercase track-label text-light-muted">
                The hub
              </span>
            ) : null}
            <h3
              className={cn(
                "font-display text-h3 font-medium leading-snug tracking-tight",
                i === 0 ? "mt-2" : "mt-6",
              )}
            >
              {item.label}{" "}
              <span className="btn-arrow whitespace-nowrap" aria-hidden>
                &rarr;
              </span>
            </h3>
            <p className="mt-3 text-body leading-relaxed text-light-muted">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
