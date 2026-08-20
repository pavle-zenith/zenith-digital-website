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
 * same on another guide, it gets rewritten or cut. Pricing is the one thing
 * these pages don't author at all: they render the sitewide tier table, so the
 * reader gets the real numbers rather than a per-platform paraphrase of them.
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
/**
 * A contextual ask, rendered as a slim inset band immediately after the block
 * that earned it. Placed where the reader has just felt the difficulty rather
 * than on a fixed rhythm, and never two in a row.
 */
export type ContextualCta = {
  heading: string;
  paragraph: string;
  cta: CtaLink;
};

/**
 * A primary source backing a technical claim. Linking the vendor's own
 * documentation is what separates a citable page from an opinion, and it is
 * the page's moat: every competitor reviewed cites nothing.
 */
export type GuideSource = { label: string; href: string; note: string };

export type LongFormBlock = TitledBlock & {
  /**
   * Short functional label for the sticky section navigator, used when `title`
   * is editorial. A nav label has to say where you land: "Watch it land" is a
   * good heading and useless navigation, so it carries the navLabel
   * "Post-launch monitoring". Falls back to `title` when absent.
   */
  navLabel?: string;
  /** Stage duration, rendered as a chip beside the heading. Steps only. */
  duration?: string;
  /** The line that introduces the points, e.g. "Here's what that covers:". */
  lead?: string;
  points?: Point[];
  /** A contextual ask rendered immediately after this block. */
  cta?: ContextualCta;
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
  /**
   * Which route this row describes, when the answer differs between them. Wix
   * Classic genuinely has two: a Studio branch off an eligible Premium Editor
   * site, and a fresh Studio site. Products and contacts ride along on the
   * first and need exporting on the second, so one answer would be wrong on
   * one of them. Omit when the row holds either way.
   */
  route?: "branch" | "fresh";
};

/**
 * One available way of getting from the source platform to Wix Studio.
 *
 * This exists because Wix Classic has two, and Wix's help centre documents
 * them in separate articles without reconciling them: one describes rebuilding
 * from scratch, another describes creating a Studio branch off an existing
 * Premium Editor site. Readers arrive having found one or the other and no way
 * to tell which applies to them. Where a source platform offers a single
 * route, omit the block rather than inventing a choice.
 */
export type MigrationRoute = LongFormBlock & {
  /** Who can actually use this route, in one line. */
  eligibility: string;
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

  /**
   * "Migration at a glance": labelled facts, high on the page. Explicitly
   * labelled key/value pairs are the most extractable thing on a guide, so
   * this earns its place for skim-readers and answer engines at once.
   *
   * Optional ONLY while the Squarespace and Harmony guides are brought up to
   * this template. Every published guide should carry one.
   */
  glance?: {
    heading: string;
    intro?: string;
    items: { label: string; value: string }[];
  };

  /**
   * What the destination platform actually gives you, in the source
   * platform's terms. Emphasis shifts per guide: a WordPress reader cares
   * about maintenance ending, a Classic reader about responsive control and
   * the design system. Same destination, different argument.
   */
  benefits?: {
    heading: string;
    intro: string;
    items: TitledBlock[];
  };

  /** Available routes, where the source platform genuinely offers more than one. */
  routes?: {
    heading: string;
    intro: string;
    items: MigrationRoute[];
    footnote?: string;
    cta?: ContextualCta;
  };

  /** THE CORE ASSET. See TransferStatus. */
  transfers: {
    heading: string;
    intro: string;
    rows: TransferRow[];
    footnote?: string;
    cta?: ContextualCta;
  };

  /** The bulk of the word count: 6 to 8 stages, each with a real duration. */
  steps: {
    heading: string;
    intro: string;
    items: LongFormBlock[];
  };

  /** Platform-specific URL and indexing mechanics. The part that gets skipped. */
  /**
   * Optional. Dropped from the Wix Classic guide (owner decision, Aug 2026):
   * too technical for a reader who mostly wants to know whether their URLs
   * survive. That answer lives in `glance` and the rankings FAQ instead, and
   * the 30-day guarantee moved into `proof`. Use it only where a platform has
   * genuinely platform-specific indexing mechanics worth a section.
   */
  seoMechanics?: { heading: string; intro: string; items: LongFormBlock[] };

  /** Cheap to write, high citation value, and it demonstrates having done this. */
  /**
   * Optional. Dropped from the Wix Classic guide (owner decision, Aug 2026):
   * framed as abstract decisions, it read as advice for someone running the
   * project rather than someone buying it. The substance sits in `steps` and
   * the transfers notes.
   */
  mistakes?: { heading: string; intro: string; items: LongFormBlock[] };

  /**
   * The mid-page lead magnet, sitting between two of the long-form sections.
   * Written per platform rather than shared: it interrupts a specific piece of
   * reading, so it asks the question that reading has just raised.
   */
  auditCta: { heading: string; paragraph: string; ctas: CtaLink[] };

  /**
   * The commercial block. A migration guide can't answer its cost question
   * with the sitewide package tiers: the reader doesn't know whether they're
   * buying a migration, a redesign or a new website, so this states what the
   * fee buys and what moves it, then links out to the full tiers.
   *
   * Optional ONLY while the Squarespace and Harmony guides are brought up to
   * this template; guides without one fall back to the sitewide tiers.
   */
  cost?: {
    heading: string;
    priceFrom: string;
    timeline: string;
    /** What the fee actually buys. */
    included: string[];
    /** What moves the number, in the reader's terms. */
    drivers: string[];
    note: string;
    ctas: CtaLink[];
  };

  /**
   * Primary sources, rendered rather than buried in a comment. `verified` is
   * an ISO date and also drives the byline under the H1.
   */
  sources?: {
    heading: string;
    intro: string;
    verified: string;
    items: GuideSource[];
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
