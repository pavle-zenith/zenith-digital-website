import type { AuditPage } from "./types";
import { lifetimeLearningCenter } from "./lifetime-learning-center";

/**
 * Every private audit page. Adding one is a new content file plus one line
 * here: the route's `generateStaticParams` reads this list, so a page exists
 * by being in it and unknown slugs 404 rather than rendering an empty shell.
 *
 * Deliberately NOT in `app/sitemap.ts`. These are private documents.
 */
export const audits: AuditPage[] = [lifetimeLearningCenter];

export function getAudit(slug: string): AuditPage | undefined {
  return audits.find((a) => a.slug === slug);
}

export type { AuditPage } from "./types";
