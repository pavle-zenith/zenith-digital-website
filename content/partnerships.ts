import type { CtaLink } from "@/lib/types";

import { testimonial } from "./testimonials-data";

/**
 * Partner-story quotes come from the testimonial source of truth. These used
 * to be invented lines under "[Name]"; the owner's batch supplied the real
 * words from the same people, so nothing here is written by us.
 */
function partnerQuote(id: string) {
  const t = testimonial(id);
  return {
    text: t.quote,
    name: t.name,
    role: t.company ? `${t.role} @${t.company}` : t.role,
    avatar: t.avatar,
  };
}

/*
 * /partnerships — every string on the page lives here.
 *
 * Commercial terms are final except the two bracketed fields below. The WL
 * full-site wholesale prices are INTERNAL (gated rate card, shared after a
 * partner applies) — never add them to this file or render them on the page.
 *
 * OWNER — still to set:
 *   postHandover   — post-handover change terms (FAQ answer)
 *   capacityPolicy — volume/capacity policy sentence (FAQ answer)
 *
 * Also confirm before launch (real copy, not bracketed):
 *   - the risk strip claims in pBenefits.riskStrip
 *   - the LMF HR / WellingtonWebCo story placeholders in pStories
 */
export const commercials = {
  partnerDiscount: "full rate card shared on application",
  buildSla: "Landing page in 1 week, 5-page build in 2 weeks",
  referralCommission: "10%",
  referralPayout: "when the client pays",
  wholesaleStructure:
    "Wholesale partner rates with the full rate card shared on application",
  postHandover: "[Post-handover terms to set: included window, then rate]",
  minimumCommitment: "No minimum commitment",
  feedbackWindow: "3 business days",
  revisionPolicy: "2 rounds included, extra rounds at €250",
  capacityPolicy:
    "[Capacity policy to set: e.g. parallel partner builds you take]",
};

// 1. Hero
export const pHero = {
  eyebrow: "White-label & referral partnerships",
  heading:
    "White label website development services for digital agencies and consultants",
  subhead:
    "Partner with the team behind 100+ launches. Unbranded Wix Studio and custom builds, delivered under your agency's name, with the quality your clients think you built in-house.",
  ctas: [
    {
      label: "Apply to partner",
      href: "#apply",
      variant: "primary",
    } as CtaLink,
    {
      label: "Book a call",
      href: "/book-a-call",
      variant: "secondary",
    } as CtaLink,
  ],
};

// 1a. Completed-projects slider — the same mechanics as the homepage
// industries carousel, but images only (4:3 portfolio shots, no captions).
export const pProjects = {
  heading: "Built for partners, shipped under their brand",
  intro:
    "A sample of what comes out the other side. Every one of these launched for a client who never saw our name.",
  items: [
    { name: "Knode AI", image: "/portfolio-slider/knode-ai.jpg" },
    {
      name: "Scottish Luxury Experience",
      image: "/portfolio-slider/scottishluxuryexperience.jpg",
    },
    {
      name: "Fort Lauderdale Dock Rental",
      image: "/portfolio-slider/fort-lauderdale-dock-rental.jpg",
    },
    {
      name: "Hunting Brook Gardens",
      image: "/portfolio-slider/hunting-brook.jpg",
    },
    { name: "Highland Fling", image: "/portfolio-slider/highland-fling.jpg" },
    {
      name: "Clubby Cocktails",
      image: "/portfolio-slider/clubby-cocktails.jpg",
    },
    { name: "GoRogue", image: "/portfolio-slider/gorogue.jpg" },
    { name: "Fringe", image: "/portfolio-slider/fringe.jpg" },
    {
      name: "Redwolf Electrical",
      image: "/portfolio-slider/redwolf-electrical.jpg",
    },
    { name: "MindEd", image: "/portfolio-slider/mindeed.jpg" },
    { name: "Bradsells", image: "/portfolio-slider/bradsells.jpg" },
    { name: "X Lounge", image: "/portfolio-slider/x-lounge.jpg" },
    { name: "Tennilytics", image: "/portfolio-slider/tennilytics.jpg" },
    { name: "TCN", image: "/portfolio-slider/tcn.jpg" },
    { name: "JMJ", image: "/portfolio-slider/jmj.jpg" },
    { name: "Bel'Istria", image: "/portfolio-slider/belistria.jpg" },
    { name: "Chef", image: "/portfolio-slider/chef.jpg" },
  ],
};

