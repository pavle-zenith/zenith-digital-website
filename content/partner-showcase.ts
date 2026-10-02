import { hero as homeHero } from "./home";

/*
 * Shape of the page, from Docs/Partner_Showcase_Handoff.md §4. Owner edits
 * since the handoff (2 Oct 2026): the proof figures under the hero are gone,
 * "Shopify Partner" joins the work stats, the tech list is longer, the service
 * sliders use each project's 4:3 picture with a name and a description each,
 * and the homepage's free-audit section follows the services.
 */
export interface ShowcaseSlide { image: string; client: string; caption: string }

export interface ShowcaseService {
  id: string;                    // anchor
  name: string;
  when: string;                  // one line: the situation this solves
  description: string;
  deliverables: string[];
  slides: ShowcaseSlide[];       // 1+; the row must look right with exactly one
}

export interface PartnerShowcase {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string; heading: string; lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  work: { heading: string; intro: string; stats: string[] };
  services: { heading: string; intro: string; items: ShowcaseService[] };  // exactly 5
  together: { heading: string; steps: { title: string; body: string }[] }; // exactly 3
  tech: { heading: string; line: string; groups: { label: string; items: { name: string; logo?: string }[] }[] };
  process: { name: string; heading: string;
             steps: { step: string; label: string; heading: string; points: string[] }[] };
  projects: { heading: string; intro: string };
  close: { heading: string; paragraph: string };
}

/**
 * /partner-showcase: private page a performance-marketing partner shows to
 * their own clients. Reader = a business owner already paying for ads.
 * White-label arrangement: the partner sells this under his own offer.
 * Rules (owner, 2 Oct 2026): no prices of any kind; the partner is never
 * named; no links to Zenith's booking, audit, service or pricing pages; never
 * list ad campaign management (the partner's own service); every figure uses
 * the wording and attribution already published on the site.
 */
