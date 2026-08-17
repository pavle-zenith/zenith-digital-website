import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  INDUSTRIES,
  caseStudies,
  caseStudyCards,
  detailSlugs,
} from "@/content/case-studies";

/**
 * Per-service case studies in the PartnerStories row register, under the
 * sitewide "Real examples" heading: each case is a full-width row under
 * shared hairlines. Site shot left with the stats riding its bottom edge in
 * a translucent blur bar; right: client wordmark + industry pill, headline,
 * one-line story, then the case-study CTA with "Book a call" as the
 * secondary. Rows resolve from the shared case-study content (the featured
 * panel set first, the grid card as fallback) via each page's `workSlugs`,
 * headline cases leading — nothing is retyped here. Falls back to the
 * sitewide featured four when a page names none.
 */
export function WorkStrip({ slugs }: { slugs?: string[] }) {
  const featuredBySlug = new Map(caseStudies.items.map((i) => [i.slug, i]));
  const wanted = slugs?.length ? slugs : caseStudies.items.map((i) => i.slug);

  const rows = wanted.flatMap((slug) => {
    const card = caseStudyCards.find((c) => c.slug === slug);
    if (!card) return [];
    const featured = featuredBySlug.get(slug);
    return [
      {
        slug,
        name: card.client,
        pill: INDUSTRIES[card.industry],
        title: featured?.title ?? card.story,
        story: featured ? card.story : undefined,
        stats: featured?.stats ?? [
          {
            value: card.metricIsQuote ? `“${card.metric}”` : card.metric,
            label: "",
          },
        ],
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
          {caseStudies.heading}
        </h2>
        <p className="max-w-md text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
          {caseStudies.intro}
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
            {/* Media: site shot with the stats along its bottom edge */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-light-border bg-light-surface">
              {row.image ? (
                <Image
                  src={row.image}
                  alt={`${row.name} website`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-x-10 gap-y-3 rounded-[8px] border border-white/15 bg-bg/55 p-4 backdrop-blur-md">
                {row.stats.map((st) => (
                  <div key={st.value}>
                    <div className="font-display text-h3 font-medium leading-none tracking-tight text-white">
                      {st.value}
                    </div>
                    {st.label ? (
                      <div className="mt-1.5 max-w-[22ch] text-body leading-snug text-white/70">
                        {st.label}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
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
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
