import { MetaStrip } from "@/components/sections/MetaStrip";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * Project facts strip: client, industry, engagement, timeline, platform, and
 * the live-site link. The strip itself is the shared MetaStrip (the blog's
 * post byline uses the same one); this file only decides which facts a case
 * study states and what its trailing action is.
 */
export function CaseStudyMetaStrip({ study }: { study: CaseStudyDetail }) {
  return (
    <MetaStrip
      rows={[
        { label: "Client", value: study.client },
        { label: "Industry", value: study.meta.industry },
        { label: "Engagement", value: study.meta.engagementType },
        { label: "Timeline", value: study.meta.timeline },
        { label: "Platform", value: study.meta.platform },
      ]}
    >
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
    </MetaStrip>
  );
}
