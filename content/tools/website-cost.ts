import { comparison, pricing } from "@/content/home";
import { fx } from "@/content/fx";
import { pricingPage } from "@/content/pricing";
import { websiteMigration } from "@/content/service-pages/website-migration";
import { sServices } from "@/content/services";
import { marketRanges } from "@/content/tools/market";
import { priceBook } from "@/content/tools/price-book";
import { COST_CALCULATOR_PATH } from "@/content/tools/status";
import {
  defaultInput,
  estimate,
  formatPrice,
  money,
  type ExtraKey,
  type Need,
  type PlatformKey,
  RULES,
} from "@/lib/website-cost";

/**
 * /tools/website-cost-calculator: the page's words (cost calculator brief,
 * 20 Nov 2026). No price is typed here either: every figure in the short
 * answer and the FAQ comes from the price book (content/tools/price-book.ts)
 * through the same estimate function the calculator runs, so the prose and
 * the widget can't disagree.
 *
 * `calculatorCopy` crosses to the client island, so it is plain strings.
 */

/** ISO date of the last change to this page's figures. */
export const COST_CALCULATOR_UPDATED = "2026-11-20";

const b = priceBook;

/** A client mockup from the services slider, by its image: no retyped client names. */
function mockup(image: string) {
  const slide = sServices.flatMap((s) => s.slides).find((s) => s.image === image);
  if (!slide) throw new Error(`website-cost: no services slide "${image}"`);
  return { image: slide.image, client: slide.client };
}
const [minimum] = pricing.tiers;
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** "30 days", from the tiers' support feature. */
const supportDays = minimum.features.join(" ").match(/(\d+ days)/)?.[1] ?? "";
/**
 * A plan's year exactly as the vendor prices it, for prose: "US$144". (The
 * calculator rounds every figure to 10; the short answer and FAQ quote the
 * vendor's own number.)
 */
const usdYear = (...plans: { perMonth: number }[]) =>
  money(plans.reduce((sum, p) => sum + p.perMonth, 0) * 12, "USD");
const wixYear = usdYear(b.plans.wixBasic);
const yearOf = (platform: PlatformKey, extras: ExtraKey[] = []) =>
  platform === "shopify"
    ? usdYear(b.plans.shopifyBasic)
    : platform === "custom"
      ? usdYear(b.plans.vercelPro, b.plans.sanityFree)
      : usdYear(extras.includes("store") ? b.plans.wixStandard : b.plans.wixBasic);

/* ------------------------------------------------------------------ *
 * The calculator's words (client island)
 * ------------------------------------------------------------------ */

