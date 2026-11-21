import { pricing } from "@/content/home";
import { landingPages, landingPriceSteps } from "@/content/service-pages/landing-pages";
import { websiteMigration } from "@/content/service-pages/website-migration";
import { SITE } from "@/lib/schema";

/**
 * /openai-product-feed.csv: our published packages as a product feed for
 * ChatGPT (Business Hub > Products, hosted URL; 21 Nov 2026). Format:
 * developers.openai.com/commerce/specs/file-upload/products. Built from the
 * same content as /pricing, so a price changed in content/home.ts or a
 * service page changes the feed at the next deploy.
 *
 * The Zenith is left out: it has no published price, and the feed requires
 * one. item_id values are stable; never reuse one for a different package.
 * Standard uploads are US-targeted whatever target_countries says (spec,
 * "Geo tagging"), so the row states the US and our real store country.
 */
export const dynamic = "force-static";

const [minimum, studio] = pricing.tiers;

/** "From €1,250" -> "1250.00 EUR". */
function eur(published: string | number): string {
  const n = typeof published === "number" ? published : Number(published.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(n) || n <= 0) throw new Error(`product feed: no price in "${published}"`);
  return `${n.toFixed(2)} EUR`;
}

const PAYMENT = "Paid in 2 instalments: 50% to start, 50% at launch.";
const FIXED = "Fixed price, agreed in writing before work starts. The same on Wix Studio, custom code or Shopify.";

type Row = Record<string, string>;

const base = {
  brand: "Zenith Digital",
  seller_name: "Zenith Digital",
  seller_url: SITE,
  availability: "in_stock",
  product_category: "Services > Website design",
  target_countries: JSON.stringify(["US"]),
  store_country: "RS",
  is_eligible_search: "true",
};

function tierRow(id: string, tier: typeof minimum, image: string): Row {
  const features = tier.features.join("; ");
  return {
    ...base,
    item_id: id,
    title: `${tier.name}: website design and build`,
    description: `${tier.summary} ${tier.featuresLabel.replace(/:$/, "")}: ${features}. ${tier.timeline}. ${/^from/i.test(tier.price) ? "Priced from this figure. " : ""}${FIXED} ${PAYMENT}`,
    url: `${SITE}/pricing`,
    image_url: `${SITE}${image}`,
    price: eur(tier.price),
  };
}

const landingSummary = landingPages.hero.subhead.split(". ")[0];

const rows: Row[] = [
  tierRow("ZD-MINIMUM", minimum, "/portfolio/fortlauderdale.jpg"),
  tierRow("ZD-STUDIO", studio, "/before-after/huntingbrook-after.jpg"),
  {
    ...base,
    item_id: "ZD-LANDING-2",
    group_id: "ZD-LANDING",
    listing_has_variations: "true",
    variant_dict: JSON.stringify({ pages: "Up to 2" }),
    title: "Landing page design and build, up to 2 pages",
    description: `${landingSummary}. Up to two pages, copy included. ${FIXED}`,
    url: `${SITE}/services/landing-pages`,
    image_url: `${SITE}/portfolio/knode.jpg`,
    price: eur(landingPriceSteps.upToTwo),
  },
  {
    ...base,
    item_id: "ZD-LANDING-3",
    group_id: "ZD-LANDING",
    listing_has_variations: "true",
    variant_dict: JSON.stringify({ pages: "3" }),
    title: "Landing page design and build, 3 pages",
    description: `${landingSummary}. Three pages, copy included. ${FIXED}`,
    url: `${SITE}/services/landing-pages`,
    image_url: `${SITE}/portfolio/knode.jpg`,
    price: eur(landingPriceSteps.three),
  },
  {
    ...base,
    item_id: "ZD-MIGRATION",
    title: "Website migration to Wix Studio",
    description: `${websiteMigration.hero.subhead.split(". ")[0]}. URL inventory, 301 redirect map, content and CMS migration, metadata carried across, and 30 days of Search Console monitoring after launch. Priced from this figure; the fixed price is agreed before work starts.`,
    url: `${SITE}/services/website-migration`,
    image_url: `${SITE}/before-after/foxstays-after.jpg`,
    price: eur(websiteMigration.pricing.from ?? ""),
  },
];

const COLUMNS = [
  "item_id",
  "group_id",
  "listing_has_variations",
  "variant_dict",
  "title",
  "description",
  "url",
  "brand",
  "seller_name",
  "seller_url",
  "image_url",
  "availability",
  "price",
  "product_category",
  "target_countries",
  "store_country",
  "is_eligible_search",
];

/** RFC 4180: quote when needed, double embedded quotes. */
function cell(v = ""): string {
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export function GET() {
  const csv = [COLUMNS.join(","), ...rows.map((r) => COLUMNS.map((c) => cell(r[c])).join(","))].join("\n");
  return new Response(`${csv}\n`, {
    headers: { "Content-Type": "text/csv; charset=utf-8" },
  });
}
