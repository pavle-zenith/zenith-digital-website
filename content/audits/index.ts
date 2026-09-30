import type { AuditPage } from "./types";
import { assertAudit } from "./score";
import { lifetimeLearningCenter } from "./lifetime-learning-center";

/**
 * Every private audit page. Adding one is a new content file plus one line
 * here: the route's `generateStaticParams` reads this list, so a page exists
 * by being in it and unknown slugs 404 rather than rendering an empty shell.
 *
 * Deliberately NOT in `app/sitemap.ts`. These are private documents.
 */
export const audits: AuditPage[] = [lifetimeLearningCenter];

// Validated at module load, which `next build` runs, so a malformed content
// file (a failing check with no priority, a key fix pointing at a segment that
// doesn't exist) breaks the build instead of shipping a page with a hole in it.
audits.forEach(assertAudit);

export function getAudit(slug: string): AuditPage | undefined {
  return audits.find((a) => a.slug === slug);
}

export type { AuditPage } from "./types";
