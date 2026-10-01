import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { DarkBand } from "@/components/sections/private-doc/DarkBand";
import { proposalTemplate } from "@/content/proposals/template";
import type { ProposalPage } from "@/content/proposals/types";
import { TickList } from "./parts";

type Investment = ProposalPage["investment"];

/**
 * The price. Navy and textured, the same ground as the audit's offers.
 *
 * Read top to bottom as one bill: the two builds and their total, what that
 * covers and when it lands, how it can be paid, and then, on its own white
 * panel, the monthly plan. The care plan is a different ground on purpose: a
 * monthly fee sitting in the same table as a one-time price is how the two get
 * added together in someone's head.
 *
 * Kept to a document-width column rather than the full frame, so a price and
 * its label are never a screen-width apart.
 *
 * Everything over the texture sits on a solid fill (DESIGN.md, Studio
 * Texture). The saving is green on navy in the base token: the -ink tokens are
 * for light grounds and fall under 4.5:1 here.
 */
export function ProposalInvestment({ investment }: { investment: Investment }) {
  const { builds, total, care } = investment;

  return (
    // #investment: the jump bar's price link and the phone bottom bar.
    <DarkBand id="investment" className="doc-anchor">
      <Section
        tone="dark"
        divide={false}
        className="bg-transparent"
        frameClassName="!py-16 md:!py-28"
      >
        <div className="max-w-5xl">
          <h2 className="font-display text-h2 font-semibold leading-tight text-balance">
            {investment.heading}
          </h2>

          {/* The builds, then the total. */}
          <dl className="mt-10 overflow-hidden rounded-card border border-border bg-bg">
            {builds.map((build) => (
              <div
                key={build.name}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border px-5 py-5 md:px-8"
              >
                <dt className="text-body-lg text-text">{build.name}</dt>
                <dd>
                  <PriceChange was={build.wasPrice} now={build.price} />
                </dd>
              </div>
            ))}
            <div className="flex flex-col gap-4 bg-surface px-5 py-6 md:flex-row md:items-end md:justify-between md:px-8 md:py-8">
              <dt className="font-display text-h3 font-medium leading-tight tracking-tight text-text">
                {total.label}
              </dt>
              <dd className="flex flex-col items-start gap-3 md:items-end">
                <PriceChange was={total.wasPrice} now={total.price} large />
                <span className="inline-flex items-center rounded-full border border-positive/40 px-3 py-1 font-mono text-label uppercase track-label text-positive">
                  {total.saving}
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-6 max-w-(--measure)">
            <p className="text-body text-text-muted">{investment.includes}</p>
            <p className="mt-2 text-body font-medium text-text">{investment.delivery}</p>
          </div>

          {/* How to pay. Neither option is marked: both are fine. */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {investment.paymentOptions.map((option) => (
              <section
                key={option.name}
                aria-labelledby={slug(option.name)}
                className="rounded-card border border-border bg-surface p-6 md:p-8"
              >
                <h3
                  id={slug(option.name)}
                  className="font-display text-h3 font-medium leading-tight tracking-tight"
                >
                  {option.name}
                </h3>
                <p className="mt-2 text-body text-text-muted">{option.detail}</p>
                <ol role="list" className="mt-6">
                  {option.schedule.map((line) => (
                    <li key={line} className="border-t border-border py-3 text-body text-text-muted">
                      <ScheduleLine line={line} />
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>

          {/* Monthly: its own white panel, never a row in the bill above. */}
          <section
            aria-labelledby="care-plan"
            className="tone-light mt-4 grid gap-8 rounded-card bg-light-bg p-6 text-light-text ring-1 ring-white/60 md:mt-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:p-10"
          >
            <div>
              <h3
                id="care-plan"
                className="font-display text-h3 font-medium leading-tight tracking-tight text-balance"
              >
                {care.name}
              </h3>
              <p className="mt-6 font-display text-h1 font-medium leading-none tracking-tight tabular-nums">
                {care.price}
              </p>
              <p className="mt-3 text-body text-light-muted">{care.priceNote}</p>
              <p className="mt-6 text-body font-medium text-light-text">{care.note}</p>
            </div>
            <TickList items={care.items} columns={1} />
          </section>
        </div>
      </Section>
    </DarkBand>
  );
}

/**
 * Old price struck through, new price beside it. The visible pair is hidden
 * from screen readers and replaced by the sentence it means, because `<s>` is
 * silent in most of them and "£3,500 £3,000" read aloud is ambiguous.
 */
function PriceChange({ was, now, large = false }: { was: string; now: string; large?: boolean }) {
  return (
    <>
      <span className="sr-only">{proposalTemplate.priceChange(was, now)}</span>
      <span aria-hidden className="flex items-baseline gap-3 tabular-nums">
        <s
          className={cn(
            "text-text-muted decoration-text-muted/80",
            large ? "text-body-lg md:text-h3" : "text-body-lg",
          )}
        >
          {was}
        </s>
        <span
          className={cn(
            "font-display font-medium leading-none tracking-tight text-text",
            large ? "text-h1" : "text-h3",
          )}
        >
          {now}
        </span>
      </span>
    </>
  );
}

/** "£3,000 to start": the amount leads in full ink, so the schedule scans as numbers. */
function ScheduleLine({ line }: { line: string }) {
  const match = line.match(/^(£[\d,.]+)(.*)$/);
  if (!match) return <span className="text-text">{line}</span>;
  return (
    <>
      <span className="font-medium text-text tabular-nums">{match[1]}</span>
      {match[2]}
    </>
  );
}

const slug = (s: string) => `pay-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
