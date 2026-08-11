import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * Two-up project media, between the introduction and the written story. A
 * before/after slider takes the first slot when the study has one, and
 * screenshot stills fill whatever is left, so a study ships either as
 * before/after plus a still or as two stills. Renders nothing without media.
 */
export function CaseStudyMedia({ study }: { study: CaseStudyDetail }) {
  const stills = study.gallery ?? [];
  const stillCount = study.beforeAfter ? 1 : 2;
  const shown = stills.slice(0, stillCount);
  if (!study.beforeAfter && shown.length === 0) return null;

  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {study.beforeAfter ? (
          <BeforeAfterSlider
            title={study.client}
            before={study.beforeAfter.before}
            after={study.beforeAfter.after}
            caption={false}
            frameClassName="aspect-[4/3] rounded-card border border-light-border"
          />
        ) : null}

        {shown.map((image) => (
          <figure key={image.src} className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-light-border bg-light-surface">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {image.caption ? (
              <figcaption className="font-mono text-label uppercase track-label text-light-muted">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </Section>
  );
}
