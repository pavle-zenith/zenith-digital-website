import type { CtaLink } from "@/lib/types";
import type { Source } from "@/content/comparisons/types";
import type { PlatformTile } from "@/content/comparisons/logos";

/**
 * /resources: the hub indexes content that already lives elsewhere
 * (comparisons, migration guides, tools, blog posts) plus the free
 * checklists and templates defined in this folder. See
 * resources-hub-brief.md for the build.
 */

/** What a resource is. Drives the "type" filter and the card label. */
export type ResourceType =
  | "comparison"
  | "migration-guide"
  | "tool"
  | "checklist"
  | "template"
  | "guide"
  | "article";

/**
 * What the visitor is trying to do. Drives the main filter. A resource can
 * sit under more than one.
 */
export type ResourceTopic =
  | "planning" // budget, briefs, what a site needs
  | "platform" // choosing Wix Studio, Shopify, custom code
  | "moving" // migrations, redirects, keeping rankings
  | "found" // SEO, AEO, AI answers, Google Business Profile
  | "running"; // after launch: editing, upkeep, costs

/** One card on the hub, whatever it comes from. */
export type ResourceEntry = {
  type: ResourceType;
  topics: ResourceTopic[];
  title: string;
  description: string;
  href: string;
  /** ISO date; cards sort newest first inside a filter. */
  updated?: string;
  /** A real cover (a blog cover, an owner's designed cover). Wins over `art`. */
  image?: { src: string; alt: string };
  /** The code-drawn cover when there's no image (lib/resources-index.ts). */
  art?: ResourceArt;
};

/** A platform as it appears on a cover tile (content/comparisons/logos.ts). */
/** A platform tile on a cover: the one shape, defined beside the logos. */
export type CoverTile = PlatformTile;

/**
 * What a code-drawn cover shows, built on the server so the cards (a client
 * island) need no content files: a platform pair, the calculator's default
 * estimate, a checklist sheet, or just the house frame with a line.
 */
export type ResourceArt =
  | { kind: "pair"; left: CoverTile; right: CoverTile; joiner: "arrow" | { vs: string } }
  | {
      kind: "estimate";
      line: string;
      heading: string;
      rows: { label: string; value: string }[];
      total: { label: string; value: string };
    }
  | { kind: "sheet"; line: string; items: string[]; ticked: number; format?: string }
  | { kind: "frame"; line: string };

/** A downloadable copy of a free resource. Ungated. */
export type ResourceDownload = {
  label: string;
  href: string;
  format: "CSV" | "PDF" | "Google Sheet";
  note?: string;
};

export type ChecklistItem = {
  title: string;
  body: string;
  /** Vendor documentation behind the item, when it states a platform fact. */
  source?: { label: string; href: string };
};

/** A free checklist page at /resources/[slug]. */
export type ChecklistResource = {
  slug: string;
  /** Off until the owner signs off. The hub and sitemap only list `true`. */
  publish: boolean;
  type: "checklist";
  topics: ResourceTopic[];
  updated: string;
  seo: { title: string; description: string };
  /** The hub card. */
  card: { title: string; description: string };
  /**
   * A designed cover for the hub card, when the owner ships one. Without it
   * the card gets the code-drawn sheet cover.
   */
  cover?: { src: string; alt: string };
  hero: { eyebrow: string; h1: string; intro: string };
  /** 40 to 80 words, answers the query on its own (ShortAnswer block). */
  inShort: string;
  downloads: ResourceDownload[];
  phases: {
    id: string;
    title: string;
    /** When this phase happens, e.g. "2 to 4 weeks before launch". */
    when: string;
    items: ChecklistItem[];
  }[];
  /** The handoff offer: shown once, after the phases. */
  handoff: { heading: string; paragraph: string; cta: CtaLink };
  faq: { q: string; a: string }[];
  related: {
    heading: string;
    items: { kind: string; label: string; href: string; desc: string; icon: string }[];
  };
  sources: Source[];
  finalCta: { heading: string; paragraph: string; ctas: CtaLink[] };
};
