import { pricing } from "@/content/home";
import { pPricing } from "@/content/partnerships";
import { wixStudio, perMonthYearly } from "@/content/comparisons/vendors";
import { landingPackage, landingPages, landingPriceSteps } from "@/content/service-pages/landing-pages";
import { seoAeoPpc } from "@/content/service-pages/seo-aeo-ppc";
import { websiteMigration } from "@/content/service-pages/website-migration";
import { wixStudioDevelopment } from "@/content/service-pages/wix-studio-development";
import { wixStudioWebsiteDesign } from "@/content/service-pages/wix-studio-website-design";
import type { CtaLink } from "@/lib/types";

/**
 * /pricing and /pricing.md (pricing page brief, 20 Nov 2026).
 *
 * NO PRICE IS TYPED HERE. Every figure is read from where it already lives,
 * so changing a tier in content/home.ts changes the homepage, /pricing and
 * /pricing.md together:
 *   - tiers (The Minimum, The Studio, The Zenith): content/home.ts `pricing`
 *   - landing page: content/service-pages/landing-pages.ts `landingPackage`
 *   - migration, development, SEO: each service page's `pricing`
 *   - agencies: content/partnerships.ts `pPricing`
 *   - the Wix plan in "not included": content/comparisons/vendors.ts
 * What's typed here is the page's own copy, and labels for the two services
 * with no published number (development and SEO), quoting their pages.
 *
 * Owner, 20 Nov 2026: the "not included" list, the payment dates and the
 * consistency list are confirmed. Both packages are 2 instalments (50% to
 * start, 50% at launch), support is 30 days on every build, there is no
 * care plan, and the same prices apply on Wix Studio, custom code and
 * Shopify. Re-confirm with the owner before changing any of these.
 */

/** ISO date of the last change to this page's prices or copy. */
export const PRICING_UPDATED = "2026-11-20";

const [minimum, studio, zenith] = pricing.tiers;

/** "2-week delivery" -> "2 weeks"; anything else as written. */
function weeks(timeline: string) {
  const m = timeline.match(/(\d+)-week/);
  return m ? `${m[1]} weeks` : timeline;
}

/** "€1,250" -> "1250" for schema offers; null when there's no number. */
export function priceAmount(price: string): string | null {
  const digits = price.replace(/[^\d]/g, "");
  return digits || null;
}

// ---------------------------------------------------------------------------
// The four website packages, in the order the explorer lists them.

export type PackageKey = "landing" | "minimum" | "studio" | "zenith";

export type PricePackage = {
  key: PackageKey;
  /** Explorer group: one-off fixed builds, or monthly. */
  group: "once" | "monthly";
  name: string;
  icon: string;
  badge: string;
  /** The billing chip: "One-time", "Per page" or "Monthly", from the price note. */
  billing: string;
  summary: string;
  /** Exactly as published: "From €1,250", "€2,350", "Custom". */
  price: string;
  priceNote: string;
  timeline: string;
  featuresLabel: string;
  features: string[];
  cta: CtaLink;
  /** The service page with the detail, when there is one. */
  href?: string;
  /** Schema: billed per month, or one-time. */
  unit: "once" | "month";
};

export const pricePackages: PricePackage[] = [
  {
    key: "landing",
    group: "once",
    name: landingPackage.name,
    icon: landingPackage.icon,
    badge: "",
    billing: landingPackage.priceNote.includes("per page") ? "Per page" : "One-time",
    summary: landingPackage.summary,
    price: landingPackage.price,
    priceNote: landingPackage.priceNote,
    timeline: landingPackage.timeline,
    featuresLabel: landingPages.included.heading,
    features: landingPackage.features,
    cta: { label: "Brief a landing page", href: "/book-a-call" },
    href: "/services/landing-pages",
    unit: "once",
  },
  ...[minimum, studio, zenith].map(
    (tier, i): PricePackage => ({
      key: (["minimum", "studio", "zenith"] as const)[i],
      group: tier.priceNote.includes("monthly") ? "monthly" : "once",
      name: tier.name,
      icon: tier.icon,
      badge: tier.badge,
      billing: tier.priceNote.includes("monthly") ? "Monthly" : "One-time",
      summary: tier.summary,
      price: tier.price,
      priceNote: tier.priceNote,
      timeline: tier.timeline,
      featuresLabel: tier.featuresLabel,
      features: tier.features,
      cta: tier.cta,
      href: i < 2 ? "/services/wix-studio-website-design" : undefined,
      unit: tier.priceNote.includes("monthly") ? "month" : "once",
    }),
  ),
];

