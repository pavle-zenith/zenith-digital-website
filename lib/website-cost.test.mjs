import { test } from "node:test";
import assert from "node:assert/strict";

import { defaultInput, estimate, formatPrice, formatShown, yearOne } from "./website-cost.ts";
import { priceBook } from "../content/tools/price-book.ts";
import { pricing } from "../content/home.ts";
import { landingPriceSteps } from "../content/service-pages/landing-pages.ts";
import { migrationTimeline } from "../content/service-pages/website-migration.ts";
import { fx } from "../content/fx.ts";

/**
 * The calculator's cases from the cost calculator brief (20 Nov 2026). The
 * expected figures are the published prices as the site states them today;
 * where a test needs one, it reads it from the same content file the
 * calculator does, so a price change fails here only if the logic breaks.
 */

const [minimum, studio] = pricing.tiers;
const at = (over) => estimate({ ...defaultInput(priceBook), ...over }, priceBook);
const eur = (e) => formatShown(yearOne(e, "EUR"));

test("default: new website, 5 pages, Wix Studio is The Minimum on Wix Studio Basic", () => {
  const e = at({});
  assert.equal(e.build.tier, "minimum");
  assert.equal(e.build.name, minimum.name);
  assert.equal(e.build.pages, 5);
  assert.equal(formatPrice(e.build.price, "EUR"), "From €1,250");
  assert.equal(e.platform.name, "Wix Studio Basic");
  // US$144 rounds to US$140 in dollars too (owner: round all three currencies).
  assert.equal(formatPrice(e.platform.price, "USD"), "≈US$140");
  // US$144 at 1.0992 is €131, rounded to €130.
  assert.equal(formatPrice(e.platform.price, "EUR"), "≈€130");
  assert.equal(eur(e), "From ≈€1,380");
  assert.equal(e.timeline, "2 weeks");
  assert.deepEqual(e.quoted, []);
});

test("one Studio extra on 1 to 5 pages shows the range between the two published prices", () => {
  for (const extra of ["cms", "integrations", "copy"]) {
    const e = at({ extras: [extra] });
    assert.equal(e.build.tier, "range");
    assert.equal(e.build.rangeExtra, extra);
    assert.equal(formatPrice(e.build.price, "EUR"), "€1,250 to €2,350");
    assert.equal(eur(e), "≈€1,380 to €2,480");
    assert.equal(e.timeline, "2 to 5 weeks");
  }
});

test("two Studio extras move a 1 to 5 page build to The Studio", () => {
  const e = at({ pages: 3, extras: ["cms", "copy"] });
  assert.equal(e.build.tier, "studio");
  assert.equal(e.build.name, studio.name);
  assert.equal(formatPrice(e.build.price, "EUR"), "€2,350");
  assert.equal(e.timeline, "5 weeks");
});

test("6 to 12 pages is The Studio with no extras", () => {
  assert.equal(priceBook.minimum.pages, 5);
  assert.equal(priceBook.studio.pages, 12);
  assert.equal(at({ pages: 6 }).build.tier, "studio");
  assert.equal(at({ pages: 12 }).build.tier, "studio");
});

test("13 or more pages is quoted, and so is the year", () => {
  for (const pages of [13, 20]) {
    const e = at({ pages });
    assert.equal(e.build.tier, "quoted");
    assert.equal(e.build.quotedReason, "pages");
    assert.equal(e.timeline, null);
    assert.deepEqual(e.quoted, ["build"]);
    assert.equal(eur(e), "Quoted");
    // The platform plan still has its published price.
    assert.equal(formatPrice(e.platform.price, "USD"), "≈US$140");
  }
});

test("online store at 25 products is The Studio on Wix Studio Standard", () => {
  const e = at({ extras: ["store"], products: 25 });
  assert.equal(e.build.tier, "studio");
  assert.equal(formatPrice(e.build.price, "EUR"), "€2,350");
  assert.equal(e.platform.name, "Wix Studio Standard");
  assert.equal(formatPrice(e.platform.price, "USD"), "US$240");
  // US$240 at 1.0992 is €218.3, rounded to €220.
  assert.equal(eur(e), "≈€2,570");
});

test("online store at 150 products is quoted", () => {
  const e = at({ extras: ["store"], products: 150 });
  assert.equal(e.build.tier, "quoted");
  assert.equal(e.build.quotedReason, "products");
  assert.equal(eur(e), "Quoted");
});

test("online store on Shopify keeps Shopify Basic", () => {
  const e = at({ platform: "shopify", extras: ["store"] });
  assert.equal(e.platform.name, "Shopify Basic");
  assert.equal(formatPrice(e.platform.price, "USD"), "≈US$350");
});

