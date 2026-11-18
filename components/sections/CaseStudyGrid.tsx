"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilterTab } from "@/components/ui/FilterTab";
import { ProjectCard } from "@/components/ui/ProjectCard";
import {
  INDUSTRIES,
  caseStudyCards,
  detailSlugs,
  inIndustry,
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
 *
 * `industryLinks` maps an industry to its page (built server-side from the
 * published /industries pages, see content/industries). A filtered view whose
 * industry has one shows a link to it above the cards. It's a prop rather than
 * an import so the industry pages' copy never ships in this client bundle.
 */
type GridOptions = {
  id?: string;
  className?: string;
  heading?: string;
  intro?: string;
  links?: "default" | "live";
  industryLinks?: Partial<Record<IndustrySlug, { href: string; label: string }>>;
  /** "Browse by industry" to the hub, beside the pills; omit to hide. */
  browseLink?: { href: string; label: string };
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
  industryLinks,
  browseLink,
}: {
  industry: IndustrySlug | null;
  onSelect: ((slug: IndustrySlug | null) => void) | null;
} & GridOptions) {
  // In "live" mode no card leads to a detail page, so none is promoted.
  const hasDetail = (slug: string) => links === "default" && detailSlugs.has(slug);
  const liveUrl = (url?: string) => (links === "live" && url && isPreview(url) ? undefined : url);

  const visible = (
    industry
      ? caseStudyCards.filter((c) => inIndustry(c, industry))
      : caseStudyCards
  )
    .slice()
    .sort((a, b) => Number(hasDetail(b.slug)) - Number(hasDetail(a.slug)));
  const industryLink = industry ? industryLinks?.[industry] : undefined;

  return (
    <Section id={id} tone="light" className={className} frameClassName="!py-12 md:!py-20">
      {heading ? <SectionHeader heading={heading} intro={intro} tone="light" /> : null}
      {/* Filter pills. Twelve industries plus "All" measure about 1,340px,
          wider than the frame at any width, so the row has two behaviours:
          - Below lg it stays one row and scrolls sideways (a swipe rail that
            bleeds to the screen edge, the scrollbar hidden). The bleed uses
            max-lg utilities rather than .frame-bleed: that class is unlayered
            CSS, so an lg:mx-0 utility could never outrank it.
          - From lg up it wraps, capped at a width that splits the pills into
            two even rows (7 and 6). The pills use the full INDUSTRIES labels
            (one label set sitewide), measured into that cap. Left to wrap at the frame width, the last
            pill dropped alone to a second row, which is the failure the old
            single-row rule existed to prevent. */}
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] max-lg:mx-[calc(-1*clamp(20px,4vw,64px))] max-lg:px-[clamp(20px,4vw,64px)] lg:max-w-[48rem] lg:flex-wrap lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        <FilterTab active={industry === null} onClick={() => onSelect?.(null)}>
          All
        </FilterTab>
        {(Object.keys(INDUSTRIES) as IndustrySlug[]).map((slug) => (
          <FilterTab
            key={slug}
            active={industry === slug}
            onClick={() => onSelect?.(slug)}
          >
            {INDUSTRIES[slug]}
          </FilterTab>
        ))}
      </div>
      {browseLink ? (
        <Link
          href={browseLink.href}
          className="group inline-flex shrink-0 items-center gap-1.5 font-display text-body font-medium transition hover:text-accent lg:mt-2"
        >
          {browseLink.label}{" "}
          <span aria-hidden className="btn-arrow">
            &rarr;
          </span>
        </Link>
      ) : null}
      </div>

      {/* A filtered view points on to that industry's own page. */}
      {industryLink ? (
        <p className="-mt-4 mb-8">
          <Link
            href={industryLink.href}
            className="group inline-flex items-center gap-1.5 font-display text-body font-medium transition hover:text-accent"
          >
            {industryLink.label}{" "}
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </Link>
        </p>
      ) : null}

      {/* Card grid — two per row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visible.map((c) => (
          <ProjectCard
            key={c.slug}
            card={c}
            detail={hasDetail(c.slug)}
            liveUrl={liveUrl(c.liveUrl)}
          />
        ))}
      </div>
    </Section>
  );
}
