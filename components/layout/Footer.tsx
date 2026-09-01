import Image from "next/image";
import Link from "next/link";

import { AskAi } from "@/components/layout/AskAi";
import { FooterClock } from "@/components/layout/FooterClock";
import { footer } from "@/content/home";
import { isFlatMark } from "@/lib/utils";

/**
 * Footer (light, live-site layout). Top: mission paragraph left, three live city
 * clocks right. Then a hairline and the link columns (Company / Zenith resources
 * / Contact information). Below, the partner logo strip with a boxed free-audit
 * CTA on the right (in place of socials). A meta bar carries the copyright and
 * legal links, and the giant uppercase wordmark blends up from the very bottom.
 */
export function Footer() {
  return (
    <footer className="tone-light overflow-hidden bg-light-bg text-light-text">
      {/* Mission + city clocks — top rule confined to the frame column */}
      <div className="frame frame-divide flex flex-col justify-between gap-10 pb-12 pt-16 md:flex-row md:items-start">
        <p className="max-w-md text-body-lg">{footer.mission}</p>
        <div className="flex gap-12">
          {footer.clocks.map((c) => (
            <FooterClock key={c.city} city={c.city} tz={c.tz} />
          ))}
        </div>
      </div>

      {/* Middle of the footer — link columns + partner strip share one
          inverted-texture layer, confined to the frame column and fading out
          into the white footer at its top and bottom edges. */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-[var(--container-site)] -translate-x-1/2 overflow-hidden"
          aria-hidden
        >
          <Image
            src="/textures/studio-texture.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.28] invert"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 92%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 60%, color-mix(in srgb, var(--color-light-bg) 20%, transparent) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, var(--color-light-bg) 0%, transparent 18%, transparent 82%, var(--color-light-bg) 100%)",
            }}
          />
        </div>

        <div className="frame frame-divide relative py-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <div className="grid max-w-3xl grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3">
              {footer.columns.map((col) => (
                <div key={col.heading}>
                  <h3 className="mb-5 font-mono text-label uppercase track-label text-light-muted">
                    {col.heading}
                  </h3>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="font-display font-medium transition hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Contact information */}
              <div>
                <h3 className="mb-5 font-mono text-label uppercase track-label text-light-muted">
                  {footer.contact.heading}
                </h3>
                <ul className="space-y-3 font-display font-medium">
                  <li>
                    <a
                      href={`mailto:${footer.contact.email}`}
                      className="transition hover:text-accent"
                    >
                      {footer.contact.email}
                    </a>
                  </li>
                  <li>{footer.contact.city}</li>
                  <li>
                    <a
                      href={`tel:${footer.contact.phone.replace(/\s/g, "")}`}
                      className="transition hover:text-accent"
                    >
                      {footer.contact.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Ask AI about Zenith — fourth column on the right */}
            <AskAi />
          </div>
        </div>

        {/* Partners + audit box */}
        <div className="frame relative flex flex-col justify-between gap-10 pb-14 pt-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-body-lg font-medium">{footer.partnersLabel}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6">
              {footer.partners.map((p) => (
                <Image
                  key={p.alt}
                  src={p.src}
                  unoptimized={isFlatMark(p.src)}
                  alt={p.alt}
                  width={180}
                  height={40}
                  className={`${p.className} w-auto object-contain invert`}
                />
              ))}
            </div>
          </div>

          {/* Audit box (in place of socials) */}
          <Link
            href={footer.audit.cta.href}
            className="group flex shrink-0 items-center justify-between gap-8 rounded-[8px] border border-light-border bg-light-bg p-6 transition hover:bg-light-surface lg:max-w-sm"
          >
            <div>
              <p className="font-display text-body-lg font-medium">
                {footer.audit.heading}
              </p>
              <p className="mt-1 text-body text-light-muted">
                {footer.audit.text}
              </p>
            </div>
            <span className="font-display text-h3 font-medium text-accent transition group-hover:translate-x-1">
              <span aria-hidden>&rarr;</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Meta bar — rule confined to the frame column like the ones above */}
      <div>
        <div className="frame frame-divide flex flex-col gap-4 py-6 text-body text-light-muted md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl">{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition hover:text-light-text"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Giant uppercase wordmark blending up from the very bottom — contained
          within the frame's inner padding */}
      <div
        aria-hidden
        className="frame pointer-events-none -mt-1 select-none [border-inline:0]"
      >
        <span
          className="block translate-y-[22%] text-center font-display font-medium uppercase leading-[0.8] tracking-tight text-transparent"
          style={{
            // 12vw, capped so the wordmark never outgrows the 1440px frame column
            fontSize: "clamp(48px, 12vw, 186px)",
            // Bottom 22% is clipped by the footer edge, so keep the ink strong
            // through the visible bottom and fade out toward the top.
            backgroundImage:
              "linear-gradient(to top, color-mix(in srgb, var(--color-accent) 50%, transparent) 0%, color-mix(in srgb, var(--color-accent) 44%, transparent) 30%, color-mix(in srgb, var(--color-accent) 12%, transparent) 68%, transparent 92%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {footer.wordmark}
        </span>
      </div>
    </footer>
  );
}