test("landing pages: 1 and 2 from the two-page price, 3 at the three-page price", () => {
  for (const pages of [1, 2]) {
    const e = at({ need: "landing", pages });
    assert.equal(e.build.tier, "landing");
    assert.equal(formatPrice(e.build.price, "EUR"), `From €${landingPriceSteps.upToTwo.toLocaleString("en-GB")}`);
    assert.equal(e.timeline, "About a week");
    assert.equal(e.switched, null);
  }
  const three = at({ need: "landing", pages: 3 });
  assert.equal(formatPrice(three.build.price, "EUR"), landingPriceSteps.threePages);
});

test("4 landing pages is a website: The Minimum", () => {
  const e = at({ need: "landing", pages: 4 });
  assert.equal(e.switched, "landing-pages");
  assert.equal(e.input.need, "new");
  assert.equal(e.build.tier, "minimum");
  assert.equal(e.build.pages, 4);
});

test("a landing page includes copy and integrations, and a store makes it a website", () => {
  const lp = at({ need: "landing", pages: 1, extras: ["copy", "integrations"] });
  assert.equal(lp.build.tier, "landing");
  assert.deepEqual(lp.extras.included, ["copy", "integrations"]);
  const store = at({ need: "landing", pages: 1, extras: ["store"] });
  assert.equal(store.switched, "landing-extra");
  assert.equal(store.build.tier, "studio");
});

test("migration at 12 pages is The Studio with the migration timeline", () => {
  const e = at({ need: "migration", pages: 12 });
  assert.equal(e.build.tier, "studio");
  assert.equal(formatPrice(e.build.price, "EUR"), "€2,350");
  assert.equal(e.timeline, migrationTimeline);
  assert.equal(at({ need: "migration" }).build.tier, "minimum");
});

test("migration, 12 pages, Shopify", () => {
  const e = at({ need: "migration", pages: 12, platform: "shopify" });
  assert.equal(e.platform.name, "Shopify Basic");
  // US$348 at 1.0992 is €316.6, rounded to €320.
  assert.equal(eur(e), "≈€2,670");
});

test("custom code is Vercel Pro and Sanity Free; with a store the plan is quoted", () => {
  const plain = at({ platform: "custom" });
  assert.equal(plain.platform.name, "Vercel Pro and Sanity Free");
  assert.equal(formatPrice(plain.platform.price, "USD"), "US$240");

  const store = at({ platform: "custom", extras: ["store"] });
  assert.equal(store.build.tier, "studio");
  assert.equal(store.platform.price.kind, "quoted");
  assert.deepEqual(store.quoted, ["platform"]);
  // The quoted plan stays out of the total: the year is the build alone.
  assert.equal(eur(store), "€2,350");
});

test("multiple languages and ongoing work are quoted and stay out of the total", () => {
  const e = at({ extras: ["languages"], ongoing: true });
  assert.equal(e.build.tier, "minimum");
  assert.deepEqual(e.quoted, ["languages", "ongoing"]);
  assert.equal(eur(e), "From ≈€1,380");
});

test("GBP: our euro price and the vendor's dollar price both convert, rounded to 10", () => {
  const e = at({});
  // €1,250 x 0.83581 = £1,044.76 -> £1,040; US$144 / 1.0992 x 0.83581 = £109.49 -> £110.
  assert.equal(formatPrice(e.build.price, "GBP"), "From ≈£1,040");
  assert.equal(formatPrice(e.platform.price, "GBP"), "≈£110");
  assert.equal(formatShown(yearOne(e, "GBP")), "From ≈£1,150");

  const store = at({ extras: ["store"] });
  // €2,350 -> £1,964.15 -> £1,960; US$240 -> £182.49 -> £180.
  assert.equal(formatShown(yearOne(store, "GBP")), "≈£2,140");
});

test("USD: the build converts, the vendor's dollar price rounds to 10", () => {
  const e = at({});
  // €1,250 x 1.0992 = US$1,374 -> US$1,370; US$144 -> US$140; rows add up.
  assert.equal(formatPrice(e.build.price, "USD"), "From ≈US$1,370");
  assert.equal(formatPrice(e.platform.price, "USD"), "≈US$140");
  assert.equal(formatShown(yearOne(e, "USD")), "From ≈US$1,510");
  // A dollar price already round stays exact.
  assert.equal(formatPrice(at({ platform: "custom" }).platform.price, "USD"), "US$240");
  // Our euro prices are round, so euros stay exact.
  assert.equal(formatPrice(e.build.price, "EUR"), "From €1,250");
  assert.equal(fx.date, "2026-11-19");
});
