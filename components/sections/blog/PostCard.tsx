import Image from "next/image";
import Link from "next/link";

import { blogIndex } from "@/content/blog";
import { blogCover } from "@/content/blog-covers";
import { readingMinutes } from "@/lib/blog";
import { cn, formatLongDate } from "@/lib/utils";
import type { PostCard as PostCardData } from "@/sanity/lib/types";

/**
 * Blog cards, built on the case studies card so the two grids are the same
 * object: bordered, rounded, separated by a real gap, thumbnail on top with a
 * hairline under it, body beneath.
 *
 * NOTHING IS DRAWN OVER THE THUMBNAIL except the category chip. An earlier
 * pass put a scrim and the title on it, which made the image decorative and
 * printed the title twice on one card. The image is now just the image.
 *
 * Cover art lives in the repo, keyed by slug (content/blog-covers.ts). A
 * post without art falls back to the wordmark panel, which is the same thing
 * the case studies grid does for a client with no shot.
 */

function PostThumb({
  post,
  className,
}: {
  post: PostCardData;
  className?: string;
}) {
  const cover = blogCover(post.slug);
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-light-border bg-bg",
        className,
      )}
    >
      {/* Dedicated cover art per post (content/blog-covers.ts), never a
          borrowed case-study thumbnail: an earlier pass mapped slugs to client
          shots, which put a client's site on an article that had nothing to do
          with them. The alt is empty because the art bakes the title in and
          the card already prints it. A post without art draws the typographic
          panel: the studio texture with the wordmark over it. */}
      {cover ? (
        <Image
          src={cover}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          aria-hidden
        />
      ) : (
        <>
          <Image
            src="/textures/studio-texture.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-[0.22]"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-body-lg font-medium lowercase tracking-tight text-text">
              zenith digital
            </span>
          </div>
        </>
      )}

      {/* The category lives here and nowhere else on the card, so the meta row
          below carries the date and the read time only. */}
      <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-[6px] border border-white/25 bg-black/45 px-3 py-1 text-label font-medium text-white backdrop-blur-md">
        {post.category}
      </span>
    </div>
  );
}

/** Date and read time. */
function PostMeta({ post }: { post: PostCardData }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-label text-light-muted">
      <time dateTime={post.publishedAt}>
        {formatLongDate(post.publishedAt)}
      </time>
      <span aria-hidden>&middot;</span>
      <span>{`${readingMinutes(post.bodyChars)} ${blogIndex.readTimeSuffix}`}</span>
    </div>
  );
}

/** A card in the two-across grid. */
export function PostTile({ post }: { post: PostCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-light-border bg-light-bg transition hover:border-light-muted/40"
    >
      <PostThumb post={post} className="aspect-[16/10]" />

      <div className="flex flex-1 flex-col p-6">
        <PostMeta post={post} />
        <h3 className="mt-3 font-display text-h3 font-medium leading-snug tracking-tight text-balance transition group-hover:text-accent">
          {post.title}
        </h3>
        {/* Clamped so a long excerpt cannot make one card taller than the one
            beside it. */}
        <p className="mt-2 line-clamp-2 text-body leading-snug text-light-muted">
          {post.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-display text-body font-medium transition group-hover:text-accent">
          Read the post{" "}
          <span aria-hidden className="btn-arrow">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}

/**
 * The lead post: the same card turned on its side and given the full width, so
 * it reads as the front page rather than as a different kind of object.
 */
export function FeaturedPost({
  post,
  label,
  className,
}: {
  post: PostCardData;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group grid overflow-hidden rounded-card border border-light-border bg-light-bg transition hover:border-light-muted/40 lg:grid-cols-2",
        className,
      )}
    >
      <PostThumb
        post={post}
        className="aspect-[16/10] lg:aspect-auto lg:min-h-[320px] lg:border-b-0 lg:border-r"
      />

      <div className="flex flex-col justify-center p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-[6px] border border-accent-line bg-accent-subtle px-3 py-1 text-label font-medium text-accent">
            {label}
          </span>
          <PostMeta post={post} />
        </div>

        <h2 className="mt-4 font-display text-h2 font-medium leading-tight tracking-tight text-balance transition group-hover:text-accent">
          {post.title}
        </h2>
        <p className="mt-3 text-body-lg leading-relaxed text-light-muted">
          {post.excerpt}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 font-display text-body font-medium transition group-hover:text-accent">
          Read the post{" "}
          <span aria-hidden className="btn-arrow">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
