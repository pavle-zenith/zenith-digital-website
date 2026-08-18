import type { CtaLink, Metric } from "@/lib/types";

import { quoteOf } from "./testimonials-data";

/**
 * /case-studies — single source of truth for all case-study data. The homepage
 * featured two-panel cards and the before/after slider sets import from here
 * (no duplicated case data anywhere). Studies listed in `caseStudyDetails` get
 * a /case-studies/[slug] detail page and their cards flip to internal links
 * automatically — shipping a new study is a data change, not a refactor.
 */

// Industry taxonomy — the filter pill list derives from this map, so adding a
// project with a new industry automatically adds the pill.
export const INDUSTRIES = {
  travel: "Travel & hospitality",
  saas: "SaaS & tech",
  marine: "Marine & rentals",
  coaches: "Coaches & speakers",
  courses: "Courses & education",
  ecommerce: "E-commerce & retail",
  agencies: "Agencies & white-label",
  property: "Property & real estate",
  services: "Professional services",
} as const;

export type IndustrySlug = keyof typeof INDUSTRIES;

/**
 * Shorter labels for the filter pills only. Nine full-length pills need ~1474px
 * and never fit one row, so the last one dropped alone to a second row. The
 * trimmed set fits on a single row from lg up. Cards keep the full INDUSTRIES
 * label in their corner tag, so nothing is lost, and the pill still reads
 * unambiguously next to the "All" that precedes it.
 */
export const INDUSTRY_FILTER_LABELS: Record<IndustrySlug, string> = {
  travel: "Travel",
  saas: "SaaS",
  marine: "Marine",
  coaches: "Coaches",
  courses: "Courses",
  ecommerce: "E-commerce",
  agencies: "Agencies",
  property: "Property",
  services: "Professional services",
};

export type CaseStudyCard = {
  client: string;
  slug: string;
  industry: IndustrySlug;
  /** One hard metric (real figures only — no invented numbers). */
  metric: string;
  /** Render the metric in quotes (a quote-metric, not a number). */
  metricIsQuote?: boolean;
  /** Owner still to supply the real metric — rendered as a visible placeholder. */
  metricPending?: boolean;
  story: string;
  /**
   * Screenshot thumb from /portfolio-slider (4:3 browser mockup on the client's
   * own backdrop). Card media crops these centred, not from the top: the
   * composition is already framed, so a top anchor would leave a fat top margin
   * and clip the window's bottom edge. Omit to render the wordmark placeholder.
   */
  thumb?: string;
  /** White wordmark used by the placeholder card (and available for overlays). */
  logo?: string;
  /** Live site URL; omit while the owner confirms it (card renders unlinked). */
  liveUrl?: string;
};

/**
 * Full project grid.
 *
 * OWNER — read before launch. Two kinds of card live here:
 *
 * 1. The first eleven carry REAL figures ported from the live site.
 * 2. Everything below "Wellington Web Co" is COPY WRITTEN TO FILL THE GRID at
 *    your request. The `story` lines are invented. The `metric` lines are
 *    deliberately NOT invented numbers: each one states the scope of the build
 *    ("Boat and yacht marketplace") rather than a result ("+240% bookings"),
 *    because a fabricated percentage on a named client's card is a claim about
 *    that client's business and reads as real. Send me the actual numbers and
 *    I'll swap them in. Anything still describing scope at launch is a card
 *    that never got its figure.
 *
 * Thumbs are the 4:3 shots from /case-study-grid. Cards with no shot fall back
 * to their white wordmark, then to the client name set in the display face.
 */
