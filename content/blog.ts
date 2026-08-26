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

  /**
   * The byline, as the facts strip under the title rather than a run-on line
   * of dot-separated text. Same object the case studies use for their project
   * facts, and the same argument for it: who wrote this, when, and how long it
   * takes to read are separate facts, so they get labelled cells rather than
   * one sentence.
   *
   * The author is the FOUNDER, not the agency (owner decision, 20 August 2026),
   * and he sits in the strip with his photo rather than up in the hero. The
   * name and photo are read from `founderCore` rather than repeated here, so
   * the byline, the founder section and the Person schema can never end up
   * naming three slightly different people. Posts have no per-post author
   * field: there is one author on this blog.
   *
   * Because the visible byline now names a person, `BlogPosting.author` points
   * at the Person node rather than the Organization, and the post page emits
   * that node. A byline and its markup disagreeing is the thing Google asks
   * you not to do.
   *
   * "Reviewed by" and "Last verified" were dropped from the strip. The
   * document still carries both fields: `lastVerified` continues to drive
   * `dateModified` in the BlogPosting markup and `modifiedTime` in the Open
   * Graph tags, so the freshness signal survives even though the line no
   * longer prints.
   */
  meta: {
    writtenByLabel: "Written by",
    publishedLabel: "Published",
    readTimeLabel: "Read time",
  },

  /**
   * Share. Copy link leads because it is the one people use; the rest are
   * plain links to each platform's own share URL, so no third-party script
   * loads to draw a button.
   */
  share: {
    label: "Share this article",
    copy: "Copy link to this article",
    copied: "Link copied",
    facebook: "Share on Facebook",
    x: "Share on X",
    linkedin: "Share on LinkedIn",
  },

  /**
   * The sticky chapters column beside the body. The label names the object
   * (a post has chapters, a guide has sections), and the CTA is the standing
   * ask that travels the whole article.
   *
   * It asks for the CALL, deliberately. The audit block further down the page
   * asks for the audit, so the two are different offers rather than the same
   * one printed twice. Desktop only: see PostChapters.
   */
  chapters: {
    label: "Chapters",
    /**
     * The standing ask in the sidebar. It travels the whole article, so it
     * carries proof rather than just a button: real client faces, the sitewide
     * count, and what we actually are. Every claim here is one the rest of the
     * site already makes (see content/home.ts), so nothing new is asserted in
     * a sidebar where nobody would think to check it.
     */
    cta: {
      stat: "100+ websites built",
      heading: "Your Wix Studio build partner",
      paragraph:
        "Design, build, migration and search, handled by one senior team. Wix Legend Partner, shipping since 2021.",
      cta: { label: "Book a call", href: "/book-a-call" } as CtaLink,
    },
  },

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
    heading: "A free audit that actually tells you something",
    paragraph:
      "Drop your site in and we'll review it by hand, then send a short video walkthrough of the highest-impact fixes. No auto-generated PDF, no obligation.",
    cta: { label: "Get my free audit", href: "/free-website-audit" },

    /**
     * The three promises, as an accordion. They are the audit page's own
     * claims rather than new ones (see content/free-website-audit.ts): a human
     * review, six named problems on video, and no strings. If that page's
     * offer changes, these change with it.
     */
    points: [
      {
        title: "Reviewed by a human, not a bot",
        body: "Someone opens your site and records what they find. No automated score, no templated PDF with your logo dropped into it.",
      },
      {
        title: "Six things costing you the most",
        body: "Conversion leaks, search and AI visibility, speed, design and trust, copy and positioning, and the order we would fix them in.",
      },
      {
        title: "Yours to keep, no strings",
        body: "You get the walkthrough whether or not we ever work together. No pitch, no obligation, and it lands within 2 business days.",
      },
    ],

    /**
     * The handoff field. It does NOT submit an audit: the real form needs an
     * email too, and a second form would mean a second Supabase write and two
     * places to change the copy. It carries the URL to /free-website-audit,
     * which prefills it, so the reader arrives one field down rather than
     * starting again.
     */
    form: {
      placeholder: "yourwebsite.com",
      label: "Your website",
    },

    /**
     * THE SAMPLE REPORT rendered beside the ask.
     *
     * Showing the deliverable converts better than describing it, which is the
     * whole reason this block exists rather than another line of copy. The
     * findings are the kind the audit really reports; the numbers are
     * illustrative, which is why the card says "sample" on it. A mock that
     * presents itself as a real result is a fabricated record. Swap in a
     * screenshot of a real anonymised report when there is one.
     */
    report: {
      label: "Sample site audit",
      score: "62",
      outOf: "/100",
      scoreLabel: "Performance score",
      issues: "18 issues found",
      findingsLabel: "Top findings",
      findings: [
        { label: "Largest Contentful Paint over 4s", severity: "high" },
        { label: "Missing meta descriptions on 9 pages", severity: "medium" },
        { label: "No structured data for search", severity: "medium" },
      ] as { label: string; severity: "high" | "medium" }[],
    },
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
