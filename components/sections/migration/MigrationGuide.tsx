import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SourcesGrid } from "@/components/sections/SourcesGrid";
import { WorkStrip } from "@/components/sections/WorkStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Pricing } from "@/components/sections/Pricing";
import { cn, isFlatMark } from "@/lib/utils";
import { CtaBand } from "./CtaBand";
import { TransfersTable } from "./TransfersTable";
import { GuideNav } from "./GuideNav";
import { GuideTabs } from "./GuideTabs";
import { PointList } from "./PointList";
import { guideContentInset } from "./GuideAside";
import { GUIDE_NAV_SECTIONS } from "@/content/migration-guides";
import { caseStudyCards, caseStudies } from "@/content/case-studies";
import type {
  ContextualCta as ContextualCtaData,
  LongFormBlock,
  MigrationGuideContent,
} from "@/content/migration-guides";
import type { Tone } from "@/lib/types";

/** Section ids, shared with GUIDE_NAV_SECTIONS so the navigator can find them. */
const ID = {
  glance: "at-a-glance",
  benefits: "what-you-get",
  routes: "the-two-routes",
  fit: "who-should-move",
  transfers: "what-carries-across",
  steps: "how-the-move-runs",
  seo: "search-rankings",
  mistakes: "three-decisions",
  cost: "cost",
  proof: "case-studies",
  faq: "faq",
} as const;

/**
 * The migration guide template — /services/[platform]-to-wix-studio.
 *
 * THE LAYOUT PRINCIPLE. The page alternates two treatments. Long stretches of
 * reading sit in a single column at the 68ch measure with hairlines between
 * blocks. Between them, designed sections break the rhythm and carry the
 * things worth looking at.
 *
 * ORIENTATION IS PAGE-LEVEL, NOT PER SECTION. One sticky navigator tracks the
 * whole guide and retires at the FAQ. The per-section jump lists it replaced
 * sat inside the section they linked into, so they only ever appeared once the
 * reader had already arrived.
 *
 * THE ASK FOLLOWS THE FRICTION. Contextual CTAs are placed where the reader
 * has just felt the difficulty (after the transfers table, after the routes
 * comparison, after the honest limits of an SEO promise) rather than on a
 * fixed rhythm. Never two in a row.
 *
 * TONE RHYTHM: the three long-form sections land light, dark, light, so no two
 * adjacent reading stretches share a background.
 */
export function MigrationGuide({ data }: { data: MigrationGuideContent }) {
  const present = new Set<string>([
    ...(data.glance ? [ID.glance] : []),
    ...(data.benefits ? [ID.benefits] : []),
    ...(data.routes ? [ID.routes] : []),
    ID.fit,
    ID.transfers,
    ID.steps,
    ...(data.seoMechanics ? [ID.seo] : []),
    ...(data.mistakes ? [ID.mistakes] : []),
    ...(data.cost ? [ID.cost] : []),
    ...(data.proof ? [ID.proof] : []),
    ID.faq,
  ]);
  const navItems = GUIDE_NAV_SECTIONS.filter((s) => present.has(s.id));

  return (
    <>
      {/* Directly under the site nav and above the hero, so it's pinned from
          the first scroll rather than appearing part-way down the page. */}
      <GuideNav items={navItems} />
      <GuideHero data={data} />
      <GuideStats data={data} />

      <GuideGlance data={data} />
      <GuideBenefits data={data} />
      {/* Proof sits straight after the capability argument: the reader has
          just been told what Studio gives them, so the work is the evidence
          for it rather than a footnote after the pitch. */}
      {data.proof ? (
        <div id={ID.proof}>
          <WorkStrip
            slugs={data.proof.workSlugs}
            heading={data.proof.heading}
            intro={data.proof.intro}
          />
        </div>
      ) : null}

      <GuideRoutes data={data} />
      <GuideFit data={data} />
      <TransfersTable data={data} />

      <LongForm
        id={ID.steps}
        heading={data.steps.heading}
        intro={data.steps.intro}
        items={data.steps.items}
        tone="light"
        numbered
        mockups={stepMockups(data, data.steps.items.length)}
      />

      {/* Kept at the owner's request: sitewide proof between two stretches of
          reading. ClientLogos draws the rule that closes the band above it. */}
      <Testimonials />
      <ClientLogos />

      {data.seoMechanics ? (
        <LongForm
          id={ID.seo}
          heading={data.seoMechanics.heading}
          intro={data.seoMechanics.intro}
          items={data.seoMechanics.items}
          tone="light"
        />
      ) : null}

      <GuideAuditCta data={data} />

      {/* Tabs rather than a stack: this block is a small closed set of
          decisions to pick between, not a sequence to read through, and it
          breaks up a page that is otherwise divided prose. */}
      {data.mistakes ? (
        <GuideTabs
          id={ID.mistakes}
          heading={data.mistakes.heading}
          intro={data.mistakes.intro}
          items={data.mistakes.items}
        />
      ) : null}

      <GuideCost data={data} />

      {/* The ask lands straight off the back of the FAQ, while the reader is
          still in decision mode. Sources and further reading follow it: both
          are reference material, and putting them between the questions and
          the ask made the reader step over two speed-bumps to convert. */}
      <div id={ID.faq}>
        <Faq data={data.faq} />
      </div>

      <CtaBanner data={data.finalCta} />

      <GuideSources data={data} />
      <GuideRelated data={data} />
    </>
  );
}

