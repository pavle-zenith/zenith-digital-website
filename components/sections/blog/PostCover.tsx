import Image from "next/image";

import { mockCover } from "@/content/blog";

/**
 * The lead image, sitting between a post's opening paragraphs and its first
 * section heading. That position is the point: it lands after the reader has
 * been told what the article is about and before the article starts, which is
 * where a magazine puts one. Dropping it above the standfirst would push the
 * first sentence below the fold for no gain.
 *
 * SOURCE, AND ITS LIMIT. Posts still have no `coverImage` field (blog brief
 * §3), so this reads the same temporary slug-to-thumbnail map the index cards
 * use. That map covers the scaffolding posts and nothing else, so a post
 * outside it renders no lead image rather than a broken frame. Giving the
 * schema a real `coverImage` field is a one-function change here and the
 * documented way out of the map: see MOCK_COVERS in content/blog.ts.
 *
 * Same frame as an in-body image: hairline border, card radius, no shadow.
 */
export function PostCover({ slug, title }: { slug: string; title: string }) {
  const src = mockCover(slug);
  if (!src) return null;

  return (
    <figure className="mt-10 overflow-hidden rounded-card border border-light-border">
      <div className="relative aspect-[16/10]">
        <Image
          src={src}
          // Decorative rather than informative: the title above it already
          // says what the post is, and a lead image that restates the headline
          // is noise in a screen reader.
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 700px"
          className="object-cover"
        />
      </div>
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}
