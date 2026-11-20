import Image from "next/image";

import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";

export type GridColumn = { name: string; logo?: string };
export type GridCell = {
  text: string;
  /** The fuller sentence, shown when the reader asks for details. */
  detail?: string;
  /** This platform has the edge on the row: set in full ink. */
  edge?: boolean;
};
export type GridRow = { label: string; icon: string; cells: [GridCell, GridCell] };

/** A criterion's icon from its name, so content files carry no icon lists. */
export function criterionIcon(label: string): string {
  const l = label.toLowerCase();
  const pick: [RegExp, string][] = [
    [/best for/, "user"],
    [/ai search|llms/, "sparkles"],
    [/hosting/, "server"],
    [/security|update/, "shield"],
    [/design/, "palette"],
    [/seo/, "search"],
    [/cms|content|collection/, "layers"],
    [/multiling|language|locali/, "languages"],
    [/commerce|store|shop/, "cart"],
    [/plugin|app|integration/, "puzzle"],
    [/editor|role|seat|collaborat/, "users"],
    [/^build/, "brush"],
    [/cost|price|plan/, "receipt"],
    [/speed|performance/, "gauge"],
  ];
  return pick.find(([re]) => re.test(l))?.[1] ?? "layout-grid";
}

/**
 * Two platforms side by side (owner, 20 Nov 2026: "more cleanly and spaced
 * out", after a reference): criteria down the left with an icon each, and
 * each platform as its own tall bordered column, headed by its logo, rows
 * aligned across. No pills or per-row toggles; the edge reads as the cell
 * set in full ink. Details, where there are any, live in every cell and
 * show when a `DetailToggle` around the grid is on, so they stay in the HTML.
 *
 * One CSS grid, so rows align without fixed heights: from lg, three
 * columns, each platform cell drawing its column's side rules so the two
 * columns read as cards. On phones, each criterion is a heading over its
 * two cells, side by side, each naming its platform.
 */
export function CompareGrid({
  columns,
  rows,
  caption,
  edgeLabel = "Edge",
}: {
  columns: [GridColumn, GridColumn];
  rows: GridRow[];
  caption: string;
  /** Read out after an edge cell. */
  edgeLabel?: string;
}) {
  const last = rows.length - 1;
  return (
    <div role="table" aria-label={caption} className="type-card grid grid-cols-2 gap-x-3 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-6">
      {/* Column heads: the logo and name, the top of each column card. */}
      <div role="row" className="contents">
        <span role="columnheader" className="hidden lg:block">
          <span className="sr-only">Criterion</span>
        </span>
        {columns.map((col) => (
          <span
            key={col.name}
            role="columnheader"
            className="hidden items-center gap-3 rounded-t-card border-x border-t border-light-border bg-light-bg px-8 py-7 lg:flex"
          >
            {col.logo ? (
              <Image src={col.logo} alt="" width={28} height={28} unoptimized className="h-7 w-7 object-contain" />
            ) : null}
            <span className="font-display text-h3 font-medium leading-none tracking-tight">{col.name}</span>
          </span>
        ))}
      </div>

      {rows.map((row, i) => (
        <div key={row.label} role="row" className="contents">
          <span
            role="rowheader"
            className={cn(
              "col-span-2 flex items-center gap-3 font-display text-body-lg font-medium leading-snug text-light-text lg:col-span-1 lg:py-6",
              i > 0 ? "mt-7 lg:mt-0" : "",
              i > 0 && "lg:border-t lg:border-light-border",
            )}
          >
            <FeatureIcon name={row.icon} className="h-5 w-5 shrink-0 text-light-muted" />
            {row.label}
          </span>
          {row.cells.map((cell, j) => (
            <span
              key={j}
              role="cell"
              className={cn(
                // Phones: a small bordered box naming its platform.
                "mt-3 rounded-[6px] border border-light-border px-3.5 py-3 text-[0.9375rem] leading-snug",
                // From lg: a slice of the platform's column card.
                "lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:rounded-none lg:px-8 lg:py-6 lg:text-body lg:leading-relaxed",
                // Only the last row closes the column card; the rest leave
                // their bottom to the next row's top rule.
                i === last ? "lg:rounded-b-card" : "lg:border-b-0",
                // The winner on the row (owner, 20 Nov 2026: "highlight the
                // winning rows a bit more"): a faint ink wash, full-ink text
                // and a check, so it reads at a glance down the column.
                cell.edge ? "bg-accent-subtle font-medium text-light-text" : "text-light-muted lg:bg-light-bg",
              )}
            >
              <span className="mb-1 block font-mono text-label font-normal uppercase track-label text-light-muted lg:sr-only">
                {columns[j].name}
              </span>
              <span>
                {cell.edge ? (
                  <FeatureIcon name="check" className="mr-2 inline-block h-4 w-4 align-[-2px] text-accent" />
                ) : null}
                {cell.text}
                {cell.edge ? <span className="sr-only"> ({edgeLabel})</span> : null}
              </span>
              {cell.detail ? (
                <span className="mt-2 hidden text-[0.875rem] font-normal leading-relaxed text-light-muted group-data-[details=on]/details:block">
                  {cell.detail}
                </span>
              ) : null}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
