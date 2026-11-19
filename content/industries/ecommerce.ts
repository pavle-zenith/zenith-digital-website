import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import { PACKAGES, card, lower, metricPart } from "./proof";

/**
 * /industries/ecommerce, written from the travel template (18 Nov 2026).
 * Held for owner review.
 *
 * No e-commerce project has a detail case study yet, so every project here
 * is a scope card and the page claims scope, never results. The hero uses the
 * projects' own grid cards. Platform is only stated where it's on record:
 * Lepa Couture is Shopify (its card and Marko's testimonial).
 *
 * OWNER, please confirm before publishing:
 *   1. Pricing. The page shows the published packages only. The partner terms
 *      (store builds, product upload limits) aren't public, so no product
 *      count or store-specific price appears anywhere. Add one if you want it
 *      public.
 *   2. Stilby is filed under e-commerce, but its site is a catalogue for
 *      architectural decor elements and David's quote calls it "real estate
 *      and architecture groups". Keep it here, or move it to property?
 *   3. Woodstone 024 (coming soon) is cited for wholesale and retail in one
 *      FAQ, from its card. Drop that line if it shouldn't be named yet.
 */

const stilby = card("stilby");
const stilbyLanguages = metricPart("stilby", /\d+ languages/);
const stilbyLaunch = metricPart("stilby", /\d+-week launch/);
const lepa = card("lepa-couture");
const notyou = card("notyou-brand");
const woodstone = card("woodstone-024");

const { minimum, studio, landing } = PACKAGES;