export const caseStudyCards: CaseStudyCard[] = [
  {
    client: "Knode AI",
    slug: "knode-ai",
    industry: "saas",
    metric: "Raising a $10M Series A",
    story: "Full SaaS site and landing page from scratch in 3 weeks",
    thumb: "/portfolio-slider/knode-ai.jpg",
    logo: "/logos-white/knode.png",
    liveUrl: "https://www.knode.ai",
  },
  {
    client: "Scottish Luxury Experience",
    slug: "scottish-luxury-experience",
    industry: "travel",
    metric: "$521k in 7 months",
    story: "The UK's best-looking travel website, live in 4 weeks",
    thumb: "/case-study-grid/scottish-luxury-experience.webp",
    logo: "/logos-white/sle.avif",
    liveUrl: "https://www.scottishluxuryexperience.com",
  },
  {
    client: "Bel'Istria",
    slug: "belistria",
    industry: "travel",
    metric: "257% YoY impressions",
    story:
      "AI-first migration from Wix Classic. 70+ pages ranking, top spot in AI answers.",
    thumb: "/portfolio-blocky/belistria.png",
    logo: "/logos-white/belistria.png",
    liveUrl: "https://www.belistria.eu",
  },
  {
    client: "Fort Lauderdale Dock Rentals",
    slug: "fort-lauderdale-dock-rentals",
    industry: "marine",
    metric: "30+ warm leads",
    story:
      "Booking and lead-capture ecosystem for Florida's premier dock charter",
    thumb: "/portfolio-slider/fort-lauderdale-dock-rental.jpg",
    logo: "/logos-white/foxstays.png",
    // No live link by choice: the client has since redesigned the site, so
    // the shots here are the Zenith build, not what's live today.
  },
  {
    client: "MOD Digital",
    slug: "mod-digital",
    industry: "agencies",
    metric: "10+ brands shipped together",
    story: "15+ landing pages driving €1M+ in client campaign revenue",
    thumb: "/case-study-grid/mod-digital.webp",
    logo: "/logos-white/mod.png",
    liveUrl: "https://www.moddigital.co.uk/ai-ready-websites",
  },
  {
    client: "Hunting Brook Gardens",
    slug: "hunting-brook-gardens",
    industry: "courses",
    metric: "€140k in course sales",
    story:
      "Landing pages and course infrastructure for an award-winning gardener",
    thumb: "/case-study-grid/hunting-brook.webp",
    liveUrl: "https://unlimited.huntingbrookgardens.com/plantsperson-course",
  },
  {
    client: "Jim Steele",
    slug: "jim-steele",
    industry: "coaches",
    metric: "10+ venues interested",
    story:
      "Marketing page and lead-capture ecosystem for a UK motivational speaker",
    thumb: "/case-study-grid/jim-steele.webp",
    logo: "/logos-white/jimsteele.png",
    liveUrl: "https://www.jimsteelespeaker.com",
  },
  {
    client: "Stilby",
    slug: "stilby",
    industry: "ecommerce",
    metric: "3 languages, 2-week launch",
    story: "Multilingual sites to expand into Montenegro and Slovakia",
    thumb: "/case-study-grid/stilby.webp",
    logo: "/logos-white/stilby.png",
    liveUrl: "https://www.stilby.eu",
  },
  {
    client: "Techtonnik",
    slug: "techtonnik",
    industry: "services",
    metric: "10+ projects delivered",
    story: "Web fulfillment partner since 2023 across 7+ industries",
    thumb: "/case-study-grid/techtonnik.webp",
    logo: "/logos-white/techtonnik.png",
    liveUrl: "https://www.techtonnik.com",
  },
  {
    client: "Capacity",
    slug: "capacity",
    industry: "agencies",
    metric: "5+ consulting projects",
    story: "Fractional web design team leading design & dev operations",
    thumb: "/case-study-grid/capacity.webp",
    logo: "/logos-white/capacity.png",
    liveUrl: "https://www.wearecapacity.co",
  },
  {
    client: "Genroks AI",
    slug: "genroks-ai",
    industry: "saas",
    metric: "10+ ISO deals since launch",
    story: "Custom-coded rebrand and AEO for an AI compliance startup",
    thumb: "/case-study-grid/genroks.webp",
    logo: "/logos-white/genroks.png",
    liveUrl: "https://www.genroks.com",
  },

  // ---- Everything below has placeholder copy. See the note above. ----

  {
    client: "Wellington Web Co",
    slug: "wellington-web-co",
    industry: "agencies",
    // Grounded in Finlay's testimonial, which is the one real thing here.
    metric: "Dozens of local business sites",
    story: "Design, build, and hosting behind a Scottish agency's own brand",
    // Same shot the partnerships page uses for this partner: 4:3, so it drops
    // into the card exactly like the /case-study-grid set.
    thumb: "/partners/wellington-web-co.webp",
    liveUrl: "https://wellingtonwebco.com",
  },
  {
    client: "AdVantage Media",
    slug: "advantage-media",
    industry: "agencies",
    metric: "White-label production partner",
    story: "Conversion-driven small business sites shipped under their brand",
    thumb: "/case-study-grid/advantage-media.webp",
    logo: "/logos-white/advantage.png",
    liveUrl: "https://www.advantage-media-marketing.com",
  },
  {
    client: "Just Stay",
    slug: "just-stay",
    industry: "travel",
    metric: "Two funnels, live in 4 weeks",
    story:
      "Short-let booking funnel and landlord pipeline for a UK Airbnb superhost",
    thumb: "/case-study-grid/just-stay.webp",
    liveUrl: "https://www.juststaytoday.co.uk",
  },
  {
    client: "Yacht Junky",
    slug: "yacht-junky",
    industry: "marine",
    metric: "Boat and yacht marketplace",
    story: "Multi-seller listing platform for private sellers and dealers",
    thumb: "/case-study-grid/yacht-junky.webp",
    liveUrl: "https://moddigital.wixstudio.com/yacht-junky",
  },
  {
    client: "Highland Fling",
    slug: "highland-fling",
    industry: "travel",
    metric: "Adventure booking platform",
    story: "Bungee and adrenaline experience bookings across Scotland",
    thumb: "/case-study-grid/highland-fling.webp",
    liveUrl: "https://moddigital.wixstudio.com/highlandfling",
  },
  {
    client: "Villa Maria",
    slug: "villa-maria",
    industry: "travel",
    metric: "Direct booking site",
    story: "Riverside apartments and rooms taking bookings without the OTAs",
    thumb: "/case-study-grid/villa-maria.webp",
    liveUrl: "https://villamarijakanjiza.rs",
  },
  {
    client: "St Matthew Place",
    slug: "st-matthew-place",
    industry: "property",
    metric: "Development launch site",
    story: "Sales site for a luxury apartment development in Boka Kotorska",
    thumb: "/case-study-grid/st-matthew-place.webp",
    liveUrl: "https://www.saintmatthewplace.com",
  },
  {
    client: "Superstan",
    slug: "superstan",
    industry: "property",
    metric: "Property listing portal",
    story: "Searchable listings and enquiry routing for an estate agency",
    thumb: "/case-study-grid/superstan.webp",
    liveUrl: "https://superstanbg.rs",
  },
  {
    client: "NotYou Brand",
    slug: "notyou-brand",
    industry: "ecommerce",
    metric: "Streetwear storefront",
    story: "Drop-driven store and lookbook for a creative apparel label",
    thumb: "/case-study-grid/notyou-brand.webp",
    liveUrl: "https://notyoubrand.com",
  },
  {
    client: "Lepa Couture",
    slug: "lepa-couture",
    industry: "ecommerce",
    // Marko's testimonial calls it a prestige Shopify site, so this much is real.
    metric: "Prestige Shopify storefront",
    story: "Made-to-order couture catalogue with per-piece sizing",
    thumb: "/case-study-grid/lepa-couture.webp",
    liveUrl: "https://www.lepacouture.com",
  },
  {
    client: "Bradsells",
    slug: "bradsells",
    industry: "ecommerce",
    metric: "Craft spirits brand site",
    story: "Scottish coffee liqueur brand story and direct sales",
    thumb: "/case-study-grid/bradsells.webp",
    liveUrl: "https://distilnation.com/bradsells",
  },
  {
    client: "Destilerija Maodus",
    slug: "destilerija-maodus",
    industry: "ecommerce",
    metric: "Distillery brand and shop",
    story: "Illustrated brand site and gift ordering for a rakija distillery",
    thumb: "/case-study-grid/destilerija-maodus.webp",
    liveUrl: "https://destilerija-maodus-website.vercel.app",
  },
  {
    client: "Destilerija Gorska",
    slug: "destilerija-gorska",
    industry: "ecommerce",
    metric: "Distillery brand site",
    story: "Product storytelling for a small-batch fruit brandy producer",
    thumb: "/case-study-grid/destilerija-gorska.webp",
    liveUrl: "https://destilerijagorska.rs",
  },
  {
    client: "ATW Trucking",
    slug: "atw-trucking",
    industry: "services",
    metric: "Logistics site rebuild",
    story: "Freight, logistics, and heavy equipment shipping for an Indiana carrier",
    thumb: "/case-study-grid/atw-trucking.webp",
    liveUrl: "https://www.atwtrucking.com",
  },
  {
    client: "LMF HR",
    slug: "lmf-hr",
    industry: "services",
    // Les Marie's testimonial supplies this one.
    metric: "12+ client sites delivered",
    story: "HR and staffing site, plus the home care sites built alongside it",
    thumb: "/case-study-grid/lmfhr.webp",
    liveUrl: "https://www.lmfhr.com",
  },
  {
    client: "Pressure Test Scotland",
    slug: "pressure-test-scotland",
    industry: "services",
    metric: "Instant-quote lead capture",
    story: "Quote form and service pages for a Scotland-wide pipe testing firm",
    thumb: "/case-study-grid/pressure-test-scotland.webp",
    liveUrl: "https://www.pressuretestscotland.co.uk",
  },
  {
    client: "LORAK Films",
    slug: "lorak-films",
    industry: "services",
    metric: "Production company portfolio",
    story: "Reel-led portfolio and case studies for a film production crew",
    thumb: "/case-study-grid/lorak-films.webp",
    liveUrl: "https://www.lorakfilms.com",
  },
  {
    client: "Creatify Collective",
    slug: "creatify-collective",
    industry: "agencies",
    metric: "Creative studio portfolio",
    story: "Selected work site for a fashion, lifestyle, and automotive studio",
    thumb: "/case-study-grid/creatify-collective.webp",
    liveUrl: "https://www.creatifycollective.co",
  },
  {
    client: "Bianomics",
    slug: "bianomics",
    industry: "services",
    metric: "Consultancy positioning site",
    story: "Brand, events, and operations offer pulled into one narrative",
    thumb: "/case-study-grid/bianomics.webp",
  },
  {
    client: "Katie Hailey",
    slug: "katie-hailey",
    industry: "coaches",
    metric: "Figma to live in 1.5 weeks",
    story: "Yoga, sound healing, and retreat bookings for a UK practitioner",
    thumb: "/case-study-grid/katie-hailey.webp",
    liveUrl: "https://www.katiehailey.com",
  },
  {
    client: "Kevan Christie",
    slug: "kevan-christie",
    industry: "coaches",
    metric: "Author and book launch site",
    story: "Debut novel launch, archives, and press for an Edinburgh journalist",
    thumb: "/case-study-grid/kevan-christie.webp",
    liveUrl: "https://www.kevanchristie.com",
  },
  {
    client: "Iskra",
    slug: "iskra",
    industry: "saas",
    metric: "App landing and onboarding",
    story: "Landing page and store funnel for a quit-smoking tracker app",
    thumb: "/case-study-grid/iskra.webp",
    liveUrl: "https://www.iskraclub.com",
  },
  {
    client: "MindEd",
    slug: "minded",
    industry: "courses",
    metric: "70+ pages migrated, 2 languages",
    story: "Education platform redesign for a kids learning app",
    thumb: "/portfolio-slider/mindeed.jpg",
    liveUrl: "https://www.minded.es",
  },
];

// Featured two-panel cards (thumbnail + branded panel). Shared with the
// homepage CaseStudies section. `slug` ties each card back to the grid data:
// when the study has a shipped detail page the panel button links there
// instead of the live site.
export const caseStudies = {
  heading: "Real examples of how our websites helped businesses drive growth",
  intro:
    "These aren't showcase sites built to impress other designers. They're working websites built for real businesses, with specific problems to solve, and real outcomes attached.",
  items: [
    {
      client: "Knode AI",
      slug: "knode-ai",
      logo: "/logos-white/knode.png",
      thumb: "/casestudies/knode.jpg",
      title:
        "A premium Wix Studio SaaS site, built in three weeks, for a company raising a $10M Series A",
      stats: [
        { value: "$10M USD", label: "Currently raising" },
        { value: "3 Weeks", label: "Time-to-market" },
      ],
      liveUrl: "https://knode.ai",
      // per-client panel background
      panel: "#161b6b",
    },
    {
      client: "Bel'Istria",
      slug: "belistria",
      logo: "/logos-white/belistria.png",
      thumb: "/portfolio-blocky/belistria.png",
      title:
        "Crafting an immersive Croatia private transfer and travel booking experience in Wix Studio",
      stats: [
        { value: "257%", label: "YoY impressions" },
        { value: "35+", label: "Pages migrated" },
      ],
      liveUrl: "https://belistria.eu",
      panel: "#0e2a1f",
    },
    {
      client: "MOD Digital",
      slug: "mod-digital",
      logo: "/logos-white/mod.png",
      thumb: "/portfolio-blocky/mod-digital.webp",
      title:
        "Three years as the build team behind a UK growth agency's campaigns",
      stats: [
        { value: "€1M+", label: "Campaign revenue" },
        { value: "10+", label: "Brands shipped" },
      ],
      liveUrl: "https://www.moddigital.co.uk",
      // OWNER: confirm MOD brand hex for the panel; placeholder navy for now.
      panel: "#0f1c2e",
    },
    {
      client: "Scottish Luxury Experience",
      slug: "scottish-luxury-experience",
      logo: "/logos-white/sle.avif",
      thumb: "/casestudies/scottishluxury.jpg",
      title:
        "Enabling thousands of tourists to visit Scotland's beauty through the UK's best-looking travel website",
      stats: [
        { value: "$521k", label: "Revenue in 7 months" },
        { value: "4 Weeks", label: "Time-to-market" },
      ],
      liveUrl: "https://thescottishluxuryexperience.com",
      panel: "#241a2e",
    },
  ],
};

