import { fx, type Currency } from "@/content/fx";

/**
 * The website cost calculator's pricing logic (cost calculator brief, 20 Nov
 * 2026). Pure: answers and a price book in, estimate out. No React, no
 * state, so the page renders the default estimate on the server and the
 * client island reruns the same function on every change. Tested by
 * lib/website-cost.test.mjs.
 *
 * NO PRICE IS TYPED HERE. Every figure arrives in the `PriceBook`, which
 * content/tools/price-book.ts builds on the server from where each price is
 * published: content/home.ts (`pricing.tiers`), landing-pages.ts
 * (`landingPriceSteps`, `landingPackage`), website-migration.ts, and the
 * vendor plans in content/comparisons/vendors.ts. The book is plain data, so
 * it crosses to the client island as a prop and the island never bundles
 * those content files. Anything without a published number is "quoted" and
 * stays out of the totals.
 *
 * Money stays in its own currency (ours EUR, vendors USD) inside an
 * Estimate. Conversion happens only in `show()` and `yearOne()`, at render,
 * at the ECB rates in content/fx.ts. Every figure shown is rounded to the
 * nearest 10 in all three currencies, and flagged `approx` when converting
 * or rounding changed it, so the page can mark it "≈".
 */

/* ------------------------------------------------------------------ *
 * The price book
 * ------------------------------------------------------------------ */

type Tier = {
  name: string;
  /** As published: "From €1,250", "€2,350". */
  price: string;
  /** "one-time, 2 instalments". */
  priceNote: string;
  /** "2-week delivery". */
  timeline: string;
  /** Read from the tier's "Up to N pages" feature. */
  pages: number;
};

type Plan = { name: string; perMonth: number };

export type PriceBook = {
  minimum: Tier;
  studio: Tier;
  /** The ongoing tier: name and its price word ("Custom"). */
  zenith: { name: string; price: string };
  landing: {
    name: string;
    /** EUR, from landingPriceSteps. */
    upToTwo: number;
    three: number;
    maxPages: number;
    priceNote: string;
    /** "Live in about a week". */
    timeline: string;
  };
  migrationTimeline: string;
  /** Vendor list prices, USD a month. */
  plans: {
    wixBasic: Plan;
    wixStandard: Plan;
    shopifyBasic: Plan;
    vercelPro: Plan;
    sanityFree: Plan;
  };
};

/** Owner decisions, 20 Nov 2026. Rules, not prices. */
export const RULES = {
  /** An online store is The Studio up to this many products; over it, quoted. */
  studioProducts: 100,
  /** This many Studio extras move a 1 to 5 page build to The Studio. */
  studioExtras: 2,
  /** The pages slider's top stop, which reads "20+". */
  maxPages: 20,
} as const;

/* ------------------------------------------------------------------ *
 * Inputs
 * ------------------------------------------------------------------ */

export type Need = "new" | "migration" | "landing";
export type PlatformKey = "wix" | "custom" | "shopify";
export type ExtraKey = "cms" | "integrations" | "copy" | "store" | "languages";

export type CostInput = {
  need: Need;
  /** 1 to RULES.maxPages, the top stop reading "20+". */
  pages: number;
  platform: PlatformKey;
  extras: ExtraKey[];
  /** Product count, used only with the online store. */
  products: number;
  /** Ongoing work after launch (The Zenith). */
  ongoing: boolean;
};

/** Extras that move a 1 to 5 page build towards The Studio. */
export const STUDIO_EXTRAS: ExtraKey[] = ["cms", "integrations", "copy"];
/** Extras a landing page already includes (its "What's included"). */
export const LANDING_INCLUDES: ExtraKey[] = ["integrations", "copy"];
/** Extras that make a landing page a website. */
export const WEBSITE_ONLY: ExtraKey[] = ["cms", "store"];

/** New website, The Minimum's page count, Wix Studio, no extras. */
export function defaultInput(book: PriceBook): CostInput {
  return { need: "new", pages: book.minimum.pages, platform: "wix", extras: [], products: 25, ongoing: false };
}

