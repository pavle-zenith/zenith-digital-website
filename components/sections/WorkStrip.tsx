import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { StatMedia } from "@/components/ui/StatMedia";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { Button } from "@/components/ui/Button";
import {
  INDUSTRIES,
  caseStudies,
  caseStudyCards,
  caseStudyDetails,
  detailSlugs,
} from "@/content/case-studies";

/**
 * Per-service case studies in the PartnerStories row register, under the
 * sitewide "Real examples" heading: each case is a full-width row under
 * shared hairlines. Site shot left with the labelled stats riding its bottom
 * edge in a translucent blur bar; right: client wordmark + industry pill,
 * outcome headline, one-line story, the case-study CTA with "Book a call" as
 * the secondary, and the client's quote card pinned to the row bottom.
 *
 * Rows resolve from the shared case-study content via each page's
 * `workSlugs` — featured panel first, then the detail study (headline,
 * stats, testimonial), then the grid card — nothing is retyped here. Content
 * picks slugs whose studies carry real stats and a quote, so rows arrive
 * fully dressed; a slug without them still renders with whatever it has.
 * Falls back to the sitewide featured four when a page names none.
 */
export function WorkStrip({
  slugs,
  heading = caseStudies.heading,
  intro = caseStudies.intro,
}: {
  slugs?: string[];
  /** Override the sitewide "Real examples" header, for pages whose selection
      needs its own framing (the migration guides name the source platform). */
  heading?: string;
  intro?: string;
}) {
  const featuredBySlug = new Map(caseStudies.items.map((i) => [i.slug, i]));
  const detailBySlug = new Map(caseStudyDetails.map((d) => [d.slug, d]));
  const wanted = slugs?.length ? slugs : caseStudies.items.map((i) => i.slug);

  const rows = wanted.flatMap((slug) => {
    const card = caseStudyCards.find((c) => c.slug === slug);
    if (!card) return [];
    const featured = featuredBySlug.get(slug);
    const detail = detailBySlug.get(slug);
    const title = featured?.title ?? detail?.headline ?? card.story;
    return [
      {
        slug,
        name: card.client,
        pill: INDUSTRIES[card.industry],
        title,
        story: title === card.story ? undefined : card.story,
        // Two stats max in the blur bar; three crowds the shot.
        stats: (
          featured?.stats ??
          detail?.stats ?? [
            {
              value: card.metricIsQuote ? `“${card.metric}”` : card.metric,
              label: "",
            },
          ]
        ).slice(0, 2),
        quote: detail?.testimonial,
        image: card.thumb,
        detail: detailSlugs.has(slug),
        liveUrl: card.liveUrl,
      },
    ];
  });

  if (rows.length === 0) return null;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      {/* Header: heading left, support right */}
      <div className="mb-4 grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {heading}
        </h2>
        {/* max-w-md left a 50-word intro running six short lines against the
            heading. 2xl fills the column it already sits in, so it settles to
            three or four. */}
        <p className="max-w-2xl text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
          {intro}
        </p>
      </div>

      {/* Case rows — the track bleeds to the frame rails so the dividing
          hairlines run edge to edge; each row re-applies the gutter. */}
      <div className="frame-bleed-md divide-y divide-light-border">
        {rows.map((row) => (
          <article
            key={row.slug}
            className="grid gap-8 px-0 py-10 last:pb-0 md:px-[clamp(20px,4vw,64px)] md:py-14 lg:grid-cols-2 lg:gap-16"
          >
            {/* Media: site shot with its numbers. Over the shot from sm up,
                stacked underneath on phones (see StatMedia). */}
            <StatMedia
              src={row.image}
              alt={`${row.name} website`}
              stats={row.stats}
            />

            {/* Details — a flex column so the quote can pin to the bottom */}
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-body-lg font-medium">
                  {row.name}
                </span>
                <span className="rounded-full border border-light-border px-3 py-1 font-mono text-[11px] uppercase track-label text-light-muted">
                  {row.pill}
                </span>
              </div>

              <h3 className="mt-6 font-display text-h3 font-medium leading-snug tracking-tight text-balance">
                {row.title}
              </h3>
              {row.story ? (
                <p className="mt-3 max-w-xl text-body leading-relaxed text-light-muted">
                  {row.story}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                {row.detail ? (
                  <Button
                    cta={{
                      label: "Read the case study",
                      href: `/case-studies/${row.slug}`,
                      variant: "primary",
                    }}
                    tone="light"
                  />
                ) : row.liveUrl ? (
                  <Button
                    cta={{
                      label: "View live site",
                      href: row.liveUrl,
                      variant: "primary",
                    }}
                    tone="light"
                  />
                ) : null}
                <Button
                  cta={{
                    label: "Book a call",
                    href: "/book-a-call",
                    variant: "secondary",
                  }}
                  tone="light"
                />
              </div>

              {/* Quote card — pinned to the column bottom (the spacer absorbs
                  spare height, mt-8 keeps a minimum gap) */}
              {row.quote ? (
                <>
                  <div className="flex-1" aria-hidden />
                  <figure className="mt-8 rounded-[8px] bg-light-surface p-6">
                    <blockquote className="text-body leading-relaxed text-light-text">
                      &ldquo;{row.quote.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      {row.quote.avatar ? (
                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[6px]">
                          <Image
                            src={row.quote.avatar}
                            alt={row.quote.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </span>
                      ) : null}
                      <span>
                        <span className="flex items-center gap-1.5 font-display font-medium">
                          {row.quote.name}
                          <VerifiedCheck className="text-light-text" />
                        </span>
                        <span className="block text-body text-light-muted">
                          {row.quote.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
