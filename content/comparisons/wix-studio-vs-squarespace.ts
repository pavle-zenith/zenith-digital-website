import { PACKAGES } from "@/content/industries/proof";

import type { ComparisonContent } from "./types";
import { perMonthYearly, perYear, squarespace, usd, weglot, wixStudio } from "./vendors";

/*
 * Written 20 Nov 2026. Every Squarespace figure was read that day on
 * Squarespace's own pages in a real browser: squarespace.com/pricing ("Pay
 * annually" selected) and the help centre articles on collection pages, page
 * limits, URL mappings, code injection, llms.txt, contributor permissions
 * and the Weglot integration. Weglot's plan is from weglot.com/pricing (shown
 * in euros, excluding VAT, for our region). Wix figures are from
 * wix.com/studio/plans and support.wix.com, as on the other comparisons.
 *
 * Edge calls worth knowing: Squarespace wins Editors (unlimited contributors
 * from Core at US$17), and e-commerce is called even (selling on every plan,
 * no fee from Core, against Wix payments from Standard).
 *
 * Published 20 Nov 2026 (content/comparisons/status.ts).
 */

const { studio } = PACKAGES;
const { plans } = wixStudio;
const sq = squarespace.plans;
const checked = "2026-11-20";

export const wixStudioVsSquarespace: ComparisonContent = {
  slug: "wix-studio-vs-squarespace",
  rival: {
    key: "squarespace",
    name: "Squarespace",
    weBuildOnIt: false,
    guide: {
      label: "Read the Squarespace to Wix Studio guide",
      href: "/services/squarespace-to-wix-studio",
    },
  },
  updated: "2026-11-20",
  checked,
  seo: {
    title: "Wix Studio vs Squarespace in 2026: which to choose | Zenith Digital",
    description:
      "Wix Studio or Squarespace? CMS, editors, store fees, languages and custom code compared from each vendor's own pages, with what year one costs.",
  },
  hero: {
    h1: "Wix Studio vs Squarespace",
    shortAnswer:
      "Wix Studio if the site needs its own content structure, design control at every breakpoint, or room to add a store, languages and custom features. Squarespace if a small business wants a polished template live quickly and won't outgrow it.",
  },
  menuLabel: "vs Squarespace",
  table: {
    heading: "Wix Studio and Squarespace, side by side",
    intro:
      "Squarespace is one of the quickest ways to a good-looking small site. The differences show up when the site has to do more: content that isn't a blog or a store, a second language, or code.",
    rows: [
      {
        criterion: "Best for",
        wix: { short: "Sites that keep adding features" },
        rival: { short: "A polished template, live fast" },
        edge: "depends",
        detail: {
          wix: "Businesses whose site has to do more over time: their own content collections, a store, more languages and custom features, with design control at every breakpoint.",
          rival: "Small businesses and creatives who want a polished template live quickly, and whose site will stay close to that template.",
        },
      },
      {
        criterion: "Editors",
        wix: {
          short: `${plans.basic.collaborators} to ${plans.elite.collaborators} included, by plan`,
          tag: "included",
        },
        rival: { short: `Unlimited from ${sq.core.name}`, tag: "included" },
        edge: "rival",
        detail: {
          wix: `Adding an editor is a permission, not a purchase: ${plans.basic.collaborators} to ${plans.elite.collaborators} collaborators are included, depending on the plan.`,
          rival: `${sq.basic.name} includes ${sq.basic.contributors} contributors; ${sq.core.name}, at ${perMonthYearly(sq.core.perMonth)}, includes unlimited contributors with roles and permissions.`,
        },
      },
      {
        criterion: "Design control",
        wix: { short: "Visual, every breakpoint", tag: "included" },
        rival: { short: "Templates and a section grid", tag: "included" },
        edge: "wix",
        detail: {
          wix: "Design at every breakpoint without learning a class system, with custom CSS when a layout needs it.",
          rival: "Pages are built from sections laid out on the Fluid Engine grid, usually starting from a template.",
        },
      },
      {
        criterion: "CMS",
        wix: { short: "Your own collections and fields", tag: "included" },
        rival: { short: "Set types: blog, store, events", tag: "included" },
        edge: "wix",
        detail: {
          wix: `Collections you define yourself, with your own fields and a dynamic page for each item, from ${plans.basic.cmsItems} items on ${plans.basic.name} to ${plans.elite.cmsItems} on ${plans.elite.name}.`,
          rival: "Collection pages come in set types: blog posts, products, events, portfolio projects, courses and videos.",
        },
      },
      {
        criterion: "Redirects",
        wix: { short: "Automatic on page URL change", tag: "included" },
        rival: { short: "Added by hand", tag: "yours" },
        edge: "wix",
        detail: {
          wix: "A redirect is created for you when a page's URL changes (blog posts excepted), and you can add up to five structured data markups per page.",
          rival: "301 and 302 redirects are added by hand in the URL mappings panel.",
        },
      },
      {
        criterion: "AI search (llms.txt)",
        wix: { short: "Built in, kept current", tag: "included" },
        rival: { short: "A text field you write", tag: "yours" },
        edge: "wix",
        detail: {
          wix: "Wix keeps an llms.txt file current for you (upgraded plans with a custom domain), and tracks how often AI platforms cite the site.",
          rival: "Version 7.1 sites can publish an llms.txt file; it's off by default, and you write its text yourself in the SEO panel.",
        },
      },
      {
        criterion: "Multilingual",
        wix: { short: "Free Wix app", tag: "included" },
        rival: { short: "Weglot integration, paid beyond the basics", tag: "addon" },
        edge: "wix",
        detail: {
          wix: "Wix Multilingual is free to install, with a starting allowance of AI-translated words.",
          rival: `Through the Weglot integration: free for one language up to ${squarespace.weglotFreeWords} words, then a paid Weglot plan.`,
        },
      },
      {
        criterion: "E-commerce",
        wix: { short: `On the site plan, from ${wixStudio.paymentsFrom}`, tag: "included" },
        rival: { short: `Every plan, no fee from ${sq.core.name}`, tag: "included" },
        edge: "even",
        detail: {
          wix: `Payments run on the ordinary site plan from ${wixStudio.paymentsFrom}, ${perMonthYearly(plans.standard.perMonth)}, with a catalogue of up to ${wixStudio.productCatalog} products.`,
          rival: `Selling is on every plan: ${sq.basic.name} adds a ${sq.basic.storeFee} fee on online store transactions, and ${sq.core.name} removes it.`,
        },
      },
      {
        criterion: "Custom code",
        wix: { short: "Wix IDE and GitHub", tag: "included" },
        rival: { short: `Code injection from ${squarespace.codeInjectionFrom}`, tag: "addon" },
        edge: "wix",
        detail: {
          wix: "Apps from the Wix App Market, and frontend code you can manage through the Wix IDE or GitHub.",
          rival: `HTML and scripts through code injection on ${squarespace.codeInjectionFrom} and above; Squarespace support doesn't help with custom code.`,
        },
      },
      {
        criterion: "Maintenance",
        wix: { short: "Managed", tag: "included" },
        rival: { short: "Managed", tag: "included" },
        edge: "even",
        detail: {
          wix: "Managed hosting and security on Wix's infrastructure, with nothing to install or patch.",
          rival: "Also managed: secure hosting and unlimited bandwidth are part of every plan.",
        },
      },
    ],
  },
  questions: {
    heading: "Five questions that decide it",
    intro: "If the first answer is a blog, a store and an events page, Squarespace will probably do.",
    items: [
      {
        q: "What kind of content will the site hold?",
        wix: "your own collections, like listings, team members or locations",
        rival: "a blog, a store and an events page cover it",
      },
      {
        q: "How much will the design change over time?",
        wix: "every breakpoint needs its own layout and the brand evolves",
        rival: "a good template, lightly adjusted, is the right starting point",
      },
      {
        q: "Will the site need more than one language?",
        wix: "two or more, without a translation subscription",
        rival: "one, or a paid Weglot plan for more, is fine",
        detail: `Squarespace's Weglot integration is free for one language up to ${squarespace.weglotFreeWords} words; Wix Multilingual is free to install.`,
      },
      {
        q: "How big will the store be?",
        wix: `up to ${wixStudio.productCatalog} products on the site plan`,
        rival: `a small catalogue on ${sq.core.name}, with no transaction fee`,
      },
      {
        q: "Will the site need custom features?",
        wix: "custom code, integrations or logic beyond the editor",
        rival: "the built-in blocks and extensions do what you need",
      },
    ],
  },
  choose: {
    heading: "So, which should you choose?",
    wix: {
      label: "Room to grow",
      body: "Your content needs its own structure, the design needs control at every breakpoint, or the site will add a store, languages or custom features.",
    },
    rival: {
      label: "Quickest start",
      body: "A small business wants a polished template live quickly, the content fits a blog, store or events page, and the site won't outgrow it.",
    },
    custom: {
      label: "Most flexible",
      body: "You need full design control and logic no platform offers, with content modelled once and used across channels.",
    },
  },
  cost: {
    heading: "What year one costs",
    setup:
      "A 15-page small-business site with a blog, one added language, and two people editing it.",
    rows: [
      {
        label: "Site plan",
        wix: `${plans.basic.name}, ${perMonthYearly(plans.basic.perMonth)}: ${perYear(plans.basic.perMonth)} for the year, CMS included.`,
        rival: `${sq.basic.name}, ${perMonthYearly(sq.basic.perMonth)}: ${perYear(sq.basic.perMonth)} for the year.`,
      },
      {
        label: "Second language",
        wix: "Wix Multilingual, free to install.",
        rival: `Weglot ${weglot.starter.name} for up to ${weglot.starter.words} words, €${weglot.starter.perMonthEur} a month excluding VAT: €${weglot.starter.perMonthEur * 12} for the year.`,
      },
      {
        label: "Editors",
        wix: `Included: ${plans.basic.collaborators} site collaborators on ${plans.basic.name}.`,
        rival: `Included: ${sq.basic.contributors} contributors on ${sq.basic.name}.`,
      },
      {
        label: "Hosting and security",
        wix: "Included in the plan.",
        rival: "Included in the plan.",
      },
      {
        label: "Build",
        wix: `${studio.name}, ${studio.price} with Zenith Digital.`,
        rival: "We don't build on Squarespace: quotes vary by agency.",
      },
    ],
    note: `A 15-page site with a blog usually passes Weglot's free ${squarespace.weglotFreeWords} words, which is why the paid plan is counted. Selling online on Squarespace ${sq.basic.name} adds a ${sq.basic.storeFee} transaction fee; ${sq.core.name}, ${usd(sq.core.perMonth)} a month billed yearly, removes it.`,
  },
  proof: {
    heading: "Built on Wix Studio by Zenith Digital",
    picks: ["scottish-luxury-experience", "hunting-brook-gardens", "knode-ai"],
    rivalLine: "We don't build on Squarespace. We move sites off it.",
  },
  faq: {
    heading: ["Wix Studio vs Squarespace:", "your questions"],
    subhead: "Answered plainly, including where Squarespace is the better choice.",
    items: [
      {
        q: "Is Wix Studio or Squarespace better for SEO?",
        a: "Both cover the basics: page titles, descriptions, sitemaps and 301 redirects. Wix Studio creates a redirect when a page's URL changes and keeps an llms.txt file current for you; on Squarespace, redirects are added by hand and the llms.txt text is yours to write.",
      },
      {
        q: "Is Squarespace cheaper than Wix Studio?",
        a: `At the entry plan they're level: Squarespace ${sq.basic.name} and Wix Studio ${plans.basic.name} are both ${perMonthYearly(sq.basic.perMonth)}. Squarespace ${sq.core.name}, ${usd(sq.core.perMonth)}, removes the store fee and allows unlimited contributors; Wix Studio takes payments from ${wixStudio.paymentsFrom}, ${usd(plans.standard.perMonth)}.`,
      },
      {
        q: "Can Squarespace handle a custom CMS like Wix Studio?",
        a: "Not in the same way. Squarespace collections come in set types, such as blog posts, products, events and portfolio projects. Wix Studio lets you define your own collections and fields, and builds a page for each item.",
      },
      {
        q: "Does Squarespace support multiple languages?",
        a: `Yes, through its Weglot integration on version 7.1, which is free for one language up to ${squarespace.weglotFreeWords} words and needs a paid Weglot plan beyond that. Wix Multilingual is free to install on Wix Studio.`,
      },
      {
        q: "Can I add custom code to a Squarespace site?",
        a: `Yes, with limits: code injection for HTML and scripts is on ${squarespace.codeInjectionFrom} and above, and Squarespace support doesn't help with custom code. Wix Studio has frontend code managed through the Wix IDE or GitHub.`,
      },
      {
        q: "Can you move from Squarespace to Wix Studio without losing rankings?",
        a: "Yes, when every URL keeps its address or gets a 301 redirect, and the page titles and descriptions come across. Google isn't ours to promise; the URL map, redirects and 30 days of monitoring are.",
      },
    ],
  },
  related: {
    heading: "Keep reading",
    items: [
      {
        kind: "Migration guide",
        label: "Squarespace to Wix Studio",
        href: "/services/squarespace-to-wix-studio",
        desc: "What Squarespace's export contains, what it leaves behind, and how the URLs move.",
        icon: "transfer",
      },
      {
        kind: "Comparison",
        label: "Wix Studio vs WordPress",
        href: "/compare/wix-studio-vs-wordpress",
        desc: "The other common choice for a small-business site, and what it costs to run.",
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
        kind: "Industry",
        label: "Local business websites",
        href: "/industries/local-business",
        desc: "What a local business site needs to win enquiries, and what we've built.",
        icon: "house",
      },
    ],
  },
  sources: [
    { label: "Squarespace: Pricing", href: squarespace.source.href, note: "Plan prices billed annually, contributors, store transaction fees, and secure hosting on every plan.", checked },
    { label: "Squarespace: Collection pages", href: "https://support.squarespace.com/hc/en-us/articles/208216828-Collection-pages", note: "The collection page types.", checked },
    { label: "Squarespace: Page limits", href: "https://support.squarespace.com/hc/en-us/articles/206543087-Page-limits", note: "Page and content limits, and Fluid Engine sections.", checked },
    { label: "Squarespace: URL mappings", href: "https://support.squarespace.com/hc/en-us/articles/205815308-URL-mappings", note: "301 and 302 redirects in the URL mappings panel.", checked },
    { label: "Squarespace: Code injection", href: "https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection", note: "Code injection on Core, Plus and Advanced; support doesn't troubleshoot custom code.", checked },
    { label: "Squarespace: Create an llms.txt file", href: "https://support.squarespace.com/hc/en-us/articles/47434125611277-Create-an-llms-txt-file", note: "An llms.txt file on version 7.1, off by default, with text you write.", checked },
    { label: "Squarespace: Contributor roles and permissions", href: "https://support.squarespace.com/hc/en-us/articles/206537297-Squarespace-permissions-explained", note: "Roles and permissions for contributors.", checked },
    { label: "Squarespace: Multilingual site with Weglot", href: "https://support.squarespace.com/hc/en-us/articles/205809778-Creating-a-multilingual-site-with-Weglot", note: "The Weglot integration, free for one language up to 2,000 words.", checked },
    { label: "Weglot: Pricing", href: weglot.source.href, note: "The Starter plan: 1 language, 10,000 words, €15 a month excluding VAT.", checked },
    { label: "Wix Studio: plans and pricing", href: "https://www.wix.com/studio/plans", note: "Plan prices, collaborators, CMS items, payments from Standard, and the product catalogue.", checked },
    { label: "Wix: CMS dynamic pages", href: "https://support.wix.com/en/article/cms-about-dynamic-pages", note: "Dynamic pages for CMS items.", checked: "2026-11-19" },
    { label: "Wix: 301 redirects", href: "https://support.wix.com/en/article/setting-up-a-301-redirect-for-a-page-on-your-site", note: "The Redirect Manager, and automatic redirects when a page's URL slug changes (not for blog posts).", checked: "2026-11-19" },
    { label: "Wix: Structured data markup", href: "https://support.wix.com/en/article/adding-structured-data-markup-to-your-sites-pages-2546962", note: "Up to five markups per page.", checked: "2026-11-19" },
    { label: "Wix: Your llms.txt file", href: "https://support.wix.com/en/article/understanding-your-sites-llms-txt-file", note: "Generated and maintained by Wix on upgraded plans.", checked: "2026-11-19" },
    { label: "Wix: AI Visibility Overview", href: "https://www.wix.com/press-room/home/post/wix-launches-ai-visibility-overview-with-full-generative-engine-optimization-support-for-ai-powered", note: "Tracking how often AI platforms cite a site.", checked: "2026-11-19" },
    { label: "Wix Multilingual", href: "https://www.wix.com/app-market/wix-multilingual", note: "Free to install.", checked: "2026-11-19" },
    { label: "Wix: The Code panel", href: "https://dev.wix.com/docs/develop-websites/articles/workspace-tools/velo-workspace/workspaces/wix-studio-working-with-the-code-panel", note: "Frontend code, the Wix IDE and GitHub.", checked: "2026-11-19" },
    { label: "Wix Studio: Security", href: "https://www.wix.com/studio/infrastructure/security", note: "Security with no setup or maintenance required.", checked: "2026-11-19" },
  ],
};
