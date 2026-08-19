/**
 * Sanity connection values. Public by design: the `production` dataset has a
 * public ACL, so the project id and dataset name are not secrets and ship in
 * the client bundle for the embedded Studio.
 *
 * Env-first with the real project as the fallback, so a missing env var on a
 * fresh checkout or preview deploy renders the blog instead of failing the
 * build. Override either value in Vercel to point a branch at another dataset.
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nfi9edhy";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/**
 * Pinned, never "latest". A floating API version means Sanity can change query
 * behaviour under a site that hasn't been touched in months.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-19";

/** Where the embedded Studio lives (CLAUDE.md §4). */
export const studioBasePath = "/studio";
