import type { CtaLink, Metric } from "@/lib/types";

import { attribution, testimonial } from "./testimonials-data";

/**
 * Homepage content. Single source of truth for all section copy + asset paths.
 * Copy is drafted from the live Zenith site, re-pointed at the real ICP
 * (businesses that outgrow templates), per the homepage brief. Real figures only.
 */

export const BOOK_CALL: CtaLink = {
  label: "Book a call",
  href: "/book-a-call",
  variant: "primary",
};
export const AUDIT: CtaLink = {
  label: "Free website audit",
  href: "/free-website-audit",
  variant: "secondary",
};

// 1. Hero
export const hero = {
  badgePrefix: "Top 1% Partner of",
  badgeBrand: "Wix Studio",
  headline: "Wix Studio websites for businesses that outgrow templates.",
  subhead:
    "We design, build, and launch results-driven Wix Studio websites. And when you outgrow Wix, we build custom.",
  proof: {
    label: "100+ Websites Created",
    avatars: [
      "/avatars/flynn-blackie.jpg",
      "/avatars/uros-stanimirovic.jpg",
      "/avatars/ivan-belobrajdic.jpg",
    ],
  },
  ctas: [
    BOOK_CALL,
    {
      label: "See our work",
      href: "/case-studies",
      variant: "secondary",
    } as CtaLink,
  ],
  // 2x2 highlighted case studies that flow directly out of the hero.
  // Shots come from /portfolio-blocky: browser mockups on each client's own
  // backdrop, mostly 1:1 with the window centred and wide margins, so the card's
  // 16:10 centre crop takes backdrop and never the window. OWNER: these are the
  // uncompressed source PNGs (13MB across the four); compress before launch.
  featured: [
    {
      client: "Bel'Istria",
      tag: "Travel",
      metric: "257% more impressions",
      image: "/portfolio-blocky/belistria.png",
      href: "/case-studies",
    },
    {
      client: "Knode AI",
      tag: "SaaS",
      metric: "$10M Series A raised",
      image: "/portfolio-blocky/knode.png",
      href: "/case-studies",
    },
    {
      client: "Fort Lauderdale Dock Rentals",
      tag: "Marine",
      metric: "30+ warm leads",
      image: "/portfolio-blocky/fort-lauderdale-dock-rentals.png",
      href: "/case-studies",
    },
    {
      client: "Scottish Luxury Experience",
      tag: "Travel",
      metric: "$521k in 7 months",
      // The Safari-chrome shot on the mountain-and-lake backdrop, 4:3.
      image: "/portfolio-blocky/scottish-luxury-experience.png",
      href: "/case-studies",
    },
  ],
};

// 2. Stat strip
export const stats: Metric[] = [
  { value: "100+", label: "Projects completed" },
  { value: "3-4 wks", label: "Average launch" },
  { value: "€1M+", label: "Client revenue generated" },
  { value: "5.96x", label: "Average ROAS" },
];

// 3. Client logo strip
export const logos = {
  caption: "Trusted by 100+ businesses across the UK, EU, and US.",
  // Dark/blue marks that read on the white hero strip.
  items: [
    { src: "/logos-dark/knode.png", alt: "Knode" },
    { src: "/logos-dark/techtonnik.png", alt: "Techtonnik" },
    { src: "/logos-dark/mod.png", alt: "MOD Digital" },
    { src: "/logos-dark/capacity.png", alt: "Capacity" },
    { src: "/logos-dark/genroks.png", alt: "Genroks" },
    { src: "/logos-dark/stilby.png", alt: "Stilby" },
  ],
};

// 4. Why they chose Zenith — dark bento grid. `art` selects the line-art visual;
// `span` sets the column width (3 across the top, 2 wider on the bottom).
export const whyZenith = {
  heading: "The reasons businesses pick us, and stay",
  intro:
    "We're not the cheapest and we're not trying to be. We're the team that ships fast, protects what you've built, and knows Wix Studio better than anyone.",
  cta: { label: "Book a call", href: "/book-a-call" },
  // Center image between the header and the cards.
  image: "/why-zenith-highlight.webp",
  items: [
    {
      icon: "migrate",
      title: "Migration without headaches",
      body: "We've moved sites from WordPress, Webflow, Squarespace, Framer, and custom HTML without any surprises.",
    },
    {
      icon: "search",
      title: "100% SEO & GEO retention",
      body: "We protect the organic visibility you've already earned, and set you up for AI discoverability from day one.",
    },
    {
      icon: "grid",
      title: "Cross-industry experience",
      body: "SaaS startups, consulting firms, e-commerce brands, event agencies, course platforms, real estate platforms & more.",
    },
    {
      icon: "award",
      title: "Wix Professionals since 2019",
      body: "We've been building on the platform since before most agencies knew it existed which means we know exactly what it can do, and exactly where its limits are.",
    },
    {
      icon: "globe",
      title: "Europe based, pragmatically raised",
      body: "Based in Belgrade. Operating across the UK, EU, and US. We run lean, communicate clearly, and make sure your budget goes into the actual work.",
    },
  ],
};

