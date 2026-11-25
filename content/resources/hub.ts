import { audit, pricing } from "@/content/home";
import { landingPackage } from "@/content/service-pages/landing-pages";

import { resourceTopics } from "./topics";
import type { ResourceType } from "./types";

/**
 * /resources: the hub's words (resources hub brief, 23 Nov 2026). The cards
 * themselves are never written here: lib/resources-index.ts builds them from
 * the comparisons, the migration guides, the calculator, the published free
 * resources and the blog. Prices in the FAQ are read from content/home.ts and
 * the landing-page service, never typed.
 */

const [minimum] = pricing.tiers;
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export const resourcesHub = {
  path: "/resources",
  seo: {
    title: "Free website resources: guides, tools and checklists | Zenith Digital",
    description:
      "Free guides, platform comparisons, migration checklists and a cost calculator for planning, building and moving a business website. No email needed.",
  },
  breadcrumb: { home: "Home", hub: "Resources" },
  eyebrow: "Resources",
  h1: "Free guides, tools and checklists for your website",
  intro:
    "What we've learned building and moving 100+ websites, written down so you can use it without hiring anyone. No email needed for any of it.",

  /**
   * Three large cards under the hero, by slug (the last segment of the URL).
   * The owner can swap them; one that isn't live is skipped.
   */
  featured: ["website-cost-calculator", "wix-studio-vs-wordpress", "website-migration-checklist"],

  /** Topic first: visitors arrive with a problem, not a content type. */
  topics: resourceTopics,

  /** The card pill and the type filter's options, in this order. */
  types: [
    { key: "comparison", label: "Comparison", icon: "split" },
    { key: "migration-guide", label: "Migration guide", icon: "transfer" },
    { key: "tool", label: "Tool", icon: "calculator" },
    { key: "checklist", label: "Checklist", icon: "clipboard" },
    { key: "template", label: "Template", icon: "layout-grid" },
    { key: "guide", label: "Guide", icon: "compass" },
    { key: "article", label: "Article", icon: "pen" },
  ] satisfies { key: ResourceType; label: string; icon: string }[],

  filters: {
    topicsLabel: "Topic",
    allTopics: "All",
    typeLabel: "Type",
    allTypes: "All types",
    allLine: "Everything we've written down, newest first.",
    count: { one: "resource", many: "resources" },
    empty: "Nothing here yet.",
    reset: "See all resources",
  },
  card: { updated: "Updated", open: "Open" },

  /**
   * The words on the code-drawn covers (resources covers brief, 24 Nov 2026):
   * the short line top left, the labels inside the panels, and the "vs"
   * between a comparison's two logos (platform pairs carry no line). The
   * figures on the calculator's cover come from its own default estimate.
   */
  covers: {
    lines: {
      tool: "Free tool",
      checklist: "Free download",
      template: "Free download",
      guide: "Guide",
    },
    vs: "vs",
    estimate: {
      heading: "Year-one estimate",
      build: "Build",
      platform: "Platform plan",
      domain: "Domain and apps",
      domainValue: "Not included",
      total: "Year one",
    },
  },

  faq: {
    heading: ["Questions about", "these resources"],
    subhead: "Straight answers. Each one stands on its own.",
    items: [
      {
        q: "Are Zenith Digital's website resources free?",
        a: "Yes. Every guide, comparison, checklist and template on this page is free to read and download, with no email or sign-up. They come from our own projects, so they're the same lists and templates we use with clients.",
      },
      {
        q: "Who are these website resources for?",
        a: "Business owners and small marketing teams planning a new website, choosing a platform or moving an existing site. Agencies and freelancers use the checklists too. Nothing assumes you can code.",
      },
      {
        q: "Which website platform should I choose for a small business?",
        a: "It depends on who edits the site and whether you sell online. Our comparisons set Wix Studio against WordPress, Webflow, Shopify, Framer, Squarespace and custom code on price, SEO, editing and upkeep, including when the other platform is the better choice.",
      },
      {
        q: "How do I move my website without losing Google rankings?",
        a: "List every URL, carry titles and content across, redirect every old URL to its closest new page with a permanent redirect, and watch Search Console for at least 30 days. Our free website migration checklist walks through each step, with a redirect map template.",
      },
      {
        q: "How much does a business website cost?",
        // "from €1,250" and "from €750": read from the published prices.
        a: `Our cost calculator estimates year one, including the build, the platform plan, the domain and apps, and compares it with typical market prices. Our websites start ${lower(minimum.price)} and landing pages ${lower(landingPackage.price)}, at the same prices on Wix Studio, Shopify and custom code.`,
      },
    ],
  },

  /**
   * Reverse links: service pages that show published resources on a topic
   * as related cards (every migration guide shows the "moving" ones too).
   */
  serviceTopics: { "website-migration": "moving" } as Record<string, "moving" | "planning" | "platform" | "found" | "running">,

  /** The closing band: the free audit, in the homepage's own words. */
  closing: {
    heading: [audit.heading],
    paragraph: audit.intro,
    cta: audit.cta,
    ctaSecondary: { label: "Book a call", href: "/book-a-call" },
    image: "/textures/studio-texture.jpg",
  },
};

export type ResourcesHubCopy = typeof resourcesHub;
