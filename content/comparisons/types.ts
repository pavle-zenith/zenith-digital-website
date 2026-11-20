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
 * Scorecard (table simplify brief, 20 Nov 2026). Every comparison's table is
 * a list of these rows, in the order the page wants them read; criteria are
 * per page, so a row covers what actually separates the two platforms.
 */

/** The marker before a short cell: built in, a plugin or paid add-on, or your job. */
export type ScoreTag = "included" | "addon" | "yours";

/** Who the row favours: shown as the Edge pill and tinted on the winning cell. */
export type ScoreEdge = "wix" | "rival" | "even" | "depends";

export type ScoreRow = {
  /** "Hosting". */
  criterion: string;
  /**
   * 2 to 6 words, one line at 1440. Never says more than `detail` supports:
   * shorten it further rather than stretch it.
   */
  wix: { short: string; tag?: ScoreTag };
  rival: { short: string; tag?: ScoreTag };
  edge: ScoreEdge;
  /** The full verified sentences, under the row's Details toggle. */
  detail: { wix: string; rival: string };
};

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
    rows: ScoreRow[];
  };
  /** A compact list: each question with its two outcomes side by side. */
  questions: {
    heading: string;
    intro: string;
    items: {
      q: string;
      /** Completes "Wix Studio if ...": 12 words at most. */
      wix: string;
      /** Completes "{Rival} if ...": 12 words at most. */
      rival: string;
      /**
       * The fuller answer, behind a Details toggle. Left out where the two
       * outcomes already say all of it.
       */
      detail?: string;
    }[];
  };
  choose: {
    heading: string;
    wix: Choice;
    rival: Choice;
    custom: Choice;
    /**
     * Overrides the third box's title ("Custom code (Next.js) is usually
     * better if..."), for the page where Next.js is the rival.
     */
    customTitle?: string;
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
    /**
     * For a platform we build on (`rival.weBuildOnIt`): up to three of our
     * projects on it, shown after the Wix Studio picks. Each must carry the
     * rival's platform tag.
     */
    rivalPicks?: string[];
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
