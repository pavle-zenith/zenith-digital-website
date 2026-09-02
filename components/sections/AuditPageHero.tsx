import Image from "next/image";
import { servesRaw } from "@/lib/utils";

import { Section } from "@/components/ui/Section";
import { AuditForm } from "@/components/forms/AuditForm";
import { auditHero } from "@/content/free-website-audit";

/**
 * /free-website-audit hero — dark textured, left/right split (live-site
 * layout). Left: avatar proof row, H1, subhead, and the client logo strip.
 * Right: the white form card with the short trust checks beneath it.
 */
export function AuditPageHero() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background (same register as pricing) */}
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
        frameClassName="!py-12 md:!py-20 lg:!py-32"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: proof, heading, subhead, client logos */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {auditHero.proof.avatars.map((src) => (
                  <span
                    key={src}
                    className="relative h-10 w-10 overflow-hidden rounded-[6px] ring-2 ring-white"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
              <span className="font-display text-body-lg font-medium">
                {auditHero.proof.label}
              </span>
            </div>

            <h1 className="mt-8 max-w-xl font-display text-[clamp(2rem,3.5vw,3rem)] font-medium leading-[1.1] tracking-tight text-balance">
              {auditHero.heading}
            </h1>

            <p className="mt-6 max-w-xl text-body-lg font-medium leading-relaxed text-text/80">
              {auditHero.subhead}
            </p>

            <p className="mt-10 font-display text-body font-medium">
              {auditHero.clientsLabel}
            </p>
            {/* Phones get smaller marks on an even, tighter rhythm — at the
                content heights the row wrapped into a ragged two-line block. */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-5 sm:gap-x-10 sm:gap-y-4">
              {auditHero.clients.map((logo) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  unoptimized={servesRaw(logo.src)}
                  alt={logo.alt}
                  width={180}
                  height={40}
                  className={`${logo.className} w-auto object-contain opacity-90 max-sm:h-4`}
                />
              ))}
            </div>
          </div>

          {/* Right: white form card + trust checks */}
          <div>
            <AuditForm id="audit-form" />
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {auditHero.checks.map((check) => (
                <li
                  key={check}
                  className="flex items-center gap-2 text-body font-medium"
                >
                  <Check />
                  {check}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Check() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-bg">
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 13l4 4 10-10" />
      </svg>
    </span>
  );
}