// Before/after slider pairs. Shared with /free-website-audit and /book-a-call.
export const beforeAfterItems = [
  {
    title: "Knode AI",
    before: "/before-after/knode-before.jpg",
    after: "/before-after/knode-after.jpg",
  },
  {
    title: "FoxStays Dock Rental",
    before: "/before-after/foxstays-before.jpg",
    after: "/before-after/foxstays-after.jpg",
  },
  {
    title: "Hunting Brook Gardens",
    before: "/before-after/huntingbrook-before.jpg",
    after: "/before-after/huntingbrook-after.jpg",
  },
  {
    title: "MindEd",
    before: "/before-after/minded-before.jpg",
    after: "/before-after/minded-after.jpg",
  },
];

// ---- Case study detail pages (/case-studies/[slug]) ----

export type CaseStudyGalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudyResultMetric = Metric & {
  /** Tint the value --positive ("results up" metrics). */
  positive?: boolean;
  /** Render the value in quotes (a quote-metric, never an invented number). */
  isQuote?: boolean;
};

/**
 * Everything the detail template can render. Every section is conditional:
 * client data arrives unevenly, so a study ships once it has the minimum set
 * (headline, challenge, approach, one result, one image) and a section with no
 * data renders nothing — no empty frames, no placeholders in production.
 */
export type CaseStudyDetail = CaseStudyCard & {
  /** Outcome-led H1 — the raise, never "[Client] website design". */
  headline: string;
  /** Dark-ink wordmark (/logos-dark) — the hero is a light section, so the
   *  card's white `logo` would be invisible there. */
  logoDark?: string;
  /** The project's headline numbers, 2–3 of them, shown under the
   *  introduction paragraph. */
  stats: Metric[];
  /** Hero metadata card. Omit liveUrl to drop that row. */
  meta: {
    industry: string;
    engagementType: string;
    timeline: string;
    platform: string;
    liveUrl?: string;
  };
  /** "The challenge" paragraphs, written from the client's world. */
  challenge: string[];
  /** Full-bleed project screenshot band under the meta strip. */
  heroShot?: CaseStudyGalleryImage;
  /** Lead paragraph under the shot: what the client does, in plain terms.
   *  Pairs with `techUsed` as the scope column beside it. */
  introduction?: string;
  /** 2–4 titled moves, not an essay. */
  approach: { heading: string; body: string }[];
  results: CaseStudyResultMetric[];
  /** One qualitative line under the numbers. */
  resultsNote?: string;
  /** First image illustrates the challenge; the rest feed the gallery. */
  gallery?: CaseStudyGalleryImage[];
  beforeAfter?: { before: string; after: string };
  /** Muted autoplay loop in the gallery. */
  video?: string;
  testimonial?: { quote: string; name: string; role: string; avatar?: string };
  /**
   * Scope strip items ("Wix Studio", "CMS", ...). An item can carry an href to
   * point at the service page that sells that piece of work, which turns the
   * scope list into internal links from proof back to the offer.
   */
  techUsed?: (string | { label: string; href: string })[];
  publishedAt: string;
  /**
   * Closing CTA, when the study's outcome is specific enough to beat the
   * generic one. Only heading and paragraph vary; the buttons and texture come
   * from csDetailCta so every study's CTA still looks identical. Omit to use
   * the shared copy.
   */
  cta?: { heading: string[]; paragraph: string };
  seo?: { title?: string; description?: string };
};

function cardOf(slug: string): CaseStudyCard {
  const card = caseStudyCards.find((c) => c.slug === slug);
  if (!card) throw new Error(`No case-study card for slug "${slug}"`);
  return card;
}

