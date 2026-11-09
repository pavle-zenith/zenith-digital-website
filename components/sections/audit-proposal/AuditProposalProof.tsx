import Image from "next/image";

import { StatBlock } from "@/components/ui/StatBlock";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { INDUSTRIES, caseStudyCards } from "@/content/case-studies";
import type { AuditProposalPage } from "@/content/proposals/types";
import { attribution, testimonial } from "@/content/testimonials-data";
import { servesRaw } from "@/lib/utils";
import { DocHeading, DocSection } from "./parts";

type Proof = NonNullable<AuditProposalPage["proof"]>;

/**
 * "A similar project": one shipped case study between the mockup and the
 * offer, so the price arrives after proof that we've done this before.
 *
 * Built from the site's existing pieces, no new visual language: the card is
 * the case-study grid's card (media, client with its industry in mono, a
 * muted line, then the stats as the close's hairline grid), and the quote
 * under it is the case-study page's testimonial (display-face quote, square
 * avatar, name with the verified tick).
 *
 * The image and industry come from the study's card in content/case-studies,
 * found by `href`, and the quote from content/testimonials-data by id, so
 * nothing about the client is typed twice. The link opens in a new tab so the
 * reader keeps their place in the proposal.
 */
export function AuditProposalProof({
  proof,
  linkLabel = "Read the case study",
}: {
  proof: Proof;
  linkLabel?: string;
}) {
  const card = caseStudyCards.find((c) => proof.href === `/case-studies/${c.slug}`);
  const quote = testimonial(proof.quote);

  return (
    <DocSection id={proof.id}>
      <DocHeading heading={proof.heading} />

      <article className="overflow-hidden rounded-card border border-light-border bg-light-bg break-inside-avoid">
        {card?.thumb ? (
          <div className="relative aspect-[16/10] overflow-hidden border-b border-light-border bg-bg">
            <Image
              src={card.thumb}
              unoptimized={servesRaw(card.thumb)}
              alt={`${proof.client} website`}
              fill
              sizes="(max-width: 768px) 100vw, 736px"
              className="object-cover object-center"
            />
          </div>
        ) : null}

        <div className="p-6 md:p-8">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-body-lg font-medium">{proof.client}</h3>
            {card ? (
              <span className="shrink-0 font-mono text-label uppercase track-label text-light-muted">
                {INDUSTRIES[card.industry]}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-body leading-snug text-light-muted">{proof.line}</p>

          <ul
            role="list"
            className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-light-border bg-light-border"
          >
            {proof.stats.map((stat) => (
              <li key={stat.label} className="bg-light-bg px-5 py-4 md:px-6 md:py-5">
                <StatBlock metric={stat} tone="light" size="h3" className="gap-1 text-body" />
              </li>
            ))}
          </ul>

          <a
            href={proof.href}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-1.5 font-display text-body font-medium transition hover:text-accent print:hidden"
          >
            {linkLabel}{" "}
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </a>
        </div>
      </article>

      <figure className="mt-10 text-center break-inside-avoid md:mt-12">
        <blockquote className="font-display text-h3 font-medium leading-snug tracking-tight text-balance">
          &ldquo;{quote.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-8 flex items-center justify-center gap-3">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[6px] border border-light-border">
            <Image src={quote.avatar} alt={quote.name} fill sizes="44px" className="object-cover" />
          </span>
          <span className="text-left">
            <span className="flex items-center gap-1.5 font-display font-medium">
              {quote.name}
              <VerifiedCheck className="text-light-text" />
            </span>
            <span className="block text-body text-light-muted">{attribution(quote)}</span>
          </span>
        </figcaption>
      </figure>
    </DocSection>
  );
}
