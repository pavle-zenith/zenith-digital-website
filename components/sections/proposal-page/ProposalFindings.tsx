import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/sections/private-doc/icons";
import {
  EvidenceFigure,
  type EvidenceImage,
} from "@/components/sections/private-doc/EvidenceFigure";
import type { ProposalPage, Severity } from "@/content/proposals/types";
import { SeverityPill } from "./parts";

type Findings = ProposalPage["findings"];
type Finding = Findings["items"][number];

const ORDER: Severity[] = ["critical", "high", "medium"];

// Title column and points column. Shared by every finding and by "What's
// already working", so the left edge of the argument runs straight down the
// whole chapter.
const COLUMNS = "grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16";

// From `lg` the title column sticks under the nav and jump bar, so a tall
// screenshot never scrolls its finding's name away.
const STICKY =
  "lg:sticky lg:top-[calc(var(--doc-nav-h,4rem)_+_var(--doc-jump-h,3.25rem)_+_2rem)] lg:self-start";

/**
 * "What we found": the case for the project. One block per finding, worst
 * first as the content orders them, each with its severity, the site it
 * affects, the plain-terms points and the screenshots that prove them.
 *
 * The whole chapter, findings and "What's already working" included, is one
 * #findings anchor, so the jump bar keeps "What we found" lit while any of it
 * is being read.
 *
 * Backgrounds alternate per finding as the audit segments do, counted from the
 * end so the last finding is always white and the "working" panel after it is
 * always the surface tint, whatever the number of findings.
 */
export function ProposalFindings({ findings }: { findings: Findings }) {
  const count = (s: Severity) => findings.items.filter((f) => f.severity === s).length;
  const last = findings.items.length - 1;

  return (
    <div id="findings" className="doc-anchor">
      <Section tone="light" frameClassName="!pt-14 !pb-10 md:!pt-24 md:!pb-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 font-semibold leading-tight text-balance">
            {findings.heading}
          </h2>
          <p className="mt-4 text-body-lg text-light-muted">{findings.intro}</p>
        </div>
        {/* The tally: how bad, before the detail. */}
        <p className="mt-8 flex flex-wrap gap-2">
          {ORDER.filter((s) => count(s) > 0).map((s) => (
            <SeverityPill key={s} severity={s} count={count(s)} />
          ))}
        </p>
      </Section>

      {findings.items.map((item, i) => (
        <FindingBlock key={item.id} item={item} tinted={(last - i) % 2 === 1} />
      ))}

      <Section tone="light" className="bg-light-surface" frameClassName="!py-12 md:!py-20">
        <div className={COLUMNS}>
          <h3 className="font-display text-h3 font-medium leading-tight tracking-tight text-balance lg:border-t lg:border-light-border lg:pt-4">
            {findings.working.heading}
          </h3>
          <div>
            <ul role="list">
              {findings.working.items.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 border-t border-light-border py-4"
                >
                  <CheckIcon className="mt-[5px] h-[18px] w-[18px] shrink-0 text-positive-ink" />
                  <span className="text-body text-light-text md:text-body-lg">{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-light-border pt-8 text-body-lg font-medium text-light-text">
              {findings.working.closing}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

function FindingBlock({ item, tinted }: { item: Finding; tinted: boolean }) {
  return (
    <Section
      id={item.id}
      tone="light"
      className={cn("doc-anchor", tinted && "bg-light-surface")}
      frameClassName="!py-12 md:!py-20"
    >
      <div className={COLUMNS}>
        <header className={cn(STICKY, "lg:border-t lg:border-light-border lg:pt-4")}>
          <h3 className="font-display text-h3 font-medium leading-tight tracking-tight text-balance">
            {item.title}
          </h3>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <SeverityPill severity={item.severity} />
            <span className="font-mono text-label uppercase track-label text-light-muted">
              {item.site}
            </span>
          </p>
        </header>

        <div>
          <ul role="list">
            {item.points.map((point) => (
              <li
                key={point}
                className="border-t border-light-border py-4 text-body text-light-text md:text-body-lg"
              >
                {point}
              </li>
            ))}
          </ul>
          {item.evidence?.length ? <EvidenceRow images={item.evidence} /> : null}
        </div>
      </div>
    </Section>
  );
}

/**
 * Screenshots in a row, sized by what they are. A phone capture is tall and
 * narrow: two sit side by side at every width and neither goes past 320px, so
 * a phone screenshot never renders bigger than a phone. Anything wider caps at
 * 560px alone and pairs up from `md`.
 */
function EvidenceRow({ images }: { images: EvidenceImage[] }) {
  const isPhone = (img: EvidenceImage) => img.height / img.width >= 1.6;
  const allPhone = images.every(isPhone);

  return (
    <div
      className={cn(
        "mt-8 grid items-start gap-4 sm:gap-6",
        allPhone
          ? "max-w-[664px] grid-cols-2"
          : images.length > 1
            ? "md:grid-cols-2"
            : "max-w-[560px]",
      )}
    >
      {images.map((img) => (
        <EvidenceFigure
          key={img.src}
          image={img}
          className={isPhone(img) ? "w-full max-w-[320px]" : undefined}
        />
      ))}
    </div>
  );
}
