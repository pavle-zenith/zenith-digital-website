import { CheckIcon } from "@/components/sections/private-doc/icons";
import { EvidenceFigure } from "@/components/sections/private-doc/EvidenceFigure";
import type { AuditProposalPage } from "@/content/proposals/types";
import { DocHeading, DocSection } from "./parts";

/**
 * The mockup section: an image beside or above what we keep and change.
 *
 * A tall image (a full-page mockup, as on Woodstone) is a small thumbnail
 * beside the text, first on a phone, so the reader sees which mockup the text
 * is about before reading it. A wide image (a structure diagram, as on
 * ASPIRE-USA) is meant to be read, so it takes the column's full width above
 * the text instead of shrinking to a thumbnail.
 *
 * Until the owner supplies the image, a dashed frame holds its place with the
 * placeholder label, visibly unfinished rather than silently missing.
 *
 * The changes are ruled rows with a tick, as `TickList`, with the bold lead
 * the copy gives each one.
 */
export function AuditProposalMockup({
  mockup,
  missingImage,
}: {
  mockup: AuditProposalPage["mockup"];
  missingImage: string;
}) {
  const wide = mockup.image ? mockup.image.width > mockup.image.height : false;
  return (
    <DocSection id={mockup.id} tinted>
      <DocHeading heading={mockup.heading} />
      <div
        className={
          wide
            ? "grid gap-8"
            : "grid items-start gap-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10"
        }
      >
        <div className={wide ? undefined : "w-40 md:w-full"}>
          {mockup.image ? (
            <EvidenceFigure image={mockup.image} />
          ) : (
            <div className="flex aspect-[3/4] items-center justify-center rounded-[6px] border border-dashed border-light-muted/60 bg-light-bg p-4 text-center font-mono text-label uppercase track-label text-light-muted">
              {missingImage}
            </div>
          )}
        </div>

        <div>
          <p className="text-body-lg text-light-text">{mockup.body}</p>
          <ul role="list" className="mt-6">
            {mockup.points.map((point) => (
              <li
                key={point.lead}
                className="flex items-start gap-3 border-t border-light-border py-4"
              >
                <CheckIcon className="mt-[3px] h-[18px] w-[18px] shrink-0 text-positive-ink" />
                <span className="text-body text-light-text">
                  <strong className="font-semibold">{point.lead}</strong> {point.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocSection>
  );
}
