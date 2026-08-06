import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { csGallery } from "@/content/case-studies";

/**
 * Auto-sliding gallery of vertical client artwork right under the /case-studies
 * hero (Stripe startups-carousel look, but a continuous marquee). Portrait
 * cards bleed to the frame rails; the track duplicates the set so the 50%
 * translate loops seamlessly. Pauses under reduced motion via the global media
 * query. Artwork is owner-supplied via csGallery; currently one placeholder.
 */
export function WorkGallery() {
  // Pad the base set to at least 6 cards so a small (or single-placeholder)
  // set still fills the track.
  const count = Math.max(6, csGallery.items.length);
  const base = Array.from(
    { length: count },
    (_, i) => csGallery.items[i % csGallery.items.length],
  );
  const track = [...base, ...base];

  return (
    <Section tone="light" frameClassName="!py-10">
      <div className="frame-bleed overflow-hidden">
        <div className="flex w-max animate-marquee-slow gap-6">
          {track.map((item, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] w-[280px] shrink-0 overflow-hidden rounded-[8px] bg-light-surface sm:w-[320px] lg:w-[340px]"
            >
              <Image
                src={item.image}
                alt={i < base.length ? item.alt : ""}
                fill
                sizes="340px"
                className="object-cover"
                aria-hidden={i >= base.length}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
