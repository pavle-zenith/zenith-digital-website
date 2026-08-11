import { Section } from "@/components/ui/Section";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * Project facts strip — sits directly under the hero: client, industry,
 * engagement, timeline, platform, and the live-site link. A quiet single row
 * on desktop (hairline-divided, first cell flush to the frame gutter), a
 * two-column stack on phones. Rows with no data are dropped.
 */
export function CaseStudyMetaStrip({ study }: { study: CaseStudyDetail }) {
  const rows = [
    { label: "Client", value: study.client },
    { label: "Industry", value: study.meta.industry },
    { label: "Engagement", value: study.meta.engagementType },
    { label: "Timeline", value: study.meta.timeline },
    { label: "Platform", value: study.meta.platform },
  ].filter((r) => r.value);

  return (
    <Section tone="light" frameClassName="!py-6 md:!py-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:flex sm:flex-wrap sm:items-baseline sm:gap-0 sm:divide-x sm:divide-light-border">
          {rows.map((row) => (
            <div key={row.label} className="sm:px-8 sm:first:pl-0">
              <dt className="font-mono text-label uppercase track-label text-light-muted">
                {row.label}
              </dt>
              <dd className="mt-1.5 font-display font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>

        {study.meta.liveUrl ? (
          <a
            href={study.meta.liveUrl}
            target="_blank"
            rel="noopener"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-[6px] border border-light-border px-5 py-2.5 font-display text-body font-medium transition hover:bg-light-surface lg:self-auto"
          >
            View live site{" "}
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </a>
        ) : null}
      </div>
    </Section>
  );
}
