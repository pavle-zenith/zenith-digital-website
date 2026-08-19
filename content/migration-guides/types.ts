import type { CtaLink } from "@/lib/types";

/**
 * /services/[platform]-to-wix-studio — the migration guide spokes hanging off
 * the /services/website-migration hub.
 *
 * WHY THIS IS NOT `ServicePageContent`. Cloning the twelve-block service
 * template per platform would produce pages whose pricing, process, founder,
 * and related sections are byte-identical, which is the near-duplicate pattern
 * both Google and the answer engines demote. This shape is leaner and tilts
 * hard toward platform-specific technical detail: roughly two thirds of every
 * guide is content that could not appear on a sibling.
 *
 * THE ANTI-DOORWAY RULE, restated for this type: if a sentence would read the
 * same on another guide, it gets rewritten or cut. Only `logistics` may repeat,
 * because the price genuinely is one flat number across source platforms, and
 * even its note references platform-specific effort.
 */

/** One titled block of prose. Same shape as the service pages use. */
export type TitledBlock = { title: string; body: string };

/**
 * A bold lead-in and its explanation: the scannable unit inside a long-form
 * section. Two jobs at once. A reader skimming gets the whole section from the
 * labels alone, and each `label: body` pair is a self-contained statement an
 * answer engine can lift without needing the surrounding paragraph.
 */
export type Point = { label: string; body: string };

/**
 * A block in a LONG-FORM section (steps, SEO mechanics, mistakes). These
 * render as a single vertical column at reading measure, not as cards in a
 * grid: heading, a short orienting paragraph, then optional points.
 *
 * Keep `body` to one or two sentences. If a block needs more than that, the
 * detail belongs in `points` where it can be scanned, not in a longer
 * paragraph. Density was the failure mode of the first draft of these pages.
 */
export type LongFormBlock = TitledBlock & {
  /** Stage duration, rendered as a chip beside the heading. Steps only. */
  duration?: string;
  /** The line that introduces the points, e.g. "Here's what that covers:". */
  lead?: string;
  points?: Point[];
};

/**
 * What happens to one thing you own when you move platforms.
 *
 * This four-state vocabulary is the reason these pages exist. Everyone else
 * writes the optimistic version ("everything transfers"); a page that states
 * plainly what breaks outranks it, pre-qualifies the lead before the call, and
 * is the format an answer engine quotes verbatim.
 *
 * - `carries`  — arrives intact, no rebuild. The good news.
 * - `rebuilt`  — the content survives, the thing holding it is built new.
 * - `replaced` — no equivalent, but a different Wix Studio feature does the job.
 * - `lost`     — nothing carries. The note has to say what you do instead.
 */
export type TransferStatus = "carries" | "rebuilt" | "replaced" | "lost";

export type TransferRow = {
  /** The asset in the reader's words: "Blog posts and categories". */
  item: string;
  /**
   * Names an entry in components/ui/FeatureIcon. One per row, chosen for the
   * ASSET rather than its fate, so the icon column stays a way of finding your
   * own row at a glance and never duplicates what the status chip says.
   */
  icon?: string;
  status: TransferStatus;
  /** One specific sentence. Never a synonym swap of a sibling guide's row. */
  note: string;
};

export type MigrationGuideContent = {
  slug: string;
  /**
   * Gate for guides waiting on owner sign-off. Unpublished guides are excluded
   * from routing, the hub links, and the sitemap, so an unverified transfers
   * table cannot reach the index.
   */
  publish: boolean;
  /** "Wix Classic" — breadcrumb leaf, Service schema name, hub card label. */
  platform: string;
  seo: { title: string; description: string };

  hero: {
    /** Service schema name: "Wix Classic to Wix Studio migration". */
    name: string;
    h1: string;
    subhead: string;
    /** Platform-specific proof chips. Never the sitewide agency stats. */
    chips: string[];
    ctas: CtaLink[];
  };

  /**
   * Who this is for, and who should stay put. Naming the reader who shouldn't
   * move buys more trust than it costs in leads, and it's the section that
   * stops the page reading like a sales pitch.
   */
  fit: {
    heading: string;
    intro: string;
    goodFit: string[];
    notAFit: string[];
    /** The honest one-liner under both columns. */
    footnote?: string;
  };

  /** THE CORE ASSET. See TransferStatus. */
  transfers: {
    heading: string;
    intro: string;
    rows: TransferRow[];
    footnote?: string;
  };

  /** The bulk of the word count: 6 to 8 stages, each with a real duration. */
  steps: {
    heading: string;
    intro: string;
    items: LongFormBlock[];
  };

  /** Platform-specific URL and indexing mechanics. The part that gets skipped. */
  seoMechanics: { heading: string; intro: string; items: LongFormBlock[] };

  /** Cheap to write, high citation value, and it demonstrates having done this. */
  mistakes: { heading: string; intro: string; items: LongFormBlock[] };

  /**
   * The mid-page lead magnet, sitting between two of the long-form sections.
   * Written per platform rather than shared: it interrupts a specific piece of
   * reading, so it asks the question that reading has just raised.
   */
  auditCta: { heading: string; paragraph: string; ctas: CtaLink[] };

  /** Timeline and price. The only genuinely shared block on these pages. */
  logistics: {
    heading: string;
    priceFrom: string;
    timeline: string;
    note: string;
    ctas: CtaLink[];
  };

  /**
   * Optional by design. Flow Ninja's spokes rank carrying no proof at all, so
   * an unproven platform ships without this block rather than borrowing another
   * platform's client and implying a migration that never happened.
   */
  proof?: {
    heading: string;
    intro: string;
    /** Slugs into caseStudyCards; renders the shared WorkStrip rows. */
    workSlugs: string[];
  };

  faq: {
    heading: string[];
    subhead: string;
    ctas: CtaLink[];
    items: { q: string; a: string }[];
  };

  /**
   * Back to the hub, plus the sibling guides worth reading. Every guide links
   * to the hub and at least one sibling, so the cluster is connected in both
   * directions rather than only downward from the hub.
   */
  related: {
    heading: string;
    intro: string;
    /**
     * Cards that point at a platform guide carry that platform's `logo`;
     * everything else (the hub, the sibling services) carries an `icon`
     * naming an entry in components/ui/FeatureIcon. `logo` wins where both
     * are set, because a real mark beats a generic glyph.
     */
    items: {
      label: string;
      href: string;
      desc: string;
      icon?: string;
      logo?: string;
    }[];
  };

  finalCta: {
    heading: string[];
    paragraph: string;
    cta: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    image: string;
  };

  /** Service schema. */
  schema: { description: string; priceFrom?: string };
};
