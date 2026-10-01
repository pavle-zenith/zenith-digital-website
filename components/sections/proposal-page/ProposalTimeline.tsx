import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { ProposalPage } from "@/content/proposals/types";

type Row = ProposalPage["timeline"]["rows"][number];

/**
 * The timeline as a definition list: "when" against "what", hairline rows.
 *
 * Each row also draws its weeks on a small track, so the overlaps ("Weeks 2 to
 * 3", "Weeks 3 to 4") are visible at a glance. The track is read off the
 * `when` text and is decorative only: the words stay the content, and if any
 * row's `when` can't be read as a week or a range of weeks, no row gets a
 * track rather than one row getting a wrong one.
 */
export function ProposalTimeline({ timeline }: { timeline: ProposalPage["timeline"] }) {
  const spans = timeline.rows.map(weeksOf);
  const readable = spans.every((s): s is [number, number] => s !== null);
  const total = readable ? Math.max(...spans.map((s) => s![1])) : 0;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <SectionHeader heading={timeline.heading} tone="light" />
      <dl>
        {timeline.rows.map((row, i) => (
          <div
            key={row.when}
            className="grid gap-1 border-t border-light-border py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8 md:grid-cols-[12rem_minmax(0,1fr)]"
          >
            <dt className="font-mono text-label uppercase track-label text-light-muted sm:pt-1">
              {row.when}
            </dt>
            <dd className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-10">
              <span className="text-body-lg text-light-text">{row.what}</span>
              {readable ? <WeekTrack span={spans[i]!} total={total} /> : null}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function WeekTrack({ span: [from, to], total }: { span: [number, number]; total: number }) {
  return (
    <span aria-hidden className="flex shrink-0 gap-1">
      {Array.from({ length: total }, (_, w) => w + 1).map((week) => (
        <span
          key={week}
          className={cn(
            "h-2 w-7 rounded-[2px]",
            week >= from && week <= to ? "bg-accent" : "bg-light-border",
          )}
        />
      ))}
    </span>
  );
}

/** "Week 1" → [1, 1]; "Weeks 2 to 3" → [2, 3]; anything else → null. */
function weeksOf(row: Row): [number, number] | null {
  const m = row.when.match(/^Weeks?\s+(\d+)(?:\s+to\s+(\d+))?$/i);
  if (!m) return null;
  const from = Number(m[1]);
  const to = m[2] ? Number(m[2]) : from;
  return to >= from ? [from, to] : null;
}