// 1b. Problem-first beat — the three agency situations, between hero and tracks.
// OWNER: swap the placeholder images for real ones when available.
export const pProblems = {
  heading: "You sell the work. We make sure it ships.",
  items: [
    {
      title: "More demand than hands",
      body: "You're selling faster than you can build. Every new deal makes the backlog worse.",
      image: "/industries/marketing-agencies.jpg",
    },
    {
      title: "Landing bigger clients",
      body: "The pitches are getting bigger than your in-house capability. You need senior build quality without the senior hires.",
      image: "/industries/professional-services.jpg",
    },
    {
      title: "Occasional overflow",
      body: "Your team's fine most of the time. You need a reliable release valve for the months it isn't.",
      image: "/industries/creatives.jpg",
    },
  ],
};

// 2. The two tracks — the page's core decision, side by side.
export const pTracks = {
  heading: "Two ways to partner",
  tracks: [
    {
      name: "White-label production",
      forWho:
        "For agencies and freelancers with more demand than build capacity.",
      description:
        "You sell and own the client relationship. We design and build under your brand: unbranded files, your comms, our build quality. Your client never hears our name.",
      bullets: [
        "Unbranded deliverables & NDA",
        "Dedicated PM and Slack/email channel",
        `Partner pricing that protects your margin (${commercials.partnerDiscount})`,
        `Agreed turnaround SLAs (${commercials.buildSla})`,
      ],
      cta: {
        label: "Apply as a production partner",
        href: "/partnerships?track=production#apply",
        variant: "primary",
      } as CtaLink,
    },
    {
      name: "Referral partner",
      forWho:
        "For consultants, designers, and past clients who meet businesses that need a website.",
      description:
        "Send us a qualified introduction. We handle everything under the Zenith brand and you earn a commission when the project closes.",
      bullets: [
        `${commercials.referralCommission} of project value on close`,
        "No delivery involvement required",
        "Full visibility on the deal status",
        `Paid ${commercials.referralPayout}`,
      ],
      cta: {
        label: "Apply as a referral partner",
        href: "/partnerships?track=referral#apply",
        variant: "primary",
      } as CtaLink,
    },
  ],
};

// 3. How it works — tabbed four-step split with a mock graphic per step.
export const pProcess = {
  heading: "How a white-label build runs",
  intro:
    "One channel, four steps, your brand out front. This is how a project moves from brief to handover.",
  cta: {
    label: "Apply to partner",
    href: "#apply",
    variant: "primary",
  } as CtaLink,
  steps: [
    {
      title: "Brief",
      body: "You send the project brief and brand assets through the partner channel. We confirm scope, price, and timeline within one business day.",
    },
    {
      title: "Design direction",
      body: "We propose structure and design direction. You review it before your client ever sees anything.",
    },
    {
      title: "You present, we stay invisible",
      body: "You collect client feedback under your brand. We iterate directly with you, never with your client.",
    },
    {
      title: "Handover",
      body: "The finished site is transferred to your account with documentation. Your brand on everything, our name on nothing.",
    },
  ],
};

// 3a. What we build for partners — the platforms and project types covered.
export const pServices = {
  heading: "What we build under your brand",
  intro:
    "Whatever your client needs building, on whichever platform makes sense for them.",
  items: [
    {
      icon: "browser",
      title: "Full website development",
      body: "Multi-page marketing sites, from structure and design through to build and launch.",
    },
    {
      icon: "target",
      title: "Landing pages",
      body: "Single-page campaign and lead-capture builds, scoped and shipped fast.",
    },
    {
      icon: "blocks",
      title: "Wix Studio development",
      body: "Custom code, CMS architecture, and integrations on the platform we know best.",
    },
    {
      icon: "framer",
      title: "Framer development",
      body: "Framer builds with CMS collections, reusable components, and interactions.",
    },
    {
      icon: "component",
      title: "Webflow development",
      body: "Webflow builds with a clean class structure your team can maintain.",
    },
    {
      icon: "bag",
      title: "Shopify e-commerce",
      body: "Storefront builds, theme customisation, and product architecture.",
    },
    {
      icon: "code",
      title: "Custom development",
      body: "Next.js and headless builds for when a platform stops being enough. This site is the proof.",
    },
  ],
};

