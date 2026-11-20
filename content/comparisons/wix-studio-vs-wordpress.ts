import { PACKAGES } from "@/content/industries/proof";

import type { ComparisonContent } from "./types";
import { perMonthYearly, perYear, usd, wixStudio, wordpressCom, wordpressOrg } from "./vendors";

/*
 * VERIFIED 19 Nov 2026 in a real browser (Chrome via Playwright): every
 * table row, figure and FAQ claim against the vendor's own page (the
 * `sources` below). The FAQ on rankings promises the work (URL map,
 * redirects, 30 days of monitoring), never the outcome.
 *
 * Confirmed: hosting and domain arranged yourself for self-hosted; the Site
 * Editor only with a block theme; custom post types; core XML sitemap (5.5)
 * and a robots.txt that points to it; no multilingual out of the box;
 * "over 79,000 free plugins"; six pre-defined roles, plugins installed only
 * by Administrators (Super Admin on Multisite); minor and security updates
 * automatic, major releases by "Update Now"; hosts not responsible for the
 * application; WooCommerce free to download; WordPress.com hosting from the
 * free plan up, plugins on every paid plan. Wix: 3 built-in breakpoints plus
 * up to 3, CSS grid, custom CSS, per-page titles, descriptions and slugs,
 * Redirect Manager, automatic sitemap, editable robots.txt and llms.txt
 * (upgraded plan, custom domain), Multilingual free to install, payments
 * from Standard, Code panel with the Wix IDE and GitHub, content mode for
 * clients, "no setup or maintenance required", blog importer (5,000 posts
 * a turn; author names, tags and comments not imported), 100 static pages.
 * Cost table: Wix Basic US$12 a month billed yearly; Plus as the step up
 * (forms 4 to 25, storage 10 GB to 120 GB, collaborators 3 to 10).
 *
 * Changed:
 *  - WordPress.com: US$4 to US$25 is the first-year price. The pricing page
 *    now prints renewals ("Auto-renews at" US$5 and US$28), so the cost row
 *    states both and the "check renewal" note is gone.
 *  - Wix Multilingual: "every language runs from the same site" isn't on
 *    the app page; now "translates the site in the editor, by hand or by
 *    machine", which is.
 *  - AI row: "WordPress documents no llms.txt or AI crawler setting" can't
 *    be shown from one page; now "check your host and plugins".
 *
 * Cut: nothing.
 */

const { studio } = PACKAGES;
const { plans } = wixStudio;
const checked = "2026-11-19";