// Shipped detail pages, in next-study rotation order.
export const caseStudyDetails: CaseStudyDetail[] = [
  {
    ...cardOf("knode-ai"),
    // Narrative confirmed by owner (Aug 2026): story beats match the project.
    headline: "The site Knode took into its $10M Series A raise",
    logoDark: "/logos-dark/knode.png",
    stats: [
      { value: "$10M", label: "Series A, in progress" },
      { value: "3 weeks", label: "Kickoff to launch" },
      { value: "10", label: "Pages designed and built" },
    ],
    meta: {
      industry: INDUSTRIES.saas,
      engagementType: "New build",
      timeline: "3 weeks",
      platform: "Wix Studio",
      liveUrl: "https://knode.ai",
    },
    challenge: [
      "Knode had a working AI product, a sharp team, and a website that still spoke for the company they were a year ago. Investor conversations were starting, and every one of them began with someone typing knode.ai into a browser.",
      "The brief was direct: look like the company Knode was becoming, not the one they used to be. And do it on a startup timeline, because the fundraise wasn't going to wait for a two-month design phase.",
    ],
    heroShot: {
      src: "/portfolio-slider/knode-ai.jpg",
      alt: "Knode AI homepage: uncover and replicate your sales team's winning formula, with call recordings feeding a coaching plan",
    },
    introduction:
      "Knode is sales coaching software. It reads recorded calls, pinpoints the behaviors that close deals, and turns them into coaching plans a manager can hold a team to. When we met, the product was working and the Series A was in motion. The website was the part that hadn't caught up.",
    approach: [
      {
        heading: "Positioning before pixels",
        body: "Before any design, we worked out what the site had to say and to whom. Knode speaks to two audiences at once: buyers evaluating a sales coaching product, and investors evaluating a company. The structure serves both. Product pages make the case to buyers, while the story and customer proof give investor diligence what it looks for.",
      },
      {
        heading: "A premium build at startup speed",
        body: "Ten pages, designed and built from scratch in Wix Studio, live in three weeks. No template. The design puts real product UI on screen from the first fold, so the site reads like a continuation of what Knode ships, not a brochure about it.",
      },
      {
        heading: "Built to scale with the raise",
        body: "A raise changes a company fast. The site runs on a CMS, so the Knode team ships new pages and customer stories without waiting on a developer. What launched in three weeks keeps growing without us in the loop.",
      },
    ],
    results: [
      { value: "$10M", label: "Series A, in progress" },
      { value: "3 weeks", label: "From kickoff to live" },
    ],
    resultsNote:
      "The site carried Knode into its Series A conversations looking like the company they were becoming.",
    gallery: [
      {
        src: "/casestudies/knode.jpg",
        alt: "Knode AI homepage in a browser window: Uncover and replicate your sales team's winning formula",
      },
      {
        src: "/portfolio-slider/knode-ai.jpg",
        alt: "Knode AI homepage hero, with product UI showing call recordings feeding a coaching plan",
        caption: "The launch hero: real product UI, no stock illustration.",
      },
    ],
    beforeAfter: {
      before: "/before-after/knode-before.jpg",
      after: "/before-after/knode-after.jpg",
    },
    testimonial: quoteOf("gemma-sole"),
    // Scope confirmed by owner: integrations in, copywriting out.
    techUsed: [
      "Positioning & messaging",
      "Web & UI design",
      "Wix Studio build",
      "CMS setup",
      "Integrations",
      "SEO & schema",
    ],
    publishedAt: "2026-08-11",
    seo: {
      title: "Knode AI | SaaS Site Built in 3 Weeks | Zenith Digital",
      description:
        "How Zenith Digital designed and built Knode AI's 10-page Wix Studio site in three weeks, and how it carried the company into a $10M Series A raise.",
    },
  },
  {
    ...cardOf("belistria"),
    // OWNER — remaining items (timeline confirmed: Jan–Feb 2025 build, AEO
    // campaign through 2026; zero rankings lost is confirmed and claimed):
    //   1. Assets: no old-site screenshot, so there's no before/after pair yet.
    //
    // EVIDENCE DEBT (skill v2, Docs/zenith-case-study-SKILL-v2.md §2). This
    // study's figures are true but not yet self-defending on the page. To
    // close it, supply:
    //   a. The 257% comparison: exact GSC periods compared (e.g. "Jan-Mar 2026
    //      vs Jan-Mar 2025") and whether it's brand + non-brand combined.
    //   b. AI visibility 30->70 / 35->75 / 30->80: which tool produced the
    //      scores, how many prompts, language and geography, measurement date,
    //      and what the score represents.
    //   c. "70+ pages ranking": define ranking (indexed / receiving
    //      impressions / top 100 / top 10).
    //   d. "+1000% AI crawler activity": source (server logs? which bots?) and
    //      period compared.
    // Then add a `measurementNote` line under the results block and, per §2,
    // either keep or soften the absolute "the answer AI recommends" claim
    // depending on whether (b) documents a repeatable method.
    //
    // HEADLINE: v2 wants the client named in the H1. Proposed replacement,
    // pending owner approval:
    //   "How Bel'Istria went from losing local search to the answer AI
    //    recommends"
    headline:
      "From losing local search to the answer AI recommends for Istria transfers",
    // No dark-ink Bel'Istria wordmark exists (both files in /logos-dark and
    // /logos are white-on-transparent), so the hero renders the client name.
    stats: [
      { value: "257%", label: "YoY impression growth" },
      { value: "70+", label: "Pages ranking" },
      { value: "8 weeks", label: "Kickoff to launch" },
    ],
    meta: {
      industry: INDUSTRIES.travel,
      engagementType: "Migration & redesign",
      timeline: "8-week build, ongoing since",
      platform: "Wix Studio",
      liveUrl: "https://www.belistria.eu",
    },
    challenge: [
      "The old Bel'Istria site had grown the way many long-running small business sites do: piece by piece, added to by whoever got to it that week. It ran on Wix Classic, didn't work properly on phones, and the design had no through-line. Meanwhile, the search results it depended on were going to local competitors, page after page.",
      "The timing forced the decision. A new season was coming, and every booking it would bring was going to start with a search or, increasingly, a question typed into an AI assistant. The brief was direct: stop losing the searches Bel'Istria should own, and be ready before the season started.",
    ],
    heroShot: {
      src: "/portfolio-blocky/belistria.png",
      alt: "Bel'Istria homepage: luxury travel experiences in Croatia, with chauffeur service and trip planning calls to action",
    },
    introduction:
      "Bel'Istria runs private chauffeur transfers and luxury travel experiences across Istria, Croatia. When they came to us the site was still on Wix Classic: non-responsive, slow, and losing search visibility to nearly every local transfer operator in the region. Over eight weeks in early 2025, from a January kickoff to a late-February launch, we migrated the site to Wix Studio and rebuilt it around individual service pages. Through 2026, we ran a full AEO campaign on top of that foundation.",
    approach: [
      {
        heading: "A migration that raised the floor",
        body: "The move from Wix Classic to Wix Studio carried 35+ pages of content and the blog across with full URL mapping, and not a single ranking was lost in the move. That fixed the structural problems in one step: responsive layouts, modern performance, and a CMS the site could grow on. It launched with room to build, and it has. The site now runs 70+ dynamic pages, all ranking.",
      },
      {
        heading: "One page per service, not one page for everything",
        body: "The old site asked a handful of pages to rank for everything. We rebuilt the architecture around individual pages for each major service cluster: chauffeur services, airport transfers, hotel transfers, events and weddings, and exclusive experiences. Each page targets its own searches, answers its own questions, and books its own customers.",
      },
      {
        heading: "Built to be the answer, not just a result",
        body: "This is where the project went beyond standard SEO. Through 2026, on top of the migrated foundation, we ran a full AEO campaign: an llms.txt file, FAQ content on every service cluster, E-E-A-T content establishing who Bel'Istria is, citation cleanup across the web, and Google Business Profile optimization. The goal was to make Bel'Istria the answer engines' recommendation, not just a link on page one.",
      },
      {
        heading: "Booking built in",
        body: "Two booking flows, one for chauffeur services and one for private trips, so the traffic the new pages earn has somewhere to convert on the spot. One thing we deliberately didn't build on Wix: a custom travel itinerary generator the project surfaced along the way. We scoped it and concluded it belonged off-site rather than forced into the platform. Knowing where Wix Studio's limits are is part of building well on it.",
      },
    ],
    results: [
      {
        value: "257%",
        label: "YoY search impression growth, led by terms the old site never ranked for",
        positive: true,
      },
      { value: "0", label: "Rankings lost in the migration" },
      { value: "30 → 70", label: "AI visibility score, ChatGPT", positive: true },
      { value: "35 → 75", label: "AI visibility score, Gemini", positive: true },
      {
        value: "30 → 80",
        label: "AI visibility score, Perplexity",
        positive: true,
      },
      { value: "+1000%", label: "AI crawler activity", positive: true },
      { value: "70+", label: "Pages live and ranking" },
    ],
    resultsNote:
      "Within a season of the rebuild, Bel'Istria went from being outranked by local competitors to the highlighted recommendation when AI assistants are asked about luxury transfers in Istria. The work continues: ongoing SEO today, with multilingual and hospitality expansion planned next.",
    gallery: [
      {
        src: "/casestudies/belistria.jpg",
        alt: "Bel'Istria site in a browser window, showing the Croatia luxury travel homepage",
      },
      {
        src: "/portfolio-slider/belistria.jpg",
        alt: "Bel'Istria luxury vehicle fleet page, listing chauffeur-driven Mercedes classes with passenger and luggage capacity",
        caption:
          "One page per service cluster, each targeting its own searches.",
      },
    ],
    testimonial: quoteOf("ivan-belobrajdic"),
    techUsed: [
      { label: "Wix Studio migration", href: "/services/website-migration" },
      { label: "SEO & AEO campaign", href: "/services/seo-aeo-ppc" },
      "Service page architecture",
      "Booking systems",
      "Citations & GBP optimization",
    ],
    publishedAt: "2026-08-14",
    cta: {
      heading: ["Want to be the answer", "AI recommends in your market?"],
      paragraph:
        "A free 20-minute call. We'll tell you honestly where your site stands in search and AI answers, and what it would take to fix it.",
    },
    seo: {
      title:
        "Bel'Istria | 257% More Impressions | Zenith Digital",
      description:
        "How Zenith Digital migrated Bel'Istria from Wix Classic to Wix Studio: 257% impression growth, 70+ ranking pages, and top billing in AI answers.",
    },
  },
  {
    ...cardOf("scottish-luxury-experience"),
    // All confirmed (Aug 2026): $521k metric sitewide, name = Scottish Luxury
    // Experience, launched December 2025, Flynn signed off on Zenith as
    // development partner on this and all MOD-related projects. Flynn's quote
    // stands as the partner voice by choice.
    headline: "The website behind $521k of luxury trips in seven months",
    stats: [
      { value: "4 weeks", label: "Kickoff to launch" },
      { value: "$521k", label: "Revenue in the first 7 months" },
      { value: "£15k–£100k", label: "Trips sold through the site" },
    ],
    meta: {
      industry: INDUSTRIES.travel,
      engagementType: "Partnership build with MOD Digital",
      timeline: "4 weeks",
      platform: "Wix Studio",
      liveUrl: "https://www.scottishluxuryexperience.com",
    },
    challenge: [
      "Scottish Luxury Experience sells bespoke luxury trips across Scotland, priced from £15k to £100k per journey. Its three founders had the heritage, the supplier network, and a genuinely premium product. What they didn't have was a website worthy of it, and the constraint that shaped the whole build came straight from the price tag: a brand selling £100k journeys cannot look mass-market at any touchpoint.",
      "The deadline was just as fixed. MOD Digital was building the growth engine around the brand, the ad calendar was already set, and the site had to be live before the first campaign spent a pound. Four weeks, no slack.",
    ],
    heroShot: {
      src: "/casestudies/scottishluxury.jpg",
      alt: "Scottish Luxury Experience homepage: Discover Scotland, with a Highland cow hero and bespoke trip planning prompts",
    },
    introduction:
      "Zenith Digital designed and built the Scottish Luxury Experience website in Wix Studio in four weeks, launching in December 2025: the layer every client sees first, in front of the demand and sales system MOD Digital runs behind it. Within seven months of launch, the engine the site fronts had turned paid traffic into $521k of booked trips.",
    approach: [
      {
        heading: "Luxury you can feel before you enquire",
        body: "The design brief came from the price tag. Cinematic Scotland imagery, restrained type, and pacing that lets the destination sell itself. Nothing that could read as a template, because nothing about a £15k trip should. The job of every fold is to make a five-figure enquiry feel like the natural next step.",
      },
      {
        heading: "A landing layer built for paid traffic",
        body: "This site earns its keep under ad spend. Every page is message-matched to the campaigns that feed it, loads fast enough to not waste a click, and points at one action. Luxury pacing and conversion discipline usually pull in opposite directions; the build's real work was making them agree.",
      },
      {
        heading: "An enquiry flow that respects the price tag",
        body: "You don't add a £40k trip to a cart. The enquiry flow is built for considered purchases: it gathers what the sales conversation needs, then hands the client into the founders' reveal-call process without friction. The website's job ends exactly where the human conversation should begin.",
      },
      {
        heading: "Two teams, one deadline",
        body: "This was a partnership build in the shape our white-label work runs: MOD Digital owned strategy, demand, CRM, and the AI proposal engine; Zenith built the website that fronts all of it. Clear lanes, one four-week deadline, no seams a client would ever see. The CRM and proposal stack are MOD's work, not ours, and the results below belong to the system, not the site alone.",
      },
    ],
    results: [
      {
        value: "$521k",
        label: "Trip revenue within 7 months of launch (full system, MOD + Zenith)",
        positive: true,
      },
      {
        value: "48x",
        label: "Return on ad spend across the growth engine",
        positive: true,
      },
      { value: "4 weeks", label: "Website build, kickoff to launch" },
      { value: "£5m", label: "Revenue tracking for end of 2026" },
    ],
    resultsNote:
      "Within seven months of Zenith Digital shipping the Scottish Luxury Experience website, the growth system it fronts, run in partnership with MOD Digital, had turned paid traffic into $521k of booked luxury travel.",
    gallery: [
      {
        src: "/case-study-grid/scottish-luxury-experience.webp",
        alt: "Scottish Luxury Experience site in a browser window, Discover Scotland hero with trip planning prompts",
      },
    ],
    testimonial: quoteOf("flynn-blackie"),
    techUsed: [
      {
        label: "Wix Studio design & build",
        href: "/services/wix-studio-website-design",
      },
      { label: "Campaign landing layer", href: "/services/landing-pages" },
      "Booking & enquiry flows",
      { label: "Partnership build", href: "/partnerships" },
    ],
    publishedAt: "2026-08-14",
    cta: {
      heading: ["Selling something premium?", "The website has to prove it first."],
      paragraph:
        "A free 20-minute call. We'll tell you honestly whether your site looks like your price tag, and what it would take to fix it.",
    },
    seo: {
      title:
        "Scottish Luxury | $521k in 7 Months | Zenith Digital",
      description:
        "Zenith Digital built Scottish Luxury Experience's Wix Studio site in 4 weeks. The growth system it fronts turned paid traffic into $521k in 7 months.",
    },
  },
  {
    ...cardOf("yacht-junky"),
    // OWNER — one remaining item: no business metrics yet, so every figure
    // below is a platform fact (features, architecture), never an invented
    // outcome. When listing counts / enquiry volumes exist, send them and the
    // results block upgrades from capability proof to business proof.
    headline: "A multi-seller yacht marketplace, built entirely inside Wix Studio",
    stats: [
      { value: "100%", label: "Wix Studio native, no external stack" },
      { value: "7", label: "Marketplace features built with Velo and CMS" },
      { value: "2-sided", label: "Buyers and private sellers on one platform" },
    ],
    meta: {
      industry: INDUSTRIES.marine,
      engagementType: "Partnership build with MOD Digital",
      timeline: "4 weeks",
      platform: "Wix Studio + Velo",
      liveUrl: "https://moddigital.wixstudio.com/yacht-junky",
    },
    challenge: [
      "A boat and yacht marketplace has real platform requirements: sellers who list and manage inventory, buyers who search and filter their way to one specific vessel, and enquiries that have to reach the right private seller without publishing anyone's contact details. The usual answer is a custom development budget and months of build.",
      "The brief was to prove the usual answer wrong: build the whole thing as a native Wix Studio platform, so it ships at Wix Studio speed and the team runs it without a developer on retainer.",
    ],
    heroShot: {
      src: "/case-study-grid/yacht-junky.webp",
      alt: "Yacht Junky marketplace homepage: the ultimate boat and yacht marketplace, with category search and featured listings",
    },
    introduction:
      "Yacht Junky is a multi-seller marketplace where dealers and private owners list boats and yachts, and buyers search, compare, and enquire. Zenith Digital built it entirely inside Wix Studio, using the native CMS as the data layer and Velo for everything the platform needed beyond it: seller notifications, enquiry history, private contact routing, and currency conversion.",
    approach: [
      {
        heading: "The CMS as a marketplace database",
        body: "Listings, sellers, and enquiries live in Wix Studio's native CMS collections, related to each other the way a marketplace database should be. Every listing page is generated dynamically from the data, so a new vessel is a content entry, not a build task, and the catalog scales without anyone touching a page.",
      },
      {
        heading: "Search that thinks like a boat buyer",
        body: "Nobody buys a yacht from a category page. The search layer runs detailed filters across the specs buyers actually shortlist on, and prices convert between currencies on the fly, because boat buyers and boat sellers are rarely in the same country.",
      },
      {
        heading: "Velo where the platform outgrows the page",
        body: "The marketplace mechanics are custom Velo code: sellers get email notifications the moment an enquiry lands, buyers build an enquiry history as they shortlist, and private sellers stay reachable without their contact details ever being published. That's the layer that separates a platform from a listings brochure.",
      },
      {
        heading: "Why native matters",
        body: "The same build on a custom stack means hosting, maintenance, and a developer relationship for the life of the product. Native means the team edits everything the way they'd edit any Wix site. The honest trade-off: a platform that outgrows these mechanics, with payments, escrow, or seller dashboards, eventually argues for custom. This build shows how far the platform genuinely goes before that day, and it's further than most agencies will tell you.",
      },
    ],
    results: [
      { value: "7", label: "Marketplace features shipped on the native platform" },
      { value: "0", label: "External services, databases, or hosting added" },
      {
        value: "100%",
        label: "Owner-editable, no developer needed to run it",
      },
    ],
    resultsNote:
      "Yacht Junky runs listings, filtered search, enquiries, seller notifications, and currency conversion entirely inside Wix Studio. Zenith Digital built it with Velo and the native CMS, and the platform ceiling is higher than most agencies will tell you.",
    gallery: [
      {
        src: "/case-study-grid/yacht-junky.webp",
        alt: "Yacht Junky marketplace in a browser window, showing the boat and yacht listing grid with search filters",
      },
    ],
    // Flynn as partner voice — this was a MOD collaboration, per owner.
    testimonial: quoteOf("flynn-blackie"),
    techUsed: [
      {
        label: "Wix Studio development",
        href: "/services/wix-studio-development",
      },
      "Velo custom code",
      "CMS architecture",
      "Marketplace UX",
      "Email automations",
      "Currency conversion",
    ],
    publishedAt: "2026-08-14",
    cta: {
      heading: ["Need more than", "a marketing site?"],
      paragraph:
        "Custom functionality, CMS platforms, and marketplace builds on Wix Studio. A free 20-minute call, and we'll tell you honestly whether your idea fits the platform or needs custom.",
    },
    seo: {
      title:
        "Yacht Junky | A Wix Studio Marketplace | Zenith Digital",
      description:
        "Zenith Digital built a multi-seller boat and yacht marketplace natively in Wix Studio: Velo-powered search, seller notifications, and currency conversion.",
    },
  },
  {
    ...cardOf("mod-digital"),
    // Partnership facts confirmed by owner (Aug 2026): met 2022, working
    // officially since 2023, per-project basis, MOD owns strategy/ads/client
    // comms, Zenith owns design/build/technical. Project list from owner.
    // 220% bookings figure retired by owner decision; quantity of work leads.
    headline:
      "How MOD Digital ships premium websites without an in-house build team",
    stats: [
      { value: "3 years", label: "As MOD Digital's build partner" },
      { value: "10+", label: "Client brands shipped together" },
      { value: "€1M+", label: "Campaign revenue on partnership builds" },
    ],
    meta: {
      industry: INDUSTRIES.agencies,
      engagementType: "Agency production partnership",
      timeline: "Since 2023, ongoing",
      platform: "Wix Studio + Velo",
      liveUrl: "https://www.moddigital.co.uk",
    },
    challenge: [
      "MOD Digital is a UK growth marketing agency. Its campaigns live or die on the pages they land on, and every new engagement needs those pages designed, built, and live before the first pound of ad spend. That leaves a growing agency with two bad options: carry the overhead of an in-house build team, or gamble the campaign calendar on freelancers who might not answer next month.",
      "The two teams met in 2022 and started working officially in 2023. The brief has stayed the same since: MOD sells and runs the growth, Zenith builds everything the growth runs on, and no client ever feels a gap between the two.",
    ],
    heroShot: {
      src: "/case-study-grid/mod-digital.webp",
      alt: "MOD Digital's AI-ready websites landing page in a browser window, one of the pages Zenith built for the agency itself",
    },
    introduction:
      "MOD Digital is a UK growth marketing agency. Since 2023, Zenith Digital has been its web design and development partner, building the landing pages, e-commerce stores, full websites, and custom platforms its campaigns run on. Three years in, that covers 10+ client brands, 15+ landing pages, and a set of pages for MOD itself, most of it built in Wix Studio.",
    approach: [
      {
        heading: "A fractional team, not a vendor",
        body: "The arrangement works because it doesn't feel like outsourcing from the inside. Zenith joins MOD's client meetings and leads the web parts of them when that's useful. Briefs get challenged, not just executed. The lanes are clean: MOD owns strategy, ads, and the client relationship, Zenith owns design, build, and everything technical. After three years the handoff between the two has no visible join, which is the entire point.",
      },
      {
        heading: "Whatever the campaign needs built",
        body: "There's no retainer and no fixed scope. Each project arrives on its own terms: campaign landing pages, e-commerce stores, full site builds, and custom Velo code when a brief outgrows the page. Under the partnership Zenith has built for Hunting Brook Gardens, Issipay, Cognifit, Kevan Christie, JMJ Financials, Coastal Oak Insurance, Bradsells, and MOD's own landing pages, among others. The range is the feature: MOD can say yes to a brief knowing the build side is covered.",
      },
      {
        heading: "Proof you can click through",
        body: "Two partnership builds have their own case studies on this site. Scottish Luxury Experience is the flagship: a luxury travel site built in four weeks that fronts $521k of booked trips in its first seven months. Yacht Junky is the technical one: a multi-seller boat marketplace built natively in Wix Studio with Velo. Both shipped under the same division of labour described here.",
      },
      {
        heading: "Whose numbers are whose",
        body: "An honest line matters more in a partnership study than anywhere else. The campaign revenue below belongs to MOD's campaigns; Zenith built the pages those campaigns land on, and claims exactly that. We don't run the ads, and MOD doesn't build the sites. Three years in, neither side has needed to blur that line to look good.",
      },
    ],
    results: [
      {
        value: "€1M+",
        label: "Client campaign revenue on pages built under the partnership",
        positive: true,
      },
      { value: "10+", label: "Client brands designed and built for MOD" },
      { value: "15+", label: "Landing pages shipped" },
      { value: "3 years", label: "Running, still per-project" },
    ],
    resultsNote:
      "Three years after MOD Digital first handed Zenith Digital a build, the partnership has shipped 10+ client brands and the pages behind €1M+ of campaign revenue, still on a per-project basis, with no retainer holding it together.",
    gallery: [
      {
        src: "/case-study-grid/mod-digital.webp",
        alt: "MOD Digital AI-ready websites page in a browser window, built by Zenith under the partnership",
      },
      // OWNER: 2-3 lander screenshots (Hunting Brook, Issipay, MOD's own
      // pages) would show the range here instead of one shot.
    ],
    testimonial: quoteOf("flynn-blackie"),
    techUsed: [
      { label: "Landing pages", href: "/services/landing-pages" },
      {
        label: "Wix Studio design & build",
        href: "/services/wix-studio-website-design",
      },
      "E-commerce builds",
      "Velo custom code",
      { label: "White-label partnership", href: "/partnerships" },
    ],
    publishedAt: "2026-08-14",
    cta: {
      heading: ["Running an agency", "without a build team?"],
      paragraph:
        "This is what our partner tracks exist for. A free 20-minute call, and we'll walk you through how white-label production works and what your calendar could hand off first.",
    },
    seo: {
      title: "MOD Digital | 3 Years as Build Partner | Zenith Digital",
      description:
        "How Zenith Digital became MOD Digital's build partner: 10+ client brands, 15+ landing pages, and €1M+ in campaign revenue since 2023.",
    },
  },
  {
    ...cardOf("hunting-brook-gardens"),
    // Facts from owner (Aug 2026): 7-8 landing pages so far for course
    // launches and in-person events; courses on Wix Courses; custom Typeform
    // itinerary signup forms; ongoing 2025-2026; old site was bare bones and
    // not focused on the course offer; €140k in course sales since the
    // collaboration started; MOD partnership, Flynn as testimonial voice.
    headline: "From a bare-bones site to €140k in course sales",
    stats: [
      { value: "€140k", label: "Course sales since the collaboration began" },
      { value: "7+", label: "Landing pages built so far" },
      { value: "2 years", label: "Of ongoing launch work" },
    ],
    meta: {
      industry: INDUSTRIES.courses,
      engagementType: "Partnership build with MOD Digital",
      timeline: "Ongoing, 2025 to 2026",
      platform: "Wix Courses + Typeform",
      liveUrl: "https://unlimited.huntingbrookgardens.com/plantsperson-course",
    },
    challenge: [
      "Jimi Blake had the following most course creators would kill for: the reputation of Hunting Brook Gardens, sold-out in-person teaching, and gardeners around the world who wanted more of it. The website wasn't built to carry any of that. It existed, but it was bare bones, and the course offer, the thing the audience actually wanted to buy, was nowhere near the centre of it.",
      "MOD Digital came in to run the growth around the offer. The brief to Zenith was the build side of that: give every course launch and live event a page built to sell it, and infrastructure a gardener can run without a developer on call.",
    ],
    heroShot: {
      src: "/case-study-grid/hunting-brook.webp",
      alt: "Hunting Brook Gardens plantsperson course landing page in a browser window, with Jimi Blake's course offer front and centre",
    },
    introduction:
      "Hunting Brook Gardens is where Irish gardener Jimi Blake grows, teaches, and runs his plantsperson courses. Since 2025, Zenith Digital has designed and built the landing pages his course launches and in-person events sell through, seven and counting, hosted on Wix Courses with custom Typeform signup flows, inside the growth system MOD Digital runs. Since the collaboration began, those launches have sold €140k of courses and events.",
    approach: [
      {
        heading: "One launch, one page",
        body: "Instead of one site asked to sell everything, every course launch and in-person event gets its own landing page, built to match the campaign that feeds it. Seven or eight have shipped so far and the count keeps rising, because the model is repeatable: MOD plans the launch, Zenith builds the page, and the audience lands on something written for exactly the offer they clicked on.",
      },
      {
        heading: "Courses that run themselves",
        body: "The online courses are hosted on Wix Courses, so the sales page, checkout, and course delivery live in one system the team manages like any other content. No plugin stack to babysit and no developer needed to enrol a student, which matters when the business is a working garden, not a software company.",
      },
      {
        heading: "Typeform where forms need to think",
        body: "In-person events need more from a signup than a name and an email. The itinerary signup flows are custom-built in Typeform, gathering what each event actually needs ahead of time and keeping the booking experience as considered as the teaching it leads to.",
      },
      {
        heading: "Built launch by launch",
        body: "This was never a big-bang rebuild. The work has run continuously through 2025 and 2026, page by page, and it has deliberately gone where the revenue is: the launch pages, not a wall-to-wall redesign. Every hour spent has gone into pages that sell something specific. The €140k below belongs to the full system, MOD's campaigns and Zenith's pages together.",
      },
    ],
    results: [
      {
        value: "€140k",
        label:
          "Course and event sales since the collaboration began (full system, MOD + Zenith)",
        positive: true,
      },
      { value: "7+", label: "Landing pages shipped, more with every launch" },
    ],
    resultsNote:
      "Since the collaboration began, the landing pages Zenith Digital builds inside MOD Digital's Hunting Brook campaigns have carried €140k of course and event sales for Jimi Blake.",
    gallery: [
      {
        src: "/case-study-grid/hunting-brook.webp",
        alt: "Hunting Brook Gardens course landing page in a browser window, built to sell Jimi Blake's plantsperson course",
      },
    ],
    beforeAfter: {
      before: "/before-after/huntingbrook-before.jpg",
      after: "/before-after/huntingbrook-after.jpg",
    },
    // Flynn as partner voice, per owner. His signoff covers MOD projects.
    testimonial: quoteOf("flynn-blackie"),
    techUsed: [
      { label: "Landing pages", href: "/services/landing-pages" },
      "Wix Courses setup",
      "Typeform signup flows",
      { label: "Partnership build", href: "/partnerships" },
    ],
    publishedAt: "2026-08-14",
    cta: {
      heading: ["Selling a course", "from a page that doesn't?"],
      paragraph:
        "A free 20-minute call. We'll tell you honestly whether your launch pages are doing the selling, and what it would take to fix them.",
    },
    seo: {
      title:
        "Hunting Brook | €140k in Course Sales | Zenith Digital",
      description:
        "How Zenith Digital builds the launch pages behind Jimi Blake's Hunting Brook courses: 7+ pages on Wix Courses, and €140k in course and event sales.",
    },
  },
  {
    ...cardOf("katie-hailey"),
    // Facts from owner (Aug 2026): full Wix Studio build from a Figma design
    // in 1.5 weeks; client handoff sections for self-maintenance; Wix Events
    // for event booking; CMS/CRM setup.
    // Framing confirmed by owner (Aug 2026): the Figma design came from
    // Katie's side; Zenith built it. Development-engagement story stands.
    headline: "From a finished Figma file to a live site in a week and a half",
    stats: [
      { value: "1.5 weeks", label: "Figma to launch" },
      { value: "3", label: "Systems handed over: CMS, CRM, events" },
      { value: "100%", label: "Owner-run after handoff" },
    ],
    meta: {
      industry: INDUSTRIES.coaches,
      engagementType: "Development build",
      timeline: "1.5 weeks",
      platform: "Wix Studio",
      liveUrl: "https://www.katiehailey.com",
    },
    challenge: [
      "Katie Hailey teaches yoga and sound healing and runs retreats and events, and her website design was already done, sitting in Figma. That's where a lot of projects stall: a finished design doesn't take a single booking, and the usual routes from file to live site are a slow dev quote or a rebuild into whatever a template allows.",
      "The brief was to close that gap without compromising either side of it: build the design as designed, get it live fast, and leave behind a site Katie runs herself, because a solo practitioner shouldn't need a developer on call to update a class schedule.",
    ],
    heroShot: {
      src: "/case-study-grid/katie-hailey.webp",
      alt: "Katie Hailey website in a browser window, showing yoga and sound healing offerings with retreat booking",
    },
    introduction:
      "Katie Hailey is a yoga and sound healing practitioner who runs classes, retreats, and events. Zenith Digital took her finished Figma design and built it as a full Wix Studio site in a week and a half, with Wix Events handling event bookings, and CMS and CRM systems set up and handed over so she maintains the site herself.",
    approach: [
      {
        heading: "The design as designed",
        body: "A build from someone else's design file is a discipline of its own: the job is fidelity, not reinterpretation. The Figma file was treated as the contract, and the Wix Studio build matches it, responsive behavior included, rather than bending the design toward whatever would have been quickest to assemble.",
      },
      {
        heading: "Bookings without a booking stack",
        body: "Classes, retreats, and events book through Wix Events, native to the platform the site already runs on. No third-party booking widget bolted on, no separate subscription to manage, and every booking lands in the same CRM the rest of the site feeds.",
      },
      {
        heading: "Handed over, not held hostage",
        body: "Self-maintenance was scoped as a deliverable, not left as an afterthought. The build includes dedicated handoff sections Katie edits directly, a CMS structured around the content she actually changes, and a CRM that collects enquiries and attendees in one place. The honest trade-off of building this way: it takes longer than locking everything down, and it's the reason the engagement ends with the client needing us less, not more.",
      },
    ],
    results: [
      { value: "1.5 weeks", label: "From Figma file to live site" },
      {
        value: "3",
        label: "Systems set up and handed over: CMS, CRM, and event booking",
      },
      { value: "0", label: "Developer needed to run it since" },
    ],
    resultsNote:
      "Zenith Digital turned Katie Hailey's finished Figma design into a live Wix Studio site in a week and a half, with event booking, CMS, and CRM set up and handed over for her to run herself.",
    gallery: [
      {
        src: "/case-study-grid/katie-hailey.webp",
        alt: "Katie Hailey site in a browser window, yoga and retreat pages built in Wix Studio from the Figma design",
      },
    ],
    techUsed: [
      {
        label: "Wix Studio development",
        href: "/services/wix-studio-development",
      },
      "Figma to Wix Studio build",
      "Wix Events booking",
      "CMS & CRM setup",
      "Client handoff & training",
    ],
    publishedAt: "2026-08-14",
    cta: {
      heading: ["Have a design", "that needs building?"],
      paragraph:
        "A free 20-minute call. Bring the Figma file, and we'll tell you honestly what it takes to make it live, and how fast.",
    },
    seo: {
      title:
        "Katie Hailey | Figma to Live in 1.5 Weeks | Zenith Digital",
      description:
        "Zenith Digital built Katie Hailey's yoga and retreat site in Wix Studio from a finished Figma design in 1.5 weeks, with booking, CMS, and CRM handed over.",
    },
  },
  {
    ...cardOf("just-stay"),
    // Facts from owner (Aug 2026): 1-month delivery, January 2026; short-let
    // property business; Bookeddirectly integration via Zapier pulling latest
    // properties; location-based SEO pages; lead magnet forms; Airbnb
    // superhost; site is a funnel to booking + landlord info collection.
    // Platform (Wix Studio) and testimonial (Jack Shorrock) confirmed by
    // owner, Aug 2026.
    headline: "One website, two funnels: guest bookings and landlord leads",
    stats: [
      { value: "4 weeks", label: "Kickoff to launch" },
      { value: "2", label: "Funnels: stays booked, properties signed" },
      { value: "0", label: "Manual property updates needed" },
    ],
    meta: {
      industry: INDUSTRIES.travel,
      engagementType: "New build",
      timeline: "4 weeks, January 2026",
      platform: "Wix Studio",
      liveUrl: "https://www.juststaytoday.co.uk",
    },
    challenge: [
      "Just Stay runs a short-let property business with Airbnb superhost status, which is both the proof of how well they host and a description of the problem: every booking that comes through a platform pays commission and belongs, as a relationship, to the platform. Growing the business also means more than filling the properties they have. It means convincing landlords to hand theirs over.",
      "So the brief wasn't a brochure site. It was a machine with two intakes: send guests into the direct booking service, and turn property owners into landlord enquiries, live within a month.",
    ],
    heroShot: {
      src: "/case-study-grid/just-stay.webp",
      alt: "Just Stay website in a browser window, showing short-let properties with direct booking calls to action",
    },
    introduction:
      "Just Stay is a UK short-let property business and Airbnb superhost. In January 2026, Zenith Digital designed and built its website in four weeks as a two-sided funnel: guests route into direct booking, with the property list synced automatically from Bookeddirectly through Zapier, and landlords route into a lead pipeline for letting their properties through Just Stay.",
    approach: [
      {
        heading: "Built as a funnel, not a brochure",
        body: "Every page has a job and both jobs are measurable: book a stay, or start a landlord conversation. Lead magnet forms capture the visitors who aren't ready for either yet, so the site earns something from every kind of arrival instead of only the ones ready to transact today.",
      },
      {
        heading: "Properties that update themselves",
        body: "The property list syncs from Bookeddirectly through Zapier, so what's live on the site is what's actually bookable, without anyone re-uploading listings. For a portfolio that changes as landlords join, that's the difference between a site that stays accurate and one that quietly rots.",
      },
      {
        heading: "SEO by location, where guests actually search",
        body: "Nobody searches for a short-let company by name until they already know it. They search by place. The build includes location-based SEO pages, each targeting the searches for its own area, the same one-page-per-cluster architecture we run on travel builds like Bel'Istria.",
      },
      {
        heading: "The landlord side",
        body: "The quieter funnel matters more long-term: landlord acquisition is how the portfolio grows. The site collects landlord information through dedicated capture flows and hands it to the team ready to work. One honest caveat on this study: the site launched in January 2026, and we'd rather publish its booking and landlord numbers when they've matured than dress the page with early ones.",
      },
    ],
    results: [
      { value: "4 weeks", label: "Kickoff to launch, January 2026" },
      {
        value: "2",
        label: "Funnels on one site: guest bookings and landlord leads",
      },
      {
        value: "0",
        label: "Manual property updates: listings sync from Bookeddirectly",
      },
    ],
    resultsNote:
      "Zenith Digital built Just Stay's short-let website as a two-sided funnel in four weeks: guests into direct booking, landlords into a lead pipeline, and location pages targeting the searches each area serves. Performance numbers will follow as they mature.",
    gallery: [
      {
        src: "/case-study-grid/just-stay.webp",
        alt: "Just Stay short-let website in a browser window, property grid synced from Bookeddirectly",
      },
    ],
    testimonial: quoteOf("jack-shorrock"),
    techUsed: [
      {
        label: "Wix Studio design & build",
        href: "/services/wix-studio-website-design",
      },
      "Bookeddirectly + Zapier integration",
      { label: "Location SEO pages", href: "/services/seo-aeo-ppc" },
      "Lead magnet funnels",
      "Landlord lead capture",
    ],
    publishedAt: "2026-08-14",
    cta: {
      heading: ["Depending on a platform", "for every booking?"],
      paragraph:
        "A free 20-minute call. We'll tell you honestly what a direct booking funnel would take for your properties, and whether it's worth it yet.",
    },
    seo: {
      title: "Just Stay | A Two-Funnel Booking Site | Zenith Digital",
      description:
        "How Zenith Digital built Just Stay's short-let site in 4 weeks: direct bookings synced from Bookeddirectly, location SEO pages, and a landlord funnel.",
    },
  },
  {
    ...cardOf("genroks-ai"),
    // Facts from owner (Aug 2026): summer 2025 (July-August); old site was a
    // dismantled Framer template used mid-sales-process, conflicting brand
    // identities; rebuilt in custom code with Sanity CMS, custom animations,
    // interactive lead magnets, intake forms, booking funnel; Zenith scope =
    // design, copywriting, SEO/AEO; since launch 10+ ISO projects closed,
    // 3+ consulting houses reselling, Helsinki conference presented via site.
    // Product line confirmed by owner (Aug 2026): "AI-powered ISO compliance
    // platform for startups."
    headline: "From a falling-apart template to 10+ ISO deals closed",
    stats: [
      { value: "10+", label: "ISO certification projects closed since launch" },
      { value: "3+", label: "Consulting houses reselling the software" },
      { value: "100%", label: "Custom code, no template" },
    ],
    meta: {
      industry: INDUSTRIES.saas,
      engagementType: "Rebrand & custom build",
      timeline: "July to August 2025",
      platform: "Custom code + Sanity CMS",
      liveUrl: "https://www.genroks.com",
    },
    challenge: [
      "Genroks sells an AI-powered ISO compliance platform to startups, and its sales process leaned on the website hard: prospects got sent the link mid-conversation, as the credibility check between a good call and a signed deal. What they landed on was a Framer template coming apart at the seams, carrying two conflicting brand identities and a choppy, assembled look. For a company selling rigour, the site was arguing against the pitch.",
      "The brief covered the whole surface: one brand instead of two, copy that sells the product, and a build that matches how Genroks positions itself, which meant no template of any kind this time.",
    ],
    heroShot: {
      src: "/case-study-grid/genroks.webp",
      alt: "Genroks AI website in a browser window, showing the rebranded compliance software homepage",
    },
    introduction:
      "Genroks is an AI-powered ISO compliance platform for startups. In July and August 2025, Zenith Digital redesigned, rewrote, and rebuilt the Genroks website in custom code with Sanity CMS, replacing the Framer template its sales process had outgrown. Since launch, Genroks has closed 10+ ISO certification projects and signed 3+ consulting houses to resell the software.",
    approach: [
      {
        heading: "Custom code, on principle",
        body: "Genroks positions itself as agent-native, so its website couldn't be a template with the seams showing. The rebuild is custom code end to end, with custom-built animations doing the demonstrating: the site moves the way the product thinks. It's the same up-tier we apply to our own site, and Genroks is the proof it sells: this is what we build when the platform ceiling is the wrong ceiling.",
      },
      {
        heading: "One brand, written to close",
        body: "The old site's two conflicting identities got resolved into one, and the copywriting was part of the engagement, not an afterthought. Every page now argues the same case in the same voice, which matters most in exactly the moment Genroks uses the site: forwarded to a prospect who's deciding whether this company is rigorous enough to run their certification.",
      },
      {
        heading: "Sanity behind everything",
        body: "The content layer runs on Sanity CMS, so the Genroks team edits pages, publishes changes, and keeps the site current without touching the codebase. Custom code with an editable back end is the combination that makes a custom build livable for a startup team.",
      },
      {
        heading: "A site that opens conversations",
        body: "The rebuild treats the site as sales infrastructure, not a brochure. Interactive lead magnets earn contact details, intake forms qualify prospects before anyone gets on a call, and a booking funnel turns interest into scheduled conversations. SEO and AEO work runs underneath, so the site surfaces for the compliance questions its buyers ask, including the ones they now ask AI assistants.",
      },
    ],
    results: [
      {
        value: "10+",
        label: "ISO certification projects closed since launch",
        positive: true,
      },
      {
        value: "3+",
        label: "Consulting houses signed to resell the software",
        positive: true,
      },
      {
        value: "Conversion skyrocketed",
        label: "Uroš Stanimirović, Genroks founder, on the rebrand",
        isQuote: true,
      },
    ],
    resultsNote:
      "Since Zenith Digital shipped the rebuild, Genroks has closed 10+ ISO certification projects, signed 3+ consulting houses to resell its software, and presented at a Helsinki industry conference using the site itself as the deck.",
    gallery: [
      {
        src: "/case-study-grid/genroks.webp",
        alt: "Genroks AI rebranded website in a browser window, custom-coded with Sanity CMS behind it",
      },
    ],
    testimonial: quoteOf("uros-stanimirovic"),
    techUsed: [
      "Custom code build",
      "Sanity CMS",
      "Brand & web design",
      "Copywriting",
      { label: "SEO & AEO", href: "/services/seo-aeo-ppc" },
      "Lead magnets & booking funnel",
    ],
    publishedAt: "2026-08-14",
    cta: {
      heading: ["Outgrown the template", "your site started on?"],
      paragraph:
        "A free 20-minute call. We'll tell you honestly whether your site needs a refresh, a rebrand, or a custom build, and when custom code is actually worth it.",
    },
    seo: {
      title:
        "Genroks | 10+ ISO Deals After a Rebrand | Zenith Digital",
      description:
        "How Zenith Digital rebuilt Genroks' site in custom code with Sanity CMS: one brand, new copy, and 10+ ISO certification deals closed since launch.",
    },
  },
];

