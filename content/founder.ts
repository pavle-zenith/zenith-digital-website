/**
 * content/founder.ts — the founder block, single source of truth.
 *
 * WHY THIS EXISTS (the research, condensed): the highest-performing founder
 * sections on agency service pages share five traits, and this file encodes
 * all of them.
 *   1. A real, named human with a specific role and place. Search engines and
 *      AI assistants resolve "Zenith Digital" to a verifiable entity through
 *      a person, and buyers trust a face more than a logo.
 *   2. Verifiable credentials, linked out. A claim like "Top 1% Wix Partner"
 *      earns weight when it points at a profile someone can check. These
 *      links double as `sameAs` in the Person schema.
 *   3. Numbers over adjectives. byCrawford's version of this block carries
 *      "700+ websites, 5 awards, 100%" in a stat bar over the photo. Ours
 *      carries our real numbers the same way.
 *   4. A "no layers" trust line. For a small studio the founder IS the
 *      differentiator vs agencies: the buyer talks to the builder.
 *   5. Placement at the trust gap: after the proof/pricing sections, before
 *      the FAQ, when the reader is asking "but who ARE these people?"
 *
 * COMPONENT SPEC (for the build) — see RevisionRound2_Handoff.md for the full
 * design brief. The short version:
 *   - ALL founder sections render on the LIGHT theme (white/light-surface
 *     section), per owner decision Aug 2026. Never on navy.
 *   - Services variant: text column left, portrait right with the translucent
 *     `stats` bar over the photo's bottom edge. Radius + hairlines per §7,
 *     no shadows.
 *   - Book-a-call and audit variants: the byCrawford expert block, NOT a slim
 *     row. Portrait left, signature over its bottom-right corner (owner
 *     decision, Aug 2026: the three floating badge chips came off); text
 *     right: heading, paragraph, `whyHeading` + `whyPoints` checklist with
 *     check icons.
 *   - Render social/profile links from `links` as a small icon or text row;
 *     skip any href still carrying a [bracketed] placeholder.
 *   - Emit Person JSON-LD alongside the existing Organization schema:
 *     { "@type": "Person", name, jobTitle: "Founder", image, worksFor:
 *     Organization, sameAs: links[].href }. One Person node per page render.
 *   - Placements: all four /services/[slug] pages between proof/pricing and
 *     FAQ using `founderServices`; /book-a-call above its FAQ using
 *     `founderBookACall`; /free-website-audit beside/after the form using
 *     `founderFreeAudit`. All three variants share `founderCore`.
 *   - Photo committed at /pavle.webp (1200x1500, 71KB). The original
 *     Pavle.jpg in /public can be deleted; nothing references it.
 *
 * OWNER — profile links are live (Wix Partner, Trustpilot, LinkedIn) and feed
 * Person/Organization `sameAs`.
 *
 * REVIEW CLAIMS (owner decision, Aug 2026): no score is published anywhere.
 * Every individual Trustpilot review is 5 stars, but the TrustScore weights
 * recency and currently displays 4.6, so publishing either number would
 * contradict what a visitor sees when they click through.
 *
 * NAMING THE PLATFORM (owner decision, Aug 2026): Trustpilot is named only
 * where the site links out to the profile, never as loose body copy or as a
 * stat value. Clutch is out of the copy entirely until that profile carries
 * real volume.
 */

export type FounderLink = { label: string; href: string };

export const founderCore = {
  name: "Pavle Maodus",
  role: "Founder, Zenith Digital",
  image: "/pavle.webp",
  imageAlt: "Pavle Maodus, founder of Zenith Digital, Top 1% Wix Partner",
  // Rendered as the stat bar overlaid on the portrait.
  stats: [
    { value: "100+", label: "Websites shipped" },
    { value: "Top 1%", label: "Wix Partner ranking" },
    { value: "5+", label: "Years of experience" },
  ],
  // These double as Person schema `sameAs`. Keep only links that resolve.
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pavlemaodus" },
    {
      label: "Wix Partner profile",
      href: "https://www.wix.com/studio/community/partners/zenith-digital",
    },
    // The public review profile the site points at (owner decision, Aug 2026).
    {
      label: "Trustpilot",
      href: "https://www.trustpilot.com/review/thezenithdigital.com",
    },
    { label: "Email", href: "mailto:hello@thezenithdigital.com" },
    // The contact number already published in the footer and FAQ, in the
    // digits-only form wa.me expects.
    { label: "WhatsApp", href: "https://wa.me/381649760617" },
  ] as FounderLink[],
};

/** Full block for the four /services/[slug] pages. */
export const founderServices = {
  ...founderCore,
  // Display chips only: LinkedIn, email, WhatsApp (owner decision, Aug 2026).
  // The Wix Partner and Trustpilot profiles stay in `founderCore.links`, so
  // they still feed Person/Organization `sameAs`; they're just not shown.
  links: founderCore.links.filter(
    (l) => l.label !== "Wix Partner profile" && l.label !== "Trustpilot",
  ),
  heading: "Who actually builds your site?",
  paragraphs: [
    "Zenith Digital is run by Pavle Maodus, a Belgrade-based web designer and developer ranked in the top 1% of Wix Partners worldwide. Building for businesses across the UK, EU, and US since 2019: 100+ websites shipped, from five-page service sites to custom-coded platforms.",
    "There's no account manager between you and the work. The person on your discovery call is the person designing your pages, writing your proposal, and answering when something needs fixing. That's most of why projects here move in weeks, not quarters.",
    "The rest of the proof is public: €1M+ in tracked client revenue and the case studies on this site, with every number in them real.",
  ],
  cta: { label: "Book a call with Pavle", href: "/book-a-call" },
};

/**
 * Expert block for /book-a-call (owner decision, Aug 2026: NOT a slim
 * signature row — the full byCrawford-style expert section, first person,
 * with the badged portrait and a "why book a call with me?" checklist).
 */
export const founderBookACall = {
  ...founderCore,
  heading: "Hi, I'm Pavle",
  paragraphs: [
    "Seven years of building websites, 100+ shipped, and every discovery call at Zenith is with me: the person who would actually design and build yours. Bring your current site and twenty minutes.",
  ],
  whyHeading: "Why book a call with me?",
  whyPoints: [
    "Top 1% Wix Partner, ranked by Wix, not self-declared",
    "100+ builds mean the diagnosis is fast and specific",
    "No sales rep and no handoff: you talk to the builder",
    "The advice is yours to keep, whether or not we work together",
  ],
};

/** Expert block for /free-website-audit, same layout as book-a-call. */
export const founderFreeAudit = {
  ...founderCore,
  heading: "Your audit is done by me",
  paragraphs: [
    "I'm Pavle, Zenith's founder. Every audit request lands with me, and I go through your site the way I'd go through a client's: what's leaking leads, what's blocking rankings, and what I'd fix first if it were mine.",
  ],
  whyHeading: "Why let me pick your site apart?",
  whyPoints: [
    "Top 1% Wix Partner with 100+ sites shipped",
    "The same checklist we run on paid projects",
    "Findings in plain language, ranked by impact",
    "No obligation attached: the audit is useful by design",
  ],
};
