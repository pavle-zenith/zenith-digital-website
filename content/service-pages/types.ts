import type { CtaLink } from "@/lib/types";

/**
 * /services/[slug] — the shared shape every service page fills in.
 *
 * THE ANTI-DOORWAY RULE: the layout is shared, the sentences never are. Google
 * and LLMs both demote near-duplicate service pages, so every field on every
 * page is written for that page. If a line would read the same on a sibling,
 * it gets rewritten rather than reused.
 */

/** One titled block of prose (who-it's-for bullets, deliverables, and so on). */
export type TitledBlock = { title: string; body: string };

/**
 * The panel beside the "Who this is for" tabs — a diagnostic card describing
 * where the reader is now, in the same register as the homepage audit report:
 * mono label, one headline reading, then symptom rows. `state` drives the dot
 * colour, so a situation can show what's already working as well as what isn't.
 */
export type WhoForCard = {
  label: string;
  value: string;
  valueNote: string;
  rows: { text: string; state: "bad" | "warn" | "good" }[];
};

/**
 * The animated scenes the whoFor panel can show instead of the card, one per
 * situation across the four service pages. Every name needs a matching entry
 * in components/sections/service/who-for-scenes.
 */
export type WhoForAnim =
  // wix-studio-website-design
  | "template"
  | "agency"
  | "launch"
  // seo-aeo-ppc
  | "serp"
  | "adspend"
  | "ai-answer"
  // website-migration
  | "upkeep"
  | "stack-cost"
  | "edit-queue"
  // landing-pages
  | "ad-mismatch"
  | "campaign-date"
  | "build-queue"
  // wix-studio-development
  | "no-button"
  | "quoted-stack"
  | "manual-handling";

/** A process step carries its own duration; the timeline is the proof. */
export type ProcessStep = TitledBlock & {
  duration: string;
  /** Chip row naming what the stage covers (showcase layout only). */
  focus?: string[];
};

/**
 * Block 7 varies by page on purpose: it's the section that makes each page
 * un-pasteable onto its siblings. Three shapes cover the four pages.
 */
export type UniqueBlock =
  | {
      kind: "comparison";
      heading: string;
      intro: string;
      /** Columns compared side by side; the last one is ours. */
      columns: { name: string; note: string; points: string[] }[];
      footnote: TitledBlock;
    }
  | {
      kind: "platforms";
      heading: string;
      intro: string;
      items: { name: string; pains: string; carries: string }[];
    }
  | {
      kind: "explainer";
      heading: string;
      intro: string;
      left: TitledBlock;
      right: TitledBlock;
      closing: string;
    };

export type ServicePageContent = {
  slug: string;
  /**
   * Gate for pages waiting on owner input. Unpublished pages are excluded from
   * routing, the hub, and the sitemap, so a half-priced page can't leak.
   */
  publish: boolean;
  seo: { title: string; description: string };

  hero: {
    /** Breadcrumb leaf and Service schema name. */
    name: string;
    h1: string;
    subhead: string;
    chips: string[];
    ctas: CtaLink[];
  };

  /**
   * Renders as accordion tabs with a card panel beside them, so each item needs
   * its own `card`; the panel swaps as the reader moves between situations.
   */
  whoFor: {
    heading: string;
    intro: string;
    /**
     * `anim` swaps the static diagnostic card for the matching animated
     * scene (components/sections/service/WhoForScenes). Items without one
     * keep rendering their `card`.
     */
    items: (TitledBlock & { card: WhoForCard; anim?: WhoForAnim })[];
  };
  /**
   * Slugs into caseStudyCards for the featured-work slider between the
   * process section and the testimonials. Picked per service so the strip
   * shows work relevant to the page, headline cases first.
   */
  workSlugs?: string[];

  /**
   * The cost-of-inaction section: why "later" is the expensive choice.
   * `icon` names an entry in components/ui/FeatureIcon.
   */
  stakes?: {
    heading: string;
    intro?: string;
    items: { title: string; body: string; icon?: string }[];
  };
  /**
   * The plain-terms benefits section: what actually changes for the reader
   * once this is done. Sits between `stakes` (what staying still costs) and
   * `included` (what we hand over), so the page runs where you are, what it
   * costs to stay, what life looks like after, then how we get you there.
   *
   * These are OUTCOMES, never deliverables: "your team can change things
   * without you" rather than "CMS setup and a Loom handover". If an item
   * could sit in `included` unchanged, it's written wrong.
   *
   * `image` is optional on purpose. The section reads fine as text cards, and
   * visuals get added per card as the owner supplies them (the live Wix site's
   * "difference a proper website makes" section is the reference).
   */
  outcomes?: {
    heading: string;
    intro?: string;
    items: { title: string; body: string; image?: string; imageAlt?: string }[];
  };
  /**
   * Renders as icon cards, so each item names an icon from
   * components/ui/FeatureIcon. An unknown name falls back to a circle.
   *
   * `group` is the tab an item sits under (homepage "Everything you'd expect"
   * register); tabs appear in the order their first item does. Items without
   * a group render as a single untabbed grid.
   */
  included: {
    heading: string;
    intro: string;
    items: (TitledBlock & { icon?: string; group?: string })[];
  };
  /**
   * `image` switches the section to the split showcase layout: heading, photo,
   * and CTA on the left, hairline-divided stages with focus chips on the
   * right. Without it the section renders as the plain numbered column.
   */
  process: {
    heading: string;
    intro: string;
    image?: string;
    imageAlt?: string;
    cta?: CtaLink;
    steps: ProcessStep[];
  };

  pricing: {
    heading: string;
    /** Omit on pages priced per project; `note` then has to justify why. */
    from?: string;
    fromNote?: string;
    note: string;
    /** Lifted out of the note into the centered pull quote below it. */
    pullQuote?: string;
    drivers: TitledBlock[];
    cta: CtaLink;
    ctaSecondary: CtaLink;
  };

  unique: UniqueBlock;

  faq: {
    heading: string[];
    subhead: string;
    ctas: CtaLink[];
    items: { q: string; a: string }[];
  };

  related: {
    heading: string;
    /**
     * The sibling services render as homepage-style cards and need `image`, or
     * `beforeAfter` for the drag-to-compare widget the migration card uses
     * everywhere (a static shot can't show what a migration does). The single
     * hub item (href "/services") renders as the full-width strip CTA instead
     * and carries neither.
     */
    items: {
      label: string;
      href: string;
      desc: string;
      image?: string;
      beforeAfter?: { before: string; after: string };
    }[];
  };

  finalCta: {
    heading: string[];
    paragraph: string;
    cta: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    image: string;
  };

  /** Service schema. `priceFrom` only where a price is actually published. */
  schema: { description: string; priceFrom?: string };
};
