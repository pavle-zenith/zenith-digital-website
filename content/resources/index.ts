import type { ChecklistResource } from "./types";
import { websiteMigrationChecklist } from "./website-migration-checklist";

export type * from "./types";

/**
 * Free resources at /resources/[slug]. Add new ones here; the hub, the
 * sitemap and the page route only read `publishedResources`.
 */
export const allResources: ChecklistResource[] = [websiteMigrationChecklist];

export const publishedResources = allResources.filter((r) => r.publish);

export function getResource(slug: string): ChecklistResource | undefined {
  return publishedResources.find((r) => r.slug === slug);
}

/**
 * The /resources hub itself. Off until the owner signs off; the nav's
 * "All resources" link and the sitemap entry follow this flag.
 */
export const resourcesHubLive = false;
