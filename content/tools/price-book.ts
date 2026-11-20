import { sanity, shopify, vercel, wixStudio } from "@/content/comparisons/vendors";
import { pricing } from "@/content/home";
import { landingPackage, landingPriceSteps } from "@/content/service-pages/landing-pages";
import { migrationTimeline } from "@/content/service-pages/website-migration";
import type { PriceBook } from "@/lib/website-cost";

/**
 * Every price the cost calculator uses, read from where it is published
 * (cost calculator brief, 20 Nov 2026). Nothing here is typed: change a
 * tier in content/home.ts, a landing price in landing-pages.ts or a plan in
 * vendors.ts, and the calculator, its default estimate, the short answer
 * and the FAQ all follow. Built on the server and handed to the client
 * island as plain data.
 */

const [minimum, studio, zenith] = pricing.tiers;

/** "Up to 5 pages" -> 5. */
function pageLimit(tier: { name: string; features: string[] }): number {
  const m = tier.features.join(" ").match(/up to (\d+) pages/i);
  if (!m) throw new Error(`price-book: ${tier.name} lost its "Up to N pages" feature`);
  return Number(m[1]);
}

const tier = (t: typeof minimum) => ({
  name: t.name,
  price: t.price,
  priceNote: t.priceNote,
  timeline: t.timeline,
  pages: pageLimit(t),
});

const plan = (p: { name: string; perMonth: number }) => ({ name: p.name, perMonth: p.perMonth });

export const priceBook: PriceBook = {
  minimum: tier(minimum),
  studio: tier(studio),
  zenith: { name: zenith.name, price: zenith.price },
  landing: {
    name: landingPackage.name,
    upToTwo: landingPriceSteps.upToTwo,
    three: landingPriceSteps.three,
    maxPages: landingPriceSteps.maxPages,
    priceNote: landingPackage.priceNote,
    timeline: landingPackage.timeline,
  },
  migrationTimeline,
  plans: {
    wixBasic: plan(wixStudio.plans.basic),
    wixStandard: plan(wixStudio.plans.standard),
    shopifyBasic: plan(shopify.plans.basic),
    vercelPro: plan(vercel.plans.pro),
    sanityFree: plan(sanity.plans.free),
  },
};

/** Where each platform price was read, for the "How we estimate" sources. */
export const planSources = [
  { name: "Wix Studio", href: wixStudio.source.href, checked: wixStudio.source.checked },
  { name: "Shopify", href: shopify.source.href, checked: shopify.source.checked },
  { name: "Vercel", href: vercel.source.href, checked: vercel.source.checked },
  { name: "Sanity", href: sanity.source.href, checked: sanity.source.checked },
];
