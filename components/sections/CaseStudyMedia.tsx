import Image from "next/image";
import { servesRaw } from "@/lib/utils";

import { Section } from "@/components/ui/Section";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * Project media grid, between the introduction and the written story. Two
 * columns from md up, a single stacked column on mobile: every image is
 * simply on the page, nothing scrolls sideways and nothing hides behind a
 * control. A before/after slider takes the first cell when the study has
 * one; the gallery stills fill the rest. Renders nothing without media.
 *
 * An odd image count leaves the last cell empty rather than stretching the
 * final image to full width: a 4:3 still blown up to double width reads as
 * an error, an empty cell reads as whitespace.
 *
 * Cards keep the 4:3 crop the gallery assets are shot for (supporting images
 * live in /public/case-studies/<slug>/, see the README there).
 *
 * Sits on the inverted studio texture, the ground the page heroes and the
 * scroll-shot band use. The cells themselves are opaque, so the texture reads
 * in the section's padding and the gaps rather than behind the screenshots.
 */
export function CaseStudyMedia({ study }: { study: CaseStudyDetail }) {
  const stills = study.gallery ?? [];
  if (!study.beforeAfter && stills.length === 0) return null;

  return (
    <Section tone="light" frameClassName="relative !py-12 md:!py-20">
      {/* Texture layer — fills the frame column, under the (relative) grid. */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.28] invert"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 88%, transparent) 50%, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {study.beforeAfter ? (
          <BeforeAfterSlider
            title={study.client}
            before={study.beforeAfter.before}
            after={study.beforeAfter.after}
            caption={false}
            frameClassName="aspect-[4/3] rounded-card border border-light-border"
          />
        ) : null}

        {stills.map((image) => (
          <figure key={image.src} className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-light-border bg-light-surface">
              <Image
                src={image.src}
                unoptimized={servesRaw(image.src)}
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
