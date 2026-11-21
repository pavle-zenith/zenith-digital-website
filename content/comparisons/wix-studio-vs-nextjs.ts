import { PACKAGES } from "@/content/industries/proof";

import type { ComparisonContent } from "./types";
import { perMonthYearly, perYear, sanity, usd, vercel, wixStudio } from "./vendors";

/*
 * Written 20 Nov 2026. "Custom code" here is how we build it: Next.js with
 * Sanity as the CMS, deployed on Vercel Pro with Sanity's Free plan (owner,
 * 20 Nov 2026), at the same published prices as Wix Studio. Read that day
 * in a real browser: nextjs.org (redirects, internationalization, upgrade
 * guides), github.com/vercel/next.js (MIT licence), vercel.com/pricing (Pro
 * US$20 a month with US$20 of usage credit, prices exclude tax),
 * sanity.io/pricing (Free up to 20 seats; Growth US$15 per seat a month,
 * monthly billing only) and sanity.io/studio (schemas defined in code).
 *
 * Not claimed: speed or Core Web Vitals differences (no like-for-like
 * vendor source), or anything about Vercel Hobby's terms.
 *
 * Published 20 Nov 2026 (content/comparisons/status.ts).
 */

const { studio } = PACKAGES;
const { plans } = wixStudio;
const checked = "2026-11-20";

