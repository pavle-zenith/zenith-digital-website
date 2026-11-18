import {
  caseStudyCards,
  getCaseStudyDetail,
  type CaseStudyCard,
  type CaseStudyDetail,
} from "@/content/case-studies";
import { pricing } from "@/content/home";
import { landingPages } from "@/content/service-pages/landing-pages";
import type { PackageKey } from "./types";

/**
 * Every number on an industry page comes through here.
 *
 * Each helper reads content/case-studies.ts (or the published prices) and
 * THROWS when the thing it was asked for isn't there. That is deliberate: if
 * a case study renames a stat or drops a figure, the build fails on the
 * industry page that quoted it, instead of the page quietly shipping a number
 * nothing backs any more. Nothing on these pages is typed in by hand.
 */

/** The grid card for a project. */
export function card(slug: string): CaseStudyCard {
  const c = caseStudyCards.find((x) => x.slug === slug);
  if (!c) throw new Error(`industries: no case-study card "${slug}"`);
  return c;
}

/** The full case study for a project with a shipped detail page. */
export function detail(slug: string): CaseStudyDetail {
  const d = getCaseStudyDetail(slug);
  if (!d) throw new Error(`industries: no case-study detail "${slug}"`);
  return d;
}

/**
 * A figure from a study's stats or results, found by a fragment of its label
 * ("Pages ranking", "Rankings lost"). The value is returned exactly as the
 * case study states it.
 */
export function figure(slug: string, label: string): string {
  const d = detail(slug);
  const hit = [...d.stats, ...d.results].find((m) =>
    m.label.toLowerCase().includes(label.toLowerCase()),
  );
  if (!hit) throw new Error(`industries: "${slug}" has no figure "${label}"`);
  return hit.value;
}

/**
 * Part of a card's own metric, by pattern: "3 languages" out of
 * "3 languages, 2-week launch". For scope cards whose only figure lives in the
 * metric line.
 */
export function metricPart(slug: string, pattern: RegExp): string {
  const m = card(slug).metric.match(pattern);
  if (!m) throw new Error(`industries: "${slug}" metric has no ${pattern}`);
  return m[0];
}

/**
 * A "{amount} in {period}" metric split in two, so a sentence can read
 * "$521k in booked trips in 7 months" without retyping either figure.
 */
export function amountAndPeriod(slug: string): [string, string] {
  const parts = card(slug).metric.split(" in ");
  if (parts.length !== 2) {
    throw new Error(`industries: "${slug}" metric isn't "amount in period"`);
  }
  return [parts[0], parts[1]];
}

/** "£15k–£100k" as ["£15k", "£100k"]. */
export function rangeOf(value: string): [string, string] {
  const parts = value.split("–");
  if (parts.length !== 2) throw new Error(`industries: "${value}" isn't a range`);
  return [parts[0], parts[1]];
}

/* ------------------------------------------------------------------ *
 * Published prices. No industry page may show a price that isn't one of
 * these, and none is typed here: each is read from the homepage tiers or the
 * landing page service.
 * ------------------------------------------------------------------ */

const [minimumTier, studioTier] = pricing.tiers;
if (minimumTier?.name !== "The Minimum" || studioTier?.name !== "The Studio") {
  throw new Error("industries: pricing.tiers order changed; update proof.ts");
}

/** "2-week delivery" -> "2 weeks". */
function weeks(timeline: string): string {
  const m = timeline.match(/(\d+)-week/);
  if (!m) throw new Error(`industries: "${timeline}" has no week count`);
  return `${m[1]} weeks`;
}

const landingTimeline = landingPages.hero.chips.find((c) => /week/i.test(c));
if (!landingPages.pricing.from || !landingTimeline) {
  throw new Error("industries: landing page price or timeline missing");
}

export type Package = {
  name: string;
  /** "From €1,250", exactly as published. */
  price: string;
  /** "2 weeks", "Live in about a week". */
  timeline: string;
  /** "Up to 5 pages", "fixed, per page". */
  scope: string;
  href: string;
};

export const PACKAGES: Record<PackageKey, Package> = {
  minimum: {
    name: minimumTier.name,
    price: minimumTier.price,
    timeline: weeks(minimumTier.timeline),
    scope: minimumTier.features[0],
    href: "/#pricing",
  },
  studio: {
    name: studioTier.name,
    price: studioTier.price,
    timeline: weeks(studioTier.timeline),
    scope: studioTier.features[0],
    href: "/#pricing",
  },
  landing: {
    name: "Landing page",
    price: landingPages.pricing.from,
    timeline: landingTimeline,
    scope: landingPages.pricing.fromNote ?? "",
    href: "/services/landing-pages",
  },
};

/** "From €1,250" -> "1250", for schema offers. */
export function priceNumber(price: string): string {
  const digits = price.replace(/[^\d]/g, "");
  if (!digits) throw new Error(`industries: "${price}" has no number`);
  return digits;
}

/** Lowercases the first letter, for a price or timeline mid-sentence. */
export function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
