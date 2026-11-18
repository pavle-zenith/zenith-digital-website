import Image from "next/image";
import Link from "next/link";

import { cn, servesRaw } from "@/lib/utils";
import { INDUSTRIES, type CaseStudyCard } from "@/content/case-studies";

/**
 * One project from the case-study grid: the screenshot (or the client's
 * wordmark, or its name set in the display face, never a broken image), the
 * client, its industry tag, the one metric, the story line, and one link.
 *
 * Shared by the /case-studies grid and the /industries pages so a project
 * looks the same wherever it appears. The caller decides where it links:
 *   - `detail`: the study has a shipped /case-studies/[slug] page.
 *   - `live`:   no detail page, so the client's live site in a new tab.
 *   - neither:  no link (a card whose site isn't live yet).
 *
 * The metric is the card's own field, never retyped: a scope line ("Direct
 * booking site") renders exactly like a result, and a pending one renders
 * muted and italic so it reads as provisional.
 */
export function ProjectCard({
  card,
  detail = false,
  liveUrl,
  sizes = "(max-width: 768px) 100vw, 50vw",
  showIndustry = true,
}: {
  card: CaseStudyCard;
  /** Link to the case study detail page. Wins over `liveUrl`. */
  detail?: boolean;
  /** Live site to link when there's no detail page. */
  liveUrl?: string;
  sizes?: string;
  /** Off on an industry page, where every card shares the page's industry. */
  showIndustry?: boolean;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-light-border bg-light-bg">
      {/* Thumb, or the styled wordmark placeholder (never a broken image) */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-light-border bg-bg">
        {card.thumb ? (
          <Image
            src={card.thumb}
            unoptimized={servesRaw(card.thumb)}
            alt={`${card.client} website`}
            fill
            sizes={sizes}
            className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        ) : card.logo ? (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={card.logo}
              unoptimized={servesRaw(card.logo)}
              alt={card.client}
              width={220}
              height={56}
              className="h-8 w-auto max-w-[60%] object-contain opacity-90"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-h3 font-medium text-text">
              {card.client}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-body-lg font-medium">
            {card.client}
          </h3>
          {showIndustry ? (
            <span className="shrink-0 font-mono text-label uppercase track-label text-light-muted">
              {INDUSTRIES[card.industry]}
            </span>
          ) : null}
        </div>
        <p
          className={cn(
            "mt-3 font-display text-h3 font-medium leading-tight",
            card.metricPending && "italic text-light-muted",
          )}
        >
          {card.metricIsQuote ? <>&ldquo;{card.metric}&rdquo;</> : card.metric}
          {card.metricCredit ? (
            <span className="ml-2 inline-block whitespace-nowrap align-baseline font-body text-body font-normal text-light-muted">
              {card.metricCredit}
            </span>
          ) : null}
        </p>
        <p className="mt-2 text-body leading-snug text-light-muted">
          {card.story}
        </p>
        {detail ? (
          <Link
            href={`/case-studies/${card.slug}`}
            className="mt-auto inline-flex items-center gap-1.5 pt-5 font-display text-body font-medium transition group-hover:text-accent"
          >
            Read the case study{" "}
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </Link>
        ) : liveUrl ? (
          <a
            href={liveUrl}
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
  );
}