// 3b. Partner pricing — three ways to work together. Final commercial terms;
// the full-site wholesale rate card stays gated (see the header comment).
export const pPricing = {
  heading: "Three ways to work with us",
  intro:
    "Pick the structure that matches how you sell. All three run under your brand, or ours if you'd rather stay out of delivery.",
  tiers: [
    {
      name: "Monthly",
      icon: "calendar",
      badge: "Reserved capacity",
      price: "From €1,099",
      priceNote: "per month",
      summary:
        "A standing production slot for agencies with steady throughput. Reserved build capacity and priority turnaround.",
      features: [
        "1 reserved production slot: 30 hrs/month of development",
        "Priority queue ahead of one-off projects",
        "Dedicated PM and partner channel",
        "Unbranded deliverables & NDA",
        "Rolls month to month, 30 days notice",
      ],
      cta: {
        label: "Apply for a retainer",
        href: "/partnerships?track=retainer#apply",
      } as CtaLink,
      highlighted: true,
    },
    {
      name: "Fixed",
      icon: "file-check",
      badge: "Per project",
      price: "From €1,250",
      priceNote: "per build",
      summary:
        "Overflow work priced per project. Scope, price, and timeline agreed in writing before we start.",
      features: [
        "Scales from a single landing page to full-site builds",
        "Partner pricing: full rate card shared after a short application",
        "Turnaround SLAs: landing page in 1 week, 5-page build in 2 weeks",
        "Unbranded deliverables & NDA",
        "2 revision rounds included, extra rounds €250",
        "50% upfront, 50% on delivery",
        "No minimum commitment",
      ],
      cta: {
        label: "Apply as a production partner",
        href: "/partnerships?track=production#apply",
      } as CtaLink,
      highlighted: false,
    },
    {
      name: "Referral",
      icon: "send",
      badge: "Commission",
      price: "10%",
      priceNote: "of project value",
      summary:
        "Send a qualified introduction and stay out of delivery. We close and build under the Zenith brand.",
      features: [
        "Rises to 15% after your second closed deal in a year",
        "No delivery involvement required",
        "Full visibility on deal status",
        "Paid when the client pays; retainers pay 10% of the first 3 months",
        "New introductions only, 6-month attribution window",
        "No cap on introductions",
      ],
      cta: {
        label: "Apply as a referral partner",
        href: "/partnerships?track=referral#apply",
      } as CtaLink,
      highlighted: false,
    },
  ],
};

// 4. What partners get — dark hairline grid, six cells.
export const pBenefits = {
  heading: "Built to protect your margin and your reputation",
  items: [
    {
      icon: "gem",
      title: "Premium build quality",
      body: "The same team and standard behind Knode's $10M raise site and 220% booking growth for MOD Digital. Not template flips.",
    },
    {
      icon: "eyeOff",
      title: "Unbranded everything",
      body: "Files, previews, and staging environments carry your brand or none. NDA as standard.",
    },
    {
      icon: "percent",
      title: "Partner pricing",
      body: `${commercials.wholesaleStructure}, so your margin survives the project.`,
    },
    {
      icon: "clock",
      title: "Predictable turnaround",
      body: `${commercials.buildSla}, agreed in writing before we start.`,
    },
    {
      icon: "user",
      title: "One point of contact",
      body: "A dedicated PM who knows your accounts. No ticket queues, no rotating staff.",
    },
    {
      icon: "layers",
      title: "Overflow flexibility",
      body: `Use us for one overflow project or as your standing production team. ${commercials.minimumCommitment}.`,
    },
  ],
  // Risk-reduction strip — OWNER: confirm each claim before launch.
  riskStrip: [
    "No minimum commitment",
    "First project scoped within one business day",
    "NDA before you share anything",
    "Same team every project",
  ],
};

