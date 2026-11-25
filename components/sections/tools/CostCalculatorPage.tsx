import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HeroTexture } from "@/components/sections/compare/ComparePage";
import { ShortAnswer } from "@/components/sections/ShortAnswer";
import { RelatedCards } from "@/components/sections/RelatedCards";
import { resourceCardsFor, resourcesHubRoutable } from "@/lib/resources-index";
import { DriverTabs } from "@/components/sections/tools/DriverTabs";
import {
  CostCalculator,
  CostComparison,
  CostMobileBar,
  CostProvider,
} from "@/components/sections/tools/CostCalculator";
import { fx } from "@/content/fx";
import { marketRanges, marketScale, marketSources } from "@/content/tools/market";
import { planSources, priceBook } from "@/content/tools/price-book";
import {
  COST_CALCULATOR_UPDATED,
  calculatorCopy,
  costCalculatorPage as c,
} from "@/content/tools/website-cost";

/**
 * /tools/website-cost-calculator (cost calculator brief, 20 Nov 2026).
 * Built from the site's existing parts: the comparison hero and texture,
 * ShortAnswer, the scannable comparison cards, a hairline grid, Faq,
 * CtaBanner and the folded sources toggle. The calculator itself is the
 * client island in ./CostCalculator, server-rendered with the default
 * answers so the HTML carries a full estimate.
 */
