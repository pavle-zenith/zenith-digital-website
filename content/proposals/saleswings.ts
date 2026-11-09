import { founderCore } from "../founder";
import type { AuditProposalPage } from "./types";

/**
 * SalesWings (saleswingsapp.com), a Swiss B2B SaaS for Salesforce: lead and
 * account scoring, buyer intent, website tracking and personalization. A
 * pre-purchase proposal for Phil Western (Product Marketing Lead); the CEO
 * decides. v2 (~/Desktop/saleswings-proposal-v2.md), after the call: one
 * unified design, built on Wix Headless with Wix infrastructure behind it
 * (forms, analytics, performance), handed off as a code workspace the
 * marketing team edits with AI agents inside design guardrails. One month,
 * €2,350. US spelling throughout.
 *
 * A proposal, not an audit: each finding reads "today on WordPress, then on
 * Wix", so the page sets `hideSeverity` and has no score. The hosting
 * provider and front-end framework are never named on the page. Zapier
 * appears only where it describes the site today.
 *
 * CHECKED AGAINST THE LIVE SITE, 9 Nov 2026. Counts are the sitemaps'
 * (post, page, kb_term, kb_category: 211 + 105 + 93 + 9 = 418; 205 posts
 * with a 2026 lastmod), which match what WordPress publishes.
 *   - Homepage, fresh browser, all requests until 20 s after network idle:
 *     176 to 178 requests across runs (177 in the run the chart shows) and
 *     67 script tags. 15 named third-party tools plus 5 unnamed endpoints;
 *     the same tools load on pricing, an article and a glossary term.
 *   - 36 of the 105 pages already redirect, including five of the six older
 *     /lead-and-account-insights-… industry pages; education has two live
 *     pages. Redirects live in two plugins (Quick Page/Post Redirect and
 *     Redirection).
 *   - The case studies page links 12 PDFs; the same case studies exist as
 *     pages (16 posts in /case-studies/ plus /ascensus-case-study/).
 */

const EMAIL = { label: "Email us", href: "mailto:hello@thezenithdigital.com" };
const ASSETS = "/proposals/saleswings";

