"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import {
  INDUSTRIES,
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
  const visible = industry
    ? caseStudyCards.filter((c) => c.industry === industry)
    : caseStudyCards;

  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      {/* Filter pills — a horizontal scroll rail on phones (nine stacked rows
          is too much), wrapping normally from md up. The phone bleed uses
          max-md utilities rather than .frame-bleed: that class is unlayered
          CSS, so a md:mx-0 utility can never outrank it and the rail would go
          on ignoring the section gutter on desktop. */}
      <div className="mb-10 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] max-md:mx-[calc(-1*clamp(20px,4vw,64px))] max-md:px-[clamp(20px,4vw,64px)] md:flex-wrap md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
        <FilterPill active={industry === null} onClick={() => onSelect?.(null)}>
          All
        </FilterPill>
        {(Object.keys(INDUSTRIES) as IndustrySlug[]).map((slug) => (
          <FilterPill
            key={slug}
            active={industry === slug}
            onClick={() => onSelect?.(slug)}
          >
            {INDUSTRIES[slug]}
          </FilterPill>
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
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
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

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        // shrink-0 so the rail scrolls on phones instead of squeezing every
        // pill onto one line. No scroll snapping: snap-start would align the
        // first pill to the scrollport edge and swallow the rail's gutter.
        "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-body font-medium transition",
        active
          ? "border-accent bg-accent text-accent-ink"
          : "border-light-border text-light-text hover:bg-light-surface",
      )}
    >
      {children}
    </button>
  );
}