export const packageGroups: { key: PricePackage["group"]; label: string }[] = [
  { key: "once", label: "Fixed price" },
  { key: "monthly", label: "Monthly" },
];

// ---------------------------------------------------------------------------
// What's included: the three tiers side by side. The tiers are cumulative
// ("Everything in The Studio, plus"), so a tier carries every feature above
// it, except where it states its own version of the same thing (pages,
// revisions, SEO, support): those are one row with each tier's own value.
// The landing page isn't a column: its inclusions are a different list (copy,
// design, integrations, analytics), and ticking tier rows for it would be
// guessing. Its tab lists them.

const KINDS: { label: string; match: RegExp }[] = [
  { label: "Pages", match: /\bpages?\b/i },
  { label: "Revisions", match: /revision/i },
  { label: "SEO", match: /\bSEO\b/ },
  { label: "Support", match: /support/i },
];

export type MatrixRow = {
  label: string;
  /** One cell per tier: true (tick), false (not in this tier), or a value. */
  cells: (boolean | string)[];
};

function buildMatrix(): MatrixRow[] {
  const tiers = [minimum, studio, zenith];
  const rows: MatrixRow[] = [
    { label: "Price", cells: tiers.map((t) => t.price) },
    { label: "Delivery", cells: tiers.map((t) => weeks(t.timeline)) },
  ];
  // Value rows: each tier's own feature of that kind, else the one it inherits.
  for (const kind of KINDS) {
    let carried: string | false = false;
    const cells = tiers.map((t) => {
      const own = t.features.find((f) => kind.match.test(f));
      if (own) carried = own;
      return carried;
    });
    if (cells.some(Boolean)) rows.push({ label: kind.label, cells });
  }
  // Tick rows: every other feature, from the tier that introduces it onward.
  tiers.forEach((tier, i) => {
    for (const feature of tier.features) {
      if (KINDS.some((k) => k.match.test(feature))) continue;
      rows.push({ label: feature, cells: tiers.map((_, j) => j >= i) });
    }
  });
  return rows;
}

export const includedMatrix = {
  heading: "What's included",
  intro: "The three website packages side by side. Each one includes everything in the one before it.",
  columns: [minimum.name, studio.name, zenith.name],
  rows: buildMatrix(),
};

// ---------------------------------------------------------------------------
// Other services: price and what decides it, each read from its own page.

const dev = wixStudioDevelopment.pricing;
const seo = seoAeoPpc.pricing;
const [agencyMonthly, agencyFixed, agencyReferral] = pPricing.tiers;
/** Lower-cases a title's first letter for mid-sentence use, unless it starts an acronym ("CMS"). */
const midSentence = (title: string) =>
  /^[A-Z][a-z]/.test(title) ? title.charAt(0).toLowerCase() + title.slice(1) : title;
const decides = (drivers: { title: string }[]) =>
  drivers.map((d, i) => (i === 0 ? d.title : midSentence(d.title))).join(", ");

