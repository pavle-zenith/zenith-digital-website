import { groq } from "next-sanity";

/**
 * THE DRAFT GUARD, and why it is repeated in every query.
 *
 * The `production` dataset has a PUBLIC ACL: anyone holding the project id can
 * read every document in it, drafts included. The Studio's published/draft
 * toggle is an editing affordance, not an access control. So each query states
 * the exclusion itself rather than trusting a client perspective setting, and
 * this constant exists so the rule is one string that cannot be half-applied.
 */
const notDraft = `!(_id in path("drafts.**"))`;

/**
 * Read-time input: the plain-text LENGTH of a post's body, never the body.
 *
 * WHY THIS IS NOT JUST `pt::text(body)`. That helper only sees standard
 * Portable Text blocks. Everything the post schema adds (points lists,
 * comparison tables, in-body FAQs) is invisible to it, so a post built out of
 * those blocks reported roughly a third of its real length: the first
 * long-form post on this template showed "6 min read" for a ten-minute
 * article. The custom blocks are added back by hand here.
 *
 * Deliberately NOT counted: `calloutCta` (an ask, not reading), `codeBlock`
 * (scanned far faster than prose, so counting it at prose speed overstates)
 * and image alt text. Each `coalesce` guards the case where a post carries
 * none of that block type, since `array::join` over nothing returns null and
 * one null would poison the whole sum.
 *
 * Shared by the cards and the single post so an index card and the article's
 * own byline can never quote two different read times.
 */
const bodyChars = groq`
  "bodyChars": coalesce(length(pt::text(body)), 0)
    + coalesce(length(array::join(body[_type == "pointsList"].points[].label, " ")), 0)
    + coalesce(length(array::join(body[_type == "pointsList"].points[].body, " ")), 0)
    + coalesce(length(array::join(body[_type == "comparisonTable"].rows[].cells[], " ")), 0)
    + coalesce(length(array::join(body[_type == "faqBlock"].items[].q, " ")), 0)
    + coalesce(length(array::join(body[_type == "faqBlock"].items[].a, " ")), 0)
`;

/**
 * Everything the index cards and the related rail need. The body is NOT
 * projected: the text is flattened server-side and only its LENGTH travels, so
 * a card knows its read time without shipping the article.
 *
 * The read time comes from `bodyChars` above.
 */
const cardFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  featured,
  ${bodyChars}
`;

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current) && ${notDraft}]
    | order(publishedAt desc) {
      ${cardFields}
    }
`;

/** Slugs for generateStaticParams, and dates for the sitemap. */
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current) && ${notDraft}]
    | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt,
      lastVerified
    }
`;

/**
 * A single post. Image assets are resolved inline so the renderer gets real
 * dimensions and can reserve space, rather than shipping a layout shift.
 */
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug && ${notDraft}][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    lastVerified,
    reviewedBy,
    seo,
    ${bodyChars},
    body[] {
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      }
    },
    sources[] { label, href, note },
    faq[] { q, a },
    "related": related[]-> { ${cardFields} }
  }
`;

/**
 * The related fallback: recent posts in the same category, minus this one.
 * Used only when the post authors no `related` list, so an editor who wants
 * specific follow-ons always wins over the heuristic.
 */
export const relatedFallbackQuery = groq`
  *[_type == "post"
    && defined(slug.current)
    && category == $category
    && slug.current != $slug
    && ${notDraft}]
    | order(publishedAt desc)[0...3] {
      ${cardFields}
    }
`;
