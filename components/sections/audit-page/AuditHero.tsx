import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { AuditPage } from "@/content/audits/types";
import type { Tally } from "@/content/audits/score";
import { DownloadIcon } from "./icons";
import { ScoreGauge } from "./ScoreGauge";

/**
 * Audit hero. Dark and textured, the /free-website-audit register, because
 * this is the document's cover: the verdict on the left, the score on the
 * right, so the first screen answers "how bad is it" before anything else.
 *
 * ONE DOM, TWO ORDERS. Grid areas put the gauge between the verdict and the
 * buttons on a phone (text, then score, then actions) and beside both on
 * desktop. Rendering the gauge twice to get the same effect would put the
 * score in the accessibility tree twice.
 *
 * The H1 is the client's name alone, which is why the eyebrow is earned here
 * (DESIGN.md, The Earned Eyebrow Rule): it is what says what the document is.
 *
 * THE CLIENT URL IS NEVER A LINK. It is evidence of what was audited; linking
 * out of a private document invites the client to leave it.
 *
 * The accent fill is invisible on navy (DESIGN.md, Buttons), so the primary
 * action is white-filled and the secondary keeps the rule border.
 */
export function AuditHero({
  audit,
  overall,
  pdfSize,
}: {
  audit: AuditPage;
  overall: Tally;
  /** Size only ("191 KB"), read off disk at build time by the route. */
  pdfSize: string;
}) {
  const { hero, client, clientUrl, focus, date, score } = audit;

  return (
    // #audit-hero: the jump bar watches this to know when to slide in.
    <div id="audit-hero" className="relative isolate overflow-hidden">
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
        frameClassName="!py-14 md:!py-20 lg:!py-24"
      >
        <div className="grid gap-10 [grid-template-areas:'text'_'gauge'_'actions'] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-10 lg:[grid-template-areas:'text_gauge'_'actions_gauge']">
          <div className="[grid-area:text]">
            <Eyebrow className="text-text-muted">{hero.eyebrow}</Eyebrow>
            <h1 className="font-display text-h1 font-medium leading-tight tracking-tight text-balance">
              {hero.heading}
            </h1>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label uppercase track-label text-text-muted">
              <span>{clientUrl}</span>
              <span aria-hidden>&middot;</span>
              <span>{focus}</span>
              <span aria-hidden>&middot;</span>
              <span>{date}</span>
            </p>
            <p className="mt-8 font-display text-h3 font-medium leading-snug tracking-tight text-balance text-text">
              {hero.verdict}
            </p>
            <p className="mt-4 max-w-(--measure) text-body-lg text-text-muted">
              {hero.lead}
            </p>
          </div>

          <div className="[grid-area:gauge] lg:self-center">
            <ScoreGauge tally={overall} heading={score.heading} method={score.method} />
          </div>

          <div className="flex flex-col gap-3 [grid-area:actions] sm:flex-row sm:items-center">
            <a
              href={hero.pdfHref}
              download
              className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-white px-6 py-3 text-body font-medium text-bg transition hover:bg-white/90 active:scale-[.99] sm:w-auto"
            >
              <DownloadIcon className="h-[18px] w-[18px] shrink-0" />
              {/* One text run, so label and size wrap together on a phone
                  instead of as two columns. The label already says "(PDF)",
                  so the size is printed alone rather than as "PDF, 191 KB",
                  which read "(PDF) (PDF, 191 KB)". No separator glyph: on a
                  phone the size wraps to its own line, and a line opening with
                  "·" read as broken. The muted colour does the separating. */}
              <span>
                {hero.pdfLabel}{" "}
                <span className="ml-1 whitespace-nowrap font-normal text-light-muted">
                  {pdfSize}
                </span>
              </span>
            </a>
            <Button cta={{ ...hero.callCta, variant: "secondary" }} tone="dark" />
          </div>
        </div>

        {/* Walkthrough. Nothing at all until there is an id: an empty 16:9
            frame on a document sent to a client reads as a broken embed. */}
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
      </Section>
    </div>
  );
}
