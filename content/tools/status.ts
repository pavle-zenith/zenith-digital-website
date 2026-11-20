/**
 * PUBLISHING SWITCH for /tools (cost calculator brief, 20 Nov 2026), same
 * model as content/comparisons/status.ts.
 *
 * While off, the page has no
 * route, and nothing links to it: not the Resources menu, the footer,
 * /pricing, the homepage pricing section, /llm-info, /llms.txt or the
 * sitemap. Run with PREVIEW_UNPUBLISHED=1 to review it: routed and linked
 * from the menu, footer and pricing links, but noindexed and still left out
 * of the sitemap, /llms.txt and /llm-info.
 */
// Switched on 20 Nov 2026 (owner: "make it visible", reviewing locally first).
export const toolStatus: Record<"websiteCostCalculator", boolean> = {
  websiteCostCalculator: true,
};

const PREVIEW = process.env.PREVIEW_UNPUBLISHED === "1";

export const COST_CALCULATOR_PATH = "/tools/website-cost-calculator";

/** Live: indexable, in the sitemap, /llms.txt and /llm-info. */
export const costCalculatorLive = toolStatus.websiteCostCalculator;
/** Has a route and on-site links: live, or in a preview build. */
export const costCalculatorRoutable = costCalculatorLive || PREVIEW;
