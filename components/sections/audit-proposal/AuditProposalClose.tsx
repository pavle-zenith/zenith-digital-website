import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { StatBlock } from "@/components/ui/StatBlock";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import type { AuditProposalPage } from "@/content/proposals/types";
import { DocHeading, DocSection } from "./parts";

/** "Česta pitanja": the site's own accordion, at the column's width. */
export function AuditProposalFaq({ faq }: { faq: AuditProposalPage["faq"] }) {
  return (
    <DocSection id={faq.id}>
      <DocHeading heading={faq.heading} />
      <FaqAccordion items={faq.items} />
    </DocSection>
  );
}

/**
 * The close: what happens next, one way to reply, then signed, because the
 * document is a letter from a person. No call is asked for (owner, 26 Oct
 * 2026): the next step is a contract, and questions come by email.
 *
 * Optional reassurance figures sit between the ask and the button, where the
 * hesitation is, each answering one of the client's stated concerns, in the
 * same hairline grid as the stats near the top. The founder's photo, when
 * given, signs the page beside the name, so the letter ends on a face.
 */
export function AuditProposalClose({ close }: { close: AuditProposalPage["close"] }) {
  const [name, ...role] = close.signature;
  return (
    <DocSection id={close.id} tinted>
      <h2 className="font-display text-h1 font-medium leading-tight tracking-tight text-balance">
        {close.heading}
      </h2>
      <p className="mt-4 text-body-lg text-light-muted">{close.body}</p>

      {close.stats?.length ? (
        <ul
          role="list"
          // Two across at every width: four across squeezed each label into
          // three lines under a figure too big for its cell. These figures
          // support the ask, so they sit a size below the section's own.
          className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-light-border bg-light-border"
        >
          {close.stats.map((stat) => (
            <li key={stat.label} className="bg-light-bg px-5 py-4 break-inside-avoid md:px-6 md:py-5">
              <StatBlock metric={stat} tone="light" size="h3" className="gap-1 text-body" />
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button cta={close.primaryCta} tone="light" />
        {close.secondaryCta ? (
          <Button cta={{ ...close.secondaryCta, variant: "secondary" }} tone="light" />
        ) : null}
      </div>

      <div className="mt-12 flex items-center gap-5 border-t border-light-border pt-6">
        {close.photo ? (
          <Image
            src={close.photo.src}
            alt={close.photo.alt}
            width={160}
            height={200}
            className="h-24 w-20 shrink-0 rounded-[8px] object-cover object-top"
          />
        ) : null}
        <p className="text-body">
          <span className="block font-medium text-light-text">{name}</span>
          {role.map((line) => (
            <span key={line} className="block text-light-muted">
              {line}
            </span>
          ))}
        </p>
      </div>
    </DocSection>
  );
}
