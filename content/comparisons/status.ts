/**
 * PUBLISHING SWITCHBOARD for /compare (resources brief, Phase 1, 19 Nov 2026).
 *
 * The one place a comparison or the hub goes live. Kept here, with NO
 * imports, because next.config.ts reads it to decide whether an old URL a
 * comparison replaces is redirected yet, and next.config can't resolve the
 * site's `@/` path aliases. Everything else (routes, the hub, the Resources
 * menu column, the footer link, the sitemap) reads it through
 * content/comparisons/index.ts.
 *
 * Unpublished pages get no route, no link and no sitemap entry. Run with
 * PREVIEW_UNPUBLISHED=1 to review them (routed, noindexed).
 *
 * Before flipping a new page to true, verify every claim in its content
 * file against the vendor's own page and record it at the top of the file.
 * Hub and both comparisons switched on 19 Nov 2026 (compare go-live brief).
 */
export const comparisonStatus: {
  hub: boolean;
  pages: Record<string, boolean>;
} = {
  hub: true,
  pages: {
    "wix-studio-vs-wordpress": true,
    "wix-studio-vs-webflow": true,
  },
};

/**
 * Old URLs a comparison replaces. Each 301s to its comparison only once that
 * comparison is published, so the old URL keeps working until the new page
 * exists.
 *
 * /blog/wix-studio-vs-webflow: the Sanity post moves here (position 22, 332
 * impressions, no clicks). OWNER: once the comparison is live, unpublish the
 * Sanity post so it leaves the blog index and the sitemap.
 */
export const comparisonRedirects: { source: string; slug: string }[] = [
  { source: "/blog/wix-studio-vs-webflow", slug: "wix-studio-vs-webflow" },
];

/** The redirects next.config should serve right now. */
export function liveComparisonRedirects() {
  return comparisonRedirects
    .filter((r) => comparisonStatus.pages[r.slug] === true)
    .map((r) => ({
      source: r.source,
      destination: `/compare/${r.slug}`,
      // An explicit 301 (permanent: true would answer 308; Google treats
      // both as permanent, but the brief asks for a 301).
      statusCode: 301 as const,
    }));
}
