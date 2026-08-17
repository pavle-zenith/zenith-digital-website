import { Check, Reading, SceneCard } from "./shell";

/**
 * Scenes for /services/website-migration.
 */

/**
 * "Maintenance has become someone's job": update badges pile onto the stack
 * one by one, then the theme breaks against a new PHP version and the
 * retainer line appears underneath.
 */
export function UpkeepScene() {
  const rows = [
    { name: "Page builder licence", at: 0.6 },
    { name: "Forms add-on", at: 1.1 },
    { name: "SEO plugin", at: 1.6 },
  ];

  return (
    <SceneCard
      label="Upkeep"
      aside={
        <Reading
          values={["1 update", "4 updates", "9 updates"]}
          start={0.6}
          className="font-mono text-[10px] uppercase track-label text-warning-ink"
        />
      }
      note="None of it makes the site better. All of it has to happen."
    >
      <div className="mt-5 flex flex-col divide-y divide-light-border border-y border-light-border">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between gap-3 py-3"
          >
            <span className="text-[13px]">{r.name}</span>
            <span
              className="rounded-full border border-warning/40 bg-warning/10 px-2.5 py-0.5 font-mono text-[10px] uppercase track-label text-warning-ink"
              style={{ animation: `wf-pop .3s ease-out ${r.at}s both` }}
            >
              Update
            </span>
          </div>
        ))}

        {/* The one that stops being routine */}
        <div className="flex items-center justify-between gap-3 py-3">
          <span className="text-[13px]">Theme</span>
          <span className="rounded-full border border-negative/40 bg-negative/10 px-2.5 py-0.5 font-mono text-[10px] uppercase track-label text-negative-ink [animation:wf-pop_.3s_ease-out_2.4s_both]">
            Breaks on PHP 8.2
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2.5 [animation:wf-fade_.4s_ease-out_3.1s_both]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-warning" />
        <span className="text-[13px] text-light-muted">
          Developer on retainer to keep it standing
        </span>
      </div>
    </SceneCard>
  );
}

/**
 * "The platform bill keeps climbing": five renewals land on the same bar,
 * each one taking a bigger bite out of the year.
 */
export function StackCostScene() {
  const items = [
    { name: "Hosting", width: "24%", tone: "bg-bg" },
    { name: "Builder licence", width: "22%", tone: "bg-bg/80" },
    { name: "Forms add-on", width: "16%", tone: "bg-bg/60" },
    { name: "SEO plugin", width: "20%", tone: "bg-bg/45" },
    { name: "Backups", width: "18%", tone: "bg-bg/30" },
  ];

  return (
    <SceneCard
      label="Annual stack cost"
      aside={
        <Reading
          values={["Manageable", "Adding up", "Rising"]}
          start={0.9}
          className="font-mono text-[10px] uppercase track-label text-warning-ink"
        />
      }
      note="Five renewals, one number, and it only moves one way."
    >
      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-light-surface">
        {items.map((it, i) => (
          <span
            key={it.name}
            className={`h-full origin-left ${it.tone}`}
            style={{
              width: it.width,
              animation: `wf-grow .45s ease-out ${0.4 + i * 0.45}s both`,
            }}
          />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
        {items.map((it, i) => (
          <span
            key={it.name}
            className="flex items-center gap-2 text-[13px] text-light-muted"
            style={{
              animation: `wf-fade .35s ease-out ${0.5 + i * 0.45}s both`,
            }}
          >
            <span className={`h-2.5 w-2.5 shrink-0 rounded-[2px] ${it.tone}`} />
            {it.name}
          </span>
        ))}
      </div>
    </SceneCard>
  );
}

/**
 * "Nobody in-house can change anything": the marketing request joins a queue
 * behind developer work and waits, while the content itself sits ready.
 */
export function EditQueueScene() {
  return (
    <SceneCard
      label="Time to publish a page"
      aside={
        <Reading
          values={["2 days", "6 days", "11 days"]}
          start={1.4}
          step={1.1}
          className="font-mono text-[10px] uppercase track-label text-negative-ink"
        />
      }
      note="Every small edit costs a developer's attention."
    >
      <div className="mt-5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-3 rounded-[6px] border border-light-border bg-light-surface px-4 py-3 [animation:wf-fade_.35s_ease-out_.2s_both]">
          <span className="text-[13px] text-light-muted">Dev: API fix</span>
          <span className="font-mono text-[10px] uppercase track-label text-light-muted">
            In progress
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-[6px] border border-light-border bg-light-surface px-4 py-3 [animation:wf-fade_.35s_ease-out_.5s_both]">
          <span className="text-[13px] text-light-muted">
            Dev: checkout bug
          </span>
          <span className="font-mono text-[10px] uppercase track-label text-light-muted">
            Queued
          </span>
        </div>

        {/* The page marketing wanted live this morning */}
        <div className="flex items-center justify-between gap-3 rounded-[6px] border border-accent-line bg-accent-subtle px-4 py-3 [animation:wf-slide_.4s_ease-out_1s_both]">
          <span className="text-[13px] font-medium">
            Marketing: publish a page
          </span>
          <span className="font-mono text-[10px] uppercase track-label text-light-muted">
            Waiting
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2.5 [animation:wf-fade_.4s_ease-out_3.6s_both]">
        <Check className="text-positive-ink" />
        <span className="text-[13px] text-light-muted">
          The copy was approved on day one
        </span>
      </div>
    </SceneCard>
  );
}
