import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import {
  GUIDE_ASIDE_GRID_WIDE,
  GUIDE_SECTION_FRAME,
  GuideAside,
  GuideContentCol,
} from "@/components/sections/migration/GuideAside";
import { PostChapters } from "@/components/sections/blog/PostChapters";
import { PostCover } from "@/components/sections/blog/PostCover";
import { AuditPanel } from "@/components/sections/blog/AuditPanel";
import { CtaBand } from "@/components/sections/migration/CtaBand";
import { StatusChip } from "@/components/sections/migration/TransfersTable";
import { PointList } from "@/components/sections/migration/PointList";
import { post as furniture } from "@/content/blog";
import { headingAnchors, NAV_MIN_SECTIONS } from "@/lib/blog";
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
 * The measure and rhythm are the guides' long-form treatment: a single
 * reading column, H2s opening a new stretch of reading at 64px, and hairlines
 * only where a block genuinely ends a thought.
 */

/**
 * Reading measure, shared by the body and the blocks that sit inside it.
 *
 * WIDER THAN THE §7 DEFAULT OF 68ch, and only here. A post's column has the
 * chapters sidebar beside it, which already narrows the text; capping the
 * prose at 68ch on top of that left a band of dead space between the last
 * word and the divider. 78ch closes most of it and still stops well short of
 * the full column. Pages without a sidebar keep 68ch.
 *
 * Kept as a literal rather than composed, because Tailwind only generates an
 * arbitrary value it can read in the source.
 */
const MEASURE = "max-w-[78ch]";

/** Clears the sticky site header plus the article navigator when jumping. */
const ANCHOR_OFFSET = "scroll-mt-32";

/**
 * BODY PROSE IS 18px HERE, one step up from the sitewide 16px.
 *
 * `body-lg` rather than an off-scale value, so this stays inside the §7 type
 * scale. A post is a thousand words of continuous reading in a single column;
 * the rest of the site is short blocks of copy inside layouts, where 16px is
 * right. Only running prose moves: table cells, captions and code keep 16px,
 * because those are scanned rather than read and denser suits them.
 */
const PROSE = "text-body-lg";

/**
 * The article now follows the byline strip rather than sitting straight under
 * the hero, so it opens on a rule and takes the padding that goes with one.
 */
const COLUMN_PAD = "!pt-10 !pb-14 md:!pt-14 md:!pb-20";

