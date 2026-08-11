import { Section } from "@/components/ui/Section";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * Project facts strip — sits directly under the hero: client, industry,
 * engagement, timeline, platform, and the live-site link. A quiet single row
 * from sm up (hairline-divided, first cell flush to the frame gutter). On
 * phones it stacks into one hairline-divided column, label left and value
 * right, closing with the live-site link as a full-width button. Rows with no
 * data are dropped.
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
        <dl className="flex flex-col divide-y divide-light-border sm:flex-row sm:flex-wrap sm:items-baseline sm:divide-x sm:divide-y-0">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-6 py-3 first:pt-0 sm:block sm:py-0 sm:px-8 sm:first:pl-0"
            >
              <dt className="font-mono text-label uppercase track-label text-light-muted">
                {row.label}
              </dt>
              <dd className="text-right font-display font-medium sm:mt-1.5 sm:text-left">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {study.meta.liveUrl ? (
          <a
            href={study.meta.liveUrl}
            target="_blank"
            rel="noopener"
            className="group inline-flex w-full shrink-0 items-center justify-center gap-2 self-start rounded-[6px] border border-light-border px-5 py-3 font-display text-body font-medium transition hover:bg-light-surface sm:w-auto sm:py-2.5 lg:self-auto"
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
