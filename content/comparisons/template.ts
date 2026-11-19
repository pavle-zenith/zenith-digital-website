import type { CriterionKey, RivalKey } from "./types";
import { perMonthYearly, wixStudio } from "./vendors";

const { basic, plus } = wixStudio.plans;

/**
 * Copy shared by every /compare page and the hub. Per-page copy lives in each
 * comparison's own file; this is the frame around it.
 */
export const compareTemplate = {
  breadcrumbHub: "Compare",
  eyebrow: "Platform comparison",
  shortAnswerLabel: "Short answer",
  updatedLabel: "Updated",
  ctas: {
    see: { label: "See the comparison", href: "#comparison", variant: "secondary" as const },
    call: { label: "Book a call", href: "/book-a-call" },
  },

  /** The 12 criteria, in the one order every page renders them. */
  criteria: [
    { key: "bestFor", label: "Best for" },
    { key: "speed", label: "Speed to launch" },
    { key: "design", label: "Design freedom" },
    { key: "cms", label: "CMS" },
    { key: "seo", label: "SEO control" },
    { key: "ai", label: "AI search readiness" },
    { key: "multilingual", label: "Multilingual" },
    { key: "ecommerce", label: "E-commerce" },
    { key: "integrations", label: "Integrations and code" },
    { key: "editors", label: "Who edits it after launch" },
    { key: "maintenance", label: "Maintenance and security" },
    { key: "cost", label: "Cost over time" },
  ] as { key: CriterionKey; label: string }[],
  criterionColumn: "Criterion",
  lastCheckedLabel: "Last checked",

  wixName: "Wix Studio",
  leans: {
    wix: "Points to Wix Studio",
    rival: (rival: string) => `Points to ${rival}`,
    either: "Could go either way",
  },
  choose: {
    wix: "Wix Studio is usually better if...",
    rival: (rival: string) => `${rival} is usually better if...`,
    custom: "Custom code (Next.js) is usually better if...",
  },
  costItemColumn: "Year one",
  costMethod:
    "Platform prices are from each vendor's own pricing page; the build is our published package.",
  /**
   * Under every cost table (owner, 19 Nov 2026): the tables price the
   * cheapest Wix Studio plan that fits the setup, and this says where Plus
   * comes in. Figures from the plans page's comparison table.
   */
  costStepUp: `${plus.name}, ${perMonthYearly(plus.perMonth)}, is the step up for more forms (${plus.forms} against ${basic.forms}), storage (${plus.storage} against ${basic.storage}) and editors (${plus.collaborators} against ${basic.collaborators}).`,
  costCurrencyNote:
    "Each figure is in the currency its seller charges in. We don't convert them.",

  proof: {
    legend: "Built by a Wix Legend Partner, the top tier of the Wix Partner programme.",
    legendHref: "https://www.wix.com/studio/community/partners/zenith-digital",
    legendLink: "See our partner profile",
    guideLink: (rival: string) => `Read the ${rival} to Wix Studio guide`,
  },

  sources: {
    heading: "Sources",
    intro:
      "Every platform fact and price on this page comes from the vendor's own documentation or pricing page, read on the date shown.",
    checked: "Checked",
  },

  finalCta: {
    heading: (rival: string) => ["Still deciding between", `Wix Studio and ${rival}?`],
    paragraph:
      "A free 20-minute call. Tell us who runs the site and what it has to do, and we'll tell you which we'd build on, even when it's not one we build on.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },
};

/** Filter-chip labels on the hub, one per rival platform. */
export const RIVAL_NAMES: Record<RivalKey, string> = {
  wordpress: "WordPress",
  webflow: "Webflow",
  shopify: "Shopify",
  nextjs: "Next.js",
  framer: "Framer",
  squarespace: "Squarespace",
};
