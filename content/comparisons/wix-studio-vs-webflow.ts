import { PACKAGES } from "@/content/industries/proof";

import type { ComparisonContent } from "./types";
import { perMonthYearly, perYear, usd, webflow, wixStudio } from "./vendors";

/*
 * VERIFIED 19 Nov 2026 in a real browser (Chrome via Playwright): every
 * table row, figure and FAQ claim against the vendor's own page. After the
 * owner pushes: unpublish the Sanity post /blog/wix-studio-vs-webflow (its
 * URL 301s here).
 *
 * help.webflow.com shows a Cloudflare "verify you are not a bot" page to an
 * automated browser, so no claim rests on it. Each one moved to a Webflow
 * page that loads (webflow.com/pricing and its plan table, the blog and
 * updates posts, Webflow University) or was cut. Wix and the cost table were
 * checked on wix.com/studio/plans and support.wix.com.
 *
 * Confirmed: Editor unavailable from 4 August 2026 and the Content editor
 * role; plans merged into Premium on 13 May 2026 (20,000 items, 40
 * collections, no CMS on Basic); Ecommerce from US$29 billed yearly with
 * 500 items and a 2% fee; Limited seat US$15 billed yearly, one Full seat
 * included (so three in-house editors need two Limited seats); Agency
 * Workspace 3 free client seats per site; 301 redirects only on paid plans,
 * and they export as CSV; classes, flexbox, grid, GSAP; DevLink; code export
 * on paid Workspaces; Wix: automatic 301 on a slug change, five markups,
 * llms.txt on an upgraded plan with a custom domain, Multilingual free to
 * install, forms 4 and 25.
 *
 * Changed:
 *  - Localize: "from US$9 a month billed yearly for up to 3 languages" was
 *    wrong. It is US$9 a month per added locale, up to 3 on Essential.
 *  - Wix redirects: added "blog posts excepted" (Wix states the exception).
 *  - Sitemap "rebuilt on every publish" and schema "by hand or with Webflow
 *    AI" now read as the pricing table states them.
 *  - Integrations: "HTML, CSS and JS embeds" now "custom code and scripts".
 *
 * Cut (only on the help centre we couldn't load): the 5 October "fully
 * deprecated" date, "AI bots allowed by default", and the User Accounts
 * source (no claim on the page used it).
 */

const { studio } = PACKAGES;
const { plans } = wixStudio;
const wf = webflow.plans;
const checked = "2026-11-19";
const extraSeats = 2;