export function CostCalculatorPage() {
  return (
    <>
      <Hero />
      <CostProvider
        book={priceBook}
        copy={calculatorCopy}
        market={{
          freelancer: marketRanges.freelancer.range,
          agency: marketRanges.agency.range,
          scaleMax: marketScale.max,
        }}
      >
        <Section
          tone="light"
          id="calculator"
          frameClassName="!py-10 md:!py-16"
          className="scroll-mt-[calc(4rem+var(--announce-h))]"
        >
          <CostCalculator />
        </Section>
        {/* On this page the short answer follows the tool rather than the
            hero (owner, 20 Nov 2026): the calculator is what people came for. */}
        <ShortAnswer label={c.inShort.label} text={c.inShort.text} updated={COST_CALCULATOR_UPDATED} />
        <Section tone="light" frameClassName="!py-12 md:!py-20">
          <CostComparison
            header={
              <>
                <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
                  {calculatorCopy.market.heading}
                </h2>
                <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
                  {calculatorCopy.market.intro}
                </p>
              </>
            }
          />
          <p className="mt-6 text-[0.8125rem] leading-relaxed text-light-muted">{calculatorCopy.market.footnote}</p>
        </Section>
        <CostMobileBar />
      </CostProvider>
      <Drivers />
      {resourcesHubRoutable ? (
        <RelatedCards heading={c.related.heading} items={[c.related.hub, ...resourceCardsFor("planning")]} />
      ) : null}
      <Faq data={{ heading: c.faq.heading, subhead: c.faq.subhead, items: c.faq.items, ctas: [] }} />
      <CtaBanner data={c.finalCta} />
      <HowWeEstimate />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <Section tone="light" divide={false} frameClassName="relative !pb-12 !pt-10 md:!pb-16 md:!pt-14">
      <HeroTexture />
      <div className="relative text-center">
        <span className="inline-flex items-center rounded-full border border-light-border bg-light-bg/80 px-3 py-1 font-mono text-label uppercase track-label text-light-muted">
          {c.hero.eyebrow}
        </span>
        <h1 className="mx-auto mt-8 max-w-4xl font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance md:mt-10">
          {c.hero.h1}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted">{c.hero.lead}</p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Four things that move the number (owner, 20 Nov 2026). Left, centred in
 * the section: the heading, four small vertical tabs and the chosen one's
 * line. Right: a strip of real client sites drifting upward on a loop,
 * running edge to edge between the section's rules and out to the right
 * rail. The strip is CSS only (the site's drift animation), pauses on
 * hover, and holds still under reduced motion.
 */
function Drivers() {
  const d = c.drivers;
  return (
    <Section tone="light" frameClassName="!py-0">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col justify-center py-12 md:py-20 lg:pr-12">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">{d.heading}</h2>
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">{d.intro}</p>
          <div className="mt-8 md:mt-10">
            <DriverTabs items={d.items} label={d.heading} />
          </div>
        </div>
        <MockupStrip mockups={d.mockups} />
      </div>
    </Section>
  );
}

function MockupStrip({ mockups }: { mockups: { image: string; client: string }[] }) {
  // Two identical runs: the drift moves up by exactly one, so it loops seamlessly.
  const run = (copy: boolean) => (
    <ul className="flex flex-col gap-4 pb-4" aria-hidden={copy || undefined}>
      {mockups.map((m) => (
        <li key={m.image} className="relative aspect-[2/1] overflow-hidden rounded-card border border-light-border bg-light-bg">
          <Image
            src={m.image}
            alt={copy ? "" : `${m.client} website`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-bg/70 px-3 py-1 font-mono text-label uppercase track-label text-white backdrop-blur-md">
            {m.client}
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group/strip frame-bleed relative h-[420px] overflow-hidden border-t border-light-border bg-light-surface sm:h-[520px] lg:!ml-0 lg:h-auto lg:min-h-[680px] lg:border-l lg:border-t-0">
      <div
        className="animate-drift-up absolute inset-x-0 top-0 px-5 group-hover/strip:[animation-play-state:paused] md:px-8"
        style={{ animationDuration: "70s" }}
      >
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * "How we estimate and where the numbers come from": folded shut, small
 * type, last thing before the footer (owner, 20 Nov 2026). The only place
 * on the page that names the market sources.
 */
function HowWeEstimate() {
  const s = c.sources;
  const link =
    "group inline-flex items-baseline gap-1.5 font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text";
  const arrow = (
    <span aria-hidden className="btn-arrow">
      &rarr;
    </span>
  );
  return (
    <Section tone="light" frameClassName="!py-8 md:!py-10">
      <details className="group/sources">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
          <h2 className="text-body font-medium text-light-muted transition group-open/sources:text-light-text">{s.summary}</h2>
          <FeatureIcon
            name="chevron-down"
            className="h-4 w-4 shrink-0 text-light-muted transition-transform duration-200 group-open/sources:rotate-180"
          />
        </summary>

        <div className="mt-6 grid gap-8 text-[0.8125rem] leading-relaxed text-light-muted md:grid-cols-2 md:gap-x-12">
          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-label uppercase track-label text-light-text">{s.ours.label}</h3>
              <p className="mt-2">
                {s.ours.text}{" "}
                <Link href={s.ours.link.href} className={link}>
                  {s.ours.link.label}
                  {arrow}
                </Link>
              </p>
            </div>
            <div>
              <h3 className="font-mono text-label uppercase track-label text-light-text">{s.plans.label}</h3>
              <p className="mt-2">{s.plans.text}</p>
              <ul className="mt-2 space-y-1">
                {planSources.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} target="_blank" rel="noopener nofollow" className={link}>
                      {p.name}
                      {arrow}
                    </a>{" "}
                    read {longDate(p.checked)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-label uppercase track-label text-light-text">{s.fx.label}</h3>
              <p className="mt-2">
                <a href={fx.source.href} target="_blank" rel="noopener nofollow" className={link}>
                  {fx.source.name}
                  {arrow}
                </a>
              </p>
              <p className="mt-1">{s.fx.text}</p>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-label uppercase track-label text-light-text">{s.market.label}</h3>
            <ul className="mt-2 space-y-4">
              {Object.values(marketSources).map((src) => (
                <li key={src.href}>
                  <a href={src.href} target="_blank" rel="noopener nofollow" className={link}>
                    {src.name}, {src.title}
                    {arrow}
                  </a>
                  {src.dated ? <span>, {src.dated}</span> : null}
                  <span className="block">{src.what}</span>
                  <span className="block text-light-text">{src.figures.join(". ")}.</span>
                </li>
              ))}
            </ul>
            <p className="mt-6">{s.closing}</p>
          </div>
        </div>
      </details>
    </Section>
  );
}
