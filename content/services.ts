import type { CtaLink } from "@/lib/types";

import { whyWixItem } from "./faq";

/*
 * /services — the "what exactly do you do" page and the future hub for
 * /services/[slug] SEO pages. Anchor ids on each service are stable and match
 * the future dedicated slugs, so the index links convert to page links with
 * zero content rework.
 *
 * OWNER — still to set (visible [bracketed] placeholders until then):
 *   - typical build start window (FAQ "How fast can we start?")
 * Retail landing-page price set Aug 2026: €1,250 (partner rate moved to
 * €1,000). Partner prices (€1,000 / €1,099) appear ONLY in the white-label
 * teaser, framed as partner pricing.
 */

// 1. Hero (dark, compact) + numbered anchor index
export const sHero = {
  heading: "Everything you need to design, build, and grow online",
  support:
    "One team for the whole journey. From a first Wix Studio build to migrations, campaigns, and white-label production for agencies.",
  ctas: [
    { label: "Book a call", href: "/book-a-call", variant: "primary" } as CtaLink,
    {
      label: "Free website audit",
      href: "/free-website-audit",
      variant: "secondary",
    } as CtaLink,
  ],
};

// 3–8. The six service sections, one shared template. `id` doubles as the
// future /services/[slug] slug.
export type ServiceSlide = {
  /** Claim-style sentence, Stripe register ("Hertz unifies commerce..."). */
  title: string;
  image: string;
  client: string;
  /** Tone-matched logo mark; the client name renders as a wordmark when absent. */
  logo?: string;
};

export type ServiceUsp = { icon: string; title: string; text: string };

export type ServiceEntry = {
  id: string;
  /**
   * Dedicated /services/[slug] page for this entry, where one exists. The
   * section only renders the link if the page is actually published, so an
   * unfinished page can't be linked into from the hub.
   */
  pageSlug?: string;
  title: string;
  when: string;
  deliverables: string[];
  proof: { text: string; href?: string }[];
  meta: { label: string; href?: string }[];
  cta: { label: string; href: string };
  slides: ServiceSlide[];
  usps: ServiceUsp[];
};

