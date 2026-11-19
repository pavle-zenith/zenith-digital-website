import type { Platform } from "@/content/case-studies";

/** Every comparison planned (resources brief, Part C). */
export type ComparisonSlug =
  | "wix-studio-vs-wordpress"
  | "wix-studio-vs-webflow"
  | "wix-studio-vs-shopify"
  | "wix-studio-vs-nextjs"
  | "wix-studio-vs-framer"
  | "wix-studio-vs-squarespace";

/** The platform Wix Studio is compared with on a page. */
export type RivalKey =
  | "wordpress"
  | "webflow"
  | "shopify"
  | "nextjs"
  | "framer"
  | "squarespace";

/**
 * The 12 table criteria, in the one order every comparison uses (labels in
 * ./template). A page leaves out a row that genuinely doesn't apply rather
 * than padding it.
 */
export type CriterionKey =
  | "bestFor"
  | "speed"
  | "design"
  | "cms"
  | "seo"
  | "ai"
  | "multilingual"
  | "ecommerce"
  | "integrations"
  | "editors"
  | "maintenance"
  | "cost";

/** A vendor page used as a source, with the date it was read. */
export type Source = {
  label: string;
  href: string;
  /** What the page was used for. */
  note: string;
  /** ISO date the page was checked. */
  checked: string;
};

/** One "so, which should you choose?" box. */
export type Choice = {
  /** Two words: "Fastest to launch", "Best for scale". */
  label: string;
  body: string;
};

export type ComparisonContent = {
  slug: ComparisonSlug;
  /** The other platform. */
  rival: {
    key: RivalKey;
    name: string;
    /** Whether Zenith Digital builds on it (owner facts, 19 Nov 2026). */
    weBuildOnIt: boolean;
    /** Its platform tag, when we build on it (proof cards). */
    platform?: Platform;
    /** The migration guide off it, when there is one. */
    guide?: { label: string; href: string };
  };
  /** ISO date of the last content change (Article dateModified). */
  updated: string;
  /** ISO date the vendor facts and prices were last checked. */
  checked: string;
  seo: { title: string; description: string };
  hero: {
    h1: string;
    /** The one or two sentences AI answers quote ("Wix Studio if..., X if..."). */
    shortAnswer: string;
  };
  /** The short label in menus and filter chips ("vs WordPress"). */
  menuLabel: string;
  table: {
    heading: string;
    intro: string;
    rows: Partial<Record<CriterionKey, { wix: string; rival: string }>>;
  };
  questions: {
    heading: string;
    intro: string;
    items: {
      q: string;
      a: string;
      /** Which way the answer usually points. */
      leans: "wix" | "rival" | "either";
    }[];
  };
  choose: {
    heading: string;
    wix: Choice;
    rival: Choice;
    custom: Choice;
  };
  cost: {
    heading: string;
    /** The typical setup the figures describe, stated above the table. */
    setup: string;
    rows: { label: string; wix: string; rival: string }[];
    note: string;
  };
  proof: {
    heading: string;
    /**
     * Up to three Wix Studio project slugs to show, in order. Each must carry
     * the wix-studio platform tag (the page fails the build otherwise).
     * Omitted: the first three tagged projects, case studies first.
     */
    picks?: string[];
    /** For a platform we don't build on: we move sites off it. */
    rivalLine: string;
  };
  faq: {
    heading: string[];
    subhead: string;
    items: { q: string; a: string }[];
  };
  related: {
    heading: string;
    items: {
      kind: string;
      label: string;
      href: string;
      desc: string;
      icon: string;
    }[];
  };
  sources: Source[];
};
