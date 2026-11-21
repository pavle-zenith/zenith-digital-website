import type { CtaLink, Metric } from "@/lib/types";

import { quoteOf } from "./testimonials-data";

/**
 * /case-studies — single source of truth for all case-study data. The homepage
 * featured two-panel cards and the before/after slider sets import from here
 * (no duplicated case data anywhere). Studies listed in `caseStudyDetails` get
 * a /case-studies/[slug] detail page and their cards flip to internal links
 * automatically — shipping a new study is a data change, not a refactor.
 */

// Industry taxonomy. The single source for the /case-studies filter pills, the
// card corner tags and the /industries pages (content/industries): adding a
// project with a new industry automatically adds the pill.
//
// Key order is the order everything renders in: travel first, then by depth
// of work, agencies last (owner decision, 17 Nov 2026). The old catch-all
// "services" was split that day into trades, professional services, creative
// and local. The `services` key stayed so existing ?industry=services links
// keep working; it now means professional services only.
//
// One label set (fixes brief, 18 Nov 2026): these are the names the
// /industries hub rows, the card tags, the filter pills and the industry
// pages all read, so the site never shows two category systems side by side.
export const INDUSTRIES = {
  travel: "Travel",
  ecommerce: "E-commerce",
  saas: "SaaS and AI",
  coaches: "Coaches",
  courses: "Courses",
  property: "Property",
  marine: "Marine",
  trades: "Trades",
  services: "Professional services",
  creative: "Creative",
  local: "Local business",
  agencies: "Agencies",
} as const;

export type IndustrySlug = keyof typeof INDUSTRIES;

// Platform taxonomy (compare-and-platform brief, owner facts 19 Nov 2026):
// what each project is built on. The /compare pages and the coming platform
// pages pull their proof from these tags the way industry pages pull by
// industry, so a newly tagged project shows up without touching a page.
// Zenith Digital builds on Wix Studio, Next.js with Sanity, and Shopify.
export const PLATFORMS = {
  "wix-studio": "Wix Studio",
  nextjs: "Next.js",
  sanity: "Sanity",
  shopify: "Shopify",
  // Owner, 21 Nov 2026: Techtonnik's site runs on Astro.
  astro: "Astro",
} as const;

export type Platform = keyof typeof PLATFORMS;

export type CaseStudyCard = {
  client: string;
  slug: string;
  industry: IndustrySlug;
  /**
   * Further industries the project genuinely belongs to (owner, 18 Nov 2026:
   * Just Stay does short-let bookings and landlord lettings, so it's travel
   * and property). The card's tag and the hub preview stay on `industry`;
   * the grid filter and the industry pages' work sections include these too.
   */
  alsoIn?: IndustrySlug[];
  /** One hard metric (real figures only — no invented numbers). */
  metric: string;
  /** Render the metric in quotes (a quote-metric, not a number). */
  metricIsQuote?: boolean;
  /** Owner still to supply the real metric — rendered as a visible placeholder. */
  metricPending?: boolean;
  /**
   * Who shares the result, set after the metric wherever the card renders.
   * A result that belongs to a wider system than the site says so on the card
   * itself, not only on the case study.
   */
  metricCredit?: string;
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
  /**
   * What it's built on (owner, 19 Nov 2026): the Next.js + Sanity and
   * Shopify lists from the platform brief, and every other project Wix
   * Studio. An untagged card simply doesn't appear in platform proof.
   */
  platforms?: Platform[];
};

/**
 * Full project grid.
 *
 * Two kinds of card live here, and the difference is what the `metric` says.
 *
 * 1. The first eleven carry REAL figures ported from the live site: an outcome
 *    ("$521k in 7 months", "257% YoY impressions").
 * 2. Everything below "Wellington Web Co" states the SCOPE of the build
 *    instead ("Boat and yacht marketplace", "Direct booking site"), because no
 *    outcome figure exists for it yet. Owner-confirmed as factually accurate,
 *    Aug 2026. A fabricated percentage on a named client's card is a claim
 *    about that client's business and reads as real, so scope is the honest
 *    placeholder. Send the actual numbers and any card upgrades in place.
 *
 * The rule that matters: a `metric` describing scope means the figure never
 * arrived, not that the project is unverified.
 *
 * Thumbs are the 4:3 shots from /case-study-grid. Cards with no shot fall back
 * to their white wordmark, then to the client name set in the display face.
 */
