import type { CtaLink } from "@/lib/types";
import { quoteOf } from "../testimonials-data";
import type { ServicePageContent } from "./types";

/**
 * /services/seo-aeo-ppc
 * Targets: wix seo agency · wix studio seo · aeo agency · seo and ppc agency.
 *
 * The SEO vs AEO block is deliberately quotable: it's the section an LLM would
 * lift to answer "what is answer engine optimization", which is the demo.
 * The only page without a published from-price; the pricing copy has to earn
 * that rather than dodge it.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const seoAeoPpc: ServicePageContent = {
  slug: "seo-aeo-ppc",
  publish: true,
  seo: {
    title:
      "Wix SEO, AEO & PPC campaigns that pay for themselves | Zenith Digital",
    description:
      "SEO, answer-engine optimization, and Google and Meta campaign management for Wix Studio sites. 5.96x average ROAS and €1M+ in client revenue generated.",
  },

  hero: {
    name: "SEO, AEO & PPC",
    h1: "Get found on Google, in AI answers, and by paid traffic that converts",
    subhead:
      "SEO, answer-engine optimization, and campaign management for Wix Studio sites. 5.96x average ROAS across client campaigns.",
    chips: [
      "5.96x average ROAS",
      "€1M+ client revenue",
      "100% SEO retention on migrations",
    ],
    ctas,
  },

  whoFor: {
    heading: "Where you probably are right now",
    intro:
      "This work suits businesses with a site that already exists and an audience that isn't finding it.",
    items: [
      {
        title: "The site is live and nobody sees it",
        body: "It launched, it looks fine, and it sits on page four. Organic traffic is flat or drifting down, and the only visitors arriving are the ones who already knew your name.",
      },
      {
        title: "Ad spend goes out, conversions don't come back",
        body: "Campaigns are running and the click cost is climbing, but the leads aren't tracking with the budget. Usually the ads aren't the problem, the page they land on is.",
      },
      {
        title: "You're invisible when someone asks an AI",
        body: "Buyers now ask ChatGPT and Perplexity for shortlists before they ever open Google. If your business isn't in the source material those tools read, you're not in the answer.",
      },
    ],
  },

  included: {
    heading: "What the work covers",
    intro:
      "Search, AI visibility, and paid campaigns run as one engagement, because splitting them across three vendors is how the handoffs get dropped.",
    items: [
      {
        title: "Technical and on-page SEO",
        body: "Crawlability, index coverage, heading structure, internal linking, page speed, and the metadata on every URL. The unglamorous layer that decides whether anything else you do can work.",
      },
      {
        title: "Schema and structured data",
        body: "Organization, Service, FAQ, Review, and Breadcrumb markup implemented and validated, so search engines and language models both get an explicit description of what your business does.",
      },
      {
        title: "Answer-engine optimization",
        body: "Content structured to be quotable: direct answers near the top of a page, clear question headings, and factual claims tied to specifics that a model can cite without hedging.",
      },
      {
        title: "Keyword and content strategy",
        body: "A ranked list of what your buyers actually search, split into what you can win this quarter and what needs a year. You'll know why each page exists before it's written.",
      },
      {
        title: "Google and Meta campaign management",
        body: "Build, launch, and ongoing optimization of paid campaigns, including audience and creative testing. Budget moves toward whatever produces revenue and away from whatever doesn't.",
      },
      {
        title: "Landing page alignment",
        body: "Ads pointed at pages that match the promise in the ad. Message match is the cheapest conversion improvement available and the one most often skipped.",
      },
      {
        title: "Monthly reporting in plain language",
        body: "One report a month you can read in five minutes: what moved, what it earned, what happens next. Revenue and enquiries first, vanity metrics nowhere.",
      },
    ],
  },

  process: {
    heading: "How a campaign starts",
    intro:
      "The first month is diagnosis and groundwork. Nobody spends your ad budget in week one.",
    steps: [
      {
        title: "Audit and baseline",
        duration: "Week 1",
        body: "Technical crawl, current rankings, index coverage, and existing campaign performance captured as a baseline. Everything afterwards gets measured against these numbers.",
      },
      {
        title: "Strategy and fix list",
        duration: "Week 2",
        body: "A prioritised list of what's costing you visibility, ordered by impact against effort, plus the keyword and content plan for the next two quarters.",
      },
      {
        title: "Implementation",
        duration: "Weeks 2 to 4",
        body: "Technical fixes shipped, schema added, priority pages rewritten or restructured. This is where most of the compounding value gets created.",
      },
      {
        title: "Campaigns live",
        duration: "Week 4 onward",
        body: "Paid campaigns launch once the pages behind them are worth sending traffic to. Conversion tracking is verified before the first euro is spent.",
      },
      {
        title: "Optimize and report",
        duration: "Monthly",
        body: "Continuous testing on ads and content, with a monthly report and a call. Budget shifts follow the data rather than the calendar.",
      },
    ],
  },

  proof: {
    heading: "Campaigns with revenue attached",
    intro:
      "The clearest example is the agency partnership: pages plus campaigns, measured on what the client earned.",
    // Bel'Istria's 257% impressions would fit here too, but that card belongs
    // to the migration page. Two service pages showing the same case card is
    // the one duplication the anti-doorway rule can't excuse.
    caseSlugs: ["mod-digital", "hunting-brook-gardens"],
    testimonial: quoteOf("flynn-blackie"),
  },

  pricing: {
    heading: "Why this one isn't a fixed price",
    note: "Every other service on this site carries a published number, and we'd rather explain this exception than hide it. Search and campaign work is ongoing rather than delivered once, and the sensible scope depends on things we can only see after looking: how much technical debt the site carries, how competitive your terms are, and what you're already spending on ads. Quoting a headline figure before that would be a number designed to win the enquiry, not to survive the engagement.",
    drivers: [
      {
        title: "Ad spend and channels",
        body: "Managing €2,000 a month across one channel and €30,000 across three are different jobs. Management scope tracks the budget it's responsible for.",
      },
      {
        title: "Starting condition of the site",
        body: "A site we built needs far less remedial work than one arriving with years of technical debt. The audit tells us which one you have in week one.",
      },
      {
        title: "Competition on your terms",
        body: "Ranking for a niche service in one city is not the same task as ranking nationally against funded competitors. The keyword plan sets the shape of the engagement.",
      },
    ],
    cta: { label: "Scope a campaign", href: "/book-a-call", variant: "primary" },
    ctaSecondary: {
      label: "Get a free audit first",
      href: "/free-website-audit",
      variant: "secondary",
    },
  },

  unique: {
    kind: "explainer",
    heading: "SEO and AEO, in plain language",
    intro:
      "Two names, two destinations, mostly one body of work. Here's the honest version of the difference.",
    left: {
      title: "SEO puts you in the results",
      body: "Search engine optimization is the work that earns a position on a results page. Google crawls your site, decides what each page is about, weighs it against every competing page, and ranks it. You win by being crawlable, being relevant to a real query, and being more useful than the pages above you. The payoff is a link someone chooses to click.",
    },
    right: {
      title: "AEO puts you in the answer",
      body: "Answer engine optimization is the work that gets you named when someone asks ChatGPT, Perplexity, or Google's AI overview instead of scrolling a list. There's no position ten to fall back on. The model either cites your business in its answer or it doesn't, and it makes that call from source material that is explicit, structured, and specific enough to repeat without risk.",
    },
    closing:
      "The useful part is how much overlap there is. Clean structure, honest headings, schema that states what you do, and pages that answer a real question with real specifics serve both. That's why we run them together rather than selling AEO as a separate product: about eighty percent of the work is shared, and the remaining twenty is a difference in how you write, not a second invoice.",
  },

  faq: {
    heading: ["Search and campaigns,", "without the jargon"],
    subhead: "Including the honest answer on timelines.",
    ctas,
    items: [
      {
        q: "Is Wix bad for SEO?",
        a: "No, and hasn't been for years, though the reputation outlived the reality. Wix Studio gives you control over titles, meta descriptions, canonical tags, redirects, robots directives, sitemaps, and structured data. Google has said publicly that it crawls and indexes Wix sites normally. Sites underperform because nobody configured any of that, which is a people problem on every platform.",
      },
      {
        q: "What is AEO and do I need it?",
        a: "Answer engine optimization is making your business citable by AI assistants rather than only rankable in search. You need it if buyers in your market have started asking ChatGPT or Perplexity for recommendations, which in most B2B categories they already have. The work overlaps heavily with SEO, so it's rarely a separate budget.",
      },
      {
        q: "How long until SEO results?",
        a: "Months, not weeks, and anyone promising otherwise is selling something. Technical fixes can show inside four to six weeks. Ranking movement on competitive terms typically takes three to six months, and compounding beyond that. Paid campaigns produce data in days, which is part of why we run both.",
      },
      {
        q: "Do you run ads too, or just SEO?",
        a: "Both, and usually together. Google and Meta campaigns are built, launched, and optimized in the same engagement as the search work, so the ads point at pages we control and can improve. Splitting them across two vendors is where the accountability goes missing.",
      },
      {
        q: "What does 5.96x average ROAS actually mean?",
        a: "Return on ad spend: for every euro put into managed campaigns, an average of 5.96 euros came back in tracked revenue, averaged across client campaigns. It's an average, not a guarantee, and it varies by industry, margin, and offer. We report your own number monthly rather than ours.",
      },
      {
        q: "Do I need a new site first?",
        a: "Often not. Start with the free audit and we'll say plainly whether the existing site can carry a campaign or whether spending on traffic first would be pouring budget into a leaking page. Plenty of clients start here and never rebuild.",
      },
    ],
  },

  related: {
    heading: "Related services",
    items: [
      {
        label: "Landing pages",
        href: "/services/landing-pages",
        image: "/services/landing-pages.webp",
        desc: "The dedicated pages campaign traffic converts on, built in about a week.",
      },
      {
        label: "Website migration",
        href: "/services/website-migration",
        image: "/services/migrations.jpg",
        desc: "Changing platform without handing back the rankings you've built.",
      },
      {
        label: "All services",
        href: "/services",
        desc: "Design and build, Wix Studio development, and white-label production.",
      },
    ],
  },

  finalCta: {
    heading: ["Find out what's", "holding your site back"],
    paragraph:
      "A free audit, reviewed by a person, with the highest-impact fixes named in order. Then a 20-minute call to decide whether campaigns are worth running yet.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Search engine optimization, answer engine optimization, and Google and Meta campaign management for Wix Studio websites. Technical and on-page SEO, structured data, keyword and content strategy, landing page alignment, and monthly reporting.",
  },
};
