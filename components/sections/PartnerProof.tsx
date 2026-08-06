import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { pProof } from "@/content/partnerships";

/**
 * Proof — dark, textured. The one real white-label testimonial (John Smyth /
 * AdVantage) gets the full-width treatment: logo, large quote, attribution.
 * Beneath a hairline: the supporting stats row, then the partner-relationship
 * logo row (not general client logos).
 */
export function PartnerProof() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/bg-texture.png"
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          aria-hidden
        />
      </div>

      <Section tone="dark" className="bg-transparent" frameClassName="!py-24">
        <figure className="mx-auto max-w-4xl text-center">
          <Image
            src={pProof.logo}
            alt={pProof.logoAlt}
            width={200}
            height={48}
            className="mx-auto h-7 w-auto object-contain"
          />
          <blockquote className="mt-10 font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-[1.3] tracking-tight text-balance">
            &ldquo;{pProof.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 text-body-lg">
            <span className="font-display font-medium">{pProof.name}</span>
            <span className="text-text-muted">, {pProof.role}</span>
          </figcaption>
        </figure>

        {/* Supporting stats */}
        <div className="mt-16 grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {pProof.stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-h2 font-medium leading-none tracking-tight">
                {s.value}
              </div>
              <div className="mt-2 max-w-[28ch] text-body text-text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Partner-relationship logos only */}
        <div className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-5">
          {pProof.logos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={34}
              className="h-6 w-auto object-contain opacity-70"
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
