import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * The read client. `useCdn` is on because every query here is public,
 * cacheable content and the CDN is what keeps a cold page fast; freshness is
 * handled by tag revalidation on publish rather than by bypassing the CDN.
 *
 * No token. The `production` dataset has a public ACL, so a token would buy
 * nothing except the ability to read drafts, which is exactly what must never
 * leak (see `notDraft` in ./queries).
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/** Cache tag for everything post-shaped. The publish webhook revalidates it. */
export const POST_TAG = "post";

/**
 * One fetch entry point, so no query can accidentally ship without caching
 * rules. `revalidate: 3600` is the self-heal: if the publish webhook is
 * missed, the site catches up within the hour rather than serving a stale post
 * until the next deploy.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { tags: [POST_TAG], revalidate: 3600 },
  });
}
