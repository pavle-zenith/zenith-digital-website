import type { CtaLink, Metric } from "@/lib/types";

import { testimonial } from "./testimonials-data";

/**
 * /about — the entity anchor. This page exists so that Google and answer
 * engines resolve "Zenith Digital" to one unambiguous company (CLAUDE.md §8):
 * who runs it, where it is, when it started, and which claims are checkable
 * without asking us.
 *
 * DATED FACTS (owner-confirmed, 17 Aug 2026). Nothing here may be restated
 * differently anywhere else on the site:
 *   - Pavle has been building websites for businesses since 2019 (seven years)
 *   - Zenith Digital was founded in 2021 (five years), the same year the work
 *     consolidated around Wix Studio
 *   - The zero-downtime record runs from 2019, so it belongs to the builder's
 *     track record, not the company's age
 *
 * "TOP 1%" (owner note, 17 Aug 2026): Wix's official tier label is Legend
 * Partner. Every Legend-level partner sits in roughly the top 1% of Wix
 * builders, which is where the sitewide phrasing comes from. This page leads
 * with the official label because it's the half a visitor can verify on the
 * linked profile.
 */

export const aboutHero = {
  heading: "Zenith Digital is a web design and development studio",
  headingMuted:
    "based in Belgrade, building on Wix Studio, Shopify and custom code for businesses across the UK, EU and US.",
  support:
    "One founder, one standard, and a public record you can check. Wix Legend Partner status, 100+ websites shipped, and every number on this site traceable to a named client.",
  ctas: [
    { label: "Book a call", href: "/book-a-call", variant: "primary" },
    { label: "See the work", href: "/case-studies", variant: "secondary" },
  ] as CtaLink[],
  /**
   * Small screenshots set into the heading (owner, 25 Nov 2026), each one
   * straight after the words it illustrates: a project for every platform
   * the sentence names. A shot follows the first match of `after` across the
   * heading and its muted half; if an edit removes those words, that shot
   * simply drops. They're decorative inside the H1 (no alt), so the heading
   * still reads, and is quoted, as the sentence alone. The files are 16:10
   * crops of each site's first screen (Bel'Istria and Genroks from their
   * scroll captures, Lepa Couture from inside its mockup's browser window).
   */
  shots: [
    { after: "Wix Studio,", src: "/about/hero-chip-belistria.webp" },
    { after: "Shopify", src: "/about/hero-chip-lepa-couture.webp" },
    { after: "custom code", src: "/about/hero-chip-genroks-ai.webp" },
  ],
};

/**
 * One dated row of the record. `marks` carries client or partner logos where
 * they genuinely attach to that year; `selfEvident` is for a claim whose proof
 * is the page itself. Both optional: a year with nothing verifiable attached
 * carries the dated fact alone, which is the honest presentation.
 */
export type AboutTimelineItem = {
  year: string;
  body: string;
  /**
   * Logos, white on the navy band. `knockout` turns a coloured mark white
   * (LMF HR has no white file).
   */
  marks?: { src: string; alt: string; knockout?: boolean }[];
  selfEvident?: string;
  /** A screenshot for the row, shown in a browser frame. */
  image?: { src: string; alt: string };
  /** A badge for the row, set beside `figure`. Real pixel size, for no shift. */
  badge?: { src: string; alt: string; width: number; height: number };
  /** A headline figure for the row. */
  figure?: Metric;
};

