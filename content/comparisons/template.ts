import type { RivalKey, ScoreEdge, ScoreTag } from "./types";
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

  lastCheckedLabel: "Last checked",
  wixName: "Wix Studio",

  /**
   * The scorecard table. Each row's cells are short; the verified sentences
   * sit under its Details toggle, so they stay on the page for search and AI
   * answers without making the table a wall of text.
   */
  scorecard: {
    criterionColumn: "Criterion",
    edgeColumn: "Edge",
    details: "Details",
    /** One line above the table. Icons: check, plus, wrench (shape, not colour). */
    tags: {
      included: { label: "Built in", icon: "check" },
      // Short enough that the legend stays on one line at 375.
      addon: { label: "Plugin or add-on", icon: "plus" },
      yours: { label: "Your job", icon: "wrench" },
    } satisfies Record<ScoreTag, { label: string; icon: string }>,
    edge: (edge: ScoreEdge, rival: string) =>
      edge === "wix" ? "Wix Studio" : edge === "rival" ? rival : edge === "even" ? "Even" : "Depends",
    /**
     * Under the table, always computed from the rows' `edge`, never typed:
     * "Wix Studio has the edge on 5, WordPress on 1, even on 4, and 2 depend
     * on your team."
     */
    tally: (count: Record<ScoreEdge, number>, rival: string) => {
      const parts: string[] = [];
      const leads = (
        [
          ["Wix Studio", count.wix],
          [rival, count.rival],
        ] as const
      ).filter(([, n]) => n > 0);
      leads.forEach(([name, n], i) =>
        parts.push(i === 0 ? `${name} has the edge on ${n}` : `${name} on ${n}`),
      );
      if (count.even) parts.push(`${leads.length ? "even" : "Even"} on ${count.even}`);
      if (count.depends) {
        parts.push(`${count.depends} ${count.depends === 1 ? "depends" : "depend"} on your team`);
      }
      const last = parts.pop();
      const sentence = parts.length ? `${parts.join(", ")}, and ${last}` : (last ?? "");
      return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.`;
    },
  },

  /** The five questions: two outcomes per question, "Wix Studio if ...". */
  questionsIf: {
    wix: "Wix Studio if",
    rival: (rival: string) => `${rival} if`,
    details: "Details",
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
    prev: "Previous project",
    next: "Next project",
  },

  /** One closed <details> at the foot of the page, with every link inside. */
  sources: {
    summary: (count: number, checked: string) =>
      `Sources: ${count} vendor pages, checked ${checked}`,
    intro:
      "Every platform fact and price on this page comes from the vendor's own documentation or pricing page, read on the date shown.",
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
