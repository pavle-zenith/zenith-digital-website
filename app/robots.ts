import type { MetadataRoute } from "next";

const SITE = "https://www.thezenithdigital.com";

/**
 * robots.txt. LLM crawlers are explicitly allowed (CLAUDE.md §8): being cited
 * in AI answers is a stated goal, and the /services/seo-aeo-ppc page argues
 * for exactly that, so blocking those agents here would contradict the pitch.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
