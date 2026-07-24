import type { CtaLink, Metric } from "@/lib/types";

/**
 * Homepage content. Single source of truth for all section copy + asset paths.
 * Copy is drafted from the live Zenith site, re-pointed at the real ICP
 * (businesses that outgrow templates), per the homepage brief. Real figures only.
 */

export const BOOK_CALL: CtaLink = { label: "Book a call", href: "/book-a-call", variant: "primary" };
export const AUDIT: CtaLink = { label: "Free website audit", href: "/free-website-audit", variant: "secondary" };

// 1. Hero
export const hero = {
  badgePrefix: "Top 1% Partner of",
  badgeBrand: "Wix Studio",
  headline: "Wix Studio websites for businesses that outgrow templates.",
  subhead:
    "We design, build, and launch results-driven Wix Studio websites. And when you outgrow Wix, we build custom.",
  proof: {
    label: "150+ Websites Created",
    avatars: ["/avatars/a1.webp", "/avatars/a2.jpg", "/avatars/a3.jpg"],
  },
  ctas: [BOOK_CALL, { label: "See our work", href: "/case-studies", variant: "secondary" } as CtaLink],
  // 2x2 highlighted case studies that flow directly out of the hero.
  featured: [
    { client: "Bel'Istria", tag: "Travel", metric: "257% more impressions", image: "/portfolio/belistria.jpg", href: "/case-studies" },
    { client: "Knode AI", tag: "SaaS", metric: "$10M Series A raised", image: "/portfolio/knode.jpg", href: "/case-studies" },
    { client: "Fort Lauderdale Dock Rentals", tag: "Marine", metric: "30+ warm leads", image: "/portfolio/fortlauderdale.jpg", href: "/case-studies" },
    { client: "Scottish Luxury Experience", tag: "Travel", metric: "€500k pipeline", image: "/portfolio/scottishluxury.jpg", href: "/case-studies" },
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

// 4. Problem / "Sound familiar?"
export const problem = {
  eyebrow: "Sound familiar?",
  heading: "You've outgrown your website. It just hasn't caught up yet.",
  pains: [
    {
      title: "You've outgrown a template or DIY builder",
      description:
        "The site got you started. Now it's holding you back, and every edit feels like a fight.",
    },
    {
      title: "You've been burned by a slow or flaky agency",
      description:
        "Months of delays, rotating account managers, and a bill that never quite matched the work.",
    },
    {
      title: "You have a pretty site that doesn't convert or rank",
      description:
        "It looks fine. It just doesn't turn visitors into enquiries, and search engines can't find it.",
    },
  ],
};

// 5. Comparison matrix
export const comparison = {
  heading: "How we compare to freelancers, agencies, and DIY templates",
  columns: ["", "Freelancers", "Agencies", "Templates & DIY", "Zenith"],
  rows: [
    { criterion: "Annual cost", values: ["Unpredictable", "€15k–50k+", "Cheap, until it isn't", "From €2,500, fixed"] },
    { criterion: "Time to launch", values: ["Whenever", "2–4 months", "Weeks of your time", "3–4 weeks"] },
    { criterion: "Consistent team", values: ["One person, no backup", "Rotating staff", "Just you", "Same team, start to finish"] },
    { criterion: "Copywriting included", values: ["Rarely", "Extra cost", "You write it", "Included"] },
    { criterion: "SEO & AEO", values: ["Sometimes", "Add-on", "Bolt-on plugins", "Built in"] },
    { criterion: "Post-launch support", values: ["Unpredictable", "Retainer required", "Forums", "30 days free, then flexible"] },
    { criterion: "You own and can edit it", values: ["Depends", "Often locked in", "Yes", "Yes, with a handover"] },
  ],
};

// 6. Services (bento grid)
export const services = {
  heading: "Everything you need to design, build, and grow online.",
  intro:
    "One team for the whole journey. From a first Wix Studio build to migrations, campaigns, and white-label work for agencies.",
  cta: { label: "All services", href: "/services", variant: "primary" } as CtaLink,
  // Bento layout: `size` controls the cell span. Assets (media) added later.
  items: [
    {
      title: "Website design & development",
      description: "Fast, structured, conversion-ready sites that turn visitors into paying clients.",
      size: "lg" as const,
    },
    {
      title: "SEO, AEO & PPC campaigns",
      description: "Search and paid campaigns tied to your site so every euro lands somewhere built to convert.",
      size: "sm" as const,
    },
    {
      title: "Wix Studio development",
      description: "Custom code, CMS architecture, and integrations on top of Wix Studio.",
      size: "sm" as const,
    },
    {
      title: "Landing pages",
      description: "High-converting pages for campaigns, launches, and lead capture.",
      size: "sm" as const,
    },
    {
      title: "Website migrations",
      description: "Move to Wix Studio from any platform with full URL mapping and zero ranking loss.",
      size: "sm" as const,
    },
    {
      title: "White-label design & development",
      description: "Unbranded builds for agencies and freelancers to resell under their own brand.",
      size: "lg" as const,
    },
  ],
};

// 6b. Video testimonials (on the faint textured navy bg, white hairline frame)
export const videoTestimonials = {
  heading: "Hear directly from business owners that gave us their trust",
  intro:
    "We don't ask for testimonials until the work is done and the results are in. These are real clients who came to us with a site that wasn't even pulling its weight, and left with one that does.",
  items: [
    {
      quote: "Zenith redefined what hard work means to me. They treat every website project with pride, enthusiasm and extreme passion.",
      name: "Flynn Blackie",
      role: "Founder & Director",
      company: "MOD Digital",
      logo: "/logos/mod.png",
      poster: "/testimonials/flynn.jpg",
      video: "", // Flynn is an image for now
    },
    {
      quote: "We hired Zenith to help us rebrand our site. Conversion skyrocketed. We saw what it takes to be one of the top professionals in the field.",
      name: "Uros Stanimirovic",
      role: "Co-Founder & CTO",
      company: "Genroks AI",
      logo: "/logos/genroks.png",
      poster: "",
      video: "/testimonials/uros.mov",
    },
    {
      quote: "Even though I didn't have a crystal-clear vision of how a white-label partnership looked, Zenith was able to overdeliver on every front imaginable.",
      name: "John Smyth",
      role: "CEO",
      company: "AdVantage Media Marketing",
      logo: "/logos/advantage.png",
      poster: "",
      video: "/testimonials/john.mov",
    },
  ],
};

// 6a. Case studies showcase (two-panel cards: thumbnail + branded panel)
export const caseStudies = {
  heading: "Real examples of how our websites helped businesses drive growth",
  intro:
    "These aren't showcase sites built to impress other designers. They're working websites built for real businesses, with specific problems to solve, and real outcomes attached.",
  items: [
    {
      client: "Knode AI",
      logo: "/logos/knode.png",
      thumb: "/casestudies/knode.jpg",
      title: "From 0 to raising a $10 Million Series A funding with a premium Wix Studio SaaS for Knode AI",
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
      logo: "/logos/belistria.png",
      thumb: "/casestudies/belistria.jpg",
      title: "Crafting an immersive Croatia private transfer and travel booking experience in Wix Studio",
      stats: [
        { value: "257%", label: "YoY impressions" },
        { value: "35+", label: "Pages migrated" },
      ],
      liveUrl: "https://belistria.eu",
      panel: "#0e2a1f",
    },
    {
      client: "Fort Lauderdale Dock Rentals",
      logo: "/logos/foxstays.png",
      thumb: "/casestudies/fortlauderdale.jpg",
      title: "Building a booking and lead-capture website ecosystem for Florida's premier yacht and dock charter",
      stats: [
        { value: "30+", label: "Warm leads" },
        { value: "50+", label: "Docks available" },
      ],
      liveUrl: "https://foxstays.com",
      panel: "#3a2410",
    },
    {
      client: "Scottish Luxury Experience",
      logo: "",
      thumb: "/casestudies/scottishluxury.jpg",
      title: "Enabling thousands of tourists to visit Scotland's beauty through the UK's best-looking travel website",
      stats: [
        { value: "€500k", label: "Pipeline value" },
        { value: "4 Weeks", label: "Time-to-market" },
      ],
      liveUrl: "https://thescottishluxuryexperience.com",
      panel: "#241a2e",
    },
  ],
};

// 6b. Full-bleed image CTA band between the case studies and the cross-industry
// logo grid (Stripe Sessions banner style: photo background, headline top-left,
// white button below, wordmark bottom-right).
export const caseStudiesCta = {
  heading: ["The websites behind", "100+ business wins"],
  paragraph:
    "Browse the full portfolio of Wix Studio and custom builds, with the numbers behind each one.",
  cta: { label: "View all case studies", href: "/case-studies" },
  image: "/textures/bg-texture-invert.jpg",
};

// 6c. Cross-industry client grid (copied 1:1 from the live site)
export const crossIndustry = {
  heading: "We leverage our 10 years of expertise from cross-industry projects for our clients",
  // logo paths are placeholders; swap for the real marks. Names kept so it's clear which logo goes where.
  items: [
    { name: "Knode", logo: "/logos-dark/knode.png", text: "Full SaaS website & Landing page from scratch in 3 weeks. Knode is currently raising $10M Series A." },
    { name: "Techtonnik", logo: "/logos-dark/techtonnik.png", text: "Web fulfillment partners since 2023. Delivered 10+ Websites & 2 Web apps." },
    { name: "MOD", logo: "/logos-dark/mod.png", text: "Delivered 15+ Landing pages for marketing campaigns generating €1M+ in client revenue." },
    { name: "Capacity", logo: "/logos-dark/capacity.png", text: "Fractional web design team leading design & development operations." },
    { name: "Empyrean Global", logo: "", text: "Redesigned web identity from scratch & acted as website consulting partner." },
    { name: "BoomBoom Creatives", logo: "", text: "Several marketing landing pages throughout 2023/2024 in Webflow / Wix Studio." },
    { name: "Stilby", logo: "/logos-dark/stilby.png", text: "Developed and launched two websites to expand into Montenegro & Slovakia markets." },
    { name: "Genroks", logo: "/logos-dark/genroks.png", text: "Two separate web identities for an AI ISO Standard Compliance Generator Startup in Framer." },
    { name: "Fox Energy", logo: "", text: "Full scale marketing website for oil & gas company looking to attract investors." },
    { name: "NOTYOU", logo: "", text: "Full web e-Commerce identity for a popular local brand from ATL, Georgia." },
    { name: "AdVantage", logo: "", text: "Managing dozens of client websites, security and email systems since 2024." },
    { name: "FoxStays", logo: "/logos-dark/foxstays.png", text: "Web app and lead generation ecosystem for the yacht & dock rental market." },
    { name: "LMF HR", logo: "", text: "Fractional Web Design & IT Partner for consulting firm clients in Indianapolis." },
    { name: "Jim Steele", logo: "/logos-dark/jimsteele.png", text: "Marketing page & lead capture ecosystem for UK's popular motivational speaker." },
    { name: "Creatify Collective", logo: "", text: "Development of a full brand identity for a growing Videography agency." },
    { name: "Kema Coatings", logo: "", text: "Two branded websites for an expanding coating & protection company." },
  ],
};

// 7. Featured work
export const featuredWork = {
  eyebrow: "Selected work",
  heading: "Real businesses. Real numbers.",
  cases: [
    { client: "Flynn Blackie", industry: "Marketing", metric: "220%", metricLabel: "more bookings", image: "/work/work-1.jpg", href: "/case-studies" },
    { client: "Scottish Luxury Experience", industry: "Travel", metric: "€500k", metricLabel: "pipeline value", image: "/work/work-2.jpg", href: "/case-studies" },
    { client: "Bel'Istria", industry: "Travel", metric: "257%", metricLabel: "more impressions", image: "/work/work-3.jpg", href: "/case-studies" },
    { client: "Hunting Brook", industry: "Courses", metric: "€200k+", metricLabel: "in course sales", image: "/work/work-4.jpg", href: "/case-studies" },
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
      blurb: "Product sites and web apps that turn launches into pipeline. Knode raised $10M with theirs.",
      href: "/industries/saas-tech",
      image: "/work/work-1.jpg",
    },
    {
      name: "Travel & hospitality",
      blurb: "Booking-ready sites for transfers, stays, and experiences. Bel'Istria grew impressions 257%.",
      href: "/industries/travel-hospitality",
      image: "/work/work-2.jpg",
    },
    {
      name: "Coaches & speakers",
      blurb: "Lead-capture pages built to sell seats and sessions for experts and public speakers.",
      href: "/industries/coaches-speakers",
      image: "/work/work-3.jpg",
    },
    {
      name: "Marketing & agencies",
      blurb: "Campaign landing pages and white-label builds. MOD's drove €1M+ in client revenue.",
      href: "/industries/marketing-agencies",
      image: "/work/work-4.jpg",
    },
    {
      name: "E-commerce & retail",
      blurb: "Storefronts and brand sites built to convert, launched across new markets.",
      href: "/industries/ecommerce-retail",
      image: "/work/work-5.jpg",
    },
    {
      name: "Professional services",
      blurb: "Credible, conversion-ready sites for firms that win work on trust and expertise.",
      href: "/industries/professional-services",
      image: "/work/work-6.jpg",
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
export const process = {
  name: "The Zenith Sprint",
  heading: "The path from first call to a site that performs",
  cta: { label: "Start your project", href: "/book-a-call", variant: "primary" } as CtaLink,
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
  intro: "Fixed scope, fixed price, fixed timeline. No retainers, no licensing traps, no surprise invoices.",
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
      summary: "A clean, credible build for businesses that need to launch fast.",
      timeline: "2-week delivery",
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
      summary: "Prestige design, custom functionality, and the full SEO and copy stack, handled.",
      timeline: "5-week delivery",
      features: [
        "Everything in The Minimum",
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
      icon: "spark",
      price: "Custom",
      priceNote: "monthly",
      summary: "A long-term partnership: growth retainers, ads, SEO campaigns, and ongoing builds.",
      timeline: "Ongoing",
      features: [
        "Everything in The Studio",
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
export const testimonials = {
  eyebrow: "In their words",
  heading: "Hear it from the business owners we work with",
  items: [
    { quote: "Zenith redefined what hard work means to me. They treat every website project with pride, enthusiasm, and extreme passion.", name: "Flynn Blackie", role: "Founder & Director, MOD Digital" },
    { quote: "Even though I didn't have a crystal-clear vision of how a white-label partnership looked, Zenith overdelivered on every front imaginable.", name: "John Smyth", role: "CEO, AdVantage Media Marketing" },
    { quote: "We hired Zenith to help us rebrand our site. Conversion skyrocketed. We saw what it takes to be one of the top professionals in the field.", name: "Uros Stanimirovic", role: "Co-Founder & CTO, Genroks AI" },
  ],
};

// 14. Partnerships band
export const partnerships = {
  heading: "Agency or freelancer?",
  line: "Sell our builds under your brand. Unbranded deliverables, NDA, partner pricing.",
  cta: { label: "Explore partnerships", href: "/partnerships", variant: "secondary" } as CtaLink,
};

// 15. Free website audit
export const audit = {
  heading: "Not ready to talk? Get a free audit of your current site.",
  line: "We review your site by hand, not a bot, and send a video walkthrough of exactly what to fix first.",
  cta: { label: "Get my free audit", href: "/free-website-audit", variant: "primary" } as CtaLink,
};

// FAQ section (Trueform-style: sticky heading left, accordion cards right)
export const faqSection = {
  heading: ["Common questions.", "Asked in every intro call."],
  subhead: "If you're thinking about working with us, you're probably wondering one of these. Here's where we stand.",
  ctas: [
    { label: "Book a call", href: "/book-a-call", variant: "primary" } as CtaLink,
    { label: "Email us", href: "mailto:hello@thezenithdigital.com", variant: "secondary" } as CtaLink,
  ],
  items: [
    { q: "Why Wix Studio specifically?", a: "It's the fastest route to a premium, editable, SEO-ready site for most businesses. You own it, your team can run it, and there are no licensing traps. When a project genuinely outgrows Wix, we build fully custom, this site is the proof." },
    { q: "What if we're on Webflow, WordPress, or a custom stack today?", a: "We migrate from any platform with full URL mapping and zero ranking loss. You keep your rankings and get a faster, cleaner site." },
    { q: "Can our marketing team really run the site after launch?", a: "Yes. You get a site you own, a recorded Loom walkthrough of how to edit it, and 30 days of free support after launch." },
    { q: "What about AEO and SEO?", a: "Both are built in, not bolted on. Clean structure, metadata, schema, and content targeting so you're found by people, search engines, and AI answer engines." },
    { q: "We need more than a marketing site, branding, automations, etc. Do you do that?", a: "Yes. Alongside design and build we handle SEO/GEO/PPC campaigns, automations and integrations, and white-label production for agencies." },
    { q: "How fast can we actually launch?", a: "Most sites launch in 3 to 4 weeks from the first call. A focused 5-page build ships in around two weeks." },
    { q: "How do you work with clients?", a: "A free 20-minute call, then an intake form, then a same-day proposal with scope, timeline, and a fixed price. Once you sign off we design, you review directly, and we launch." },
    { q: "Do you work with international clients?", a: "Yes. We're based in Belgrade and work across the UK, EU, and US, including multilingual builds." },
  ],
};

// 16. FAQ (legacy — kept for schema until removed)
export const faqs = [
  { q: "Is it worth the investment?", a: "A website is a sales tool, not a brochure. Our builds are structured to convert and rank, and clients have generated over €1M in revenue from them. If it doesn't pay for itself, it isn't done right." },
  { q: "How long does it take?", a: "Most sites launch in 3-4 weeks from the first call. The Minimum ships in around two weeks, larger builds in about five." },
  { q: "Can I edit it after launch?", a: "Yes. You get a site you own, plus a recorded Loom walkthrough of how to update it, and 30 days of free support after launch." },
  { q: "Do you work with international clients?", a: "Yes. We're based in Belgrade and work with clients across the UK, EU, and US, including multilingual builds." },
  { q: "What support do I get?", a: "Thirty days of free support after launch, then flexible ongoing support. Response times are within 24 hours, not 48-72." },
  { q: "Why isn't your own site on Wix?", a: "Because we build custom too. Wix Studio is our front door and where most clients start. This site is what our custom work looks like when you outgrow the platform." },
];

// 17. Final CTA
// General CTA banner (same style as the case-studies one), below the process.
export const finalCta = {
  heading: ["Let's talk about", "your website"],
  paragraph:
    "A free 20-minute call. We'll tell you honestly what's holding your site back, and what it would take to fix it.",
  cta: { label: "Book a call", href: "/book-a-call" },
  image: "/textures/bg-texture-invert.jpg",
};

// 18. Footer (light; live-site layout: mission + city clocks, link columns,
// partner logo strip with an audit box, meta bar, giant wordmark bottom)
export const footer = {
  mission:
    "We build conversion-ready, AI-readable websites for growing businesses who want premium positioning.",
  clocks: [
    { city: "Belgrade", tz: "Europe/Belgrade" },
    { city: "Edinburgh", tz: "Europe/London" },
    { city: "Liverpool", tz: "Europe/London" },
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
  partners: [
    { src: "/logos-dark/mod.png", alt: "MOD Digital" },
    { src: "/logos-dark/capacity.png", alt: "Capacity" },
    { src: "/logos-dark/techtonnik.png", alt: "Techtonnik" },
    { src: "/logos-dark/genroks.png", alt: "Genroks" },
    { src: "/logos-dark/stilby.png", alt: "Stilby" },
  ],
  audit: {
    heading: "Free website audit",
    text: "Hand-reviewed, with a video walkthrough of what to fix first.",
    cta: { label: "Get my free audit", href: "/free-website-audit" },
  },
  copyright:
    "© 2026 Zenith Digital, a Wix Studio web design agency based in Belgrade, serving the UK, EU, and US.",
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
  ],
  wordmark: "Zenith Digital",
};

/** Mega-dropdown panel for "Case Studies" (DesignMe-style three columns). */
export const caseStudiesMenu = {
  ourWork: [
    { label: "Case studies", desc: "See our latest work", href: "/case-studies" },
    { label: "Industries", desc: "Who we build for", href: "/industries" },
    { label: "Clients", desc: "The businesses that trusted us", href: "/case-studies" },
  ],
  recentProjects: [
    { label: "Knode", desc: "SaaS site that raised a $10M round", href: "/case-studies", tag: "" },
    { label: "Scottish Luxury Experience", desc: "€500k travel pipeline", href: "/case-studies", tag: "" },
    { label: "Bel'Istria", desc: "257% more impressions", href: "/case-studies", tag: "" },
    { label: "Hunting Brook", desc: "€200k+ in course sales", href: "/case-studies", tag: "New" },
  ],
  featured: {
    label: "Featured case study",
    title: "How we helped Flynn Blackie grow bookings 220%.",
    image: "/work/work-1.jpg",
    href: "/case-studies",
  },
};

export const nav = {
  items: [
    { label: "Case Studies", href: "/case-studies", menu: "caseStudies" as const },
    { label: "Services", href: "/services" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Partnerships", href: "/partnerships" },
  ],
  ctas: [
    { label: "Free website audit", href: "/free-website-audit", variant: "secondary" } as CtaLink,
    { label: "Get a quote", href: "/book-a-call", variant: "primary" } as CtaLink,
  ],
};
