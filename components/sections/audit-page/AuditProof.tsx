import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { AuditPage } from "@/content/audits/types";

/**
 * One piece of evidence that the recommended option is a thing we have already
 * done, placed after the price rather than before it: the claim only needs
 * backing once the reader is weighing the number.
 *
 * Optional in the type, so an audit with no comparable case study renders
 * nothing rather than an empty band.
 */
export function AuditProof({ proof }: { proof: NonNullable<AuditPage["proof"]> }) {
  return (
    <Section
      tone="light"
      className="bg-light-surface"
      frameClassName="!py-14 md:!py-24"
    >
      <div className="max-w-3xl">
        <Eyebrow>{proof.eyebrow}</Eyebrow>
        <h2 className="font-display text-h2 font-semibold leading-tight text-balance">
          {proof.heading}
        </h2>
        <p className="mt-4 text-body-lg text-light-muted">{proof.body}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-8">
          {proof.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group inline-flex items-center gap-2 font-medium text-light-text underline underline-offset-4 transition hover:text-accent"
            >
              {link.label}
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