// 5. Comparison matrix — last column is the highlighted Zenith column.
/**
 * Each cell carries how good that answer is, so the table can mark itself:
 * `good` renders the verified tick, `mixed` a question mark, `bad` a cross.
 */
export type ComparisonRating = "good" | "mixed" | "bad";
export type ComparisonCell = { text: string; rating: ComparisonRating };

const good = (text: string): ComparisonCell => ({ text, rating: "good" });
const mixed = (text: string): ComparisonCell => ({ text, rating: "mixed" });
const bad = (text: string): ComparisonCell => ({ text, rating: "bad" });

export const comparison = {
  heading: "How we compare to AI websites, freelancers, and agencies",
  intro:
    "Every option gets you a website. This is what each one actually costs you over a year.",
  columns: ["", "AI websites", "Freelancers", "Agencies", "Zenith Digital"],
  rows: [
    {
      criterion: "Annual cost",
      values: [
        mixed("Cheap, until it isn't"),
        mixed("Unpredictable"),
        bad("€15k–50k+"),
        good("From €2,500, fixed"),
      ],
    },
    {
      criterion: "Time to launch",
      values: [
        mixed("Minutes, then weeks of fixing it"),
        bad("Whenever"),
        bad("2–4 months"),
        good("3–4 weeks"),
      ],
    },
    {
      criterion: "Consistent team",
      values: [
        bad("No team at all"),
        mixed("One person, no backup"),
        mixed("Rotating staff"),
        good("Same team, start to finish"),
      ],
    },
    {
      criterion: "Copywriting included",
      values: [
        bad("Generic filler"),
        bad("Rarely"),
        mixed("Extra cost"),
        good("Included"),
      ],
    },
    {
      criterion: "SEO & AEO",
      values: [
        bad("Thin, templated pages"),
        mixed("Sometimes"),
        mixed("Add-on"),
        good("Built in"),
      ],
    },
    {
      criterion: "Post-launch support",
      values: [
        bad("A chatbot"),
        mixed("Unpredictable"),
        mixed("Retainer required"),
        good("30 days free, then flexible"),
      ],
    },
    {
      criterion: "You own and can edit it",
      values: [
        bad("Locked to their platform"),
        mixed("Depends"),
        bad("Often locked in"),
        good("Yes, with a handover"),
      ],
    },
  ],
};

// 6. Services (bento grid)
export const services = {
  heading: "Everything you need to design, build, and grow online.",
  intro:
    "One team for the whole journey. From a first Wix Studio build to migrations, campaigns, and white-label work for agencies.",
  cta: {
    label: "All services",
    href: "/services",
    variant: "primary",
  } as CtaLink,
  // Stripe-style grid: row 1 = two wide (span 3 of 6), row 2 = three equal
  // Stripe-style grid (6 cols): three rows of two equal cards (span 3).
  // `image` is the per-service generated mockup.
  items: [
    {
      title: "Website design & development",
      href: "/services/wix-studio-website-design",
      description:
        "Fast, structured, conversion-ready sites that turn visitors into paying clients.",
      image: "/services/web-design.webp",
      span: 3,
    },
    {
      title: "Landing pages",
      href: "/services",
      description:
        "High-converting pages for campaigns, launches, and lead capture.",
      image: "/services/landing-pages.webp",
      span: 3,
    },
    {
      title: "White-label design & development",
      href: "/partnerships",
      description:
        "Unbranded builds for agencies and freelancers to resell under their own brand.",
      image: "/services/white-label.webp",
      span: 3,
    },
    {
      title: "SEO, AEO & PPC campaigns",
      href: "/services/seo-aeo-ppc",
      description:
        "Search and paid campaigns tied to your site so every euro lands somewhere built to convert.",
      image: "/services/seo-aeo.webp",
      span: 3,
    },
    {
      title: "Website migrations",
      href: "/services/website-migration",
      description:
        "Move to Wix Studio from any platform with full URL mapping and zero ranking loss.",
      // Interactive before/after slider instead of a static mockup. Client
      // name intentionally not shown on the card.
      beforeAfter: {
        before: "/before-after/foxstays-before.jpg",
        after: "/before-after/foxstays-after.jpg",
      },
      span: 3,
    },
    {
      title: "Wix Studio development",
      href: "/services",
      description:
        "Custom code, CMS architecture, and integrations on top of Wix Studio.",
      image: "/services/wix-studio.webp",
      span: 3,
    },
  ],
};

