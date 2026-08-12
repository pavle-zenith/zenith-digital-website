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

// Clients with a video (or, for Flynn, a poster shot), in the order the
// /testimonials slider plays them.
// Adding a video is a one-line change: set `video` on the testimonial and add
// its id here. These people also keep a wall card below: the slider card shows
// one truncated sentence over their face, so the wall is the only place their
// full quote is readable as text.
const videoIds = [
  "jack-shorrock",
  "finlay-wellington",
  "john-smyth",
  "flynn-blackie",
  "michael-forte",
  "kayla-bloom",
  "uros-stanimirovic",
  "bates-green",
];

// The homepage picks its own three rather than taking the first three above,
// so reordering the /testimonials slider can't quietly change the homepage.
const homepageVideoIds = [
  "jack-shorrock",
  "john-smyth",
  "flynn-blackie",
];

export const videoTestimonials = {
  heading: "Hear directly from business owners that gave us their trust",
  intro:
    "We don't ask for testimonials until the work is done and the results are in. These are real clients who came to us with a site that wasn't even pulling its weight, and left with one that does.",
  items: homepageVideoIds.map((id) => {
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
  // Every figure here already appears elsewhere on the site.
  stats: [
    { value: "5/5", label: "Rated on Clutch" },
    { value: "150+", label: "Websites shipped" },
    { value: "€1M+", label: "Client revenue generated" },
  ] as Metric[],
};

/** DOM id of the video slider track; the hero's arrows scroll it. */
export const VIDEO_TRACK_ID = "video-testimonial-track";

// 2. Video testimonials on /testimonials — every clip we have, rendered as a
// bare slider between the hero and the wall. No heading or intro: the faces
// are the section.
export const tVideos = {
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
 * The wall: one quote card per client, everybody included. The video clients
 * are in the slider above as well, and that's deliberate. Their slider card
 * truncates to a single sentence so the panel doesn't bury their face, so
 * without a wall card their full testimonial would never appear in text.
 */
export const wall: WallCard[] = allTestimonials.map(asQuote);

// 4. FAQ — removed from this page (the client-logo marquee sits here now).
// The master /faq page still answers these questions.

// 5. Final CTA band
export const tFinalCta = {
  heading: ["The next quote up there", "could be yours"],
  paragraph:
    "A free 20-minute call. We'll tell you honestly what's holding your site back, and what it would take to fix it.",
  cta: { label: "Book a call", href: "/book-a-call" },
  ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
  image: "/textures/studio-texture.jpg",
};
