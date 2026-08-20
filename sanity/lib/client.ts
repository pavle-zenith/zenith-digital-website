import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * The read client.
 *
 * `useCdn: false` ON PURPOSE, and it is not a performance mistake. Next is
 * already the cache here: pages are static, the fetch carries a one-hour
 * revalidate, and the publish webhook invalidates by tag. Putting Sanity's
 * CDN in front of that adds a SECOND cache nobody can invalidate, keyed per
 * query, so a webhook could revalidate the tag, Next could dutifully refetch,
 * and the CDN could hand back the pre-publish document anyway. That failure is
 * silent and it defeats the whole point of the webhook. Observed in testing:
 * a published post stayed invisible while a differently-worded query against
 * the same dataset returned it.
 *
 * The live API is hit once per build or per revalidation, not per visitor, so
 * the cost of skipping the CDN is close to nothing.
 *
 * No token. The `production` dataset has a public ACL, so a token would buy
 * nothing except the ability to read drafts, which is exactly what must never
 * leak (see `notDraft` in ./queries).
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
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
