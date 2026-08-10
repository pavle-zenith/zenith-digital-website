import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { auditWhoFor } from "@/content/free-website-audit";

/**
 * "Who gets the most out of it" — dark section, three 3:4 portrait cards with
 * a full-bleed photo and the copy set inside over a bottom-weighted navy
 * scrim (same treatment as the partnerships problem cards).
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

      <Section
        tone="dark"
        className="bg-transparent"
        frameClassName="!py-14 md:!py-24"
      >
        <h2 className="mx-auto mb-8 md:mb-12 text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {auditWhoFor.heading}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {auditWhoFor.items.map((item) => (
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
                  toward the top so the photo shows. */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, #010020 18%, rgba(1,0,32,0.75) 48%, rgba(1,0,32,0.25) 100%)",
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
                {"link" in item && item.link ? (
                  <Link
                    href={item.link.href}
                    className="group mt-4 inline-flex items-center gap-1.5 font-display text-body font-medium text-white transition hover:text-white/70"
                  >
                    {item.link.label}{" "}
                    <span aria-hidden className="btn-arrow">
                      &rarr;
                    </span>
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
