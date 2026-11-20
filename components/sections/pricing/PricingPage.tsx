import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FitTable } from "@/components/ui/FitTable";
import { HeroTexture } from "@/components/sections/compare/ComparePage";
import { PackageExplorer } from "@/components/sections/pricing/PackageExplorer";
import { CARD_LIFT, CardWash } from "@/components/sections/pricing/cardStyles";
import { ShortAnswer } from "@/components/sections/ShortAnswer";
import { SnapSlider } from "@/components/ui/SnapSlider";
import {
  PRICING_UPDATED,
  includedMatrix,
  otherServices,
  packageGroups,
  pricePackages,
  pricingPage as c,
} from "@/content/pricing";
import { cn } from "@/lib/utils";
import { costCalculatorRoutable } from "@/content/tools/status";

/**
 * /pricing (pricing page brief, 20 Nov 2026). Every figure comes from
 * content/pricing.ts, which reads each one from its own source file; this
 * component only lays them out. Built from existing parts: the comparison
 * hero and texture, the light hairline tables, Faq and CtaBanner. The one
 * new piece is the package explorer (tabbed, owner's request).
 */
export function PricingPage() {
  return (
    <>
      <Hero />
      {/* Never inside the hero (owner, 20 Nov 2026): its own band after the CTAs. */}
      <ShortAnswer
        label={c.inShort.label}
        text={c.inShort.text}
        updated={PRICING_UPDATED}
        link={c.inShort.machineLink}
      />
      <Packages />
      <Included />
      <Services />
      <CostsAndPayment />
      <Faq data={{ heading: c.faq.heading, subhead: c.faq.subhead, items: c.faq.items, ctas: [] }} />
      <CtaBanner data={c.finalCta} />
    </>
  );
}

