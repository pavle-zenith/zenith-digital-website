/**
 * Vendor prices and plan limits used on the /compare pages, each from the
 * vendor's own pricing page, with the date it was read.
 *
 * Rules (resources brief, Part B): every vendor figure on a comparison comes
 * from here, never typed into prose; each stays in the vendor's own currency
 * (Wix, Webflow and WordPress.com bill in US dollars, our packages are in
 * euros) and is NEVER converted. Re-check a vendor's page before changing a
 * figure, and update its `checked` date when you do.
 *
 * The one exception: the website cost calculator
 * (/tools/website-cost-calculator) converts, because it adds a vendor plan
 * to our build price in the visitor's currency. It still stores every figure
 * here in US dollars and converts only at render, at the ECB rates in
 * content/fx.ts, marking each converted figure "≈". Nowhere else converts.
 *
 * Verified 19 Nov 2026 in a real browser (Chrome via Playwright), USD
 * shown; other regions may see other prices. Every figure below was on the
 * vendor's own page that day:
 *  - wix.com/studio/plans: prices, collaborators, CMS items, payments from
 *    Standard, and the plans table rows for lead-capture forms and storage.
 *  - support.wix.com "CMS: About dynamic pages": 100 static pages.
 *  - webflow.com/pricing: site plans, the hidden comparison table (CMS
 *    items, collections), Workspace seats (one Full seat included), Agency
 *    Workspace client seats, Localize (priced per locale: US$9, 18, 27 for
 *    1 to 3 on Essential; the card doesn't say whether that is the yearly
 *    rate, so copy never says "billed yearly" for it) and Ecommerce plans.
 *  - wordpress.com/pricing: first-year prices billed yearly and the
 *    "Auto-renews at" rate printed under each plan.
 *  - wordpress.org/plugins: "Browse over 79,000 free plugins."
 *
 * Added 20 Nov 2026 for the cost calculator, each read on the vendor's own
 * page that day (USD):
 *  - shopify.com/pricing: Basic US$29, Grow US$79, Advanced US$299 a month
 *    on the "Pay yearly" toggle (US$39, US$105, US$399 paying monthly);
 *    Plus "from $2,300/mo".
 *  - vercel.com/pricing: Hobby US$0, Pro US$20 a month with "a $20 included
 *    credit to use across resources"; "All prices shown are in USD and
 *    exclude value-added tax (VAT) ... and other applicable taxes."
 *  - sanity.io/pricing: Free US$0, "Up to 20 user seats", 10k documents;
 *    Growth "$15 per seat / month", and annual billing only on Enterprise
 *    ("only monthly payments are supported for self-serve plans").
 * Not used: Wix Multilingual's free word credit (the app page says 3,000,
 * a support article said 5,000), and which Wix plans include Multilingual
 * (only "free to install" is stated).
 */

/** "US$32". */
export function usd(n: number): string {
  return `US$${n.toLocaleString("en-US")}`;
}

/** "US$32 a month, billed yearly". */
export function perMonthYearly(n: number): string {
  return `${usd(n)} a month, billed yearly`;
}

/** Twelve months of a monthly price, same currency: "US$384". */
export function perYear(n: number): string {
  return usd(n * 12);
}

export const wixStudio = {
  source: { href: "https://www.wix.com/studio/plans", checked: "2026-11-19" },
  /** forms = lead-capture forms; storage = media storage (plans table). */
  plans: {
    basic: { name: "Basic", perMonth: 12, collaborators: 3, cmsItems: "1,500", forms: 4, storage: "10 GB" },
    standard: { name: "Standard", perMonth: 20, collaborators: 5, cmsItems: "4,000", forms: 10, storage: "50 GB" },
    plus: { name: "Plus", perMonth: 32, collaborators: 10, cmsItems: "20,000", forms: 25, storage: "120 GB" },
    elite: { name: "Elite", perMonth: 149, collaborators: 100, cmsItems: "10 million", forms: 75, storage: "unlimited" },
  },
  /** The first plan that accepts online payments. */
  paymentsFrom: "Standard",
  /** support.wix.com, "CMS: About dynamic pages". */
  staticPageLimit: 100,
  /** Plans table, "Product catalog", Standard to Elite (read 20 Nov 2026). */
  productCatalog: "50,000",
  /** Plans table, "Multiple currencies": a dash on Standard, "Primary plus 5" on Plus. */
  currenciesFrom: "Plus",
};

