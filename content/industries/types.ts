import type { CtaLink } from "@/lib/types";
import type { IndustrySlug } from "@/content/case-studies";

/**
 * /industries/[slug]: the shared shape every industry page fills in.
 *
 * THE SWAP TEST (owner brief, 17 Nov 2026). Replace the industry's name with
 * another one: any sentence that still reads as true is generic and gets
 * rewritten or cut. The layout is shared, the sentences never are.
 *
 * NO RETYPED NUMBERS. A figure on these pages is read from
 * content/case-studies.ts through the helpers in ./proof, never typed into a
 * string by hand, so a page can't drift from the case study it cites. A
 * project with no result shows its scope (the card's own metric), not a
 * number invented for it.
 */

/** A primary source, linked at the point of a general claim. */
export type IndustrySource = { label: string; href: string };

/**
 * The animated vignette beside each build step (components/sections/industry/
 * step-scenes). Every name needs a matching scene; the registry is keyed by
 * this union, so a missing one is a type error rather than an empty box.
 */
export type StepSceneName =
  | "travel-booking"
  | "travel-sync"
  | "travel-pages"
  | "travel-design"
  | "travel-launch"
  | "ecommerce-platform"
  | "ecommerce-catalogue"
  | "ecommerce-design"
  | "ecommerce-checkout"
  | "ecommerce-launch"
  | "saas-positioning"
  | "saas-platform"
  | "saas-design"
  | "saas-conversion"
  | "saas-launch"
  | "coaches-offer"
  | "coaches-proof"
  | "coaches-booking"
  | "coaches-leadcapture"
  | "coaches-handover"
  | "courses-offer"
  | "courses-platform"
  | "courses-launchpages"
  | "courses-library"
  | "courses-launch"
  | "property-audience"
  | "property-listings"
  | "property-design"
  | "property-enquiries"
  | "property-launch"
  | "marine-model"
  | "marine-listings"
  | "marine-enquiries"
  | "marine-design"
  | "marine-launch"
  | "trades-services"
  | "trades-quote"
  | "trades-proof"
  | "trades-localsearch"
  | "trades-launch"
  | "pro-offer"
  | "pro-trust"
  | "pro-firststep"
  | "pro-language"
  | "pro-launch"
  | "creative-work"
  | "creative-video"
  | "creative-portfolio"
  | "creative-enquiries"
  | "creative-launch"
  | "local-essentials"
  | "local-booking"
  | "local-menu"
  | "local-localsearch"
  | "local-launch";

/**
 * A hero shot: a case-study slug (its `heroShot` is used), or, where an
 * industry has fewer than three detail pages, an explicit image of real work
 * from the project's own files (e.g. its grid card).
 */
export type HeroShotRef = string | { src: string; alt: string };

/** The client packages an industry page can show. */
export type ClientPlan = "landing" | "minimum" | "studio";

/** One of the published packages a page may show. No new prices, ever. */
export type PackageKey = "minimum" | "studio" | "landing";

export type IndustryPageContent = {
  /** Route slug: /industries/{slug}. */
  slug: string;
  /** Key into INDUSTRIES; the page's projects are every card with this key. */
  industry: IndustrySlug;
  /**
   * Gate for owner review. Unpublished pages are excluded from routing, the
   * hub, every link and the sitemap. `PREVIEW_UNPUBLISHED=1` routes them for
   * review (noindexed), see ./index.
   */
  publish: boolean;
  /** ISO date the facts were last checked; renders as "Updated {month year}". */
  updated: string;
  /** Short name: breadcrumb leaf, hub row and schema names ("Travel"). */
  name: string;
  /** Label for the /case-studies filter link ("See the travel page"). */
  filterLinkLabel: string;

  // The page's row on the /industries hub (icon, purpose line, directory
  // group) lives in ./hub, which lists every industry whether or not its page
  // exists yet.

  seo: { title: string; description: string };

  hero: {
    /** The outcome in the buyer's words, not just the industry name. */
    h1: string;
    /** The strongest project in this industry, with its number where one exists. */
    proof: string;
    ctas: CtaLink[];
    /**
     * Real work under the buttons: three case studies' `heroShot` images (the
     * browser-on-backdrop band the case-study pages use), `center` in front
     * and centred, `left` and `right` behind it. Slugs must have a shipped
     * detail page with a heroShot; src and alt are read from it.
     */
    shots?: { center: HeroShotRef; left: HeroShotRef; right: HeroShotRef };
  };

  /** 40 to 60 words: what, for whom, platform, how long, from what price. */
  inShort: string;

  /**
   * The fit boxes (fixes brief, 18 Nov 2026): three short clauses a side, one
   * line each where the width allows. Good-fit lines carry a FeatureIcon.
   */
  fit: {
    heading: string;
    good: { icon: string; text: string }[];
    notAFit: string[];
  };

  /**
   * "Sound familiar?" (owner, 18 Nov 2026; replaces the brief's "What goes
   * wrong" block). A two-line hook, one intro line, then six cards: an icon,
   * the situation in the buyer's own words, and one short line on what we do
   * about it. Six situations that only make sense for this industry (the
   * swap test applies to every card). A card making a general claim links
   * its primary source.
   */
  familiar: {
    heading: [string, string];
    intro: string;
    items: {
      /** components/ui/FeatureIcon name. */
      icon: string;
      title: string;
      body: string;
      sources?: IndustrySource[];
    }[];
  };

  /**
   * How we build it, as five tabs across the section (owner, 18 Nov 2026):
   * each step's explanation, then the deliverables the client gets from it.
   * `navLabel` is the short tab label. Deliverables are things we actually
   * hand over (checked against the published packages), never invented
   * extras.
   */
  steps: {
    heading: string;
    intro?: string;
    items: {
      navLabel: string;
      title: string;
      body: string;
      /** Deliverable titles only, shown as a checklist (owner, 18 Nov 2026). */
      deliverables: string[];
      /** A short animation of what the step does, played when its tab opens. */
      scene?: StepSceneName;
    }[];
  };

  /**
   * Client voice, directly after "Sound familiar?". Ids into
   * content/testimonials-data.ts, quotes shown in full. Three columns from
   * lg: each video testimonial takes a column, and the written ones stack in
   * the last column at a video card's height. `context` is an optional line
   * placing the speaker ("The partner behind Scottish Luxury Experience").
   */
  testimonials?: {
    heading: string;
    intro?: string;
    items: { id: string; context?: string }[];
  };

  /** Heading over the project cards; the cards themselves come from the data. */
  work: { heading: string; intro?: string };

  /**
   * The service pages' pricing element, as is (owner, 18 Nov 2026): The
   * Minimum, The Studio and Referral cards, every figure read from the
   * homepage tiers and the partnerships page. Only the heading and the
   * support line are this page's own.
   */
  pricing: {
    heading: string;
    note: string;
    /**
     * Which client packages show, in order. Default: all three (landing
     * page, The Minimum, The Studio). Partner and referral tiers are never
     * offered on an industry page.
     */
    plans?: ClientPlan[];
    /** A one-line, industry-specific note that replaces a card's summary. */
    notes?: Partial<Record<ClientPlan, string>>;
  };

  faq: { heading: string[]; subhead: string; items: { q: string; a: string }[] };

  related: {
    heading: string;
    items: { label: string; href: string; desc: string; icon: string; kind: string }[];
  };

  finalCta: { heading: string[]; paragraph: string };

  /** Service schema description: the offer in one plain sentence. */
  schema: { serviceName: string; description: string };
};