export const partnerShowcase: PartnerShowcase = {
  meta: {
    title: "Websites and landing pages for your campaigns | Zenith Digital",
    description:
      "Websites, stores and landing pages built for the traffic your ads bring. Founder-led, and live in weeks.",
  },

  hero: {
    eyebrow: "Your website partner",
    heading: "Ads bring the right people. The page turns them into customers.",
    lead: "Zenith Digital designs and builds the websites, stores and landing pages your campaigns send people to. One founder-led team, working alongside your ads partner, live in weeks.",
    primaryCta: { label: "See the work", href: "#work" },
    secondaryCta: { label: "What you get", href: "#services" },
  },


  work: {
    heading: "A sample of what we ship",
    intro: "Websites, stores and campaign pages for businesses in the UK, EU and US.",
    stats: ["100+ websites launched", "Wix Legend Partner", "Shopify Partner", "Building since 2019"],
  },

  services: {
    heading: "Five things we do, and what you get with each",
    intro: "Pick the one that matches where you are. Most ad clients start with the first.",
    items: [
      {
        id: "landing-pages",
        name: "Landing pages and CRO",
        when: "You're paying for clicks and sending them to your homepage.",
        description:
          "A dedicated page for each campaign, written and built around one action. Built so your ads partner can test versions against each other.",
        deliverables: [
          "Conversion-first copy and structure",
          "Design and build matched to your brand",
          "Form, CRM and booking integrations",
          "Speed-optimised for paid traffic",
          "Variant-ready for testing",
        ],
        slides: [
          { image: "/case-studies/mod-digital/card.webp", client: "MOD Digital", caption: "15+ landing pages behind MOD Digital's client campaigns." },
          { image: "/case-studies/hunting-brook-gardens/card.webp", client: "Hunting Brook Gardens", caption: "Course and event launch pages for Hunting Brook Gardens." },
          { image: "/case-studies/jim-steele/card.webp", client: "Jim Steele", caption: "Marketing page and lead-capture ecosystem for a UK motivational speaker." },
          { image: "/case-studies/iskra/card.webp", client: "Iskra", caption: "Landing page and store funnel for a quit-smoking tracker app." },
        ],
      },
      {
        id: "websites",
        name: "Website development",
        when: "Your site looks fine but doesn't sell, or you've outgrown a template.",
        description:
          "A full website planned around your buyers: structure first, then copy, then design. Your team can edit everything afterwards.",
        deliverables: [
          "Structure and wireframes built around your buyers",
          "Conversion copywriting",
          "Design and build, with custom features where you need them",
          "On-page SEO fundamentals",
          "Analytics and lead capture wired in",
          "A recorded handover so your team can edit everything",
        ],
        slides: [
          { image: "/case-studies/scottish-luxury-experience/card.webp", client: "Scottish Luxury Experience", caption: "$521k in bookings in 7 months." },
          { image: "/case-studies/atw-trucking/card.webp", client: "ATW Trucking", caption: "A freight and logistics site, rebuilt end to end." },
          { image: "/case-studies/bianomics/card.webp", client: "Bianomics", caption: "A consultancy positioning site: brand, PR, events, operations and workforce programmes in one offer." },
          { image: "/case-studies/yacht-junky/card.webp", client: "Yacht Junky", caption: "A boat and yacht marketplace." },
        ],
      },
      {
        id: "ecommerce",
        name: "eCommerce development",
        when: "You sell products online and the store is holding sales back.",
        description:
          "Stores on Shopify or Wix Studio, set up so products are easy to find and checkout is short. Built in more than one language when you sell across borders.",
        deliverables: [
          "Store design and build on Shopify or Wix Studio",
          "Product catalogue and collections set up",
          "Checkout, payments and shipping configured",
          "Multi-language stores for new markets",
          "Training so your team can run the store",
        ],
        slides: [
          { image: "/case-studies/stilby/card.webp", client: "Stilby", caption: "Three languages, launched in two weeks." },
          { image: "/case-studies/lepa-couture/card.webp", client: "Lepa Couture", caption: "A made-to-order couture storefront on Shopify." },
          { image: "/case-studies/notyou-brand/card.webp", client: "NotYou Brand", caption: "A drop-driven streetwear store and lookbook." },
          { image: "/case-studies/destilerija-maodus/card.webp", client: "Destilerija Maodus", caption: "A distillery brand site with gift ordering." },
        ],
      },
      {
        id: "migrations",
        name: "Website migrations",
        when: "You want off your current platform without losing your Google rankings.",
        description:
          "We move the site page by page, redirect every old address and watch Google for 30 days after launch.",
        deliverables: [
          "Full URL inventory and 1:1 redirect map",
          "Content and CMS migration",
          "Page titles, descriptions and schema carried across",
          "Speed and Core Web Vitals pass",
          "30 days of indexing monitoring after launch",
        ],
        slides: [
          { image: "/case-studies/katie-hailey/card.webp", client: "Katie Hailey", caption: "Yoga, sound healing and retreat bookings for a UK practitioner, from Figma to live in 1.5 weeks." },
          { image: "/case-studies/belistria/supporting-1.webp", client: "Bel'Istria", caption: "35+ pages moved, impressions up 257% year on year." },
          { image: "/case-studies/genroks-ai/card.webp", client: "Genroks AI", caption: "From a Framer template to a custom-coded site." },
          { image: "/case-studies/destilerija-maodus/card.webp", client: "Destilerija Maodus", caption: "Illustrated brand site and gift ordering for a rakija distillery." },
        ],
      },
      {
        id: "seo",
        name: "AEO and SEO",
        when: "The site is live, but people only find you when they already know your name.",
        description:
          "We set the site up so Google and AI assistants like ChatGPT understand what you do, then build the pages that answer what your customers search for. It works alongside your ads, so you aren't paying for every visit.",
        deliverables: [
          "Technical and on-page SEO",
          "AEO: schema, structure and visibility in AI answers",
          "Keyword and content strategy",
          "Monthly reporting in plain language",
        ],
        slides: [
          { image: "/case-studies/belistria/supporting-2.webp", client: "Bel'Istria", caption: "257% growth in search impressions, year on year." },
          { image: "/case-studies/just-stay/card.webp", client: "Just Stay", caption: "Short-let booking funnel and landlord pipeline for a UK Airbnb superhost." },
          { image: "/case-studies/genroks-ai/card.webp", client: "Genroks AI", caption: "Custom-coded rebrand and AEO for an AI compliance startup." },
        ],
      },
    ],
  },

  together: {
    heading: "How we work with your ads partner",
    steps: [
      { title: "They run the campaigns", body: "Targeting, creative and budget stay exactly where they are." },
      { title: "We build where the traffic lands", body: "Pages matched to each campaign's message, so the click and the page say the same thing." },
      { title: "One shared loop", body: "Your ads partner sees what converts, tells us, and we adjust the page. You don't have to translate between us." },
    ],
  },

  tech: {
    heading: "Built on the platform that fits you",
    line: "We choose the platform for your team and your budget, not the other way round.",
    groups: [
      {
        label: "Platforms",
        items: [
          { name: "Wix Studio", logo: "/logos-white/wix-studio.png" },
          { name: "Shopify", logo: "/logos-white/shopify-partners.png" },
          { name: "Webflow", logo: "/platforms/webflow.svg" },
          { name: "Framer", logo: "/platforms/framer.webp" },
        ],
      },
      { label: "Custom builds", items: [{ name: "Next.js" }, { name: "Sanity CMS" }, { name: "Supabase" }, { name: "Vercel" }] },
      {
        label: "Analytics and search",
        items: [
          { name: "Google Analytics 4" },
          { name: "Google Search Console" },
          { name: "PostHog" },
          { name: "Hotjar" },
          { name: "Microsoft Clarity" },
        ],
      },
      {
        label: "Payments and bookings",
        items: [{ name: "Stripe" }, { name: "PayPal" }, { name: "Cal.com" }, { name: "CRMs and booking tools" }],
      },
    ],
  },

  process: {
    name: "The Zenith Sprint",
    heading: "From first call to live, in five steps",
    steps: [
      { step: "Step 1", label: "Discovery", heading: "We learn your business and your campaigns first", points: ["Free strategy call", "Goals, buyers and offers mapped"] },
      { step: "Step 2", label: "Research", heading: "Competitors, keywords and what actually converts", points: ["Market and competitor teardown", "Input from your ads partner"] },
      { step: "Step 3", label: "Wireframing", heading: "Structure and copy locked before visuals", points: ["Page-by-page wireframes", "Conversion-first copywriting"] },
      { step: "Step 4", label: "Build", heading: "Designed and built, reviewed live with you", points: ["Design and build on your platform", "You review directly, we iterate"] },
      { step: "Step 5", label: "Launch", heading: "Live, tracked and handed over", points: ["QA, SEO and speed checks", "Handover so your team can edit"] },
    ],
  },

  projects: {
    heading: "All projects",
    intro: "Filter by industry to find a business like yours.",
  },

  close: {
    heading: "Ready to start?",
    paragraph: "Speak to the person who shared this page with you. They'll set up the first call and bring us in.",
  },
};

