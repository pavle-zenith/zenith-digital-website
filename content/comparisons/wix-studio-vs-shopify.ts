import { PACKAGES } from "@/content/industries/proof";

import type { ComparisonContent } from "./types";
import { perMonthYearly, perYear, shopify, usd, wixStudio } from "./vendors";

/*
 * Written 20 Nov 2026. We build on both (owner, 19 Nov 2026), at the same
 * published prices (owner, 20 Nov 2026), so this page says plainly where
 * Shopify wins. Shopify figures were read that day in a real browser on
 * shopify.com/pricing (USD, the plans comparison table: staff accounts,
 * third-party transaction fees, unlimited products, translation and Markets,
 * hosting) and help.shopify.com (blogs, metaobjects, editing theme code,
 * languages, URL redirects, apps). Wix figures are from wix.com/studio/plans
 * (payments from Standard, the 50,000-product catalogue, multiple currencies)
 * and support.wix.com, as on the other comparisons.
 *
 * Not claimed: card processing rates on either side, checkout conversion
 * figures, or Wix transaction fees (no Wix page read for them).
 *
 * Published 20 Nov 2026 (content/comparisons/status.ts).
 */

const { studio } = PACKAGES;
const { plans } = wixStudio;
const sh = shopify.plans;
const checked = "2026-11-20";