// 6b. Video testimonials (on the faint textured navy bg, white hairline frame)
// Video testimonial data now lives in content/testimonials.ts (single source
// of truth shared with /testimonials); re-exported here for existing imports.
export { videoTestimonials } from "./testimonials";

// 6a. Case studies showcase (two-panel cards: thumbnail + branded panel)
// Featured two-panel cards now live in content/case-studies.ts (single
// source of truth); re-exported here for existing imports.
export { caseStudies } from "./case-studies";

// 6b. Full-bleed image CTA band between the case studies and the cross-industry
// logo grid (Stripe Sessions banner style: photo background, headline top-left,
// white button below, wordmark bottom-right).
export const caseStudiesCta = {
  heading: ["The websites behind", "100+ business wins"],
  paragraph:
    "Browse the full portfolio of Wix Studio and custom builds, with the numbers behind each one.",
  cta: { label: "View all case studies", href: "/case-studies" },
  image: "/textures/studio-texture.jpg",
};

// 6c. Cross-industry client grid (copied 1:1 from the live site)
export const crossIndustry = {
  heading:
    "We leverage our 10 years of expertise from cross-industry projects for our clients",
  // logo paths are placeholders; swap for the real marks. Names kept so it's clear which logo goes where.
  items: [
    {
      name: "Knode",
      logo: "/logos-blue/knode.avif",
      text: "Full SaaS website & Landing page from scratch in 3 weeks. Knode is currently raising $10M Series A.",
    },
    {
      name: "Techtonnik",
      logo: "/logos-dark/techtonnik.png",
      text: "Web fulfillment partners since 2023. Delivered 10+ Websites & 2 Web apps.",
    },
    {
      name: "MOD",
      logo: "/logos-blue/mod.avif",
      text: "Delivered 15+ Landing pages for marketing campaigns generating €1M+ in client revenue.",
    },
    {
      name: "Capacity",
      logo: "/logos-blue/capacity.avif",
      text: "Fractional web design team leading design & development operations.",
    },
    {
      name: "Empyrean Global",
      logo: "/logos-blue/empyrean.avif",
      text: "Redesigned web identity from scratch & acted as website consulting partner.",
    },
    {
      name: "BoomBoom Creatives",
      logo: "/logos-blue/boomboom.avif",
      text: "Several marketing landing pages throughout 2023/2024 in Webflow / Wix Studio.",
    },
    {
      name: "Stilby",
      logo: "/logos-dark/stilby.png",
      text: "Developed and launched two websites to expand into Montenegro & Slovakia markets.",
    },
    {
      name: "Genroks",
      logo: "/logos-blue/genroks.avif",
      text: "Two separate web identities for an AI ISO Standard Compliance Generator Startup in Framer.",
    },
    {
      name: "Fox Energy",
      logo: "/logos-blue/foxenergy.avif",
      text: "Full scale marketing website for oil & gas company looking to attract investors.",
    },
    {
      name: "NOTYOU",
      logo: "/logos-blue/notyou.avif",
      text: "Full web e-Commerce identity for a popular local brand from ATL, Georgia.",
    },
    {
      name: "AdVantage",
      logo: "/logos-blue/advantage.avif",
      text: "Managing dozens of client websites, security and email systems since 2024.",
    },
    {
      name: "FoxStays",
      logo: "/logos-blue/foxstays.avif",
      text: "Web app and lead generation ecosystem for the yacht & dock rental market.",
    },
    {
      name: "LMF HR",
      logo: "/logos-blue/lmfhr.avif",
      text: "Fractional Web Design & IT Partner for consulting firm clients in Indianapolis.",
    },
    {
      name: "Jim Steele",
      logo: "/logos-blue/jimsteele.avif",
      text: "Marketing page & lead capture ecosystem for UK's popular motivational speaker.",
    },
    {
      name: "Creatify Collective",
      logo: "/logos-blue/creatify.avif",
      text: "Development of a full brand identity for a growing Videography agency.",
    },
    {
      name: "Kema Coatings",
      logo: "/logos-blue/kema.avif",
      text: "Two branded websites for an expanding coating & protection company.",
    },
  ],
};

