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
