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

/** A process step carries its own duration; the timeline is the proof. */
export type ProcessStep = TitledBlock & { duration: string };

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

  whoFor: { heading: string; intro: string; items: TitledBlock[] };
  included: { heading: string; intro: string; items: TitledBlock[] };
  process: { heading: string; intro: string; steps: ProcessStep[] };

  proof: {
    heading: string;
    intro: string;
    /** Slugs into caseStudyCards — the case data itself is never duplicated. */
    caseSlugs: string[];
    /** Avatar is optional: we don't put a stock face on a real person's quote. */
    testimonial: { quote: string; name: string; role: string; avatar?: string };
  };

  pricing: {
    heading: string;
    /** Omit on pages priced per project; `note` then has to justify why. */
    from?: string;
    fromNote?: string;
    note: string;
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
     * The sibling services render as homepage-style cards and need `image`.
     * The single hub item (href "/services") renders as the full-width strip
     * CTA instead and carries no image.
     */
    items: { label: string; href: string; desc: string; image?: string }[];
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
