import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBand } from "@/components/sections/migration/CtaBand";
import { StatusChip } from "@/components/sections/migration/TransfersTable";
import { PointList } from "@/components/sections/migration/PointList";
import { headingAnchors } from "@/lib/blog";
import { cn, isInternal } from "@/lib/utils";
import type {
  Post,
  PostCalloutCtaBlock,
  PostCodeBlock,
  PostComparisonTableBlock,
  PostFaqBlock,
  PostImageBlock,
  PostPointsListBlock,
} from "@/sanity/lib/types";

/**
 * The post body: Portable Text through the components the site already has.
 *
 * THE RULE THIS FILE EXISTS TO KEEP. Every custom block renders through
 * something built for another page. `pointsList` is the guides' PointList,
 * `calloutCta` is their CtaBand, a table row's status is their StatusChip, and
 * `faqBlock` is the FAQ accordion. Nothing here invents a treatment, so a
 * reader moving from a migration guide to a post cannot tell that one is a
 * file and the other is a CMS document.
 *
 * The measure and rhythm are the guides' long-form treatment: a single 68ch
 * column, H2s opening a new stretch of reading at 64px, and hairlines only
 * where a block genuinely ends a thought.
 */

/** Reading measure, shared by the body and the blocks that sit inside it. */
const MEASURE = "max-w-[68ch]";

/** Clears the sticky site header plus the article navigator when jumping. */
const ANCHOR_OFFSET = "scroll-mt-32";

export function PostBody({ post }: { post: Post }) {
  const { byKey } = headingAnchors(post.body);

  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="!pb-14 !pt-4 md:!pb-20"
    >
      <div className={cn(MEASURE, "[&>*:first-child]:mt-0")}>
        <PortableText value={post.body} components={components(byKey)} />
      </div>
    </Section>
  );
}

/**
 * The serializers are built per render because the heading ids depend on the
 * document: the same walk that feeds the navigator hands each H2/H3 its id, so
 * the two can never disagree about where a link lands.
 */
