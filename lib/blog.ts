import type { PortableTextBlock } from "@portabletext/types";

import type { PostBodyBlock } from "@/sanity/lib/types";

/**
 * Heading anchors, computed in ONE pass and read by both consumers.
 *
 * The body serializer stamps ids onto H2s and H3s; the page builds the sticky
 * navigator's targets from the same body. If those two slugified separately,
 * every navigator link would break the first time a heading was reworded in a
 * way one of them handled differently. So the walk happens once, here, and
 * both read the result.
 */

/** Plain text of a Portable Text block, for anchors and nav labels. */
export function blockText(block: PortableTextBlock): string {
  if (!Array.isArray(block.children)) return "";
  return block.children
    .map((child) => (typeof child.text === "string" ? child.text : ""))
    .join("")
    .trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type HeadingAnchors = {
  /** Block `_key` to anchor id, for every H2 and H3. */
  byKey: Record<string, string>;
  /**
   * The navigator's sections: top-level H2s only. H3s get anchors so they can
   * be linked to directly, but listing them would turn one orienting line into
   * an index of the whole article, which is the failure the guides' navigator
   * was built to avoid.
   */
  sections: { id: string; label: string }[];
};

export function headingAnchors(
  body: PostBodyBlock[] | undefined,
): HeadingAnchors {
  const byKey: Record<string, string> = {};
  const sections: { id: string; label: string }[] = [];
  if (!body) return { byKey, sections };

  const seen = new Set<string>();

  for (const block of body) {
    if (block._type !== "block") continue;
    const b = block as PortableTextBlock;
    if (b.style !== "h2" && b.style !== "h3") continue;

    const label = blockText(b);
    const key = b._key;
    if (!label || !key) continue;

    // Two headings can share wording; suffix the repeats so every link still
    // lands somewhere distinct rather than all on the first one.
    const base = slugify(label) || "section";
    let id = base;
    let n = 2;
    while (seen.has(id)) id = `${base}-${n++}`;
    seen.add(id);

    byKey[key] = id;
    if (b.style === "h2") sections.push({ id, label });
  }

  return { byKey, sections };
}

/**
 * The navigator is orientation, not decoration. Under three sections there is
 * nothing to orient in, and a sticky bar over a short post is just a bar.
 */
export const NAV_MIN_SECTIONS = 3;

/**
 * Read time from the body's plain-text length, which is what the card query
 * projects (`length(pt::text(body))`). 200 words a minute at roughly 5.5
 * characters a word including the space, so ~1,100 characters a minute.
 *
 * Rounded up to a floor of one minute: "0 min read" is not a thing, and a
 * reader treats this as a rough shape of the article rather than a promise.
 */
export function readingMinutes(bodyChars: number | undefined): number {
  if (!bodyChars) return 1;
  return Math.max(1, Math.round(bodyChars / 1100));
}
