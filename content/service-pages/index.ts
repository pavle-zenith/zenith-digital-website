import { wixStudioWebsiteDesign } from "./wix-studio-website-design";
import { wixStudioDevelopment } from "./wix-studio-development";
import { websiteMigration } from "./website-migration";
import { seoAeoPpc } from "./seo-aeo-ppc";
import { landingPages } from "./landing-pages";
import { customWebsiteDevelopment } from "./custom-website-development";
import type { ServicePageContent } from "./types";

export type * from "./types";

/**
 * The /services/[slug] set. `publish: false` pages are authored and reviewable
 * in the repo but excluded from routing, the hub, and the sitemap, so nothing
 * half-finished can be indexed.
 *
 * REVIEWING AN UNPUBLISHED PAGE. Run the site with PREVIEW_UNPUBLISHED=1, as
 * for the industry and comparison pages, and the unpublished pages get routes,
 * marked noindex. They still never appear in the sitemap, the hub or any
 * link. Production never sets the variable.
 */
export const allServicePages: ServicePageContent[] = [
  wixStudioWebsiteDesign,
  wixStudioDevelopment,
  websiteMigration,
  seoAeoPpc,
  landingPages,
  customWebsiteDevelopment,
];

export const servicePages = allServicePages.filter((p) => p.publish);

const PREVIEW = process.env.PREVIEW_UNPUBLISHED === "1";

/** Pages that get a route: the live set, plus unpublished ones in preview. */
export const routableServicePages = PREVIEW ? allServicePages : servicePages;

/** Live slugs, for the hub links and the sitemap. */
export const servicePageSlugs = new Set(servicePages.map((p) => p.slug));

export function getServicePage(slug: string): ServicePageContent | undefined {
  return routableServicePages.find((p) => p.slug === slug);
}
