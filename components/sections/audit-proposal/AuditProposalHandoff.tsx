import type { AuditProposalPage } from "@/content/proposals/types";
import { DocHeading, DocSection, LeadPoints } from "./parts";

/**
 * After the offer: what the client's team gets to run the site once it's
 * live. A paragraph, then the points as the mockup section sets them (ruled
 * rows, a tick, a bold lead), with no image. Tinted, so it reads as its own
 * section between the navy offer and the white timeline.
 */
export function AuditProposalHandoff({
  handoff,
}: {
  handoff: NonNullable<AuditProposalPage["handoff"]>;
}) {
  return (
    <DocSection id={handoff.id} tinted>
      <DocHeading heading={handoff.heading} />
      <p className="text-body-lg text-light-text">{handoff.body}</p>
      <LeadPoints points={handoff.points} className="mt-6" />
    </DocSection>
  );
}
