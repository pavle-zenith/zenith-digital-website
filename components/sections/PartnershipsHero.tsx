import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { pHero } from "@/content/partnerships";

/**
 * /partnerships hero — dark, compact, on the faint navy texture. Eyebrow pill,
 * H1, subhead, the two conversion CTAs, and a thin trust row under a hairline.
 */
export function PartnershipsHero() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background (same register as the other dark bands) */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/bg-texture.png"
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          aria-hidden
        />
      </div>

      <Section
        tone="dark"
        divide={false}
        className="bg-transparent"
        frameClassName="!py-24"
      >
        <span className="inline-flex w-fit items-center rounded-full border border-border px-3.5 py-1.5 font-mono text-label uppercase track-label text-text-muted">
          {pHero.eyebrow}
        </span>

        <h1 className="mt-8 max-w-3xl font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
          {pHero.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg font-medium leading-relaxed text-text-muted">
          {pHero.subhead}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {pHero.ctas.map((cta) => (
            <Button key={cta.href} cta={cta} tone="dark" />
          ))}
        </div>

        {/* Thin trust row */}
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
          {pHero.trust.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-body font-medium"
            >
              <Check />
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4 10-10" />
    </svg>
  );
}
