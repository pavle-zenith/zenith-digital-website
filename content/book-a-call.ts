import type { CtaLink } from "@/lib/types";

import { quoteOf } from "./testimonials-data";

import { beforeAfterItems } from "./case-studies";

/**
 * /book-a-call — bottom-funnel conversion page. Every CTA on the site resolves
 * here; the page's only job is getting the call booked with zero friction.
 * All copy lives here (nothing marketing-facing hardcoded in JSX).
 */

// 1. Hero + calendar (light, single centered column). Below the calendar:
// avatar proof row, the subhead, then the partner logo strip (live-site order).
export const bookHero = {
  badge: "Free 20-minute call",
  heading: "20 minutes. An honest look at your website.",
  checks: [
    "Free 20-minute call",
    "Advice you can use the same day",
    "No retainers, no pressure",
  ],
  subhead:
    "Book a slot and we'll review your current site live on the call: what's working, what's quietly costing you leads, and what we'd change. Everything we cover is yours, whether we work together or not.",
  calLink: "pavle-zenith/discovery-call",
  fallback: {
    text: "Calendar not loading?",
    label: "Book directly on Cal.com",
    href: "https://cal.com/pavle-zenith/discovery-call",
  },
  proof: {
    label: "150+ Websites Created",
    avatars: [
      "/avatars/flynn-blackie.jpg",
      "/avatars/uros-stanimirovic.jpg",
      "/avatars/ivan-belobrajdic.jpg",
    ],
  },
  partnersLabel: "Partnered with industry-leading companies:",
  // Per-logo heights balance the marks optically (lockups with small type
  // render taller than heavy full-height wordmarks).
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
};

// 2. What the call covers (light, centered heading, six-cell hairline grid
// with an icon chip per cell)
export const callCovers = {
  heading:
    "What we cover in 20 minutes will save you months, headaches, and thousands of euros",
  items: [
    {
      icon: "audit",
      title: "An honest site audit",
      body: "We'll look at your current site and tell you exactly where it's losing you leads. No softening, no fluff.",
    },
    {
      icon: "leaks",
      title: "Your three biggest conversion leaks",
      body: "We'll identify the specific pages that are quietly costing you leads right now. Most clients leave with at least one thing they can fix the same day.",
    },
    {
      icon: "proposal",
      title: "A same-day proposal",
      body: "If we're a good fit, a detailed written proposal lands in your inbox the same day: scope, deliverables, timeline, fixed price. No chasing required.",
    },
    {
      icon: "seo",
      title: "An SEO & AI discoverability check",
      body: "We'll flag any structural issues limiting your visibility in search results and AI-generated answers.",
    },
    {
      icon: "competitor",
      title: "A competitor evaluation",
      body: "We'll share what we're seeing from competitors: what's working, what's dated, and where the bar actually sits right now.",
    },
    {
      icon: "keep",
      title: "Yours to keep, regardless",
      body: "Everything we cover on the call is yours. Use it whether you hire us or not. The call is useful by design, not conditional on you signing anything.",
    },
  ],
};

// 3. Before/after work (light, centered heading, 2x2 grid of drag sliders).
// Slider pairs are shared from content/case-studies.ts.
export const beforeAfter = {
  heading: "Our previous website work in action",
  items: beforeAfterItems,
};

// 4. Testimonial band (dark with texture, three quote cards). Features the
// clients NOT already on the homepage testimonial sections.
export const quoteBand = {
  heading: "What clients said after we launched their website",
  items: [
    {
      ...quoteOf("gemma-sole"),
      logo: "/logos-white/knode.png",
      logoAlt: "Knode AI",
      logoClass: "h-6",
    },
    {
      ...quoteOf("ivan-belobrajdic"),
      logo: "/logos-white/belistria.png",
      logoAlt: "Bel'Istria",
    },
    {
      ...quoteOf("uros-stanimirovic"),
      logo: "/logos-white/genroks.png",
      logoAlt: "Genroks AI",
    },
  ],
};

// 5. FAQ (call-specific; the general FAQ lives on the homepage)
export const bookFaq = {
  heading: ["Frequently asked", "questions"],
  subhead: "The things people check before they pick a slot.",
  ctas: [
    { label: "Book a call", href: "#calendar", variant: "primary" } as CtaLink,
    {
      label: "Email us",
      href: "mailto:hello@thezenithdigital.com",
      variant: "secondary",
    } as CtaLink,
  ],
  items: [
    {
      q: "Who is this call for?",
      a: "Founders and business owners who have a website that isn't converting the way it should, are considering a new build, or want to migrate from another platform. If you're not sure whether your site is the problem, that's exactly what the call is for.",
    },
    {
      q: "Is it actually free? What's the catch?",
      a: "There's no catch. The call is free, the advice is real, and everything we cover is yours to keep. If we're a good fit, we'll send a proposal the same day. If we're not, you still leave with a clear picture of what to fix.",
    },
    {
      q: "What should I prepare before the call?",
      a: "Nothing. Bring your website URL and 20 minutes. If you have goals or problem areas in mind, great, but we'll find the issues either way.",
    },
    {
      q: "How quickly will I know what it costs?",
      a: "Same day. If we're a good fit you'll get a written proposal with scope, deliverables, timeline, and a fixed price within hours of the call, not weeks.",
    },
  ],
};

// 6. Final CTA band (anchors back up to the calendar, not a page reload)
export const bookFinalCta = {
  heading: ["Ready when", "you are"],
  paragraph:
    "Pick a slot that works for you. Twenty minutes, an honest read on your site, and a fixed-price proposal the same day.",
  cta: { label: "Book a call", href: "#calendar" },
  image: "/textures/studio-texture.jpg",
};
