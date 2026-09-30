import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { AuditPage } from "@/content/audits/types";
import { DownloadIcon } from "./icons";

/**
 * Audit hero. Dark and textured, the same register as the /free-website-audit
 * hero, because this is the document's cover.
 *
 * The H1 is the client's name alone, which is why the eyebrow is earned here
 * rather than reflexive (DESIGN.md, The Earned Eyebrow Rule): without it the
 * page opens on a name with no statement of what the document is.
 *
 * THE CLIENT URL IS NEVER A LINK. It is evidence of what was audited, and this
 * page is sent to that client; linking out of a private document invites them
 * to leave it, and a followed link from a noindex page is still a followed link.
 *
 * The accent fill is invisible on navy (DESIGN.md, Buttons), so the primary
 * action is white-filled and the secondary keeps the rule border.
 */
export function AuditHero({
  audit,
  pdfSize,
}: {
  audit: AuditPage;
  /** Formatted at build time by the route, never hardcoded. */
  pdfSize: string;
}) {
  const { hero, client, clientUrl, focus, date } = audit;

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>

      <Section
        tone="dark"
        divide={false}
        className="bg-transparent"
        frameClassName="!py-14 md:!py-24 lg:!py-28"
      >
        <div className="max-w-3xl">
          <Eyebrow className="text-text-muted">{hero.eyebrow}</Eyebrow>
          <h1 className="font-display text-h1 font-medium leading-tight tracking-tight text-balance">
            {hero.heading}
          </h1>

          {/* Metadata line: what was audited, the angle, and when. The date
              matters because search results move, and the closing note says so. */}
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label uppercase track-label text-text-muted">
            <span>{clientUrl}</span>
            <span aria-hidden>&middot;</span>
            <span>{focus}</span>
            <span aria-hidden>&middot;</span>
            <span>{date}</span>
          </p>

          <div className="mt-8 flex flex-col gap-4 text-body-lg text-text-muted">
            {hero.lead.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={hero.pdfHref}
              download
              className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-white px-6 py-3 text-body font-medium text-bg transition hover:bg-white/90 active:scale-[.99] sm:w-auto"
            >
              <DownloadIcon className="h-[18px] w-[18px] shrink-0" />
              {hero.pdfLabel}
              <span className="font-normal text-light-muted">({pdfSize})</span>
            </a>
            <Button
              cta={{ ...hero.callCta, variant: "secondary" }}
              tone="dark"
            />
          </div>

          {/* Walkthrough. Renders nothing at all until there is an id: an empty
              16:9 frame on a document sent to a client reads as a broken embed. */}
          {hero.loomId ? (
            <div className="mt-12 overflow-hidden rounded-card border border-border">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.loom.com/embed/${hero.loomId}`}
                  title={`Audit walkthrough for ${client}`}
                  loading="lazy"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          ) : null}
        </div>
      </Section>
    </div>
  );
}
