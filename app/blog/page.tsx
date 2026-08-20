import type { Metadata } from "next";
import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { BlogIndex } from "@/components/sections/blog/BlogIndex";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { blogIndex } from "@/content/blog";
import { sanityFetchSafe } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import type { PostCard } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: blogIndex.seo.title,
  description: blogIndex.seo.description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: blogIndex.seo.title,
    description: blogIndex.seo.description,
  },
};

/**
 * /blog — the index.
 *
 * Server-rendered from Sanity with hourly revalidation and tag invalidation on
 * publish (see sanity/lib/client). The hero markup sits here rather than in a
 * component of its own: it is one heading and one paragraph, and the other
 * index pages that do have hero components have CTAs and artwork to justify
 * them.
 */
export default async function BlogPage() {
  const posts = await sanityFetchSafe<PostCard[]>(postsQuery, []);

  return (
    <>
      <Section
        tone="light"
        divide={false}
        frameClassName="relative !py-12 md:!py-20"
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <Image
            src="/textures/studio-texture.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.28] invert"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 92%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 60%, color-mix(in srgb, var(--color-light-bg) 20%, transparent) 100%)",
            }}
          />
        </div>

        <div className="relative max-w-3xl">
          <h1 className="font-display text-h2 font-medium leading-[1.15] tracking-tight text-balance">
            {blogIndex.heading}
          </h1>
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
            {blogIndex.intro}
          </p>
        </div>
      </Section>

      <BlogIndex posts={posts} />
      <CtaBanner data={blogIndex.cta} />
    </>
  );
}