// 7. Featured work
export const featuredWork = {
  eyebrow: "Selected work",
  heading: "Real businesses. Real numbers.",
  // Deep links: every named client points at their own study now that the
  // detail pages exist (service/home proof → study is the SEO circuitry).
  cases: [
    {
      client: "MOD Digital",
      industry: "Marketing",
      metric: "15+",
      metricLabel: "landing pages shipped",
      image: "/work/work-1.jpg",
      href: "/case-studies/mod-digital",
    },
    {
      client: "Scottish Luxury Experience",
      industry: "Travel",
      metric: "$521k",
      metricLabel: "revenue in 7 months",
      image: "/work/work-2.jpg",
      href: "/case-studies/scottish-luxury-experience",
    },
    {
      client: "Bel'Istria",
      industry: "Travel",
      metric: "257%",
      metricLabel: "more impressions",
      image: "/work/work-3.jpg",
      href: "/case-studies/belistria",
    },
    {
      client: "Hunting Brook",
      industry: "Courses",
      metric: "€140k",
      metricLabel: "in course sales",
      image: "/work/work-4.jpg",
      href: "/case-studies/hunting-brook-gardens",
    },
  ],
};

// 8. Industries served — horizontal card slider (Stripe "startups" carousel style).
// Images are placeholders (swap for real client shots). Industries are drawn from
// the portfolio; the blurb names the kind of work delivered in each vertical.
export const industries = {
  heading: "Industries we work with",
  intro:
    "Ten years of cross-industry builds. We know the buyers, the objections, and the pages that convert in each of these markets.",
  items: [
    {
      name: "SaaS & tech",
      blurb:
        "Product sites and web apps that turn launches into pipeline. Knode raised $10M with theirs.",
      href: "/industries/saas-tech",
      image: "/industries/saas-tech.jpg",
    },
    {
      name: "Travel & hospitality",
      blurb:
        "Booking-ready sites for transfers, stays, and experiences. Bel'Istria grew impressions 257%.",
      href: "/industries/travel-hospitality",
      image: "/industries/travel-hospitality.jpg",
    },
    {
      name: "Coaches & speakers",
      blurb:
        "Lead-capture pages built to sell seats and sessions for experts and public speakers.",
      href: "/industries/coaches-speakers",
      image: "/industries/coaches-speakers.jpg",
    },
    {
      name: "Marketing & agencies",
      blurb:
        "Campaign landing pages and white-label builds. MOD's drove €1M+ in client revenue.",
      href: "/industries/marketing-agencies",
      image: "/industries/marketing-agencies.jpg",
    },
    {
      name: "E-commerce & retail",
      blurb:
        "Storefronts and brand sites built to convert, launched across new markets.",
      href: "/industries/ecommerce-retail",
      image: "/industries/ecommerce-retail.jpg",
    },
    {
      name: "Clothing & fashion brands",
      blurb:
        "Brand-led storefronts and lookbooks that make new labels look established from day one.",
      href: "/industries/clothing-fashion",
      image: "/industries/clothing.jpg",
    },
    {
      name: "Creatives & personal brands",
      blurb:
        "Portfolio and personal-brand sites for videographers, photographers, and creators who need to stand out.",
      href: "/industries/creatives",
      image: "/industries/creatives.jpg", // TODO: image coming later
    },
    {
      name: "Professional services",
      blurb:
        "Credible, conversion-ready sites for firms that win work on trust and expertise.",
      href: "/industries/professional-services",
      image: "/industries/professional-services.jpg",
    },
  ],
};

// 8b. "Everything included" — tabbed feature grid. Three tabs, three boxes each.
export const included = {
  heading: "Everything you'd expect in a website",
  intro:
    "No gimmicks. No lock-ins. Just a solid, dependable foundation of industry defining features to support your business.",
  tabs: [
    {
      label: "Reliability & Security",
      boxes: [
        {
          icon: "server",
          title: "Zero downtime track record",
          text: "We've never had a production site go offline in seven years.",
        },
        {
          icon: "shield",
          title: "Top-tier security standards",
          text: "SSL, hardened infrastructure, and sensible permissions as standard.",
        },
        {
          icon: "card",
          title: "Safe payments & data handling",
          text: "Secure payment processing where required, built to industry norms.",
        },
      ],
    },
    {
      label: "Integrations & Flexibility",
      boxes: [
        {
          icon: "plug",
          title: "Connects to your stack",
          text: "CRMs, booking tools, email platforms, and analytics wired in from day one.",
        },
        {
          icon: "code",
          title: "Custom functionality",
          text: "Custom code and APIs on top of Wix Studio when the defaults aren't enough.",
        },
        {
          icon: "layers",
          title: "Grows with you",
          text: "CMS collections and page templates your team can extend without a developer.",
        },
      ],
    },
    {
      label: "Content & Delivery",
      boxes: [
        {
          icon: "pen",
          title: "Copywriting included",
          text: "Conversion-first copy written for every page, not placeholder text.",
        },
        {
          icon: "search",
          title: "SEO & AEO built in",
          text: "Structured data, metadata, and clean URLs from launch day.",
        },
        {
          icon: "rocket",
          title: "Fast handover",
          text: "Live in 3-4 weeks with a walkthrough so your team can edit everything.",
        },
      ],
    },
  ],
};

