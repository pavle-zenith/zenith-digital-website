import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * No-dead-ends band (byCrawford): the next shipped study's outcome headline
 * with its thumb, plus a small route back to the index. While only one study
 * has a detail page there is no "next", so the band is just the index link.
 */
export function CaseStudyNext({ next }: { next: CaseStudyDetail | null }) {
  if (!next) {
    return (
      <Section tone="dark" frameClassName="!py-12 md:!py-16">
        <Link
          href="/case-studies"
          className="group flex items-baseline justify-between gap-6"
        >
          <span className="font-display text-h2 font-medium leading-tight tracking-tight">
            All case studies
          </span>
          <span aria-hidden className="btn-arrow font-display text-h2">
            &rarr;
          </span>
        </Link>
      </Section>
    );
  }

  return (
    <Section tone="dark" frameClassName="!py-12 md:!py-16">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16">
        <div>
          <span className="font-mono text-label uppercase track-label text-text-muted">
            Next case study
          </span>
          <Link
            href={`/case-studies/${next.slug}`}
            className="group mt-3 block max-w-2xl"
          >
            <span className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
              {next.headline}{" "}
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </span>
          </Link>
          <Link
            href="/case-studies"
            className="mt-6 inline-flex items-baseline gap-2 font-medium text-text-muted transition hover:text-text"
          >
            <span aria-hidden className="arrow-glyph">
              &larr;
            </span>{" "}
            All case studies
          </Link>
        </div>
        {next.thumb ? (
          <Link
            href={`/case-studies/${next.slug}`}
            className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden rounded-card border border-border md:w-80"
          >
            <Image
              src={next.thumb}
              alt={`${next.client} website`}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-top"
            />
          </Link>
        ) : null}
      </div>
    </Section>
  );
}
