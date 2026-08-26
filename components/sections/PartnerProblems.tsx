import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { pProblems } from "@/content/partnerships";

/**
 * Problem-first beat between the projects slider and the two tracks — a
 * centered headline over three agency situations, each a tall portrait card
 * with the copy set inside the image over a bottom-weighted scrim.
 */
export function PartnerProblems() {
  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      <h2 className="mx-auto mb-8 md:mb-12 max-w-3xl text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {pProblems.heading}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {pProblems.items.map((item) => (
          <article
            key={item.title}
            className="relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-card bg-bg p-8"
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              aria-hidden
            />
            {/* Scrim: solid navy at the bottom for readable text, clearing
                toward the top so the image shows. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, var(--color-scrim) 18%, color-mix(in srgb, var(--color-scrim) 75%, transparent) 48%, color-mix(in srgb, var(--color-scrim) 25%, transparent) 100%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <h3 className="font-display text-h3 font-medium leading-tight text-white text-balance">
                {item.title}
              </h3>
              <p className="mt-3 text-body-lg leading-snug text-white/80">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
