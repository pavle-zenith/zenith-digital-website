import Link from "next/link";

import { Pill } from "@/components/ui/Pill";
import { cn, formatLongDate } from "@/lib/utils";
import type { PostCard as PostCardData } from "@/sanity/lib/types";

/**
 * Text-led post cards. No thumbnails anywhere, by design: a blog whose cards
 * lead on stock imagery makes every post look like every other post, and the
 * index is stronger reading the titles. The author is never shown either,
 * because it is always Zenith Digital.
 */

/** A row in the divided index list. Meta left, title and excerpt right. */
export function PostRow({ post }: { post: PostCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-4 py-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10"
    >
      <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-start md:gap-3">
        <Pill tone="light">{post.category}</Pill>
        <span className="font-mono text-label uppercase track-label text-light-muted">
          {formatLongDate(post.publishedAt)}
        </span>
      </div>

      <div>
        <h3 className="font-display text-h3 font-medium leading-snug tracking-tight text-balance transition group-hover:text-accent">
          {post.title}{" "}
          <span className="btn-arrow whitespace-nowrap" aria-hidden>
            &rarr;
          </span>
        </h3>
        <p className="mt-3 max-w-[68ch] text-body leading-relaxed text-light-muted">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

/**
 * The lead post: the same information at display scale, so it reads as the
 * front page rather than as a different kind of object.
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
        "group block rounded-card border border-light-border bg-light-surface p-8 transition hover:bg-light-bg md:p-12",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Pill tone="light" accent>
          {label}
        </Pill>
        <Pill tone="light">{post.category}</Pill>
        <span className="font-mono text-label uppercase track-label text-light-muted">
          {formatLongDate(post.publishedAt)}
        </span>
      </div>

      <h2 className="mt-6 max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance transition group-hover:text-accent">
        {post.title}{" "}
        <span className="btn-arrow whitespace-nowrap" aria-hidden>
          &rarr;
        </span>
      </h2>
      <p className="mt-4 max-w-[68ch] text-body-lg leading-relaxed text-light-muted">
        {post.excerpt}
      </p>
    </Link>
  );
}
