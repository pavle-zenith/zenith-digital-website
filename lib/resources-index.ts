import { allComparisons, publishedComparisons } from "@/content/comparisons";
import { migrationGuides } from "@/content/migration-guides";
import {
  allResources,
  publishedResources,
  resourcesHubLive,
  type ChecklistResource,
  type ResourceEntry,
  type ResourceTopic,
} from "@/content/resources";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { blogCover } from "@/content/blog-covers";
import { guidePlatform, platformTile } from "@/content/comparisons/logos";
import { resourcesHub } from "@/content/resources/hub";
import type { ResourceArt } from "@/content/resources/types";
import { costCalculatorPage } from "@/content/tools/website-cost";
import { priceBook } from "@/content/tools/price-book";
import { defaultInput, estimate, formatPrice, formatShown, yearOne } from "@/lib/website-cost";
import { COST_CALCULATOR_PATH, costCalculatorLive, costCalculatorRoutable } from "@/content/tools/status";
import { POST_TAG, sanityClient } from "@/sanity/lib/client";
import { resourcePostsQuery } from "@/sanity/lib/queries";

/**
 * The /resources index (resources hub brief, 23 Nov 2026). Index, don't
 * move: every card points at a page where it already lives, and is built from
 * that page's own content, so a resource appears here by existing, never by
 * someone adding a card.
 *
 * Service pages, industry pages and case studies are deliberately absent:
 * they're commercial pages, reached through each resource's related cards.
 *
 * PREVIEW. Like the comparisons and the calculator, PREVIEW_UNPUBLISHED=1
 * routes and lists what isn't published yet (noindexed), so the owner can
 * review the hub and a draft resource before flipping their flags. Production
 * never sets it, and then only published, live pages appear.
 */

const PREVIEW = process.env.PREVIEW_UNPUBLISHED === "1";

/** The hub has a route: live, or in a preview build. */
export const resourcesHubRoutable = resourcesHubLive || PREVIEW;

/** Free resources with a route: the published ones, plus drafts in preview. */
export const routableResources: ChecklistResource[] = PREVIEW ? allResources : publishedResources;

export function getRoutableResource(slug: string): ChecklistResource | undefined {
  return routableResources.find((r) => r.slug === slug);
}

/** A resource's own URL. */
export const resourceHref = (slug: string) => `/resources/${slug}`;

type ResourcePost = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  resourceTopics?: ResourceTopic[] | null;
};

/**
 * Live posts as cards. Never throws: the hub renders in the site's build, so
 * an unreachable Sanity must not fail it (lib/resources-menu.ts does the
 * same). The posts simply drop out until the next revalidation, and POST_TAG
 * lets the publish webhook refresh the hub the moment a post goes live.
 */
