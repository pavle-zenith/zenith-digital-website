import type { ResourceTopic } from "./types";

/**
 * The five topics, in filter order: the hub's chips and the line under them,
 * and the checkbox labels on a blog post in Sanity. One list, so a renamed
 * topic changes everywhere. No imports beyond the type, so the Studio can
 * load it without pulling in the site's content.
 */
export const resourceTopics: { key: ResourceTopic; label: string; line: string }[] = [
  {
    key: "planning",
    label: "Planning and budget",
    line: "What a website needs and what it really costs, before you talk to anyone.",
  },
  {
    key: "platform",
    label: "Choosing a platform",
    line: "Wix Studio, Shopify, WordPress, Webflow and custom code, compared honestly.",
  },
  {
    key: "moving",
    label: "Moving a site",
    line: "How to change platform or redesign without losing your URLs or your search traffic.",
  },
  {
    key: "found",
    label: "Getting found",
    line: "SEO, AI answers and Google Business Profile, for businesses rather than marketers.",
  },
  {
    key: "running",
    label: "Running your site",
    line: "What happens after launch: editing, upkeep and the bills that keep coming.",
  },
];