function components(byKey: Record<string, string>): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <p className="mt-6 text-body leading-relaxed text-light-muted">
          {children}
        </p>
      ),
      h2: ({ value, children }) => (
        <h2
          id={byKey[(value as PortableTextBlock)._key ?? ""]}
          className={cn(
            "mt-16 font-display text-h2 font-medium leading-tight tracking-tight text-balance",
            ANCHOR_OFFSET,
          )}
        >
          {children}
        </h2>
      ),
      h3: ({ value, children }) => (
        <h3
          id={byKey[(value as PortableTextBlock)._key ?? ""]}
          className={cn(
            "mt-10 font-display text-h3 font-medium leading-snug tracking-tight text-balance",
            ANCHOR_OFFSET,
          )}
        >
          {children}
        </h3>
      ),
      // A pulled quote, marked by a single accent hairline rather than quote
      // glyphs or a tinted card. Elevation comes from rules here (CLAUDE.md §15).
      blockquote: ({ children }) => (
        <blockquote className="mt-8 border-l-2 border-accent-line pl-6 text-body-lg font-medium leading-relaxed text-light-text">
          {children}
        </blockquote>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="mt-6 flex flex-col gap-3">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="mt-6 flex flex-col gap-3">{children}</ol>
      ),
    },

    listItem: {
      // Same marker as PointList, so a plain bullet and a labelled point read
      // as one list system rather than two.
      bullet: ({ children }) => (
        <li className="flex gap-3 text-body leading-relaxed text-light-muted">
          <span
            aria-hidden
            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>{children}</span>
        </li>
      ),
      number: ({ children, index }) => (
        <li className="flex gap-3 text-body leading-relaxed text-light-muted">
          {/* Body-sized rather than a mono label: an inline marker has to sit
              on the same baseline as the sentence it numbers. */}
          <span
            aria-hidden
            className="w-5 shrink-0 text-body font-medium leading-relaxed text-light-text"
          >
            {`${(index ?? 0) + 1}.`}
          </span>
          <span>{children}</span>
        </li>
      ),
    },

    marks: {
      strong: ({ children }) => (
        <strong className="font-medium text-light-text">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ value, children }) => {
        const href = (value?.href as string) ?? "";
        const cls =
          "underline decoration-light-border underline-offset-4 transition hover:decoration-accent hover:text-light-text";
        if (isInternal(href)) {
          return (
            <Link href={href} className={cls}>
              {children}
            </Link>
          );
        }
        return (
          <a
            href={href}
            className={cls}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
    },

    types: {
      pointsList: ({ value }: { value: PostPointsListBlock }) => (
        <div className="mt-8">
          {value.lead ? (
            <p className="text-body text-light-muted">{value.lead}</p>
          ) : null}
          <PointList points={value.points ?? []} tone="light" />
        </div>
      ),

      calloutCta: ({ value }: { value: PostCalloutCtaBlock }) => (
        <div className="mt-10">
          <CtaBand
            heading={value.heading}
            paragraph={value.paragraph}
            ctas={[{ label: value.ctaLabel, href: value.ctaHref }]}
            tone="light"
          />
        </div>
      ),

      faqBlock: ({ value }: { value: PostFaqBlock }) => (
        <div className="mt-10">
          <FaqAccordion items={value.items ?? []} />
        </div>
      ),

      comparisonTable: ({ value }: { value: PostComparisonTableBlock }) => (
        <ComparisonBlock value={value} />
      ),

      image: ({ value }: { value: PostImageBlock }) => {
        if (!value.url) return null;
        return (
          <figure className="mt-10">
            <div className="overflow-hidden rounded-card border border-light-border">
              <Image
                src={value.url}
                alt={value.alt ?? ""}
                width={value.width ?? 1600}
                height={value.height ?? 900}
                sizes="(max-width: 768px) 100vw, 68ch"
                className="h-auto w-full"
                {...(value.lqip
                  ? { placeholder: "blur" as const, blurDataURL: value.lqip }
                  : {})}
              />
            </div>
            {value.caption ? (
              <figcaption className="mt-3 text-body text-light-muted">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },

      // No syntax highlighting: the site has no code styling to match, and a
      // highlighter is a dependency and a theme decision for a marketing blog
      // that will print the odd redirect rule.
      codeBlock: ({ value }: { value: PostCodeBlock }) => (
        <pre
          className="mt-8 overflow-x-auto rounded-card border border-light-border bg-light-surface p-5 font-mono text-label leading-relaxed text-light-text"
          {...(value.language ? { "data-language": value.language } : {})}
        >
          <code>{value.code}</code>
        </pre>
      ),
    },
  };
}

/**
 * A columnar table at the body's measure. It scrolls inside its own container
 * so a wide table never makes the page scroll sideways on a phone, which is
 * the same rule the legal pages and the homepage matrix follow.
 *
 * When any row carries a status, the four-state chip gets a trailing column of
 * its own rather than being crammed into the first cell. The header for it is
 * screen-reader only: the chips are self-labelling, so a visible "Status"
 * heading would say the same word twice.
 */
function ComparisonBlock({ value }: { value: PostComparisonTableBlock }) {
  const columns = value.columns ?? [];
  const rows = value.rows ?? [];
  const hasStatus = rows.some((row) => row.status);

  return (
    <figure className="mt-10">
      <div className="overflow-x-auto rounded-card border border-light-border">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-light-border bg-light-surface">
              {columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-5 py-3 font-mono text-label font-normal uppercase track-label text-light-muted"
                >
                  {col}
                </th>
              ))}
              {hasStatus ? (
                <th scope="col" className="px-5 py-3">
                  <span className="sr-only">Status</span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-light-border">
            {rows.map((row, ri) => (
              <tr key={row.cells?.join("|") ?? ri}>
                {(row.cells ?? []).map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "px-5 py-4 align-top text-body leading-relaxed",
                      ci === 0
                        ? "font-medium text-light-text"
                        : "text-light-muted",
                    )}
                  >
                    {cell}
                  </td>
                ))}
                {hasStatus ? (
                  <td className="px-5 py-4 align-top">
                    {row.status ? <StatusChip status={row.status} /> : null}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {value.caption ? (
        <figcaption className="mt-3 text-body text-light-muted">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