// 9. Named process — interactive "happiness curve" (Lightdash-style). Five steps
// plotted along a rising curve; the active step highlights its part of the curve
// and shows its heading + bullets. Auto-advances on a timer, loops, clickable.
export const processSection = {
  name: "The Zenith Sprint",
  heading: "The path from first call to a site that performs",
  cta: {
    label: "Start your project",
    href: "/book-a-call",
    variant: "primary",
  } as CtaLink,
  steps: [
    {
      step: "Step 1",
      label: "Discovery",
      heading: "We learn your business before we design a thing",
      points: ["Free strategy call", "Goals, buyers, and offers mapped"],
    },
    {
      step: "Step 2",
      label: "Research",
      heading: "Competitors, keywords, and what actually converts",
      points: ["Market & competitor teardown", "SEO and content plan"],
    },
    {
      step: "Step 3",
      label: "Wireframing",
      heading: "Structure and copy locked before visuals",
      points: ["Page-by-page wireframes", "Conversion-first copywriting"],
    },
    {
      step: "Step 4",
      label: "Development",
      heading: "Designed and built in Wix Studio, reviewed live",
      points: ["Pixel-tight design & build", "You review directly, we iterate"],
    },
    {
      step: "Step 5",
      label: "Launch",
      heading: "Live in 3-4 weeks, with a full handover",
      points: ["QA, SEO, and speed checks", "Handover so your team can edit"],
    },
  ],
};

// 10. Proof / results band
export const proof = {
  heading: "The numbers behind the work",
  metrics: [
    { value: "€1M+", label: "Client revenue generated" },
    { value: "5.96x", label: "Average ROAS" },
    { value: "7 yrs", label: "Zero production downtime" },
    { value: "100+", label: "Projects shipped" },
  ] as Metric[],
};

// 11. Pricing preview — dark, 3-tier section
export const pricing = {
  heading: "Transparent, fixed pricing",
  intro:
    "Fixed scope, fixed price, fixed timeline. No retainers, no licensing traps, no surprise invoices.",
  cta: { label: "Book a call", href: "/book-a-call" },
  // White-label band below the tiers
  whiteLabel: {
    heading: "Agencies: resell our builds under your brand",
    paragraph:
      "White-label production for agencies and freelancers. Unbranded deliverables, NDA, a dedicated point of contact, and partner pricing that protects your margin.",
    ctas: [
      { label: "Explore white-label", href: "/partnerships" },
      { label: "Book a call", href: "/book-a-call" },
    ],
  },
  tiers: [
    {
      name: "The Minimum",
      icon: "pen",
      price: "From €2,500",
      priceNote: "one-time",
      summary:
        "A clean, credible build for businesses that need to launch fast.",
      timeline: "2-week delivery",
      featuresLabel: "Core functionality",
      features: [
        "Up to 5 pages",
        "Wix Studio design & build",
        "Mobile responsive",
        "Basic on-page SEO",
        "1 round of revisions",
      ],
      cta: { label: "Book a call", href: "/book-a-call" },
      highlighted: false,
      badge: "",
    },
    {
      name: "The Studio",
      icon: "layers",
      price: "€4,500",
      priceNote: "one-time",
      summary:
        "Prestige design, custom functionality, and the full SEO and copy stack, handled.",
      timeline: "5-week delivery",
      featuresLabel: "Everything in The Minimum, plus:",
      features: [
        "Up to 12 pages",
        "Custom functionality & CMS",
        "Integrations & automations",
        "Full SEO, GEO & copywriting",
        "3 rounds of revisions",
      ],
      cta: { label: "Book a call", href: "/book-a-call" },
      highlighted: true,
      badge: "Most popular",
    },
    {
      name: "The Zenith",
      icon: "mountain",
      price: "Custom",
      priceNote: "monthly",
      summary:
        "A long-term partnership: growth retainers, ads, SEO campaigns, and ongoing builds.",
      timeline: "Ongoing",
      featuresLabel: "Everything in The Studio, plus:",
      features: [
        "Dedicated design & dev team",
        "Growth retainer & ad campaigns",
        "Ongoing SEO & content",
        "Priority support & SLAs",
        "Unlimited revisions",
      ],
      cta: { label: "Talk to us", href: "/book-a-call" },
      highlighted: false,
      badge: "",
    },
  ],
};

