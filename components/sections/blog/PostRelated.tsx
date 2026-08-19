import { Section } from "@/components/ui/Section";
import { DividedList, DividedRow } from "@/components/ui/DividedList";
import { PostRow } from "@/components/sections/blog/PostCard";
import { post as furniture } from "@/content/blog";
import type { PostCard } from "@/sanity/lib/types";

/**
 * Related posts, as the same divided rows the index uses so a reader meets one
 * card treatment on the blog rather than two. Authored `related` references
 * win; the page falls back to recent posts in the same category only when the
 * post names none.
 */
export function PostRelated({ posts }: { posts: PostCard[] }) {
  if (posts.length === 0) return null;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-20">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {furniture.related.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
          {furniture.related.intro}
        </p>
      </div>

      <DividedList tone="light" className="mt-10">
        {posts.map((post) => (
          <DividedRow key={post._id} className="!py-0">
            <PostRow post={post} />
          </DividedRow>
        ))}
      </DividedList>
    </Section>
  );
}