export const wixStudioVsNextjs: ComparisonContent = {
  slug: "wix-studio-vs-nextjs",
  rival: {
    key: "nextjs",
    name: "Next.js",
    weBuildOnIt: true,
    platform: "nextjs",
  },
  updated: "2026-11-20",
  checked,
  seo: {
    title: "Wix Studio vs custom code (Next.js) in 2026 | Zenith Digital",
    description:
      "Wix Studio vs custom code (Next.js) compared on editing, hosting, SEO and upkeep. See which suits your business and when custom code is the better choice.",
  },
  hero: {
    h1: "Wix Studio vs custom code (Next.js)",
    shortAnswer:
      "Wix Studio if your team wants to edit pages visually and have hosting and upkeep handled. Next.js with Sanity if the site behaves like a product, reuses its content across channels, or needs full control of the code.",
  },
  menuLabel: "vs custom code",
  table: {
    heading: "Wix Studio and Next.js, side by side",
    intro:
      "We build both, at the same published price, so the question isn't which is better. It's who will change the site after launch, and whether it needs to do things no platform does.",
    rows: [
      {
        criterion: "Best for",
        wix: { short: "Teams that edit visually" },
        rival: { short: "Sites that behave like products" },
        edge: "depends",
        detail: {
          wix: "Marketing sites, content and stores that a team edits visually, with hosting, security and updates handled by the platform.",
          rival: "Sites with product-like logic, content reused across channels, or a hard requirement to own the code and the hosting.",
        },
      },
      {
        criterion: "Editing",
        wix: { short: "Visual, page by page", tag: "included" },
        rival: { short: "Content in Sanity, layouts in code", tag: "yours" },
        edge: "wix",
        detail: {
          wix: "Collaborators edit pages visually, add sections and publish without a developer.",
          rival: "Editors update content in Sanity Studio; the page layouts themselves are code, so a new kind of page is a developer's job.",
        },
      },
      {
        criterion: "Design control",
        wix: { short: "Visual, every breakpoint", tag: "included" },
        rival: { short: "Anything you can code", tag: "yours" },
        edge: "rival",
        detail: {
          wix: "Design at every breakpoint without learning a class system, with custom CSS when a layout needs it.",
          rival: "No editor limits: any layout, interaction or logic React can express, built by a developer.",
        },
      },
      {
        criterion: "Content model",
        wix: { short: "Collections and dynamic pages", tag: "included" },
        rival: { short: "Modelled in code, reused anywhere", tag: "included" },
        edge: "rival",
        detail: {
          wix: `Collections you define in the editor, with a dynamic page for each item, from ${plans.basic.cmsItems} items on ${plans.basic.name} to ${plans.elite.cmsItems} on ${plans.elite.name}.`,
          rival: "Content types are defined in code in Sanity and delivered by API, so the same content can feed a website, an app or another channel.",
        },
      },
      {
        criterion: "Editors",
        wix: {
          short: `${plans.basic.collaborators} to ${plans.elite.collaborators} included, by plan`,
          tag: "included",
        },
        rival: { short: `Up to ${sanity.plans.free.seats} free on Sanity`, tag: "included" },
        edge: "even",
        detail: {
          wix: `Adding an editor is a permission, not a purchase: ${plans.basic.collaborators} to ${plans.elite.collaborators} collaborators are included, depending on the plan.`,
          rival: `Sanity's ${sanity.plans.free.name} plan includes up to ${sanity.plans.free.seats} user seats; ${sanity.plans.growth.name} is ${usd(sanity.plans.growth.perSeatPerMonth)} per seat a month.`,
        },
      },
      {
        criterion: "Hosting",
        wix: { short: "Included in the plan", tag: "included" },
        rival: { short: `Vercel, ${usd(vercel.plans.pro.perMonth)} a month`, tag: "addon" },
        edge: "wix",
        detail: {
          wix: "Hosting and security are part of every Wix Studio plan.",
          rival: `Our builds deploy on Vercel ${vercel.plans.pro.name}, ${usd(vercel.plans.pro.perMonth)} a month before tax, with ${usd(vercel.plans.pro.usageCredit)} of usage credit included. Next.js itself is free and open source under the MIT licence.`,
        },
      },
      {
        criterion: "Redirects",
        wix: { short: "Automatic on page URL change", tag: "included" },
        rival: { short: "In code, any rule", tag: "yours" },
        edge: "even",
        detail: {
          wix: "A redirect is created for you when a page's URL changes (blog posts excepted), and you can add up to five structured data markups per page.",
          rival: "Redirects are defined in the project's configuration, so any pattern is possible, and each change ships with a deploy.",
        },
      },
      {
        criterion: "Multilingual",
        wix: { short: "Free Wix app", tag: "included" },
        rival: { short: "Localized routing, built per project", tag: "yours" },
        edge: "wix",
        detail: {
          wix: "Wix Multilingual is free to install, with a starting allowance of AI-translated words.",
          rival: "Next.js supports localized routing and rendering; translated content is modelled in the CMS and built for each project.",
        },
      },
      {
        criterion: "AI search (llms.txt)",
        wix: { short: "Built in, kept current", tag: "included" },
        rival: { short: "Built by the developer", tag: "yours" },
        edge: "wix",
        detail: {
          wix: "Wix keeps an llms.txt file current for you (upgraded plans with a custom domain), and tracks how often AI platforms cite the site.",
          rival: "An llms.txt file is part of the build: generated from the same content as the pages, or written by hand.",
        },
      },
      {
        criterion: "Owning the code",
        wix: { short: "Runs on Wix", tag: "included" },
        rival: { short: "Your repository, open-source framework", tag: "included" },
        edge: "rival",
        detail: {
          wix: "The site runs on Wix's infrastructure; frontend code is managed through the Wix IDE or GitHub.",
          rival: "The code lives in your own repository, on a framework published under the MIT licence, and can move to another host.",
        },
      },
      {
        criterion: "Maintenance",
        wix: { short: "Managed", tag: "included" },
        rival: { short: "Framework updates are yours", tag: "yours" },
        edge: "wix",
        detail: {
          wix: "Managed hosting and security on Wix's infrastructure, with nothing to install or patch.",
          rival: "Next.js publishes upgrade guides and codemods for each major version; keeping the framework and its dependencies current is a developer's job.",
        },
      },
    ],
  },
  questions: {
    heading: "Five questions that decide it",
    intro: "If the first answer is your marketing team, that's usually the answer.",
    items: [
      {
        q: "Who changes the site after launch?",
        wix: "the team edits pages themselves, without a developer",
        rival: "a developer is on hand for new pages and features",
      },
      {
        q: "Does the site behave like a product?",
        wix: "it's a marketing site with forms, a CMS and maybe a store",
        rival: "it has accounts, calculators, dashboards or custom logic",
      },
      {
        q: "Will the content live in more than one place?",
        wix: "the website is where the content lives",
        rival: "the same content feeds an app, a second site or other channels",
      },
      {
        q: "Who looks after it once it's live?",
        wix: "the platform handles hosting, security and updates",
        rival: "someone will keep the framework and dependencies current",
      },
      {
        q: "How much does owning the code matter?",
        wix: "running on a managed platform is fine",
        rival: "the code must live in your own repository",
      },
    ],
  },
  choose: {
    heading: "So, which should you choose?",
    wix: {
      label: "Easiest to run",
      body: "The team will edit pages themselves, you want hosting and upkeep handled, and the site is marketing, content or a store.",
    },
    rival: {
      label: "Most flexible",
      body: "The site behaves like a product, its content is reused across channels, or owning the code and the hosting matters.",
    },
    customTitle: "Shopify is usually better if...",
    custom: {
      label: "Commerce first",
      body: "Selling products is the business: Shopify runs the store, with a theme or a custom Next.js storefront on top.",
    },
  },
  cost: {
    heading: "What year one costs",
    setup:
      "A 15-page marketing site with a CMS-driven blog and three people editing it in-house.",
    rows: [
      {
        label: "Platform and hosting",
        wix: `${plans.basic.name}, ${perMonthYearly(plans.basic.perMonth)}: ${perYear(plans.basic.perMonth)} for the year, hosting included.`,
        rival: `Vercel ${vercel.plans.pro.name}, ${usd(vercel.plans.pro.perMonth)} a month before tax: ${perYear(vercel.plans.pro.perMonth)} for the year.`,
      },
      {
        label: "CMS and editors",
        wix: `Included: CMS and ${plans.basic.collaborators} site collaborators on ${plans.basic.name}.`,
        rival: `Sanity ${sanity.plans.free.name}: ${usd(sanity.plans.free.perMonth)}, up to ${sanity.plans.free.seats} seats.`,
      },
      {
        label: "Upkeep after launch",
        wix: "Included: Wix maintains the platform.",
        rival: "A developer's time for framework and dependency updates, after our 30 days of support.",
      },
      {
        label: "Build",
        wix: `${studio.name}, ${studio.price} with Zenith Digital.`,
        rival: `${studio.name}, ${studio.price} with Zenith Digital: the same price in custom code.`,
      },
    ],
    note: `Vercel ${vercel.plans.pro.name} bills monthly, prices exclude tax, and usage beyond the included ${usd(vercel.plans.pro.usageCredit)} credit is billed on top. Sanity's self-serve plans bill monthly; ${sanity.plans.growth.name}, at ${usd(sanity.plans.growth.perSeatPerMonth)} per seat, is only needed past the ${sanity.plans.free.name} plan's limits.`,
  },
  proof: {
    heading: "Built by Zenith Digital, on both",
    picks: ["scottish-luxury-experience", "hunting-brook-gardens", "knode-ai"],
    rivalPicks: ["genroks-ai", "highland-fling", "bianomics"],
    rivalLine: "We build both, at the same published prices.",
  },
  faq: {
    heading: ["Wix Studio vs custom code:", "your questions"],
    subhead: "From an agency that builds both, so neither answer is a sales pitch.",
    items: [
      {
        q: "Is a custom Next.js website better for SEO than Wix Studio?",
        a: "Not by default. Both can produce fast pages with full control of titles, descriptions, redirects and structured data. Next.js gives a developer more control over rendering and markup; Wix Studio gives the same essentials without code, and creates a redirect when a page's URL changes.",
      },
      {
        q: "Is a custom-coded website more expensive than Wix Studio?",
        a: `Not to build with us: both are ${studio.name} at ${studio.price}, or The Minimum ${PACKAGES.minimum.price.toLowerCase()}. Running costs differ: Wix Studio from ${perMonthYearly(plans.basic.perMonth)}, hosting included, against Vercel ${vercel.plans.pro.name} at ${usd(vercel.plans.pro.perMonth)} a month with Sanity's ${sanity.plans.free.name} plan for up to ${sanity.plans.free.seats} editors.`,
      },
      {
        q: "Can my team edit a Next.js website without a developer?",
        a: "Yes, for content: text, images, posts and anything else modelled in Sanity is edited in Sanity Studio. New page layouts and new kinds of content are code, so those need a developer.",
      },
      {
        q: "What is Sanity, and why use it with Next.js?",
        a: "Sanity is a headless CMS: content types are defined in code and delivered by API, and editors work in Sanity Studio. Paired with Next.js, the same content can power the website and any other channel, and editors never touch the code.",
      },
      {
        q: "Who maintains a custom Next.js website after launch?",
        a: "Every build includes 30 days of support after launch. After that, framework and dependency updates are a developer's job: yours, or ours on request or through The Zenith. On Wix Studio, Wix maintains the platform.",
      },
    ],
  },
  related: {
    heading: "Keep reading",
    items: [
      {
        kind: "Tool",
        label: "Website cost calculator",
        href: "/tools/website-cost-calculator",
        desc: "Your year-one cost on Wix Studio or custom code, build plus hosting.",
        icon: "calculator",
      },
      {
        kind: "Comparison",
        label: "Wix Studio vs Shopify",
        href: "/compare/wix-studio-vs-shopify",
        desc: "When the store is the business, and when it sits alongside the site.",
        icon: "cart",
      },
      {
        kind: "Industry",
        label: "SaaS and AI websites",
        href: "/industries/saas",
        desc: "Product sites we've built on Wix Studio and in custom code.",
        icon: "code",
      },
      {
        kind: "Service",
        label: "Wix Studio development",
        href: "/services/wix-studio-development",
        desc: "Custom functionality inside Wix Studio, when you want the editor and the logic.",
        icon: "braces",
      },
    ],
  },
  sources: [
    { label: "Next.js: Redirects", href: "https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects", note: "Redirects defined in next.config.js.", checked },
    { label: "Next.js: Internationalization", href: "https://nextjs.org/docs/app/guides/internationalization", note: "Localized routing and rendering.", checked },
    { label: "Next.js: Upgrade guides", href: "https://nextjs.org/docs/app/guides/upgrading", note: "Version upgrade guides and codemods.", checked },
    { label: "Next.js on GitHub", href: "https://github.com/vercel/next.js", note: "The MIT licence.", checked },
    { label: "Vercel: Pricing", href: vercel.source.href, note: "Pro at US$20 a month with US$20 of usage credit; prices exclude tax.", checked },
    { label: "Sanity: Pricing", href: sanity.source.href, note: "Free up to 20 seats; Growth at US$15 per seat a month; self-serve plans bill monthly.", checked },
    { label: "Sanity Studio", href: "https://www.sanity.io/studio", note: "Content types defined in code.", checked },
    { label: "Wix Studio: plans and pricing", href: "https://www.wix.com/studio/plans", note: "Plan prices, collaborators and CMS items.", checked },
    { label: "Wix: 301 redirects", href: "https://support.wix.com/en/article/setting-up-a-301-redirect-for-a-page-on-your-site", note: "The Redirect Manager, and automatic redirects when a page's URL slug changes (not for blog posts).", checked: "2026-11-19" },
    { label: "Wix: Structured data markup", href: "https://support.wix.com/en/article/adding-structured-data-markup-to-your-sites-pages-2546962", note: "Up to five markups per page.", checked: "2026-11-19" },
    { label: "Wix: Your llms.txt file", href: "https://support.wix.com/en/article/understanding-your-sites-llms-txt-file", note: "Generated and maintained by Wix on upgraded plans.", checked: "2026-11-19" },
    { label: "Wix: AI Visibility Overview", href: "https://www.wix.com/press-room/home/post/wix-launches-ai-visibility-overview-with-full-generative-engine-optimization-support-for-ai-powered", note: "Tracking how often AI platforms cite a site.", checked: "2026-11-19" },
    { label: "Wix Multilingual", href: "https://www.wix.com/app-market/wix-multilingual", note: "Free to install.", checked: "2026-11-19" },
    { label: "Wix: The Code panel", href: "https://dev.wix.com/docs/develop-websites/articles/workspace-tools/velo-workspace/workspaces/wix-studio-working-with-the-code-panel", note: "Frontend code, the Wix IDE and GitHub.", checked: "2026-11-19" },
    { label: "Wix Studio: Security", href: "https://www.wix.com/studio/infrastructure/security", note: "Security with no setup or maintenance required.", checked: "2026-11-19" },
  ],
};
