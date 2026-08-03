import Image from "next/image";
import Link from "next/link";

import { FooterClock } from "@/components/layout/FooterClock";
import { footer } from "@/content/home";

/**
 * Footer (light, live-site layout). Top: mission paragraph left, three live city
 * clocks right. Then a hairline and the link columns (Company / Zenith resources
 * / Contact information). Below, the partner logo strip with a boxed free-audit
 * CTA on the right (in place of socials). A meta bar carries the copyright and
 * legal links, and the giant uppercase wordmark blends up from the very bottom.
 */
export function Footer() {
  return (
    <footer className="tone-light overflow-hidden border-t border-light-border bg-light-bg text-light-text">
      {/* Mission + city clocks */}
      <div className="frame flex flex-col justify-between gap-10 pb-12 pt-16 md:flex-row md:items-start">
        <p className="max-w-md text-body-lg">{footer.mission}</p>
        <div className="flex gap-12">
          {footer.clocks.map((c) => (
            <FooterClock key={c.city} city={c.city} tz={c.tz} />
          ))}
        </div>
      </div>

      {/* Link columns — the rule spans the full viewport, content stays framed */}
      <div className="border-t border-light-border">
      <div className="frame py-12">
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
      </div>
      </div>

      {/* Partners + audit box */}
      <div className="frame flex flex-col justify-between gap-10 pb-14 pt-6 lg:flex-row lg:items-center">
        <div>
          <p className="text-body-lg font-medium">{footer.partnersLabel}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6">
            {footer.partners.map((p) => (
              <Image
                key={p.alt}
                src={p.src}
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
          className="group flex shrink-0 items-center justify-between gap-8 rounded-[8px] border border-light-border p-6 transition hover:bg-light-surface lg:max-w-sm"
        >
          <div>
            <p className="font-display text-body-lg font-medium">{footer.audit.heading}</p>
            <p className="mt-1 text-body text-light-muted">{footer.audit.text}</p>
          </div>
          <span className="font-display text-h3 font-medium text-accent transition group-hover:translate-x-1">
            <span aria-hidden>&rarr;</span>
          </span>
        </Link>
      </div>

      {/* Meta bar — full-viewport rule, framed content */}
      <div className="border-t border-light-border">
      <div className="frame flex flex-col gap-4 py-6 text-body text-light-muted md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl">{footer.copyright}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {footer.legal.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-light-text">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      </div>

      {/* Giant uppercase wordmark blending up from the very bottom — contained
          within the frame's inner padding */}
      <div aria-hidden className="frame pointer-events-none -mt-1 select-none [border-inline:0]">
        <span
          className="block translate-y-[22%] text-center font-display font-medium uppercase leading-[0.8] tracking-tight text-transparent"
          style={{
            // 12vw, capped so the wordmark never outgrows the 1440px frame column
            fontSize: "clamp(48px, 12vw, 186px)",
            // Bottom 22% is clipped by the footer edge, so keep the ink strong
            // through the visible bottom and fade out toward the top.
            backgroundImage:
              "linear-gradient(to top, rgba(2,1,58,0.5) 0%, rgba(2,1,58,0.44) 30%, rgba(2,1,58,0.12) 68%, rgba(2,1,58,0) 92%)",
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