export const otherServices = {
  heading: "Other services",
  intro: "Priced on their own pages, collected here. Where there's no published number, the page says why.",
  columns: { service: "Service", price: "Price", decides: "What decides it" },
  driversLabel: "What decides it",
  link: "See the service",
  prev: "Previous service",
  next: "Next service",
  rows: [
    {
      service: "Website migration",
      icon: "transfer",
      badge: "One-time",
      drivers: websiteMigration.pricing.drivers.map((d) => d.title),
      price: websiteMigration.pricing.from ?? "",
      priceNote: websiteMigration.pricing.fromNote ?? "",
      decides: decides(websiteMigration.pricing.drivers),
      href: "/services/website-migration",
      offer: true,
    },
    {
      service: "Landing page",
      icon: landingPackage.icon,
      badge: "One-time",
      drivers: landingPages.pricing.drivers.map((d) => d.title),
      price: landingPages.pricing.from ?? "",
      priceNote: landingPages.pricing.fromNote ?? "",
      decides: decides(landingPages.pricing.drivers),
      href: "/services/landing-pages",
      offer: false,
    },
    {
      service: "Wix Studio development",
      icon: "braces",
      badge: "Quoted",
      drivers: dev.drivers.map((d) => d.title),
      // No published number: the page's own note says it's fixed in the
      // technical proposal ("You get a fixed number in the technical proposal").
      price: "Fixed in a technical proposal",
      priceNote: "",
      decides: decides(dev.drivers),
      href: "/services/wix-studio-development",
      offer: false,
    },
    {
      service: "SEO, AEO and PPC",
      icon: "search",
      badge: "Ongoing",
      drivers: seo.drivers.map((d) => d.title),
      // No published number: the page explains why ("Why this one isn't a
      // fixed price"); the scope follows the budget and the audit.
      price: "Scoped to budget",
      priceNote: "",
      decides: decides(seo.drivers),
      href: "/services/seo-aeo-ppc",
      offer: false,
    },
    {
      service: "For agencies",
      icon: "handshake",
      badge: "Partners",
      // The three partner tracks, each with its own price.
      drivers: [agencyFixed, agencyMonthly, agencyReferral].map(
        (t) => `${t.name}: ${t.price.toLowerCase()} ${t.priceNote}`,
      ),
      price: `${agencyFixed.price} ${agencyFixed.priceNote}`,
      // The three tracks are the card's list, so no separate note.
      priceNote: "",
      driversLabel: "Three ways to work with us",
      decides: "White-label per build, a monthly production slot, or referral",
      href: "/partnerships",
      offer: true,
    },
  ],
};

// ---------------------------------------------------------------------------
// Copy around the figures.

/** The arithmetic from the Wix Studio design page, lifted once, unchanged. */
const worthIt = (() => {
  const quote = wixStudioWebsiteDesign.pricing.pullQuote ?? "";
  const sentence = quote.split(": ")[1]?.split(". ")[0] ?? "";
  return sentence ? `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.` : "";
})();

/** "The price is agreed before we start and it doesn't move unless you add scope." */
const scopeRule = `${wixStudioWebsiteDesign.pricing.note.split(". ")[0]}.`;

