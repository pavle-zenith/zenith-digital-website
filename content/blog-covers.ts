/**
 * Blog cover art convention (owner-supplied, 27 Aug 2026).
 *
 * Covers live in the repo, not in Sanity: the Sanity MCP tooling cannot
 * upload image binaries. A scheduled post goes live on its own (the blog
 * route has `dynamicParams = true` and revalidates hourly), but its cover
 * only exists once a deploy carries the files and this registration. So
 * covers ship in a deploy BEFORE the post's publishedAt, never after.
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
  "wix-website-not-showing-on-google",
  // Scheduled weekly, 29 Sep to 3 Nov 2026. Covers ship ahead of the posts.
  "outsource-web-development-or-hire",
  "website-redesign-google-rankings",
  "do-i-need-a-new-website",
  "traffic-but-no-enquiries",
  "wix-studio-premium-brand",
  "luxury-travel-website-design",
  // Scheduled weekly, 24 Nov to 22 Dec 2026. Covers ship ahead of the posts.
  "wix-harmony-vs-wix-studio",
  "ai-built-website-no-enquiries",
  "business-website-cost",
  "ads-clicks-but-no-leads",
  "what-should-go-on-your-homepage",
]);

/** Card thumbnail path for a post, or null when no cover art exists. */
export function blogCover(slug: string): string | null {
  return BLOG_COVERS.has(slug) ? `/blog/${slug}/cover.webp` : null;
}

/** Social share image path for a post, or null when no cover art exists. */
export function blogOgImage(slug: string): string | null {
  return BLOG_COVERS.has(slug) ? `/blog/${slug}/og.jpg` : null;
}