export const wixStudioVsWebflow: ComparisonContent = {
  slug: "wix-studio-vs-webflow",
  rival: {
    key: "webflow",
    name: "Webflow",
    weBuildOnIt: false,
    guide: {
      label: "Read the Webflow to Wix Studio guide",
      href: "/services/webflow-to-wix-studio",
    },
  },
  updated: "2026-11-19",
  checked,
  seo: {
    title: "Wix Studio vs Webflow in 2026: which to choose | Zenith Digital",
    description:
      "Wix Studio or Webflow? Who can edit the site after launch, what that access costs, and the 2026 Webflow changes, from each vendor's own pages.",
  },
  hero: {
    h1: "Wix Studio vs Webflow",
    shortAnswer:
      "Wix Studio if the people editing the site after launch aren't web specialists. Webflow if a trained team runs a large structured CMS and wants class-level design control.",
  },
  menuLabel: "vs Webflow",
  table: {
    heading: "Wix Studio and Webflow, side by side",
    intro:
      "Both build excellent sites. What separates them is the handover: who can safely change a page a year from now, and what giving them that access costs. Webflow changed its answer twice in 2026.",
    // Scorecard (table simplify brief, 20 Nov 2026). Each `detail` is the
    // verified sentence from before, unchanged; "Best for" also carries the
    // old "Speed to launch" sentences, which had no row of their own.
    // Interactions is new: Wix from support.wix.com "Studio Editor: About
    // Animations", Webflow from Webflow University (both read 20 Nov 2026).
    // Short cells kept within their sentences: Editors says "Paid seats", not
    // "1 seat included" (not in the sentence); Wix CMS says "up to 10
    // million" (the sentence cites Plus and Elite, not every plan); Webflow
    // redirects drop "Manual" (nothing verified says so).
    rows: [
      {
        criterion: "Best for",
        wix: { short: "Non-specialist editors" },
        rival: { short: "Trained teams, big structured CMS" },
        edge: "depends",
        detail: {
          wix: "Sites handed to people who aren't web specialists: owners, marketers, a client's team. A store, payments and multilingual come from Wix itself, so there's less to wire up at launch.",
          rival: "A trained team running a large structured CMS that wants class-level design control. Quick in a trained designer's hands; translation is a paid add-on and redirects need a paid plan.",
        },
      },
      {
        criterion: "Editors",
        wix: {
          short: `${plans.basic.collaborators} to ${plans.elite.collaborators} included, by plan`,
          tag: "included",
        },
        rival: { short: `Paid seats, from ${usd(webflow.seats.limited)} a month`, tag: "addon" },
        edge: "wix",
        detail: {
          wix: `Adding an editor is a permission, not a purchase: ${plans.basic.collaborators} to ${plans.elite.collaborators} collaborators are included, depending on the plan.`,
          rival: `Since the legacy Editor was retired in 2026, editors work on seats; a Limited seat is ${perMonthYearly(webflow.seats.limited)}.`,
        },
      },
      {
        criterion: "Design control",
        wix: { short: "Visual, every breakpoint", tag: "included" },
        rival: { short: "Class-based, close to CSS", tag: "included" },
        edge: "rival",
        detail: {
          wix: "Design at every breakpoint without learning a class system, with custom CSS when a layout needs it.",
          rival: "Class-based styling that maps closely to CSS, flexbox and grid layouts, and GSAP-powered interactions.",
        },
      },
      {
        criterion: "Interactions",
        wix: { short: "Built-in animations", tag: "included" },
        rival: { short: "GSAP-powered interactions", tag: "included" },
        edge: "rival",
        detail: {
          wix: "Entrance, hover, click, scroll and loop animations are built into the Studio Editor, set without code.",
          rival: "Multi-step interactions built on a visual timeline, powered by GSAP.",
        },
      },
      {
        criterion: "CMS",
        wix: { short: `Built in, up to ${plans.elite.cmsItems} items`, tag: "included" },
        rival: { short: `${wf.premium.name} plan, ${wf.premium.cmsItems} items`, tag: "addon" },
        edge: "wix",
        detail: {
          wix: `${plans.plus.cmsItems} items on ${plans.plus.name} and ${plans.elite.cmsItems} on ${plans.elite.name}, edited by the same collaborators as the pages.`,
          rival: `No CMS on ${wf.basic.name}; ${wf.premium.name} holds ${wf.premium.cmsItems} items across up to ${wf.premium.collections} collections.`,
        },
      },
      {
        criterion: "Redirects",
        wix: { short: "Automatic on page URL change", tag: "included" },
        rival: { short: "On paid plans", tag: "addon" },
        edge: "wix",
        detail: {
          wix: "A redirect is created for you when a page's URL changes (blog posts excepted), and you can add up to five structured data markups per page.",
          rival: "301 redirects on paid plans, an automatic XML sitemap, and structured data markup support.",
        },
      },
      {
        criterion: "AI search (llms.txt)",
        wix: { short: "Built in, kept current", tag: "included" },
        rival: { short: "Upload it yourself", tag: "yours" },
        edge: "wix",
        detail: {
          wix: "Wix keeps an llms.txt file current for you (upgraded plans with a custom domain), and tracks how often AI platforms cite the site.",
          rival: "Settings to allow or block AI bots, and llms.txt is a file you upload yourself.",
        },
      },
      {
        criterion: "Multilingual",
        wix: { short: "Free Wix app", tag: "included" },
        rival: {
          short: `Add-on, ${usd(webflow.localize.essentialPerLocale)} a month per language`,
          tag: "addon",
        },
        edge: "wix",
        detail: {
          wix: "Wix Multilingual is free to install, with a starting allowance of AI-translated words.",
          rival: `Localize is a paid add-on: ${usd(webflow.localize.essentialPerLocale)} a month for each added language, up to ${webflow.localize.essentialLocales} on Essential.`,
        },
      },
      {
        criterion: "E-commerce",
        wix: { short: `On the site plan, from ${wixStudio.paymentsFrom}`, tag: "included" },
        rival: {
          short: `Separate plan, from ${usd(webflow.ecommerce.standard)} a month`,
          tag: "addon",
        },
        edge: "wix",
        detail: {
          wix: `Payments run on the ordinary site plan from ${wixStudio.paymentsFrom}; there's no separate store plan.`,
          rival: `Separate Ecommerce plans, from ${perMonthYearly(webflow.ecommerce.standard)} for ${webflow.ecommerce.standardItems} items, with a 2% transaction fee on that tier.`,
        },
      },
      {
        criterion: "Code",
        wix: { short: "Wix IDE and GitHub", tag: "included" },
        rival: { short: "Custom code, React via DevLink, export", tag: "included" },
        edge: "rival",
        detail: {
          wix: "Apps from the Wix App Market, and frontend code you can manage through the Wix IDE or GitHub.",
          rival: "Custom code and scripts, an Apps marketplace, DevLink for React components, and code export on paid Workspaces.",
        },
      },
      {
        criterion: "Maintenance",
        wix: { short: "Managed", tag: "included" },
        rival: { short: "Managed", tag: "included" },
        edge: "even",
        detail: {
          wix: "Managed hosting and security on Wix's infrastructure, with nothing to install or patch.",
          rival: "Also managed: SSL on every site plan and automated patches, with no customer maintenance.",
        },
      },
      {
        criterion: "Running cost",
        wix: { short: "One plan covers the editors" },
        rival: { short: "Site plan plus seats" },
        edge: "wix",
        detail: {
          wix: "The plan covers the editors, so the cost grows with the site, not with the team.",
          rival: "The site plan, plus the Workspace plan, plus a seat for each extra editor.",
        },
      },
    ],
  },
  questions: {
    heading: "Five questions that decide it",
    intro: "The first one usually settles it. We call it the handover test.",
    // Two outcomes per question (brief, 20 Nov 2026). The old answers stay as
    // `detail` where they add a figure; questions 1 and 4 dropped theirs
    // because the two outcomes now say all of it.
    items: [
      {
        q: "Who will change the site a year from now?",
        wix: "owners, marketers or a client's team make the changes",
        rival: "a trained Webflow designer owns every change",
      },
      {
        q: "How much will you publish?",
        wix: `you'll go past ${wf.premium.cmsItems} CMS items`,
        rival: `${wf.premium.cmsItems} items and ${wf.premium.collections} collections are plenty`,
        detail: `Both run real CMS collections: Webflow ${wf.premium.name} holds ${wf.premium.cmsItems} items; Wix Studio scales from ${plans.basic.cmsItems} to ${plans.elite.cmsItems}.`,
      },
      {
        q: "Will you sell online?",
        wix: "you'll sell, with payments on the same site plan",
        rival: `a separate Ecommerce plan, from ${usd(webflow.ecommerce.standard)} a month, is fine`,
        detail: `Wix Studio takes payments from ${wixStudio.paymentsFrom}; Webflow needs a separate Ecommerce plan, from ${perMonthYearly(webflow.ecommerce.standard)}.`,
      },
      {
        q: "How custom does it need to be?",
        wix: "a polished site your team can edit is the goal",
        rival: "you need heavy interactions, daily design work or code export",
      },
      {
        q: "What do you want to pay to run it?",
        wix: "you want every editor included in the plan",
        rival: "a site plan plus a seat per editor fits the budget",
        detail: `Webflow's CMS starts at ${usd(wf.premium.perMonth)} on ${wf.premium.name}; Wix Studio ${plans.basic.name} includes one at ${usd(plans.basic.perMonth)}, editors included.`,
      },
    ],
  },
  choose: {
    heading: "So, which should you choose?",
    wix: {
      label: "Easiest handover",
      body: "Several non-specialists will publish, you want a store or more languages without add-ons, and adding an editor shouldn't add a bill.",
    },
    rival: {
      label: "Designer control",
      body: "A trained team owns every change, you want class-level design control and GSAP interactions, or exporting the code is a hard requirement.",
    },
    custom: {
      label: "Most flexible",
      body: "You need full design control and logic no platform offers, with content modelled once and used across channels.",
    },
  },
  cost: {
    heading: "What year one costs",
    setup:
      "A 15-page marketing site with a CMS-driven blog and three people editing it in-house.",
    rows: [
      {
        label: "Site plan",
        wix: `${plans.basic.name}, ${perMonthYearly(plans.basic.perMonth)}: ${perYear(plans.basic.perMonth)} for the year, CMS included.`,
        rival: `${wf.premium.name}, ${perMonthYearly(wf.premium.perMonth)}: ${perYear(wf.premium.perMonth)} for the year.`,
      },
      {
        label: "Two more editors",
        wix: `Included: ${plans.basic.collaborators} site collaborators on ${plans.basic.name}.`,
        rival: `Two Limited seats, ${perMonthYearly(webflow.seats.limited * extraSeats)}: ${perYear(webflow.seats.limited * extraSeats)} for the year.`,
      },
      {
        label: "Hosting and security",
        wix: "Included in the plan.",
        rival: "Included in the site plan.",
      },
      {
        label: "Build",
        wix: `${studio.name}, ${studio.price} with Zenith Digital.`,
        rival: "We don't build on Webflow: quotes vary by agency.",
      },
    ],
    note: "Webflow site plans sit on a Workspace, and seats belong to the Workspace; check what your Workspace plan includes before adding seats.",
  },
  proof: {
    heading: "Built on Wix Studio by Zenith Digital",
    // The strongest Wix Studio case studies, by the figure on each card
    // (owner, 19 Nov 2026): $521k in 7 months, then EUR 140k in course
    // sales, then a Series A raise. Bel'Istria stays out until its "top spot
    // in AI answers" claim is confirmed.
    picks: ["scottish-luxury-experience", "hunting-brook-gardens", "knode-ai"],
    rivalLine: "We don't build on Webflow. We move sites off it.",
  },
  faq: {
    heading: ["Wix Studio vs Webflow:", "your questions"],
    subhead: "Answered plainly, including where Webflow is the better choice.",
    items: [
      {
        q: "Is Wix Studio or Webflow better for SEO?",
        a: "Neither has a structural advantage: both cover metadata, redirects, sitemaps and schema. Webflow's redirects need a paid plan; Wix adds one when a page's URL changes.",
      },
      {
        q: "Which is easier for a marketing team to edit, Wix Studio or Webflow?",
        a: "Wix Studio, for most: collaborators edit visually and are included. Webflow's Content editors change text, images and Collection items, each on a seat.",
      },
      {
        q: "Is Webflow more expensive than Wix Studio?",
        a: `Usually, with a CMS: Webflow ${wf.premium.name} is ${perMonthYearly(wf.premium.perMonth)} against Wix Studio ${plans.basic.name} at ${usd(plans.basic.perMonth)}, plus Webflow's editor seats.`,
      },
      {
        q: "Can you move from Webflow to Wix Studio without losing rankings?",
        a: "Yes, when every URL keeps its address or gets a 301, and Webflow exports your redirect list. Google isn't ours to promise; the URL map, redirects and 30 days of monitoring are.",
      },
      {
        q: "Does Wix Studio have a CMS like Webflow's?",
        a: `Yes: collections and dynamic pages much like Webflow's Collections, from ${plans.basic.cmsItems} items on ${plans.basic.name}. Webflow's CMS starts on ${wf.premium.name}.`,
      },
      {
        q: "Is Webflow better for designers than Wix Studio?",
        a: "Often, for designers who think in CSS or build heavy interactions. Wix Studio gives breakpoints, a CSS grid and custom CSS without a class system, which suits mixed teams.",
      },
    ],
  },
  related: {
    heading: "Keep reading",
    items: [
      {
        kind: "Migration guide",
        label: "Webflow to Wix Studio",
        href: "/services/webflow-to-wix-studio",
        desc: "What exports as CSV, how the redirect list moves, and what to save before cancelling.",
        icon: "transfer",
      },
      {
        kind: "Article",
        label: "Wix vs Wix Studio",
        href: "/blog/wix-vs-wix-studio",
        desc: "Which of Wix's two editors this comparison is about, and why the difference matters.",
        icon: "layers",
      },
      {
        kind: "Article",
        label: "Wix Studio pricing",
        href: "/blog/wix-studio-pricing",
        desc: "What each Wix Studio plan includes, and what a build costs on top.",
        icon: "receipt",
      },
      {
        kind: "Case study",
        label: "Yacht Junky",
        href: "/case-studies/yacht-junky",
        desc: "A multi-seller marketplace with filtered search and enquiry routing, built natively on Wix Studio.",
        icon: "anchor",
      },
    ],
  },
  sources: [
    { label: "Webflow: Pricing", href: "https://webflow.com/pricing", note: "Site, Workspace, seat, Localize and Ecommerce prices, and each plan's CMS limits, redirects, sitemap, schema, crawler controls and code export.", checked },
    { label: "Webflow: Moving away from the legacy Editor", href: "https://webflow.com/blog/legacy-editor-deprecation", note: "The legacy Editor unavailable from 4 August 2026, and the seats and roles that replace it.", checked },
    { label: "Webflow: Client seats", href: "https://webflow.com/updates/client-seats", note: "What the Content editor role can change.", checked },
    { label: "Webflow: Simplified plans and updated pricing", href: "https://webflow.com/blog/simplified-plans-and-updated-pricing-2026", note: "CMS and Business merged into Premium on 13 May 2026.", checked },
    { label: "Webflow: 301 redirects with CSV support", href: "https://webflow.com/updates/301-redirect-management", note: "Redirects import and export as CSV.", checked },
    { label: "Webflow University: llms.txt and AEO", href: "https://university.webflow.com/videos/optimize-your-site-for-llms-with-llms-txt", note: "Creating and uploading an llms.txt file.", checked },
    { label: "Webflow University: Lay out and style your site", href: "https://university.webflow.com/courses/lay-out-style-your-site", note: "Class-based styling, flexbox and grid.", checked },
    { label: "Webflow University: Interactions and animations", href: "https://university.webflow.com/courses/interactions-animations", note: "Interactions powered by GSAP.", checked },
    { label: "Webflow: Apps", href: "https://webflow.com/apps", note: "The Apps marketplace.", checked },
    { label: "Webflow: DevLink", href: "https://developers.webflow.com/devlink/reference/overview", note: "Importing and exporting React components.", checked },
    { label: "Webflow: Hosting", href: "https://webflow.com/feature/hosting", note: "Managed hosting, SSL on every site plan.", checked },
    { label: "Webflow: Security", href: "https://webflow.com/security", note: "Automated patches with no customer maintenance.", checked },
    { label: "Wix Studio: plans and pricing", href: "https://www.wix.com/studio/plans", note: "Plan prices, collaborators, CMS items, and payments from Standard.", checked },
    { label: "Wix: 301 redirects", href: "https://support.wix.com/en/article/setting-up-a-301-redirect-for-a-page-on-your-site", note: "The Redirect Manager, and automatic redirects when a page's URL slug changes (not for blog posts).", checked },
    { label: "Wix: Studio Editor animations", href: "https://support.wix.com/en/article/studio-editor-about-animations", note: "Entrance, hover, click, scroll and loop animations, set without code.", checked: "2026-11-20" },
    { label: "Wix: Structured data markup", href: "https://support.wix.com/en/article/adding-structured-data-markup-to-your-sites-pages-2546962", note: "Up to five markups per page.", checked },
    { label: "Wix: Your llms.txt file", href: "https://support.wix.com/en/article/understanding-your-sites-llms-txt-file", note: "Generated and maintained by Wix on upgraded plans.", checked },
    { label: "Wix: AI Visibility Overview", href: "https://www.wix.com/press-room/home/post/wix-launches-ai-visibility-overview-with-full-generative-engine-optimization-support-for-ai-powered", note: "Tracking how often AI platforms cite a site.", checked },
    { label: "Wix Multilingual", href: "https://www.wix.com/app-market/wix-multilingual", note: "Free to install.", checked },
    { label: "Wix: Managing your team", href: "https://support.wix.com/en/article/wix-studio-managing-your-team", note: "Roles and permissions for collaborators.", checked },
    { label: "Wix: The Code panel", href: "https://dev.wix.com/docs/develop-websites/articles/workspace-tools/velo-workspace/workspaces/wix-studio-working-with-the-code-panel", note: "Frontend code, the Wix IDE and GitHub.", checked },
    { label: "Wix Studio: Security", href: "https://www.wix.com/studio/infrastructure/security", note: "Security with no setup or maintenance required.", checked },
  ],
};