export const calculatorCopy = {
  inputs: {
    heading: "Your website",
    currency: "Currency",
  },
  need: {
    n: "01",
    title: "What you need",
    options: [
      { key: "new", label: "New website" },
      { key: "migration", label: "Migration" },
      { key: "landing", label: "Landing page" },
    ] satisfies { key: Need; label: string }[],
  },
  pages: {
    n: "02",
    title: "Pages",
    landingTitle: "Landing pages",
    one: "page",
    many: "pages",
    fewer: "Fewer pages",
    more: "More pages",
    /** "4 or more pages is a website: The Minimum covers up to 5." */
    switchedPages: `${b.landing.maxPages + 1} or more pages is a website: ${b.minimum.name} covers up to ${b.minimum.pages}.`,
    switchedExtra: "A blog or an online store needs a website, so this is now a new website.",
    over: `Over ${b.studio.pages} pages is scoped on the call.`,
  },
  platform: {
    n: "03",
    title: "Platform",
    options: [
      { key: "wix", label: "Wix Studio" },
      { key: "custom", label: "Custom code" },
      { key: "shopify", label: "Shopify" },
    ] satisfies { key: PlatformKey; label: string }[],
    hint: "Same build price on all three. Only the platform plan differs.",
  },
  extras: {
    n: "04",
    title: "Extras",
    // Notes show only under a ticked extra.
    items: [
      { key: "cms", label: "Blog or CMS", note: "A CMS your team can run" },
      {
        key: "integrations",
        label: "Integrations and automations",
        note: "CRM, booking and email, connected to the tools you already use",
      },
      {
        key: "copy",
        label: "Copywriting and full SEO / AEO setup",
        // "The Minimum includes basic on-page SEO", from its feature list.
        note: `${b.minimum.name} includes ${lower(minimum.features.find((f) => /seo/i.test(f)) ?? "")}`,
      },
      { key: "store", label: "Online store", note: `Up to ${RULES.studioProducts} products in ${b.studio.name}` },
      { key: "languages", label: "Multiple languages", note: "Scoped on the call" },
    ] as { key: ExtraKey; label: string; note: string }[],
    products: "Products",
    productsOver: `Over ${RULES.studioProducts} products is scoped on the call.`,
    included: "Included",
    quoted: "Quoted",
  },
  after: {
    n: "05",
    title: "After launch",
    support: `${supportDays} of free support, included.`,
    ongoing: { label: `Ongoing work (${b.zenith.name})`, note: "Growth, SEO, ads, new pages. Custom, monthly." },
  },
  estimate: {
    heading: "Year-one estimate",
    bar: { build: "Build", platform: "Platform plan" },
    build: "Design and build",
    platform: "Platform plan",
    months: "12 months",
    extras: "Extras",
    after: "After launch",
    timeline: "Typical timeline",
    total: "Year one",
    included: "Included",
    none: "None",
    quoted: "Quoted",
    support: `${supportDays} free`,
    ongoing: `${supportDays} free, then ${b.zenith.name}`,
    timelineQuoted: "Set on the call",
    rangeNote: "The exact price is fixed on the call.",
    overPages: `Over ${b.studio.pages} pages`,
    overProducts: `Over ${RULES.studioProducts} products`,
    customStore: "A store on custom code needs a commerce backend",
    quotedItems: {
      build: "The build",
      platform: "The commerce backend",
      languages: "Multiple languages",
      ongoing: "Ongoing work",
    },
    scoped: { one: "is scoped on the call.", many: "are scoped on the call." },
    // "your domain, paid apps and plugins, and ad spend": a serial comma,
    // because one item already has an "and" in it.
    notIncluded: `Not included: ${pricingPage.notIncluded.items
      .filter((i) => !/platform/i.test(i.title))
      .map((i) => lower(i.title))
      .join(", ")
      .replace(/, ([^,]*)$/, ", and $1")}.`,
    cta: { label: "Get an exact price", href: "/book-a-call" },
    secondary: { label: "See every price", href: "/pricing" },
    approx: "≈ converted or rounded.",
    footnote: "We invoice in euros, pounds or dollars. The exact figure in your currency is fixed in your proposal.",
  },
  mobileBar: { label: "Year one", button: "Breakdown" },
  market: {
    heading: "The same site, three ways to buy it",
    intro: "Your estimate next to what freelancers and agencies charge, all on one scale.",
    scale: "Scale",
    labels: { prev: "Previous option", next: "Next option", region: "The same site, three ways to buy it" },
    rowLabels: {
      who: "Who does the work",
      build: "Design and build",
      timeline: "Timeline",
      fixed: "Fixed price",
      migration: "SEO-safe migration",
      support: "Support after launch",
    },
    zenith: {
      name: "Zenith Digital",
      icon: "mountain",
      badge: "Your estimate",
      // "Same team, start to finish": the homepage comparison's row.
      who: comparison.rows.find((r) => /team/i.test(r.criterion))?.values[3].text ?? "",
      landingNote: "One-time, fixed in writing",
      quotedNote: "Scoped on the call",
      fixed: "In writing, before we start",
      migration: `Redirect map and ${supportDays} of Search Console monitoring`,
      support: `${supportDays} of support, and you own every account`,
    },
    freelancer: {
      name: "Freelancer",
      icon: "user",
      basis: marketRanges.freelancer.basis,
      rows: {
        who: "Usually one person",
        build: "Varies by freelancer",
        timeline: "Varies",
        fixed: "Sometimes, often hourly",
        migration: "Varies, ask for a redirect plan",
        support: "Usually billed by the hour",
      },
    },
    agency: {
      name: "Typical agency",
      icon: "building",
      basis: marketRanges.agency.basis,
      rows: {
        who: "A team, often with an account manager",
        build: "Varies with scope",
        timeline: "Usually weeks to months",
        fixed: "Often, after a paid discovery",
        migration: "Often included, check the scope",
        support: "Usually a retainer",
      },
    },
    footnote:
      "Market ranges are what's published for UK small-business sites in 2026. Sources at the bottom of the page.",
  },
};

