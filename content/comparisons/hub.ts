import type { Platform } from "@/content/case-studies";
import { PACKAGES } from "@/content/industries/proof";

import type { RivalKey } from "./types";

const { landing, minimum, studio } = PACKAGES;

/**
 * /compare, the hub (resources brief, Part D). Published by
 * content/comparisons/status.ts (`hub`).
 *
 * OWNER, before publishing the hub:
 * - "Which platform fits which team": the "best if you are" line for each
 *   platform (our framing; the per-comparison pages carry the sourced detail).
 * - "Built with us" names come from the platform tags (content/case-studies),
 *   strongest first (go-live brief, 19 Nov 2026): Wix Studio Scottish Luxury
 *   Experience, Hunting Brook Gardens, Knode AI; Next.js + Sanity Genroks
 *   AI, Highland Fling, Pressure Test Scotland; Shopify Lepa Couture,
 *   Destilerija Gorska, NotYou Brand.
 * - Compare column (owner, 19 Nov 2026): a row links its comparison once
 *   that's published; until then Shopify links /industries/ecommerce,
 *   Framer and Squarespace their migration guides, and Next.js stays empty.
 * - Guides: the Wix Harmony post goes live 24 Nov 2026. Each guide renders only
 *   while its post is live in Sanity, so nothing links a 404.
 * - The FAQ's prices come from PACKAGES.
 */
export const compareHub = {
  seo: {
    title: "Website platform comparisons: which to choose? | Zenith Digital",
    description:
      "Wix Studio compared with WordPress, Webflow and other website platforms: speed, CMS, SEO, cost and who runs the site after launch, from vendor sources.",
  },
  hero: {
    eyebrow: "Platform comparisons",
    h1: "Which platform should you build on?",
    lead:
      "Side-by-side comparisons of the platforms we build on, and the ones we move sites off. Speed, CMS, SEO, cost and who runs the site after launch.",
  },
  list: {
    heading: "Every comparison",
    allLabel: "All",
    readLabel: "Read the comparison",
  },
  fit: {
    heading: "Which platform fits which team",
    intro:
      "Three we build on, four we move sites off. Every comparison says plainly when the other platform is the better choice.",
    columns: {
      platform: "Platform",
      bestIf: "Best if you are",
      builtWith: "Built with us",
      compare: "Compare",
    },
    moveOff: "We move sites off it",
    rows: [
      {
        name: "Wix Studio",
        bestIf:
          "A team that wants to edit the site visually, with hosting, security and updates handled by the platform.",
        // The strongest Wix Studio case studies, as on the comparisons'
        // proof (Bel'Istria stays out until its AI claim is confirmed).
        built: {
          platform: "wix-studio",
          slugs: ["scottish-luxury-experience", "hunting-brook-gardens", "knode-ai"],
        },
        link: { label: "Our Wix Studio service", href: "/services/wix-studio-website-design" },
      },
      {
        name: "Next.js and Sanity",
        rival: "nextjs",
        bestIf:
          "Building something a platform can't hold: custom interactions, product-like logic or content used in more than one place.",
        built: {
          platform: "nextjs",
          // Client sites, case study first; the agency partners tagged
          // Next.js (Techtonnik, Capacity, Wellington Web Co) show
          // partnership volume, not a site.
          slugs: ["genroks-ai", "highland-fling", "pressure-test-scotland"],
        },
      },
      {
        name: "Shopify",
        rival: "shopify",
        bestIf:
          "A brand where selling products at volume is the business: the catalogue, apps and checkout come first.",
        built: {
          platform: "shopify",
          slugs: ["lepa-couture", "destilerija-gorska", "notyou-brand"],
        },
        // Until Wix Studio vs Shopify exists (owner, 19 Nov 2026).
        link: { label: "E-commerce websites", href: "/industries/ecommerce" },
      },
      {
        name: "WordPress",
        rival: "wordpress",
        bestIf:
          "Running a large editorial operation, or relying on a plugin you can't replace.",
        guide: { label: "WordPress guide", href: "/services/wordpress-to-wix-studio" },
      },
      {
        name: "Webflow",
        rival: "webflow",
        bestIf:
          "A trained team running a large structured CMS that wants class-level design control.",
        guide: { label: "Webflow guide", href: "/services/webflow-to-wix-studio" },
      },
      {
        name: "Framer",
        rival: "framer",
        bestIf: "A design-led team shipping fast landing pages on a site that stays small.",
        guide: { label: "Framer guide", href: "/services/framer-to-wix-studio" },
        link: { label: "Framer to Wix Studio guide", href: "/services/framer-to-wix-studio" },
      },
      {
        name: "Squarespace",
        rival: "squarespace",
        bestIf: "After a polished small site that won't outgrow its templates.",
        guide: { label: "Squarespace guide", href: "/services/squarespace-to-wix-studio" },
        link: {
          label: "Squarespace to Wix Studio guide",
          href: "/services/squarespace-to-wix-studio",
        },
      },
    ] as {
      name: string;
      rival?: RivalKey;
      bestIf: string;
      built?: { platform: Platform; slugs: string[] };
      guide?: { label: string; href: string };
      link?: { label: string; href: string };
    }[],
    note: "Vendor prices on the comparison pages come from each vendor's own pricing page, with the date we checked them. Ours come from our published packages.",
  },
  guides: {
    heading: "Guides",
    intro: "Longer reads on the platform questions we get asked most.",
    slugs: [
      "wix-vs-wix-studio",
      "wix-harmony-vs-wix-studio",
      "wix-studio-premium-brand",
      "website-redesign-google-rankings",
    ],
  },
  faq: {
    heading: ["Questions about", "choosing a platform"],
    subhead: "Straight answers, including when the answer isn't one we build on.",
    items: [
      {
        q: "Which website platform is best for a small business?",
        a: "For most small businesses whose own team will edit the site, Wix Studio, because editing is visual and hosting, security and updates come with the plan. Shopify is the better fit when selling products is the business, and Squarespace when you want a polished small site that won't grow much. The comparison pages go row by row.",
      },
      {
        q: "Is Wix Studio or custom code better?",
        a: `Wix Studio is better when your team wants to edit everything visually and never think about hosting. Custom code, Next.js with Sanity, is better when the site needs custom interactions or a content model a platform can't hold. We build both at the same published prices, ${landing.price.toLowerCase()} for a landing page to ${studio.price} for The Studio, so the choice is about fit, not budget.`,
      },
      {
        q: "Do you build on WordPress or Webflow?",
        a: "No. We build on Wix Studio, Next.js with Sanity, and Shopify. We move sites off WordPress, Webflow, Framer and Squarespace, and each migration guide covers what carries over, what has to be rebuilt and how rankings are protected.",
      },
      {
        q: "How much does a website cost on each platform?",
        a: `Two costs: the platform plan and the build. Each comparison quotes the plan from the vendor's own pricing page, with the date we checked it. Our builds use the same published packages on every platform we build on: ${landing.price.toLowerCase()} for a landing page, ${minimum.price.toLowerCase()} for ${minimum.name}, ${studio.price} for ${studio.name}.`,
      },
    ],
  },
  finalCta: {
    heading: ["Not sure which", "platform fits?"],
    paragraph:
      "A free 20-minute call. Tell us who will run the site and what it has to do, and we'll say which we'd build on, and why.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },
};
