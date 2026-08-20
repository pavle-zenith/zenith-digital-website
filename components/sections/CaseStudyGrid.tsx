"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Section } from "@/components/ui/Section";
import { FilterTab } from "@/components/ui/FilterTab";
import { cn } from "@/lib/utils";
import {
  INDUSTRIES,
  INDUSTRY_FILTER_LABELS,
  caseStudyCards,
  detailSlugs,
  type IndustrySlug,
} from "@/content/case-studies";

/**
 * Full project grid with the industry filter bar. Filtering is client-side
 * (small dataset) and synced to ?industry= in the URL so filtered views are
 * shareable and future /industries/[slug] pages can deep-link a pre-filtered
 * grid. All cards are server-rendered; the filter only hides cards on the
 * client. A card links to its detail page once the study ships one (the
 * live-site link moves inside that page); until then it links to the live
 * site — all data-driven, no per-card code.
 */
export function CaseStudyGrid() {
  return (
    <Suspense fallback={<GridInner industry={null} onSelect={null} />}>
      <FilterableGrid />
    </Suspense>
  );
}

function FilterableGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const raw = params.get("industry");
  const industry = raw && raw in INDUSTRIES ? (raw as IndustrySlug) : null;

  const select = (slug: IndustrySlug | null) => {
    router.replace(slug ? `${pathname}?industry=${slug}` : pathname, {
      scroll: false,
    });
  };

  return <GridInner industry={industry} onSelect={select} />;
}

function GridInner({
  industry,
  onSelect,
}: {
  industry: IndustrySlug | null;
  onSelect: ((slug: IndustrySlug | null) => void) | null;
}) {
  // Studies with a written detail page lead the grid, in every filtered view
  // too: those cards say "Read the case study" and keep the reader on the site,
  // where the rest send them straight out to the client's domain. Sorting here
  // rather than hand-ordering the data means shipping a new study promotes it
  // automatically. `sort` is stable, so the data order holds within each group.
  const visible = (
    industry
      ? caseStudyCards.filter((c) => c.industry === industry)
      : caseStudyCards
  )
    .slice()
    .sort(
      (a, b) =>
        Number(detailSlugs.has(b.slug)) - Number(detailSlugs.has(a.slug)),
    );

  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      {/* Filter pills — one row, always. The row never wraps: wrapping is what
          stranded a lone pill on a second row. The nine pills measure 947px, so
          they sit still from xl up (1176px of frame at 1280) and the row becomes
          a horizontal scroll rail below that. The boundary is xl rather than lg
          because at 1024 the frame is only 940px, which would spill 7px of pill
          outside it. The bleed uses max-xl utilities rather than .frame-bleed:
          that class is unlayered CSS, so an xl:mx-0 utility could never outrank
          it and the rail would go on ignoring the section gutter on desktop. */}
      <div className="mb-10 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] max-xl:mx-[calc(-1*clamp(20px,4vw,64px))] max-xl:px-[clamp(20px,4vw,64px)] xl:overflow-visible xl:pb-0 [&::-webkit-scrollbar]:hidden">
        <FilterTab active={industry === null} onClick={() => onSelect?.(null)}>
          All
        </FilterTab>
        {(Object.keys(INDUSTRIES) as IndustrySlug[]).map((slug) => (
          <FilterTab
            key={slug}
            active={industry === slug}
            onClick={() => onSelect?.(slug)}
          >
            {INDUSTRY_FILTER_LABELS[slug]}
          </FilterTab>
        ))}
      </div>

      {/* Card grid — two per row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visible.map((c) => (
          <article
            key={c.slug}
            className="group flex flex-col overflow-hidden rounded-card border border-light-border bg-light-bg"
          >
            {/* Thumb, or the styled wordmark placeholder (never a broken image) */}
            <div className="relative aspect-[16/10] overflow-hidden border-b border-light-border bg-bg">
              {c.thumb ? (
                <Image
                  src={c.thumb}
                  alt={`${c.client} website`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                />
              ) : c.logo ? (
                <div className="flex h-full w-full items-center justify-center">
                  <Image
                    src={c.logo}
                    alt={c.client}
                    width={220}
                    height={56}
                    className="h-8 w-auto max-w-[60%] object-contain opacity-90"
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-h3 font-medium text-text">
                    {c.client}
                  </span>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-body-lg font-medium">
                  {c.client}
                </h3>
                <span className="shrink-0 font-mono text-label uppercase track-label text-light-muted">
                  {INDUSTRIES[c.industry]}
                </span>
              </div>
              <p
                className={cn(
                  "mt-3 font-display text-h3 font-medium leading-tight",
                  c.metricPending && "italic text-light-muted",
                )}
              >
                {c.metricIsQuote ? <>&ldquo;{c.metric}&rdquo;</> : c.metric}
              </p>
              <p className="mt-2 text-body leading-snug text-light-muted">
                {c.story}
              </p>
              {detailSlugs.has(c.slug) ? (
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 font-display text-body font-medium transition group-hover:text-accent"
                >
                  Read the case study{" "}
                  <span aria-hidden className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
              ) : c.liveUrl ? (
                <a
                  href={c.liveUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 font-display text-body font-medium transition group-hover:text-accent"
                >
                  View live site{" "}
                  <span aria-hidden className="btn-arrow">
                    &rarr;
                  </span>
                </a>
              ) : (
                <span className="mt-auto pt-5" aria-hidden />
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