export const webflow = {
  source: { href: "https://webflow.com/pricing", checked: "2026-11-19" },
  plans: {
    basic: { name: "Basic", perMonth: 15, staticPages: 300 },
    premium: { name: "Premium", perMonth: 25, cmsItems: "20,000", collections: 40 },
  },
  /** Workspace seats, per seat, billed yearly. Reviewer seats are free. */
  seats: { full: 39, limited: 15 },
  /** Localize add-on, per added locale per month (Essential: up to 3). */
  localize: { essentialPerLocale: 9, essentialLocales: 3, advancedPerLocale: 29 },
  /** Ecommerce site plans, billed yearly. */
  ecommerce: { standard: 29, standardItems: "500", plus: 74, advanced: 212 },
};

export const wordpressCom = {
  source: { href: "https://wordpress.com/pricing/", checked: "2026-11-19" },
  /** First year, per month, billed yearly; `renews` is the "Auto-renews at" rate. */
  personal: { name: "Personal", perMonth: 4, renews: 5 },
  premium: { name: "Premium", perMonth: 8, renews: 9 },
  business: { name: "Business", perMonth: 25, renews: 28 },
};

export const wordpressOrg = {
  /** wordpress.org/plugins: "Browse over 79,000 free plugins." */
  plugins: "79,000",
};

/** Shopify plans, billed yearly ("Pay yearly" on the vendor's page). */
export const shopify = {
  source: { href: "https://www.shopify.com/pricing", checked: "2026-11-20" },
  plans: {
    basic: { name: "Basic", perMonth: 29, perMonthMonthly: 39 },
    grow: { name: "Grow", perMonth: 79, perMonthMonthly: 105 },
    advanced: { name: "Advanced", perMonth: 299, perMonthMonthly: 399 },
  },
  /** "from $2,300/mo". */
  plusFrom: 2300,
};

/** Vercel, the host for our custom-code builds. Prices exclude tax. */
export const vercel = {
  source: { href: "https://vercel.com/pricing", checked: "2026-11-20" },
  plans: {
    hobby: { name: "Hobby", perMonth: 0 },
    /** Includes US$20 of usage credit a month. */
    pro: { name: "Pro", perMonth: 20, usageCredit: 20 },
  },
  excludesTax: true,
};

/** Sanity, the CMS on our custom-code builds. Self-serve plans bill monthly only. */
export const sanity = {
  source: { href: "https://www.sanity.io/pricing", checked: "2026-11-20" },
  plans: {
    free: { name: "Free", perMonth: 0, seats: 20, documents: "10k" },
    growth: { name: "Growth", perSeatPerMonth: 15 },
  },
  monthlyBillingOnly: true,
};

/**
 * Framer, framer.com/pricing, yearly billing selected, read 20 Nov 2026.
 * Redirects are a dash on Basic and a check on Pro in the plans table.
 * Editor and locale prices are per month, billed with the plan.
 */
export const framer = {
  source: { href: "https://www.framer.com/pricing", checked: "2026-11-20" },
  plans: {
    basic: { name: "Basic", perMonth: 10, pages: 30, collections: 2, cmsItems: "1,000" },
    pro: { name: "Pro", perMonth: 30, pages: 150, collections: 10, cmsItems: "2,500" },
  },
  /** Pro with paid add-ons: "up to 40,000 CMS items" (pricing FAQ). */
  proMaxCmsItems: "40,000",
  /** "Additional editors" and "Content editors", per editor per month. */
  editors: { full: 20, content: 10 },
  /** Locales add-on: per locale per month, "Up to 20". */
  locale: { perMonth: 20, max: 20 },
  redirectsFrom: "Pro",
};

/**
 * Squarespace, squarespace.com/pricing, "Pay annually" selected, read
 * 20 Nov 2026. Contributors and store fees as printed on each plan card.
 */
export const squarespace = {
  source: { href: "https://www.squarespace.com/pricing", checked: "2026-11-20" },
  plans: {
    basic: { name: "Basic", perMonth: 12, contributors: "2", storeFee: "2%" },
    core: { name: "Core", perMonth: 17, contributors: "Unlimited", storeFee: "No" },
    advanced: { name: "Advanced", perMonth: 25, contributors: "Unlimited", storeFee: "No" },
  },
  /** support.squarespace.com "Page limits": up to 1,000 pages on any current plan. */
  pageLimit: "1,000",
  /** Code injection: Core, Plus, Advanced (help centre). */
  codeInjectionFrom: "Core",
  /** Weglot integration: free for one language up to 2,000 words (help centre). */
  weglotFreeWords: "2,000",
};

/**
 * Weglot, weglot.com/pricing, read 20 Nov 2026. Shown in euros, excluding
 * VAT, for our region; the Starter plan covers 1 language and 10,000 words.
 */
export const weglot = {
  source: { href: "https://www.weglot.com/pricing", checked: "2026-11-20" },
  starter: { name: "Starter", perMonthEur: 15, words: "10,000", languages: 1 },
};