export const ecommerce: IndustryPageContent = {
  slug: "ecommerce",
  industry: "ecommerce",
  publish: true,
  updated: "2026-11-18",
  name: INDUSTRIES.ecommerce,
  filterLinkLabel: "See the e-commerce page",

  seo: {
    title: "E-commerce website design for brands | Zenith Digital",
    description:
      "Online stores on Wix Studio and Shopify for product brands, drops and producers selling direct, in one language or several. Fixed price, live in weeks.",
  },

  hero: {
    h1: "Online stores where the product does the selling",
    proof:
      "We design and build online stores on Wix Studio and Shopify for product brands, makers and producers selling direct, with the photography, the story and the checkout working together.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    // No e-commerce detail studies yet: the shots are the projects' own grid
    // cards, real work from their files.
    shots: {
      center: {
        src: "/case-studies/lepa-couture/card.webp",
        alt: "Lepa Couture's Shopify store in a browser window: a collection grid of made-to-order dresses with prices in euros",
      },
      left: {
        src: "/case-studies/notyou-brand/card.webp",
        alt: "NotYou Brand's streetwear store in a browser window: a pre-order drop with a countdown above the product grid",
      },
      right: {
        src: "/case-studies/destilerija-gorska/card.webp",
        alt: "Destilerija Gorska's website in a browser window: brandy poured into a glass under the headline Stvorena od voća, vatre i ljubavi",
      },
    },
  },

  inShort: `Zenith Digital designs and builds online stores on Wix Studio, Shopify or in custom code for product brands, makers and producers selling direct, from streetwear drops to made-to-order couture and craft spirits. A full store takes ${minimum.timeline.replace(" weeks", "")} to ${studio.timeline}. Prices start ${lower(landing.price)} for a launch landing page and ${lower(minimum.price)} for a full site.`,

  fit: {
    heading: "Who we work best with among product brands",
    good: [
      { icon: "image", text: "Brands whose photography does the selling" },
      { icon: "bag", text: "Makers and producers selling direct" },
      { icon: "globe", text: "Shops selling in more than one country" },
    ],
    notAFit: [
      "You run thousands of SKUs from an ERP",
      "You want a dropshipping store live this week",
      "You need a checkout built from scratch",
    ],
  },

  familiar: {
    heading: ["Your product looks great.", "Your store doesn't."],
    intro:
      "Most online stores lose the sale on the product page, not at checkout. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "image",
        title: "Your products look better on Instagram than on your store.",
        body: "We build the store around your photography: big images, a quiet grid, nothing competing with the product.",
      },
      {
        icon: "calendar",
        title: "Every drop means fighting the theme for a new page.",
        body: "We build drops, pre-orders and countdowns into the store, so a release goes live on your schedule.",
      },
      {
        icon: "clipboard",
        title: "Customers message you about sizing before they'll order.",
        body: "We put sizing, options and made-to-order notes on the product page, where the question comes up.",
      },
      {
        icon: "users",
        title: "Trade buyers and retail customers land on the same page.",
        body: "We give wholesale its own route and enquiry, so retail shoppers aren't wading through trade terms.",
      },
      {
        icon: "languages",
        title: "You ship abroad, but the store speaks one language.",
        body: "We build a version per market, so a customer in Slovakia reads the product in Slovak.",
      },
      {
        icon: "pen",
        title: "Shoppers don't see why your product costs what it does.",
        body: "We give the origin, the craft and the process their own pages, so the price makes sense before the cart.",
      },
    ],
  },

  steps: {
    heading: "How we build an online store",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Platform",
        scene: "ecommerce-platform",
        title: "Choose Wix Studio or Shopify for how you sell",
        body: "Wix Studio when the brand and its story lead and the catalogue is curated; Shopify when the catalogue, apps and checkout lead. We recommend one before we quote, not after.",
        deliverables: [
          "Platform recommendation",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Catalogue",
        scene: "ecommerce-catalogue",
        title: "Set up the catalogue the way people shop it",
        body: "Collections, filters and variants follow how your customers choose: by drop, by occasion, by size or by use. Product pages are built as one template, so every new product arrives finished.",
        deliverables: [
          "Collections and filters",
          "Product page template",
          "Variants and options",
        ],
      },
      {
        navLabel: "Design",
        scene: "ecommerce-design",
        title: "Let the product photography lead",
        body: "The design starts from your photos, not a theme. Where the photography isn't there yet, we tell you before design starts, because no layout makes up for it.",
        deliverables: [
          "Wireframes and copy",
          "Product and story pages",
          "The store, built in Wix Studio or Shopify",
        ],
      },
      {
        navLabel: "Checkout",
        scene: "ecommerce-checkout",
        title: "Connect payments, shipping and your tools",
        body: "Payments, shipping zones and order emails are set up and tested with real orders before launch, and connected to the email and CRM tools you already use.",
        deliverables: [
          "Payments and shipping setup",
          "Email and CRM integration",
          "Analytics events",
        ],
      },
      {
        navLabel: "Launch",
        scene: "ecommerce-launch",
        title: "Launch before your season or drop",
        body: "We set the launch date against your calendar: the next drop, the gifting season, the first campaign. Your old store keeps trading until the switch.",
        deliverables: [
          "Redirects and domain",
          "Analytics and Search Console",
          "Handover walkthrough",
          "30 days of support",
        ],
      },
    ],
  },

  testimonials: {
    heading: "What product brands say",
    intro:
      "A streetwear label, a couture house, a distillery, a manufacturer and a clothing brand, in their own words.",
    items: [
      { id: "bates-green" },
      { id: "marko-georgievski" },
      { id: "ivana-lesevic" },
      { id: "david-opavski" },
      { id: "tom-h" },
    ],
  },

  work: {
    heading: "Online stores we've built",
  },

  pricing: {
    heading: "What an online store costs",
    note: "Fixed prices, agreed before we start. Choose by how many collections, story pages and markets the store needs.",
    notes: {
      landing: "For a single drop, a pre-order or one product launch, live in about a week.",
    },
  },

  faq: {
    heading: ["Online store", "questions"],
    subhead: "Straight answers on platforms, drops, markets, cost and timing.",
    items: [
      {
        q: "How much does an online store cost?",
        a: `A full site starts ${lower(minimum.price)} for ${lower(minimum.scope)} in ${minimum.timeline}, and ${studio.name} is ${studio.price} for ${lower(studio.scope)} in ${studio.timeline}. A single drop or product launch page is ${lower(landing.price)}, ${lower(landing.timeline)}. The price and the launch date are agreed in writing before we start.`,
      },
      {
        q: "Should I build my online store on Wix Studio or Shopify?",
        a: `Wix Studio if the brand and its story lead and the catalogue is curated; Shopify if the catalogue, apps and checkout lead. We build on both and recommend one before we quote. ${lepa.client}'s made-to-order couture catalogue runs on Shopify, with sizing set per piece.`,
      },
      {
        q: "Can you build a store that sells in more than one language?",
        a: `Yes. ${stilby.client}'s site launched in ${stilbyLanguages}, a ${stilbyLaunch}, to expand into Montenegro and Slovakia. Each market gets its own version of every page, so a customer reads the product in their own language.`,
      },
      {
        q: "Can my store run limited drops and pre-orders?",
        a: `Yes. ${notyou.client}'s store is built around drops, with pre-order products and a countdown to the next release, so a launch goes live on the label's schedule rather than whenever the theme allows.`,
      },
      {
        q: "Can one site serve wholesale and retail customers?",
        a: `Yes, with a separate route for each: retail shoppers buy, trade buyers enquire or log in for their terms. ${woodstone.client}'s site, launching soon, sells decorative garden stone to both wholesale and retail buyers.`,
      },
      {
        q: "Can I manage products and orders myself after launch?",
        a: "Yes. Products, stock, prices and orders live in the platform's own dashboard, and the launch includes a handover walkthrough, so adding a product or a collection doesn't need us.",
      },
    ],
  },

  related: {
    heading: "More on online stores",
    items: [
      {
        kind: "Service",
        label: "Wix Studio website design",
        href: "/services/wix-studio-website-design",
        desc: "The design and build service behind these stores, from structure to launch.",
        icon: "palette",
      },
      {
        kind: "Article",
        label: "Is Wix Studio good enough for a premium brand website?",
        href: "/blog/wix-studio-premium-brand",
        desc: "The platform's real limits, for brands selling at the top of their market.",
        icon: "pen",
      },
      {
        kind: "Article",
        label: "How much does a Wix Studio website cost?",
        href: "/blog/wix-studio-pricing",
        desc: "Plans, build costs and what drives the price, before you ask for a quote.",
        icon: "pen",
      },
      {
        kind: "Migration guide",
        label: "Squarespace to Wix Studio",
        href: "/services/squarespace-to-wix-studio",
        desc: "What carries over from Squarespace, and what has to be rebuilt.",
        icon: "transfer",
      },
    ],
  },

  finalCta: {
    heading: ["Good product,", "store not keeping up?"],
    paragraph:
      "A free 20-minute call. We'll look at your store the way a first-time customer would and tell you honestly what's costing you the sale.",
  },

  schema: {
    serviceName: "E-commerce website design",
    description:
      "Online store design and build on Wix Studio, Shopify or in custom code for product brands, makers and producers selling direct, including drops, pre-orders and multi-language stores.",
  },
};