const TICK_LABEL = "Included";
const NO_LABEL = "Not included";

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <Section tone="light" divide={false} frameClassName="relative !pb-14 !pt-10 md:!pb-20 md:!pt-14">
      <HeroTexture />
      <div className="relative text-center">
        <span className="inline-flex items-center rounded-full border border-light-border bg-light-bg/80 px-3 py-1 font-mono text-label uppercase track-label text-light-muted">
          {c.hero.eyebrow}
        </span>
        <h1 className="mx-auto mt-8 max-w-4xl font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance md:mt-10">
          {c.hero.h1}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted">
          {c.hero.lead}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          {c.hero.ctas.map((cta) => (
            <Button key={cta.href} cta={cta} tone="light" />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Packages() {
  const selected = pricePackages.find((p) => p.key === c.packages.defaultKey) ?? pricePackages[0];
  return (
    <Section tone="light" id="packages" frameClassName="!py-12 md:!py-20" className="scroll-mt-[calc(4rem+var(--announce-h))]">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {c.packages.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">{c.packages.intro}</p>
      </div>
      <div className="mt-8 md:mt-10">
        <PackageExplorer
          packages={pricePackages}
          groups={packageGroups}
          defaultKey={selected.key}
          serviceLinkLabel={c.packages.seeService}
          aside={
            <div className="rounded-card border border-dashed border-light-border p-5">
              <p className="font-display text-body-lg font-medium text-light-text">{c.packages.help.heading}</p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-light-muted">{c.packages.help.text}</p>
              <Link
                href={c.packages.help.cta.href}
                className="group mt-3 inline-flex items-center gap-1.5 text-body font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
              >
                {c.packages.help.cta.label}
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </Link>
            </div>
          }
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The three tiers side by side: a real table from md, ticks only (value rows
 * where a tier states its own number). On phones, one stacked list per
 * package of just what it includes.
 */
function Included() {
  const m = includedMatrix;
  const cell = (v: boolean | string) =>
    typeof v === "string" ? (
      <span className="text-light-text">{v}</span>
    ) : v ? (
      <>
        <FeatureIcon name="check" className="mx-auto h-[18px] w-[18px] text-light-text" />
        <span className="sr-only">{TICK_LABEL}</span>
      </>
    ) : (
      <>
        <span aria-hidden className="text-light-muted">
          &ndash;
        </span>
        <span className="sr-only">{NO_LABEL}</span>
      </>
    );

  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">{m.heading}</h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">{m.intro}</p>
      </div>

      <div className="type-card mt-8 hidden overflow-hidden rounded-card border border-light-border md:mt-10 md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{m.heading}</caption>
          <thead>
            <tr className="bg-light-surface">
              <th scope="col" className="w-[34%] px-5 py-3 font-mono text-label font-normal uppercase track-label text-light-muted">
                <span className="sr-only">Feature</span>
              </th>
              {m.columns.map((col) => (
                <th key={col} scope="col" className="px-5 py-3 text-center font-display text-body font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {m.rows.map((row, i) => (
              <tr key={row.label} className="border-t border-light-border">
                <th scope="row" className="px-5 py-3 text-body font-medium text-light-text">
                  {row.label}
                </th>
                {row.cells.map((v, j) => (
                  <td
                    key={j}
                    className={cn(
                      "px-5 py-3 text-center text-body",
                      i === 0 && "font-display text-body-lg font-medium tabular-nums",
                    )}
                  >
                    {cell(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phones: one list per package, only what it includes. */}
      <div className="type-card mt-8 grid gap-4 md:hidden">
        {m.columns.map((col, j) => (
          <div key={col} className="overflow-hidden rounded-card border border-light-border">
            <p className="flex items-baseline justify-between gap-3 bg-light-surface px-4 py-3">
              <span className="font-display text-body-lg font-medium">{col}</span>
              <span className="font-display text-body font-medium tabular-nums">{m.rows[0].cells[j]}</span>
            </p>
            <ul className="divide-y divide-light-border">
              {m.rows.slice(1).map((row) => {
                const v = row.cells[j];
                if (v === false) return null;
                return (
                  <li key={row.label} className="flex items-start justify-between gap-4 px-4 py-2.5 text-body">
                    {typeof v === "string" ? (
                      <>
                        <span className="text-light-muted">{row.label}</span>
                        <span className="text-right text-light-text">{v}</span>
                      </>
                    ) : (
                      <span className="flex items-start gap-2.5 text-light-text">
                        <FeatureIcon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                        {row.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Services() {
  const s = otherServices;
  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      {/* Cards in a slider, two per view from sm (owner, 20 Nov 2026). */}
      <SnapSlider
        header={
          <>
            <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">{s.heading}</h2>
            <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">{s.intro}</p>
          </>
        }
        labels={{ prev: s.prev, next: s.next, region: s.heading }}
        slideClassName="w-[85%] sm:w-[calc(50%-12px)]"
        // Room for the cards' shadow and hover rise inside the scrolling track.
        trackClassName="-mx-4 scroll-px-4 px-4 pb-12 pt-3"
      >
        {s.rows.map((row) => {
          const price = row.price.match(/^(from\s+)?(€[\d,.]+)(.*)$/i);
          const label = "driversLabel" in row && row.driversLabel ? row.driversLabel : s.driversLabel;
          return (
            <article
              key={row.service}
              className={cn(
                "type-card relative flex w-full flex-col overflow-hidden rounded-card border border-light-border bg-light-bg p-6 transition duration-300 hover:-translate-y-1 md:p-8",
                CARD_LIFT,
              )}
            >
              <CardWash />
              <div className="relative flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text">
                  <FeatureIcon name={row.icon} />
                </span>
                <span className="rounded-full border border-light-border bg-light-bg/80 px-3 py-1 font-mono text-label uppercase track-label text-light-muted">
                  {row.badge}
                </span>
              </div>
              <h3 className="relative mt-5 font-display text-h3 font-medium leading-snug tracking-tight">{row.service}</h3>

              {price ? (
                <p className="relative mt-4 flex flex-wrap items-baseline gap-x-2">
                  {price[1] ? <span className="text-body font-medium text-light-muted">{price[1].trim()}</span> : null}
                  <span className="font-display text-[clamp(2rem,3vw,2.5rem)] font-medium leading-none tracking-tight tabular-nums">
                    {price[2]}
                  </span>
                  {price[3] ? <span className="text-body text-light-muted">{price[3].trim()}</span> : null}
                </p>
              ) : (
                <p className="relative mt-4 font-display text-[clamp(1.375rem,2vw,1.625rem)] font-medium leading-snug tracking-tight">
                  {row.price}
                </p>
              )}
              {row.priceNote ? <p className="mt-2 text-[0.8125rem] text-light-muted">{row.priceNote}</p> : null}

              <div className="mt-6 border-t border-light-border pt-5">
                <p className="font-mono text-label uppercase track-label text-light-muted">{label}</p>
                <ul className="mt-3 space-y-2">
                  {row.drivers.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-body text-light-text">
                      <FeatureIcon name="check" className="mt-1 h-4 w-4 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={row.href}
                className="group mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-body font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
              >
                {s.link}
                <span className="sr-only">: {row.service}</span>
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </Link>
            </article>
          );
        })}
      </SnapSlider>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * How payment works and what the price leaves out, in the industry pages'
 * "are you a fit" boxes (owner, 20 Nov 2026): solid boxes with icon tiles
 * for when you pay, a dashed frame of crossed lines for what's not in the
 * price. Then the worth-it arithmetic.
 */
function CostsAndPayment() {
  const pay = c.payment;
  const out = c.notIncluded;
  return (
    <>
      <FitTable
        variant="boxes"
        heading={pay.heading}
        intro={pay.scopeRule}
        goodLabel={pay.whenLabel}
        notLabel={out.heading}
        good={[...pay.schedule.map((row) => `${row.name}: ${row.due}`), pay.noFinancing]}
        goodIcons={pay.icons}
        notAFit={out.items.map((item) => `${item.title}: ${item.body.replace(/\.$/, "")}`)}
        notFooter={
          <div className="mt-4">
            <p className="text-body leading-relaxed text-light-muted">{out.intro}</p>
            <div className="mt-3 flex flex-col items-start gap-2">
              {/* The cost calculator adds the platform plan to the build:
                  linked here once it has a route (content/tools/status.ts). */}
              {[out.link, ...(costCalculatorRoutable ? [out.estimate] : [])].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-body font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
                >
                  {link.label}
                  <span aria-hidden className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        }
      />
      {c.worthIt.text ? (
        <Section tone="light" frameClassName="!py-12 md:!py-20">
          <figure className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-label uppercase track-label text-light-muted">{c.worthIt.heading}</p>
            <blockquote className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-snug tracking-tight text-balance text-light-text">
              {c.worthIt.text}
            </blockquote>
          </figure>
        </Section>
      ) : null}
    </>
  );
}
