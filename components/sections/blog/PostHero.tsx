import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { post as furniture } from "@/content/blog";
import type { Post } from "@/sanity/lib/types";

/**
 * Post hero, on the same inverted studio texture the migration guides use, so
 * the two content systems open identically.
 *
 * THE TITLE RUNS THE FULL FRAME, and it is the only thing here. A measure is
 * for reading paragraphs; a headline is one line of type and can have the
 * whole column.
 *
 * Everything else moved out. The byline is the facts strip below (PostMeta),
 * author photo included, and the excerpt now opens the article as a standfirst
 * where the reading actually starts. What is left is a breadcrumb and a title.
 *
 * The breadcrumb stays. It is navigation rather than content, it is the only
 * way back up to /blog from here, and the page emits BreadcrumbList markup:
 * shipping that markup with nothing visible behind it is the pattern this
 * codebase refuses everywhere else.
 *
 * The category is stated once, in the breadcrumb. A pill repeating it directly
 * underneath was the same word twice in two shapes.
 */
export function PostHero({ data }: { data: Post }) {
  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="relative !pb-12 !pt-10 md:!pb-16 md:!pt-14"
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
              "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 45%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 88%, transparent) 50%, color-mix(in srgb, var(--color-light-bg) 45%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-label uppercase track-label text-light-muted"
        >
          <Link href="/blog" className="transition hover:text-light-text">
            {furniture.breadcrumbLabel}
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-light-text">{data.category}</span>
        </nav>

        <h1 className="mt-8 font-display text-h1 font-medium leading-[1.05] tracking-tight text-balance">
          {data.title}
        </h1>
      </div>
    </Section>
  );
}
