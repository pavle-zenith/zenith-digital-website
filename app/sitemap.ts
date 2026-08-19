import type { MetadataRoute } from "next";

import { caseStudyDetails } from "@/content/case-studies";
import { migrationGuides } from "@/content/migration-guides";
import { servicePages } from "@/content/service-pages";
import { sanityFetch } from "@/sanity/lib/client";
import { postSlugsQuery } from "@/sanity/lib/queries";
import type { PostSitemapEntry } from "@/sanity/lib/types";

const SITE = "https://www.thezenithdigital.com";

/**
 * sitemap.xml, generated from the same content the pages render from, so a new
 * case study or service page appears here by existing rather than by someone
 * remembering to add it. Unpublished service pages and migration guides are
 * already filtered out of `servicePages` and `migrationGuides`, so they can't
 * leak in.
 *
 * Blog posts come from Sanity on the same principle: a new post appears here
 * by existing rather than by someone remembering to add it. The query excludes
 * drafts, so an unpublished post cannot be listed. /studio is deliberately
 * absent: it is an editing tool and is noindexed on the route itself.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityFetch<PostSitemapEntry[]>(postSlugsQuery);

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "yearly" },
    { path: "/case-studies", priority: 0.9, changeFrequency: "weekly" },
    { path: "/partnerships", priority: 0.8, changeFrequency: "monthly" },
    { path: "/free-website-audit", priority: 0.8, changeFrequency: "monthly" },
    { path: "/book-a-call", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/testimonials", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE}${r.path}`,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...servicePages.map((p) => ({
      url: `${SITE}/services/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // Migration guide spokes. Same route, lower priority than the core
    // services: they're decision-stage entry points rather than the pages the
    // whole site points at.
    ...migrationGuides.map((g) => ({
      url: `${SITE}/services/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudyDetails.map((c) => ({
      url: `${SITE}/case-studies/${c.slug}`,
      lastModified: new Date(c.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.lastVerified ?? p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