export type CalculatorCopy = typeof calculatorCopy;

/* ------------------------------------------------------------------ *
 * The page around it (server)
 * ------------------------------------------------------------------ */

const def = estimate(defaultInput(b), b);

export const costCalculatorPage = {
  path: COST_CALCULATOR_PATH,
  seo: {
    title: "Website cost calculator: year-one price | Zenith Digital",
    description:
      "Estimate your website's year-one cost: build, platform plan and timeline on Wix Studio, custom code or Shopify. Our published prices next to market ranges.",
  },
  hero: {
    eyebrow: "Free tool",
    h1: "Website cost calculator",
    lead: "Pick what you need, your pages and a platform to see what year one costs. Every figure is our published price, a vendor list price or a market range.",
  },
  inShort: {
    label: "Short answer",
    // "A 5-page website with Zenith Digital costs from €1,250 to build, plus
    // the platform plan (Wix Studio from US$144 a year). Up to 12 pages with
    // a CMS, integrations and copy is €2,350."
    text: `A ${def.build.pages}-page website with Zenith Digital costs ${lower(formatPrice(def.build.price, "EUR"))} to build, plus the platform plan (Wix Studio from ${wixYear} a year). Up to ${b.studio.pages} pages with a CMS, integrations and copy is ${b.studio.price}.`,
  },
  breadcrumb: { home: "Home", tools: "Tools", page: "Website cost calculator" },
  drivers: {
    heading: "What drives the cost",
    intro: "Four things move the number. Each has its own page.",
    // The looping strip beside the tabs: real client sites from the services
    // slider, one or two per thing that moves the price.
    mockups: [
      "/service-slides/design-sle.webp",
      "/service-slides/dev-yacht-junky.webp",
      "/service-slides/migration-belistria.webp",
      "/service-slides/landing-mod-digital.webp",
      "/service-slides/design-bianomics.webp",
      "/service-slides/migration-genroks.webp",
      "/service-slides/landing-hunting-brook.webp",
      "/service-slides/design-atw-trucking.webp",
    ].map(mockup),
    items: [
      {
        icon: "layers",
        title: "Pages and templates",
        body: `Up to ${b.minimum.pages} pages is ${b.minimum.name}, up to ${b.studio.pages} is ${b.studio.name}. Past ${b.studio.pages}, it's scoped on the call.`,
        links: [{ label: "See every price", href: "/pricing" }],
      },
      {
        icon: "compass",
        title: "The platform",
        body: "The build price is the same on Wix Studio, custom code or Shopify. What changes is the plan you pay the platform.",
        links: [
          { label: "Compare platforms", href: "/compare" },
          { label: "What Wix Studio costs", href: "/blog/wix-studio-pricing" },
        ],
      },
      {
        icon: "transfer",
        title: "Migration",
        body: `Moving platforms is priced like a new build, with the redirect map and ${supportDays} of monitoring in the price.`,
        links: [{ label: "How a migration works", href: "/services/website-migration" }],
      },
      {
        icon: "split",
        title: "Landing pages",
        body: `One or two pages ${lower(formatPrice(estimate({ ...defaultInput(b), need: "landing", pages: 1 }, b).build.price, "EUR"))}, three for ${formatPrice(estimate({ ...defaultInput(b), need: "landing", pages: 3 }, b).build.price, "EUR")}, ${lower(b.landing.timeline)}.`,
        links: [{ label: "Landing pages", href: "/services/landing-pages" }],
      },
    ],
  },
  faq: {
    heading: ["Website costs,", "answered"],
    subhead: "Every answer uses the same published prices as the calculator.",
    items: [
      {
        q: "How much does a small business website cost in 2026?",
        a: `With Zenith Digital, a website of up to ${b.minimum.pages} pages costs ${lower(b.minimum.price)} (${b.minimum.name}) and up to ${b.studio.pages} pages with a CMS, integrations and copy costs ${b.studio.price} (${b.studio.name}), fixed in writing. Add the platform plan, from ${wixYear} a year on Wix Studio. Published UK ranges for a 5-page site run ${marketRanges.text.freelancer5} with a freelancer and ${marketRanges.text.agency5} with an agency.`,
      },
      {
        q: "What does a website cost to run each year?",
        a: `Mostly the platform plan: Wix Studio ${b.plans.wixBasic.name} is ${wixYear} a year (${b.plans.wixStandard.name}, ${yearOf("wix", ["store"])}, for a store), Shopify ${b.plans.shopifyBasic.name} is ${yearOf("shopify")} billed yearly, and a custom-code site on Vercel ${b.plans.vercelPro.name} with Sanity's free plan is ${yearOf("custom")}. Add your domain, renewed yearly, and any paid apps you choose. Ongoing work after the ${supportDays} of free support is optional.`,
      },
      {
        q: "How long does it take to build a website?",
        a: `With Zenith Digital, ${b.minimum.name} (up to ${b.minimum.pages} pages) takes ${def.timeline}, ${b.studio.name} (up to ${b.studio.pages} pages) takes ${estimate({ ...defaultInput(b), pages: b.studio.pages }, b).timeline}, and a landing page is ${lower(b.landing.timeline)}. A migration takes ${b.migrationTimeline}.`,
      },
      {
        q: "How is a website migration priced?",
        a: `On the same tiers as a new build: ${lower(b.minimum.price)} up to ${b.minimum.pages} pages, ${b.studio.price} up to ${b.studio.pages}, quoted above that. ${websiteMigration.pricing.note}`,
      },
      {
        q: "Do prices differ between Wix Studio, custom code and Shopify?",
        a: `No, the build price is the same on all three. Only the platform plan differs: Wix Studio ${b.plans.wixBasic.name} is ${wixYear} a year, Vercel ${b.plans.vercelPro.name} with Sanity ${b.plans.sanityFree.name} is ${yearOf("custom")}, and Shopify ${b.plans.shopifyBasic.name} is ${yearOf("shopify")}. Vendor plans are billed in US dollars.`,
      },
      {
        q: "Is this calculator a quote?",
        a: "No. It's an estimate built from our published prices and the vendors' list prices. The exact price is fixed in writing on a call before any work starts, in euros, pounds or dollars.",
      },
      {
        q: "What does the estimate leave out?",
        a: `Your domain, any paid apps or plugins you add, and ad spend, which you pay directly so you own every account. Multiple languages, stores over ${RULES.studioProducts} products, sites over ${b.studio.pages} pages and ongoing work are scoped on the call.`,
      },
    ],
  },
  finalCta: pricingPage.finalCta,
  sources: {
    summary: "How we estimate and where the numbers come from",
    ours: { label: "Our prices", text: "The tiers and services on our pricing page.", link: { label: "Pricing", href: "/pricing" } },
    plans: { label: "Platform plans", text: "Vendor list prices in US dollars, each read on the vendor's own page." },
    fx: {
      label: "Exchange rates",
      text: `ECB euro reference rates, ${new Date(fx.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}: 1 EUR = ${fx.perEuro.USD} USD, ${fx.perEuro.GBP} GBP. Converted figures are rounded to the nearest 10.`,
    },
    market: { label: "Market ranges" },
    closing: "Market ranges are fixed, not scaled by us. Third-party figures are what those sources publish, not our own research.",
  },
};
