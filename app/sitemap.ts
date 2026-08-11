import type { MetadataRoute } from "next";

import { caseStudyDetails } from "@/content/case-studies";
import { servicePages } from "@/content/service-pages";

const SITE = "https://www.thezenithdigital.com";

/**
 * sitemap.xml, generated from the same content the pages render from, so a new
 * case study or service page appears here by existing rather than by someone
 * remembering to add it. Unpublished service pages are already filtered out of
 * `servicePages`, so they can't leak in.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.9, changeFrequency: "weekly" },
    { path: "/partnerships", priority: 0.8, changeFrequency: "monthly" },
    { path: "/free-website-audit", priority: 0.8, changeFrequency: "monthly" },
    { path: "/book-a-call", priority: 0.7, changeFrequency: "monthly" },
    { path: "/testimonials", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
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
    ...caseStudyDetails.map((c) => ({
      url: `${SITE}/case-studies/${c.slug}`,
      lastModified: new Date(c.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