export const sServices: ServiceEntry[] = [
  {
    id: "website-design-development",
    pageSlug: "wix-studio-website-design",
    title: "Website design & development",
    when: "You've outgrown a template or DIY builder, or your current site looks fine but doesn't convert. You need a site that sells, not a brochure.",
    deliverables: [
      "Structure & wireframes built around your buyers",
      "Conversion copywriting (from The Studio)",
      "Wix Studio design & build",
      "On-page SEO fundamentals",
      "Analytics & lead capture wired in",
      "Loom handover so your team can edit everything",
    ],
    proof: [
      {
        text: "$521k in 7 months · Scottish Luxury Experience",
        href: "/case-studies",
      },
      { text: "“Conversion skyrocketed” · Genroks AI", href: "/case-studies" },
    ],
    meta: [
      { label: "Timeline: 2–5 weeks" },
      { label: "From €1,750", href: "/#pricing" },
    ],
    cta: { label: "Start a build", href: "/book-a-call" },
    slides: [
      {
        title:
          "Scottish Luxury Experience turned its new site into $521k of booked trips in seven months.",
        // Slide images live in /service-slides and are cropped to 2:1, the
        // ratio ServiceShowcase renders (aspect-[2/1] from md up, 16/9 below,
        // object-cover object-top). The originals elsewhere in /public are
        // square or 4:3, so top-anchored cover cropping showed only their top
        // half. Framing rule: browser chrome intact at the top edge, the
        // window bleeding off the bottom, subject clear of the outer 10% on
        // each side (mobile's 16:9 crop takes that).
        image: "/service-slides/design-sle.webp",
        client: "Scottish Luxury Experience",
      },
      {
        title: "ATW Trucking's freight and logistics site, rebuilt end to end.",
        image: "/service-slides/design-atw-trucking.webp",
        client: "ATW Trucking",
      },
      {
        title:
          "Bianomics' brand, events, and operations offer, pulled into one site.",
        image: "/service-slides/design-bianomics.webp",
        client: "Bianomics",
      },
    ],
    usps: [
      {
        icon: "target",
        title: "Built to convert",
        text: "Structure, copy, and design decisions all point at one thing: turning visitors into enquiries.",
      },
      {
        icon: "gauge",
        title: "Fast by default",
        text: "Optimized images, clean builds, and Core Web Vitals treated as acceptance criteria, not afterthoughts.",
      },
      {
        icon: "pen",
        title: "Yours to run",
        text: "You own the site and get a Loom walkthrough, so your team can edit anything without us.",
      },
    ],
  },
  {
    id: "website-migrations",
    pageSlug: "website-migration",
    title: "Website migrations",
    when: "You're on WordPress, Webflow, Squarespace, or Framer and want out. But you're terrified of losing the rankings you've earned. That fear is justified. That's why migration is a discipline, not a copy-paste.",
    deliverables: [
      "Full URL inventory & 1:1 redirect map",
      "Content & CMS migration",
      "Metadata and schema parity",
      "Speed & Core Web Vitals pass",
      "Post-launch indexing monitoring",
      "Zero ranking loss, in writing",
    ],
    proof: [
      {
        text: "35+ pages migrated, 257% YoY impressions · Bel'Istria",
        href: "/case-studies",
      },
    ],
    meta: [
      { label: "Timeline: 2–4 weeks" },
      { label: "From €1,750", href: "/#pricing" },
    ],
    cta: { label: "Plan your migration", href: "/book-a-call" },
    slides: [
      {
        title: "Bel'Istria moved 35+ pages and grew impressions 257% YoY.",
        image: "/service-slides/migration-belistria.webp",
        client: "Bel'Istria",
        logo: "/logos-white/belistria.png",
      },
      {
        title: "Genroks left a Framer template for a custom-coded site.",
        image: "/service-slides/migration-genroks.webp",
        client: "Genroks AI",
        logo: "/logos-white/genroks.png",
      },
      {
        title:
          "Katie Hailey's site, built from her Figma design in a week and a half.",
        image: "/service-slides/migration-katie-hailey.webp",
        client: "Katie Hailey",
      },
      {
        title:
          "An illustrated brand site and gift ordering for Destilerija Maodus.",
        image: "/service-slides/migration-destilerija-maodus.webp",
        client: "Destilerija Maodus",
      },
    ],
    usps: [
      {
        icon: "shield",
        title: "Zero ranking loss, in writing",
        text: "Full URL inventory, 1:1 redirects, and metadata parity before anything goes live.",
      },
      {
        icon: "search",
        title: "Rankings monitored",
        text: "We watch indexing and impressions after launch and fix anything that moves.",
      },
      {
        icon: "clock",
        title: "One controlled cutover",
        text: "Your old site keeps working until the new one goes live. No gap, no downtime.",
      },
    ],
  },
  {
    id: "landing-pages",
    pageSlug: "landing-pages",
    title: "Landing pages",
    when: "You're paying for ads or launching a campaign, and sending that traffic to your homepage. Dedicated pages convert; homepages introduce.",
    deliverables: [
      "Conversion-first copy & structure",
      "Design & build matched to your brand",
      "Form, CRM & booking integrations",
      "Speed-optimized for paid traffic",
      "Variant-ready for testing",
    ],
    proof: [
      {
        text: "15+ landing pages, €1M+ campaign revenue · MOD Digital",
        href: "/case-studies",
      },
    ],
    meta: [
      { label: "Timeline: from 1 week" },
      { label: "From €1,250", href: "/services/landing-pages" },
    ],
    cta: { label: "Brief a landing page", href: "/book-a-call" },
    slides: [
      {
        title: "15+ landing pages behind MOD Digital's client campaigns.",
        image: "/service-slides/landing-mod-digital.webp",
        client: "MOD Digital",
        logo: "/logos-blue/mod.avif",
      },
      {
        title: "Course and event launch pages for Hunting Brook Gardens.",
        image: "/service-slides/landing-hunting-brook.webp",
        client: "Hunting Brook Gardens",
      },
    ],
    usps: [
      {
        icon: "target",
        title: "One page, one job",
        text: "Every section pushes toward a single action, matched to the ad or campaign that sent the click.",
      },
      {
        icon: "gauge",
        title: "Built for paid traffic",
        text: "Speed-optimized so you stop paying for clicks that bounce before the page loads.",
      },
      {
        icon: "layers",
        title: "Variant-ready",
        text: "Structured for A/B testing, so you can try angles without rebuilding the page.",
      },
    ],
  },
  {
    id: "seo-aeo-ppc",
    pageSlug: "seo-aeo-ppc",
    title: "SEO, AEO & PPC campaigns",
    when: "The site is live but invisible. You're not ranking, you're not showing up in AI answers, and paid campaigns land on pages that leak.",
    deliverables: [
      "Technical & on-page SEO",
      "AEO: schema, structure, AI-answer visibility",
      "Keyword & content strategy",
      "Campaign management (Google & Meta)",
      "Monthly reporting in plain language",
    ],
    proof: [
      { text: "5.96x average ROAS", href: "/case-studies" },
      { text: "€1M+ client revenue generated", href: "/case-studies" },
    ],
    meta: [{ label: "Ongoing · scoped per project", href: "/book-a-call" }],
    cta: { label: "Scope a campaign", href: "/book-a-call" },
    slides: [
      {
        title:
          "Location pages built to catch the searches Just Stay's guests actually make.",
        image: "/service-slides/seo-just-stay.webp",
        client: "Just Stay",
        logo: "/logos-blue/juststay.png",
      },
      {
        title: "257% YoY growth in search impressions for Bel'Istria.",
        image: "/service-slides/seo-belistria.webp",
        client: "Bel'Istria",
        logo: "/logos-white/belistria.png",
      },
    ],
    usps: [
      {
        icon: "search",
        title: "Found in search and AI",
        text: "Technical SEO plus the schema and structure that get you cited in AI-generated answers.",
      },
      {
        icon: "chart",
        title: "Judged on returns",
        text: "5.96x average ROAS across client campaigns. We report revenue, not vanity metrics.",
      },
      {
        icon: "file",
        title: "Plain-language reporting",
        text: "A monthly report you can read in five minutes and act on the same day.",
      },
    ],
  },
  {
    id: "wix-studio-development",
    pageSlug: "wix-studio-development",
    title: "Wix Studio development",
    when: "You've hit the edge of what standard Wix can do. Custom features, complex CMS, automations, or a web app alongside the marketing site.",
    deliverables: [
      "Custom code on Wix Studio",
      "CMS architecture & collections",
      "Integrations (CRM, booking, payment)",
      "Automations that cut manual work",
      "Web app builds",
    ],
    proof: [
      {
        text: "Booking ecosystem, 10+ automation sequences · FoxStays",
        href: "/case-studies",
      },
      { text: "2 web apps · Techtonnik", href: "/case-studies" },
    ],
    meta: [{ label: "Timeline: scoped per project" }],
    cta: { label: "Scope your build", href: "/book-a-call" },
    slides: [
      {
        title:
          "A multi-seller boat and yacht marketplace, built native in Wix Studio.",
        image: "/service-slides/dev-yacht-junky.webp",
        client: "Yacht Junky",
      },
      {
        title:
          "Just Stay's property list syncs itself from Bookeddirectly via Zapier.",
        image: "/service-slides/dev-just-stay.webp",
        client: "Just Stay",
        logo: "/logos-blue/juststay.png",
      },
    ],
    usps: [
      {
        icon: "code",
        title: "Custom code, stable platform",
        text: "The flexibility of custom development on infrastructure your team already knows how to run.",
      },
      {
        icon: "plug",
        title: "Connected to your stack",
        text: "CRM, booking, and payment integrations wired in, with automations that cut manual work.",
      },
      {
        icon: "layers",
        title: "A CMS that scales",
        text: "Collections and architecture designed so adding content never means calling a developer.",
      },
    ],
  },
  {
    id: "white-label-for-agencies",
    title: "White-label for agencies",
    when: "You're an agency or freelancer with more demand than build capacity. We build under your brand; your client never hears our name.",
    deliverables: [
      "Unbranded deliverables & NDA",
      "Landing pages from €1,000 (partner pricing)",
      "Production retainers from €1,099/mo (30 hrs)",
      "1–2 week turnarounds",
      "Dedicated partner channel",
    ],
    proof: [
      {
        text: "Partners since 2023 · Techtonnik, MOD Digital, Capacity",
        href: "/partnerships",
      },
    ],
    meta: [],
    cta: { label: "Explore partnerships", href: "/partnerships" },
    slides: [
      {
        title: "10+ websites and 2 web apps under Techtonnik's brand.",
        image: "/service-slides/wl-techtonnik.webp",
        client: "Techtonnik",
        logo: "/logos-white/techtonnik.png",
      },
      {
        title: "Campaign landing pages delivered under MOD Digital's brand.",
        image: "/service-slides/wl-mod-digital.webp",
        client: "MOD Digital",
        logo: "/logos-white/mod.png",
      },
      {
        title: "A standing fractional team behind Capacity's consulting clients.",
        image: "/service-slides/wl-capacity.webp",
        client: "Capacity",
        logo: "/logos-white/capacity.png",
      },
    ],
    usps: [
      {
        icon: "eyeOff",
        title: "Invisible by design",
        text: "Unbranded deliverables, NDA as standard. Your client never hears our name.",
      },
      {
        icon: "percent",
        title: "Margin protected",
        text: "Partner pricing sits below retail so reselling stays worth your while.",
      },
      {
        icon: "users",
        title: "One partner channel",
        text: "A dedicated PM who knows your accounts. Briefs in, builds out.",
      },
    ],
  },
];

