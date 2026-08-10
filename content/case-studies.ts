import type { CtaLink } from "@/lib/types";

/**
 * /case-studies — single source of truth for all case-study data. The homepage
 * featured two-panel cards and the before/after slider sets import from here
 * (no duplicated case data anywhere). Detail pages are deferred; card hrefs are
 * data-driven so swapping liveUrl -> /case-studies/[slug] later is a data
 * change, not a refactor.
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
  /** Screenshot thumb; omit to render the styled wordmark placeholder. */
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
    thumb: "/portfolio/knode.jpg",
    logo: "/logos-white/knode.png",
    liveUrl: "https://knode.ai",
  },
  {
    client: "Scottish Luxury Experience",
    slug: "scottish-luxury-experience",
    industry: "travel",
    metric: "€500k pipeline value",
    story: "The UK's best-looking travel website, live in 4 weeks",
    thumb: "/portfolio/scottishluxury.jpg",
    liveUrl: "https://thescottishluxuryexperience.com",
  },
  {
    client: "Bel'Istria",
    slug: "belistria",
    industry: "travel",
    metric: "257% YoY impressions",
    story: "Croatia transfer and travel booking experience, 35+ pages migrated",
    thumb: "/portfolio/belistria.jpg",
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
    thumb: "/portfolio/fortlauderdale.jpg",
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
    thumb: "/casestudies/huntingbrook.jpg",
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
    thumb: "/casestudies/minded.jpg",
    // TODO(owner): confirm live URL
  },
];

// Featured two-panel cards (thumbnail + branded panel). Shared with the
// homepage CaseStudies section.
export const caseStudies = {
  heading: "Real examples of how our websites helped businesses drive growth",
  intro:
    "These aren't showcase sites built to impress other designers. They're working websites built for real businesses, with specific problems to solve, and real outcomes attached.",
  items: [
    {
      client: "Knode AI",
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
export const csGallery = {
  items: [{ image: "/industries/clothing.jpg", alt: "Client website artwork" }],
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
  items: [
    {
      quote:
        "Zenith redefined what hard work means to me. They treat every website project with pride, enthusiasm, and extreme passion, and it shows in the results.",
      name: "Flynn Blackie",
      role: "Founder & Director, MOD Digital",
      avatar: "/avatars/flynn-blackie.jpg",
      logo: "/logos-white/mod.png",
      logoAlt: "MOD Digital",
      logoClass: "h-5",
    },
    {
      quote:
        "We hired Zenith to help us rebrand our site. Conversion skyrocketed. We saw what it takes to be one of the top professionals in the field.",
      name: "Uros Stanimirovic",
      role: "Co-Founder & CTO, Genroks AI",
      avatar: "/avatars/uros-stanimirovic.jpg",
      logo: "/logos-white/genroks.png",
      logoAlt: "Genroks AI",
    },
    {
      quote:
        "Our collaboration on redesigning Bel'Istria was the beginning of a long-term partnership. Their composure and communication exceeded all standards.",
      name: "Ivan Belobrajdic",
      role: "Chief Director, Bel'Istria",
      avatar: "/avatars/ivan-belobrajdic.jpg",
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
  image: "/textures/bg-texture-invert.jpg",
};
