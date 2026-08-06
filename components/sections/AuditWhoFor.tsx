import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { auditWhoFor } from "@/content/free-website-audit";

/**
 * "Who gets the most out of it" — dark section, three cards with full-bleed
 * background photos under a navy scrim (same gradient base as the case-study
 * panels), title + body pinned to the bottom.
 */
export function AuditWhoFor() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background (same register as pricing) */}
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
      <h2 className="mx-auto mb-12 text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {auditWhoFor.heading}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {auditWhoFor.items.map((item) => (
          <article
            key={item.title}
            className="relative flex min-h-[560px] flex-col justify-between overflow-hidden rounded-card border border-border lg:min-h-[620px]"
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              aria-hidden
            />
            {/* Navy scrim: solid behind the title (top) and body (bottom),
                lighter through the middle so the photo shows */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(1,0,32,0.92) 0%, rgba(1,0,32,0.4) 30%, rgba(1,0,32,0.4) 55%, rgba(1,0,32,0.95) 100%)",
              }}
              aria-hidden
            />
            <h3 className="relative p-7 font-display text-h3 font-medium leading-tight text-balance">
              {item.title}
            </h3>
            <div className="relative p-7">
              <p className="text-body leading-snug text-text">{item.body}</p>
              {"link" in item && item.link ? (
                <Link
                  href={item.link.href}
                  className="group mt-4 inline-flex items-center gap-1.5 font-display text-body font-medium text-text transition hover:text-text-muted"
                >
                  {item.link.label} <span aria-hidden className="btn-arrow">&rarr;</span>
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      </Section>
    </div>
  );
}