// 10. Proof — the shared tabular Testimonials section renders here (see
// app/services/page.tsx); no page-specific proof content needed.

// 11. FAQ — services-specific; emits its own FAQPage JSON-LD on /services.
export const sFaq = {
  heading: ["Service questions,", "answered straight"],
  subhead: "The short answers first. The long ones on a call.",
  ctas: [
    { label: "Book a call", href: "/book-a-call", variant: "primary" } as CtaLink,
    {
      label: "Free website audit",
      href: "/free-website-audit",
      variant: "secondary",
    } as CtaLink,
  ],
  items: [
    // Shared with the master /faq page (single source, no drift).
    whyWixItem,
    {
      q: "Can you just do one piece, like a landing page, a migration, or SEO?",
      a: "Yes. Every service above works standalone. Plenty of clients start with one landing page or a migration and expand later.",
    },
    {
      q: "Can you improve our existing site without a full rebuild?",
      a: "Often, yes. Start with the free audit; if a rebuild isn't justified, we'll tell you.",
    },
    {
      q: "How fast can we start?",
      a: "Free 20-minute call, same-day proposal, and most builds start within a week.",
    },
    {
      q: "What does it cost?",
      a: "Fixed prices, published: sites from €1,750, landing pages from €1,250, full tiers on the pricing page. No retainers required, no surprise invoices.",
    },
  ],
};

// 12. Final CTA band
export const sFinalCta = {
  heading: ["One team,", "the whole journey"],
  paragraph:
    "A free 20-minute call. Tell us where the website is failing you and we'll map the shortest route to fixing it.",
  cta: { label: "Book a call", href: "/book-a-call" },
  ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
  image: "/textures/studio-texture.jpg",
};
