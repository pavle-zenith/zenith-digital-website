import { JumpBar } from "@/components/sections/private-doc/JumpBar";
import { MobileBar } from "@/components/sections/private-doc/MobileBar";
import type { AuditProposalPage } from "@/content/proposals/types";
import { AuditProposalHero } from "./AuditProposalHero";
import { AuditProposalStats, AuditProposalSummary } from "./AuditProposalSummary";
import { AuditProposalFindings } from "./AuditProposalFindings";
import { AuditProposalMockup } from "./AuditProposalMockup";
import { AuditProposalProof } from "./AuditProposalProof";
import { AuditProposalOffer } from "./AuditProposalOffer";
import { AuditProposalHandoff } from "./AuditProposalHandoff";
import { AuditProposalScore } from "./AuditProposalScore";
import {
  AuditProposalNeeds,
  AuditProposalPriorities,
  AuditProposalTimeline,
} from "./AuditProposalPlan";
import { AuditProposalClose, AuditProposalFaq } from "./AuditProposalClose";

/**
 * The audit proposal (`kind: "audit"`): a review of the prospect's site, then
 * one offer, as one long reading column.
 *
 * `lang` sits on the wrapper because the root layout's <html lang> is shared
 * by the whole site; this marks everything the document says, while the
 * site's own nav and footer stay in English.
 *
 * `.print-doc` is the hook for the print rules in globals.css: a client may
 * save this as a PDF, so the site chrome drops out, the navy bands keep their
 * colour, and the FAQ prints open. The two fixed bars are hidden in print.
 *
 * The jump bar lists every section in page order, the sticky table of
 * contents the page needs at this length.
 *
 * An audit with no paid offer (Gardner) leaves out the offer, timeline and
 * needs, and sets `priorities` instead, in the offer's place.
 */
export function AuditProposal({ proposal: p }: { proposal: AuditProposalPage }) {
  const toc = [
    p.summary,
    p.stats,
    p.findings,
    p.mockup,
    ...(p.proof ? [p.proof] : []),
    ...(p.offer ? [p.offer] : []),
    ...(p.priorities ? [p.priorities] : []),
    ...(p.handoff ? [p.handoff] : []),
    ...(p.score ? [p.score] : []),
    ...(p.timeline ? [p.timeline] : []),
    ...(p.needs ? [p.needs] : []),
    p.faq,
    p.close,
  ].map(
    (section) => ({ id: section.id, name: section.heading }),
  );

  // The offer, or on an audit with no offer, where to start.
  const barTarget = p.offer?.id ?? p.priorities?.id;

  return (
    <div lang={p.lang} className="print-doc">
      <AuditProposalHero hero={p.hero} />
      <div className="print:hidden">
        <JumpBar label={p.labels.jump} heroId="ponuda-hero" items={toc} />
      </div>
      <AuditProposalSummary summary={p.summary} />
      <AuditProposalStats stats={p.stats} />
      <AuditProposalFindings findings={p.findings} labels={p.labels} hideSeverity={p.hideSeverity} />
      <AuditProposalMockup mockup={p.mockup} missingImage={p.labels.missingImage} />
      {p.proof ? <AuditProposalProof proof={p.proof} linkLabel={p.labels.readCaseStudy} /> : null}
      {p.offer ? <AuditProposalOffer offer={p.offer} labels={p.labels} /> : null}
      {p.priorities ? <AuditProposalPriorities priorities={p.priorities} /> : null}
      {p.handoff ? <AuditProposalHandoff handoff={p.handoff} /> : null}
      {p.score ? <AuditProposalScore score={p.score} /> : null}
      {p.timeline ? <AuditProposalTimeline timeline={p.timeline} /> : null}
      {p.needs ? <AuditProposalNeeds needs={p.needs} /> : null}
      <AuditProposalFaq faq={p.faq} />
      <AuditProposalClose close={p.close} />
      {barTarget ? (
        <div className="print:hidden">
          <MobileBar label={p.labels.mobileBar} target={barTarget} />
        </div>
      ) : null}
    </div>
  );
}
