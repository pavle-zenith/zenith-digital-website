import type { CtaLink } from "@/lib/types";

/**
 * Blog furniture: everything on /blog and /blog/[slug] that is NOT the post
 * itself. Posts live in Sanity (they change weekly and publish without a
 * deploy); the headings, labels, and standing CTA copy around them live here
 * with the rest of the site's copy, so a template change is a code review
 * rather than a CMS edit.
 */

/**
 * The fixed category set. Imported by the Sanity schema (as `options.list`, so
 * nobody can invent a fifth by typo) AND by the index filter, so the two can
 * never disagree about what a category is.
 *
 * There are deliberately no /blog/category/[slug] routes. The category is a
 * label and a client-side filter, not an archive page: thin archives are worth
 * shipping once Search Console shows demand for them, not before.
 */
export const BLOG_CATEGORIES = [
  "Wix Studio",
  "Migrations",
  "SEO & AEO",
  "Web design",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/** The four states a comparison-table row can carry, shared with the guides. */
export const BLOG_TABLE_STATUSES = [
  "carries",
  "rebuilt",
  "replaced",
  "lost",
] as const;

export const blogIndex = {
  seo: {
    title: "Blog | Wix Studio, migrations and search | Zenith Digital",
    description:
      "Notes on building and moving websites on Wix Studio, keeping rankings through a migration, and getting found by search and answer engines.",
  },
  heading: "Notes from the build",
  intro:
    "What we've learned shipping 100+ websites: what Wix Studio does well, what it doesn't, and how to move a site without losing the rankings you already have.",
  filterLabel: "Filter by topic",
  allLabel: "All",
  featuredLabel: "Featured",
  loadMoreLabel: "Load more",
  // Suffix on every card's read-time chip.
  readTimeSuffix: "min read",
  pageSize: 10,
  empty: "Nothing here yet under that topic. Try another one.",
  cta: {
    heading: ["Got a website problem", "worth writing about?"],
    paragraph:
      "Book a call and we'll tell you what we'd do about it, whether or not you hire us.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },
};

/**
 * Post furniture. The byline is an E-E-A-T signal rather than decoration: it
 * names who wrote the page, who checked it, and when, which is the difference
 * between a maintained reference and an undated blog post. Same argument the
 * migration guides make, same wording, so the two read as one publication.
 */
export const post = {
  breadcrumbLabel: "Blog",
  authorLine: "Written by Zenith Digital",
  reviewedByPrefix: "Reviewed by",
  verifiedPrefix: "Last verified",
  navLabel: "In this article",

  sources: {
    heading: "Sources",
    intro:
      "Primary documentation behind the claims above, so you can check them rather than take our word for it.",
  },

  faq: {
    heading: ["Questions", "people ask"],
    subhead: "If yours isn't here, ask it on a call. We answer in plain terms.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" } as CtaLink,
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      } as CtaLink,
    ],
  },

  /**
   * The audit capture, which stands in for a newsletter (owner decision). It
   * links to the existing /free-website-audit funnel rather than posting a
   * second form: one funnel, one Supabase write, one place to change the copy.
   */
  audit: {
    heading: "Want this checked on your own site?",
    paragraph:
      "Send us the URL. We'll tell you what's holding it back, in plain language, and what we'd fix first. Free, and useful whether or not you hire us.",
    cta: { label: "Get a free website audit", href: "/free-website-audit" },
  },

  related: {
    heading: "Keep reading",
    intro: "More on the same thing, or the next thing worth knowing.",
  },

  cta: {
    heading: ["Want this done", "on your own site?"],
    paragraph:
      "We build and move websites on Wix Studio, and build custom when you outgrow it. Tell us what you're working with.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "See our work", href: "/case-studies" },
    image: "/textures/studio-texture.jpg",
  },
};

/* ------------------------------------------------------------------ *
 * TEMPORARY — DESIGN SCAFFOLDING, DELETE BEFORE LAUNCH
 * ------------------------------------------------------------------ *
 *
 * `post` has no cover image field (owner decision, blog brief §3), so a card
 * normally draws its own typographic cover. These borrowed case-study
 * thumbnails exist only so the card grid can be judged with real imagery in
 * it. They are keyed to the four mock posts and nothing else, so a real post
 * is unaffected.
 *
 * Two ways out of here, both one job:
 *   keep image covers  -> add a `coverImage` field to the post schema and
 *                         read it in the card, then delete this map.
 *   keep typographic   -> delete this map and the mock posts.
 */
const MOCK_COVERS: Record<string, string> = {
  "mock-wordpress-to-wix-studio": "/case-study-grid/hunting-brook.webp",
  "mock-what-answer-engines-read": "/case-study-grid/capacity.webp",
  "mock-squarespace-export": "/case-study-grid/genroks.webp",
  "mock-design-system-limits": "/case-study-grid/bianomics.webp",
};

export function mockCover(slug: string): string | undefined {
  return MOCK_COVERS[slug];
}