async function resourcePosts(): Promise<ResourcePost[]> {
  try {
    return await sanityClient.fetch<ResourcePost[]>(resourcePostsQuery, {}, { next: { tags: [POST_TAG] } });
  } catch (error) {
    console.error(
      "[sanity] posts for the resources hub failed, continuing without them:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}

const TOPICS: ResourceTopic[] = ["planning", "platform", "moving", "found", "running"];

const covers = resourcesHub.covers;

/** An owner-designed calculator cover, if the file is there. */
const CALCULATOR_COVER = "/resources/covers/website-cost-calculator.webp";

/**
 * The calculator's cover: the owner's file when it exists, otherwise a mini
 * estimate in the calculator's style, its figures read from the calculator's
 * own default estimate (lib/website-cost.ts), never typed. Domain and apps
 * aren't in the estimate (they're listed as not included), so that row says so.
 */
function calculatorCover(): Pick<ResourceEntry, "image" | "art"> {
  if (existsSync(join(process.cwd(), "public", CALCULATOR_COVER))) {
    return { image: { src: CALCULATOR_COVER, alt: "" } };
  }
  const e = estimate(defaultInput(priceBook), priceBook);
  const t = covers.estimate;
  return {
    art: {
      kind: "estimate",
      line: covers.lines.tool,
      heading: t.heading,
      rows: [
        { label: t.build, value: formatPrice(e.build.price, "EUR") },
        { label: t.platform, value: formatPrice(e.platform.price, "EUR") },
        { label: t.domain, value: t.domainValue },
      ],
      total: { label: t.total, value: formatShown(yearOne(e, "EUR")) },
    },
  };
}

/**
 * Every card on the hub, sorted: dated items newest first, then undated ones
 * in source order. Never throws.
 */
export async function getResourceEntries(): Promise<ResourceEntry[]> {
  const comparisons = PREVIEW ? allComparisons : publishedComparisons;
  const calculatorShown = PREVIEW ? costCalculatorRoutable : costCalculatorLive;

  const entries: ResourceEntry[] = [
    ...routableResources.map(
      (r): ResourceEntry => ({
        type: r.type,
        topics: r.topics,
        title: r.card.title,
        description: r.card.description,
        href: resourceHref(r.slug),
        updated: r.updated,
        // The owner's designed cover wins; otherwise the checklist sheet.
        ...(r.cover
          ? { image: r.cover }
          : {
              art: {
                kind: "sheet",
                line: covers.lines[r.type],
                items: r.phases.slice(0, 4).map((p) => p.title),
                ticked: 2,
                format: r.downloads[0]?.format,
              },
            }),
      }),
    ),
    ...comparisons.map(
      (c): ResourceEntry => ({
        type: "comparison",
        topics: ["platform"],
        title: c.hero.h1,
        description: c.seo.description,
        href: `/compare/${c.slug}`,
        updated: c.updated,
        art: {
          kind: "pair",
          left: platformTile("wix-studio"),
          right: platformTile(c.rival.key),
          joiner: { vs: covers.vs },
        },
      }),
    ),
    ...(calculatorShown
      ? [
          {
            type: "tool",
            topics: ["planning", "running"],
            title: costCalculatorPage.hero.h1,
            description: costCalculatorPage.seo.description,
            href: COST_CALCULATOR_PATH,
            ...calculatorCover(),
          } satisfies ResourceEntry,
        ]
      : []),
    ...migrationGuides.map(
      (g): ResourceEntry => ({
        type: "migration-guide",
        topics: ["moving"],
        title: g.hero.h1,
        description: g.seo.description,
        href: `/services/${g.slug}`,
        art: {
          kind: "pair",
          left: platformTile(guidePlatform[g.slug] ?? g.platform),
          right: platformTile("wix-studio"),
          joiner: "arrow",
        },
      }),
    ),
    ...(await resourcePosts()).map(
      (p): ResourceEntry => ({
        type: "article",
        // Only the five known topics, so a stray value in Sanity can't make
        // an orphan filter. Untagged posts still show under All and Articles.
        topics: (p.resourceTopics ?? []).filter((t) => TOPICS.includes(t)),
        title: p.title,
        description: p.excerpt,
        href: `/blog/${p.slug}`,
        updated: p.publishedAt?.slice(0, 10),
        // The post's own cover; without one, the house frame with its title.
        ...(blogCover(p.slug)
          ? { image: { src: blogCover(p.slug)!, alt: "" } }
          : { art: { kind: "frame", line: p.title } satisfies ResourceArt }),
      }),
    ),
  ];

  // Dated newest first; undated after, in source order (a stable sort keeps it).
  return entries
    .map((e, i) => ({ e, i }))
    .sort((a, b) => {
      if (a.e.updated && b.e.updated) return b.e.updated.localeCompare(a.e.updated) || a.i - b.i;
      if (a.e.updated) return -1;
      if (b.e.updated) return 1;
      return a.i - b.i;
    })
    .map(({ e }) => e);
}

/**
 * Published free resources on a topic, as related cards for the pages that
 * cover the same ground (the migration pages show the "moving" ones). Only
 * published resources: a reverse link to a draft would be a link to a 404.
 */
export function resourceCardsFor(topic: ResourceTopic) {
  return publishedResources
    .filter((r) => r.topics.includes(topic))
    .map((r) => ({
      kind: r.hero.eyebrow,
      label: r.card.title,
      href: resourceHref(r.slug),
      desc: r.card.description,
      icon: "clipboard",
    }));
}
