import Image from "next/image";

import { Section } from "@/components/ui/Section";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * "The challenge" — light section, written from the client's world. Copy on
 * the left, the study's first gallery image alongside (the section still
 * reads complete without one).
 */
export function CaseStudyChallenge({ study }: { study: CaseStudyDetail }) {
  const image = study.gallery?.[0];

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
            The challenge
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            {study.challenge.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-xl text-body-lg leading-relaxed text-light-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        {image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-light-border bg-light-surface">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
