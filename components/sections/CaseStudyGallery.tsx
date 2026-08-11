import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import type {
  CaseStudyDetail,
  CaseStudyGalleryImage,
} from "@/content/case-studies";

/**
 * Visual gallery — the gallery images left over after the challenge section
 * took the first one, in an alternating full-width/two-up rhythm, then the
 * before/after slider and the (muted, looping) walkthrough video when the
 * study has them. Renders nothing when there's nothing left to show.
 */
export function CaseStudyGallery({ study }: { study: CaseStudyDetail }) {
  const images = study.gallery?.slice(1) ?? [];
  if (images.length === 0 && !study.beforeAfter && !study.video) return null;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="flex flex-col gap-10 md:gap-16">
        {chunkRhythm(images).map((row) =>
          row.length === 2 ? (
            <div
              key={row[0].src}
              className="grid gap-6 md:grid-cols-2 md:gap-8"
            >
              {row.map((img) => (
                <GalleryFigure key={img.src} image={img} aspect="aspect-[4/3]" />
              ))}
            </div>
          ) : (
            <GalleryFigure
              key={row[0].src}
              image={row[0]}
              aspect="aspect-[16/10] md:aspect-[2/1]"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          ),
        )}

        {study.beforeAfter ? (
          <div>
            <h3 className="font-display text-h3 font-medium leading-tight">
              Before and after
            </h3>
            <div className="mx-auto mt-6 max-w-4xl">
              <BeforeAfterSlider
                title={study.client}
                before={study.beforeAfter.before}
                after={study.beforeAfter.after}
                caption={false}
                frameClassName="aspect-[4/3] rounded-card border border-light-border"
              />
            </div>
          </div>
        ) : null}

        {study.video ? (
          <video
            src={study.video}
            muted
            autoPlay
            loop
            playsInline
            controls
            className="w-full rounded-card border border-light-border"
          />
        ) : null}
      </div>
    </Section>
  );
}

function GalleryFigure({
  image,
  aspect,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  image: CaseStudyGalleryImage;
  aspect: string;
  sizes?: string;
}) {
  return (
    <figure>
      <div
        className={`relative overflow-hidden rounded-card border border-light-border bg-light-surface ${aspect}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
      {image.caption ? (
        <figcaption className="mt-3 font-mono text-label uppercase track-label text-light-muted">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Full-width, pair, full-width, pair… — a trailing single renders full. */
function chunkRhythm(items: CaseStudyGalleryImage[]): CaseStudyGalleryImage[][] {
  const rows: CaseStudyGalleryImage[][] = [];
  let i = 0;
  let pair = false;
  while (i < items.length) {
    const take = pair ? Math.min(2, items.length - i) : 1;
    rows.push(items.slice(i, i + take));
    i += take;
    pair = !pair;
  }
  return rows;
}