/* ------------------------------------------------------------------ *
 * Output
 * ------------------------------------------------------------------ */

export type Money = { amount: number; currency: Currency };

export type Price =
  | { kind: "fixed"; value: Money }
  | { kind: "from"; value: Money }
  | { kind: "range"; low: Money; high: Money }
  | { kind: "quoted" };

export type BuildTier = "landing" | "minimum" | "range" | "studio" | "quoted";
export type QuotedItem = "build" | "platform" | "languages" | "ongoing";

export type PlatformPlan = {
  key: "wix-basic" | "wix-standard" | "shopify-basic" | "vercel-sanity" | "custom-store";
  /** "Wix Studio Basic"; empty when quoted. */
  name: string;
  /** Twelve months of the plan, in the vendor's currency; quoted for a custom-code store. */
  price: Price;
  /** The vendor's monthly figure, for the detail line. */
  perMonth: Money | null;
};

export type Estimate = {
  /** The answers as estimated: a landing page that became a website reads "new". */
  input: CostInput;
  /** Why a landing page became a website, if it did. */
  switched: null | "landing-pages" | "landing-extra";
  build: {
    tier: BuildTier;
    /** The tier's name; for the range, The Minimum's (the build it starts from); empty when quoted. */
    name: string;
    price: Price;
    pages: number;
    /** The one Studio extra that puts a 1 to 5 page build in the range. */
    rangeExtra: ExtraKey | null;
    quotedReason: null | "pages" | "products";
    /** "one-time, 2 instalments", from the tier. */
    priceNote: string;
  };
  platform: PlatformPlan;
  extras: {
    /** Extras the build covers. */
    included: ExtraKey[];
    /** Extras scoped on the call. */
    quoted: ExtraKey[];
  };
  ongoing: boolean;
  /** Typical timeline, or null when the build is quoted. */
  timeline: string | null;
  quoted: QuotedItem[];
};

/** "From €1,250" -> 1250. */
export function euros(price: string): number {
  const m = price.match(/€\s?([\d,]+)/);
  if (!m) throw new Error(`website-cost: no euro amount in "${price}"`);
  return Number(m[1].replace(/,/g, ""));
}

/** "2-week delivery" -> 2. */
function weeksOf(timeline: string): number {
  const m = timeline.match(/(\d+)-week/);
  if (!m) throw new Error(`website-cost: no week count in "${timeline}"`);
  return Number(m[1]);
}

const eur = (amount: number): Money => ({ amount, currency: "EUR" });
const usd = (amount: number): Money => ({ amount, currency: "USD" });

/** A published price string as a Price: "From €1,250" or "€2,350". */
function priceOf(published: string): Price {
  const value = eur(euros(published));
  return /^from\b/i.test(published) ? { kind: "from", value } : { kind: "fixed", value };
}

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, Math.round(Number.isFinite(n) ? n : lo)));