// 12. Founder / team + story
export const founder = {
  eyebrow: "Who you're hiring",
  heading: "The adults in the room.",
  story:
    "Zenith exists because too many businesses get burned by agencies that overpromise and freelancers who disappear. We're Wix Studio experts who've shipped 100+ sites since 2019, and we build fully custom when you outgrow the platform. This site is the proof.",
  signoff: "Pavle Maoduš, Founder",
};

// 13. Testimonials
// 13. Testimonials — tab switcher split with a stats cell. Tabs auto-advance on
// a timer (each tab shows a fill bar). Bold spans in `quote` use **asterisks**.
/**
 * Build a homepage tab from the canonical testimonial: the quote is pulled
 * from the source of truth and `emphasis` is wrapped in ** ** for the tab's
 * bold span, so the wording stays identical to /testimonials.
 */
function featuredTestimonial(
  id: string,
  opts: {
    result: string;
    emphasis?: string;
    logo: string;
    logoAlt?: string;
    logoClass?: string;
    invertLogo?: boolean;
  },
) {
  const t = testimonial(id);
  const quote =
    opts.emphasis && t.quote.includes(opts.emphasis)
      ? t.quote.replace(opts.emphasis, `**${opts.emphasis}**`)
      : t.quote;
  return {
    result: opts.result,
    quote,
    name: t.name,
    role: attribution(t),
    avatar: t.avatar,
    logo: opts.logo,
    logoAlt: opts.logoAlt ?? t.company,
    ...(opts.logoClass ? { logoClass: opts.logoClass } : {}),
    ...(opts.invertLogo ? { invertLogo: opts.invertLogo } : {}),
  };
}

export const testimonials = {
  stats: [
    { value: "100+", label: "Projects shipped" },
    { value: "5.96x", label: "Average ROAS" },
    { value: "€1M+", label: "Client revenue generated" },
  ],
  // Display-only rating row (no CTA — the nav already routes to /testimonials).
  rating: {
    platform: "Clutch",
    score: "5/5",
  },
  /**
   * Featured tabs. Only the outcome headline and the phrase to emphasise are
   * set here; the quote text, name, role, and avatar come from the testimonial
   * source of truth, so the tabs can never drift from /testimonials.
   * `emphasis` must appear verbatim in the quote or the bolding is skipped.
   */
  items: [
    featuredTestimonial("flynn-blackie", {
      result: "10+ brands shipped as MOD Digital's build partner",
      emphasis: "pride, enthusiasm and extreme passion",
      logo: "/logos-dark/mod.png",
    }),
    featuredTestimonial("ivan-belobrajdic", {
      result: "A redesign that became a long-term partnership",
      emphasis: "composure and communication exceeded all standards",
      logo: "/logos-dark/belistria-white.png",
      invertLogo: true,
    }),
    featuredTestimonial("uros-stanimirovic", {
      result: "Rebranded, and conversion skyrocketed",
      emphasis: "Conversion skyrocketed.",
      logo: "/logos-dark/genroks.png",
    }),
    featuredTestimonial("gemma-sole", {
      result: "A full SaaS site and landing page, live in 3 weeks",
      emphasis: "incredibly easy to communicate with their team",
      logo: "/logos-dark/knode.png",
      // the knode mark has lots of padding baked in; render it larger
      logoClass: "h-6 sm:h-8",
    }),
    featuredTestimonial("ben-hall", {
      result: "Our fractional web team, leading design and dev",
      emphasis: "Reliable, fast, and genuinely invested",
      logo: "/logos-dark/capacity.png",
    }),
  ],
};

// 14. Partnerships band
export const partnerships = {
  heading: "Agency or freelancer?",
  line: "Sell our builds under your brand. Unbranded deliverables, NDA, partner pricing.",
  cta: {
    label: "Explore partnerships",
    href: "/partnerships",
    variant: "secondary",
  } as CtaLink,
};