export function PostBody({
  post,
  chapters,
}: {
  post: Post;
  chapters: { id: string; label: string }[];
}) {
  const { byKey } = headingAnchors(post.body);

  // The body is rendered in two passes so the lead image can land between the
  // opening paragraphs and the first section. The cut is the first H2, which
  // is the document telling us where the introduction ends: no marker block to
  // author, and no per-post configuration to keep in step with the prose. A
  // post with no H2 at all has no introduction to sit under, so the image
  // leads (cut of 0) rather than being stranded at the end.
  const firstH2 = post.body.findIndex(
    (block) =>
      block._type === "block" && (block as PortableTextBlock).style === "h2",
  );
  const cut = firstH2 === -1 ? 0 : firstH2;
  const serializers = components(byKey);

  const article = (
    // THE MEASURE MOVED OFF THE COLUMN AND ONTO EACH CHILD. The column now
    // runs full width, and every direct child of this div is capped at the
    // reading measure instead. That lets one block opt out with `!max-w-none`
    // and span the whole column, which is what the CTA banners do: an ask
    // reads as a band across the article rather than a box inside the text.
    <div className="[&>*:first-child]:mt-0 [&>*]:max-w-[78ch]">
      {/* The excerpt as a standfirst, opening the article rather than the
          hero. One step up in size from the body and nothing else: it is the
          same sentence a reader met on the index card, so it introduces the
          piece instead of competing with the title above it. */}
      <p className="text-body-lg font-medium leading-relaxed text-light-text">
        {post.excerpt}
      </p>
      {cut > 0 ? (
        <PortableText
          value={post.body.slice(0, cut)}
          components={serializers}
        />
      ) : null}
      <PostCover slug={post.slug} title={post.title} />
      {/* Second pass, same serializers and the same `byKey` map, so every
          heading keeps the id the chapters column is pointing at. */}
      <PortableText value={post.body.slice(cut)} components={serializers} />
    </div>
  );

  // Under three chapters there is nothing to orient in and the column would be
  // a column for its own sake, so the body keeps the full frame to itself.
  // Same threshold, and the same reasoning, as the guides' navigator.
  if (chapters.length < NAV_MIN_SECTIONS) {
    return (
      <Section tone="light" frameClassName="!py-14 md:!py-20">
        <div className={MEASURE}>{article}</div>
      </Section>
    );
  }

  return (
    <Section tone="light" frameClassName={GUIDE_SECTION_FRAME}>
      {/* The guides' aside system, unchanged: article left at the reading
          measure, chapters right, one hairline running the full height between
          them, and the whole thing stacked below lg. */}
      <div className={GUIDE_ASIDE_GRID_WIDE}>
        <GuideContentCol wide className={COLUMN_PAD}>
          {article}
        </GuideContentCol>

        <GuideAside
          label={furniture.chapters.label}
          tone="light"
          className={COLUMN_PAD}
          // A post is longer than a guide section, so the sticky box caps
          // itself to the viewport and scrolls internally rather than running
          // its last chapters, the CTA and the share row off the bottom of a
          // short screen.
          stickyClassName="lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <PostChapters items={chapters} />
        </GuideAside>
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
        <p className={cn("mt-6 leading-relaxed text-light-text", PROSE)}>
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
        <li className={cn("flex gap-3 leading-relaxed text-light-text", PROSE)}>
          <span
            aria-hidden
            className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>{children}</span>
        </li>
      ),
      number: ({ children, index }) => (
        <li className={cn("flex gap-3 leading-relaxed text-light-text", PROSE)}>
          {/* Body-sized rather than a mono label: an inline marker has to sit
              on the same baseline as the sentence it numbers. */}
          <span
            aria-hidden
            className={cn(
              "w-5 shrink-0 font-medium leading-relaxed text-light-text",
              PROSE,
            )}
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
            <p className={cn("leading-relaxed text-light-text", PROSE)}>
              {value.lead}
            </p>
          ) : null}
          <PointList points={value.points ?? []} tone="light" size="body-lg" />
        </div>
      ),

      calloutCta: ({ value }: { value: PostCalloutCtaBlock }) => {
        // THE AUDIT ASK GETS ITS OWN TREATMENT, chosen by where it points
        // rather than by a field an editor has to remember to tick. Any
        // callout aimed at the audit funnel renders as the light panel with
        // the sample report in it; everything else is the dark band.
        const isAudit = value.ctaHref.startsWith("/free-website-audit");
        const cta = { label: value.ctaLabel, href: value.ctaHref };

        // THE AUDIT PANEL DOES NOT BLEED, the dark band does. A photo band
        // gains from running to the rail: the image is the point and it has
        // its own generous inset. The audit panel is a column of type, and
        // bleeding it put the heading hard against the frame rail with nothing
        // between them. It keeps the column's padding and spans the text
        // column instead.
        if (isAudit) {
          return (
            // `!max-w-none` still opts it out of the per-child reading measure,
            // so it fills the column rather than stopping at 78ch.
            <div className="mt-12 !max-w-none">
              <AuditPanel
                heading={value.heading}
                paragraph={value.paragraph}
                ctaLabel={value.ctaLabel}
                ctaHref={value.ctaHref}
              />
            </div>
          );
        }

        return (
          // Two escapes, both needed. `!max-w-none` opts the block out of the
          // per-child reading measure, and the negative margins cancel the
          // column's own padding so the band runs from the frame rail to the
          // vertical divider instead of stopping inside the text column.
          //
          // NOT `frame-bleed`. That utility is declared unlayered in
          // globals.css, so it outranks every Tailwind margin utility no matter
          // what order they are written in, and the `lg` override that should
          // have pulled the right edge back to the column's narrower pr-14
          // padding silently lost. The band then ran 8px past the divider and
          // sat on top of the chapters column. Both sides are plain utilities
          // here so they sort in the same layer and the override actually wins.
          <div className="mt-12 !max-w-none mx-[calc(clamp(20px,4vw,64px)*-1)] lg:mr-[-3.5rem]">
            <CtaBand
              heading={value.heading}
              paragraph={value.paragraph}
              ctas={[cta]}
              tone="light"
              variant="banner"
            />
          </div>
        );
      },

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
                sizes="(max-width: 1024px) 100vw, 700px"
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
                      // Table cells are prose too, so the row's first column
                      // is distinguished by weight rather than by being the
                      // only legible one.
                      ci === 0
                        ? "font-medium text-light-text"
                        : "text-light-text",
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
