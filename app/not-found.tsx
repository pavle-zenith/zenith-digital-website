import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { notFound } from "@/content/not-found";

/**
 * Next emits its own `noindex` for not-found pages, but the root layout sets
 * `index, follow` sitewide and that inherits down to here. Without this
 * override the page ships two contradicting robots tags. Restating it means
 * both tags agree.
 */
export const metadata: Metadata = {
  title: "Page not found | Zenith Digital",
  robots: { index: false, follow: true },
};

/**
 * Custom 404. Renders inside the root layout, so the nav and footer come with
 * it and a lost visitor keeps the full site navigation.
 *
 * Light, since it sits directly under the light nav bar. The route options are
 * a hairline grid rather than a paragraph of links: someone who mistyped a URL
 * is scanning, not reading.
 */
export default function NotFoundPage() {
  return (
    <Section tone="light" divide={false} frameClassName="!py-16 md:!py-28">
      <div className="max-w-3xl">
        <p className="font-mono text-label uppercase track-label text-light-muted">
          Error {notFound.code}
        </p>
        <h1 className="mt-4 font-display text-h1 font-medium leading-tight tracking-tight text-balance">
          {notFound.heading}
        </h1>
        <p className="mt-4 max-w-[60ch] text-body-lg leading-relaxed text-light-muted">
          {notFound.body}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button cta={notFound.cta} tone="light" />
          <Button cta={notFound.ctaSecondary} tone="light" />
        </div>
      </div>

      {/* Hairline grid of the routes people were probably after. */}
      <div className="mt-14 grid gap-px bg-light-border sm:grid-cols-2">
        {notFound.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-baseline justify-between gap-4 bg-light-bg p-6 transition hover:bg-light-surface md:p-8"
          >
            <span>
              <span className="block font-display text-body-lg font-medium group-hover:text-accent">
                {link.label}
              </span>
              <span className="mt-1 block text-body text-light-muted">
                {link.desc}
              </span>
            </span>
            <span aria-hidden className="btn-arrow shrink-0">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
