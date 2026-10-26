import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { DarkBand } from "@/components/sections/private-doc/DarkBand";
import type { AuditProposalPage } from "@/content/proposals/types";
import { COLUMN } from "./parts";

/**
 * The cover: the same navy, textured ground as the proposal and audit heroes,
 * with everything in the reading column rather than split across the width.
 * Headline at H1 rather than display size, because the column is narrow and
 * a display-size line would break after every two words.
 *
 * The meta row (for whom, when, by whom) is a definition list: three labelled
 * facts, set in mono labels over plain values, under a hairline.
 *
 * The client's domain appears as plain text only. A private document never
 * links out to the prospect's site.
 *
 * #ponuda-hero: the jump bar watches it to know when to slide in.
 */
export function AuditProposalHero({ hero }: { hero: AuditProposalPage["hero"] }) {
  return (
    <DarkBand id="ponuda-hero" priority>
      <Section
        tone="dark"
        divide={false}
        className="bg-transparent"
        frameClassName="!py-14 md:!py-20 lg:!py-24"
      >
        <div className={COLUMN}>
          <Eyebrow className="text-text-muted">{hero.eyebrow}</Eyebrow>
          <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
            {hero.heading}
          </h1>
          <p className="mt-6 text-body-lg text-text">{hero.lead}</p>

          <dl className="mt-10 grid gap-5 border-t border-border pt-6 sm:grid-cols-3 sm:gap-6">
            {hero.meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-label uppercase track-label text-text-muted">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-body text-text">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {/* White-filled: the accent fill is invisible on navy. */}
            <a
              href={hero.primaryCta.href}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-white px-6 py-3 text-body font-medium text-bg transition hover:bg-white/90 active:scale-[.99] sm:w-auto"
            >
              {hero.primaryCta.label}
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </a>
            <Button cta={{ ...hero.secondaryCta, variant: "secondary" }} tone="dark" />
          </div>
        </div>
      </Section>
    </DarkBand>
  );
}
