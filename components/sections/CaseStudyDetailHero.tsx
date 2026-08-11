import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Pill";
import { INDUSTRIES, type CaseStudyDetail } from "@/content/case-studies";

/**
 * Detail-page hero — dark, on the faint studio texture. Breadcrumb, client
 * mark + industry tag, the outcome-led H1, the 2–3 stat trio, and the
 * metadata card (right on desktop, below on mobile). The live-site link lives
 * here in the card — index cards point at the detail page, not the live site.
 */
export function CaseStudyDetailHero({ study }: { study: CaseStudyDetail }) {
  const metaRows = [
    { label: "Industry", value: study.meta.industry },
    { label: "Engagement", value: study.meta.engagementType },
    { label: "Timeline", value: study.meta.timeline },
    { label: "Platform", value: study.meta.platform },
  ];

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>

      <Section
        tone="dark"
        divide={false}
        className="bg-transparent"
        frameClassName="!pb-14 !pt-10 md:!pb-20 md:!pt-14"
      >
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-label uppercase track-label text-text-muted"
        >
          <Link href="/case-studies" className="transition hover:text-text">
            Case studies
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-text">{study.client}</span>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 md:mt-14">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              {study.logo ? (
                <Image
                  src={study.logo}
                  alt={study.client}
                  width={220}
                  height={56}
                  className="h-7 w-auto object-contain"
                />
              ) : (
                <span className="font-display text-body-lg font-medium">
                  {study.client}
                </span>
              )}
              <Pill>{INDUSTRIES[study.industry]}</Pill>
            </div>

            <h1 className="mt-6 max-w-3xl font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
              {study.headline}
            </h1>

            {study.heroMetrics.length > 0 ? (
              <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:gap-0 sm:divide-x sm:divide-border">
                {study.heroMetrics.map((m) => (
                  <div key={m.label} className="sm:px-10 sm:first:pl-0 sm:last:pr-0">
                    <div className="font-display text-h1 font-medium leading-none">
                      {m.value}
                    </div>
                    <div className="mt-2 text-body text-text-muted">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Metadata card (byCrawford register) */}
          <aside className="self-end overflow-hidden rounded-card border border-border bg-surface">
            <dl className="divide-y divide-border">
              {metaRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 px-6 py-4"
                >
                  <dt className="font-mono text-label uppercase track-label text-text-muted">
                    {row.label}
                  </dt>
                  <dd className="text-right font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
            {study.meta.liveUrl ? (
              <a
                href={study.meta.liveUrl}
                target="_blank"
                rel="noopener"
                className="group flex items-baseline justify-between gap-6 border-t border-border px-6 py-4 font-display font-medium transition hover:bg-surface-2"
              >
                View live site{" "}
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </a>
            ) : null}
          </aside>
        </div>
      </Section>
    </div>
  );
}