export const pricingPage = {
  seo: {
    title: "Website design pricing: published, fixed | Zenith Digital",
    description: `Published, fixed website prices: ${minimum.name} ${minimum.price.toLowerCase()}, ${studio.name} ${studio.price}, landing pages ${landingPackage.price.toLowerCase()}. Wix Studio, custom code or Shopify, paid in instalments.`,
  },
  hero: {
    eyebrow: "Pricing",
    h1: "Website prices, published",
    lead: "Fixed prices, agreed in writing before we start. The same whether we build on Wix Studio, in custom code or on Shopify.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      { label: "Free website audit", href: "/free-website-audit", variant: "secondary" },
    ] as CtaLink[],
  },
  inShort: {
    label: "In short",
    // 40 to 60 words, quoted by AI answers. Built from the tiers.
    text: `A website with Zenith Digital costs ${minimum.price.toLowerCase()} for ${minimum.name} (${minimum.features[0].toLowerCase()}, ${weeks(minimum.timeline)}) or ${studio.price} for ${studio.name} (${studio.features[0].toLowerCase()}, ${weeks(studio.timeline)}). Landing pages start at ${landingPackage.price.replace(/^From /, "")} for up to two pages, ${landingPriceSteps.threePages} for three. Prices are fixed in writing, paid in instalments, and the same on Wix Studio, custom code or Shopify. ${zenith.name} is a custom monthly retainer.`,
    machineLink: { label: "Machine-readable version", href: "/pricing.md" },
  },
  packages: {
    heading: "Website packages",
    intro: "Pick a package to see what it includes. Every price is fixed before we start.",
    seeService: "How these builds run",
    /** Selected on load (owner, 20 Nov 2026). */
    defaultKey: "minimum" as PackageKey,
    /** Under the list: the closing band's promise, for the undecided. */
    help: {
      heading: "Not sure which fits?",
      text: "A free 20-minute call. You'll leave with a fixed price and a launch date.",
      cta: { label: "Book a call", href: "/book-a-call" },
    },
  },
  notIncluded: {
    heading: "What's not in the price",
    intro: "Platform and third-party costs, paid by you directly to the provider, so you own every account.",
    // Owner, 20 Nov 2026: confirmed. Platform, domain, paid apps and ad spend
    // are paid by the client directly to the provider.
    items: [
      {
        title: "The platform plan",
        body: `Wix Studio from ${perMonthYearly(wixStudio.plans.basic.perMonth)}, a Shopify plan, or hosting for a custom build.`,
      },
      { title: "Your domain", body: "registered in your name, renewed yearly." },
      { title: "Paid apps and plugins", body: "only the ones you choose to add." },
      { title: "Ad spend", body: "paid to the ad platforms, separate from any campaign management." },
    ],
    link: { label: "What each platform costs to run", href: "/compare" },
  },
  payment: {
    heading: "How payment works",
    // Owner, 20 Nov 2026: confirmed. 50% to start, 50% at launch on both
    // packages, matching content/faq.ts "How do payments work?" and the
    // partner terms.
    schedule: [
      { name: minimum.name, note: minimum.priceNote, due: "50% to start, 50% at launch" },
      { name: studio.name, note: studio.priceNote, due: "50% to start, 50% at launch" },
      { name: zenith.name, note: zenith.priceNote, due: "billed monthly" },
    ],
    // content/faq.ts "How do payments work?": "No financing, no interest".
    noFinancing: "No financing and no interest, just the project cost spread across the project",
    icons: ["card", "calendar", "receipt", "lock"],
    whenLabel: "When you pay",
    scopeRule,
  },
  worthIt: {
    heading: "Is it worth it?",
    text: worthIt,
  },
  faq: {
    heading: ["Pricing questions,", "answered straight"],
    subhead: "If yours isn't here, ask on a call.",
    items: [
      {
        q: "How much does a website cost with Zenith Digital?",
        a: "", // filled below from inShort
      },
      {
        q: "Do prices differ between Wix Studio, custom code and Shopify?",
        a: "No. The same packages and prices apply whether we build on Wix Studio, in custom code (Next.js with Sanity) or on Shopify. The platform plan, hosting or Shopify subscription is separate, and you pay it directly.",
      },
      {
        q: "What isn't included in the price?",
        a: "", // filled below from notIncluded
      },
      {
        q: "Can I pay in instalments?",
        a: `Yes. ${minimum.name} and ${studio.name} are both ${minimum.priceNote.replace(/^one-time, /, "")}: 50% to start and 50% at launch. No financing and no interest.`,
      },
      {
        q: "What happens after the free support period?",
        a: `${minimum.name} and ${studio.name} include ${minimum.features.find((f) => /support/i.test(f))?.toLowerCase()}. After that, call us when you need something, or move to ${zenith.name} for ongoing work.`,
      },
      {
        q: "Do your prices ever change mid-project?",
        a: `No. ${scopeRule} You approve the fixed price before we begin.`,
      },
    ],
  },
  finalCta: {
    heading: ["Know your number", "before the call ends"],
    paragraph:
      "A free 20-minute call. Tell us what the site has to do, and you'll leave with a fixed price and a launch date.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },
};

pricingPage.faq.items[0].a = pricingPage.inShort.text;
pricingPage.faq.items[2].a = `Platform and third-party costs, which you pay directly so you own every account: the platform plan (Wix Studio from ${perMonthYearly(wixStudio.plans.basic.perMonth)}, a Shopify plan, or hosting for a custom build), your domain, any paid apps or plugins you add, and ad spend.`;
