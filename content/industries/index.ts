import type { IndustrySlug } from "@/content/case-studies";
import { travel } from "./travel";
import { saas } from "./saas";
import { ecommerce } from "./ecommerce";
import { coaches } from "./coaches";
import { courses } from "./courses";
import { property } from "./property";
import { marine } from "./marine";
import { trades } from "./trades";
import { professionalServices } from "./professional-services";
import { creative } from "./creative";
import { localBusiness } from "./local-business";
import { servicesMenu } from "@/content/home";
import { industriesHub, type HubRow } from "./hub";
import type { IndustryPageContent } from "./types";

export type * from "./types";

/**
 * The /industries/[slug] set, in hub order: travel first, then by depth of
 * work (owner brief, 17 Nov 2026). Agencies has no page of its own; its hub
 * row links to /partnerships.
 *
 * `publish: false` pages are authored and reviewable in the repo but excluded
 * from routing, the hub, every internal link and the sitemap, so nothing
 * unread by the owner can be indexed.
 *
 * PUBLISHING CHECKLIST. Flipping `publish: true` on the hub (./hub) turns on,
 * by itself: its route, the Services menu column and drawer sub-group, the
 * footer link, the homepage slider's "See all industries", the /services and
 * /case-studies links, and the sitemap entry. Flipping a page repoints every
 * link to that industry and adds it to the sitemap. The one manual step:
 * public/llms.txt is a static file, so add /industries and each published
 * page to it in the same commit.
 *
 * REVIEWING AN UNPUBLISHED PAGE. Run the site with PREVIEW_UNPUBLISHED=1
 * (`PREVIEW_UNPUBLISHED=1 npm run dev`) and the unpublished pages get routes,
 * marked noindex. They still never appear in the sitemap, the hub or any
 * link. Production never sets the variable.
 */
export const allIndustryPages: IndustryPageContent[] = [travel, ecommerce, saas, coaches, courses, property, marine, trades, professionalServices, creative, localBusiness];

const PREVIEW = process.env.PREVIEW_UNPUBLISHED === "1";

/** Live pages: the only ones linked, listed on the hub, or in the sitemap. */
export const industryPages = allIndustryPages.filter((p) => p.publish);

/** Pages that get a route: the live set, plus unpublished ones in preview. */
export const routableIndustryPages = PREVIEW ? allIndustryPages : industryPages;

export function getIndustryPage(
  slug: string,
): IndustryPageContent | undefined {
  return routableIndustryPages.find((p) => p.slug === slug);
}

/** The live page for an industry key, for links from elsewhere on the site. */
export function industryPageFor(
  key: IndustrySlug,
): IndustryPageContent | undefined {
  return industryPages.find((p) => p.industry === key);
}

/**
 * Where each industry's /case-studies filter view links to: its own page once
 * published, and Agencies to /partnerships, which is the agencies' page.
 * Built here, server-side, and passed to the client grid as a prop.
 */
export function industryFilterLinks(): Partial<
  Record<IndustrySlug, { href: string; label: string }>
> {
  const links: Partial<Record<IndustrySlug, { href: string; label: string }>> =
    {
      agencies: { href: "/partnerships", label: "See white-label partnerships" },
    };
  for (const p of industryPages) {
    links[p.industry] = {
      href: `/industries/${p.slug}`,
      label: p.filterLinkLabel,
    };
  }
  return links;
}

/* ------------------------------------------------------------------ *
 * The hub (/industries)
 * ------------------------------------------------------------------ */

/** The hub is live (linked, in the sitemap, indexable). */
export const hubLive = industriesHub.publish;

/** The hub gets a route: when live, or in a preview build. */
export const hubRoutable = industriesHub.publish || PREVIEW;

/**
 * Where an industry links, everywhere on the site (hub rows, the Services
 * menu, the homepage slider, case-study pages). Its page once that page has
 * a route; the filtered case-study grid until then, which always exists, so
 * no link is ever dead. Agencies, which has no industry page, goes to
 * /partnerships. A page flipping to `publish: true` repoints every link at
 * once.
 */
export function industryHref(key: IndustrySlug): string {
  const row = industriesHub.rows.find((r) => r.key === key);
  if (row?.href) return row.href;
  const page = routableIndustryPages.find((p) => p.industry === key);
  if (page) return `/industries/${page.slug}`;
  return `/case-studies?industry=${key}`;
}

/** Where a hub row leads (see industryHref). */
export function hubRowHref(row: HubRow): string {
  return row.href ?? industryHref(row.key);
}

/** Every hub row, each resolved to where it links. */
export function hubRows(): (Omit<HubRow, "href"> & { href: string })[] {
  return industriesHub.rows.map((row) => ({ ...row, href: hubRowHref(row) }));
}

/** The hub row for an industry key (name, icon, labels). */
export function hubRowFor(key: IndustrySlug): HubRow | undefined {
  return industriesHub.rows.find((r) => r.key === key);
}

/* ------------------------------------------------------------------ *
 * Navigation (hub-and-nav brief, Part B)
 * ------------------------------------------------------------------ */

export type IndustryMenu = {
  heading: string;
  items: { label: string; icon: string; href: string }[];
  viewAll: { label: string; href: string; icon: string };
  /** The drawer's shorter label for the same link. */
  allShort: { label: string; href: string; icon: string };
};

/**
 * The Services menu's "By industry" column and the mobile drawer's matching
 * sub-group, resolved on the server and passed to the (client) Nav, so the
 * industry pages' copy never ships in the browser bundle.
 *
 * Null until the hub has a route: the menu then stays exactly as it was.
 * Labels and icons come from the hub rows, hrefs from industryHref.
 */
export function industryMenu(): IndustryMenu | null {
  if (!hubRoutable) return null;
  const { heading, keys } = servicesMenu.industries;
  return {
    heading,
    items: keys.flatMap((key) => {
      const row = hubRowFor(key);
      return row
        ? [{ label: row.name, icon: row.icon, href: industryHref(key) }]
        : [];
    }),
    viewAll: servicesMenu.viewAllIndustries,
    allShort: servicesMenu.allIndustriesShort,
  };
}

/**
 * "More {industry} work" for a case study detail page: the row's own label,
 * pointing wherever the industry links (see industryHref).
 */
export function industryWorkLink(
  key: IndustrySlug,
): { label: string; href: string } | null {
  const row = hubRowFor(key);
  return row ? { label: row.workLabel, href: industryHref(key) } : null;
}
