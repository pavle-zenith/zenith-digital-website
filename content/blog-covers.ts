/**
 * Blog cover art convention (owner-supplied, 27 Aug 2026).
 *
 * Covers live in the repo, not in Sanity: the Sanity MCP tooling cannot
 * upload image binaries, and a brand new post slug already needs a deploy
 * before its route exists (`dynamicParams = false` in app/blog/[slug]), so
 * the deploy that creates the route carries the art with it.
 *
 * Files, per post slug:
 *   public/blog/{slug}/cover.webp   1920x1200 (16:10), shown on blog cards
 *   public/blog/{slug}/og.jpg       1200x630, the social share (OG) image
 *
 * Export from a 3840x2400 master, same routine as the case study cards.
 * Add the slug here after dropping both files in. A slug missing from this
 * set falls back to the wordmark panel on cards and ships no OG image.
 */
const BLOG_COVERS = new Set([
  "is-wix-studio-good-for-seo",
  "wix-studio-build-time",
  "wix-studio-pricing",
  "wix-studio-vs-webflow",
  "wix-vs-wix-studio",
]);

/** Card thumbnail path for a post, or null when no cover art exists. */
export function blogCover(slug: string): string | null {
  return BLOG_COVERS.has(slug) ? `/blog/${slug}/cover.webp` : null;
}

/** Social share image path for a post, or null when no cover art exists. */
export function blogOgImage(slug: string): string | null {
  return BLOG_COVERS.has(slug) ? `/blog/${slug}/og.jpg` : null;
}