export const wixStudioVsShopify: ComparisonContent = {
  slug: "wix-studio-vs-shopify",
  rival: {
    key: "shopify",
    name: "Shopify",
    weBuildOnIt: true,
    platform: "shopify",
  },
  updated: "2026-11-20",
  checked,
  seo: {
    title: "Wix Studio vs Shopify in 2026: which to choose | Zenith Digital",
    description:
      "Wix Studio vs Shopify compared on pricing, fees, products, staff and selling abroad. See which suits your business and when Shopify is the better choice.",
  },
  hero: {
    h1: "Wix Studio vs Shopify",
    shortAnswer:
      "Wix Studio if the site is a business with a store attached: services, content and products on one plan, edited by the whole team. Shopify if selling products is the business, and the store needs Shopify's apps and tools for selling in many markets.",
  },
  menuLabel: "vs Shopify",
  table: {
    heading: "Wix Studio and Shopify, side by side",
    intro:
      "We build on both at the same price, so this isn't a pitch for either. The split is simple: is the store part of the site, or is the site part of the store?",
    rows: [
      {
        criterion: "Best for",
        wix: { short: "A business with a store attached" },
        rival: { short: "Products are the business" },
        edge: "depends",
        detail: {
          wix: "A business with a store attached: services, content, a CMS and products on one site plan, edited visually by the whole team.",
          rival: "Businesses where selling products is the business: a deep catalogue, several markets, and an app for each part of the operation.",
        },
      },
      {
        criterion: "Store plan",
        wix: { short: `Site plan, from ${usd(plans.standard.perMonth)} a month`, tag: "included" },
        rival: { short: `From ${usd(sh.basic.perMonth)} a month`, tag: "included" },
        edge: "wix",
        detail: {
          wix: `Payments run on the ordinary site plan from ${wixStudio.paymentsFrom}, ${perMonthYearly(plans.standard.perMonth)}; there's no separate store plan.`,
          rival: `${sh.basic.name} is ${perMonthYearly(sh.basic.perMonth)}, ${sh.grow.name} ${usd(sh.grow.perMonth)} and ${sh.advanced.name} ${usd(sh.advanced.perMonth)}. Using a payment provider other than Shopify Payments adds a fee of 2% on ${sh.basic.name}, falling to 0.6% on ${sh.advanced.name}.`,
        },
      },
      {
        criterion: "Product catalogue",
        wix: { short: `Up to ${wixStudio.productCatalog} products`, tag: "included" },
        rival: { short: "Unlimited products", tag: "included" },
        edge: "rival",
        detail: {
          wix: `Up to ${wixStudio.productCatalog} products on every plan that takes payments.`,
          rival: "Unlimited products on every plan.",
        },
      },
      {
        criterion: "Team access",
        wix: {
          short: `${plans.standard.collaborators} to ${plans.elite.collaborators} collaborators, by plan`,
          tag: "included",
        },
        rival: { short: `No extra staff on ${sh.basic.name}`, tag: "addon" },
        edge: "wix",
        detail: {
          wix: `${plans.standard.collaborators} collaborators on ${plans.standard.name}, ${plans.plus.collaborators} on ${plans.plus.name} and ${plans.elite.collaborators} on ${plans.elite.name}, with roles and permissions.`,
          rival: `${sh.basic.name} adds no staff accounts; ${sh.grow.name} includes 5 and ${sh.advanced.name} 15, with roles and permissions.`,
        },
      },
      {
        criterion: "Content beyond products",
        wix: { short: "Your own collections and fields", tag: "included" },
        rival: { short: "Blog, pages and metaobjects", tag: "included" },
        edge: "wix",
        detail: {
          wix: `Collections you define yourself, with your own fields and a dynamic page for each item, from ${plans.basic.cmsItems} items to ${plans.elite.cmsItems}.`,
          rival: "A built-in blog and pages, with metaobjects for structured content such as product highlights.",
        },
      },
      {
        criterion: "Design control",
        wix: { short: "Visual, every breakpoint", tag: "included" },
        rival: { short: "Theme editor, then Liquid code", tag: "included" },
        edge: "wix",
        detail: {
          wix: "Design at every breakpoint without learning a class system, with custom CSS when a layout needs it.",
          rival: "A theme sets the look and the theme editor rearranges sections and settings; deeper changes mean editing Liquid, Shopify's templating language, and a theme update can drop code edits.",
        },
      },
      {
        criterion: "Selling abroad",
        wix: { short: `Multilingual app; currencies from ${wixStudio.currenciesFrom}`, tag: "included" },
        rival: { short: "Markets, languages, local currencies", tag: "included" },
        edge: "rival",
        detail: {
          wix: `Wix Multilingual is free to install, and multiple currencies start on ${wixStudio.currenciesFrom}, with the primary currency plus 5.`,
          rival: "Every plan can translate the storefront and assign local domains through Shopify Markets; local currencies and payment methods need Shopify Payments.",
        },
      },
      {
        criterion: "Apps",
        wix: { short: "Wix App Market", tag: "included" },
        rival: { short: "Thousands of apps, mostly third-party", tag: "addon" },
        edge: "rival",
        detail: {
          wix: "Apps from the Wix App Market, and frontend code you can manage through the Wix IDE or GitHub.",
          rival: "Thousands of apps on the Shopify App Store, most of them built by third-party developers rather than Shopify.",
        },
      },
      {
        criterion: "Redirects",
        wix: { short: "Automatic on page URL change", tag: "included" },
        rival: { short: "In the admin, with CSV import", tag: "included" },
        edge: "even",
        detail: {
          wix: "A redirect is created for you when a page's URL changes (blog posts excepted), and you can add up to five structured data markups per page.",
          rival: "URL redirects are managed in the admin, and large numbers can be imported at once.",
        },
      },
      {
        criterion: "Maintenance",
        wix: { short: "Managed", tag: "included" },
        rival: { short: "Managed", tag: "included" },
        edge: "even",
        detail: {
          wix: "Managed hosting and security on Wix's infrastructure, with nothing to install or patch.",
          rival: "Also managed: unlimited hosting and a free SSL certificate on every plan.",
        },
      },
    ],
  },
  questions: {
    heading: "Five questions that decide it",
    intro: "The first one usually settles it.",
    items: [
      {
        q: "What does the business mainly sell?",
        wix: "services and content lead, with products alongside",
        rival: "products are the business",
      },
      {
        q: "How big will the catalogue get?",
        wix: `it stays under ${wixStudio.productCatalog} products`,
        rival: "it's bigger, or growing fast across variants and markets",
      },
      {
        q: "Who runs the site day to day?",
        wix: "a team edits pages, posts and products in one editor",
        rival: "an operations team lives in orders, stock and apps",
      },
      {
        q: "How many countries will you sell in?",
        wix: "one or two, with translated pages",
        rival: "many, each with its own currency, language and domain",
      },
      {
        q: "How much content sits beyond the products?",
        wix: "plenty: CMS collections, landing pages and a blog",
        rival: "a blog and a few pages are enough",
      },
    ],
  },
  choose: {
    heading: "So, which should you choose?",
    wix: {
      label: "One site, everything",
      body: "Products sit alongside services and content, the team edits visually in one place, and the store runs on the site plan.",
    },
    rival: {
      label: "Commerce first",
      body: "Products are the business, the catalogue or markets will grow, and you want Shopify's apps and tools behind every order.",
    },
    custom: {
      label: "Custom storefront",
      body: "You want a fully custom storefront on Next.js, with Shopify running products, checkout and orders behind it.",
    },
  },
  cost: {
    heading: "What year one costs",
    setup: "A store with 80 products, a blog, and three people managing it.",
    rows: [
      {
        label: "Store plan",
        wix: `${plans.standard.name}, ${perMonthYearly(plans.standard.perMonth)}: ${perYear(plans.standard.perMonth)} for the year, payments included.`,
        rival: `${sh.grow.name}, ${perMonthYearly(sh.grow.perMonth)}: ${perYear(sh.grow.perMonth)} for the year. ${sh.basic.name} has no extra staff accounts.`,
      },
      {
        label: "Three people",
        wix: `Included: ${plans.standard.collaborators} site collaborators on ${plans.standard.name}.`,
        rival: `Included: 5 staff accounts on ${sh.grow.name}.`,
      },
      {
        label: "Hosting and security",
        wix: "Included in the plan.",
        rival: "Included in the plan.",
      },
      {
        label: "Build",
        wix: `${studio.name}, ${studio.price} with Zenith Digital.`,
        rival: `${studio.name}, ${studio.price} with Zenith Digital: the same price on Shopify.`,
      },
    ],
    note: `Card processing fees apply on both and depend on the payment provider and country. On Shopify, a provider other than Shopify Payments adds a transaction fee on top. With one person running the store, Shopify ${sh.basic.name} is ${perMonthYearly(sh.basic.perMonth)}. ${studio.name} covers a store of up to 100 products; larger catalogues are quoted.`,
  },
  proof: {
    heading: "Built by Zenith Digital, on both",
    picks: ["scottish-luxury-experience", "hunting-brook-gardens", "knode-ai"],
    rivalPicks: ["lepa-couture", "destilerija-gorska", "notyou-brand"],
    rivalLine: "We build on both, at the same published prices.",
  },
  faq: {
    heading: ["Wix Studio vs Shopify:", "your questions"],
    subhead: "From an agency that builds on both, so neither answer is a sales pitch.",
    items: [
      {
        q: "Is Wix Studio or Shopify better for ecommerce?",
        a: "Shopify, when selling products is the business: unlimited products, thousands of apps and tools for selling in many markets. Wix Studio, when the store sits alongside services and content, because payments run on the same site plan and the whole team edits in one place.",
      },
      {
        q: "Is Shopify more expensive than Wix Studio?",
        a: `Usually, yes. Shopify ${sh.basic.name} is ${perMonthYearly(sh.basic.perMonth)} and ${sh.grow.name}, which adds staff accounts, is ${usd(sh.grow.perMonth)}. Wix Studio takes payments from ${wixStudio.paymentsFrom}, ${perMonthYearly(plans.standard.perMonth)}, with ${plans.standard.collaborators} collaborators included.`,
      },
      {
        q: "Does Shopify charge transaction fees?",
        a: `Only when you use a payment provider other than Shopify Payments: 2% on ${sh.basic.name}, 1% on ${sh.grow.name} and 0.6% on ${sh.advanced.name}. Card processing fees apply either way, as they do on Wix Studio.`,
      },
      {
        q: "How many products can a Wix Studio store hold?",
        a: `Up to ${wixStudio.productCatalog} products on every Wix Studio plan that takes payments, from ${wixStudio.paymentsFrom}. Shopify has no product limit on any plan.`,
      },
      {
        q: "Do you build on both Wix Studio and Shopify?",
        a: `Yes, at the same published prices: The Minimum ${PACKAGES.minimum.price.toLowerCase()} and ${studio.name} at ${studio.price}, which covers a store of up to 100 products. Larger catalogues are quoted. We'll tell you which platform fits before you pay anything.`,
      },
      {
        q: "Can you move a store from Wix Studio to Shopify, or the other way?",
        a: "Yes. Products and content move, every old URL gets a 301 redirect, and we watch Search Console for 30 days after the switch. Google isn't ours to promise; the redirect map and the monitoring are.",
      },
    ],
  },
  related: {
    heading: "Keep reading",
    items: [
      {
        kind: "Industry",
        label: "E-commerce websites",
        href: "/industries/ecommerce",
        desc: "Stores we've built on Wix Studio and Shopify, and what each one needed.",
        icon: "cart",
      },
      {
        kind: "Pricing",
        label: "Every price, published",
        href: "/pricing",
        desc: "The same packages on Wix Studio, custom code and Shopify.",
        icon: "receipt",
      },
      {
        kind: "Tool",
        label: "Website cost calculator",
        href: "/tools/website-cost-calculator",
        desc: "Your year-one cost on Wix Studio or Shopify, build plus platform plan.",
        icon: "calculator",
      },
      {
        kind: "Service",
        label: "Website migration",
        href: "/services/website-migration",
        desc: "Moving a store between platforms with every URL mapped and monitored.",
        icon: "transfer",
      },
    ],
  },
  sources: [
    { label: "Shopify: Pricing", href: shopify.source.href, note: "Plan prices billed yearly and monthly, staff accounts, unlimited products, third-party transaction fees, translation and Markets, hosting and SSL.", checked },
    { label: "Shopify Help: Blogs", href: "https://help.shopify.com/en/manual/online-store/blogs", note: "The built-in blogging engine.", checked },
    { label: "Shopify Help: Metaobjects", href: "https://help.shopify.com/en/manual/custom-data/metaobjects", note: "Structured content with multiple fields.", checked },
    { label: "Shopify Help: Customizing themes", href: "https://help.shopify.com/en/manual/online-store/themes/customizing-themes", note: "The theme editor.", checked },
    { label: "Shopify Help: Editing theme code", href: "https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code", note: "Liquid, and code edits removed by incompatible theme updates.", checked },
    { label: "Shopify Help: Localization and translation", href: "https://help.shopify.com/en/manual/international/languages", note: "Languages and translated URLs.", checked },
    { label: "Shopify Help: URL redirects", href: "https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect", note: "Creating, managing and importing redirects.", checked },
    { label: "Shopify Help: Users and permissions", href: "https://help.shopify.com/en/manual/your-account/users", note: "Staff accounts, roles and permissions.", checked },
    { label: "Shopify Help: Apps", href: "https://help.shopify.com/en/manual/apps", note: "Most apps are built by third-party developers.", checked },
    { label: "Wix Studio: plans and pricing", href: "https://www.wix.com/studio/plans", note: "Plan prices, collaborators, CMS items, payments from Standard, the 50,000-product catalogue and multiple currencies from Plus.", checked },
    { label: "Wix: CMS dynamic pages", href: "https://support.wix.com/en/article/cms-about-dynamic-pages", note: "Dynamic pages for CMS items.", checked: "2026-11-19" },
    { label: "Wix: 301 redirects", href: "https://support.wix.com/en/article/setting-up-a-301-redirect-for-a-page-on-your-site", note: "The Redirect Manager, and automatic redirects when a page's URL slug changes (not for blog posts).", checked: "2026-11-19" },
    { label: "Wix: Structured data markup", href: "https://support.wix.com/en/article/adding-structured-data-markup-to-your-sites-pages-2546962", note: "Up to five markups per page.", checked: "2026-11-19" },
    { label: "Wix Multilingual", href: "https://www.wix.com/app-market/wix-multilingual", note: "Free to install.", checked: "2026-11-19" },
    { label: "Wix: Managing your team", href: "https://support.wix.com/en/article/wix-studio-managing-your-team", note: "Roles and permissions for collaborators.", checked: "2026-11-19" },
    { label: "Wix: The Code panel", href: "https://dev.wix.com/docs/develop-websites/articles/workspace-tools/velo-workspace/workspaces/wix-studio-working-with-the-code-panel", note: "Frontend code, the Wix IDE and GitHub.", checked: "2026-11-19" },
    { label: "Wix Studio: Security", href: "https://www.wix.com/studio/infrastructure/security", note: "Security with no setup or maintenance required.", checked: "2026-11-19" },
  ],
};