/**
 * The page's own labels: chrome, jump bar and slider microcopy. Not part of
 * the §5 copy above, which is final; these are the strings the handoff's
 * layout section (§6) names, kept here so no component carries copy.
 */
export const partnerShowcaseUi = {
  wordmark: "zenith digital",
  /** The Wix credentials, the same three badges as the homepage hero. */
  badges: homeHero.certifications,
  footer: "© 2026 Zenith Digital",
  jumpLabel: "Page sections",
  jump: [
    { id: "work", name: "Work" },
    { id: "services", name: "Services" },
    { id: "platforms", name: "Platforms" },
    { id: "process", name: "Process" },
    { id: "projects", name: "All projects" },
  ],
  firstServicePill: "Most ad clients start here",
  /** Closes every tool row on Platforms: the lists are a sample, not the limit. */
  moreTools: "& more",
  /** The work reel's pause control (moving content needs one: WCAG 2.2.2). */
  reelLabel: "Project screenshots",
  pauseReel: "Pause the project screenshots",
  playReel: "Play the project screenshots",
  examples: (service: string) => `${service} examples`,
  previous: (service: string) => `Previous ${service} example`,
  next: (service: string) => `Next ${service} example`,
  counter: (n: number, total: number) => `${n} / ${total}`,
  counterSr: (n: number, total: number) => `Example ${n} of ${total}`,
};
