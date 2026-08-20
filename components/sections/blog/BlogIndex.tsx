"use client";

import { useState } from "react";

import { Section } from "@/components/ui/Section";
import { FilterTab } from "@/components/ui/FilterTab";
import { FeaturedPost, PostTile } from "@/components/sections/blog/PostCard";
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

      {/* The same tabs the case studies grid uses, so the two filter bars are
          one control rather than two that resemble each other. */}
      <div
        aria-label={blogIndex.filterLabel}
        className="flex flex-wrap items-center gap-2"
      >
        {filters.map((item) => (
          <FilterTab
            key={item}
            active={item === category}
            onClick={() => pick(item)}
          >
            {item}
          </FilterTab>
        ))}
      </div>

      {/* The empty line is about the FILTER finding nothing, so it stays quiet
          when a featured post is already on the page and the list below it is
          simply empty. Saying "nothing here" under a visible post reads as a
          bug rather than as an empty category. */}
      {matching.length === 0 && !lead ? (
        <p className="mt-12 text-body-lg text-light-muted">{blogIndex.empty}</p>
      ) : (
        /* Two across with a real gap between separate bordered cards, the
           same grid the case studies page uses. */
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2">
          {listed.map((post) => (
            <div
              key={post._id}
              className={cn(
                "flex flex-col",
                !shownIds.has(post._id) && "hidden",
              )}
            >
              <PostTile post={post} />
            </div>
          ))}
        </div>
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
