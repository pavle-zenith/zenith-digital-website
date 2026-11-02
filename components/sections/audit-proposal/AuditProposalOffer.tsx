import { Section } from "@/components/ui/Section";
import { DarkBand } from "@/components/sections/private-doc/DarkBand";
import { TickList } from "@/components/sections/private-doc/parts";
import { proposalTemplate } from "@/content/proposals/template";
import type { AuditProposalPage } from "@/content/proposals/types";
import { COLUMN, DocHeading } from "./parts";

/**
 * The offer: one project, one price, on the navy, textured ground the site
 * spends on price (DESIGN.md, The Spent Ground Rule).
 *
 * The offer is the white card inside the dark band, as the recommended option
 * is on the audit page. Duration and price are set as figures in the display
 * face, because they are the two numbers the reader came for
 * (DESIGN.md, Numbers-Are-Headings). An offer with a `wasPrice` (a nonprofit
 * rate, say) shows the standard price struck before it, read out as "was X,
 * now Y". What it covers follows as ruled rows with a tick, then the terms in
 * small text on the navy under the card.
 *
 * Everything over the texture has a solid fill (DESIGN.md, Studio Texture).
 */
export function AuditProposalOffer({
  offer,
  labels,
}: {
  offer: AuditProposalPage["offer"];
  labels: AuditProposalPage["labels"];
}) {
  return (
    <DarkBand>
      <Section
        id={offer.id}
        tone="dark"
        className="doc-anchor bg-transparent"
        frameClassName="!py-14 md:!py-20"
      >
        <div className={COLUMN}>
          <DocHeading heading={offer.heading} intro={offer.intro} tone="dark" />

          <article className="tone-light rounded-card bg-light-bg p-6 text-light-text ring-1 ring-white/60 md:p-8">
            <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
              {offer.name}
            </h3>

            <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-light-border pt-5">
              <div>
                <dt className={TERM}>{labels.duration}</dt>
                <dd className={FIGURE}>{offer.duration}</dd>
              </div>
              <div>
                <dt className={TERM}>{labels.price}</dt>
                <dd className={FIGURE}>
                  {offer.wasPrice ? (
                    <>
                      {/* Screen readers skip <s>, so the pair is read out as
                          the sentence it means. */}
                      <span className="sr-only">
                        {proposalTemplate.priceChange(offer.wasPrice, offer.price)}
                      </span>
                      <span aria-hidden className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <s className="text-body-lg font-normal text-light-muted decoration-light-muted/80 md:text-h3">
                          {offer.wasPrice}
                        </s>
                        <span>{offer.price}</span>
                      </span>
                    </>
                  ) : (
                    offer.price
                  )}
                </dd>
              </div>
            </dl>

            <TickList items={offer.items} columns={1} className="mt-8" />
          </article>

          <ul role="list" className="mt-6 space-y-2">
            {offer.notes.map((note) => (
              <li key={note} className="text-label tracking-normal text-text-muted">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </DarkBand>
  );
}

const TERM = "font-mono text-label uppercase track-label text-light-muted";
const FIGURE = "mt-2 font-display text-h2 font-medium leading-none tracking-tight tabular-nums";
