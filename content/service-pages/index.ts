import { wixStudioWebsiteDesign } from "./wix-studio-website-design";
import { websiteMigration } from "./website-migration";
import { seoAeoPpc } from "./seo-aeo-ppc";
import { landingPages } from "./landing-pages";
import type { ServicePageContent } from "./types";

export type * from "./types";

/**
 * The /services/[slug] set. `publish: false` pages are authored and reviewable
 * in the repo but excluded from routing, the hub, and the sitemap, so nothing
 * half-finished can be indexed.
 */
export const allServicePages: ServicePageContent[] = [
  wixStudioWebsiteDesign,
  websiteMigration,
  seoAeoPpc,
  landingPages,
];

export const servicePages = allServicePages.filter((p) => p.publish);

/** Live slugs, for the hub links and the sitemap. */
export const servicePageSlugs = new Set(servicePages.map((p) => p.slug));

export function getServicePage(slug: string): ServicePageContent | undefined {
  return servicePages.find((p) => p.slug === slug);
}
