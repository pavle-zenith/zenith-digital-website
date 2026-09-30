import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { AuditPage } from "@/content/audits/types";

/**
 * The close, and the caveat.
 *
 * The note is the page's own footnote: search results move by location, device
 * and day, so the findings are dated rather than presented as permanent. It
 * runs last and quiet, which is where a caveat belongs when it is honest
 * rather than defensive.
 */
export function AuditClose({
  close,
  cta,
}: {
  close: AuditPage["close"];
  cta: AuditPage["hero"]["callCta"];
}) {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="max-w-(--measure)">
        <h2 className="font-display text-h2 font-semibold leading-tight text-balance">
          {close.heading}
        </h2>
        <p className="mt-4 text-body-lg text-light-muted">{close.body}</p>
        <div className="mt-8">
          <Button cta={{ label: cta.label, href: cta.href }} tone="light" />
        </div>
        <p className="mt-12 border-t border-light-border pt-6 text-label tracking-normal text-light-muted">
          {close.note}
        </p>
      </div>
    </Section>
  );
}