export const wixStudioVsWordpress: ComparisonContent = {
  slug: "wix-studio-vs-wordpress",
  rival: {
    key: "wordpress",
    name: "WordPress",
    weBuildOnIt: false,
    guide: {
      label: "Read the WordPress to Wix Studio guide",
      href: "/services/wordpress-to-wix-studio",
    },
  },
  updated: "2026-11-19",
  checked,
  seo: {
    title: "Wix Studio vs WordPress in 2026: which to choose | Zenith Digital",
    description:
      "Wix Studio or WordPress? Editing, SEO, upkeep and cost side by side, from each vendor's own pages, including when WordPress is the better choice.",
  },
  hero: {
    h1: "Wix Studio vs WordPress",
    shortAnswer:
      "Wix Studio, Wix's platform for professional sites, if you want a fast, secure site your team edits without plugins or updates to manage. WordPress if you run a large editorial operation or depend on a plugin you can't replace.",
  },
  menuLabel: "vs WordPress",
  table: {
    heading: "Wix Studio and WordPress, side by side",
    intro:
      "Most comparisons argue about design. The bigger difference is who owns the upkeep: on a self-hosted WordPress site it's you, on Wix Studio it's the platform.",
    // Scorecard (table simplify brief, 20 Nov 2026). Each `detail` is the
    // row's verified sentence from before, unchanged. "Arrange your own"
    // became "Self-hosted: arrange your own": the sentence says WordPress.com
    // includes hosting, so the short cell can't say every WordPress site
    // needs its own.
    rows: [
      {
        criterion: "Best for",
        wix: { short: "Teams that want it handled" },
        rival: { short: "Big editorial teams, plugin-led sites" },
        edge: "depends",
        detail: {
          wix: "Businesses whose own team updates the site and wants hosting, security and updates handled.",
          rival: "Large editorial teams, and sites built around a plugin they can't do without.",
        },
      },
      {
        criterion: "Hosting",
        wix: { short: "Included in the plan", tag: "included" },
        rival: { short: "Self-hosted: arrange your own", tag: "yours" },
        edge: "wix",
        detail: {
          wix: "Hosting and the editor come with the plan, so the build is the only lead time.",
          rival: "Self-hosting means arranging hosting and a domain first; WordPress.com includes hosting on every plan.",
        },
      },
      {
        criterion: "Security and updates",
        wix: { short: "Handled by Wix", tag: "included" },
        rival: { short: "Major updates and plugins on you", tag: "yours" },
        edge: "wix",
        detail: {
          wix: "Wix runs the hosting and security, with no setup or maintenance on your side.",
          rival: "Minor updates install themselves; major releases, themes, plugins and the site's security are yours to look after.",
        },
      },
      {
        criterion: "Design freedom",
        wix: { short: "Visual, custom breakpoints and CSS", tag: "included" },
        rival: { short: "Depends on your theme" },
        edge: "even",
        detail: {
          wix: "Three built-in breakpoints plus up to three of your own, an advanced CSS grid and custom CSS.",
          rival: "Set by your theme: the Site Editor designs the whole site visually, but only with a block theme.",
        },
      },
      {
        criterion: "CMS",
        wix: {
          short: `Built in, ${plans.basic.cmsItems} to ${plans.elite.cmsItems} items`,
          tag: "included",
        },
        rival: { short: "Posts, pages, custom types", tag: "included" },
        edge: "even",
        detail: {
          wix: `Collections and dynamic pages, from ${plans.basic.cmsItems} items on ${plans.basic.name} to ${plans.elite.cmsItems} on ${plans.elite.name}.`,
          rival: "Posts and pages, plus custom post types for any other kind of content.",
        },
      },
      {
        criterion: "SEO basics",
        wix: { short: "Meta, redirects, sitemap built in", tag: "included" },
        rival: { short: "Sitemap built in, rest via plugins", tag: "addon" },
        edge: "wix",
        detail: {
          wix: "Titles, descriptions and URLs per page, a 301 redirect manager and an automatic sitemap, all built in.",
          rival: "Core makes an XML sitemap and a robots.txt; check what your theme and plugins add for meta descriptions and redirects.",
        },
      },
      {
        criterion: "AI search (llms.txt)",
        wix: { short: "Built in, editable", tag: "included" },
        rival: { short: "Via your host or a plugin", tag: "addon" },
        edge: "wix",
        detail: {
          wix: "Wix writes and maintains an llms.txt file you can edit (on an upgraded plan with your own domain), and robots.txt is editable.",
          rival: "Core serves a default robots.txt that points to the sitemap; for llms.txt or AI crawler rules, check your host and plugins.",
        },
      },
      {
        criterion: "Multilingual",
        wix: { short: "Free Wix app", tag: "included" },
        rival: { short: "Needs a plugin", tag: "addon" },
        edge: "wix",
        detail: {
          wix: "Wix Multilingual is free to install and translates the site in the editor, by hand or by machine.",
          rival: "Core doesn't support a multilingual site out of the box, so a plugin adds it.",
        },
      },
      {
        criterion: "E-commerce",
        wix: { short: `Built in, from ${wixStudio.paymentsFrom}`, tag: "included" },
        rival: { short: "WooCommerce, free plugin", tag: "addon" },
        edge: "even",
        detail: {
          wix: `A store and online payments are built in, with payments from the ${wixStudio.paymentsFrom} plan.`,
          rival: "WooCommerce is free to download; hosting, extensions and a payment provider are set up around it.",
        },
      },
      {
        criterion: "Plugins and apps",
        wix: { short: "Wix App Market plus code" },
        rival: { short: `${wordpressOrg.plugins}+ free plugins`, tag: "included" },
        edge: "rival",
        detail: {
          wix: "The Wix App Market, plus your own code and CSS in the Code panel, the Wix IDE or GitHub.",
          rival: `Over ${wordpressOrg.plugins} free plugins in the official directory, and full code access on a self-hosted site.`,
        },
      },
      {
        criterion: "Editors and roles",
        wix: {
          short: `${plans.basic.collaborators} to ${plans.elite.collaborators} collaborators, by plan`,
          tag: "included",
        },
        rival: { short: "6 built-in roles", tag: "included" },
        edge: "even",
        detail: {
          wix: `Collaborators come with the plan (${plans.basic.collaborators} on ${plans.basic.name}, ${plans.plus.collaborators} on ${plans.plus.name}), and a client can be kept to content mode.`,
          rival: "Six built-in roles, from Super Admin to Subscriber; installing and managing plugins is an Administrator's job.",
        },
      },
      {
        criterion: "Running cost",
        wix: { short: `From ${usd(plans.basic.perMonth)} a month, billed yearly` },
        rival: { short: "Free software, plus hosting and plugins" },
        edge: "depends",
        detail: {
          wix: `One plan per site, from ${perMonthYearly(plans.basic.perMonth)}, with any paid apps on top.`,
          rival: "The software is free; hosting, premium plugins and the hours spent maintaining them are the running costs, and they vary.",
        },
      },
    ],
  },
  questions: {
    heading: "Five questions that decide it",
    intro: "Answer these honestly and the choice usually makes itself.",
    // Two outcomes per question (brief, 20 Nov 2026). The old answers stay as
    // `detail` where they add a fact; questions 1, 4 and 5 dropped theirs
    // because the two outcomes now say all of it.
    items: [
      {
        q: "Who will edit the site day to day?",
        wix: "your own team edits visually, without a developer",
        rival: "authors and editors need roles and an approval flow",
      },
      {
        q: "How much will you publish?",
        wix: "it's a business site with a blog and collections",
        rival: "you publish at newsroom scale, every day",
        detail: `Newsroom-scale publishing suits WordPress; a Wix site holds ${wixStudio.staticPageLimit} static pages, plus its collections.`,
      },
      {
        q: "Will you sell online?",
        wix: "you want a store with no extra software to maintain",
        rival: "you already run WooCommerce and want to keep it",
        detail: `Wix Studio takes payments from ${wixStudio.paymentsFrom}; WooCommerce adds plugins and updates to maintain.`,
      },
      {
        q: "How custom does it need to be?",
        wix: "built-in features and the App Market cover what you need",
        rival: "a plugin with no Wix equivalent runs part of the business",
      },
      {
        q: "What do you want to pay to run it?",
        wix: "you want one predictable plan per site",
        rival: "free software suits you and someone handles hosting and upkeep",
      },
    ],
  },
  choose: {
    heading: "So, which should you choose?",
    wix: {
      label: "Least upkeep",
      body: "Your team edits the site itself, you want no hosting or plugin maintenance, and you'd like a store without extra software to look after.",
    },
    rival: {
      label: "Editorial depth",
      body: "You publish at volume with several authors, already have a developer, or run on a plugin that nothing else replaces.",
    },
    custom: {
      label: "No platform limits",
      body: "The site is closer to a product than a brochure: custom logic, an app-like interface, or content reused across several channels.",
    },
  },
  cost: {
    heading: "What year one costs",
    setup:
      "A 10-page business site with a blog and three people editing it.",
    rows: [
      {
        label: "Platform plan",
        wix: `${plans.basic.name}, ${perMonthYearly(plans.basic.perMonth)}: ${perYear(plans.basic.perMonth)} for the year.`,
        // Short cell (owner, 20 Nov 2026: less text); the renewal rates are in the note.
        rival: `Free software; hosting varies by host. WordPress.com: ${usd(wordpressCom.personal.perMonth)} to ${usd(wordpressCom.business.perMonth)} a month, billed yearly.`,
      },
      {
        label: "Hosting, security and updates",
        wix: "Included in the plan.",
        rival: "Varies: your host, plus whoever keeps it updated.",
      },
      {
        label: "Editors",
        wix: `${plans.basic.collaborators} site collaborators included on ${plans.basic.name}.`,
        rival: "No per-user charge in the software.",
      },
      {
        label: "Build",
        wix: `${studio.name}, ${studio.price} with Zenith Digital.`,
        rival: "We don't build on WordPress: quotes vary by agency.",
      },
    ],
    note: `WordPress.com prices are for year one (${wordpressCom.personal.name} to ${wordpressCom.business.name}) and renew at ${usd(wordpressCom.personal.renews)} to ${usd(wordpressCom.business.renews)} a month. It includes hosting on every plan, the free one too, and allows plugins on every paid plan.`,
  },
  proof: {
    heading: "Built on Wix Studio by Zenith Digital",
    // The strongest Wix Studio case studies, by the figure on each card
    // (owner, 19 Nov 2026): $521k in 7 months, then EUR 140k in course
    // sales, then a Series A raise. Bel'Istria stays out until its "top spot
    // in AI answers" claim is confirmed.
    picks: ["scottish-luxury-experience", "hunting-brook-gardens", "knode-ai"],
    rivalLine: "We don't build on WordPress. We move sites off it.",
  },
  faq: {
    heading: ["Wix Studio vs WordPress:", "your questions"],
    subhead: "Answered plainly, including where WordPress is the better choice.",
    items: [
      {
        q: "Is Wix Studio better than WordPress for SEO?",
        a: "Neither has a built-in ranking advantage. Wix Studio keeps titles, redirects and the sitemap in the editor; WordPress relies more on its theme and plugins.",
      },
      {
        q: "Can I move from WordPress to Wix without losing rankings?",
        a: "Yes, if every changed URL gets a 301 redirect. Nobody can guarantee rankings, so we guarantee the work: a URL map, redirects and 30 days of monitoring.",
      },
      {
        q: "Which costs less to run, Wix Studio or WordPress?",
        a: `WordPress's software is free, but hosting, plugins and maintenance vary; Wix Studio is one plan per site, from ${perMonthYearly(plans.basic.perMonth)}.`,
      },
      {
        q: "Can I keep my blog posts moving from WordPress to Wix Studio?",
        a: "Yes. Wix's Blog app imports up to 5,000 WordPress posts at a time, though tags, author names and comments don't come across.",
      },
      {
        q: "What happens to my WordPress plugins on Wix?",
        a: "They don't. Each becomes a built-in Wix feature, a Wix App Market app or custom code, so list yours before deciding.",
      },
      {
        q: "Is WordPress or Wix better for a small business?",
        a: "Wix Studio, for most small businesses whose own team updates the site; WordPress, if you have a developer or a plugin you can't replace.",
      },
    ],
  },
  related: {
    heading: "Keep reading",
    items: [
      {
        kind: "Migration guide",
        label: "WordPress to Wix Studio",
        href: "/services/wordpress-to-wix-studio",
        desc: "What imports, what gets rebuilt, and how the URLs and rankings are carried across.",
        icon: "transfer",
      },
      {
        kind: "Article",
        label: "Is Wix Studio good for SEO?",
        href: "/blog/is-wix-studio-good-for-seo",
        desc: "What the platform controls, what it doesn't, and where rankings actually come from.",
        icon: "search",
      },
      {
        kind: "Article",
        label: "Wix vs Wix Studio",
        href: "/blog/wix-vs-wix-studio",
        desc: "If you're coming from WordPress, which of Wix's two editors you'd actually be moving to.",
        icon: "layers",
      },
      {
        kind: "Service",
        label: "Wix Studio website design",
        href: "/services/wix-studio-website-design",
        desc: "How a build runs with us, at a fixed price and a fixed launch date.",
        icon: "palette",
      },
    ],
  },
  sources: [
    { label: "Wix Studio: plans and pricing", href: "https://www.wix.com/studio/plans", note: "Plan prices, collaborators, CMS items, and payments from Standard.", checked },
    { label: "Wix: About dynamic pages", href: "https://support.wix.com/en/article/cms-about-dynamic-pages", note: "Dynamic pages, and the limit of 100 static pages per site.", checked },
    { label: "Wix: Studio Editor breakpoints", href: "https://support.wix.com/en/article/studio-editor-designing-across-breakpoints", note: "Three built-in breakpoints and up to three more.", checked },
    { label: "Wix: Advanced CSS grid", href: "https://support.wix.com/en/article/studio-editor-working-with-an-advanced-css-grid", note: "Grid layouts in the Studio Editor.", checked },
    { label: "Wix: Custom CSS", href: "https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/frontend-code/custom-css/apply-custom-css-styling", note: "Adding global CSS to a site.", checked },
    { label: "Wix: Page SEO settings", href: "https://support.wix.com/en/article/customizing-your-pages-seo-settings-in-the-seo-panel", note: "Title tags, meta descriptions and URL slugs per page.", checked },
    { label: "Wix: 301 redirects", href: "https://support.wix.com/en/article/setting-up-a-301-redirect-for-a-page-on-your-site", note: "The URL Redirect Manager, and automatic redirects when a page's URL slug changes.", checked },
    { label: "Wix: Your sitemap", href: "https://support.wix.com/en/article/understanding-your-sites-sitemap-file", note: "The sitemap updates automatically.", checked },
    { label: "Wix: Editing robots.txt", href: "https://support.wix.com/en/article/editing-your-sites-robotstxt-file", note: "The robots.txt editor.", checked },
    { label: "Wix: Your llms.txt file", href: "https://support.wix.com/en/article/understanding-your-sites-llms-txt-file", note: "Generated automatically and editable, on an upgraded plan with a custom domain.", checked },
    { label: "Wix Multilingual", href: "https://www.wix.com/app-market/wix-multilingual", note: "Free to install; translate by hand or by machine.", checked },
    { label: "Wix: The Code panel", href: "https://dev.wix.com/docs/develop-websites/articles/workspace-tools/velo-workspace/workspaces/wix-studio-working-with-the-code-panel", note: "Frontend code and CSS, the Wix IDE and GitHub.", checked },
    { label: "Wix: Inviting a client to a site", href: "https://support.wix.com/en/article/wix-studio-inviting-a-client-to-join-a-site", note: "Content mode for clients.", checked },
    { label: "Wix Studio: Security", href: "https://www.wix.com/studio/infrastructure/security", note: "Security with no setup or maintenance required.", checked },
    { label: "Wix Blog: Importing posts from WordPress", href: "https://support.wix.com/en/article/wix-blog-importing-blog-posts-from-wordpress-to-the-wix-blog", note: "What the importer brings across and what it leaves behind.", checked },
    { label: "WordPress: Download", href: "https://wordpress.org/download/", note: "Free software; you arrange your own hosting and domain.", checked },
    { label: "WordPress: Site Editor", href: "https://wordpress.org/documentation/article/site-editor/", note: "Full-site visual design, available only with a block theme.", checked },
    { label: "WordPress: Post types", href: "https://developer.wordpress.org/themes/basics/post-types/", note: "Posts, pages and custom post types.", checked },
    { label: "WordPress: XML sitemaps in 5.5", href: "https://make.wordpress.org/core/2020/07/22/new-xml-sitemaps-functionality-in-wordpress-5-5/", note: "Core sitemaps since version 5.5, referenced from robots.txt.", checked },
    { label: "WordPress: Multilingual", href: "https://developer.wordpress.org/advanced-administration/wordpress/multilingual/", note: "No multilingual support out of the box.", checked },
    { label: "WordPress: Plugins directory", href: "https://wordpress.org/plugins/", note: "The number of free plugins.", checked },
    { label: "WordPress: Roles and capabilities", href: "https://wordpress.org/documentation/article/roles-and-capabilities/", note: "The six built-in roles, and who can install plugins.", checked },
    { label: "WordPress: Updating WordPress", href: "https://wordpress.org/documentation/article/updating-wordpress/", note: "Automatic minor updates; major releases are updated by hand.", checked },
    { label: "WordPress: Hardening", href: "https://developer.wordpress.org/advanced-administration/security/hardening/", note: "Hosts aren't responsible for the application you install.", checked },
    { label: "WooCommerce: Pricing", href: "https://woocommerce.com/pricing/", note: "Free to download; hosting and extensions are separate.", checked },
    { label: "WordPress.com: Pricing", href: "https://wordpress.com/pricing/", note: "First-year and renewal prices, hosting on every plan, plugins on every paid plan.", checked },
  ],
};
