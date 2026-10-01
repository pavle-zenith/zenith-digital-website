import { Fragment } from "react";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { DarkBand } from "@/components/sections/private-doc/DarkBand";
import type { ProposalPage } from "@/content/proposals/types";

/**
 * The proposal's cover. Navy and textured like the audit hero, without the
 * gauge: the headline is the offer, the first lead paragraph is the problem in
 * one breath, and both actions sit under it.
 *
 * Split from `lg`: the headline holds the left at display size, the argument
 * and the actions sit right, bottom-aligned to it, so the first screen reads
 * as offer, then reason, then next step.
 *
 * The client's domains appear only as plain text anywhere on this page. A
 * private document never links out to the prospect's site or their old
 * developer's server.
 *
 * #proposal-hero: the jump bar watches it to know when to slide in.
 */
export function ProposalHero({ hero }: { hero: ProposalPage["hero"] }) {
  const [first, ...rest] = hero.lead;
  const eyebrow = hero.eyebrow.split(" · ");

  return (
    <DarkBand id="proposal-hero" priority>
      <Section
        tone="dark"
        divide={false}
        className="bg-transparent"
        frameClassName="!py-16 md:!py-24 lg:!py-32"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
          <div>
            {/* Each "·" part stays whole, so a phone breaks the line after a
                dot and never inside the date. */}
            <Eyebrow className="text-text-muted">
              {eyebrow.map((part, i) => (
                <Fragment key={part}>
                  {i > 0 ? " " : null}
                  <span className="whitespace-nowrap">
                    {part}
                    {i < eyebrow.length - 1 ? " ·" : null}
                  </span>
                </Fragment>
              ))}
            </Eyebrow>
            <h1 className="font-display text-display font-medium tracking-tight text-balance">
              {hero.heading}
            </h1>
          </div>

          <div>
            {first ? <p className="text-body-lg text-text">{first}</p> : null}
            {rest.map((para) => (
              <p key={para} className="mt-4 text-body-lg text-text-muted">
                {para}
              </p>
            ))}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
        </div>
      </Section>
    </DarkBand>
  );
}
