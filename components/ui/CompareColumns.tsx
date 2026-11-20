import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { SnapSlider } from "@/components/ui/SnapSlider";
import { cn } from "@/lib/utils";

/** How an option does on a row: a tick, a dash or a cross (shape, not just colour). */
export type CompareMark = "good" | "mixed" | "bad";

export type CompareOption = {
  name: string;
  /** FeatureIcon name for the tile. */
  icon: string;
  /** The highlighted card: white, with the badge. */
  ours?: boolean;
  badge?: string;
  /** The big line under the name (the cost, or the option's one-line verdict). */
  headline?: string;
  /** Small text under the headline ("Annual cost"). */
  sub?: string;
  rows: { label?: string; text: string; mark: CompareMark }[];
};

const MARK_LABEL: Record<CompareMark, string> = { good: "Yes", mixed: "Varies", bad: "No" };

/**
 * Zenith against the alternatives as columns you can scan (owner, 20 Nov
 * 2026, after DesignMe's freelancer / DesignMe / agency cards): one card per
 * option, its icon and name, the headline answer large, then the same rows
 * down every card, each marked with a tick, a dash or a cross. Ours is the
 * white card with the badge.
 *
 * All side by side from `fitAt`; below that, a snap slider with ours first,
 * so a phone sees the answer before the alternatives. Used by the /case-
 * studies comparison and the Wix Studio design page's.
 */
export function CompareColumns({
  header,
  options,
  labels,
  tone = "dark",
}: {
  header: React.ReactNode;
  options: CompareOption[];
  labels: { prev: string; next: string; region: string };
  tone?: "dark" | "light";
}) {
  const four = options.length >= 4;
  // Ours first: it's the card a phone should open on.
  const ordered = [...options.filter((o) => o.ours), ...options.filter((o) => !o.ours)];
  return (
    <SnapSlider
      header={header}
      labels={labels}
      tone={tone}
      fitAt={four ? "xl" : "lg"}
      slideClassName={cn(
        "w-[85%] sm:w-[calc(50%-12px)]",
        four ? "xl:w-[calc((100%-72px)/4)]" : "lg:w-[calc((100%-48px)/3)]",
      )}
      trackClassName="-mx-4 scroll-px-4 px-4 pb-6 pt-2"
    >
      {ordered.map((o) => (
        <Card key={o.name} option={o} tone={tone} />
      ))}
    </SnapSlider>
  );
}

function Card({ option: o, tone }: { option: CompareOption; tone: "dark" | "light" }) {
  const white = o.ours;
  // Text colours by ground: the white card, or a card on the section's tone.
  const muted = white || tone === "light" ? "text-light-muted" : "text-text-muted";
  const rule = white || tone === "light" ? "divide-light-border" : "divide-border";
  return (
    <article
      className={cn(
        "type-card flex w-full flex-col rounded-card border p-6 md:p-7",
        white
          ? "tone-light border-white bg-white text-light-text shadow-[0_1px_2px_rgba(10,16,32,0.05),0_22px_48px_-22px_rgba(10,16,32,0.45)]"
          : tone === "dark"
            ? "border-border bg-surface/60 text-text backdrop-blur-md"
            : "border-light-border bg-light-surface text-light-text",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border",
            white || tone === "light" ? "border-light-border bg-light-bg" : "border-border bg-bg/60",
          )}
        >
          <FeatureIcon name={o.icon} />
        </span>
        {o.badge ? (
          <span className="rounded-[4px] bg-accent px-2.5 py-1 font-mono text-label uppercase track-label text-accent-ink">
            {o.badge}
          </span>
        ) : null}
      </div>

      <h3 className="mt-6 font-display text-h3 font-medium leading-tight tracking-tight">{o.name}</h3>
      {o.headline ? (
        <p className="mt-3 font-display text-[clamp(1.375rem,2.2vw,1.875rem)] font-medium leading-tight tracking-tight">
          {o.headline}
        </p>
      ) : null}
      {o.sub ? <p className={cn("mt-1.5 text-body", muted)}>{o.sub}</p> : null}

      <ul className={cn("mt-6 divide-y border-t", rule, white || tone === "light" ? "border-light-border" : "border-border")}>
        {o.rows.map((row) => (
          <li key={(row.label ?? "") + row.text} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3 py-3.5">
            <Mark mark={row.mark} muted={muted} />
            <div>
              {row.label ? (
                <p className={cn("font-mono text-label uppercase track-label", muted)}>{row.label}</p>
              ) : null}
              <p className={cn("text-body leading-snug", row.label && "mt-1", !white && row.mark !== "good" && tone === "dark" && "text-text/90")}>
                {row.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Mark({ mark, muted }: { mark: CompareMark; muted: string }) {
  const icon = mark === "good" ? "check" : mark === "mixed" ? "minus" : null;
  return (
    <span className={cn("mt-0.5", mark === "good" ? "" : muted)}>
      {icon ? (
        <FeatureIcon name={icon} className="h-[18px] w-[18px]" />
      ) : (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      )}
      <span className="sr-only">{MARK_LABEL[mark]}</span>
    </span>
  );
}
