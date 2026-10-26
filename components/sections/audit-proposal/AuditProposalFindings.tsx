import { cn } from "@/lib/utils";
import { Pill } from "@/components/ui/Pill";
import { EvidenceFigure } from "@/components/sections/private-doc/EvidenceFigure";
import { SeverityPill } from "@/components/sections/proposal-page/parts";
import type {
  AuditProposalFinding,
  AuditProposalPage,
  ProposalImage,
  Severity,
} from "@/content/proposals/types";
import { DocHeading, DocSection, ProseBlocks } from "./parts";

const ORDER: Severity[] = ["critical", "high", "medium"];

/**
 * "Šta smo pronašli": one card per finding, in the content's order (by impact
 * on sales). Each card is the same three questions in the same order, what we
 * saw, why it matters, what we propose, so a reader can scan seven cards for
 * any one of the three.
 *
 * Cards stack in the reading column: one finding at a time, full column width,
 * rather than a grid that would put two arguments side by side.
 *
 * THE THREE BLOCKS LOOK DIFFERENT ON PURPOSE (owner, 26 Oct 2026), so a reader
 * skimming seven cards can find the cost and the answer without reading the
 * labels:
 *   - "what we saw" is plain, on the card, with its screenshots;
 *   - "why it matters" is an amber callout. Amber is the system's warning
 *     colour, so the wash reads as "this is what it costs you"; the base
 *     amber is only the fill and the hairline, the label is the -ink amber
 *     (4.6:1 on the wash), per the -ink Split Rule;
 *   - "our proposal" closes the card as a navy band with white text, edge to
 *     edge, so every finding ends on the answer.
 *
 * The severity tally comes first, as on the proposal page, so the reader knows
 * how bad before the detail. The severity word is always printed: colour is
 * never the only signal.
 */
export function AuditProposalFindings({
  findings,
  labels,
}: {
  findings: AuditProposalPage["findings"];
  labels: AuditProposalPage["labels"];
}) {
  const count = (s: Severity) => findings.items.filter((f) => f.severity === s).length;

  return (
    <DocSection id={findings.id}>
      <DocHeading heading={findings.heading} intro={findings.intro} />
      <p className="-mt-2 mb-8 flex flex-wrap gap-2">
        {ORDER.filter((s) => count(s) > 0).map((s) => (
          <SeverityPill key={s} severity={s} count={count(s)} label={labels.severity[s]} />
        ))}
      </p>

      <ol role="list" className="space-y-6">
        {findings.items.map((item) => (
          <FindingCard key={item.id} item={item} labels={labels} />
        ))}
      </ol>
    </DocSection>
  );
}

function FindingCard({
  item,
  labels,
}: {
  item: AuditProposalFinding;
  labels: AuditProposalPage["labels"];
}) {
  return (
    <li
      id={item.id}
      // overflow-hidden: the navy proposal band follows the card's corners.
      className="doc-anchor overflow-hidden rounded-card border border-light-border bg-light-bg"
    >
      <div className="px-6 pt-6 md:px-8 md:pt-8">
        <p className="font-mono text-label uppercase track-label text-light-muted">{item.number}</p>
        <h3 className="mt-2 font-display text-h3 font-medium leading-tight tracking-tight text-balance">
          {item.title}
        </h3>
        <p className="mt-4 flex flex-wrap items-center gap-2">
          <SeverityPill severity={item.severity} label={labels.severity[item.severity]} />
          <Pill tone="light">{item.tag}</Pill>
        </p>
      </div>

      <dl>
        <div className="mx-6 mt-6 border-t border-light-border pt-5 md:mx-8">
          <dt className={cn(LABEL, "text-light-muted")}>{labels.seen}</dt>
          <dd className="mt-3">
            <ProseBlocks blocks={item.seen} />
            {item.evidence?.length ? <Evidence images={item.evidence} /> : null}
          </dd>
        </div>

        <div className="mx-6 mt-6 rounded-card border border-warning/40 bg-warning/10 p-5 md:mx-8 md:p-6">
          <dt className={cn(LABEL, "text-warning-ink")}>{labels.why}</dt>
          <dd className="mt-3">
            <ProseBlocks blocks={item.why} />
          </dd>
        </div>

        <div className="tone-dark mt-6 bg-bg px-6 py-6 text-text md:mt-8 md:px-8 md:py-7">
          <dt className={cn(LABEL, "text-text-muted")}>{labels.proposal}</dt>
          <dd className="mt-3">
            <ProseBlocks blocks={item.proposal} tone="dark" />
          </dd>
        </div>
      </dl>
    </li>
  );
}

// No colour here: `cn` joins classes without resolving conflicts, so each
// block sets its own.
const LABEL = "font-mono text-label uppercase track-label";

/**
 * Screenshots stacked at the column's width, so an annotation stays legible.
 * A phone capture (tall and narrow) stops at phone size, so it never renders
 * bigger than the screen it was taken on.
 */
function Evidence({ images }: { images: ProposalImage[] }) {
  const isPhone = (img: ProposalImage) => img.height / img.width >= 1.6;
  return (
    <div className="mt-6 space-y-6">
      {images.map((img) => (
        <EvidenceFigure
          key={img.src}
          image={img}
          className={cn("break-inside-avoid", isPhone(img) && "max-w-[18rem]")}
        />
      ))}
    </div>
  );
}
