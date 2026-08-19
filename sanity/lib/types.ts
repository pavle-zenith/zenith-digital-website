import type { PortableTextBlock } from "@portabletext/types";

import type { BlogCategory } from "@/content/blog";

/**
 * The shapes the queries in ./queries actually return. Hand-written rather
 * than generated: there is one document type and these are read in four
 * places, so a codegen step would be more moving parts than the types are
 * worth. If the schema grows past this, generate them.
 */

/** Index card and related rail. */
export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  featured?: boolean;
};

export type PostSource = { label: string; href: string; note: string };
export type PostFaqItem = { q: string; a: string };

/** An image inside `body`, with its asset resolved by the query. */
export type PostImageBlock = {
  _type: "image";
  _key: string;
  alt: string;
  caption?: string;
  url?: string;
  width?: number;
  height?: number;
  lqip?: string;
};

export type PostPointsListBlock = {
  _type: "pointsList";
  _key: string;
  lead?: string;
  points: { label: string; body: string }[];
};

export type PostTableStatus = "carries" | "rebuilt" | "replaced" | "lost";

export type PostComparisonTableBlock = {
  _type: "comparisonTable";
  _key: string;
  caption?: string;
  columns: string[];
  rows: { cells: string[]; status?: PostTableStatus }[];
};

export type PostCalloutCtaBlock = {
  _type: "calloutCta";
  _key: string;
  heading: string;
  paragraph: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PostFaqBlock = {
  _type: "faqBlock";
  _key: string;
  items: PostFaqItem[];
};

export type PostCodeBlock = {
  _type: "codeBlock";
  _key: string;
  language?: string;
  code: string;
};

/** Anything that can appear in `body`. */
export type PostBodyBlock =
  | PortableTextBlock
  | PostImageBlock
  | PostPointsListBlock
  | PostComparisonTableBlock
  | PostCalloutCtaBlock
  | PostFaqBlock
  | PostCodeBlock;

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  lastVerified?: string;
  reviewedBy?: string;
  seo?: { title?: string; description?: string };
  body: PostBodyBlock[];
  sources?: PostSource[];
  faq?: PostFaqItem[];
  related?: PostCard[];
};

/** Row shape for the sitemap. */
export type PostSitemapEntry = {
  slug: string;
  publishedAt: string;
  lastVerified?: string;
};