/** Slugs with a shipped detail page — their cards flip to internal links. */
export const detailSlugs = new Set(caseStudyDetails.map((d) => d.slug));

export function getCaseStudyDetail(slug: string): CaseStudyDetail | undefined {
  return caseStudyDetails.find((d) => d.slug === slug);
}

// Final CTA band shared by all detail pages.
export const csDetailCta = {
  heading: ["Want numbers like these", "on your site?"],
  paragraph:
    "A free 20-minute call. We'll tell you honestly what's holding your site back, and what it would take to fix it.",
  cta: { label: "Book a call", href: "/book-a-call" },
  ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
  image: "/textures/studio-texture.jpg",
};

// All client logos for the double marquee strip (blue marks on light).
export const clientLogos = [
  { src: "/logos-blue/knode.avif", alt: "Knode AI" },
  { src: "/logos-blue/mod.avif", alt: "MOD Digital" },
  { src: "/logos-blue/capacity.avif", alt: "Capacity" },
  { src: "/logos-blue/techtonnik.png", alt: "Techtonnik" },
  { src: "/logos-blue/genroks.avif", alt: "Genroks AI" },
  { src: "/logos-blue/stilby.png", alt: "Stilby" },
  { src: "/logos-blue/foxstays.avif", alt: "FoxStays" },
  { src: "/logos-blue/jimsteele.avif", alt: "Jim Steele" },
  { src: "/logos-blue/advantage.avif", alt: "AdVantage" },
  { src: "/logos-blue/foxenergy.avif", alt: "Fox Energy" },
  { src: "/logos-blue/notyou.avif", alt: "NOTYOU" },
  { src: "/logos-blue/kema.avif", alt: "Kema Coatings" },
  { src: "/logos-blue/empyrean.avif", alt: "Empyrean Global" },
  { src: "/logos-blue/lmfhr.avif", alt: "LMF HR" },
  { src: "/logos-blue/boomboom.avif", alt: "BoomBoom Creatives" },
  { src: "/logos-blue/juststay.png", alt: "Just Stay" },
  { src: "/logos-blue/creatify.avif", alt: "Creatify Collective" },
];

