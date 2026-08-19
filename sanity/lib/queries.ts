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

/** Everything the index cards and the related rail need. No body. */
const cardFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  featured
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
