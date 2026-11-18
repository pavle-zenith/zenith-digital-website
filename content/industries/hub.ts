import type { CtaLink } from "@/lib/types";
import { INDUSTRIES, type IndustrySlug } from "@/content/case-studies";
import { hero as homeHero } from "@/content/home";
import { PACKAGES, figure, lower } from "./proof";

/**
 * /industries — the hub. Structured like designme.agency/industries (owner
 * brief, 17 Nov 2026) and revised the same day (hub-and-nav brief, Part A):
 * hero, logo strip, the industry rows, three selected projects, the
 * principles, FAQ, closing CTA. One list, one taxonomy: the project
 * directory was cut because it repeated the rows under a second grouping.
 *
 * `rows` lists EVERY industry, in hub order, and every row is a link: to the
 * industry's page once it's published, to the filtered case-study grid
 * (/case-studies?industry={key}) until then, so nothing reads as dead text.
 * A row repoints by itself the moment its page flips to `publish: true`.
 * Agencies has no industry page; its row goes to /partnerships.
 *
 * Every price and figure here is read through ./proof, never typed.
 */

export type HubRow = {
  key: IndustrySlug;
  /** Route slug under /industries; absent for a row that links elsewhere. */
  slug?: string;
  /** A fixed destination instead of an industry page (Agencies). */
  href?: string;
  name: string;
  /**
   * The case-study detail link to this industry's work ("More travel work"),
   * written per row because "More {name} work" reads badly for some names.
   */
  workLabel: string;
  /** components/ui/FeatureIcon name. */
  icon: string;
  /**
   * What we make, for whom, and the outcome, in one sentence of 10 to 16
   * words that couldn't sit under any other row.
   */
  purpose: string;
};

const [minimumWeeks] = PACKAGES.minimum.timeline.split(" ");
const knodeBuild = figure("knode-ai", "Kickoff to launch");
const sleBuild = figure("scottish-luxury-experience", "Kickoff to launch");
const { minimum, studio, landing } = PACKAGES;