export const aboutTimeline = {
  heading: "How we got here",
  intro:
    "The dates behind the numbers, so you can check them rather than take our word for it.",
  items: [
    {
      year: "2019",
      body: "Pavle starts building websites for businesses. The first clients are small service companies in Serbia and the UK.",
    },
    {
      year: "2021",
      body: "Zenith Digital is founded, and takes Wix Partner status the same year. The work consolidates around Wix Studio, and the positioning follows it.",
      marks: [{ src: "/logos-white/wix-studio.png", alt: "Wix Studio" }],
    },
    {
      year: "2023",
      body: "Long-term fulfilment partnerships begin. MOD Digital, Techtonnik and LMF HR still run today.",
      marks: [
        { src: "/logos-white/mod.png", alt: "MOD Digital" },
        { src: "/logos-white/techtonnik.png", alt: "Techtonnik" },
        { src: "/logos-blue/lmfhr.avif", alt: "LMF HR", knockout: true },
      ],
    },
    {
      year: "2025",
      body: "Legend Partner, Wix's top tier, roughly the top 1% of builders. 100+ websites shipped, €1M+ in tracked client revenue across them.",
      badge: {
        src: "/certifications/wix-partner-legend.webp",
        alt: "Wix Partner, Legend tier",
        width: 240,
        height: 240,
      },
      figure: { value: "100+", label: "Websites shipped since 2019" },
    },
    {
      year: "2026",
      body: "Zenith moves its own site off Wix to a custom Next.js build. The Wix Studio work continues, and this site is what the custom tier looks like.",
      /** The evidence for this row is the page it is printed on. */
      selfEvident: "You are looking at it.",
      // Captured from this site's homepage, first screen at 1440 wide.
      image: {
        src: "/about/zenith-homepage.webp",
        alt: "The Zenith Digital homepage",
      },
    },
  ] as AboutTimelineItem[],
};

export const aboutNumbers = {
  heading: "The record, in numbers",
  stats: [
    { value: "100+", label: "Websites shipped since 2019" },
    { value: "€1M+", label: "Campaign revenue, MOD Digital" },
    { value: "5.96x", label: "Average ROAS on managed campaigns" },
    { value: "Since 2019", label: "Without a production site going down" },
  ] as Metric[],
  note: "Every figure here traces to a named client in the case studies. Nothing is modelled or projected.",
};

/**
 * The small picture on top of each "working with us" card (owner brief,
 * 25 Nov 2026). `price` reads the entry price from the homepage pricing, so
 * it can never disagree with it.
 */
export type AboutHowVisual =
  | { kind: "chat"; avatar: string }
  | { kind: "price" }
  | { kind: "platforms"; logos: { src: string; alt: string }[] }
  | { kind: "posters"; posters: string[] };

export const aboutHow = {
  heading: "What working with us actually means",
  items: [
    {
      visual: { kind: "chat", avatar: "/team/pavle.jpg" },
      title: "You talk to the builder.",
      body: "There's no account manager. The person on your discovery call designs your pages, writes your proposal and answers when something breaks.",
    },
    {
      visual: { kind: "price" },
      title: "Fixed price, fixed timeline.",
      body: "You get a number and a date before we start. From €1,250, most builds live in 2 to 5 weeks.",
    },
    {
      visual: {
        kind: "platforms",
        logos: [
          { src: "/platforms/wix.svg", alt: "Wix Studio" },
          { src: "/platforms/shopify.svg", alt: "Shopify" },
          { src: "/platforms/nextjs.svg", alt: "Next.js" },
        ],
      },
      title: "The platform that fits, not the one we prefer.",
      body: "Wix Studio when your team wants to edit visually, Shopify when selling is the business, custom code when the site behaves like a product. Same prices on all three. This site is custom code.",
    },
    {
      visual: {
        kind: "posters",
        posters: [
          "/testimonials/finlay-wellington-poster.webp",
          "/testimonials/bates-green-poster.webp",
          "/testimonials/kayla-bloom-poster.jpg",
        ],
      },
      title: "The proof is public.",
      body: "Named clients, real numbers, video testimonials, and a Trustpilot profile we link to rather than quote.",
    },
  ] as { visual: AboutHowVisual; title: string; body: string }[],
};

/**
 * The page's one video (owner brief, 25 Nov 2026), between the founder and
 * the numbers: Finlay, because his words are about the partnership itself.
 * Same item shape as the homepage set, resolved from the testimonial source.
 */
