import type { CtaLink } from "@/lib/types";
import type { ServicePageContent } from "./types";

/**
 * /services/custom-website-development (drafted and published 25 Nov 2026)
 * Targets: custom website development · custom coded website · custom
 * website development agency · next.js development agency · sanity cms
 * agency · move off wix to custom code.
 *
 * References (structure only): flowninja.com/astro-development-agency,
 * designme.agency/services/astro-development,
 * broworks.net/services/vibe-coding-service.
 *
 * The wedge: we build on Wix Studio, Shopify and custom code at the same
 * prices, so this page can say plainly when custom code is the wrong
 * choice. Sanity is covered here as how the team edits the site, not as a
 * page of its own (owner, 25 Nov 2026).
 *
 * Proof is the projects already tagged nextjs/astro in case-studies.ts:
 * Genroks AI, Highland Fling, Pressure Test Scotland, Bianomics, Techtonnik,
 * and this site. Emma Jordan joins at launch (January 2027).
 * Vendor facts checked 25 Nov 2026 and linked in `tradeoffs`:
 * Vercel Hobby is personal / non-commercial only (Terms, section 4); Pro is
 * $20 per developer seat a month with $20 of usage credit; Sanity Free has
 * 20 seats, Growth is $15 per seat a month with pay-as-you-go overage.
 *
 * Confirmed by owner (25 Nov 2026): hosting is either on Zenith Digital's
 * servers or on an account opened in the client's name; Bianomics edits in
 * Sanity Studio; Highland Fling gets Sanity soon, so the editing copy holds.
 *
 * Rewritten 25 Nov 2026 after the owner's review against Flow Ninja and
 * DesignMe: outcome-led hero with the price as the hook, three named buyer
 * types, one honest section (unique + tradeoffs), no stakes block, and a
 * positive close. Layout follow-ups for impeccable are in
 * custom-website-development-brief-v2.md.
 *
 * OWNER, optional: whoFor uses static cards; animated scenes need new
 * WhoForAnim entries.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  { label: "Free website audit", href: "/free-website-audit", variant: "secondary" },
];

export const customWebsiteDevelopment: ServicePageContent = {
  slug: "custom-website-development",
  publish: true,
  seo: {
    title: "Custom Website Development | Next.js & Sanity | Zenith Digital",
    description:
      "Custom-coded websites in Next.js and Sanity that load fast, rank and are yours to keep. From €1,250 fixed, the same price as our Wix Studio builds.",
  },

  hero: {
    name: "Custom website development",
    h1: "Custom-coded websites that load fast, rank, and are yours to keep",
    subhead:
      "Next.js and Sanity from €1,250, the same fixed price as our Wix Studio builds. Your team edits the content, you own the code, and it's live in 2 to 5 weeks.",
    chips: ["From €1,250, fixed", "Live in 2 to 5 weeks", "Code you own"],
    ctas,
  },

  whoFor: {
    heading: "Who we build custom-coded sites for",
    intro:
      "Three kinds of team keep coming to us for custom code.",
    items: [
      {
        title: "B2B and SaaS teams whose site has to sell",
        body: "The product has moved on and the site still looks like the first version. Genroks rebuilt in custom code and has closed 10+ ISO certification deals since launch; Bianomics runs its client sites through the same setup.",
        card: {
          label: "The site's job",
          value: "Win deals",
          valueNote: "As credible as the product it sells",
          rows: [
            { text: "Site behind the product's quality", state: "bad" },
            { text: "Same content needed on many pages", state: "warn" },
            { text: "A clear offer worth showing off", state: "good" },
          ],
        },
      },
      {
        title: "Service businesses that live on search",
        body: "A page for every service, quotes and bookings taken online, and every URL kept when the old site goes. Pressure Test Scotland's quote requests land in Supabase; Highland Fling moved off a hard-to-run WordPress template without losing a URL.",
        card: {
          label: "Where leads come from",
          value: "Search",
          valueNote: "Every service needs a page that ranks",
          rows: [
            { text: "Template slows down every change", state: "bad" },
            { text: "Enquiries arrive by email only", state: "warn" },
            { text: "Rankings worth protecting", state: "good" },
          ],
        },
      },
      {
        title: "Teams building with AI agents",
        body: "A codebase your developers or an AI coding agent can change directly, with no platform deciding what's possible. Techtonnik moved off Wix Studio for exactly that, in a week, without losing a URL.",
        card: {
          label: "Ownership",
          value: "Locked in",
          valueNote: "The platform decides what's possible",
          rows: [
            { text: "Features wait for the platform's roadmap", state: "bad" },
            { text: "Changes go through one editor", state: "warn" },
            { text: "The team knows what it wants to build", state: "good" },
          ],
        },
      },
    ],
  },

  // Heading override and platform layout land with brief v2 (workHeading,
  // layout: "platform"); added to the type by impeccable.
  workSlugs: ["genroks-ai", "highland-fling", "pressure-test-scotland", "bianomics"],



  outcomes: {
    heading: "What a custom-coded site does for you",
    items: [
      {
        title: "Fast pages that rank and get cited",
        body: "Every page is served as plain, fast HTML with structured data, readable by Google and AI search without waiting on scripts. This site is built exactly this way.",
        image: "/case-studies/genroks-ai/card.webp",
        imageAlt: "The Genroks AI website",
      },
      {
        title: "Your team still edits the content",
        body: "Sanity gives editors a Studio set up around how they publish: pages, posts, case studies and settings, without touching code. Bianomics edits its site in Sanity Studio.",
        image: "/case-studies/bianomics/card.webp",
        imageAlt: "The Bianomics website",
      },
      {
        title: "Features without a platform ceiling",
        body: "The integration, the page type or the tool you need gets built rather than worked around. Genroks rebuilt in custom code and has closed 10+ ISO deals since launch.",
        image: "/case-studies/highland-fling/card.webp",
        imageAlt: "The Highland Fling website",
      },
      {
        title: "Yours to keep, ready for AI agents",
        body: "The code and the content are yours, whether we host the site or it runs on an account in your name, and any developer or AI coding agent can work on it. Nothing stops working if we part ways.",
        image: "/case-studies/techtonnik/card.webp",
        imageAlt: "The Techtonnik website",
      },
    ],
  },

  included: {
    heading: "What a custom build includes",
    intro:
      "Every build is scoped to the brief, so the list varies. This is what it's drawn from.",
    items: [
      {
        icon: "code",
        title: "Next.js build",
        group: "Build",
        body: "Pages rendered ahead of time where they can be and on request where they must be, so the site is fast and every page is readable by Google and AI search. Astro where a lighter site suits it better.",
      },
      {
        icon: "layers",
        title: "Sanity CMS and Studio",
        group: "Editing",
        body: "Content modelled once and used everywhere: a service, a case study or a testimonial written in one place and shown on every page that needs it. The Studio is set up around how your team publishes.",
      },
      {
        icon: "plug",
        title: "Integrations and data",
        group: "Build",
        body: "Forms that store submissions in a database, your CRM or project tools connected by API, payments and bookings wired in. Pressure Test Scotland's quote requests are stored in Supabase as well as emailed.",
      },
      {
        icon: "search",
        title: "SEO and AI search groundwork",
        group: "Launch",
        body: "Titles, descriptions, structured data, a sitemap and an llms.txt file written for the pages you have, not left as defaults. The same groundwork this site runs on.",
      },
      {
        icon: "redirect",
        title: "Migration and redirects",
        group: "Launch",
        body: "Moving from Wix, WordPress or anything else: every old URL mapped and redirected, and Search Console watched for 30 days after launch.",
      },
      {
        icon: "server",
        title: "Hosting, ours or yours",
        group: "Launch",
        body: "The site runs on our servers, or on a hosting account we open in your name, whichever suits you. Either way the domain is connected and every change gets a preview link first.",
      },
      {
        icon: "support",
        title: "Handover and 30 days of support",
        group: "Editing",
        body: "A recorded walkthrough of the Studio, a note on what's content and what's code, and 30 days of support after launch.",
      },
    ],
  },

  process: {
    heading: "How a custom build runs",
    intro:
      "A fixed price and a launch date before work starts, then a site you can click through while it's being built.",
    image: "/case-studies/pressure-test-scotland/hero.webp",
    imageAlt: "The Pressure Test Scotland website, a custom Next.js build",
    cta: { label: "Book a call", href: "/book-a-call", variant: "primary" },
    steps: [
      {
        title: "Platform call",
        focus: ["What the site has to do", "Wix Studio, Shopify or code", "Honest verdict"],
        duration: "Day 1",
        body: "Twenty minutes on what the site needs to do, ending with the right platform for it and a price range you can plan around.",
      },
      {
        title: "Proposal",
        focus: ["Fixed price", "Launch date", "Named limits"],
        duration: "2 to 3 days",
        body: "What gets built, on what, for how much, by when, and what it won't do. Agreed in writing before any work starts.",
      },
      {
        title: "Content model and design",
        focus: ["Sanity schema", "Page designs", "Copy"],
        duration: "Week 1 to 2",
        body: "What your content is, and how editors will work with it, comes first, because a site built on the wrong model is a rebuild later. Designs follow on that structure.",
      },
      {
        title: "Build",
        focus: ["Next.js", "Integrations", "Preview links"],
        duration: "Weeks 2 to 4",
        body: "Built on preview links you can click through, not screenshots. Forms, integrations and edge cases tested with real data.",
      },
      {
        title: "Launch and handover",
        focus: ["Redirects", "Search Console", "Studio walkthrough"],
        duration: "Launch week",
        body: "Deployed to the hosting we agreed, redirects live, Search Console watched, and a recorded walkthrough of everything your team controls.",
      },
    ],
  },

  pricing: {
    heading: "What a custom website costs",
    from: "From €1,250",
    fromNote: "fixed, one-time",
    note: "The same packages as our Wix Studio and Shopify builds: from €1,250 for up to 5 pages, €2,350 for up to 12 pages with a CMS, integrations and copy. Hosting runs on our servers or on an account in your name, and any paid services are billed to you directly.",
    pullQuote:
      "Custom code isn't priced as a premium here. The price follows the scope, so a 5-page Next.js site costs what a 5-page Wix Studio site does.",
    drivers: [
      {
        title: "How many page types",
        body: "Ten pages built from three templates is quicker than ten one-off pages. The content model sets most of the timeline.",
      },
      {
        title: "What it connects to",
        body: "A form that emails you is simple. Submissions stored in a database and synced with a CRM is more work, and the proposal says so.",
      },
      {
        title: "Whether there's a site to move",
        body: "A migration adds the URL inventory, redirects and 30 days of monitoring, priced in the same proposal.",
      },
    ],
    cta: { label: "Get a fixed price", href: "/book-a-call", variant: "primary" },
    ctaSecondary: { label: "See all pricing", href: "/pricing", variant: "secondary" },
  },

  unique: {
    kind: "comparison",
    heading: "Is custom code right for you?",
    intro:
      "We build on Wix Studio, Shopify and custom code at the same prices, so this is the honest version of when each one wins.",
    columns: [
      {
        name: "Wix Studio",
        icon: "palette",
        note: "Best when your team wants to edit visually",
        points: [
          { text: "Visual editor for every page", mark: "good" },
          { text: "Hosting, security and updates handled", mark: "good" },
          { text: "Custom logic within the platform's limits", mark: "mixed" },
          { text: "You don't own the code", mark: "bad" },
        ],
      },
      {
        name: "Shopify",
        icon: "cart",
        note: "Best when selling products is the business",
        points: [
          { text: "Checkout, payments and stock built in", mark: "good" },
          { text: "Apps for almost any store feature", mark: "good" },
          { text: "Apps add monthly costs", mark: "mixed" },
          { text: "Content-heavy pages fight the theme", mark: "bad" },
        ],
      },
      {
        name: "Custom code",
        icon: "code",
        badge: "This page",
        note: "Best when the site behaves like a product",
        points: [
          { text: "No platform ceiling on features", mark: "good" },
          { text: "Code and content you own", mark: "good" },
          { text: "Editors work in Sanity, not on the page", mark: "mixed" },
          { text: "Layout changes need a developer", mark: "bad" },
        ],
      },
    ],
    footnote: {
      title: "Not sure which one you are?",
      body: "That's what the first call is for. The full comparison is on the Wix Studio vs custom code page.",
    },
  },

  tradeoffs: {
    heading: "Worth knowing before you choose",
    intro:
      "Three things custom code asks of you, so you decide with them in view.",
    items: [
      {
        title: "No visual page editor",
        body: "Editors change content in Sanity Studio, not by dragging blocks on the page. New layouts and new page types are developer work.",
        source: { label: "Sanity: Studio documentation", href: "https://www.sanity.io/docs/studio" },
      },
      {
        title: "Hosting is a separate cost",
        body: "A custom site needs hosting, either with us or on your own account. On your own Vercel account that means a paid plan: the free Hobby plan is for personal, non-commercial use only, and Pro is $20 a month per developer seat with $20 of usage included.",
        source: { label: "Vercel: pricing and terms", href: "https://vercel.com/pricing" },
      },
      {
        title: "The CMS can have its own costs",
        body: "Sanity's free plan covers up to 20 users, which suits most businesses. Larger teams move to Growth at $15 per user a month, with extra usage billed as you go.",
        source: { label: "Sanity: pricing", href: "https://www.sanity.io/pricing" },
      },
    ],
    promise: {
      title: "We'll say when it's the wrong choice",
      body: "If Wix Studio or Shopify would do the job with less upkeep, that's what we'll recommend, at the same price.",
    },
  },

  faq: {
    heading: ["Custom website development,", "answered plainly"],
    subhead: "The questions that come up before anyone commits to code.",
    ctas,
    items: [
      {
        q: "What is a custom-coded website?",
        a: "A custom-coded website is built from code rather than in a website builder like Wix or Squarespace. We build them in Next.js, with Sanity as the place your team edits content. You own the code and choose where it's hosted, and there's no platform deciding what the site can do.",
      },
      {
        q: "How much does a custom website cost with Zenith Digital?",
        a: "The same as our Wix Studio and Shopify builds: from €1,250 for up to 5 pages and €2,350 for up to 12 pages with a CMS, integrations and copy. Larger builds are quoted on a call. Hosting is either with us or on an account in your name, and paid services, such as a Sanity paid plan, are billed to you directly.",
      },
      {
        q: "When is custom code the right choice, and when isn't it?",
        a: "Custom code suits sites that behave like products: data in a database, connected tools, content reused across pages, or features a builder can't do. It isn't the right choice when your team wants to rearrange pages visually, or when selling products is the business, which is what Wix Studio and Shopify are for.",
      },
      {
        q: "Can my team edit a custom website without a developer?",
        a: "Yes, through Sanity Studio: text, images, pages built from existing templates, blog posts, case studies and settings. What needs a developer is new layouts and new types of page. The handover says exactly which is which.",
      },
      {
        q: "Should I build on Next.js or Wix Studio?",
        a: "Wix Studio if your team wants a visual editor and no hosting to think about. Next.js if the site needs logic, data or integrations Wix can't carry, or you want to own the code. We build both at the same price, so the answer follows the brief.",
      },
      {
        q: "Can you move my Wix or WordPress site to custom code without losing rankings?",
        a: "Yes. Every old URL is mapped and redirected, titles and descriptions carry across, and Search Console is watched for 30 days after launch. Techtonnik moved from Wix Studio to Astro in a week, and Highland Fling from a WordPress template to Next.js, both keeping every URL.",
      },
      {
        q: "Is a custom-coded site good for SEO and AI search?",
        a: "It can be better than a builder, because every page is rendered as plain, fast HTML with structured data and nothing a crawler has to wait for. It's only as good as the groundwork, though: titles, descriptions, internal links and an llms.txt file are written for the site, not left as defaults.",
      },
      {
        q: "Can AI coding agents work on our site?",
        a: "Yes. A Next.js or Astro site is a normal code repository, so tools like Claude Code can make changes your developer reviews. That was the reason Techtonnik moved off Wix Studio.",
      },
      {
        q: "Where is a custom website hosted, and what does it cost?",
        a: "Either on our servers, or on a hosting account we open in your name, usually Vercel. On your own Vercel account a business site needs a paid plan: the free Hobby plan is for personal, non-commercial use, and Pro is $20 a month per developer seat with $20 of usage included.",
      },
      {
        q: "What has Zenith Digital built in custom code?",
        a: "Genroks AI, an ISO certification software company; Bianomics, a consulting firm, and its clients' sites; Highland Fling, a bungee and zip line operator; Pressure Test Scotland, a water mains testing company; Techtonnik, moved from Wix Studio to Astro; and this website, which is Next.js with Sanity.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The code and the content in your Sanity project are yours, whether the site is hosted by us or on an account in your name. Nothing stops working if we stop working together.",
      },
    ],
  },

  related: {
    heading: "Related services",
    items: [
      {
        label: "Wix Studio website design",
        href: "/services/wix-studio-website-design",
        image: "/services/web-design.webp",
        desc: "Want a visual editor instead? The same prices, on Wix Studio.",
      },
      {
        label: "Website migration",
        href: "/services/website-migration",
        beforeAfter: {
          before: "/before-after/knode-before.jpg",
          after: "/before-after/knode-after.jpg",
        },
        desc: "Every URL mapped and redirected, wherever the site is moving to.",
      },
      {
        label: "All services",
        href: "/services",
        desc: "Landing pages, SEO and AI search, Wix Studio development and white-label work.",
      },
    ],
  },

  finalCta: {
    heading: ["Tell us what your", "site has to do"],
    paragraph:
      "A free 20-minute call. You'll leave with the right platform for it, a fixed price and a launch date.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Custom website development in Next.js with Sanity CMS: content modelling, integrations, migrations with full redirect mapping, SEO and AI search groundwork, and hosting on Zenith Digital's servers or the client's own account. Fixed prices from €1,250.",
    priceFrom: "1250",
  },
};
