import { cn } from "@/lib/utils";

/**
 * Shared parts for the "Who this is for" scenes. The card shell keeps all
 * twelve vignettes in one frame (mono label, optional right-hand reading,
 * optional closing line) so the panel reads as one instrument no matter which
 * tab is open.
 */
export function SceneCard({
  label,
  aside,
  note,
  children,
}: {
  label: string;
  aside?: React.ReactNode;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-[8px] border border-light-border bg-light-bg p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-label uppercase track-label text-light-muted">
            {label}
          </p>
          {aside}
        </div>
        {children}
        {note ? (
          <p className="mt-4 text-body text-light-muted">{note}</p>
        ) : null}
      </div>
    </div>
  );
}

/**
 * A readout that steps through values in place ("2 days" then "6 days" then
 * "11 days"). Every value shares one grid cell, so the box is as wide as the
 * widest reading and never reflows or spills past its container as the
 * readings swap. Only the last one holds, which is also where reduced motion
 * lands.
 */
export function Reading({
  values,
  start = 0.8,
  step = 1.2,
  className,
  finalClassName,
}: {
  values: string[];
  start?: number;
  step?: number;
  className?: string;
  /**
   * Applied to the last reading only, for a readout that changes meaning as
   * well as value ("not built" then "live"). `cn` is a plain join, so keep
   * any colour here out of `className` rather than relying on an override.
   */
  finalClassName?: string;
}) {
  const last = values.length - 1;
  return (
    <span className="inline-grid justify-items-end">
      {values.map((v, i) => (
        <span
          key={v}
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap",
            className,
            i === last && finalClassName,
          )}
          style={{
            // Each reading clears within its own step, so two never overlap
            // in the shared cell.
            animation:
              i < last
                ? `wf-blip ${step}s ease-out ${start + i * step}s both`
                : `wf-fade .35s ease-out ${start + i * step}s both`,
          }}
        >
          {v}
        </span>
      ))}
    </span>
  );
}

/** Placeholder copy line inside a wireframe. */
export function Line({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full", className)} />;
}

/** Small filled check for "this part is already fine" rows. */
export function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 shrink-0", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5.03 7.53-6 6a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l2.47 2.47 5.47-5.47a.75.75 0 1 1 1.06 1.06z" />
    </svg>
  );
}
