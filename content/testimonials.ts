import type { CtaLink, Metric } from "@/lib/types";

import {
  allTestimonials,
  attribution,
  testimonial,
  type Testimonial,
} from "./testimonials-data";

/*
 * /testimonials — page copy plus the derived views of the testimonial batch.
 * The quotes themselves live in content/testimonials-data.ts and are never
 * retyped here: the wall, the homepage video section, and the homepage tabs
 * are all projections of that one list, so a client's words can't drift.
 *
 * OWNER — still to set (visible [bracketed] placeholders until then):
 *   - Clutch profile URL (FAQ CTA) — currently https://clutch.co
 *   - real headshots for the 4 people still on the placeholder avatar
 */

export {
  allTestimonials,
  attribution,
  testimonial,
  quoteOf,
  PLACEHOLDER_AVATAR,
} from "./testimonials-data";
export type { Testimonial } from "./testimonials-data";

// Video testimonials — the three clients who recorded one. Used by the
// homepage video section and by the wall's video cards.
const videoIds = ["uros-stanimirovic", "john-smyth", "flynn-blackie"];

export const videoTestimonials = {
  heading: "Hear directly from business owners that gave us their trust",
  intro:
    "We don't ask for testimonials until the work is done and the results are in. These are real clients who came to us with a site that wasn't even pulling its weight, and left with one that does.",
  items: videoIds.map((id) => {
    const t = testimonial(id);
    return {
      quote: t.quote,
      name: t.name,
      role: t.role,
      company: t.company,
      logo: t.logo ?? "",
      poster: t.poster ?? "",
      video: t.video ?? "",
    };
  }),
};

// 1. Hero (light, on the inverted texture — no CTAs, the wall is the point)
export const tHero = {
  heading: "What clients say after launch",
  support:
    "No cherry-picked praise and no anonymous quotes. Real names, real companies, real outcomes.",
  // The review count is derived, so it can't fall out of date when the batch
  // grows. Every other figure already appears elsewhere on the site.
  stats: [
    { value: `${allTestimonials.length}`, label: "Client reviews" },
    { value: "5/5", label: "Rated on Clutch" },
    { value: "150+", label: "Websites shipped" },
    { value: "€1M+", label: "Client revenue generated" },
  ] as Metric[],
};

// 2. Video testimonials on /testimonials — same three clips as the homepage,
// its own framing. Rendered as a slider between the hero and the wall.
export const tVideos = {
  heading: "Some of them said it on camera",
  intro:
    "Three clients recorded a video instead of typing a line. Same words, harder to fake.",
  items: videoTestimonials.items,
};

// 3. Wall of love — five card types are supported; the wall currently emits
// video and quote cards only. Rating, pull-quote, and site-shot cards stay in
// the union so the parked variants can be restored without a refactor.
export type WallCard =
  | {
      type: "video";
      name: string;
      role: string;
      company: string;
      logo: string;
      poster: string;
      video: string;
    }
  | {
      type: "quote";
      name: string;
      role: string;
      company: string;
      avatar: string;
      quote: string;
      placeholder?: boolean;
      tag?: { label: string; href: string };
    }
  | { type: "rating"; line: string }
  | { type: "pull"; line: string; attribution: string }
  | { type: "site"; client: string; image: string; href: string };

/** Outcome tags on the few clients with a published number attached. */
const TAGS: Record<string, { label: string; href: string }> = {
  "gemma-sole": { label: "$10M raised", href: "/case-studies/knode-ai" },
  "ivan-belobrajdic": { label: "257% YoY impressions", href: "/case-studies" },
  "flynn-blackie": { label: "€1M+ campaign revenue", href: "/case-studies" },
  "les-marie": { label: "12+ sites delivered", href: "/case-studies" },
  "stevan-radovanovic": { label: "10+ projects", href: "/case-studies" },
};

const asQuote = (t: Testimonial): WallCard => ({
  type: "quote",
  name: t.name,
  role: t.role,
  company: t.company,
  avatar: t.avatar,
  quote: t.quote,
  ...(TAGS[t.id] ? { tag: TAGS[t.id] } : {}),
});

/**
 * The wall: one quote card per client who didn't record a video. The three
 * video clients appear in the slider above instead, so nobody is shown twice
 * and no quote is printed twice on the same page.
 */
export const wall: WallCard[] = allTestimonials
  .filter((t) => !videoIds.includes(t.id))
  .map(asQuote);

// 4. FAQ — small, page-specific; emits FAQPage JSON-LD on /testimonials.
export const tFaq = {
  heading: ["About these", "testimonials"],
  subhead: "How we collect them, and how you can check.",
  ctas: [
    { label: "Book a call", href: "/book-a-call", variant: "primary" } as CtaLink,
    {
      // OWNER: point at the live Clutch profile once confirmed.
      label: "Leave a Clutch review",
      href: "https://clutch.co",
      variant: "secondary",
    } as CtaLink,
  ],
  items: [
    {
      q: "Are these real?",
      a: `Every one of the ${allTestimonials.length} quotes on this page is from a named client on a real project, published with their name, role, and company. Several are on video, and several are on Clutch, both harder to fake than a line of text on a website.`,
    },
    {
      q: "Can I talk to a past client?",
      a: "Yes. Book a call and ask. For serious projects we'll happily connect you with a reference in your industry.",
    },
    {
      q: "Where else can I verify you?",
      a: "Our Clutch profile, the Wix Partner directory (Top 1% Partner), and the live client sites linked throughout. Every one is a working business you can visit.",
    },
    {
      q: "Worked with us?",
      a: "Leave a review on Clutch. It's the most useful thank-you there is.",
    },
  ],
};

// 5. Final CTA band
export const tFinalCta = {
  heading: ["The next quote up there", "could be yours"],
  paragraph:
    "A free 20-minute call. We'll tell you honestly what's holding your site back, and what it would take to fix it.",
  cta: { label: "Book a call", href: "/book-a-call" },
  ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
  image: "/textures/studio-texture.jpg",
};