// 15. Free website audit
// Free-audit — split section (Lightdash style): heading + CTA + 3 accordion
// tabs left, a mock audit-report visual right. Light mode, no background image.
export const audit = {
  heading: "A free audit that actually tells you something",
  intro:
    "Drop your site in and we'll review it by hand, then send a short video walkthrough of the highest-impact fixes. No auto-generated PDF, no obligation.",
  cta: { label: "Get my free audit", href: "/free-website-audit" },
  inputPlaceholder: "yourwebsite.com",
  tabs: [
    {
      title: "Reviewed by a human, not a bot",
      body: "We go through your site by hand and record a short video walkthrough. No auto-generated PDF full of vanity scores.",
    },
    {
      title: "The three things costing you the most",
      body: "We flag the highest-impact fixes first, the ones holding back conversions, rankings, and speed, so you know exactly where to start.",
    },
    {
      title: "Yours to keep, no strings",
      body: "You get the walkthrough whether or not we ever work together. No pitch, no obligation, no signup wall.",
    },
  ],
  // Mock audit-report card shown on the right.
  report: {
    label: "Site audit",
    score: "62",
    scoreLabel: "Performance score",
    delta: "18 issues found",
    findings: [
      { text: "Largest Contentful Paint over 4s", severity: "high" },
      { text: "Missing meta descriptions on 9 pages", severity: "med" },
      { text: "No structured data for search", severity: "med" },
    ],
  },
};

// FAQ section (Trueform-style: sticky heading left, accordion cards right)
export const faqSection = {
  heading: ["Common questions.", "Asked in every intro call."],
  subhead:
    "If you're thinking about working with us, you're probably wondering one of these. Here's where we stand.",
  ctas: [
    {
      label: "Book a call",
      href: "/book-a-call",
      variant: "primary",
    } as CtaLink,
    {
      label: "Email us",
      href: "mailto:hello@thezenithdigital.com",
      variant: "secondary",
    } as CtaLink,
  ],
  items: [
    {
      q: "Why Wix Studio specifically?",
      a: "It's the fastest route to a premium, editable, SEO-ready site for most businesses. You own it, your team can run it, and there are no licensing traps. When a project genuinely outgrows Wix, we build fully custom, this site is the proof.",
    },
    {
      q: "What if we're on Webflow, WordPress, or a custom stack today?",
      a: "We migrate from any platform with full URL mapping and zero ranking loss. You keep your rankings and get a faster, cleaner site.",
    },
    {
      q: "Can our marketing team really run the site after launch?",
      a: "Yes. You get a site you own, a recorded Loom walkthrough of how to edit it, and 30 days of free support after launch.",
    },
    {
      q: "What about AEO and SEO?",
      a: "Both are built in, not bolted on. Clean structure, metadata, schema, and content targeting so you're found by people, search engines, and AI answer engines.",
    },
    {
      q: "We need more than a marketing site, branding, automations, etc. Do you do that?",
      a: "Yes. Alongside design and build we handle SEO/GEO/PPC campaigns, automations and integrations, and white-label production for agencies.",
    },
    {
      q: "How fast can we actually launch?",
      a: "Most sites launch in 3 to 4 weeks from the first call. A focused 5-page build ships in around two weeks.",
    },
    {
      q: "How do you work with clients?",
      a: "A free 20-minute call, then an intake form, then a same-day proposal with scope, timeline, and a fixed price. Once you sign off we design, you review directly, and we launch.",
    },
    {
      q: "Do you work with international clients?",
      a: "Yes. We're based in Belgrade and work across the UK, EU, and US, including multilingual builds.",
    },
  ],
};

// 16. FAQ (legacy — kept for schema until removed)
export const faqs = [
  {
    q: "Is it worth the investment?",
    a: "A website is a sales tool, not a brochure. Our builds are structured to convert and rank, and clients have generated over €1M in revenue from them. If it doesn't pay for itself, it isn't done right.",
  },
  {
    q: "How long does it take?",
    a: "Most sites launch in 3-4 weeks from the first call. The Minimum ships in around two weeks, larger builds in about five.",
  },
  {
    q: "Can I edit it after launch?",
    a: "Yes. You get a site you own, plus a recorded Loom walkthrough of how to update it, and 30 days of free support after launch.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We're based in Belgrade and work with clients across the UK, EU, and US, including multilingual builds.",
  },
  {
    q: "What support do I get?",
    a: "Thirty days of free support after launch, then flexible ongoing support. Response times are within 24 hours, not 48-72.",
  },
  {
    q: "Why isn't your own site on Wix?",
    a: "Because we build custom too. Wix Studio is our front door and where most clients start. This site is what our custom work looks like when you outgrow the platform.",
  },
];

// 17. Final CTA
// General CTA banner (same style as the case-studies one), below the process.
export const finalCta = {
  heading: ["Let's talk about", "your website"],
  paragraph:
    "A free 20-minute call. We'll tell you honestly what's holding your site back, and what it would take to fix it.",
  cta: { label: "Book a call", href: "/book-a-call" },
  image: "/textures/studio-texture.jpg",
};

