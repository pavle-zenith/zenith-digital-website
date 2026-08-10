import { cn } from "@/lib/utils";

type Report = {
  label: string;
  score: string;
  scoreLabel: string;
  delta: string;
  findings: { text: string; severity: string }[];
};

const SEVERITY: Record<string, string> = {
  high: "bg-[#E5484D]",
  med: "bg-[#F5A623]",
  low: "bg-positive",
};

/**
 * Mock audit-report card: score card + top-findings list with severity dots.
 * Light-styled surfaces, so it reads as a white card on dark sections too.
 * Shared between the homepage Audit section and /free-website-audit.
 */
export function AuditReport({ report }: { report: Report }) {
  return (
    <div className="w-full max-w-md">
      {/* Score card */}
      <div className="flex items-center justify-between rounded-[8px] border border-light-border bg-light-bg p-6">
        <div>
          <p className="font-mono text-label uppercase track-label text-light-muted">
            {report.label}
          </p>
          <p className="mt-3 font-display text-display font-medium leading-none tracking-tight text-light-text">
            {report.score}
            <span className="text-h3 text-light-muted">/100</span>
          </p>
          <p className="mt-2 text-body text-light-muted">{report.scoreLabel}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-[#E5484D]/10 px-3 py-1 font-mono text-label uppercase track-label text-[#E5484D]">
          {report.delta}
        </span>
      </div>

      {/* Findings list */}
      <div className="mt-3 rounded-[8px] border border-light-border bg-light-bg p-6">
        <p className="mb-4 font-mono text-label uppercase track-label text-light-muted">
          Top findings
        </p>
        <ul className="flex flex-col gap-4">
          {report.findings.map((f) => (
            <li key={f.text} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                  SEVERITY[f.severity],
                )}
              />
              <span className="text-body text-light-text">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