// 5. Partner expectations — the short honesty section.
export const pExpectations = {
  heading: "What we ask of partners",
  items: [
    "You own all client-facing communication",
    `Feedback consolidated in agreed windows (${commercials.feedbackWindow}) so builds stay on schedule`,
    `Revisions per scope: ${commercials.revisionPolicy}`,
  ],
  closing: "Clear terms up front so neither side burns margin on ambiguity.",
};

// 6. Partner case studies — THE core proof section. Duration is the headline
// metric on every card; cards with a public case study cross-link to it.
export type PartnerStory = {
  name: string;
  logo: string;
  relationship: string;
  title: string;
  story: string;
  // OWNER: per-partner site screenshot; a framed placeholder renders until set.
  image?: string;
  stats: { value: string; label: string }[];
  quote?: { text: string; name?: string; role?: string; avatar?: string };
  featured?: boolean;
  href?: string;
};

export const pStories = {
  heading: "The partners who kept coming back",
  intro:
    "White-label partnerships live or die on reliability. Here's what ours look like after the first project.",
  stories: [
    {
      name: "Techtonnik",
      logo: "/logos-blue/techtonnik.png",
      relationship: "Production partner since 2023",
      title: "Web fulfillment for an agency serving Serbia's IT sector",
      story:
        "Started with one build. Now 10+ websites and 2 web apps delivered across 7+ industries, all under Techtonnik's brand.",
      stats: [
        { value: "10+", label: "websites" },
        { value: "2", label: "web apps" },
        { value: "7+", label: "industries" },
      ],
      image: "/partners/techtonnik.webp",
      // OWNER: mock quote — replace with a real attributed one before launch.
      quote: partnerQuote("stevan-radovanovic"),
      href: "/case-studies",
    },
    // AdVantage story hidden per owner request (2026-08-10) — uncomment to restore.
    // {
    //   name: "AdVantage Media Marketing",
    //   logo: "/logos-blue/advantage.avif",
    //   relationship: "White-label partner since 2024",
    //   title: "The full white-label relationship, under AdVantage's brand",
    //   story:
    //     "Builds, plus ongoing management of dozens of client websites, security, and email systems. AdVantage's clients never hear our name.",
    //   stats: [
    //     { value: "Dozens", label: "of client sites managed" },
    //     { value: "2024", label: "partners since" },
    //   ],
    //   // The one full white-label testimonial — featured, largest treatment.
    //   // OWNER: swap the mock avatar for John's real photo.
    //   quote: {
    //     text: "Even though I didn't have a crystal-clear vision of how a white-label partnership looked, Zenith was able to overdeliver on every front imaginable.",
    //     name: "John Smyth",
    //     role: "CEO @AdVantage",
    //     avatar: "/avatars/a2.jpg",
    //   },
    //   featured: true,
    // },
    {
      name: "MOD Digital",
      logo: "/logos-blue/mod.avif",
      relationship: "Campaign production partner",
      title: "15+ landing pages behind MOD's client campaigns",
      story:
        "Landing pages built for MOD's client marketing campaigns, generating €1M+ in client revenue.",
      stats: [
        { value: "15+", label: "landing pages" },
        { value: "€1M+", label: "client campaign revenue" },
      ],
      image: "/partners/mod-digital.webp",
      quote: partnerQuote("flynn-blackie"),
      href: "/case-studies",
    },
    {
      name: "Capacity",
      logo: "/logos-blue/capacity.avif",
      relationship: "Embedded fractional team",
      title: "A standing fractional team for Capacity's consulting clients",
      story:
        "Zenith runs design and development operations end to end for Capacity's consulting clients. A standing team, not per-project outsourcing.",
      stats: [
        { value: "5+", label: "consulting projects" },
        { value: "End to end", label: "design & dev operations" },
      ],
      image: "/partners/capacity.webp",
      // OWNER: attribute the quote (mock name/avatar until then).
      quote: partnerQuote("ben-hall"),
      href: "/case-studies",
    },
    {
      name: "LMF HR",
      logo: "/logos-blue/lmfhr.avif",
      relationship: "Fractional web & IT partner",
      title:
        "Fractional web design & IT for consulting-firm clients in Indianapolis",
      story:
        "Web design and IT handled as a standing fractional arrangement for LMF HR's consulting-firm clients in Indianapolis.",
      // OWNER: replace with real figures.
      stats: [{ value: "[n]", label: "client sites delivered" }],
      image: "/partners/lmf-hr.webp",
      // OWNER: mock quote — replace with a real attributed one before launch.
      quote: partnerQuote("les-marie"),
    },
    {
      // OWNER: fill in the WellingtonWebCo relationship — every bracketed
      // value below is a placeholder. A wordmark renders until a logo is added.
      name: "WellingtonWebCo",
      logo: "",
      // OWNER: relationship + stats still to set. "Dozens" is Finlay's own
      // word from his quote; swap in the real count when you have it.
      relationship: "[relationship to set]",
      title:
        "Web design and hosting fulfillment for Scotland's local businesses",
      story:
        "Wellington Web Co owns the client relationship and the local market. We design, build, and host the sites behind it, under their brand. One introductory call has since run to dozens of local business websites across Scotland.",
      stats: [{ value: "[n]", label: "[metric to set]" }],
      image: "/partners/wellington-web-co.webp",
      quote: partnerQuote("finlay-wellington"),
    },
  ] as PartnerStory[],
};

