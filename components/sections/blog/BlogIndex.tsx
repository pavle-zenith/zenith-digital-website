"use client";

import { useState } from "react";

import { Section } from "@/components/ui/Section";
import { DividedList, DividedRow } from "@/components/ui/DividedList";
import { FeaturedPost, PostRow } from "@/components/sections/blog/PostCard";
import { BLOG_CATEGORIES, blogIndex } from "@/content/blog";
import { cn } from "@/lib/utils";
import type { PostCard } from "@/sanity/lib/types";

/**
 * /blog — text-led index.
 *
 * EVERY POST STAYS IN THE DOM. Filtering and "load more" hide rows with a
 * class rather than removing them from the list, so the server-rendered HTML
 * always contains a crawlable link to every published post no matter what the
 * reader has clicked. The alternative renders ten links and hides the rest of
 * the archive behind a click no crawler makes.
 *
 * There are no /blog/category/[slug] routes behind these filters. The category
 * is a label, not an archive: thin archive pages are worth shipping when
 * Search Console shows demand for them, not before.
 */
export function BlogIndex({ posts }: { posts: PostCard[] }) {
  const [category, setCategory] = useState<string>(blogIndex.allLabel);
  const [visible, setVisible] = useState(blogIndex.pageSize);

  const showingAll = category === blogIndex.allLabel;

  // Posts are already ordered newest first, so the first `featured` one is the
  // most recent. It leads the page on its own, and only while unfiltered:
  // under a category filter it belongs in the list with everything else.
  const featured = posts.find((p) => p.featured);
  const lead = showingAll ? featured : undefined;

  const listed = posts.filter((p) => p._id !== lead?._id);
  const matching = listed.filter((p) => showingAll || p.category === category);
  const shown = matching.slice(0, visible);
  const shownIds = new Set(shown.map((p) => p._id));
  const hasMore = matching.length > shown.length;

  const filters = [blogIndex.allLabel, ...BLOG_CATEGORIES];

  function pick(next: string) {
    setCategory(next);
    setVisible(blogIndex.pageSize);
  }

  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      {lead ? (
        <FeaturedPost
          post={lead}
          label={blogIndex.featuredLabel}
          className="mb-12 md:mb-16"
        />
      ) : null}

      {/* Filter row. A radio group rather than a row of buttons: these are one
          exclusive choice, and screen readers should hear it that way. */}
      <div
        role="radiogroup"
        aria-label={blogIndex.filterLabel}
        className="flex flex-wrap items-center gap-2"
      >
        {filters.map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => pick(item)}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 font-mono text-label uppercase track-label transition",
                active
                  ? "border-accent-line bg-accent-subtle text-accent"
                  : "border-light-border text-light-muted hover:bg-light-surface hover:text-light-text",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* The empty line is about the FILTER finding nothing, so it stays quiet
          when a featured post is already on the page and the list below it is
          simply empty. Saying "nothing here" under a visible post reads as a
          bug rather than as an empty category. */}
      {matching.length === 0 && !lead ? (
        <p className="mt-12 text-body-lg text-light-muted">{blogIndex.empty}</p>
      ) : (
        <DividedList tone="light" className="mt-10 md:mt-12">
          {listed.map((post) => (
            <DividedRow
              key={post._id}
              className={cn("!py-0", !shownIds.has(post._id) && "hidden")}
            >
              <PostRow post={post} />
            </DividedRow>
          ))}
        </DividedList>
      )}

      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + blogIndex.pageSize)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[6px] border border-light-border px-6 py-3 text-body font-medium text-light-text transition hover:bg-light-surface sm:w-auto"
          >
            {blogIndex.loadMoreLabel}
          </button>
        </div>
      ) : null}
    </Section>
  );
}