/** "Live in about a week" -> "About a week". */
function sentence(timeline: string): string {
  const t = timeline.replace(/^live in\s+/i, "");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function platformPlan(book: PriceBook, platform: PlatformKey, store: boolean): PlatformPlan {
  const year = (perMonth: number): Price => ({ kind: "fixed", value: usd(perMonth * 12) });
  if (platform === "wix") {
    // A store needs the first Wix Studio plan that takes payments.
    const plan = store ? book.plans.wixStandard : book.plans.wixBasic;
    return {
      key: store ? "wix-standard" : "wix-basic",
      name: `Wix Studio ${plan.name}`,
      price: year(plan.perMonth),
      perMonth: usd(plan.perMonth),
    };
  }
  if (platform === "shopify") {
    const plan = book.plans.shopifyBasic;
    return { key: "shopify-basic", name: `Shopify ${plan.name}`, price: year(plan.perMonth), perMonth: usd(plan.perMonth) };
  }
  // Custom code: Vercel Pro hosting and Sanity's free plan (owner, 20 Nov
  // 2026). A store on custom code needs a commerce backend with no published
  // price, so the plan is quoted.
  if (store) return { key: "custom-store", name: "", price: { kind: "quoted" }, perMonth: null };
  const { vercelPro: host, sanityFree: cms } = book.plans;
  return {
    key: "vercel-sanity",
    name: `Vercel ${host.name} and Sanity ${cms.name}`,
    price: year(host.perMonth + cms.perMonth),
    perMonth: usd(host.perMonth + cms.perMonth),
  };
}

/** The estimate for one set of answers. */
export function estimate(raw: CostInput, book: PriceBook): Estimate {
  const extras = [...new Set(raw.extras)];
  const pages = clamp(raw.pages, 1, RULES.maxPages);
  let need = raw.need;
  let switched: Estimate["switched"] = null;

  // A landing page grows into a website at 4 or more pages (The Minimum
  // covers up to 5), or with a blog or a store, which a landing page doesn't carry.
  if (need === "landing") {
    if (pages > book.landing.maxPages) {
      need = "new";
      switched = "landing-pages";
    } else if (extras.some((e) => WEBSITE_ONLY.includes(e))) {
      need = "new";
      switched = "landing-extra";
    }
  }

  const input: CostInput = { ...raw, need, pages, extras, products: clamp(raw.products, 1, 100000) };
  const store = need !== "landing" && extras.includes("store");
  const studioExtras = extras.filter((e) => STUDIO_EXTRAS.includes(e));
  const languages = extras.includes("languages");
  const { minimum, studio } = book;
  const migrating = need === "migration";
  const weeks = (n: number) => `${n} weeks`;

  let build: Estimate["build"];
  let timeline: string | null;
  const tierBuild = (tier: Tier, kind: "minimum" | "studio"): Estimate["build"] => ({
    tier: kind,
    name: tier.name,
    price: priceOf(tier.price),
    pages,
    rangeExtra: null,
    quotedReason: null,
    priceNote: tier.priceNote,
  });

  if (need === "landing") {
    build = {
      tier: "landing",
      name: book.landing.name,
      price:
        pages <= 2
          ? { kind: "from", value: eur(book.landing.upToTwo) }
          : { kind: "fixed", value: eur(book.landing.three) },
      pages,
      rangeExtra: null,
      quotedReason: null,
      priceNote: book.landing.priceNote,
    };
    timeline = sentence(book.landing.timeline);
  } else if (pages > studio.pages || (store && input.products > RULES.studioProducts)) {
    build = {
      tier: "quoted",
      name: "",
      price: { kind: "quoted" },
      pages,
      rangeExtra: null,
      quotedReason: pages > studio.pages ? "pages" : "products",
      priceNote: "",
    };
    timeline = null;
  } else if (store || pages > minimum.pages || studioExtras.length >= RULES.studioExtras) {
    build = tierBuild(studio, "studio");
    timeline = migrating ? book.migrationTimeline : weeks(weeksOf(studio.timeline));
  } else if (studioExtras.length === 1) {
    // One extra sits between the two published prices (owner, 20 Nov 2026).
    build = {
      ...tierBuild(minimum, "minimum"),
      tier: "range",
      price: { kind: "range", low: eur(euros(minimum.price)), high: eur(euros(studio.price)) },
      rangeExtra: studioExtras[0],
    };
    timeline = migrating
      ? book.migrationTimeline
      : `${weeksOf(minimum.timeline)} to ${weeks(weeksOf(studio.timeline))}`;
  } else {
    build = tierBuild(minimum, "minimum");
    timeline = migrating ? book.migrationTimeline : weeks(weeksOf(minimum.timeline));
  }

  const platform = platformPlan(book, input.platform, store);

  const included =
    need === "landing"
      ? extras.filter((e) => LANDING_INCLUDES.includes(e))
      : build.tier === "quoted"
        ? []
        : extras.filter((e) => e !== "languages");

  const quoted: QuotedItem[] = [];
  if (build.price.kind === "quoted") quoted.push("build");
  if (platform.price.kind === "quoted") quoted.push("platform");
  if (languages) quoted.push("languages");
  if (raw.ongoing) quoted.push("ongoing");

  return {
    input,
    switched,
    build,
    platform,
    extras: { included, quoted: languages ? ["languages"] : [] },
    ongoing: raw.ongoing,
    timeline,
    quoted,
  };
}

/* ------------------------------------------------------------------ *
 * Rendering in a currency
 * ------------------------------------------------------------------ */

/** A price in the display currency. `approx` when any part was converted. */
export type Shown =
  | { kind: "fixed" | "from" | "range"; low: number; high: number; currency: Currency; approx: boolean }
  | { kind: "quoted"; low: 0; high: 0; currency: Currency; approx: false };

const round10 = (n: number) => Math.round(n / 10) * 10;

/**
 * One amount in the display currency, rounded to the nearest 10 in every
 * currency (owner, 20 Nov 2026), so a vendor's US$144 shows as ≈US$140 in
 * dollars just as it shows ≈€130 in euros. `approx` when converting or
 * rounding changed the figure; our euro prices are already round, so they
 * stay exact in euros.
 */
export function convert(m: Money, to: Currency): { amount: number; approx: boolean } {
  const exact = m.currency === to ? m.amount : (m.amount / fx.perEuro[m.currency]) * fx.perEuro[to];
  const amount = round10(exact);
  return { amount, approx: m.currency !== to || amount !== m.amount };
}

/** The exact euro value, unrounded: for drawing amounts on one shared scale. */
export function inEuro(m: Money): number {
  return m.amount / fx.perEuro[m.currency];
}

export function show(price: Price, to: Currency): Shown {
  if (price.kind === "quoted") return { kind: "quoted", low: 0, high: 0, currency: to, approx: false };
  if (price.kind === "range") {
    const low = convert(price.low, to);
    const high = convert(price.high, to);
    return { kind: "range", low: low.amount, high: high.amount, currency: to, approx: low.approx || high.approx };
  }
  const v = convert(price.value, to);
  return { kind: price.kind, low: v.amount, high: v.amount, currency: to, approx: v.approx };
}

/**
 * Year one = build + platform plan, in the display currency: the sum of the
 * two figures as shown, so the rows visibly add up, with "≈" if either was
 * converted. A quoted build makes the year quoted; a quoted platform plan
 * stays out of the total and is listed as scoped on the call.
 */
export function yearOne(e: Estimate, to: Currency): Shown {
  const build = show(e.build.price, to);
  if (build.kind === "quoted") return build;
  const plan = show(e.platform.price, to);
  return {
    kind: build.kind,
    low: build.low + plan.low,
    high: build.high + plan.high,
    currency: to,
    approx: build.approx || plan.approx,
  };
}

const SYMBOL: Record<Currency, string> = { EUR: "€", GBP: "£", USD: "US$" };

/** "€1,250", "£110", "US$144". */
export function money(amount: number, currency: Currency): string {
  return `${SYMBOL[currency]}${Math.round(amount).toLocaleString("en-GB")}`;
}

/** "From €1,250", "≈£1,040", "€1,250 to €2,350", "From ≈US$1,514", or the quoted word. */
export function formatShown(s: Shown, quotedLabel = "Quoted"): string {
  if (s.kind === "quoted") return quotedLabel;
  const approx = s.approx ? "≈" : "";
  if (s.kind === "range") return `${approx}${money(s.low, s.currency)} to ${money(s.high, s.currency)}`;
  const figure = `${approx}${money(s.low, s.currency)}`;
  return s.kind === "from" ? `From ${figure}` : figure;
}

/** A price straight into a currency. */
export function formatPrice(price: Price, to: Currency, quotedLabel?: string): string {
  return formatShown(show(price, to), quotedLabel);
}
