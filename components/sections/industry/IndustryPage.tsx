import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { FitTable } from "@/components/ui/FitTable";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectSlider } from "@/components/sections/industry/ProjectSlider";
import { HeroShotCarousel } from "@/components/sections/industry/HeroShotCarousel";
import { Faq } from "@/components/sections/Faq";
import { GuideTabs } from "@/components/sections/migration/GuideTabs";
import { ServicePagePricing } from "@/components/sections/service/ServicePagePricing";
import { StepScene } from "@/components/sections/industry/step-scenes";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import {
  caseStudyCards,
  detailSlugs,
  getCaseStudyDetail,
  inIndustry,
} from "@/content/case-studies";
import { testimonial } from "@/content/testimonials-data";
import { industryTemplate as t } from "@/content/industries/template";
import {
  hubRoutable,
  type HeroShotRef,
  type IndustryPageContent,
} from "@/content/industries";

/**
 * One industry page (/industries/[slug]). Short by design, Flow Ninja's
 * simplicity rather than the service pages' length: hero with real work, the
 * quotable short answer, the fit boxes, "sound familiar?", client voice, how
 * we build it, the work, the prices, questions, further reading, and the ask.
 *
 * Built only from the shared system: the guides' hero register, the
 * case-study hero shots, FitTable's boxes, the video testimonial cards,
 * GuideTabs, the grid's ProjectCard, the service pages' pricing element, and
 * the sitewide Faq and CtaBanner.
 */
export function IndustryPage({ data }: { data: IndustryPageContent }) {
  return (
    <>
      <IndustryHero data={data} />
      <InShort data={data} />
      <FitTable
        variant="boxes"
        eyebrow={t.fitEyebrow}
        heading={data.fit.heading}
        goodLabel={t.fitGoodLabel}
        notLabel={t.fitNotLabel}
        good={data.fit.good.map((g) => g.text)}
        goodIcons={data.fit.good.map((g) => g.icon)}
        notAFit={data.fit.notAFit}
      />
      <Familiar data={data} />
      <Voices data={data} />
      <GuideTabs
        id="how-we-build"
        heading={data.steps.heading}
        intro={data.steps.intro}
        numbered
        split
        stepLabel={t.stepLabel}
        items={data.steps.items.map((step) => ({
          title: step.title,
          navLabel: step.navLabel,
          body: step.body,
          lead: t.deliverablesLabel,
          checklist: step.deliverables,
          visual: step.scene ? <StepScene name={step.scene} /> : undefined,
        }))}
      />
      <Work data={data} />
      {/* Client packages only: never the referral or partner tiers. */}
      <ServicePagePricing
        data={data}
        plans={data.pricing.plans ?? ["landing", "minimum", "studio"]}
        notes={data.pricing.notes}
      />
      {/* No buttons beside the FAQ heading: the hero and the closing band
          already carry the same two. */}
      <Faq
        data={{
          heading: data.faq.heading,
          subhead: data.faq.subhead,
          ctas: [],
          items: data.faq.items,
        }}
      />
      <Related data={data} />
      <CtaBanner
        data={{
          heading: data.finalCta.heading,
          paragraph: data.finalCta.paragraph,
          ...t.finalCta,
        }}
      />
    </>
  );
}

/**
 * Hero: the migration guides' register, white on the inverted studio texture,
 * centred, with the breadcrumb the BreadcrumbList schema mirrors. The proof
 * line sits where a subhead would: the strongest project, with its number.
 */
function IndustryHero({ data }: { data: IndustryPageContent }) {
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

      <div className="relative text-center">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-label uppercase track-label text-light-muted"
        >
          {/* Linked once the hub has a route; plain text before then, so
              the trail never points at a 404. */}
          {hubRoutable ? (
            <Link
              href="/industries"
              className="transition hover:text-light-text"
            >
              {t.breadcrumbHub}
            </Link>
          ) : (
            <span>{t.breadcrumbHub}</span>
          )}
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-light-text">{data.name}</span>
        </nav>

        <div className="mx-auto mt-10 max-w-4xl md:mt-14">
          <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
            {data.hero.h1}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted text-pretty">
            {data.hero.proof}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {data.hero.ctas.map((cta) => (
              <Button key={cta.href} cta={cta} tone="light" />
            ))}
          </div>
        </div>

        {data.hero.shots ? <HeroShots shots={data.hero.shots} /> : null}
      </div>
    </Section>
  );
}

/**
 * Real work under the hero buttons: three case studies' hero shots, the same
 * browser-on-backdrop images the case-study pages open with, as a rotating
 * stack (HeroShotCarousel). The source images are 2:1 with the browser
 * window in the middle 63%, so each is cropped to 3:2 (object-cover,
 * centred): that trims backdrop only and keeps the shots tall rather than
 * wide. Alt text is each case study's own description of its shot.
 */
function HeroShots({
  shots,
}: {
  shots: { center: HeroShotRef; left: HeroShotRef; right: HeroShotRef };
}) {
  const resolve = (ref: HeroShotRef) =>
    typeof ref === "string" ? getCaseStudyDetail(ref)?.heroShot : ref;
  const center = resolve(shots.center);
  const left = resolve(shots.left);
  const right = resolve(shots.right);
  if (!center || !left || !right) return null;

  const shot = (s: { src: string; alt: string }) => ({ src: s.src, alt: s.alt });
  return (
    <HeroShotCarousel
      shots={[shot(center), shot(right), shot(left)]}
      labels={{ prev: t.heroPrevLabel, next: t.heroNextLabel }}
    />
  );
}