export const aboutVideo = {
  items: ["finlay-wellington"].map((id) => {
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


export const aboutFaq = {
  heading: ["Questions about", "the company"],
  subhead:
    "The things buyers and search engines both ask before they decide who we are.",
  ctas: [
    { label: "Book a call", href: "/book-a-call", variant: "primary" },
    {
      label: "Free website audit",
      href: "/free-website-audit",
      variant: "secondary",
    },
  ] as CtaLink[],
  // Answer-engine bait: each answer leads with the direct answer in sentence
  // one and stands alone out of context.
  items: [
    {
      q: "What is Zenith Digital?",
      a: "Zenith Digital is a web design and development studio based in Belgrade, Serbia, working with businesses in the UK, EU and US. It builds conversion-focused websites on Wix Studio, stores on Shopify, and custom Next.js sites, at the same published prices on all three.",
    },
    {
      q: "Who runs Zenith Digital?",
      a: "Pavle Maodus, a web designer and developer who has been building for businesses since 2019 and has been a Wix Partner since 2021. He holds Legend Partner status, the top tier of the Wix partner programme, and runs every project personally.",
    },
    {
      q: "Where is Zenith Digital based?",
      a: "Belgrade, Serbia, with a working presence in Edinburgh and Liverpool. Most clients are in the UK, the EU and the US.",
    },
    {
      q: "How long has Zenith Digital been operating?",
      a: "Zenith Digital was founded in 2021. Its founder, Pavle Maodus, has been building websites for businesses since 2019, and more than 100 sites have shipped across that time.",
    },
    {
      q: "How many websites has Zenith Digital built?",
      a: "More than 100 since 2019, across SaaS, travel, hospitality, professional services, e-commerce and marketing agencies.",
    },
    {
      q: "Is Zenith Digital an official Wix Partner?",
      a: "Yes. Zenith Digital holds Legend Partner status, the top tier of the Wix partner programme, which covers roughly the top 1% of builders on the platform. The profile is public and linked from this page.",
    },
    {
      q: "What does a website cost?",
      a: "From €1,250 for a website, with landing pages from €750, at the same prices on Wix Studio, Shopify and custom code. Every project is quoted with a fixed price and a fixed timeline before work starts.",
    },
    {
      q: "How long does a build take?",
      a: "Two to five weeks for most websites, on any of the three platforms. Landing pages go live in about a week.",
    },
    {
      q: "Does Zenith Digital only build on Wix?",
      a: "No. Zenith Digital builds on Wix Studio, Shopify and custom code (Next.js with Sanity). Wix Studio suits teams that want to edit visually, Shopify suits businesses where selling products is the business, and custom code suits sites that behave like products. Zenith Digital's own site is a custom Next.js build.",
    },
    {
      q: "Can I see reviews?",
      a: "Yes. Named client testimonials with video are on the testimonials page, and the public Trustpilot profile is linked from this page and the footer.",
    },
  ],
};

export const aboutFinalCta = {
  heading: ["Want to know", "if we're a fit?"],
  paragraph:
    "A free 20-minute call. We'll tell you honestly what your site needs, whether or not that turns into a project.",
  cta: { label: "Book a call", href: "/book-a-call" },
  ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
  image: "/textures/studio-texture.jpg",
};

/**
 * Registered trading entity (owner-confirmed, 17 Aug 2026). Appears here and
 * on the legal pages only, never in schema: `legalName` would need to match
 * the registration exactly across every surface that carries it.
 */
export const aboutEntity =
  "MILORAD MAODUS PR RACUNARSKO PROGRAMIRANJE ZENITH DIGITAL KANJIZA";

/** Serbian business register numbers (owner, 20 Nov 2026: publish them). */
export const aboutRegistration = { pib: "114003945", mb: "67251318" };

export const aboutLegal = `Zenith Digital is the trading name of ${aboutEntity}, registered in Serbia. Tax ID (PIB) ${aboutRegistration.pib}, registration number (MB) ${aboutRegistration.mb}.`;

/**
 * The record, verified.
 *
 * This block absorbs three things that used to be separate: the hero's stat
 * row (four figures `aboutNumbers` already carries, with better labels), the
 * "who vouches for us" grid, and the registration line that sat at the very
 * bottom as grey legal furniture. All three were answering one question in
 * three places: who says so, besides you.
 *
 * Ordered by how hard each is to fake, strongest first. `href: null` renders
 * as a plain record rather than a link: not everything here has a public
 * profile to point at, and a dead link is worse than an honest full stop.
 */
/**
 * The visual each record leads with (owner brief, 25 Nov 2026). `stamp` is for
 * the record with no logo to show: its lines are set as a stamp in the mono
 * label style. A `logos` entry without `src` is set as a name.
 */
export type AboutVerifyMark =
  | { kind: "badge"; src: string; alt: string; width: number; height: number }
  | { kind: "rating"; platform: string }
  | { kind: "avatar"; src: string; alt: string }
  | { kind: "logos"; logos: { src?: string; alt: string }[] }
  | { kind: "logo"; src: string; alt: string }
  | { kind: "stamp"; lines: string[] };

export const aboutVerify = {
  heading: "Who says so, besides us",
  intro:
    "Most of this page is checkable without contacting us. These are the records, and where they live.",
  items: [
    {
      mark: {
        kind: "badge",
        src: "/certifications/wix-partner-legend.webp",
        alt: "Wix Partner, Legend tier",
        width: 240,
        height: 240,
      },
      record: "Wix Legend Partner",
      body: "The top tier of the Wix partner programme, roughly the top 1% of builders. Awarded by Wix, not self-declared.",
      href: "https://www.wix.com/studio/community/partners/zenith-digital",
      linkLabel: "Wix Partner profile",
      note: null,
    },
    {
      // Five stars drawn in code beside the name, and no score: the copy says
      // we link the profile rather than quote one.
      mark: { kind: "rating", platform: "Trustpilot" },
      record: "Client reviews",
      body: "Public and unedited on Trustpilot. We link the profile rather than quote a score off it.",
      href: "https://www.trustpilot.com/review/thezenithdigital.com",
      linkLabel: "Read the reviews",
      note: null,
    },
    {
      mark: { kind: "avatar", src: "/team/pavle.jpg", alt: "Pavle Maodus" },
      record: "The person running it",
      body: "Pavle Maodus. Building for businesses since 2019, a Wix Partner since 2021, and on every project personally.",
      href: "https://www.linkedin.com/in/pavlemaodus",
      linkLabel: "LinkedIn",
      note: null,
    },
    {
      // No Wellington Web Co logo file exists, so its name is set in type.
      mark: {
        kind: "logos",
        logos: [
          { src: "/logos-dark/mod.png", alt: "MOD Digital" },
          { src: "/logos-dark/techtonnik.png", alt: "Techtonnik" },
          { alt: "Wellington Web Co" },
          { src: "/logos-blue/lmfhr.avif", alt: "LMF HR" },
        ],
      },
      record: "Agency partners",
      body: "MOD Digital, Techtonnik, LMF HR, Wellington Web Co, AdVantage and Latitude Haus resell or subcontract our builds. Several have run for three years.",
      href: "/partnerships",
      linkLabel: "White-label and partnerships",
      note: null,
    },
    {
      mark: { kind: "logo", src: "/platforms/shopify.svg", alt: "Shopify" },
      record: "Shopify Partner",
      body: "Shopify stores built and launched for product brands, including Lepa Couture and Destilerija Gorska.",
      href: null,
      linkLabel: null,
      note: "Partner account",
    },
    {
      mark: {
        kind: "stamp",
        lines: [`PIB ${aboutRegistration.pib}`, `MB ${aboutRegistration.mb}`],
      },
      record: "Registered company",
      body: aboutLegal,
      href: null,
      linkLabel: null,
      note: "Registered in Serbia",
    },
  ] as {
    mark: AboutVerifyMark;
    record: string;
    body: string;
    href: string | null;
    linkLabel: string | null;
    note: string | null;
  }[],
};