export const saleswings: AuditProposalPage = {
  kind: "audit",
  slug: "saleswings-fe50n",
  client: "SalesWings",
  lang: "en",
  meta: {
    title: "SalesWings - Website proposal | Zenith Digital",
    description:
      "One design, every URL kept, and a site your team edits with AI: moving saleswingsapp.com to Wix Headless.",
    ogTitle: "SalesWings on Wix: one design, run by your own team",
    ogLocale: "en_US",
  },
  hideSeverity: true,

  labels: {
    jump: "Contents",
    severity: { critical: "Critical", high: "High", medium: "Medium" },
    seen: "Today",
    why: "Why it matters",
    proposal: "On Wix",
    duration: "Duration",
    price: "Price",
    mobileBar: "See the proposal",
    missingImage: "[PROPOSED TEMPLATE SYSTEM]",
    readCaseStudy: "Read the case study",
  },

  hero: {
    eyebrow: "Website proposal",
    heading: "SalesWings on Wix: one design, run by your own team",
    lead: "How we'd move saleswingsapp.com onto Wix in one month: a unified design from your CEO's direction, every article and URL carried over, and a setup your marketing team can edit with AI agents.",
    meta: [
      { label: "Prepared for", value: "Phil Western and the SalesWings team" },
      { label: "Date", value: "9 November 2026" },
      { label: "Prepared by", value: "Pavle Maodus, Zenith Digital" },
    ],
    primaryCta: { label: "See the proposal", href: "#proposal" },
    secondaryCta: EMAIL,
  },

  summary: {
    id: "summary",
    heading: "In short",
    body: [
      "Your CEO wants one consistent design on Wix infrastructure. Your team wants to make changes without waiting on anyone. This proposal covers both: a new design, a careful migration of everything you have, and a setup your team edits with AI, inside clear design rules.",
    ],
    points: [
      "Pages built over time, without one design system.",
      "Around 15 third-party tools load on every page.",
      "Forms and tracking spread across plugins and Zapier.",
    ],
    fixesHeading: "On Wix",
    fixes: [
      "One design system from your CEO's direction",
      "Every article, page and URL carried over",
      "Your team edits sections, landing pages and SEO with AI",
    ],
  },

  stats: {
    id: "at-a-glance",
    heading: "What we're moving",
    items: [
      { value: "418", label: "URLs: 211 articles, 105 pages, 93 glossary terms, 9 topics" },
      { value: "211", label: "articles, most updated this year, all kept on the same URLs" },
      { value: "93", label: "glossary terms moving into Wix CMS" },
      { value: "~15", label: "third-party tools to review before the move" },
    ],
  },

  findings: {
    id: "findings",
    heading: "Today and on Wix",
    intro: "Six areas, and how each one changes.",
    items: [
      {
        id: "finding-1",
        number: "Finding 1",
        title: "One design system instead of page-by-page layouts",
        tag: "Design and structure",
        seen: [
          "105 pages built over time. 36 already redirect elsewhere, industry pages overlap, and test, thank-you and old download pages are still published.",
        ],
        why: ["Every page looks a little different, and the site gets harder to keep current."],
        proposal: [
          [
            "A homepage designed from your CEO's moodboard and refined until it's approved",
            "Reusable templates for product, industry, comparison, integration, article and glossary pages",
            "A keep, merge or retire list for every page, agreed with you",
          ],
        ],
      },
      {
        id: "finding-2",
        number: "Finding 2",
        title: "Every article moves, every URL stays",
        tag: "Articles and URLs",
        seen: [
          "211 articles live under category paths like /salesforce/…, with redirects spread across two WordPress plugins.",
        ],
        why: [
          "205 articles were updated this year. That's an active SEO program, and it has to arrive intact.",
        ],
        proposal: [
          [
            "Articles in Wix CMS, on exactly the same URLs",
            "One clean redirect map, 301s only for pages you retire",
          ],
        ],
      },
      {
        id: "finding-3",
        number: "Finding 3",
        title: "A faster site, with only the scripts you need",
        tag: "Speed and scripts",
        seen: [
          "The homepage loads 67 script tags, 177 requests and around 15 third-party tools, including OptinMonster, Cookiebot, Vector, Salespeak and OneSignal.",
        ],
        why: [
          "A new platform won't fix this on its own. The tags move with you unless someone reviews them.",
        ],
        proposal: [
          [
            "Wix infrastructure powering the backend and performance",
            "A tag review with a keep, merge or remove list",
            "Popups built natively, non-essential scripts loaded after consent",
          ],
        ],
        evidence: [
          {
            src: `${ASSETS}/requests.webp`,
            alt: "Bar chart of the 177 requests the saleswingsapp.com homepage makes: 54 from the site itself, 22 OptinMonster, 20 Google Fonts, 19 Salespeak, 16 Google Tag Manager, Analytics and Ads, 7 each for OneSignal, Vector and LinkedIn, and 25 from seven other tools and five unnamed endpoints.",
            caption: "Homepage requests by source, measured 9 November 2026.",
            width: 1440,
            height: 1020,
            small: { src: `${ASSETS}/requests-small.webp`, width: 720, height: 1170 },
          },
        ],
      },
      {
        id: "finding-4",
        number: "Finding 4",
        title: "Forms and data in one place",
        tag: "Forms, analytics and integrations",
        seen: [
          "Forms post to Zapier webhooks, tracking runs through GTM, and a custom plugin powers some of your components.",
        ],
        why: ["SalesWings sells website tracking. It has to work flawlessly on your own site."],
        proposal: [
          [
            "Wix native forms, with every submission in your Wix dashboard",
            "Wix analytics alongside your existing tracking",
            "Each integration reviewed with you: keep it, or switch to its Wix counterpart",
            "SalesWings tracking tested before launch",
          ],
        ],
      },
      {
        id: "finding-5",
        number: "Finding 5",
        title: "Structured content with a proper home",
        tag: "Glossary and case studies",
        seen: [
          "The 93-term glossary and 9 topics run on a WordPress plugin, and the case studies page links 12 PDFs instead of the case study pages already on your site.",
        ],
        why: [
          "Structured, linkable content is what Google and AI assistants cite. PDFs are harder for both to read.",
        ],
        proposal: [
          [
            "Glossary and topics as Wix CMS collections, on the same URLs",
            "Case study cards linked to their pages, PDFs kept as downloads",
          ],
        ],
      },
      {
        id: "finding-6",
        number: "Finding 6",
        title: "Clean SEO on every template",
        tag: "Search details",
        seen: [
          "The pricing page has four main headings, the blog index's main heading is just \"SalesWings\", and the footer links a 2016 privacy policy PDF.",
        ],
        why: [
          "Clean headings and metadata help Google understand which page answers which search.",
        ],
        proposal: [
          [
            "One main heading, title and description per page",
            "Article and breadcrumb structured data on every template",
            "SEO edits your team can make themselves after launch",
          ],
        ],
      },
    ],
  },

  mockup: {
    id: "design",
    heading: "From moodboard to design system",
    body: "We've seen the direction your CEO put together. We'll turn it into one consistent design system, so every new page looks finished without starting from scratch.",
    image: {
      src: `${ASSETS}/templates.webp`,
      alt: "Proposed template system for saleswingsapp.com.",
      caption: "Proposed template system for saleswingsapp.com.",
      width: 1440,
      height: 1290,
      small: { src: `${ASSETS}/templates-small.webp`, width: 720, height: 1812 },
    },
    points: [
      {
        lead: "Homepage approved first.",
        text: "Designed from your CEO's moodboard and refined until the look is right.",
      },
      {
        lead: "Templates, not one-offs.",
        text: "New landing pages come from the library in minutes.",
      },
      {
        lead: "Fast by default.",
        text: "Wix infrastructure behind it, and only the scripts you need.",
      },
    ],
  },

  proof: {
    id: "similar-project",
    heading: "A similar project",
    client: "Knode AI",
    line: "A B2B SaaS raising its Series A. A new site and landing page, live in 3 weeks.",
    stats: [
      { value: "3 weeks", label: "to launch" },
      { value: "Series A", label: "raising" },
    ],
    href: "/case-studies/knode-ai",
    quote: "gemma-sole",
  },

  offer: {
    id: "proposal",
    heading: "Proposal",
    intro: "Everything above, in one project.",
    name: "New SalesWings site on Wix Headless",
    duration: "1 month",
    price: "€2,350",
    items: [
      "Migration list and plan for all content, integrations and site data",
      "Homepage designed from your CEO's moodboard, refined until approved",
      "The full site designed and built from that design system",
      "All 211 articles, 93 glossary terms and 9 topics migrated, on the same URLs",
      "Wix native forms and analytics, with a plan for your existing integrations",
      "Tag review, redirects and SEO carried over on every page",
      "A code workspace with design guardrails, set up for AI-assisted editing",
      "Training for your team, plus one month of free maintenance",
    ],
    notes: [
      "Payment: 40% to start (€940). The remaining 60% (€1,410) in one payment or two monthly installments of €705, whichever you prefer.",
      "The site can go live once more than half is paid.",
      "By bank transfer, with a non-VAT invoice.",
      "After the free month, maintenance is on demand at €25 an hour. Nothing is required.",
      "Any Wix plan or app fees aren't included.",
      "This offer is valid for 30 days from the date above.",
    ],
  },

  handoff: {
    id: "handoff",
    heading: "After launch: your team runs the site",
    body: "The site lives in a code workspace set up for your team. Your marketers ask an AI agent to add a section, publish a landing page or update SEO, and the guardrails keep every change on-brand.",
    points: [
      {
        lead: "Design guardrails.",
        text: "A rules file, approved components and design tokens the agent has to follow.",
      },
      {
        lead: "Content in Wix.",
        text: "Articles, glossary terms and case studies edited in the Wix dashboard.",
      },
      {
        lead: "Reviewed before it's live.",
        text: "Every change is checked on a preview before it's published.",
      },
      {
        lead: "Trained, with a playbook.",
        text: "A training session and a short guide with the prompts your team will use most.",
      },
    ],
  },

  timeline: {
    id: "how-it-works",
    heading: "How the project runs",
    rows: [
      {
        what: "Access and migration plan",
        description:
          "WordPress access, then a full list and plan for content, integrations and site data",
        when: "week 1",
      },
      {
        what: "Design direction",
        description: "Homepage from your CEO's moodboard, refined until the look is approved",
        when: "weeks 1-2",
      },
      {
        what: "Design and build",
        description:
          "The rest of the site, from the migration list, content exports and design guidelines",
        when: "weeks 2-3",
      },
      {
        what: "QA, SEO and training",
        description:
          "Testing, SEO checks, final migration, and training your team on AI-assisted editing",
        when: "week 4",
      },
    ],
  },

  needs: {
    id: "what-we-need",
    heading: "What we need from you",
    items: [
      "Access to your WordPress site",
      "Wix account access, or we create the site in your company's name",
      "GTM, Analytics and Search Console access",
      "Your CEO's moodboard and any must-haves",
      "Brand assets: logo, fonts, colors",
    ],
  },

  faq: {
    id: "questions",
    heading: "Questions",
    items: [
      {
        q: "How will our team edit the site?",
        a: "Content is edited in the Wix dashboard. Sections, landing pages and SEO are changed by asking an AI agent in your code workspace, inside the design guardrails. Training is included.",
      },
      {
        q: "Why Wix Headless instead of Wix Studio?",
        a: "Your team works with AI agents. Headless gives them a codebase they can change safely, keeps every URL exactly as it is, and Wix still runs your forms, CMS, analytics and backend.",
      },
      {
        q: "What happens to our existing integrations?",
        a: "Every one goes on the migration list. We'll go through them with you and either keep each one or switch it to its Wix counterpart. Your SalesWings tracking is tested before launch.",
      },
      {
        q: "Will we lose Google rankings?",
        a: "No. URLs, titles, descriptions and structured data carry over, and anything we retire gets a 301 redirect.",
      },
      {
        q: "What happens after launch?",
        a: "You get one month of free maintenance. After that, help is on demand at €25 an hour, with no retainer.",
      },
    ],
  },

  close: {
    id: "next-step",
    heading: "Next step",
    body: "Reply with any questions. If there are none, we'll send the agreement and book the kickoff.",
    primaryCta: EMAIL,
    stats: [
      { value: "1 month", label: "from kickoff to launch" },
      { value: "418", label: "URLs kept or redirected" },
      { value: "100+", label: "websites launched by Zenith Digital" },
      { value: "Legend", label: "certified Wix Partner, the program's top tier" },
    ],
    photo: { src: founderCore.image, alt: "Pavle Maodus, founder of Zenith Digital" },
    signature: ["Pavle Maodus", "Founder, Zenith Digital"],
  },
};