// Shared with the master /faq page (single source, no drift).
export const bothTracksAnswer =
  "Referral means you introduce and step away. If you want to manage the client or set your own price, that's the white-label track at partner pricing. One or the other per deal, never both.";

// 7. FAQ — feeds the shared Faq section + FAQPage JSON-LD on the page.
export const pFaq = {
  heading: ["Partner questions,", "answered straight"],
  subhead: "If it's not covered here, ask us on a call.",
  ctas: [
    {
      label: "Book a call",
      href: "/book-a-call",
      variant: "secondary",
    } as CtaLink,
  ],
  items: [
    {
      q: "Will my client ever know Zenith was involved?",
      a: "Not from us. Deliverables are unbranded, comms run through you, and an NDA is standard. The only way they find out is if you tell them.",
    },
    {
      q: "What platforms do you build on?",
      a: "Wix Studio is our primary platform, with fully custom builds (like this site) when a project needs it. If your client is on something else, ask us about migration.",
    },
    {
      q: "How is partner pricing structured?",
      a: `${commercials.wholesaleStructure}. You set your own client pricing on top; your margin is your business.`,
    },
    {
      q: "What if my client requests changes after handover?",
      a: `${commercials.postHandover}.`,
    },
    {
      q: "Can I white-label your SEO and campaign work too?",
      a: "Yes. Design, build, SEO/AEO, and automations can all run under your brand. Scope it in the brief.",
    },
    {
      q: "How do referral commissions work?",
      a: `You introduce, we close and deliver, you get ${commercials.referralCommission} when the client pays. You can see deal status at any point. No cap on introductions.`,
    },
    {
      q: "Can I be both a referral and white-label partner?",
      a: bothTracksAnswer,
    },
    {
      q: "What happens if I send you more work than you can handle?",
      a: `We tell you before you commit, not after. We'd rather cap intake than miss a partner deadline. ${commercials.capacityPolicy}`,
    },
  ],
};

// 8. Application form — founder-fronted close (no sales-team framing).
export const pApply = {
  heading: "Apply to partner",
  founder: {
    headline: "All quotes go to Pavle.",
    note: "Applications come straight to the founder. No sales team, no account managers, no queue. If we're a fit, you'll know within one business day.",
    name: "Pavle Maoduš",
    role: "Founder, Zenith Digital",
    photo: "/team/pavle.jpg",
  },
  fields: {
    agency: { label: "Agency / company name", placeholder: "Your agency" },
    name: { label: "Your name", placeholder: "First and last name" },
    email: { label: "Email", placeholder: "you@youragency.com" },
    website: { label: "Website", placeholder: "youragency.com" },
    track: {
      label: "Which track?",
      options: [
        "Retainer",
        "White-label production",
        "Referral",
        "Not sure yet",
      ],
    },
    need: {
      label: "What do you need?",
      placeholder:
        "e.g. 2–3 overflow builds per quarter, or a standing production partner...",
    },
  },
  submit: "Send application",
  success:
    "Application received. We'll come back to you within one business day.",
  errorFallback: "Or email us directly at hello@thezenithdigital.com.",
};
