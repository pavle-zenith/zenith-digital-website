import Image from "next/image";

import { Section } from "@/components/ui/Section";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * "What changes once this is done" — light, on plain white between the grey
 * `stakes` band and the dark `included` bento, so the three read as three
 * sections rather than one grid repeated.
 *
 * Deliberately the loosest layout on the page: four separated cards in a 2x2,
 * generous padding, larger body type. `stakes` and `included` are both flush
 * hairline meshes, so this one keeps real gaps between bordered cards.
 *
 * No icons and no numbers on these cards (§14): `included` already leads with
 * icons, and an icon per benefit is decoration. `image` is optional and
 * currently unset everywhere; when the owner supplies one it drops into the
 * top of the card at 16:10, edge to edge, without moving the text.
 */
export function ServicePageOutcomes({ data }: { data: ServicePageContent }) {
  const outcomes = data.outcomes;
  if (!outcomes || outcomes.items.length === 0) return null;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {outcomes.heading}
        </h2>
        {outcomes.intro ? (
          <p className="max-w-md text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
            {outcomes.intro}
          </p>
        ) : null}
      </div>

      {/* Tall cards, each carrying its image as the card itself: the shot
          fills the card, a flat navy scrim holds it back, and the copy sits
          over the top. Cards without an image stay solid navy rather than
          leaving a hole in the row. */}
      <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
        {outcomes.items.map((item) => (
          <article
            key={item.title}
            // justify-end drops the copy to the foot of the card, so the shot
            // reads across the open top half.
            className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-card bg-bg text-text md:min-h-[480px]"
          >
            {/* Desaturated and dimmed so a detailed site screenshot reads as
                a background rather than competing with the copy, then a
                single-hue scrim over the lower half where the text sits. The
                scrim is doing legibility work, not decoration: it lets the
                shot stay bright across the open top of the card. */}
            {item.image ? (
              <>
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-45 grayscale"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg via-bg/90 to-transparent"
                  aria-hidden
                />
              </>
            ) : null}

            <div className="relative p-8 md:p-10">
              <h3 className="font-display text-h3 font-medium leading-snug tracking-tight text-balance">
                {item.title}
              </h3>
              {/* Brighter than the usual muted body: this one sits over an
                  image rather than a flat section. */}
              <p className="mt-4 max-w-xl text-body leading-relaxed text-white/85">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