/**
 * The short answer: the passage an AI answer or a featured snippet lifts.
 * Label and date on the left, the answer at reading measure on the right, so
 * it reads as a statement of fact with a date on it rather than a pitch.
 */
function InShort({ data }: { data: IndustryPageContent }) {
  const updated = new Date(data.updated);
  const month = updated.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <Section tone="light" frameClassName="!py-12 md:!py-16">
      <div className="grid gap-4 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12">
        <div>
          <h2 className="font-mono text-label uppercase track-label text-light-text">
            {t.inShortLabel}
          </h2>
          <p className="mt-2 font-mono text-label uppercase track-label text-light-muted">
            {t.updatedLabel}{" "}
            <time dateTime={data.updated}>{month}</time>
          </p>
        </div>
        <p className="max-w-[68ch] text-body-lg font-medium leading-relaxed text-light-text">
          {data.inShort}
        </p>
      </div>
    </Section>
  );
}

/**
 * "Sound familiar?": the reader's situation before the pitch. Centred eyebrow,
 * a two-line hook, one intro line, then six situations as a hairline grid
 * (gap-px over the rule colour, solid cells): an icon chip, the situation in
 * the buyer's words, and one short line on what we do about it. A card making
 * a general claim carries its primary sources directly under it.
 */
function Familiar({ data }: { data: IndustryPageContent }) {
  const { familiar } = data;
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow>{t.familiarEyebrow}</Eyebrow>
        <h2 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
          {familiar.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted text-pretty">
          {familiar.intro}
        </p>
      </div>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {familiar.items.map((item) => (
          <li key={item.title} className="type-card flex flex-col bg-light-bg p-6 md:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-surface text-light-text">
              <FeatureIcon name={item.icon} />
            </span>
            <h3 className="mt-8 font-display text-h3 font-medium leading-snug tracking-tight text-balance">
              {item.title}
            </h3>
            <p className="mt-3 text-body leading-relaxed text-light-muted">
              {item.body}
            </p>
            {item.sources?.length ? (
              <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[0.8125rem] text-light-muted">
                <span className="font-mono uppercase track-label leading-5">
                  {t.sourcesLabel}
                </span>
                {item.sources.map((src) => (
                  <a
                    key={src.href}
                    href={src.href}
                    target="_blank"
                    rel="noopener"
                    className="underline decoration-light-border underline-offset-4 transition hover:text-light-text hover:decoration-light-text"
                  >
                    {src.label}
                  </a>
                ))}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/**
 * Client voice, directly after "Sound familiar?": the sitewide video
 * testimonial cards in their lead layout, quotes in full, every word from
 * content/testimonials-data.ts. Navy, because this is proof.
 */
function Voices({ data }: { data: IndustryPageContent }) {
  const block = data.testimonials;
  if (!block?.items.length) return null;
  return (
    <VideoTestimonials
      layout="quotes-column"
      fullQuotes
      data={{
        heading: block.heading,
        intro: block.intro,
        items: block.items.map(({ id, context }) => {
          const tm = testimonial(id);
          return {
            quote: tm.quote,
            name: tm.name,
            role: tm.role,
            company: tm.company,
            logo: tm.logo ?? "",
            poster: tm.poster ?? "",
            video: tm.video ?? "",
            context,
          };
        }),
      }}
    />
  );
}

/**
 * The work: every project tagged with this industry, straight from the
 * case-study grid data, so a new project appears here without touching this
 * page. Studies with a detail page lead.
 */
function Work({ data }: { data: IndustryPageContent }) {
  const cards = caseStudyCards
    .filter((c) => inIndustry(c, data.industry))
    .sort(
      (a, b) => Number(detailSlugs.has(b.slug)) - Number(detailSlugs.has(a.slug)),
    );
  if (cards.length === 0) return null;

  // Every project on the same card, case studies first, in a looping arrow
  // slider (owner, 18 Nov 2026; replaces the cards-plus-rows split).
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <ProjectSlider
        cards={cards}
        details={cards.filter((c) => detailSlugs.has(c.slug)).map((c) => c.slug)}
        labels={{
          prev: t.workPrevLabel,
          next: t.workNextLabel,
          region: data.work.heading,
        }}
      >
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.work.heading}
        </h2>
        {data.work.intro ? (
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
            {data.work.intro}
          </p>
        ) : null}
        <Link
          href={`/case-studies?industry=${data.industry}`}
          className="group mt-4 inline-flex items-center gap-1.5 font-display text-body font-medium transition hover:text-accent"
        >
          {t.workAllLabel}{" "}
          <span aria-hidden className="btn-arrow">
            &rarr;
          </span>
        </Link>
      </ProjectSlider>
    </Section>
  );
}

/** Further reading: the service, the articles and the guide, as one set. */
function Related({ data }: { data: IndustryPageContent }) {
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
            className="group flex flex-col bg-light-bg p-8 transition hover:bg-light-surface"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text">
              <FeatureIcon name={item.icon} />
            </span>
            <span className="mt-6 font-mono text-label uppercase track-label text-light-muted">
              {item.kind}
            </span>
            <h3 className="mt-2 font-display text-h3 font-medium leading-snug tracking-tight">
              {/* A no-break space ties the arrow to the last word, so it
                  never wraps onto a line of its own. */}
              {item.label}
              {"\u00a0"}
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
