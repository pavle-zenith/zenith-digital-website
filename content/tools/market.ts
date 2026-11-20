import type { Currency } from "@/content/fx";

/**
 * Market price ranges for the website cost calculator's "three ways to buy
 * it" cards, and the sources behind them (cost calculator brief, 20 Nov
 * 2026). Each figure is what its source publishes, stored in the source's
 * own currency and never scaled by us; the page converts it only at render.
 *
 * The sources are listed only in the collapsed "How we estimate" section
 * above the footer (owner, 20 Nov 2026), never in or beside the calculator.
 */

export type MarketSource = {
  name: string;
  title: string;
  href: string;
  /** How fresh the source says its data is, as the source words it. */
  dated: string;
  /** What the source publishes, in its own figures. */
  figures: string[];
  /** What the source is. */
  what: string;
};

/** Whito's published UK ranges, GBP: the figures both cards are drawn from. */
export const whitoRanges = {
  freelancer5: { low: 1500, high: 3000 },
  agency5: { low: 3000, high: 5000 },
  custom15: { low: 5000, high: 15000 },
  currency: "GBP" as Currency,
};

const gbp = (r: { low: number; high: number }) =>
  `£${r.low.toLocaleString("en-GB")} to £${r.high.toLocaleString("en-GB")}`;

export const marketSources = {
  whito: {
    name: "Whito",
    title: "Website design costs UK",
    href: "https://whito.co.uk/research/website-design-costs-uk/",
    dated: "data verified 19 October 2026",
    figures: [
      `Freelancer, 5-page site: ${gbp(whitoRanges.freelancer5)}`,
      `Agency, 5-page site: ${gbp(whitoRanges.agency5)}`,
      `Custom site, 15+ pages: ${gbp(whitoRanges.custom15)}`,
    ],
    what: "A UK web design business publishing aggregated pricing from 78 firms.",
  },
  clutch: {
    name: "Clutch",
    title: "Web design pricing",
    href: "https://clutch.co/web-designers/pricing",
    dated: "updated 21 September 2026",
    figures: [
      "Agencies typically charge US$2,000 to US$100,000",
      "Most projects reviewed cost under US$10,000",
    ],
    what: "A B2B review platform, pricing drawn from the projects reviewed on it.",
  },
  upwork: {
    name: "Upwork",
    title: "Web designer cost",
    href: "https://www.upwork.com/hire/web-designers/cost/",
    dated: "",
    figures: ["Median freelance web designer rate: US$15 to US$30 an hour"],
    what: "A freelance marketplace, rates from designers hired on it.",
  },
  startups: {
    name: "Startups.co.uk",
    title: "How much does a website cost",
    href: "https://startups.co.uk/websites/creating/how-much-does-a-website-cost/",
    dated: "updated 23 March 2026",
    figures: ["£300 to £10,000+ upfront"],
    what: "A UK small-business publication.",
  },
} satisfies Record<string, MarketSource>;

export type MarketRange = {
  low: number;
  high: number;
  currency: Currency;
};

/**
 * The two market cards. Freelancer is Whito's freelancer 5-page range;
 * agency runs from Whito's agency 5-page floor to its custom 15+ page ceiling.
 */
export const marketRanges = {
  freelancer: {
    range: { ...whitoRanges.freelancer5, currency: whitoRanges.currency } satisfies MarketRange,
    basis: "Typical market range, 5-page site",
  },
  agency: {
    range: { low: whitoRanges.agency5.low, high: whitoRanges.custom15.high, currency: whitoRanges.currency } satisfies MarketRange,
    basis: "Typical market range, 5 to 15+ pages",
  },
  /** For prose: "£1,500 to £3,000". */
  text: { freelancer5: gbp(whitoRanges.freelancer5), agency5: gbp(whitoRanges.agency5) },
};

/** The shared scale all three cards are drawn on: €0 to €20,000. */
export const marketScale = { max: 20000, currency: "EUR" as Currency };
