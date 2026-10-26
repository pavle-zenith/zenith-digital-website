import { Button } from "@/components/ui/Button";
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
 */
export function AuditProposalClose({ close }: { close: AuditProposalPage["close"] }) {
  const [name, ...role] = close.signature;
  return (
    <DocSection id={close.id} tinted>
      <h2 className="font-display text-h1 font-medium leading-tight tracking-tight text-balance">
        {close.heading}
      </h2>
      <p className="mt-4 text-body-lg text-light-muted">{close.body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button cta={close.primaryCta} tone="light" />
        {close.secondaryCta ? (
          <Button cta={{ ...close.secondaryCta, variant: "secondary" }} tone="light" />
        ) : null}
      </div>
      <p className="mt-12 border-t border-light-border pt-6 text-body">
        <span className="block font-medium text-light-text">{name}</span>
        {role.map((line) => (
          <span key={line} className="block text-light-muted">
            {line}
          </span>
        ))}
      </p>
    </DocSection>
  );
}
