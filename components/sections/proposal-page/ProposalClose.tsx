import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { ProposalPage } from "@/content/proposals/types";

/**
 * The ask. Addressed by name, both ways to say yes side by side, and signed,
 * because a proposal is a letter from a person rather than a page from a site.
 */
export function ProposalClose({ close }: { close: ProposalPage["close"] }) {
  return (
    <Section tone="light" frameClassName="!py-16 md:!py-28">
      <div className="max-w-3xl">
        <h2 className="font-display text-h1 font-medium leading-tight tracking-tight text-balance">
          {close.heading}
        </h2>
        <p className="mt-4 text-body-lg text-light-muted">{close.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button cta={close.primaryCta} tone="light" />
          <Button cta={{ ...close.secondaryCta, variant: "secondary" }} tone="light" />
        </div>
        <p className="mt-12 border-t border-light-border pt-6 font-mono text-label uppercase track-label text-light-muted">
          {close.signoff}
        </p>
      </div>
    </Section>
  );
}