export const caseStudyCards: CaseStudyCard[] = [
  {
    client: "Knode AI",
    slug: "knode-ai",
    platforms: ["wix-studio"],
    industry: "saas",
    metric: "Raising a Series A",
    story: "Off Wix Classic onto a new Studio site in 3 weeks",
    thumb: "/portfolio-slider/knode-ai.jpg",
    logo: "/logos-white/knode.png",
    liveUrl: "https://www.knode.ai",
  },
  {
    client: "Scottish Luxury Experience",
    slug: "scottish-luxury-experience",
    platforms: ["wix-studio"],
    industry: "travel",
    metric: "$521k in 7 months",
    // The result belongs to the full system MOD Digital runs behind the site
    // (see the case study), so it is always credited (industries brief).
    metricCredit: "with MOD Digital",
    // Was "The UK's best-looking travel website": an unsourced superlative
    // (fixes brief, 18 Nov 2026).
    story: "Luxury Scotland tours from £15k, website live in 4 weeks",
    thumb: "/case-studies/scottish-luxury-experience/card.webp",
    logo: "/logos-white/sle.avif",
    liveUrl: "https://www.scottishluxuryexperience.com",
  },
  {
    client: "Bel'Istria",
    slug: "belistria",
    platforms: ["wix-studio"],
    industry: "travel",
    metric: "257% YoY impressions",
    story:
      "AI-first migration from Wix Classic. 70+ pages ranking, top spot in AI answers.",
    thumb: "/portfolio-blocky/belistria.webp",
    logo: "/logos-white/belistria.png",
    liveUrl: "https://www.belistria.eu",
  },
  {
    client: "Fort Lauderdale Dock Rentals",
    slug: "fort-lauderdale-dock-rentals",
    platforms: ["wix-studio"],
    industry: "marine",
    metric: "30+ warm leads",
    story:
      "Booking and lead-capture ecosystem for a Florida dock charter",
    thumb: "/portfolio-slider/fort-lauderdale-dock-rental.jpg",
    logo: "/logos-white/foxstays.png",
    // No live link by choice: the client has since redesigned the site, so
    // the shots here are the Zenith build, not what's live today.
  },
  {
    client: "MOD Digital",
    slug: "mod-digital",
    platforms: ["wix-studio"],
    industry: "agencies",
    metric: "10+ brands shipped together",
    story: "15+ landing pages driving €1M+ in client campaign revenue",
    thumb: "/case-studies/mod-digital/card.webp",
    logo: "/logos-white/mod.png",
    liveUrl: "https://www.moddigital.co.uk/ai-ready-websites",
  },
  {
    client: "Hunting Brook Gardens",
    slug: "hunting-brook-gardens",
    platforms: ["wix-studio"],
    industry: "courses",
    metric: "€140k in course sales",
    // Credited like Scottish Luxury Experience: the figure belongs to the
    // full system MOD Digital runs (the courses page states the rule "wherever
    // it appears"; llm-info brief, 20 Nov 2026).
    metricCredit: "with MOD Digital",
    story:
      "Landing pages and course infrastructure for an Irish gardening school",
    thumb: "/case-studies/hunting-brook-gardens/card.webp",
    liveUrl: "https://unlimited.huntingbrookgardens.com/plantsperson-course",
  },
  {
    client: "Jim Steele",
    slug: "jim-steele",
    platforms: ["wix-studio"],
    industry: "coaches",
    metric: "10+ venues interested",
    story:
      "Marketing page and lead-capture ecosystem for a UK motivational speaker",
    thumb: "/case-studies/jim-steele/card.webp",
    logo: "/logos-white/jimsteele.png",
    liveUrl: "https://www.jimsteelespeaker.com",
  },
  {
    client: "Stilby",
    slug: "stilby",
    platforms: ["wix-studio"],
    industry: "ecommerce",
    metric: "3 languages, 2-week launch",
    story: "Multilingual sites to expand into Montenegro and Slovakia",
    thumb: "/case-studies/stilby/card.webp",
    logo: "/logos-white/stilby.png",
    liveUrl: "https://www.stilby.eu",
  },
  {
    client: "Techtonnik",
    slug: "techtonnik",
    // Owner, 21 Nov 2026: the site moved off Wix Studio to Astro in June 2026.
    platforms: ["astro"],
    industry: "agencies",
    metric: "10+ projects delivered",
    story: "WordPress to Wix Studio to Astro, and brochure-site partner since 2023",
    thumb: "/case-studies/techtonnik/card.webp",
    logo: "/logos-white/techtonnik.png",
    liveUrl: "https://www.techtonnik.com",
  },
  {
    client: "Capacity",
    slug: "capacity",
    platforms: ["nextjs", "sanity"],
    industry: "agencies",
    metric: "5+ consulting projects",
    story: "Fractional web design team leading design & dev operations",
    thumb: "/case-studies/capacity/card.webp",
    logo: "/logos-white/capacity.png",
    liveUrl: "https://www.wearecapacity.co",
  },
  {
    client: "Genroks AI",
    slug: "genroks-ai",
    platforms: ["nextjs", "sanity"],
    industry: "saas",
    metric: "10+ ISO deals since launch",
    story: "Custom-coded rebrand and AEO for an AI compliance startup",
    thumb: "/case-studies/genroks-ai/card.webp",
    logo: "/logos-white/genroks.png",
    liveUrl: "https://www.genroks.com",
  },

  // ---- Everything below has placeholder copy. See the note above. ----

  {
    client: "Wellington Web Co",
    slug: "wellington-web-co",
    platforms: ["nextjs", "sanity"],
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
    platforms: ["wix-studio"],
    industry: "agencies",
    metric: "White-label production partner",
    story: "Conversion-driven small business sites shipped under their brand",
    thumb: "/case-studies/advantage-media/card.webp",
    logo: "/logos-white/advantage.png",
    liveUrl: "https://www.advantage-media-marketing.com",
  },
  {
    // Added 20 Nov 2026 (owner): a partner we build client websites for, and
    // we built their own site in Next.js (checked live: Next.js on Vercel).
    // Name styled as on their site. Scope metric only, no figures. Card from
    // the owner's 2x2 mockup (1400x1050 WebP q80, like every other card).
    client: "BlackBee Agency",
    slug: "blackbee-agency",
    platforms: ["nextjs"],
    industry: "agencies",
    metric: "Custom-coded agency site",
    story: "Website for a performance marketing agency running paid media for ecommerce brands",
    thumb: "/case-studies/blackbee-agency/card.webp",
    liveUrl: "https://www.blackbeeagency.com",
  },
  {
    client: "Just Stay",
    slug: "just-stay",
    platforms: ["wix-studio"],
    industry: "travel",
    alsoIn: ["property"],
    metric: "Two funnels, live in 4 weeks",
    story:
      "Short-let booking funnel and landlord pipeline for a UK Airbnb superhost",
    thumb: "/case-studies/just-stay/card.webp",
    liveUrl: "https://www.juststaytoday.co.uk",
  },
  {
    client: "Yacht Junky",
    slug: "yacht-junky",
    platforms: ["wix-studio"],
    industry: "marine",
    metric: "Boat and yacht marketplace",
    story: "Multi-seller listing platform for private sellers and dealers",
    thumb: "/case-studies/yacht-junky/card.webp",
    liveUrl: "https://moddigital.wixstudio.com/yacht-junky",
  },
  {
    client: "Highland Fling",
    slug: "highland-fling",
    // Owner, 21 Nov 2026: custom Next.js, no Sanity.
    platforms: ["nextjs"],
    industry: "travel",
    metric: "Adventure booking platform",
    story: "Bungee and adrenaline experience bookings across Scotland",
    thumb: "/case-studies/highland-fling/card.webp",
    liveUrl: "https://www.bungeejumpscotland.co.uk",
  },
  {
    client: "Villa Maria",
    slug: "villa-maria",
    platforms: ["wix-studio"],
    industry: "travel",
    metric: "Direct booking site",
    story: "Riverside apartments and rooms taking bookings without the OTAs",
    thumb: "/case-studies/villa-maria/card.webp",
    liveUrl: "https://villamarijakanjiza.rs",
  },
  {
    client: "St Matthew Place",
    slug: "st-matthew-place",
    platforms: ["wix-studio"],
    industry: "property",
    metric: "Development launch site",
    story: "Sales site for a luxury apartment development in Boka Kotorska",
    thumb: "/case-studies/st-matthew-place/card.webp",
    liveUrl: "https://www.saintmatthewplace.com",
  },
  {
    client: "Superstan",
    slug: "superstan",
    platforms: ["wix-studio"],
    industry: "property",
    metric: "Property listing portal",
    story: "Searchable listings and enquiry routing for an estate agency",
    thumb: "/case-studies/superstan/card.webp",
    liveUrl: "https://superstanbg.rs",
  },
  {
    client: "NotYou Brand",
    slug: "notyou-brand",
    platforms: ["shopify"],
    industry: "ecommerce",
    metric: "Streetwear storefront",
    story: "Drop-driven store and lookbook for a creative apparel label",
    thumb: "/case-studies/notyou-brand/card.webp",
    liveUrl: "https://notyoubrand.com",
  },
  {
    client: "Lepa Couture",
    slug: "lepa-couture",
    platforms: ["shopify"],
    industry: "ecommerce",
    // Marko's testimonial calls it a prestige Shopify site, so this much is real.
    metric: "Prestige Shopify storefront",
    story: "Made-to-order couture catalogue with per-piece sizing",
    thumb: "/case-studies/lepa-couture/card.webp",
    liveUrl: "https://www.lepacouture.com",
  },
  {
    client: "Bradsells",
    slug: "bradsells",
    platforms: ["wix-studio"],
    industry: "ecommerce",
    metric: "Craft spirits brand site",
    story: "Scottish coffee liqueur brand story and direct sales",
    thumb: "/case-studies/bradsells/card.webp",
    liveUrl: "https://distilnation.com/bradsells",
  },
  {
    client: "Destilerija Maodus",
    slug: "destilerija-maodus",
    platforms: ["nextjs", "sanity"],
    industry: "ecommerce",
    metric: "Distillery brand and shop",
    story: "Illustrated brand site and gift ordering for a rakija distillery",
    thumb: "/case-studies/destilerija-maodus/card.webp",
    liveUrl: "https://destilerija-maodus-website.vercel.app",
  },
  {
    client: "Destilerija Gorska",
    slug: "destilerija-gorska",
    platforms: ["shopify"],
    industry: "ecommerce",
    metric: "Distillery brand site",
    story: "Product storytelling for a small-batch fruit brandy producer",
    thumb: "/case-studies/destilerija-gorska/card.webp",
    liveUrl: "https://destilerijagorska.rs",
  },
  {
    client: "ATW Trucking",
    slug: "atw-trucking",
    platforms: ["wix-studio"],
    industry: "trades",
    metric: "Logistics site rebuild",
    story: "Freight, logistics, and heavy equipment shipping for an Indiana carrier",
    thumb: "/case-studies/atw-trucking/card.webp",
    liveUrl: "https://www.atwtrucking.com",
  },
  {
    client: "LMF HR",
    slug: "lmf-hr",
    platforms: ["wix-studio"],
    industry: "services",
    // Les Marie's testimonial supplies this one.
    metric: "12+ client sites delivered",
    story: "HR and staffing site, plus the home care sites built alongside it",
    thumb: "/case-studies/lmf-hr/card.webp",
    liveUrl: "https://www.lmfhr.com",
  },
  {
    client: "Pressure Test Scotland",
    slug: "pressure-test-scotland",
    platforms: ["nextjs", "sanity"],
    industry: "trades",
    metric: "Instant-quote lead capture",
    story: "Quote form and service pages for a Scotland-wide pipe testing firm",
    thumb: "/case-studies/pressure-test-scotland/card.webp",
    liveUrl: "https://www.pressuretestscotland.co.uk",
  },
  {
    client: "LORAK Films",
    slug: "lorak-films",
    platforms: ["wix-studio"],
    industry: "creative",
    metric: "Production company portfolio",
    story: "Reel-led portfolio and case studies for a film production crew",
    thumb: "/case-studies/lorak-films/card.webp",
    liveUrl: "https://www.lorakfilms.com",
  },
  {
    client: "Creatify Collective",
    slug: "creatify-collective",
    platforms: ["wix-studio"],
    industry: "creative",
    metric: "Creative studio portfolio",
    story: "Selected work site for a fashion, lifestyle, and automotive studio",
    thumb: "/case-studies/creatify-collective/card.webp",
    liveUrl: "https://www.creatifycollective.co",
  },
  {
    client: "Bianomics",
    slug: "bianomics",
    platforms: ["nextjs", "sanity"],
    industry: "services",
    metric: "Consultancy positioning site",
    story:
      "Brand, PR, events, operations, and workforce programmes in one offer",
    thumb: "/case-studies/bianomics/card.webp",
  },
  {
    client: "Katie Hailey",
    slug: "katie-hailey",
    platforms: ["wix-studio"],
    industry: "coaches",
    metric: "Figma to live in 1.5 weeks",
    story: "Yoga, sound healing, and retreat bookings for a UK practitioner",
    thumb: "/case-studies/katie-hailey/card.webp",
    liveUrl: "https://www.katiehailey.com",
  },
  {
    client: "Kevan Christie",
    slug: "kevan-christie",
    platforms: ["wix-studio"],
    industry: "coaches",
    metric: "Author and book launch site",
    story: "Debut novel launch, archives, and press for an Edinburgh journalist",
    thumb: "/case-studies/kevan-christie/card.webp",
    liveUrl: "https://www.kevanchristie.com",
  },
  {
    client: "Iskra",
    slug: "iskra",
    platforms: ["nextjs", "sanity"],
    industry: "saas",
    metric: "App landing and onboarding",
    story: "Landing page and store funnel for a quit-smoking tracker app",
    thumb: "/case-studies/iskra/card.webp",
    liveUrl: "https://www.iskraclub.com",
  },
  {
    client: "MindEd",
    slug: "minded",
    platforms: ["wix-studio"],
    industry: "courses",
    metric: "70+ pages migrated, 2 languages",
    story: "Education platform redesign for a kids learning app",
    thumb: "/portfolio-slider/mindeed.jpg",
    liveUrl: "https://www.minded.es",
  },
  // Added 17 Nov 2026. Scope metrics, owner-confirmed as Zenith Digital's
  // own builds (Bonnie Barbers shown with the client's permission). Thumbs
  // are the owner's 2x2 mockups, exported to 1400x1050 WebP.
  {
    client: "Creative Native Films",
    slug: "creative-native-films",
    platforms: ["wix-studio"],
    industry: "creative",
    metric: "Video production portfolio",
    story: "Portfolio and quote requests for an Indianapolis video production company",
    thumb: "/case-studies/creative-native-films/card.webp",
    liveUrl: "https://www.creativenativefilms.com",
  },
  {
    client: "Mindful Productivity",
    slug: "mindful-productivity",
    platforms: ["wix-studio"],
    industry: "coaches",
    metric: "Retreat booking site",
    story: "Half-day and weekend retreats for a mindful productivity practice",
    thumb: "/case-studies/mindful-productivity/card.webp",
    liveUrl: "https://www.mindfulproductivity.org",
  },
  {
    client: "The House Painter's Encyclopedia",
    slug: "house-painters-encyclopedia",
    platforms: ["wix-studio"],
    industry: "courses",
    metric: "Trade reference library",
    story: "A searchable field reference for professional house painters, by surface, problem and technique",
    thumb: "/case-studies/house-painters-encyclopedia/card.webp",
    liveUrl: "https://thehousepaintersencyclopedia.com",
  },
  {
    client: "Sunny Side Scribbles",
    slug: "sunny-side-scribbles",
    platforms: ["wix-studio"],
    industry: "ecommerce",
    metric: "Book sponsorship store",
    story: "Sponsored books with handwritten notes for children, from a Texas small business",
    thumb: "/case-studies/sunny-side-scribbles/card.webp",
    liveUrl: "https://www.sunnysidescribbles.com",
  },
  {
    client: "BW Kitchens",
    slug: "bw-kitchens",
    platforms: ["wix-studio"],
    industry: "trades",
    metric: "Kitchen fitter lead site",
    story: "Projects and free-quote enquiries for a kitchen fitter in Worthing and Sussex",
    thumb: "/case-studies/bw-kitchens/card.webp",
    liveUrl: "https://www.bwkitchens.com",
  },
  {
    client: "Ameci Pizza Kitchen",
    slug: "ameci-pizza-culver",
    platforms: ["wix-studio"],
    industry: "local",
    metric: "Restaurant site with ordering",
    story: "Menu, specials, catering and online ordering for a family pizzeria in Irvine, California",
    thumb: "/case-studies/ameci-pizza-culver/card.webp",
    liveUrl: "https://www.amecipizzaculver.com",
  },
  {
    client: "TKS Sicherheitsdienste",
    slug: "tks-sicherheit",
    platforms: ["wix-studio"],
    industry: "services",
    metric: "German-language company site",
    story: "Services, quality and careers for a family-run security company in Hesse, Germany",
    thumb: "/case-studies/tks-sicherheit/card.webp",
    liveUrl: "https://www.tks-sicherheit.com",
  },
  {
    client: "Auto Odšteta",
    slug: "auto-odsteta",
    platforms: ["wix-studio"],
    industry: "services",
    metric: "Serbian-language lead site",
    story: "Road accident damage claims for drivers in Belgrade and Lazarevac",
    thumb: "/case-studies/auto-odsteta/card.webp",
    liveUrl: "https://www.autoodsteta.rs",
  },
  {
    client: "Bonnie Barbers",
    slug: "bonnie-barbers",
    platforms: ["wix-studio"],
    industry: "local",
    metric: "Local barbershop site",
    story: "Prices, recent cuts and directions for a barbershop on Tranent High Street",
    thumb: "/case-studies/bonnie-barbers/card.webp",
    liveUrl: "https://www.bonniebarbers.com",
  },
  {
    client: "Readmedial",
    slug: "readmedial",
    platforms: ["wix-studio"],
    industry: "coaches",
    metric: "Author and guides site",
    story: "Guides, speaking and the ROAD Model for a personal development author",
    thumb: "/case-studies/readmedial/card.webp",
    liveUrl: "https://www.readmedial.com",
  },
  // Coming soon: built, not yet on their own domains. Left unlinked (no
  // liveUrl) and flagged through metricPending so they read as provisional.
  // On launch, set the metric to the build's scope, drop metricPending and
  // add the live domain.
  {
    client: "ARCOM Energy",
    slug: "arcom-energy",
    platforms: ["wix-studio"],
    industry: "property",
    metric: "Coming soon",
    metricPending: true,
    story: "Maintenance, renovation and electrical work for property owners and managers on the French Riviera",
    thumb: "/case-studies/arcom-energy/card.webp",
  },
  {
    client: "Woodstone 024",
    slug: "woodstone-024",
    platforms: ["wix-studio"],
    industry: "ecommerce",
    metric: "Coming soon",
    metricPending: true,
    story: "Decorative garden stone, wholesale and retail, with a quantity calculator, from Subotica",
    thumb: "/case-studies/woodstone-024/card.webp",
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
        "A premium Wix Studio SaaS site, built in three weeks, for a company raising a Series A",
      stats: [
        { value: "Series A", label: "Currently raising" },
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
      thumb: "/portfolio-blocky/belistria.webp",
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
  /**
   * Full-page screenshot panned inside a CSS laptop bezel, between the intro
   * and the gallery. RAW capture only, no browser chrome baked in, and the
   * pixel size is required: the component derives the pan distance from it.
   */
  scrollShot?: CaseStudyGalleryImage & { width: number; height: number };
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

// Shipped detail pages, in next-study rotation order. Studies written later
// sit below as their own consts and join the rotation in `caseStudyDetails`.
const shippedDetails: CaseStudyDetail[] = [
  {
    ...cardOf("knode-ai"),
    // Narrative confirmed by owner (Aug 2026): story beats match the project.
    headline: "The site Knode took into its Series A raise",
    logoDark: "/logos-dark/knode.png",
    stats: [
      { value: "Series A", label: "Raise in progress" },
      { value: "3 weeks", label: "Kickoff to launch" },
      { value: "10", label: "Pages designed and built" },
    ],
    meta: {
      industry: INDUSTRIES.saas,
      // Owner-confirmed and matching the public Wix Marketplace listing,
      // which describes this as a re-design and migration from Classic Wix.
      engagementType: "Migration & rebuild",
      timeline: "3 weeks",
      platform: "Wix Classic to Wix Studio",
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
      { value: "Series A", label: "Raise in progress" },
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
        "How Zenith Digital designed and built Knode AI's 10-page Wix Studio site in three weeks, and how it carried the company into a Series A raise.",
    },
  },
  {
    ...cardOf("belistria"),
    scrollShot: {
      src: "/case-studies/belistria/full-page.webp",
      alt: "The full Bel'Istria homepage: the luxury Istria hero, the transfer and tour offer, the fleet, and the enquiry footer",
      width: 1440,
      height: 13248,
    },
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
      src: "/case-studies/belistria/hero.webp",
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
        src: "/case-studies/belistria/supporting-1.webp",
        alt: "Design detail from the Bel'Istria build (1 of 5)",
      },
      {
        src: "/case-studies/belistria/supporting-2.webp",
        alt: "Design detail from the Bel'Istria build (2 of 5)",
      },
      {
        src: "/case-studies/belistria/supporting-3.webp",
        alt: "Design detail from the Bel'Istria build (3 of 5)",
      },
      {
        src: "/case-studies/belistria/supporting-4.webp",
        alt: "Design detail from the Bel'Istria build (4 of 5)",
      },
      {
        src: "/case-studies/belistria/supporting-5.webp",
        alt: "Design detail from the Bel'Istria build (5 of 5)",
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
    scrollShot: {
      src: "/case-studies/scottish-luxury-experience/full-page.webp",
      alt: "The full Scottish Luxury Experience homepage in one pass: the Discover Scotland hero, tailored trip cards, the experience builder, Why Scotland, the team film, and the travel stories footer",
      width: 1440,
      height: 7402,
    },
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
    // Format test (owner, 25 Aug 2026): 5760x2880 source, exactly the 2:1 this
    // band renders at from md up, so the desktop crop takes the whole frame
    // rather than a slice of it.
    heroShot: {
      src: "/case-studies/scottish-luxury-experience/hero.webp",
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
      {
        src: "/case-studies/scottish-luxury-experience/supporting-1.webp",
        alt: "Design detail from the Scottish Luxury Experience build (1 of 4)",
      },
      {
        src: "/case-studies/scottish-luxury-experience/supporting-2.webp",
        alt: "Design detail from the Scottish Luxury Experience build (2 of 4)",
      },
      {
        src: "/case-studies/scottish-luxury-experience/supporting-3.webp",
        alt: "Design detail from the Scottish Luxury Experience build (3 of 4)",
      },
      {
        src: "/case-studies/scottish-luxury-experience/supporting-4.webp",
        alt: "Design detail from the Scottish Luxury Experience build (4 of 4)",
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
    scrollShot: {
      src: "/case-studies/yacht-junky/full-page.webp",
      alt: "The full Yacht Junky homepage: the marketplace hero, the listing search, seller categories, and the sign-up footer",
      width: 1440,
      height: 6906,
    },
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
      src: "/case-studies/yacht-junky/hero.webp",
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
      {
        src: "/case-studies/yacht-junky/supporting-1.webp",
        alt: "Design detail from the Yacht Junky build (1 of 5)",
      },
      {
        src: "/case-studies/yacht-junky/supporting-2.webp",
        alt: "Design detail from the Yacht Junky build (2 of 5)",
      },
      {
        src: "/case-studies/yacht-junky/supporting-3.webp",
        alt: "Design detail from the Yacht Junky build (3 of 5)",
      },
      {
        src: "/case-studies/yacht-junky/supporting-4.webp",
        alt: "Design detail from the Yacht Junky build (4 of 5)",
      },
      {
        src: "/case-studies/yacht-junky/supporting-5.webp",
        alt: "Design detail from the Yacht Junky build (5 of 5)",
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
    scrollShot: {
      src: "/case-studies/mod-digital/full-page.webp",
      alt: "The full MOD Digital homepage: the AI-ready websites hero, the work, the process, and the enquiry footer",
      width: 1440,
      height: 13295,
    },
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
      src: "/case-studies/mod-digital/hero.webp",
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
      {
        src: "/case-studies/mod-digital/supporting-1.webp",
        alt: "Design detail from the MOD Digital build (1 of 3)",
      },
      {
        src: "/case-studies/mod-digital/supporting-2.webp",
        alt: "Design detail from the MOD Digital build (2 of 3)",
      },
      {
        src: "/case-studies/mod-digital/supporting-3.webp",
        alt: "Design detail from the MOD Digital build (3 of 3)",
      },
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
    scrollShot: {
      src: "/case-studies/hunting-brook-gardens/full-page.webp",
      alt: "The full Hunting Brook Gardens homepage: the garden hero, visiting details, the courses and events calendar, and the booking footer",
      width: 1440,
      height: 10169,
    },
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
      src: "/case-studies/hunting-brook-gardens/hero.webp",
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
      {
        src: "/case-studies/hunting-brook-gardens/supporting-1.webp",
        alt: "Design detail from the Hunting Brook Gardens build (1 of 3)",
      },
      {
        src: "/case-studies/hunting-brook-gardens/supporting-2.webp",
        alt: "Design detail from the Hunting Brook Gardens build (2 of 3)",
      },
      {
        src: "/case-studies/hunting-brook-gardens/supporting-3.webp",
        alt: "Design detail from the Hunting Brook Gardens build (3 of 3)",
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
    scrollShot: {
      src: "/case-studies/katie-hailey/full-page.webp",
      alt: "The full Katie Hailey homepage: the yoga and sound healing hero, class types, the retreat offer, and the booking footer",
      width: 1440,
      height: 9030,
    },
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
      src: "/case-studies/katie-hailey/hero.webp",
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
      {
        src: "/case-studies/katie-hailey/supporting-1.webp",
        alt: "Design detail from the Katie Hailey build (1 of 5)",
      },
      {
        src: "/case-studies/katie-hailey/supporting-2.webp",
        alt: "Design detail from the Katie Hailey build (2 of 5)",
      },
      {
        src: "/case-studies/katie-hailey/supporting-3.webp",
        alt: "Design detail from the Katie Hailey build (3 of 5)",
      },
      {
        src: "/case-studies/katie-hailey/supporting-4.webp",
        alt: "Design detail from the Katie Hailey build (4 of 5)",
      },
      {
        src: "/case-studies/katie-hailey/supporting-5.webp",
        alt: "Design detail from the Katie Hailey build (5 of 5)",
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
    scrollShot: {
      src: "/case-studies/just-stay/full-page.webp",
      alt: "The full Just Stay homepage: the short-let booking hero, featured properties, the direct booking pitch, and the landlord enquiry footer",
      width: 1440,
      height: 9127,
    },
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
      src: "/case-studies/just-stay/hero.webp",
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
      {
        src: "/case-studies/just-stay/supporting-1.webp",
        alt: "Design detail from the Just Stay build (1 of 5)",
      },
      {
        src: "/case-studies/just-stay/supporting-2.webp",
        alt: "Design detail from the Just Stay build (2 of 5)",
      },
      {
        src: "/case-studies/just-stay/supporting-3.webp",
        alt: "Design detail from the Just Stay build (3 of 5)",
      },
      {
        src: "/case-studies/just-stay/supporting-4.webp",
        alt: "Design detail from the Just Stay build (4 of 5)",
      },
      {
        src: "/case-studies/just-stay/supporting-5.webp",
        alt: "Design detail from the Just Stay build (5 of 5)",
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
    scrollShot: {
      src: "/case-studies/genroks-ai/full-page.webp",
      alt: "The full Genroks AI homepage: the ISO certification offer, the process, the standards covered, and the consultation footer",
      width: 1440,
      height: 11441,
    },
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
      src: "/case-studies/genroks-ai/hero.webp",
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
      {
        src: "/case-studies/genroks-ai/supporting-1.webp",
        alt: "Design detail from the Genroks AI build (1 of 4)",
      },
      {
        src: "/case-studies/genroks-ai/supporting-2.webp",
        alt: "Design detail from the Genroks AI build (2 of 4)",
      },
      {
        src: "/case-studies/genroks-ai/supporting-3.webp",
        alt: "Design detail from the Genroks AI build (3 of 4)",
      },
      {
        src: "/case-studies/genroks-ai/supporting-4.webp",
        alt: "Design detail from the Genroks AI build (4 of 4)",
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

/* ------------------------------------------------------------------ *
 * STUDIES ADDED 21 NOV 2026
 *
 * Seven published the same day (lepaCouture to pressureTestScotland below,
 * listed in `caseStudyDetails` after them).
 *
 * Links that switch on with `detailSlugs` (no edits needed): the
 * /case-studies grid, the industry pages and the industries hub, the
 * comparison pages and hub chips, the sitemap, the /partnerships cards
 * (Techtonnik, Wellington Web Co to Pressure Test Scotland, Bianomics) and
 * the /testimonials tags (via `studyHref`).
 * Scroll shots still to come: Ameci Pizza Kitchen and Pressure Test Scotland
 * (re-export at 1x, 1440 wide). Lepa Couture, Bianomics and Gorska have none
 * by design.
 * ------------------------------------------------------------------ */

/**
 * LEPA COUTURE: drafted and published 21 Nov 2026. No scroll shot (owner).
 *
 * Facts from owner (21 Nov 2026): fashion boutique at Belgrade Waterfront;
 * custom-made dresses and scarves; designer Lepa studied fashion in Milan
 * (school not named); aesthetic inspired by houses like The Row; custom
 * Shopify theme with a gallery page for one-of-a-kind work; EUR, RSD and AED;
 * serves Serbia and the UAE; takes payments online; orders used to arrive via
 * Instagram DMs and now come through the site; 3 weeks of development,
 * engagement July to September 2026, launched September 2026. Owner worked
 * with Marko Georgievski (marketing manager). Permission: name, numbers,
 * screenshots. Live store checked 21 Nov 2026: theme "Lepa - Milano Theme
 * 2026", 20 dresses online, prices from EUR 170 to 350.
 *
 * Deliberately NOT claimed: a share of online orders. The owner's "75%" is
 * not counted and the client can't be reached while it restructures, so the
 * DM-to-checkout shift ships as a plain statement, without a number.
 */
export const lepaCouture: CaseStudyDetail = {
  ...cardOf("lepa-couture"),
  headline: "How Lepa Couture moved its orders from Instagram DMs to its own store",
  stats: [
    { value: "3 weeks", label: "Development, launched September 2026" },
    { value: "3", label: "Currencies: euros, dinars and dirhams" },
    { value: "2", label: "Markets served: Serbia and the UAE" },
  ],
  meta: {
    industry: INDUSTRIES.ecommerce,
    engagementType: "Custom Shopify build",
    timeline: "July to September 2026",
    platform: "Shopify, custom theme",
    liveUrl: "https://www.lepacouture.com",
  },
  challenge: [
    "Lepa Couture is a fashion label with a boutique at Belgrade Waterfront. Its designer, Lepa, trained in Milan and makes custom dresses and scarves in a quiet, pared-back style inspired by houses like The Row. Each piece is made to order, and many are one of a kind.",
    "Until 2026, every sale started as an Instagram DM. That works while a label is small, but it means there's no collection to browse at leisure, no checkout, and no simple way for a customer in Dubai to buy a dress from Belgrade. The brief: a store that shows the work the way a gallery would, and lets customers in Serbia and the UAE order and pay without sending a message first.",
  ],
  heroShot: {
    src: "/case-studies/lepa-couture/hero.webp",
    alt: "Lepa Couture's Shopify store homepage in a browser window, showing a made-to-order dress collection",
  },  gallery: [
    {
      src: "/case-studies/lepa-couture/supporting-1.webp",
      alt: "Lepa Couture's homepage in a browser window: the LEPA dragonfly mark over a black-and-white portrait",
    },
    {
      src: "/case-studies/lepa-couture/supporting-2.webp",
      alt: "The dresses collection: Selva, Elanora, Lela and Nerina in a four-column grid with prices in euros",
    },
    {
      src: "/case-studies/lepa-couture/supporting-3.webp",
      alt: "The Nuvella product page: a striped silk set with photos, size, quantity and add to cart",
    },
    {
      src: "/case-studies/lepa-couture/supporting-4.webp",
      alt: "The Galerie page: the Belgrade Waterfront boutique, its marble counter and display shelves",
    },
  ],

  introduction:
    "Lepa Couture is a Belgrade Waterfront boutique selling custom-made dresses and scarves by Lepa, a Serbian designer who studied fashion in Milan. In summer 2026, Zenith Digital designed and built its Shopify store on a custom theme, in 3 weeks of development, launching in September 2026 with prices in euros, dinars and dirhams for customers in Serbia and the UAE. Orders that used to arrive as Instagram DMs now come through the website.",
  approach: [
    {
      heading: "A theme made for the label",
      body: "Off-the-shelf Shopify themes are built for catalogues of stock items, and Lepa's work isn't that. The store runs on a custom theme built around her collection: generous imagery, quiet typography and product pages that let a single dress carry the page, the way the pieces are presented in the boutique.",
    },
    {
      heading: "A gallery for one-of-a-kind work",
      body: "Much of what Lepa makes is commissioned once and never repeated, so it can't sit in the shop as stock. A dedicated gallery page shows that work on its own, which gives new customers a sense of what a custom commission looks like before they ask for one.",
    },
    {
      heading: "Two markets, three currencies",
      body: "Lepa's customers are in Serbia and the UAE, so the store shows prices in euros, Serbian dinars and UAE dirhams and takes payment online. A customer in either market can choose a dress and pay for it in a currency they recognise, without a conversation in between.",
    },
    {
      heading: "From the map to the checkout",
      body: "Local customers often find the boutique through its Google Business Profile. With a real store behind that listing, a search for the boutique now leads somewhere a customer can browse and buy, not just a phone number and an Instagram handle.",
    },
  ],
  results: [
    {
      value: "DMs to checkout",
      label: "Orders now placed on the website instead of Instagram DMs",
      positive: true,
    },
    {
      value: "Serbia and the UAE",
      label: "Customers served in euros, dinars and dirhams",
      positive: true,
    },
  ],
  resultsNote:
    "Since the September 2026 launch, Lepa Couture has taken its orders through the Shopify store Zenith Digital built, rather than through Instagram DMs, with customers in Serbia and the UAE paying in their own currency.",
  testimonial: quoteOf("marko-georgievski"),
  techUsed: [
    "Custom Shopify theme",
    "Shopify store setup",
    "Gallery page",
    "Multi-currency: EUR, RSD, AED",
    "Online payments",
    "Brand & web design",
  ],
  publishedAt: "2026-11-21",
  cta: {
    heading: ["Still taking orders", "in your DMs?"],
    paragraph:
      "A free 20-minute call. We'll tell you whether your products belong on Shopify or Wix Studio, and what a store that takes payment in your customers' currency would cost.",
  },
  seo: {
    title: "Lepa Couture case study | From Instagram DMs to Shopify | Zenith Digital",
    description:
      "How Zenith Digital built Lepa Couture's custom Shopify store in 3 weeks: a Belgrade couture label now selling in euros, dinars and dirhams to Serbia and the UAE.",
  },
};

/**
 * BIANOMICS: drafted and published 21 Nov 2026. No scroll shot (owner).
 *
 * Facts from owner (21 Nov 2026): consulting company in El Paso, Texas, led by
 * Bianca Cervantes; relationship since March 2026, Zenith is their development
 * partner; 4 full website builds for Bianomics' clients (property and real
 * estate, logistics and packaging, a therapy practice); bianomics.com is a
 * custom Next.js build whose forms feed monday.com; the Snapshot (their free
 * read, like our audit) is the conversion path; the marketing team requests
 * changes through Slack and they ship in about a week; a full website build is
 * next. Everything approved by the client.
 * Live site checked 21 Nov 2026: "A human systems company"; six services
 * (brand and marketing strategy, PR and crisis management, event
 * architecture, project management, operational blueprints, workforce
 * development); 8 markets listed; /snapshot is a 7-question application form.
 *
 * Confirmed by owner (21 Nov 2026): Bianca's title is Director (matches the
 * testimonial); the team edits page content in Sanity Studio; Slack change
 * requests turn around in 7 days.
 */
export const bianomics: CaseStudyDetail = {
  ...cardOf("bianomics"),
  headline: "How Bianomics gained a development partner its marketing team briefs in Slack",
  stats: [
    { value: "4", label: "Client websites built together since March 2026" },
    { value: "7 days", label: "Turnaround on a Slack change request" },
    { value: "monday.com", label: "Where every Snapshot request lands" },
  ],
  meta: {
    industry: INDUSTRIES.services,
    engagementType: "Custom build & development partnership",
    timeline: "March 2026 onwards",
    platform: "Custom code (Next.js) + Sanity CMS + monday.com",
    liveUrl: "https://www.bianomics.com",
  },
  challenge: [
    "Bianomics is a consulting company in El Paso, Texas, led by its director, Bianca Cervantes. It calls itself a human systems company: brand and marketing strategy, public relations, events, operations and workforce development, run as one system for organisations across eight markets. Its clients often need a website as part of that work, and Bianomics needed someone to build them.",
    "Its own site had a job too. Bianomics wins work through the Snapshot, a free, honest read of where an organisation stands, so the site had to turn interest into Snapshot requests and put them straight into the tools the team already runs on. And the marketing team needed to change the site without waiting on a developer's calendar. The brief: a site built around the Snapshot, connected to monday.com, that the team can edit themselves and extend by asking.",
  ],
  heroShot: {
    src: "/case-studies/bianomics/hero.webp",
    alt: "The Bianomics homepage in a browser window: You're building something real. We align everything it needs to move.",
  },  gallery: [
    {
      src: "/case-studies/bianomics/supporting-1.webp",
      alt: "Bianomics' services and markets: brand and marketing strategy, PR and crisis management, events, project management, operational blueprints and workforce development, across eight markets",
    },
    {
      src: "/case-studies/bianomics/supporting-2.webp",
      alt: "A client story in dark mode: Built by Ability, an HR video and messaging campaign",
    },
    {
      src: "/case-studies/bianomics/supporting-3.webp",
      alt: "The closing call to action, Ready to be seen for what you actually do?, above the footer",
    },
    {
      src: "/case-studies/bianomics/supporting-4.webp",
      alt: "Leadership, start to finish: the Bianomics team in black-and-white portraits",
    },
  ],

  introduction:
    "Bianomics is a consulting company in El Paso, Texas, that runs brand, PR, events, operations and workforce development as one system for its clients. Since March 2026, Zenith Digital has been its development partner: a custom Next.js build of bianomics.com with Sanity CMS for content and Snapshot requests feeding monday.com, four full websites for Bianomics' own clients, and new features requested by its marketing team in Slack and shipped within 7 days.",
  approach: [
    {
      heading: "Built around the Snapshot",
      body: "The Snapshot is how Bianomics starts most relationships: a complimentary read of an organisation's communications and brand position, done by the people who would do the work. The site leads every visitor towards it, and the Snapshot page is a short application, seven questions about where the organisation is and what a win in 90 days would look like, so the team starts each conversation already knowing the problem.",
    },
    {
      heading: "Forms that land in monday.com",
      body: "Bianomics runs its projects in monday.com, so a form that emailed someone would have been one more thing to copy across. The site is custom code in Next.js precisely so it could connect directly: each Snapshot request arrives in the team's board with every answer attached, ready to be assigned.",
    },
    {
      heading: "Edit it yourself, or ask in Slack",
      body: "Day-to-day content lives in Sanity Studio, so the marketing team edits copy and pages themselves without touching code. Anything bigger, a new section, a new page type, a change to how a form behaves, they post in a shared Slack channel, and Zenith Digital ships it with AI-assisted development within 7 days. The site keeps up with the business without anyone at Bianomics waiting on a developer's calendar.",
    },
    {
      heading: "A build partner for their clients",
      body: "When a Bianomics client needs a website, Zenith Digital builds it while Bianomics keeps the relationship and the strategy. Four full sites so far, in property and real estate, logistics and packaging, and a therapy practice, each delivered as part of a wider Bianomics engagement rather than as a separate vendor job.",
    },
  ],
  results: [
    {
      value: "4",
      label: "Full client websites built for Bianomics since March 2026",
      positive: true,
    },
    {
      value: "7 days",
      label: "Turnaround from a Slack request to the change being live",
      positive: true,
    },
    {
      value: "Next build",
      label: "A full rebuild of bianomics.com is the next project",
    },
  ],
  resultsNote:
    "Since March 2026, Zenith Digital has built bianomics.com and four client websites for Bianomics, and its marketing team edits the site in Sanity Studio and gets new features live within 7 days by asking in Slack.",
  testimonial: quoteOf("bianca-cervantes"),
  techUsed: [
    "Custom code (Next.js)",
    "Sanity CMS",
    "monday.com integration",
    "Snapshot application funnel",
    "Slack change requests, 7-day turnaround",
    { label: "White-label client builds", href: "/partnerships" },
  ],
  publishedAt: "2026-11-21",
  cta: {
    heading: ["Need a build partner", "for your clients' websites?"],
    paragraph:
      "A free 20-minute call. Tell us how you work with clients and we'll show you how a white-label build fits around it, from the first brief to handover.",
  },
  seo: {
    title: "Bianomics case study | A development partner briefed in Slack | Zenith Digital",
    description:
      "How Zenith Digital became Bianomics' development partner: a custom Next.js site feeding monday.com, Sanity CMS, four client builds, and 7-day change turnaround.",
  },
};

/**
 * TECHTONNIK: drafted and published 21 Nov 2026.
 *
 * Facts from owner (21 Nov 2026): Techtonnik is a Serbian on-demand software
 * development company founded by Stevan Radovanovic; known since 2023; Zenith
 * Digital is its fulfilment partner for brochure websites (Techtonnik lists
 * Zenith in its partner network as "Web presentations, fast"); its own site
 * moved WordPress to Wix Studio in 2024, then Wix Studio to Astro in June
 * 2026, because Techtonnik is moving to agent-driven development and wants
 * changes made through an agent plus backend work; the Astro move took one
 * week including a layout refresh and light brand refresh; meta titles,
 * descriptions and URLs carried over unchanged and rankings held steady;
 * agent-driven changes and backend are a work in progress (coming next).
 * Live site checked 21 Nov 2026: Astro; "Quality solutions of the highest
 * magnitude"; four ways to engage (join your team, build it with us, we
 * assemble the team, we connect you); partner network; hourly, ongoing work.
 */
export const techtonnik: CaseStudyDetail = {
  ...cardOf("techtonnik"),
  headline: "How Techtonnik moved its site to Astro in a week, with every URL and ranking intact",
  logoDark: "/logos-dark/techtonnik.png",
  stats: [
    { value: "1 week", label: "Wix Studio to Astro, refresh included" },
    { value: "Every URL", label: "Kept, with the same titles and descriptions" },
    { value: "Since 2023", label: "Brochure-site fulfilment partner" },
  ],
  meta: {
    industry: INDUSTRIES.agencies,
    engagementType: "Migration & refresh",
    timeline: "June 2026",
    platform: "Astro (custom code), from Wix Studio",
    liveUrl: "https://www.techtonnik.com",
  },
  challenge: [
    "Techtonnik is an on-demand software development company in Serbia, founded by Stevan Radovanovic. It builds AI-powered web, mobile and desktop apps by joining a client's team, assembling one, or connecting the client with the right partner. Zenith Digital has been its fulfilment partner for brochure websites since 2023, and in 2024 moved Techtonnik's own site from WordPress to Wix Studio.",
    "By 2026 the company was changing how it builds. Techtonnik wanted its own site to work the way its development does now: changes made through an AI agent, and backend work no website builder would host. That meant leaving Wix Studio. The brief was a move without a reset: same site, same content, same search presence, on a codebase the team could hand to an agent.",
  ],
  heroShot: {
    src: "/case-studies/techtonnik/hero.webp",
    alt: "Techtonnik's homepage in a browser window: Quality solutions of the highest magnitude",
  },
  scrollShot: {
    src: "/case-studies/techtonnik/full-page.webp",
    alt: "The full Techtonnik homepage: the hero, four ways to work together, the apps it has helped build, its partner network, how a match works, a client review, the about section and the closing call to action",
    width: 1440,
    height: 6019,
  },  gallery: [
    {
      src: "/case-studies/techtonnik/supporting-1.webp",
      alt: "Techtonnik's homepage in a browser window: Quality solutions of the highest magnitude, above a strip of partner logos",
    },
    {
      src: "/case-studies/techtonnik/supporting-2.webp",
      alt: "Apps we've helped build: six client web and mobile projects in a grid",
    },
    {
      src: "/case-studies/techtonnik/supporting-3.webp",
      alt: "The closing call to action, Got a project in mind?, and the footer",
    },
    {
      src: "/case-studies/techtonnik/supporting-4.webp",
      alt: "The network behind the work: partner companies including codeIT, Cinnamon, Genroks and Zenith Digital",
    },
    {
      src: "/case-studies/techtonnik/supporting-5.webp",
      alt: "The case studies page: SerbLink and Super Stan, each with a device mockup",
    },
  ],

  introduction:
    "Techtonnik is a Serbian on-demand software development company founded by Stevan Radovanovic. In June 2026, Zenith Digital moved its website from Wix Studio to Astro in one week, with a layout and brand refresh, keeping every URL, meta title and description, and its rankings held steady through the move. It was the site's second migration with Zenith Digital, after WordPress to Wix Studio in 2024.",
  approach: [
    {
      heading: "Same site, new foundation",
      body: "The point of the move was the codebase, not a redesign, so the content and the spirit of the design stayed put. The layout got a light lift and the brand a refresh, enough to feel current, not enough to make returning visitors or search engines treat it as a new site.",
    },
    {
      heading: "Nothing lost in search",
      body: "Every URL kept its address, and every page kept its meta title and description, carried across exactly as they were on Wix Studio. With nothing to redirect and nothing to re-index, the move left search with no reason to re-evaluate the site, and Techtonnik's rankings held steady.",
    },
    {
      heading: "A week, refresh included",
      body: "Moving a site twice teaches you where the time goes. Having rebuilt it on Wix Studio in 2024, Zenith Digital knew every page and every content type, so the Astro build, the refresh and the cutover fit into one week.",
    },
    {
      heading: "Ready for an agent to work on",
      body: "Astro gives Techtonnik a plain codebase it owns, which is what agent-driven development needs: changes described in words and made in code, plus backend features a site builder couldn't run. That part is being built now and comes next.",
    },
  ],
  results: [
    {
      value: "1 week",
      label: "From Wix Studio to a live Astro site, refresh included",
      positive: true,
    },
    {
      value: "Every URL",
      label: "Kept, with meta titles and descriptions unchanged",
      positive: true,
    },
    {
      value: "Rankings steady",
      label: "Search positions held through the June 2026 move",
      positive: true,
    },
  ],
  resultsNote:
    "In June 2026, Zenith Digital moved Techtonnik's website from Wix Studio to Astro in one week, and every URL, title and description carried over with its rankings holding steady.",
  testimonial: quoteOf("stevan-radovanovic"),
  techUsed: [
    "Astro (custom code)",
    { label: "Website migration", href: "/services/website-migration" },
    "URL and metadata parity",
    "Layout & brand refresh",
    { label: "Fulfilment partnership", href: "/partnerships" },
  ],
  publishedAt: "2026-11-21",
  cta: {
    heading: ["Outgrowing your", "website builder?"],
    paragraph:
      "A free 20-minute call. We'll tell you whether a move to custom code is worth it for you, and how to do it without losing a URL or a ranking.",
  },
  seo: {
    title: "Techtonnik case study | Wix Studio to Astro in a week | Zenith Digital",
    description:
      "How Zenith Digital moved Techtonnik's site from Wix Studio to Astro in one week in June 2026, keeping every URL, title and description, with rankings steady.",
  },
};

/**
 * HIGHLAND FLING: drafted and published 21 Nov 2026.
 *
 * Facts from owner (21 Nov 2026): moved off an old WordPress template to a
 * newly designed, custom-coded Next.js site; launched around November 2025;
 * about a month; reasons: dated design, newest services missing, a rebrand
 * wanted; the team struggled to update WordPress and manage its booking
 * plugin, booking is now better integrated in custom code; URLs and page
 * structure migrated; charity page, booking pages per activity, location,
 * about, team, gift vouchers; MOD Digital now runs their email marketing,
 * which sends traffic to the site (MOD's work, credited as such).
 * Live site checked 21 Nov 2026: Killiecrankie, Highland Perthshire, near
 * Pitlochry; "Home of bungee jumping in Scotland"; zip (11 lines, 2 river
 * crossings, from GBP 49), Garry Bridge swing (40m, GBP 84), 40m bungee from
 * Garry Bridge (GBP 94), plus tandem bungee, night bungee, night and
 * blackout swing; charity jumps, gift vouchers, loyalty programme, video
 * gallery, jobs, partners; booking through FareHarbor embeds.
 *
 * Confirmed by owner (21 Nov 2026): launched November 2025; no Sanity;
 * booking was FareHarbor through a WordPress plugin, now a custom-coded
 * FareHarbor embed; no business figures available, so results are build
 * facts; testimonial is Flynn Blackie (MOD Digital), who now runs their email.
 */
export const highlandFling: CaseStudyDetail = {
  ...cardOf("highland-fling"),
  headline: "How Highland Fling traded a hard-to-run WordPress template for a custom site that sells every jump",
  stats: [
    { value: "1 month", label: "From WordPress template to a custom Next.js site" },
    { value: "Every URL", label: "Page structure and addresses migrated" },
    { value: "7", label: "Bookable experiences, each with its own page" },
  ],
  meta: {
    industry: INDUSTRIES.travel,
    engagementType: "Redesign & migration",
    timeline: "November 2025",
    platform: "Custom code (Next.js), from WordPress",
    liveUrl: "https://www.bungeejumpscotland.co.uk",
  },
  challenge: [
    "Highland Fling runs Scotland's permanent bridge bungee at Killiecrankie, near Pitlochry in Highland Perthshire: a 40m bungee from the Garry Bridge, a giant swing over the River Garry, and a zip line course of 11 lines through the trees. It also sells gift vouchers, runs charity jumps, and adds night and tandem jumps to the season.",
    "Its website hadn't kept up. It was an old WordPress template with a dated design, the newest experiences weren't on it, and the company wanted a rebrand. Day to day it was hard to run: updating pages was a struggle, and so was managing the booking plugin, on a site whose whole job is taking bookings. The brief: a new, custom-built site with the rebrand, every experience on it, booking that just works, and nothing lost from the old site's structure.",
  ],
  heroShot: {
    src: "/case-studies/highland-fling/hero.webp",
    alt: "Highland Fling's homepage in a browser window: Home of bungee jumping in Scotland",
  },
  scrollShot: {
    src: "/case-studies/highland-fling/full-page.webp",
    alt: "The full Highland Fling homepage: the bungee jumping hero, zip, swing and bungee cards with prices, Tripadvisor reviews, gift vouchers, tandem and blackout jumps, the Killiecrankie location and the footer",
    width: 1440,
    height: 5217,
  },  gallery: [
    {
      src: "/case-studies/highland-fling/supporting-1.webp",
      alt: "Highland Fling's homepage in a browser window: Home of bungee jumping in Scotland, over the view down from the Garry Bridge",
    },
    {
      src: "/case-studies/highland-fling/supporting-2.webp",
      alt: "Choose your adventure: zip, swing and bungee cards, each with its price and a booking button",
    },
    {
      src: "/case-studies/highland-fling/supporting-3.webp",
      alt: "Big adventure. Beautiful Scotland.: the Killiecrankie location section above the footer",
    },
    {
      src: "/case-studies/highland-fling/supporting-4.webp",
      alt: "The activities page: Find your kind of unforgettable, with three ways to go for it",
    },
    {
      src: "/case-studies/highland-fling/supporting-5.webp",
      alt: "The bungee page: the price, a check availability button and a photo gallery of the jump",
    },
  ],

  introduction:
    "Highland Fling runs bungee jumping, a giant swing and a zip line course at Killiecrankie in Highland Perthshire, Scotland. In November 2025, Zenith Digital replaced its old WordPress template with a newly designed, custom-coded Next.js site in about a month, with a rebrand, a page for every experience, booking built into each one, and the old URLs and page structure carried across.",
  approach: [
    {
      heading: "A page for every experience",
      body: "The old template couldn't show the full line-up, so the new site is built around it: zip, swing and bungee each get their own page with the price, age limit, duration and what to expect, alongside the night bungee, tandem bungee, night swing and blackout swing. A comparison page helps anyone who can't choose, and the location, team and safety pages answer the questions people ask before they book.",
    },
    {
      heading: "Booking that works without babysitting",
      body: "Highland Fling already sold through FareHarbor, but on WordPress it ran through a plugin that was one more thing to manage. The custom build replaces the plugin with FareHarbor's embed, coded into each experience page with the right activity already selected, so a visitor goes from reading about the swing to choosing a slot in one step, and there's no plugin left to update.",
    },
    {
      heading: "More than the jump",
      body: "Gift vouchers, charity jumps and a loyalty programme each have their own page, because each is a different way into a booking: a present for someone else, a fundraiser with a cause behind it, a reason to come back. Video of real jumps does the reassuring for the nervous.",
    },
    {
      heading: "Moved without breaking anything",
      body: "The page structure and URLs moved across from the WordPress site, so existing links and search listings kept pointing somewhere real. Since launch, MOD Digital has run Highland Fling's email marketing, and those campaigns send people to the new site.",
    },
  ],
  results: [
    {
      value: "1 month",
      label: "From the old WordPress template to the live custom site",
      positive: true,
    },
    {
      value: "Every URL",
      label: "Old page structure and addresses carried across",
      positive: true,
    },
    {
      value: "7",
      label: "Bookable experiences, each one a click from a booking slot",
      positive: true,
    },
  ],
  testimonial: quoteOf("flynn-blackie"),
  resultsNote:
    "Since its November 2025 launch, the custom site Zenith Digital built has put all of Highland Fling's experiences, vouchers and charity jumps in one place, with booking built into every experience page.",
  techUsed: [
    "Custom code (Next.js)",
    "Brand refresh & web design",
    { label: "Website migration", href: "/services/website-migration" },
    "Custom FareHarbor booking embed",
    "Gift vouchers & charity pages",
  ],
  publishedAt: "2026-11-21",
  cta: {
    heading: ["Is your booking site", "harder to run than the business?"],
    paragraph:
      "A free 20-minute call. Tell us how bookings come in today and we'll tell you what a site built around them would look like, and what it would cost.",
  },
  seo: {
    title: "Highland Fling case study | WordPress to custom Next.js | Zenith Digital",
    description:
      "How Zenith Digital rebuilt Highland Fling's bungee, swing and zip line site in custom Next.js in a month: every experience bookable, every URL carried across.",
  },
};

/**
 * DESTILERIJA GORSKA: drafted and published 21 Nov 2026. No scroll shot
 * (owner).
 *
 * Facts from owner (21 Nov 2026): no website before, a brand new Shopify
 * build on its own theme; launched February 2025; used mainly for brand
 * promotion, and to move Instagram DM orders onto the site; no results
 * available and no access any more (the client's new marketing team runs it);
 * the site itself is Zenith Digital's build.
 * Live site checked 21 Nov 2026 (Serbian, prices in RSD): "Stvorena od voća,
 * vatre i ljubavi"; craft rakija aged at least five years in oak barrels,
 * carrying the KRAFT mark; the story ties the brand to the Ibar river and
 * Pančićev vrh; range: plum rakija, an apricot barrique (extremely limited),
 * 0.05l premium minis, a six-bottle case, a luxury gift pack and the Gorska
 * Experience Box; pages: shop, Gorska Experience, about, contact, blog.
 * Deliberately thin: capability-led, no invented outcomes.
 *
 * Confirmed by owner (21 Nov 2026): the testimonial as stored (Ivana
 *     Lesevic, Head of Sales) is right; the other spelling was voice-to-text.
 */
export const destilerijaGorska: CaseStudyDetail = {
  ...cardOf("destilerija-gorska"),
  headline: "How Destilerija Gorska went from no website to a Shopify store for its craft rakija",
  stats: [
    { value: "New build", label: "No website before, launched February 2025" },
    { value: "6", label: "Rakijas and gift sets in the store (November 2026)" },
  ],
  meta: {
    industry: INDUSTRIES.ecommerce,
    engagementType: "New Shopify store",
    timeline: "Launched February 2025",
    platform: "Shopify, own theme",
    liveUrl: "https://destilerijagorska.rs",
  },
  challenge: [
    "Destilerija Gorska makes craft rakija in Serbia: plum and apricot brandies aged at least five years in oak barrels and carrying the KRAFT mark, with a brand story rooted in the Ibar river and Pančićev vrh. Its line on the difference is blunt: rakija, not rakijica.",
    "Before 2025 it had no website at all. The brand lived on Instagram, and so did the orders, one DM at a time. For a premium product sold partly as a gift, that meant no place to tell the full story, no way to show the range side by side, and no way to buy without a conversation. The brief: a first website that carries the brand, and a store that lets people order without messaging.",
  ],
  heroShot: {
    src: "/case-studies/destilerija-gorska/hero.webp",
    alt: "Destilerija Gorska's Shopify store homepage in a browser window: Stvorena od voća, vatre i ljubavi",
  },  gallery: [
    {
      src: "/case-studies/destilerija-gorska/supporting-1.webp",
      alt: "Destilerija Gorska's homepage in a browser window: Stvorena od voća, vatre i ljubavi over a pour of rakija",
    },
    {
      src: "/case-studies/destilerija-gorska/supporting-2.webp",
      alt: "The brand story in black and gold: a black-and-white portrait beside an oak barrel carrying the Gorska mark",
    },
    {
      src: "/case-studies/destilerija-gorska/supporting-3.webp",
      alt: "Rakija premijum kvaliteta: the apricot barrique mini, plum rakija, the premium plum mini and the six-bottle case, priced in RSD",
    },
    {
      src: "/case-studies/destilerija-gorska/supporting-4.webp",
      alt: "Upoznajte Gorsku: a Gorska bottle on white beside the brand's introduction",
    },
  ],

  introduction:
    "Destilerija Gorska is a Serbian craft rakija producer whose brandies are aged at least five years in oak. In February 2025, Zenith Digital built its first website, a Shopify store on its own theme, to carry the brand and take orders that used to arrive as Instagram DMs.",
  approach: [
    {
      heading: "Brand first, shop second",
      body: "Gorska sells a feeling as much as a bottle, so the site leads with the story: the fruit, the fire, the five years in oak, the landscape it comes from. The Gorska Experience page carries that idea on its own, so the brand has somewhere to live beyond an Instagram grid.",
    },
    {
      heading: "A range made for giving",
      body: "Much of what Gorska sells is a gift, so the store presents the range that way: single bottles next to a six-bottle case, a luxury gift pack and the Gorska Experience Box, with small premium bottles for anyone who wants to try before they commit to a full one.",
    },
    {
      heading: "From DMs to a checkout",
      body: "Orders used to start as Instagram messages. Now Gorska sends that traffic to the store, where the range, the prices and the checkout are all in one place, and promotions have a page to point to.",
    },
  ],
  results: [
    {
      value: "First website",
      label: "From Instagram only to a branded Shopify store, February 2025",
      positive: true,
    },
    {
      value: "DMs to the store",
      label: "Instagram enquiries now sent to the site to order",
      positive: true,
    },
  ],
  resultsNote:
    "Since February 2025, Destilerija Gorska has run its brand promotions and its orders through the Shopify store Zenith Digital built, instead of through Instagram DMs alone.",
  testimonial: quoteOf("ivana-lesevic"),
  techUsed: [
    "Shopify store setup",
    "Shopify theme design",
    "Brand storytelling pages",
    "Gift sets & product range",
  ],
  publishedAt: "2026-11-21",
  cta: {
    heading: ["Is your product better", "than your online presence?"],
    paragraph:
      "A free 20-minute call. We'll tell you what a first store for your brand needs, whether it belongs on Shopify or Wix Studio, and what it would cost.",
  },
  seo: {
    title: "Destilerija Gorska case study | First Shopify store | Zenith Digital",
    description:
      "How Zenith Digital built Destilerija Gorska's first website, a Shopify store for its five-year oak-aged craft rakija, moving orders from Instagram DMs to checkout.",
  },
};

/**
 * AMECI PIZZA KITCHEN: drafted and published 21 Nov 2026. Scroll shot to
 * follow (the first export was cut off at 16,384px; re-export at 1x). Add
 * the testimonial when it arrives (owner expects one soon).
 *
 * Facts from owner (21 Nov 2026): Wix Studio landing page, launched November
 * 2026, built in about a week. Founder Ali Lodin (spelling by voice, confirm
 * before naming him in copy; the site itself says "call or text Al"). The
 * previous site was built with Replit and looked like a generic one-prompt AI
 * site; the brief was an authentic Italian pizzeria the team can edit
 * themselves. Wix CMS holds the specials and the ordering menu; order buttons
 * go to the restaurant's third-party ordering site. Two forms, newsletter and
 * catering, both into the Wix CRM. No results yet (a week live, no baseline).
 * Live site checked 21 Nov 2026: family-owned since 1994, University Park
 * Center, 18068 Culver Dr, Irvine; owners came from Queens; daily pickup
 * specials (Doppio Mondays, Formaggio Tuesdays, Famiglia Feast); full menu in
 * nine sections with gluten-free crust; catering for 10 to 200, handled by
 * co-owner Omar. Their review count and prices are theirs and not repeated.
 * Deliberately thin: capability-led, no invented outcomes.
 */
export const ameciPizza: CaseStudyDetail = {
  ...cardOf("ameci-pizza-culver"),
  headline: "How Ameci Pizza Kitchen swapped a generic AI-built site for a pizzeria page it runs itself",
  stats: [
    { value: "1 week", label: "From brief to launch, November 2026" },
    { value: "2 forms", label: "Catering and newsletter, straight into the Wix CRM" },
  ],
  meta: {
    industry: INDUSTRIES.local,
    engagementType: "Landing page rebuild",
    timeline: "1 week, launched November 2026",
    platform: "Wix Studio, Wix CMS and Wix CRM",
    liveUrl: "https://www.amecipizzaculver.com",
  },
  challenge: [
    "Ameci Pizza Kitchen has been a family-run pizzeria in Irvine's University Park since 1994, started by a family that brought its pizza from Queens. Thirty years of regulars, catering for offices and UCI events, and a specials board that changes through the week.",
    "Its website didn't show any of that. It had been put together with Replit and looked like most one-prompt AI sites: clean enough, and interchangeable with any other. The owners wanted a site that felt like an Italian pizzeria with a history, and one they could keep up to date themselves without calling a developer every time a special changed.",
  ],
  heroShot: {
    src: "/case-studies/ameci-pizza-culver/hero.webp",
    alt: "Ameci Pizza Kitchen's website in a browser window: Irvine's neighborhood pizzeria since 1994, with buttons to order online or ask about catering",
  },  gallery: [
    {
      src: "/case-studies/ameci-pizza-culver/supporting-1.webp",
      alt: "Ameci Pizza Kitchen's homepage in a browser window: Irvine's neighborhood pizzeria since 1994, with order online and catering buttons",
    },
    {
      src: "/case-studies/ameci-pizza-culver/supporting-2.webp",
      alt: "The ones Irvine keeps coming back for: six favourites, from buffalo wings to BBQ chicken pizza",
    },
    {
      src: "/case-studies/ameci-pizza-culver/supporting-3.webp",
      alt: "The full menu, edited in the Wix CMS: specialty pizzas, with tabs for pasta, calzones, salads and catering trays",
    },
    {
      src: "/case-studies/ameci-pizza-culver/supporting-4.webp",
      alt: "Thirty years in University Park: the family's story beside photos of a pizza and the shopfront",
    },
    {
      src: "/case-studies/ameci-pizza-culver/supporting-5.webp",
      alt: "What University Park is saying about us: Google reviews in a carousel",
    },
  ],

  introduction:
    "Ameci Pizza Kitchen is a family-owned pizzeria in Irvine, California, open since 1994. In November 2026, Zenith Digital replaced its Replit-built site with a Wix Studio landing page in about a week: menu and specials the team edits in the Wix CMS, ordering one tap away, and catering and newsletter forms that land in the Wix CRM.",
  approach: [
    {
      heading: "A pizzeria, not a template",
      body: "The page leads with what only Ameci can say: family-owned since 1994, dough stretched by hand every morning, a kitchen that came from Queens. The favourites, the story and the reviews follow in the order a hungry visitor scrolls.",
    },
    {
      heading: "Specials and menu the team edits",
      body: "The daily specials and the full menu live in the Wix CMS, so the team changes a price or swaps a deal from a simple list, and the page updates. Every order button goes straight to the restaurant's existing ordering site.",
    },
    {
      heading: "Two forms that do a job",
      body: "Catering enquiries come in with the date, headcount and pickup or delivery already filled in, and newsletter sign-ups build a list for new specials. Both go into the Wix CRM, so nothing sits in an inbox.",
    },
  ],
  results: [
    {
      value: "Edited in-house",
      label: "Specials and menu updated by the team in the Wix CMS",
      positive: true,
    },
    {
      value: "Catering + newsletter",
      label: "Two forms collecting enquiries and subscribers in the Wix CRM",
      positive: true,
    },
  ],
  resultsNote:
    "The site went live in November 2026, so it's too early for numbers. What changed on day one: the team runs its own specials and menu, and catering enquiries and newsletter sign-ups now arrive in one place.",
  techUsed: [
    { label: "Landing page", href: "/services/landing-pages" },
    { label: "Wix Studio design", href: "/services/wix-studio-website-design" },
    "Wix CMS menu and specials",
    "Wix CRM forms",
    "Third-party ordering links",
  ],
  publishedAt: "2026-11-21",
  cta: {
    heading: ["Does your website look", "like everyone else's?"],
    paragraph:
      "A free 20-minute call. We'll tell you what a page built for your business needs, how quickly it can be live, and what it would cost.",
  },
  seo: {
    title: "Ameci Pizza Kitchen case study | Wix Studio landing page | Zenith Digital",
    description:
      "How Zenith Digital replaced Ameci Pizza Kitchen's generic AI-built site with a Wix Studio landing page in a week, with a menu and specials the team edits itself.",
  },
};

/**
 * PRESSURE TEST SCOTLAND: drafted and published 21 Nov 2026. Scroll shot to
 * follow (the first export was cut off at 16,384px; re-export at 1x).
 *
 * Facts from owner (21 Nov 2026): July 2026, 3 weeks. David Connel (owner)
 * came to Finlay at Wellington Web Co, and the two studios built it together.
 * Custom Next.js, content in Sanity, enquiries stored in Supabase. Classic
 * local business site connected to his Google Business Profile, with a page
 * per service and his area of operation. Owner reports David now ranks
 * higher on Google and is very happy.
 * NOT CLAIMED: "ranking higher" has no query, position or date range behind
 * it, so the study says what was built for search, not that rankings rose.
 * Send a Search Console export or 2 or 3 tracked queries with before and
 * after positions and it becomes a real result.
 * Live site checked 21 Nov 2026: Scotland-wide pipe pressure testing from an
 * Ayr base, on water mains since 2003; services: new mains, pressure
 * testing, swabbing/chlorination/sampling, certification and tie-ins, flow
 * and pressure testing; quote form on the first screen (name, site
 * location, service needed); WIRS, SMAS SSIP and SafeContractor shown;
 * standards strip (BS EN 805, WIS 4-01-03, BS 8558); coverage section.
 */
export const pressureTestScotland: CaseStudyDetail = {
  ...cardOf("pressure-test-scotland"),
  headline: "How Pressure Test Scotland got a custom site that turns searches into quote requests",
  stats: [
    { value: "3 weeks", label: "From brief to launch, July 2026" },
    { value: "1 form", label: "Quote requests stored in Supabase, first screen" },
  ],
  meta: {
    industry: INDUSTRIES.trades,
    engagementType: "New build, with Wellington Web Co",
    timeline: "3 weeks, launched July 2026",
    platform: "Custom code (Next.js) + Sanity CMS + Supabase",
    liveUrl: "https://www.pressuretestscotland.co.uk",
  },
  challenge: [
    "Pressure Test Scotland has worked on Scotland's water mains since 2003. From a base in Ayr, it lays new mains, pressure tests them, chlorinates and samples them, and hands contractors the certificate pack that gets a main connected to Scottish Water.",
    "The work comes from housebuilders, utility contractors and consultants who need a specialist on a set date, and who usually start with a search. David Connel needed a site that shows up for each service across his area, proves the accreditations at a glance, and makes asking for a quote the easiest thing on the page. He took the brief to Finlay at Wellington Web Co, and Zenith Digital built it with them.",
  ],
  heroShot: {
    src: "/case-studies/pressure-test-scotland/hero.webp",
    alt: "Pressure Test Scotland's website in a browser window: Scotland-wide pipe pressure testing based in Ayr, with a quote form on the first screen",
  },  gallery: [
    {
      src: "/case-studies/pressure-test-scotland/supporting-1.webp",
      alt: "Pressure Test Scotland's homepage in a browser window: Scotland-wide pipe pressure testing based in Ayr, with the quote form beside the headline",
    },
    {
      src: "/case-studies/pressure-test-scotland/supporting-2.webp",
      alt: "The services section: new mains, pressure testing, swabbing, chlorination and sampling, and certification and tie-ins",
    },
    {
      src: "/case-studies/pressure-test-scotland/supporting-3.webp",
      alt: "Why businesses choose Pressure Test Scotland: honest, punctual, saving money and industry recognised",
    },
    {
      src: "/case-studies/pressure-test-scotland/supporting-4.webp",
      alt: "Who it works with: groundworks and civils contractors, and developers and housebuilders",
    },
    {
      src: "/case-studies/pressure-test-scotland/supporting-5.webp",
      alt: "The services page: The whole commissioning stage, one specialist, over a photo of a laid main",
    },
  ],

  introduction:
    "Pressure Test Scotland is a water mains testing and commissioning specialist based in Ayr. In July 2026, Zenith Digital and Wellington Web Co built its website in three weeks: custom Next.js, content in Sanity, quote requests stored in Supabase, a page for every service, and the site tied to its Google Business Profile.",
  approach: [
    {
      heading: "A page for every service",
      body: "New mains, pressure testing, chlorination and sampling, certification and tie-ins, flow testing: each has its own page, written in the terms contractors search for and the standards they check, so each one can be found on its own.",
    },
    {
      heading: "The quote form comes first",
      body: "The first screen carries a short quote form: name, site location, the service needed. Every request is stored in Supabase as well as sent on, so nothing gets lost in an inbox.",
    },
    {
      heading: "Proof where contractors look",
      body: "The accreditations, the standards the work is tested to and the area covered sit near the top, and the site is linked to the Google Business Profile, so the search result and the site tell the same story.",
    },
  ],
  results: [
    {
      value: "Live in 3 weeks",
      label: "Custom Next.js build, launched July 2026",
      positive: true,
    },
    {
      value: "Every request stored",
      label: "Quote requests saved in Supabase, not just emailed",
      positive: true,
    },
    {
      value: "Over and above my expectations",
      label: "David Connel, Director, on the build",
      isQuote: true,
    },
  ],
  resultsNote:
    "Pressure Test Scotland now has a page for each of its services, a quote form on every visit, and a site and Google Business Profile that point to each other. It was built with Wellington Web Co, one of the partners behind dozens of local business sites across Scotland.",
  testimonial: quoteOf("david-connel"),
  techUsed: [
    { label: "Partnership build", href: "/partnerships" },
    "Custom code (Next.js)",
    "Sanity CMS",
    "Supabase enquiry storage",
    "Google Business Profile",
    "Local service pages",
  ],
  publishedAt: "2026-11-21",
  cta: {
    heading: ["Do your services each", "have a page Google can find?"],
    paragraph:
      "A free 20-minute call. We'll tell you what a site built to bring in quote requests needs, whether custom code or Wix Studio suits you, and what it would cost.",
  },
  seo: {
    title: "Pressure Test Scotland case study | Custom Next.js site | Zenith Digital",
    description:
      "How Zenith Digital and Wellington Web Co built Pressure Test Scotland a custom Next.js site in 3 weeks, with a page per service and quote requests stored in Supabase.",
  },
};

// Every live detail page, in next-study rotation order.
export const caseStudyDetails: CaseStudyDetail[] = [
  ...shippedDetails,
  lepaCouture,
  bianomics,
  techtonnik,
  highlandFling,
  destilerijaGorska,
  ameciPizza,
  pressureTestScotland,
];

/** Slugs with a shipped detail page — their cards flip to internal links. */
export const detailSlugs = new Set(caseStudyDetails.map((d) => d.slug));

/**
 * A link to a study's detail page that only goes live with the study. Until
 * the slug ships in `caseStudyDetails`, it returns `fallback` (undefined
 * hides the link). Use it for hand-placed links to held drafts so publishing
 * a study switches every link on in the same commit.
 */
export function studyHref(slug: string): string | undefined;
export function studyHref(slug: string, fallback: string): string;
export function studyHref(slug: string, fallback?: string): string | undefined {
  return detailSlugs.has(slug) ? `/case-studies/${slug}` : fallback;
}

/** A card is in an industry by its main tag or any `alsoIn` tag. */
export function inIndustry(card: CaseStudyCard, key: IndustrySlug): boolean {
  return card.industry === key || Boolean(card.alsoIn?.includes(key));
}

/** Whether a project is built on a platform (by its platform tags). */
export function onPlatform(card: CaseStudyCard, p: Platform): boolean {
  return card.platforms?.includes(p) ?? false;
}

/**
 * Projects built on a platform, case studies with a detail page first, the
 * way the industry pages order their work.
 */
export function cardsOnPlatform(p: Platform): CaseStudyCard[] {
  return caseStudyCards
    .filter((c) => onPlatform(c, p))
    .sort(
      (a, b) => Number(detailSlugs.has(b.slug)) - Number(detailSlugs.has(a.slug)),
    );
}

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
  heading: "See how Zenith Digital",
  headingMuted: "turns websites into revenue.",
  support:
    "We partner with founders, marketing teams, and small businesses, turning websites and SEO into assets that compound. These aren't showcase sites built to impress other designers. They're working websites built for real businesses, with specific problems to solve and real outcomes attached.",
  stats: [
    { value: "100+", label: "Websites since 2019" },
    { value: "€1M+", label: "Campaign revenue, MOD Digital" },
    { value: "5.96x", label: "Average ROAS, managed campaigns" },
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
/** Beside the grid's filter pills; shown once the /industries hub has a route. */
export const csIndustriesLink = { label: "Browse by industry", href: "/industries" };

export const csFinalCta = {
  heading: ["Your business could be the next", "card up there"],
  paragraph:
    "A free 20-minute call. We'll tell you honestly what's holding your site back, and what it would take to fix it.",
  cta: { label: "Book a call", href: "/book-a-call" },
  ctaSecondary: { label: "Get a free audit", href: "/free-website-audit" },
  image: "/textures/studio-texture.jpg",
};
