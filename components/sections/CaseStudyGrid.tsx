"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilterTab } from "@/components/ui/FilterTab";
import { cn, servesRaw } from "@/lib/utils";
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
 *
 * Every prop is optional and defaults to /case-studies as it is. A page that
 * must keep the reader off the site's own pages (/partner-showcase) passes
 * `links="live"`: each card then links to the client's live site in a new tab
 * where there is one, and to nothing otherwise, never to /case-studies/*. A
 * `*.wixstudio.com` address is a Wix preview, not the client's site, so in
 * that mode it is not linked either.
 */
type GridOptions = {
  id?: string;
  className?: string;
  heading?: string;
  intro?: string;
  links?: "default" | "live";
};

/** A Wix Studio preview address (site.wixstudio.com/...), not a live site. */
function isPreview(url: string) {
  try {
    return new URL(url).hostname.endsWith(".wixstudio.com");
  } catch {
    return false;
  }
}

export function CaseStudyGrid(options: GridOptions = {}) {
  return (
    <Suspense fallback={<GridInner industry={null} onSelect={null} {...options} />}>
      <FilterableGrid {...options} />
    </Suspense>
  );
}

function FilterableGrid(options: GridOptions) {
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

  return <GridInner industry={industry} onSelect={select} {...options} />;
}

function GridInner({
  industry,
  onSelect,
  id,
  className,
  heading,
  intro,
  links = "default",
}: {
  industry: IndustrySlug | null;
  onSelect: ((slug: IndustrySlug | null) => void) | null;
} & GridOptions) {
  // In "live" mode no card leads to a detail page, so none is promoted.
  const hasDetail = (slug: string) => links === "default" && detailSlugs.has(slug);
  const liveUrl = (url?: string) => (links === "live" && url && isPreview(url) ? undefined : url);

  const visible = (
    industry
      ? caseStudyCards.filter((c) => c.industry === industry)
      : caseStudyCards
  )
    .slice()
    .sort((a, b) => Number(hasDetail(b.slug)) - Number(hasDetail(a.slug)));

  return (
    <Section id={id} tone="light" className={className} frameClassName="!py-12 md:!py-20">
      {heading ? <SectionHeader heading={heading} intro={intro} tone="light" /> : null}
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
                  unoptimized={servesRaw(c.thumb)}
                  alt={`${c.client} website`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                />
              ) : c.logo ? (
                <div className="flex h-full w-full items-center justify-center">
                  <Image
                    src={c.logo}
                    unoptimized={servesRaw(c.logo)}
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
              {hasDetail(c.slug) ? (
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 font-display text-body font-medium transition group-hover:text-accent"
                >
                  Read the case study{" "}
                  <span aria-hidden className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
              ) : liveUrl(c.liveUrl) ? (
                <a
                  href={liveUrl(c.liveUrl)}
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
