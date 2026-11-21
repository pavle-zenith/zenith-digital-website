import { resourcesMenu } from "@/content/home";

import { platformLogo } from "./logos";
import { comparisonStatus } from "./status";
import type { ComparisonContent, RivalKey } from "./types";
import { wixStudioVsFramer } from "./wix-studio-vs-framer";
import { wixStudioVsNextjs } from "./wix-studio-vs-nextjs";
import { wixStudioVsShopify } from "./wix-studio-vs-shopify";
import { wixStudioVsSquarespace } from "./wix-studio-vs-squarespace";
import { wixStudioVsWebflow } from "./wix-studio-vs-webflow";
import { wixStudioVsWordpress } from "./wix-studio-vs-wordpress";

export type * from "./types";

/**
 * The /compare/[slug] set, in build order (resources brief, Part C):
 * WordPress and Webflow in Phase 1, Shopify and custom code next, Framer and
 * Squarespace last.
 *
 * Same publishing model as content/industries: a page is live only once
 * ./status flips it. Unpublished pages get no route, no link, no hub card,
 * no menu entry and no sitemap entry. PREVIEW_UNPUBLISHED=1 routes them,
 * noindexed, for review. Production never sets the variable.
 */
export const allComparisons: ComparisonContent[] = [
  wixStudioVsWordpress,
  wixStudioVsWebflow,
  wixStudioVsShopify,
  wixStudioVsNextjs,
  wixStudioVsFramer,
  wixStudioVsSquarespace,
];

const PREVIEW = process.env.PREVIEW_UNPUBLISHED === "1";

export function isPublished(c: ComparisonContent): boolean {
  return comparisonStatus.pages[c.slug] === true;
}

/** Live comparisons: the only ones linked, carded or in the sitemap. */
export const publishedComparisons = allComparisons.filter(isPublished);

/** Comparisons that get a route: the live set, plus the rest in preview. */
export const routableComparisons = PREVIEW ? allComparisons : publishedComparisons;

export function getComparison(slug: string): ComparisonContent | undefined {
  return routableComparisons.find((c) => c.slug === slug);
}

/** The hub is live (indexable, linked from the footer and the menu). */
export const compareHubLive = comparisonStatus.hub;
/** The hub has a route: live, or in a preview build. */
export const compareHubRoutable = compareHubLive || PREVIEW;

/** The routable comparison against a platform, if there is one. */
export function comparisonFor(rival: RivalKey): ComparisonContent | undefined {
  return routableComparisons.find((c) => c.rival.key === rival);
}

/* ------------------------------------------------------------------ *
 * Resources menu
 * ------------------------------------------------------------------ */

export type CompareMenu = {
  label: string;
  /** One row per comparison: "vs WordPress", with the rival's mark. */
  items: { label: string; href: string; logo?: string }[];
  viewAll: { label: string; href: string; icon: string };
};

/**
 * The Resources menu's "Compare platforms" column, resolved on the server and
 * passed to the client Nav. Null until the hub has a route, so the menu shows
 * Learn and the featured post only.
 */
export function compareMenu(): CompareMenu | null {
  if (!compareHubRoutable) return null;
  const { label, viewAll } = resourcesMenu.compare;
  return {
    label,
    items: routableComparisons.map((c) => ({
      label: c.menuLabel,
      logo: platformLogo[c.rival.key],
      href: `/compare/${c.slug}`,
    })),
    viewAll,
  };
}
