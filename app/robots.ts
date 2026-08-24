import type { MetadataRoute } from "next";

const SITE = "https://www.thezenithdigital.com";

/**
 * robots.txt. LLM crawlers are explicitly allowed (CLAUDE.md §8): being cited
 * in AI answers is a stated goal, and the /services/seo-aeo-ppc page argues
 * for exactly that, so blocking those agents here would contradict the pitch.
 *
 * /studio is the only exception. It is the Sanity editing interface, it has no
 * content of its own to rank, and every route under it renders the same empty
 * shell, so leaving it crawlable only spends budget and risks a login screen
 * showing up in the index. Access is already gated; this just keeps it out of
 * search results. Every group repeats the rule, because a crawler that
 * matches its own named group ignores the wildcard one entirely.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/studio" },
      { userAgent: "GPTBot", allow: "/", disallow: "/studio" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/studio" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/studio" },
      { userAgent: "Google-Extended", allow: "/", disallow: "/studio" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
