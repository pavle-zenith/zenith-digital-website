import { PACKAGES } from "@/content/industries/proof";

import type { ComparisonContent } from "./types";
import { framer, perMonthYearly, perYear, usd, wixStudio } from "./vendors";

/*
 * Written 20 Nov 2026. Every Framer figure was read that day on Framer's own
 * pages in a real browser: framer.com/pricing (yearly billing selected; the
 * plans table shows redirects as a dash on Basic and a check on Pro), the
 * developers page (custom React components), the Framer Commerce plugin
 * listing (Shopify storefronts), the HTML export help article, and the CMS
 * Export and Redirect Sync plugin listings. Wix figures are from
 * wix.com/studio/plans and support.wix.com, as on the other comparisons.
 *
 * Not claimed: anything about Framer animation features or performance
 * beyond what the pricing table states, and llms.txt on Framer (no vendor
 * page read for it).
 *
 * Published 20 Nov 2026 (content/comparisons/status.ts).
 */

const { studio } = PACKAGES;
const { plans } = wixStudio;
const fp = framer.plans;
const checked = "2026-11-20";
const extraEditors = 2;

export const wixStudioVsFramer: ComparisonContent = {
  slug: "wix-studio-vs-framer",
  rival: {
    key: "framer",
    name: "Framer",
    weBuildOnIt: false,
    guide: {
      label: "Read the Framer to Wix Studio guide",
      href: "/services/framer-to-wix-studio",
    },
  },
  updated: "2026-11-20",
  checked,
  seo: {
    title: "Wix Studio vs Framer in 2026: which to choose | Zenith Digital",
    description:
      "Wix Studio or Framer? CMS limits, editor seats, stores and languages compared from each vendor's own pages, with what year one costs.",
  },
  hero: {
    h1: "Wix Studio vs Framer",
    shortAnswer:
      "Wix Studio if the site has to grow: a bigger CMS, a store or more languages, with editors included in the plan. Framer if a design team ships marketing pages fast and the site stays small.",
  },
  menuLabel: "vs Framer",
  table: {
    heading: "Wix Studio and Framer, side by side",
    intro:
      "Framer is quick in a designer's hands and makes beautiful marketing pages. The differences show up after launch: how much content it holds, what each editor costs, and what a store or a second language adds.",
    rows: [
      {
        criterion: "Best for",
        wix: { short: "Sites that grow after launch" },
        rival: { short: "Fast, design-led marketing pages" },
        edge: "depends",
        detail: {
          wix: "Sites that keep growing after launch: a CMS with thousands of items, a store, more languages, and editors who aren't designers.",
          rival: "Design-led marketing sites and landing pages, built quickly on a canvas that works like a design tool.",
        },
      },
      {
        criterion: "Editors",
        wix: {
          short: `${plans.basic.collaborators} to ${plans.elite.collaborators} included, by plan`,
          tag: "included",
        },
        rival: { short: `Paid seats, from ${usd(framer.editors.content)} a month`, tag: "addon" },
        edge: "wix",
        detail: {
          wix: `Adding an editor is a permission, not a purchase: ${plans.basic.collaborators} to ${plans.elite.collaborators} collaborators are included, depending on the plan.`,
          rival: `The workspace owner edits for free. Each additional editor is ${usd(framer.editors.full)} a month, and a content editor, who updates the CMS and translations, is ${usd(framer.editors.content)} a month.`,
        },
      },
      {
        criterion: "Design control",
        wix: { short: "Visual, every breakpoint", tag: "included" },
        rival: { short: "Design-tool canvas, React components", tag: "included" },
        edge: "rival",
        detail: {
          wix: "Design at every breakpoint without learning a class system, with custom CSS when a layout needs it.",
          rival: "A canvas that works like a design tool, with custom React components and visual controls when a page needs logic.",
        },
      },
      {
        criterion: "CMS",
        wix: { short: `Built in, up to ${plans.elite.cmsItems} items`, tag: "included" },
        rival: { short: `${fp.pro.cmsItems} items on ${fp.pro.name}`, tag: "addon" },
        edge: "wix",
        detail: {
          wix: `${plans.basic.cmsItems} items on ${plans.basic.name}, ${plans.plus.cmsItems} on ${plans.plus.name} and ${plans.elite.cmsItems} on ${plans.elite.name}, edited by the same collaborators as the pages.`,
          rival: `${fp.basic.name} holds ${fp.basic.collections} collections and ${fp.basic.cmsItems} items; ${fp.pro.name} holds ${fp.pro.collections} collections and ${fp.pro.cmsItems} items, extendable with paid add-ons to ${framer.proMaxCmsItems}.`,
        },
      },
      {
        criterion: "Pages",
        wix: { short: `${wixStudio.staticPageLimit} static, plus CMS pages`, tag: "included" },
        rival: { short: `${fp.basic.pages} on ${fp.basic.name}, ${fp.pro.pages} on ${fp.pro.name}`, tag: "included" },
        edge: "even",
        detail: {
          wix: `A Wix site holds ${wixStudio.staticPageLimit} static pages, plus a page for every item in its CMS collections.`,
          rival: `${fp.basic.name} allows ${fp.basic.pages} pages and ${fp.pro.name} ${fp.pro.pages}, with more available as a paid add-on on ${fp.pro.name}.`,
        },
      },
      {
        criterion: "Redirects",
        wix: { short: "Automatic on page URL change", tag: "included" },
        rival: { short: `From ${framer.redirectsFrom}, ${usd(fp.pro.perMonth)} a month`, tag: "addon" },
        edge: "wix",
        detail: {
          wix: "A redirect is created for you when a page's URL changes (blog posts excepted), and you can add up to five structured data markups per page.",
          rival: `Site redirects aren't on ${fp.basic.name}; they start on ${fp.pro.name}, at ${perMonthYearly(fp.pro.perMonth)}.`,
        },
      },
      {
        criterion: "Multilingual",
        wix: { short: "Free Wix app", tag: "included" },
        rival: { short: `Add-on, ${usd(framer.locale.perMonth)} a month per language`, tag: "addon" },
        edge: "wix",
        detail: {
          wix: "Wix Multilingual is free to install, with a starting allowance of AI-translated words.",
          rival: `Localization is an add-on: ${usd(framer.locale.perMonth)} a month for each locale, up to ${framer.locale.max}.`,
        },
      },
      {
        criterion: "E-commerce",
        wix: { short: `On the site plan, from ${wixStudio.paymentsFrom}`, tag: "included" },
        rival: { short: "Plugin plus a Shopify store", tag: "addon" },
        edge: "wix",
        detail: {
          wix: `Payments run on the ordinary site plan from ${wixStudio.paymentsFrom}, with a catalogue of up to ${wixStudio.productCatalog} products.`,
          rival: "Framer's plans don't list a store; plugins such as Framer Commerce sync products from a Shopify store and add cart and checkout buttons.",
        },
      },
      {
        criterion: "Code",
        wix: { short: "Wix IDE and GitHub", tag: "included" },
        rival: { short: "React components, no export", tag: "included" },
        edge: "even",
        detail: {
          wix: "Apps from the Wix App Market, and frontend code you can manage through the Wix IDE or GitHub.",
          rival: "Custom React components and JavaScript extend a site, but Framer doesn't offer HTML export for self-hosting.",
        },
      },
      {
        criterion: "Maintenance",
        wix: { short: "Managed", tag: "included" },
        rival: { short: "Managed", tag: "included" },
        edge: "even",
        detail: {
          wix: "Managed hosting and security on Wix's infrastructure, with nothing to install or patch.",
          rival: "Also managed: hosting on a global network is part of every plan, from 20 locations on Basic to 300+ on Pro.",
        },
      },
      {
        criterion: "Running cost",
        wix: { short: "One plan covers the editors" },
        rival: { short: "Site plan plus seats and locales" },
        edge: "wix",
        detail: {
          wix: "The plan covers the editors, so the cost grows with the site, not with the team.",
          rival: "The site plan, plus a seat for each extra editor, plus a monthly fee for each added language.",
        },
      },
    ],
  },
  questions: {
    heading: "Five questions that decide it",
    intro: "Most teams know the answer to the first one already.",
    items: [
      {
        q: "Who will change the site a year from now?",
        wix: "marketers, owners or a client's team edit it",
        rival: "the designers who built it keep editing it",
      },
      {
        q: "How much content will you publish?",
        wix: `you'll pass ${fp.pro.cmsItems} CMS items or ${fp.pro.collections} collections`,
        rival: "a blog and a couple of collections are enough",
        detail: `Framer ${fp.pro.name} holds ${fp.pro.cmsItems} items in ${fp.pro.collections} collections before add-ons; Wix Studio scales from ${plans.basic.cmsItems} to ${plans.elite.cmsItems}.`,
      },
      {
        q: "Will you sell online?",
        wix: "the store should run on the same site plan",
        rival: "a Shopify store connected through a plugin is fine",
      },
      {
        q: "How many languages will the site need?",
        wix: "two or more, without a monthly fee per language",
        rival: `one, or ${usd(framer.locale.perMonth)} a month per added language is fine`,
      },
      {
        q: "What matters most at launch?",
        wix: "a site your team can run for years",
        rival: "a striking marketing page live this week",
      },
    ],
  },
  choose: {
    heading: "So, which should you choose?",
    wix: {
      label: "Room to grow",
      body: "The site will grow a CMS, a store or more languages, and several people who aren't designers will edit it without a seat each.",
    },
    rival: {
      label: "Design speed",
      body: "A design team ships launch and campaign pages fast, the CMS stays small, and the people who built the site keep editing it.",
    },
    custom: {
      label: "Most flexible",
      body: "You need full design control and logic no platform offers, with content modelled once and used across channels.",
    },
  },
  cost: {
    heading: "What year one costs",
    setup:
      "A 15-page marketing site with a CMS-driven blog, one added language, and three people editing it in-house.",
    rows: [
      {
        label: "Site plan",
        wix: `${plans.basic.name}, ${perMonthYearly(plans.basic.perMonth)}: ${perYear(plans.basic.perMonth)} for the year, CMS included.`,
        rival: `${fp.basic.name}, ${perMonthYearly(fp.basic.perMonth)}: ${perYear(fp.basic.perMonth)} for the year.`,
      },
      {
        label: "Second language",
        wix: "Wix Multilingual, free to install.",
        rival: `One locale, ${usd(framer.locale.perMonth)} a month: ${perYear(framer.locale.perMonth)} for the year.`,
      },
      {
        label: "Two more editors",
        wix: `Included: ${plans.basic.collaborators} site collaborators on ${plans.basic.name}.`,
        rival: `Two content editors, ${usd(framer.editors.content)} a month each: ${perYear(framer.editors.content * extraEditors)} for the year.`,
      },
      {
        label: "Hosting and security",
        wix: "Included in the plan.",
        rival: "Included in the plan.",
      },
      {
        label: "Build",
        wix: `${studio.name}, ${studio.price} with Zenith Digital.`,
        rival: "We don't build on Framer: quotes vary by agency.",
      },
    ],
    note: "Framer's editor and locale prices are per month, billed with the plan, and the workspace owner edits for free, which is why two seats cover three people. Redirects need Pro if you're replacing an existing site.",
  },
  proof: {
    heading: "Built on Wix Studio by Zenith Digital",
    picks: ["scottish-luxury-experience", "hunting-brook-gardens", "knode-ai"],
    rivalLine: "We don't build on Framer. We move sites off it.",
  },
  faq: {
    heading: ["Wix Studio vs Framer:", "your questions"],
    subhead: "Answered plainly, including where Framer is the better choice.",
    items: [
      {
        q: "Is Wix Studio or Framer better for SEO?",
        a: `Both include built-in SEO settings and fast managed hosting. The practical difference is redirects: Framer adds them from ${fp.pro.name}, while Wix Studio creates one when a page's URL changes and includes a redirect manager on every plan.`,
      },
      {
        q: "Is Framer cheaper than Wix Studio?",
        a: `On the site plan, yes: Framer ${fp.basic.name} is ${perMonthYearly(fp.basic.perMonth)} against Wix Studio ${plans.basic.name} at ${usd(plans.basic.perMonth)}. Editors and languages change that, because Framer charges for each extra editor and each added locale, and Wix Studio includes the editors.`,
      },
      {
        q: "Can you sell products on a Framer website?",
        a: `Not on Framer's own plans. Stores on Framer run through plugins such as Framer Commerce, which sync products from a Shopify store. On Wix Studio, payments run on the site plan from ${wixStudio.paymentsFrom}, with up to ${wixStudio.productCatalog} products.`,
      },
      {
        q: "How many CMS items can Framer hold compared with Wix Studio?",
        a: `Framer ${fp.basic.name} holds ${fp.basic.cmsItems} items in ${fp.basic.collections} collections, and ${fp.pro.name} ${fp.pro.cmsItems} in ${fp.pro.collections}, extendable with paid add-ons to ${framer.proMaxCmsItems}. Wix Studio holds ${plans.basic.cmsItems} on ${plans.basic.name}, ${plans.plus.cmsItems} on ${plans.plus.name} and ${plans.elite.cmsItems} on ${plans.elite.name}.`,
      },
      {
        q: "Can you move from Framer to Wix Studio without losing rankings?",
        a: "Yes, when every URL keeps its address or gets a 301. Framer doesn't export the site itself, so the design is rebuilt, but CMS collections and redirects export to CSV through Framer plugins. Google isn't ours to promise; the URL map, redirects and 30 days of monitoring are.",
      },
      {
        q: "Is Framer better for designers than Wix Studio?",
        a: "Often, for designers who want a canvas that feels like a design tool and need landing pages live fast. Wix Studio gives breakpoints, a CSS grid and custom CSS too, and suits teams where people who aren't designers keep editing after launch.",
      },
    ],
  },
  related: {
    heading: "Keep reading",
    items: [
      {
        kind: "Migration guide",
        label: "Framer to Wix Studio",
        href: "/services/framer-to-wix-studio",
        desc: "What exports as CSV, why the design is rebuilt, and how the redirects move.",
        icon: "transfer",
      },
      {
        kind: "Comparison",
        label: "Wix Studio vs Webflow",
        href: "/compare/wix-studio-vs-webflow",
        desc: "The other designer-favourite builder, and who can edit it after launch.",
        icon: "split",
      },
      {
        kind: "Article",
        label: "Wix Studio pricing",
        href: "/blog/wix-studio-pricing",
        desc: "What each Wix Studio plan includes, and what a build costs on top.",
        icon: "receipt",
      },
      {
        kind: "Article",
        label: "Wix vs Wix Studio",
        href: "/blog/wix-vs-wix-studio",
        desc: "Which of Wix's two editors this comparison is about, and why the difference matters.",
        icon: "layers",
      },
    ],
  },
  sources: [
    { label: "Framer: Pricing", href: framer.source.href, note: "Plan prices, pages, CMS collections and items, redirects from Pro, editor and content editor seats, the locales add-on, hosting locations, and add-on limits.", checked },
    { label: "Framer: Developers", href: "https://www.framer.com/developers/", note: "Custom React components with visual controls.", checked },
    { label: "Framer: HTML export", href: "https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/", note: "Framer does not offer HTML export for self-hosting.", checked },
    { label: "Framer Commerce plugin", href: "https://www.framer.com/marketplace/plugins/framer-commerce/", note: "Shopify storefronts in Framer: product sync and purchase buttons.", checked },
    { label: "Framer: CMS Export plugin", href: "https://www.framer.com/marketplace/plugins/cms-export/", note: "Exporting CMS collections as CSV.", checked },
    { label: "Framer: Redirect Sync plugin", href: "https://www.framer.com/marketplace/plugins/redirect-sync/", note: "Exporting and importing redirects as CSV.", checked },
    { label: "Wix Studio: plans and pricing", href: "https://www.wix.com/studio/plans", note: "Plan prices, collaborators, CMS items, payments from Standard, and the product catalogue.", checked },
    { label: "Wix: CMS dynamic pages", href: "https://support.wix.com/en/article/cms-about-dynamic-pages", note: "The static page limit, and a page per CMS item.", checked: "2026-11-19" },
    { label: "Wix: 301 redirects", href: "https://support.wix.com/en/article/setting-up-a-301-redirect-for-a-page-on-your-site", note: "The Redirect Manager, and automatic redirects when a page's URL slug changes (not for blog posts).", checked: "2026-11-19" },
    { label: "Wix: Structured data markup", href: "https://support.wix.com/en/article/adding-structured-data-markup-to-your-sites-pages-2546962", note: "Up to five markups per page.", checked: "2026-11-19" },
    { label: "Wix Multilingual", href: "https://www.wix.com/app-market/wix-multilingual", note: "Free to install.", checked: "2026-11-19" },
    { label: "Wix: Managing your team", href: "https://support.wix.com/en/article/wix-studio-managing-your-team", note: "Roles and permissions for collaborators.", checked: "2026-11-19" },
    { label: "Wix: The Code panel", href: "https://dev.wix.com/docs/develop-websites/articles/workspace-tools/velo-workspace/workspaces/wix-studio-working-with-the-code-panel", note: "Frontend code, the Wix IDE and GitHub.", checked: "2026-11-19" },
    { label: "Wix Studio: Security", href: "https://www.wix.com/studio/infrastructure/security", note: "Security with no setup or maintenance required.", checked: "2026-11-19" },
  ],
};