// ---- /case-studies page copy ----

// 1. Hero (dark, compact). Sitewide count locked at 100+ (owner decision,
// Aug 2026). The audit page's "97+ websites analyzed" is a different claim
// (audits run, not sites built) and stays.
// Auto-sliding artwork gallery under the hero. One vertical artwork per client
// (owner-supplied); the clothing-brand industry image is the placeholder until
// the real set lands.
/**
 * Portrait brand cards for the marquee under the /case-studies hero. 1080x1350
 * (4:5) WebP at q82, converted from the source PNGs (19MB down to 1.2MB).
 *
 * The order alternates light and dark rather than running alphabetically. Seven
 * of these are near-black and eight are light, so two darks side by side read as
 * one wide card. Fifteen items can't alternate perfectly around a loop, so the
 * one same-tone seam is placed between the two least similar lights: Maodus
 * (the cream sketch) wrapping back to Jimi Blake (dusk garden).
 */
export const csGallery = {
  items: [
    { image: "/case-study-cards/jimi-blake.webp", alt: "Jimi Blake" },
    { image: "/case-study-cards/techtonnik.webp", alt: "Techtonnik" },
    { image: "/case-study-cards/foxstays.webp", alt: "FoxStays" },
    { image: "/case-study-cards/atw.webp", alt: "ATW Trucking" },
    { image: "/case-study-cards/jim-steele.webp", alt: "Jim Steele" },
    { image: "/case-study-cards/belistria.webp", alt: "Bel'Istria" },
    { image: "/case-study-cards/yacht-junky.webp", alt: "Yacht Junky" },
    { image: "/case-study-cards/notyou.webp", alt: "NotYou Brand" },
    { image: "/case-study-cards/lmfhr.webp", alt: "LMF HR" },
    { image: "/case-study-cards/777.webp", alt: "777 Lucky Club" },
    { image: "/case-study-cards/genroks.webp", alt: "Genroks AI" },
    {
      image: "/case-study-cards/wellington-web-co.webp",
      alt: "Wellington Web Co",
    },
    { image: "/case-study-cards/stilby.webp", alt: "Stilby" },
    { image: "/case-study-cards/capacity.webp", alt: "Capacity" },
    { image: "/case-study-cards/maodus.webp", alt: "Destilerija Maodus" },
  ],
};