export const industriesHub = {
  /** Owner review gate, same contract as the industry pages. */
  publish: true,

  seo: {
    title: "Industries we build websites for | Zenith Digital",
    description: `Websites for travel, e-commerce, SaaS, coaches, courses, property and more, with the real projects behind each. Built on Wix Studio, ${lower(minimum.price)}.`,
  },

  hero: {
    h1: "Websites for the way your industry sells",
    line: "Pick your industry to see the work.",
    ctas: [
      { label: "Find your industry", href: "#industry-list" },
      { label: "Book a call", href: "/book-a-call", variant: "secondary" },
    ] as CtaLink[],
    /** The homepage's trust row: same faces, same count. */
    trust: homeHero.proof,
  },

  list: {
    id: "industry-list",
    // Owner decision (hub-and-nav brief, 17 Nov 2026): the eyebrow stays,
    // because the H2 no longer says "industry" and the label is what tells
    // the reader these rows are pages.
    eyebrow: "Industry pages",
    heading: "Where we've done the most work",
    intro:
      "Each page covers what goes wrong in that market, the work we've shipped there, and what we'd do first.",
  },

  rows: [
    {
      key: "travel",
      slug: "travel",
      name: INDUSTRIES.travel,
      workLabel: "More travel work",
      icon: "compass",
      purpose:
        "Websites for travel agencies, tour operators and holiday rentals that take bookings direct.",
    },
    {
      key: "ecommerce",
      slug: "ecommerce",
      name: INDUSTRIES.ecommerce,
      workLabel: "More e-commerce work",
      icon: "bag",
      purpose:
        "Stores and brand sites on Wix Studio or Shopify that make buying feel safe.",
    },
    {
      key: "saas",
      slug: "saas",
      name: INDUSTRIES.saas,
      workLabel: "More SaaS and AI work",
      icon: "layers",
      purpose:
        "Marketing sites that explain the product in seconds and look ready to raise.",
    },
    {
      key: "coaches",
      slug: "coaches",
      name: INDUSTRIES.coaches,
      workLabel: "More work for coaches",
      icon: "mic",
      purpose:
        "Sites for coaches, speakers and authors that turn a reputation into booked calls.",
    },
    {
      key: "courses",
      slug: "courses",
      name: INDUSTRIES.courses,
      workLabel: "More course and education work",
      icon: "graduation-cap",
      purpose:
        "Course and education sites, from launch pages to full libraries people can search.",
    },
    {
      key: "property",
      slug: "property",
      name: INDUSTRIES.property,
      workLabel: "More property work",
      icon: "building",
      purpose:
        "Sites for developments and property services that bring in serious buyer enquiries.",
    },
    {
      key: "marine",
      slug: "marine",
      name: INDUSTRIES.marine,
      workLabel: "More marine work",
      icon: "anchor",
      purpose:
        "Rental, charter and marketplace sites for boats, docks and the people who book them.",
    },
    {
      key: "trades",
      slug: "trades",
      name: INDUSTRIES.trades,
      workLabel: "More trades work",
      icon: "wrench",
      purpose:
        "Quote-led sites for trades and logistics firms that get found in their service area.",
    },
    {
      key: "services",
      slug: "professional-services",
      name: INDUSTRIES.services,
      workLabel: "More professional services work",
      icon: "briefcase",
      purpose:
        "Clear, credible sites for firms that sell expertise, in English, German or Serbian.",
    },
    {
      key: "creative",
      slug: "creative",
      name: INDUSTRIES.creative,
      workLabel: "More creative work",
      icon: "clapperboard",
      purpose:
        "Reel-led portfolios for film crews and studios that load fast and win briefs.",
    },
    {
      key: "local",
      slug: "local-business",
      name: INDUSTRIES.local,
      workLabel: "More local business work",
      icon: "map-pin",
      purpose:
        "Simple sites for barbers, restaurants and shops that people find on the map.",
    },
    {
      key: "agencies",
      href: "/partnerships",
      name: INDUSTRIES.agencies,
      workLabel: "More agency work",
      icon: "handshake",
      purpose:
        "White-label design and development for agencies that need a build team behind their brand.",
    },
  ] as HubRow[],

  /**
   * The page's one image-led section: three projects from three industries,
   * rendered with the case-study grid's own card.
   */
  selectedWork: {
    heading: "Selected work",
    slugs: ["scottish-luxury-experience", "hunting-brook-gardens", "knode-ai"],
    link: { label: "See all case studies", href: "/case-studies" },
  },

  principles: {
    heading: "Same team, whatever you sell",
    intro:
      "The industry changes what goes on the page. It doesn't change how the work runs.",
    items: [
      {
        title: "Your market first",
        body: "Before any design, we look at who buys from you and who they compare you with. The pages follow from that, not from a template.",
      },
      {
        title: "One team from design to build",
        body: "The person on your discovery call designs your pages and builds them. No account manager in between, no handover to another studio.",
      },
      {
        title: "Fixed price, fixed date",
        body: `You get a price and a launch date in writing before we start, ${lower(minimum.price)} for a full site.`,
      },
    ],
    link: { label: "See how each service works", href: "/services" },
  },

  faq: {
    heading: ["Industry website", "questions"],
    subhead: "The questions people ask before they pick a page.",
    items: [
      {
        q: "What industries does Zenith Digital work with?",
        a: "Travel, e-commerce, SaaS and AI, coaches, courses, property, marine, trades, professional services, creative studios and local businesses, plus white-label work for agencies. Each has its own page with the projects we've shipped in it.",
      },
      {
        q: "Do you only work with the industries listed here?",
        a: "No. These are the industries we've already shipped projects in, so each page can show real work. A business outside them gets the same start: we look at your buyers and competitors before we design anything.",
      },
      {
        q: "Do you build on Wix Studio or Shopify?",
        a: "Mostly Wix Studio, Shopify where a store needs it, and custom code when a site outgrows both. Lepa Couture's storefront runs on Shopify, and Genroks AI's site is custom-coded.",
      },
      {
        q: "How long does a typical project take?",
        a: `${minimumWeeks} to ${studio.timeline} for a full site: ${minimum.name} ships in ${minimum.timeline} and ${studio.name} in ${studio.timeline}. A landing page is ${lower(landing.timeline)}. Knode AI went live in ${knodeBuild}, and Scottish Luxury Experience in ${sleBuild}.`,
      },
      {
        q: "How much does an industry website cost?",
        a: `The same published prices in every industry: a landing page ${lower(landing.price)}, ${minimum.name} ${lower(minimum.price)} for ${lower(minimum.scope)}, and ${studio.name} at ${studio.price} for ${lower(studio.scope)}. Each industry page shows which package fits that kind of business.`,
      },
    ],
  },

  finalCta: {
    heading: ["Don't see your industry?", "Tell us what you sell."],
    paragraph:
      "A free 20-minute call. We'll look at your market and your current site, and tell you honestly what we'd build first.",
  },
};
