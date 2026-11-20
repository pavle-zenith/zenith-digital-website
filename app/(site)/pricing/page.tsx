import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { PricingPage } from "@/components/sections/pricing/PricingPage";
import {
  PRICING_UPDATED,
  otherServices,
  priceAmount,
  pricePackages,
  pricingPage,
} from "@/content/pricing";
import { defaultShareImages } from "@/lib/shareImage";
import { ORG_ID, SITE, WEBSITE_ID } from "@/lib/schema";

const URL = `${SITE}/pricing`;

export const metadata: Metadata = {
  title: pricingPage.seo.title,
  description: pricingPage.seo.description,
  alternates: {
    canonical: "/pricing",
    // The same data as plain markdown, for AI agents.
    types: { "text/markdown": "/pricing.md" },
  },
  openGraph: {
    type: "website",
    url: "/pricing",
    title: pricingPage.seo.title,
    description: pricingPage.seo.description,
    images: defaultShareImages.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: pricingPage.seo.title,
    description: pricingPage.seo.description,
    images: defaultShareImages.twitter,
  },
};

/**
 * One Offer per published price. A "from" price is a minimum, so it goes in
 * a priceSpecification (minPrice) rather than `price`; a fixed one is the
 * price itself. Prices with no number (The Zenith, development, SEO) are
 * described on the page and left out of the offers rather than given a
 * made-up figure.
 */
function offer(name: string, description: string, price: string, url: string, perMonth = false) {
  const amount = priceAmount(price);
  if (!amount) return null;
  const from = /^from\b/i.test(price);
  const spec = {
    "@type": "UnitPriceSpecification",
    priceCurrency: "EUR",
    ...(from ? { minPrice: amount } : { price: amount }),
    ...(perMonth ? { unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } } : {}),
  };
  return {
    "@type": "Offer",
    name,
    url,
    priceCurrency: "EUR",
    ...(from ? {} : { price: amount }),
    priceSpecification: spec,
    seller: { "@id": ORG_ID },
    itemOffered: { "@type": "Service", name, description, provider: { "@id": ORG_ID } },
  };
}

export default function Pricing() {
  const offers = [
    ...pricePackages.map((p) =>
      offer(p.name, p.summary, p.price, `${URL}#packages`, p.unit === "month"),
    ),
    ...otherServices.rows
      .filter((r) => r.offer)
      .map((r) => offer(r.service, r.decides, r.price, `${SITE}${r.href}`)),
  ].filter(Boolean);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${URL}#webpage`,
        url: URL,
        name: pricingPage.seo.title,
        description: pricingPage.seo.description,
        inLanguage: "en-GB",
        dateModified: PRICING_UPDATED,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        breadcrumb: { "@id": `${URL}#breadcrumb` },
        mainEntity: { "@id": `${URL}#offers` },
      },
      {
        "@type": "OfferCatalog",
        "@id": `${URL}#offers`,
        name: "Zenith Digital website and service prices",
        provider: { "@id": ORG_ID },
        itemListElement: offers,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Pricing", item: URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: pricingPage.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={graph} />
      <PricingPage />
    </>
  );
}
