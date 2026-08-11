import Image from "next/image";

import { Section } from "@/components/ui/Section";
import type { CaseStudyGalleryImage } from "@/content/case-studies";

/**
 * Full-bleed project screenshot, directly under the meta strip. The image runs
 * rail to rail with no padding, radius, or border (the ServiceShowcase
 * register) so it reads as a band rather than a card. Likely the page's LCP
 * element, hence `priority`.
 */
export function CaseStudyShot({ image }: { image: CaseStudyGalleryImage }) {
  return (
    <Section tone="light" frameClassName="!py-0">
      <div className="frame-bleed relative aspect-[16/9] overflow-hidden md:aspect-[2/1]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          priority
          className="object-cover object-center"
        />
      </div>
    </Section>
  );
}