export const csHero = {
  // H1 carries the "Wix Studio website examples" search intent the meta title
  // targets; the brand sentence moved down into `support`.
  heading: "Wix Studio website examples",
  headingMuted: "with the business results attached.",
  support:
    "We partner with founders, marketing teams, and small businesses, turning websites and SEO into assets that compound. These aren't showcase sites built to impress other designers. They're working websites built for real businesses, with specific problems to solve and real outcomes attached.",
  stats: [
    { value: "100+", label: "Websites" },
    { value: "€1M+", label: "Client revenue" },
    { value: "5.96x", label: "Average ROAS" },
    { value: "7+", label: "Industries" },
  ],
  ctas: [
    {
      label: "Book a call",
      href: "/book-a-call",
      variant: "primary",
    } as CtaLink,
    {
      label: "Get a free audit",
      href: "/free-website-audit",
      variant: "secondary",
    } as CtaLink,
  ],
};

// 5. Before/after section
export const csBeforeAfter = {
  heading: "Before and after Zenith",
  support: "Drag the handle. Same business, same goals, different website.",
  items: beforeAfterItems,
};

// 7. Testimonial band — outcome-led picks tied to projects visible above.
export const csQuotes = {
  heading: "What clients said after we launched their website",
  // Quotes come from the testimonial source of truth; only the tone-matched
  // logo is set per band.
  items: [
    {
      ...quoteOf("flynn-blackie"),
      logo: "/logos-white/mod.png",
      logoAlt: "MOD Digital",
      logoClass: "h-5",
    },
    {
      ...quoteOf("uros-stanimirovic"),
      logo: "/logos-white/genroks.png",
      logoAlt: "Genroks AI",
    },
    {
      ...quoteOf("ivan-belobrajdic"),
      logo: "/logos-white/belistria.png",
      logoAlt: "Bel'Istria",
    },
  ],
  link: { label: "See all testimonials", href: "/testimonials" },
};

// 8. Final CTA band
export const csFinalCta = {
  heading: ["Your business could be the next", "card up there"],
  paragraph:
    "A free 20-minute call. We'll tell you honestly what's holding your site back, and what it would take to fix it.",
  cta: { label: "Book a call", href: "/book-a-call" },
  ctaSecondary: { label: "Get a free audit", href: "/free-website-audit" },
  image: "/textures/studio-texture.jpg",
};