/** A contextual ask, attached to the block that earned it. */
function ContextualCta({
  data,
  tone,
}: {
  data: ContextualCtaData;
  tone: Tone;
}) {
  return (
    <div className="mt-10 max-w-[68ch]">
      <CtaBand
        heading={data.heading}
        paragraph={data.paragraph}
        ctas={[data.cta]}
        tone={tone}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Long-form treatment
 * ------------------------------------------------------------------ */

/**
 * A long-form section: heading and intro at reading measure, then blocks
 * divided by hairlines that bleed to the frame rails. Whitespace and a rule
 * separate blocks; nothing is a card, because these are paragraphs.
 *
 * Steps are numbered from their index, so inserting a stage never means a copy
 * edit. A block carrying its own `cta` renders it immediately beneath itself.
 */
function LongForm({
  id,
  heading,
  intro,
  items,
  tone,
  numbered = false,
  mockups,
}: {
  id: string;
  heading: string;
  intro: string;
  items: LongFormBlock[];
  tone: Tone;
  numbered?: boolean;
  /** One per block, rendered in a column beside the text from lg up. */
  mockups?: { src: string; alt: string }[];
}) {
  const dark = tone === "dark";
  const muted = dark ? "text-text-muted" : "text-light-muted";
  const rule = dark ? "border-border" : "border-light-border";

  return (
    <Section tone={tone} frameClassName="!py-14 md:!py-24" id={id}>
      <div className="max-w-[68ch]">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {heading}
        </h2>
        <p
          className={cn("mt-4 text-body-lg font-medium leading-relaxed", muted)}
        >
          {intro}
        </p>
      </div>

      {/* Blocks divided by rules that run rail to rail: the track bleeds and
          each block re-applies the gutter inside its own border box. */}
      <div
        className={cn(
          "frame-bleed mt-12 border-t md:mt-14",
          rule,
          dark ? "divide-y divide-border" : "divide-y divide-light-border",
        )}
      >
        {items.map((item, i) => (
          <article
            key={item.title}
            id={anchorId(id, item.title)}
            className={cn(
              guideContentInset(),
              "py-10 md:py-12",
              mockups?.[i] &&
                // Text column pinned to the reading measure, mockup takes
                // everything left over. A 1fr text column left ~260px of dead
                // space between the copy and a 360px image.
                "lg:grid lg:grid-cols-[minmax(0,68ch)_minmax(0,1fr)] lg:items-start lg:gap-12",
            )}
          >
            <div className="max-w-[68ch]">
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
                  <PointList points={item.points} tone={tone} />
                </>
              ) : null}

              {item.cta ? <ContextualCta data={item.cta} tone={tone} /> : null}
            </div>

            {mockups?.[i] ? (
              <div className="mt-8 hidden lg:mt-0 lg:block">
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-card border",
                    dark
                      ? "border-border bg-surface"
                      : "border-light-border bg-light-surface",
                  )}
                >
                  <Image
                    src={mockups[i].src}
                    alt={mockups[i].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}

/**
 * One client site per step, for the mockup column beside the stages.
 *
 * Drawn from the guide's own proof cases first, then topped up from the rest
 * of the grid, deduped so no two steps show the same site. These illustrate
 * the kind of work the stage produces rather than the stage itself, so they
 * carry a real client alt rather than a caption claiming otherwise.
 */
function stepMockups(data: MigrationGuideContent, count: number) {
  // The guide's proof slugs are deliberately EXCLUDED. Those sites already
  // appear in the case-studies rows and one of them heads the benefits
  // section, so reusing them here showed the same client three times. The
  // steps draw from the rest of the portfolio instead.
  const spoken = new Set(data.proof?.workSlugs ?? []);
  const ordered = [
    ...caseStudies.items.map((i) => i.slug),
    ...caseStudyCards.map((c) => c.slug),
  ];
  const seen = new Set<string>();
  const out: { src: string; alt: string }[] = [];
  for (const slug of ordered) {
    if (out.length >= count) break;
    if (seen.has(slug) || spoken.has(slug)) continue;
    seen.add(slug);
    const card = caseStudyCards.find((c) => c.slug === slug);
    if (!card?.thumb) continue;
    out.push({
      src: card.thumb,
      alt: `${card.client} website, built on Wix Studio`,
    });
  }
  return out;
}

/** Stable anchor id from a block title, scoped by section. */
function anchorId(prefix: string, title: string) {
  return `${prefix}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

/* ------------------------------------------------------------------ *
 * Highlight sections
 * ------------------------------------------------------------------ */

/**
 * Hero — white on the inverted studio texture. The breadcrumb names the hub as
 * the parent even though the guide is a URL sibling (the taxonomy is locked
 * flat, CLAUDE.md §5): the trail describes the site's hierarchy rather than its
 * paths, and it puts the link back to the hub in the most prominent place on
 * the page. The BreadcrumbList schema on the route matches this trail exactly.
 *
 * The byline is an E-E-A-T signal, not decoration: it names who wrote the page,
 * who checked it, and when, which is what separates a maintained reference from
 * an undated blog post. It renders only where the page carries sources to back
 * the claim.
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
 * Platform proof stats, directly under the hero, in the hairline-divided strip
 * the service pages and case study details use.
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

/**
 * "At a glance" — the short answers, high on the page.
 *
 * A definition list, not a grid of divs: explicitly labelled key/value pairs
 * are the most extractable thing on the page, and the markup is what lets an
 * answer engine lift a question and its answer as a pair.
 */
function GuideGlance({ data }: { data: MigrationGuideContent }) {
  if (!data.glance) return null;
  const { glance } = data;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24" id={ID.glance}>
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {glance.heading}
        </h2>
        {glance.intro ? (
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
            {glance.intro}
          </p>
        ) : null}
      </div>

      {/* Still a definition list: labelled question/answer pairs are the most
          extractable thing on the page, and the markup is what lets an answer
          engine lift a question with its answer. The question is set in the
          card-title face rather than the mono label, because it reads as a
          question rather than as a field name. */}
      <dl className="mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {glance.items.map((item, i) => (
          <div key={item.label} className="bg-light-bg p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text">
              <FeatureIcon name={GLANCE_ICONS[i] ?? "answer"} />
            </span>
            <dt className="mt-5 font-display text-body-lg font-medium leading-snug text-light-text">
              {item.label}
            </dt>
            <dd className="mt-2 text-body leading-relaxed text-light-muted">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/**
 * Icons for the benefits grid, by position, on the same basis as the glance
 * icons: the six capabilities are fixed by the template, so authoring an
 * `icon` per item would add a content field that never varies.
 */
const BENEFIT_ICONS = [
  "responsive",
  "server",
  "palette",
  "users",
  "braces",
  "tags",
];

/**
 * Icons for the glance grid, by position. Positional rather than authored per
 * item, because the six questions are fixed by the template: can it convert,
 * what comes with you, what happens to URLs, cost, time, difficulty.
 */
const GLANCE_ICONS = [
  "responsive",
  "transfer",
  "redirect",
  "card",
  "gauge",
  "compass",
];

/**
 * "What you get on Wix Studio" — the one place on this page cards are the
 * right answer, because the six items are genuinely parallel: same shape, same
 * weight, no reading order.
 */
function GuideBenefits({ data }: { data: MigrationGuideContent }) {
  if (!data.benefits) return null;
  const { benefits } = data;

  // The mockup is a real client site, taken from the guide's own proof set so
  // the picture beside "what you get" is a site we actually built that way.
  // Falls back to the sitewide featured set where a guide names no proof.
  const slug = data.proof?.workSlugs[0] ?? caseStudies.items[0]?.slug;
  const shot = caseStudyCards.find((c) => c.slug === slug);

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24" id={ID.benefits}>
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {benefits.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {benefits.intro}
        </p>
      </div>

      {/* Capabilities down one half, a site built with them down the other.
          The outer grid deliberately carries NO overflow-hidden: it would
          become the sticky scrollport and the mockup would stop travelling.
          Each half carries its own rounding instead. */}
      <div className="mt-10 grid gap-8 md:mt-12 lg:grid-cols-2 lg:gap-12">
        <div className="grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border">
          {benefits.items.map((item, i) => (
            <div key={item.title} className="bg-light-bg p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text">
                <FeatureIcon name={BENEFIT_ICONS[i] ?? "layers"} />
              </span>
              <h3 className="mt-5 font-display text-body-lg font-medium leading-snug text-light-text">
                {item.title}
              </h3>
              <p className="mt-2 text-body leading-relaxed text-light-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {shot?.thumb ? (
          <div className="hidden lg:block">
            {/* Sticky, so the site stays beside whichever capability is being
                read rather than scrolling away at the first card. */}
            <div className="sticky top-32">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-light-border bg-light-surface">
                <Image
                  src={shot.thumb}
                  alt={`${shot.client} website, built on Wix Studio`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}

/**
 * "There are two ways to do this" — two side-by-side panels, not tabs and not
 * long-form. The reader is choosing between the routes, so both have to be
 * visible at once to be compared; tabs would hide half the decision.
 *
 * This block is the page's factual differentiator: Wix documents these two
 * routes in separate articles that never reference each other, so readers
 * arrive having found one and no way to tell whether it applies to them.
 */
function GuideRoutes({ data }: { data: MigrationGuideContent }) {
  if (!data.routes) return null;
  const { routes } = data;

  return (
    <Section tone="dark" frameClassName="!py-14 md:!py-24" id={ID.routes}>
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {routes.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-text-muted">
          {routes.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border md:mt-12 lg:grid-cols-2">
        {routes.items.map((route) => (
          <article key={route.title} className="flex flex-col bg-bg p-8">
            <Pill tone="dark" className="self-start">
              {route.eligibility}
            </Pill>
            <h3 className="mt-5 font-display text-h3 font-medium leading-snug tracking-tight text-balance">
              {route.title}
            </h3>
            <p className="mt-4 text-body leading-relaxed text-text-muted">
              {route.body}
            </p>
            {route.points?.length ? (
              <>
                {route.lead ? (
                  <p className="mt-6 text-body text-text-muted">{route.lead}</p>
                ) : null}
                <PointList points={route.points} tone="dark" />
              </>
            ) : null}
          </article>
        ))}
      </div>

      {routes.footnote ? (
        <p className="measure mt-10 border-t border-border pt-8 text-body-lg leading-relaxed text-text-muted">
          {routes.footnote}
        </p>
      ) : null}

      {routes.cta ? <ContextualCta data={routes.cta} tone="dark" /> : null}
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
 * Who should move and who shouldn't, as a white comparison table spanning the
 * full section: hairline verticals between the columns, hairlines between
 * every row, a tinted header band, and a marker on every cell.
 *
 * THE GRID FLOWS DOWN COLUMNS, NOT ACROSS ROWS. `grid-flow-col` over an
 * explicit row count puts the whole "worth moving" list in column one and the
 * whole "stay put" list in column two, so rows line up across the vertical
 * rule without pairing two items that have nothing to do with each other. It
 * also means the DOM order is every pro, then every con, which is exactly the
 * order you want when the table collapses to one column on phones.
 *
 * The two sides are told apart by marker SHAPE (a tick against a cross) as
 * well as colour, so the distinction survives greyscale and colour blindness.
 * The cons are quieter than the pros: they qualify the reader out, they don't
 * argue with them.
 */
function GuideFit({ data }: { data: MigrationGuideContent }) {
  const { fit } = data;
  // +1 for the header cell that heads each column.
  const rowCount = Math.max(fit.goodFit.length, fit.notAFit.length) + 1;
  // Keeps the block rectangular when one side has fewer reasons than the other.
  const fillers = Math.max(0, fit.goodFit.length - fit.notAFit.length);

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24" id={ID.fit}>
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {fit.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {fit.intro}
        </p>
      </div>

      <div
        className="mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-flow-col"
        style={{ gridTemplateRows: `repeat(${rowCount}, auto)` }}
      >
        <ColumnHead
          label="Worth moving"
          marker={<VerifiedCheck className="text-positive-ink" />}
        />
        {fit.goodFit.map((point) => (
          <div key={point} className="flex items-start gap-3 bg-light-bg p-5">
            <VerifiedCheck className="mt-0.5 shrink-0 text-positive-ink" />
            <span className="text-body font-medium leading-snug text-light-text">
              {point}
            </span>
          </div>
        ))}

        <ColumnHead
          label="Stay where you are"
          marker={<XMark className="text-light-muted" />}
        />
        {fit.notAFit.map((point) => (
          <div key={point} className="flex items-start gap-3 bg-light-bg p-5">
            <XMark className="mt-0.5 shrink-0 text-light-muted" />
            <span className="text-body leading-snug text-light-muted">
              {point}
            </span>
          </div>
        ))}
        {Array.from({ length: fillers }, (_, i) => (
          <div
            key={`filler-${i}`}
            aria-hidden
            className="hidden bg-light-bg md:block"
          />
        ))}
      </div>

      {fit.footnote ? (
        <p className="measure mt-10 border-t border-light-border pt-8 text-body-lg leading-relaxed text-light-muted">
          {fit.footnote}
        </p>
      ) : null}
    </Section>
  );
}

/** Tinted header cell heading one column of the fit table. */
function ColumnHead({
  label,
  marker,
}: {
  label: string;
  marker: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 bg-light-surface px-5 py-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg">
        {marker}
      </span>
      <span className="font-mono text-label uppercase track-label text-light-muted">
        {label}
      </span>
    </div>
  );
}

/**
 * The mid-page audit offer, rendered with the sitewide CtaBanner, the same
 * component the page closes on. One CTA treatment for full-width asks across
 * the whole site rather than a second one invented for this page.
 */
function GuideAuditCta({ data }: { data: MigrationGuideContent }) {
  const { auditCta } = data;
  const [primary, secondary] = auditCta.ctas;
  if (!primary) return null;

  return (
    <CtaBanner
      data={{
        heading: [auditCta.heading],
        paragraph: auditCta.paragraph,
        cta: { label: primary.label, href: primary.href },
        ...(secondary
          ? { ctaSecondary: { label: secondary.label, href: secondary.href } }
          : {}),
        image: "/textures/studio-texture.jpg",
      }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Commercial + credibility
 * ------------------------------------------------------------------ */

/**
 * The migration cost block. Guides without a `cost` block fall back to the
 * sitewide tiers rather than shipping with no commercial section at all, which
 * is currently every guide including this one.
 */
function GuideCost({ data }: { data: MigrationGuideContent }) {
  if (!data.cost) return <Pricing showWhiteLabel={false} tone="light" />;
  const { cost } = data;

  return (
    <Section tone="dark" frameClassName="!py-14 md:!py-24" id={ID.cost}>
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {cost.heading}
        </h2>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <div className="flex flex-col bg-bg p-8">
          <div className="font-display text-h1 font-medium leading-none tracking-tight">
            {cost.priceFrom}
          </div>
          <p className="mt-3 font-mono text-label uppercase track-label text-text-muted">
            Fixed, one-time
          </p>
          <div className="mt-6 border-t border-border pt-6">
            <div className="font-display text-h3 font-medium leading-tight tracking-tight">
              {cost.timeline}
            </div>
            <p className="mt-2 font-mono text-label uppercase track-label text-text-muted">
              Typical timeline
            </p>
          </div>
          <p className="mt-6 text-body leading-relaxed text-text-muted">
            {cost.note}
          </p>
          <div className="flex-1" aria-hidden />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {cost.ctas.map((cta) => (
              <Button key={cta.href} cta={cta} tone="dark" />
            ))}
          </div>
        </div>

        <div className="bg-surface p-8">
          <h3 className="font-mono text-label uppercase track-label text-text-muted">
            What that covers
          </h3>
          <ul className="mt-6 flex flex-col gap-3.5">
            {cost.included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <VerifiedCheck className="mt-1 shrink-0 text-positive" />
                <span className="text-body leading-snug text-text">{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 border-t border-border pt-8 font-mono text-label uppercase track-label text-text-muted">
            What moves the number
          </h3>
          <ul className="mt-5 flex flex-col gap-2.5">
            {cost.drivers.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-text-muted"
                />
                <span className="text-body leading-snug text-text-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-body text-text-muted">
            <Link
              // The brief specified /pricing; that route 404s. /#pricing is the
              // sitewide convention and the anchor exists on the homepage.
              href="/#pricing"
              className="group inline-flex items-center gap-1.5 font-medium text-text underline decoration-border underline-offset-4 transition hover:decoration-text"
            >
              See the full package pricing
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}

/**
 * Primary sources as a two-across card grid. This is the page's citability
 * moat: every competing guide reviewed cites nothing, so linking the vendor's
 * own documentation is what makes a claim checkable instead of assertable.
 */
function GuideSources({ data }: { data: MigrationGuideContent }) {
  if (!data.sources) return null;
  const { sources } = data;

  return (
    <SourcesGrid
      heading={sources.heading}
      intro={sources.intro}
      verified={sources.verified}
      items={sources.items}
    />
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
                  unoptimized={isFlatMark(item.logo)}
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
