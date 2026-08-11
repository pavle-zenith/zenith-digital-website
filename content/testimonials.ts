import type { CtaLink } from "@/lib/types";

/*
 * /testimonials — single source of truth for testimonial data. The homepage
 * video section imports `videoTestimonials` from here (re-exported through
 * content/home.ts), and the wall's video cards derive from the same items.
 *
 * OWNER — still to set (visible [bracketed] placeholders until then):
 *   - Clutch profile URL (hero chip, FAQ CTA, rating cards) — currently
 *     https://clutch.co until the live profile link is confirmed
 *   - the two Clutch rating-card lines (pull from real reviews only)
 *   - Jim Steele's real quote (marked placeholder card, never a duplicate)
 *   - Jack Shorrock's exact quote from the live site
 *   - Ben Hall's quote is paraphrased — swap in his real words
 */

// Video testimonials — used by the homepage section AND the wall's video cards.
export const videoTestimonials = {
  heading: "Hear directly from business owners that gave us their trust",
  intro:
    "We don't ask for testimonials until the work is done and the results are in. These are real clients who came to us with a site that wasn't even pulling its weight, and left with one that does.",
  items: [
    {
      quote:
        "Zenith redefined what hard work means to me. They treat every website project with pride, enthusiasm and extreme passion.",
      name: "Flynn Blackie",
      role: "Founder & Director",
      company: "MOD Digital",
      logo: "/logos-white/mod.png",
      poster: "/testimonials/flynn.jpg",
      video: "", // Flynn is an image for now
    },
    {
      quote:
        "We hired Zenith to help us rebrand our site. Conversion skyrocketed. We saw what it takes to be one of the top professionals in the field.",
      name: "Uros Stanimirovic",
      role: "Co-Founder & CTO",
      company: "Genroks AI",
      logo: "/logos-white/genroks.png",
      poster: "",
      video: "/testimonials/uros.mov",
    },
    {
      quote:
        "Even though I didn't have a crystal-clear vision of how a white-label partnership looked, Zenith was able to overdeliver on every front imaginable.",
      name: "John Smyth",
      role: "CEO",
      company: "AdVantage Media Marketing",
      logo: "/logos-white/advantage.png",
      poster: "",
      video: "/testimonials/john.mov",
    },
  ],
};

// 1. Hero (dark, compact — no CTAs, the wall is the point)
export const tHero = {
  heading: "What clients say after launch",
  support:
    "No cherry-picked praise and no anonymous quotes. Real names, real companies, real outcomes.",
  chips: ["Rated 5/5 on Clutch", "150+ websites shipped"],
};

// 2. Wall of love — five card types, hand-ordered so no two adjacent cards
// share a type and videos/site-shots stay distributed.
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

const vt = videoTestimonials.items;
const video = (i: number) => ({
  type: "video" as const,
  name: vt[i].name,
  role: vt[i].role,
  company: vt[i].company,
  logo: vt[i].logo,
  poster: vt[i].poster,
  video: vt[i].video,
});

export const wall: WallCard[] = [
  video(1), // Uros — Genroks
  {
    type: "quote",
    name: "Gemma K. Sole",
    role: "Head of GTM",
    company: "Knode AI",
    avatar: "/avatars/gemma-sole.jpg",
    quote:
      "They made an impression on me right from the beginning, it's incredibly easy to communicate with their team and even easier to work with them.",
    tag: { label: "$10M raised", href: "/case-studies" },
  },
  {
    type: "site",
    client: "Scottish Luxury Experience",
    image: "/casestudies/scottishluxury.jpg",
    href: "/case-studies",
  },
  // OWNER: pull this line from a real Clutch review; never invent one.
  { type: "rating", line: "[Line from a real Clutch review to pull]" },
  {
    type: "quote",
    name: "Ivan Belobrajdic",
    role: "Chief Director",
    company: "Bel'Istria",
    avatar: "/avatars/ivan-belobrajdic.jpg",
    quote:
      "Our collaboration on redesigning Bel'Istria was the beginning of a long-term partnership. Their composure and communication exceeded all standards.",
    tag: { label: "257% YoY impressions", href: "/case-studies" },
  },
  video(2), // John — AdVantage
  {
    type: "pull",
    line: "Zenith redefined what hard work means to me.",
    attribution: "Flynn Blackie, Founder & Director, MOD Digital",
  },
  {
    type: "site",
    client: "Knode AI",
    image: "/casestudies/knode.jpg",
    href: "/case-studies",
  },
  {
    // OWNER: quote is paraphrased — swap in Ben's real words.
    type: "quote",
    name: "Ben Hall",
    role: "",
    company: "Capacity",
    avatar: "/avatars/ben-hall.jpg",
    quote:
      "Zenith runs our design and development operations end to end. Reliable, fast, and genuinely invested in the outcome.",
  },
  // OWNER: pull this line from a real Clutch review; never invent one.
  { type: "rating", line: "[Line from a real Clutch review to pull]" },
  {
    type: "site",
    client: "Bel'Istria",
    image: "/casestudies/belistria.jpg",
    href: "/case-studies",
  },
  {
    // Marked placeholder — never ship Gemma's quote under Jim's name.
    type: "quote",
    name: "Jim Steele",
    role: "Director",
    company: "HPLabs UK",
    avatar: "/avatars/jim-steele.jpg",
    quote:
      "Jim's quote is on its way. We only publish clients' real words, so this card stays empty until we have his.",
    placeholder: true,
  },
  video(0), // Flynn — MOD (poster only for now)
  {
    // Marked placeholder — exact quote to port from the live Wix site.
    type: "quote",
    name: "Jack Shorrock",
    role: "",
    company: "Just Stay UK",
    avatar: "",
    quote:
      "Jack's quote from the live site is on its way. Real words only, so this card waits for the exact text.",
    placeholder: true,
  },
  {
    type: "site",
    client: "Hunting Brook Gardens",
    image: "/casestudies/huntingbrook.jpg",
    href: "/case-studies",
  },
];

// 3. FAQ — small, page-specific; emits FAQPage JSON-LD on /testimonials.
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
      a: "Every quote is from a named client on a real project. Most are on Clutch or on video, both harder to fake than a website quote.",
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

// 4. Final CTA band
export const tFinalCta = {
  heading: ["The next quote up there", "could be yours"],
  paragraph:
    "A free 20-minute call. We'll tell you honestly what's holding your site back, and what it would take to fix it.",
  cta: { label: "Book a call", href: "/book-a-call" },
  ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
  image: "/textures/studio-texture.jpg",
};
