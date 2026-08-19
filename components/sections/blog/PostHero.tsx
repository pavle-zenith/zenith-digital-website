import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Pill";
import { formatLongDate } from "@/lib/utils";
import { post as furniture } from "@/content/blog";
import type { Post } from "@/sanity/lib/types";

/**
 * Post hero, on the same inverted studio texture the migration guides use, so
 * the two content systems open identically.
 *
 * THE BYLINE IS THE POINT. "Written by Zenith Digital, reviewed by a named
 * human, last verified on a date" is an E-E-A-T signal, not decoration: it is
 * what separates a maintained reference from an undated blog post, and it is
 * the same line the guides carry. The author is the agency and never a person,
 * so `reviewedBy` is where the human name goes.
 */
export function PostHero({ data }: { data: Post }) {
  const byline = [
    furniture.authorLine,
    data.reviewedBy ? `${furniture.reviewedByPrefix} ${data.reviewedBy}` : null,
    data.lastVerified
      ? `${furniture.verifiedPrefix} ${formatLongDate(data.lastVerified)}`
      : null,
  ].filter(Boolean) as string[];

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

      {/* Left-aligned at the body's measure rather than centred: the reader's
          eye starts where the first paragraph will start. */}
      <div className="relative max-w-[68ch]">
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

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Pill tone="light">{data.category}</Pill>
          <time
            dateTime={data.publishedAt}
            className="font-mono text-label uppercase track-label text-light-muted"
          >
            {formatLongDate(data.publishedAt)}
          </time>
        </div>

        <h1 className="mt-5 font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
          {data.title}
        </h1>

        <p className="mt-5 text-body-lg font-medium leading-relaxed text-light-muted">
          {data.excerpt}
        </p>

        <p className="mt-8 border-t border-light-border pt-5 text-body text-light-muted">
          {byline.map((part, i) => (
            <span key={part}>
              {i > 0 ? (
                <span aria-hidden className="mx-2">
                  ·
                </span>
              ) : null}
              {part}
            </span>
          ))}
        </p>
      </div>
    </Section>
  );
}
