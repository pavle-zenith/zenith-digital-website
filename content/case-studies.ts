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
  services: "Professional services",
} as const;

export type IndustrySlug = keyof typeof INDUSTRIES;

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

// Full project grid (figures ported from the live site).
export const caseStudyCards: CaseStudyCard[] = [
  {
    client: "Knode AI",
    slug: "knode-ai",
    industry: "saas",
    metric: "$10M Series A raised",
    story: "Full SaaS site and landing page from scratch in 3 weeks",
    thumb: "/portfolio-slider/knode-ai.jpg",
    logo: "/logos-white/knode.png",
    liveUrl: "https://knode.ai",
  },
  {
    client: "Scottish Luxury Experience",
    slug: "scottish-luxury-experience",
    industry: "travel",
    metric: "€500k pipeline value",
    story: "The UK's best-looking travel website, live in 4 weeks",
    thumb: "/portfolio-slider/scottishluxuryexperience.jpg",
    liveUrl: "https://thescottishluxuryexperience.com",
  },
  {
    client: "Bel'Istria",
    slug: "belistria",
    industry: "travel",
    metric: "257% YoY impressions",
    story: "Croatia transfer and travel booking experience, 35+ pages migrated",
    thumb: "/portfolio-slider/belistria.jpg",
    logo: "/logos-white/belistria.png",
    liveUrl: "https://belistria.eu",
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
    liveUrl: "https://fortlauderdaledockrental.com",
  },
  {
    client: "MOD Digital",
    slug: "mod-digital",
    industry: "agencies",
    metric: "220% more bookings",
    story: "15+ landing pages driving €1M+ in client campaign revenue",
    logo: "/logos-white/mod.png",
    // TODO(owner): confirm live URL
  },
  {
    client: "Hunting Brook Gardens",
    slug: "hunting-brook-gardens",
    industry: "courses",
    metric: "€200k+ course earnings",
    story:
      "Landing pages and course infrastructure for an award-winning gardener",
    thumb: "/portfolio-slider/hunting-brook.jpg",
    liveUrl: "https://unlimited.huntingbrookgardens.com",
  },
  {
    client: "Jim Steele",
    slug: "jim-steele",
    industry: "coaches",
    metric: "10+ venues interested",
    story:
      "Marketing page and lead-capture ecosystem for a UK motivational speaker",
    logo: "/logos-white/jimsteele.png",
    liveUrl: "https://jimsteelespeaker.com",
  },
  {
    client: "Stilby",
    slug: "stilby",
    industry: "ecommerce",
    metric: "3 languages, 2-week launch",
    story: "Multilingual sites to expand into Montenegro and Slovakia",
    logo: "/logos-white/stilby.png",
    liveUrl: "https://stilby.eu",
  },
  {
    client: "Techtonnik",
    slug: "techtonnik",
    industry: "services",
    metric: "10+ projects delivered",
    story: "Web fulfillment partner since 2023 across 7+ industries",
    logo: "/logos-white/techtonnik.png",
    liveUrl: "https://techtonnik.com",
  },
  {
    client: "Capacity",
    slug: "capacity",
    industry: "agencies",
    metric: "5+ consulting projects",
    story: "Fractional web design team leading design & dev operations",
    logo: "/logos-white/capacity.png",
    liveUrl: "https://wearecapacity.co",
  },
  {
    client: "Genroks AI",
    slug: "genroks-ai",
    industry: "saas",
    metric: "Conversion skyrocketed post-rebrand",
    metricIsQuote: true,
    story: "Two web identities for an AI compliance startup",
    logo: "/logos-white/genroks.png",
    // TODO(owner): confirm live URL
  },
  {
    client: "MindEd",
    slug: "minded",
    industry: "courses",
    metric: "Metric coming soon",
    metricPending: true, // TODO(owner): supply the real metric
    story: "Education platform redesign for a kids learning app",
    thumb: "/portfolio-slider/mindeed.jpg",
    // TODO(owner): confirm live URL
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
        "From 0 to raising a $10 Million Series A funding with a premium Wix Studio SaaS for Knode AI",
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
      thumb: "/casestudies/belistria.jpg",
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
      client: "Fort Lauderdale Dock Rentals",
      slug: "fort-lauderdale-dock-rentals",
      logo: "/logos-white/foxstays.png",
      thumb: "/casestudies/fortlauderdale.jpg",
      title:
        "Building a booking and lead-capture website ecosystem for Florida's premier yacht and dock charter",
      stats: [
        { value: "30+", label: "Warm leads" },
        { value: "50+", label: "Docks available" },
      ],
      liveUrl: "https://foxstays.com",
      panel: "#3a2410",
    },
    {
      client: "Scottish Luxury Experience",
      slug: "scottish-luxury-experience",
      logo: "/logos-white/mod.png",
      thumb: "/casestudies/scottishluxury.jpg",
      title:
        "Enabling thousands of tourists to visit Scotland's beauty through the UK's best-looking travel website",
      stats: [
        { value: "€500k", label: "Pipeline value" },
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
  /** Scope strip items ("Wix Studio", "CMS", ...). */
  techUsed?: string[];
  publishedAt: string;
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
    // OWNER: narrative assembled from existing site copy and real screenshots
    // (no invented metrics) — confirm the story beats before more studies ship.
    headline: "From zero to a $10M Series A raise in three weeks",
    logoDark: "/logos-dark/knode.png",
    stats: [
      { value: "$10M", label: "Series A raised" },
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
      { value: "$10M", label: "Series A raised" },
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
    // Scope column beside the introduction.
    // TODO(owner): confirm the full list (copywriting? integrations?).
    techUsed: [
      "Positioning & messaging",
      "Web & UI design",
      "Wix Studio build",
      "CMS setup",
      "SEO & schema",
    ],
    publishedAt: "2026-08-11",
    seo: {
      title: "Knode AI case study | From zero to a $10M raise | Zenith Digital",
      description:
        "How Zenith Digital designed and built Knode AI's 10-page Wix Studio site in three weeks, and how it carried the company into a $10M Series A raise.",
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

// 1. Hero (dark, compact). NOTE(owner): the site currently mixes counts —
// "150+ Websites Created" (hero proof), "100+ projects shipped" (stats), and
// "97+ websites analyzed" (audits). This page uses 150+ per the hero; lock one
// sitewide number when ready.
// Auto-sliding artwork gallery under the hero. One vertical artwork per client
// (owner-supplied); the clothing-brand industry image is the placeholder until
// the real set lands.
// Portrait brand cards for the marquee under the /case-studies hero. Source
// PNGs are 1080x1350 (4:5), copied in at full weight while the format is being
// tested. OWNER: compress before launch (notyou.png alone is 1.6MB).
export const csGallery = {
  items: [
    { image: "/case-study-cards/belistria.png", alt: "Bel'Istria" },
    { image: "/case-study-cards/777.png", alt: "777 Lucky Club" },
    { image: "/case-study-cards/notyou.png", alt: "NotYou Brand" },
  ],
};

export const csHero = {
  heading: "We partner with Founders, Marketing Teams & Small Businesses",
  headingMuted:
    "by turning Websites & SEO into financially compounding assets.",
  support:
    "These aren't showcase sites built to impress other designers. They're working websites built for real businesses, with specific problems to solve and real outcomes attached.",
  stats: [
    { value: "150+", label: "Websites" },
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