// 18. Footer (light; live-site layout: mission + city clocks, link columns,
// partner logo strip with an audit box, meta bar, giant wordmark bottom)
export const footer = {
  mission:
    "We build conversion-ready, AI-readable websites for growing businesses who want premium positioning.",
  clocks: [
    { city: "Belgrade", tz: "Europe/Belgrade" },
    { city: "Edinburgh", tz: "Europe/London" },
  ],
  columns: [
    {
      heading: "Company",
      links: [
        { label: "Services", href: "/services" },
        { label: "Case studies", href: "/case-studies" },
        { label: "Partnerships", href: "/partnerships" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      heading: "Zenith resources",
      links: [
        { label: "Free website audit", href: "/free-website-audit" },
        { label: "FAQ", href: "/faq" },
        { label: "Blog", href: "/blog" },
        { label: "About", href: "/about" },
      ],
    },
  ],
  contact: {
    heading: "Contact information",
    email: "hello@thezenithdigital.com",
    city: "Belgrade - Serbia",
    phone: "+381 64 97 60617",
  },
  partnersLabel: "Partnered with industry-leading companies:",
  // White marks inverted on the light footer; per-logo heights balance the
  // marks optically (same set as the /book-a-call partner strip).
  partners: [
    {
      src: "/logos-white/shopify-partners.png",
      alt: "Shopify Partners",
      className: "h-8",
    },
    { src: "/logos-white/wix-studio.png", alt: "Wix Studio", className: "h-7" },
    { src: "/logos-white/capacity.png", alt: "Capacity", className: "h-6" },
    { src: "/logos-white/techtonnik.png", alt: "Techtonnik", className: "h-6" },
    { src: "/logos-white/mod.png", alt: "MOD Digital", className: "h-5" },
  ],
  audit: {
    heading: "Free website audit",
    text: "Hand-reviewed, with a video walkthrough of what to fix first.",
    cta: { label: "Get my free audit", href: "/free-website-audit" },
  },
  // Founder named here as well as in the Person schema: the entity signal is
  // stronger when the visible copy and the markup agree.
  copyright:
    "© 2026 Zenith Digital, a Wix Studio web design agency based in Belgrade, serving the UK, EU, and US. Founded by Pavle Maodus.",
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
  ],
  wordmark: "Zenith Digital",
};

/**
 * Mega-dropdown panel for "Services". Two columns of service rows, each with an
 * icon from the shared FeatureIcon set, plus a featured case study in the third
 * column so the menu carries proof as well as navigation.
 *
 * The Case Studies item is a plain link now: its old dropdown duplicated the
 * /case-studies page (which already filters by industry) and pointed at two
 * studies that didn't exist yet.
 */
export const servicesMenu = {
  // Left column.
  build: [
    {
      icon: "palette",
      label: "Wix Studio website design",
      desc: "Conversion-first custom builds, from €2,500",
      href: "/services/wix-studio-website-design",
    },
    {
      icon: "transfer",
      label: "Website migration",
      desc: "Off WordPress, Squarespace, or Webflow with no ranking loss",
      href: "/services/website-migration",
    },
    {
      icon: "split",
      label: "Landing pages",
      desc: "Campaign pages live in about a week",
      href: "/services/landing-pages",
    },
  ],
  // Right column.
  grow: [
    {
      icon: "search",
      label: "SEO, AEO & PPC",
      desc: "Rank in search and get named in AI answers",
      href: "/services/seo-aeo-ppc",
    },
    {
      icon: "code",
      label: "Wix Studio development",
      desc: "Custom code, CMS architecture, and integrations",
      href: "/services",
    },
    {
      icon: "layers",
      label: "White-label & partnerships",
      desc: "Unbranded production for agencies",
      href: "/partnerships",
    },
  ],
  // Only ever point this at a study with a shipped detail page.
  featured: {
    label: "Featured case study",
    title:
      "How Bel'Istria went from losing local search to the answer AI recommends.",
    image: "/portfolio-blocky/belistria.png",
    href: "/case-studies/belistria",
  },
};

export const nav = {
  items: [
    {
      label: "Services",
      href: "/services",
      menu: "services" as const,
    },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "FAQ", href: "/faq" },
  ],
  ctas: [
    {
      label: "Free website audit",
      href: "/free-website-audit",
      variant: "secondary",
    } as CtaLink,
    {
      label: "Get a quote",
      href: "/book-a-call",
      variant: "primary",
    } as CtaLink,
  ],
  // Sign-off pinned to the bottom of the mobile drawer.
  drawerTagline: "Wix Studio experts. Custom builds when you outgrow it.",
};
