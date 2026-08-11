import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { tHero } from "@/content/testimonials";

/**
 * /testimonials hero — dark, compact, no CTA buttons (the wall below is the
 * point; nav CTAs cover conversion). H1 + support + a small proof chip row,
 * on the faint studio texture band.
 */
export function TestimonialsHero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>

      <Section
        tone="dark"
        divide={false}
        className="bg-transparent"
        frameClassName="!pb-12 !pt-14 md:!pb-16 md:!pt-24"
      >
        <div className="max-w-3xl">
          <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
            {tHero.heading}
          </h1>
          <p className="mt-6 max-w-xl text-body-lg font-medium leading-relaxed text-text-muted">
            {tHero.support}
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {tHero.chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-body font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
