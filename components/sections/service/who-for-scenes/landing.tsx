import { Check, Line, Reading, SceneCard } from "./shell";

/**
 * Scenes for /services/landing-pages.
 */

/**
 * "Your ads point at the homepage": the ad makes one promise, the page that
 * opens offers eleven other things, and the cursor hunts for the one thing
 * that was clicked on.
 */
export function AdMismatchScene() {
  return (
    <SceneCard
      label="Ad destination"
      note="The click is paid for either way. Only the landing decides what it earns."
    >
      {/* The ad: one promise */}
      <div className="mt-5 rounded-[6px] border border-light-border bg-light-bg p-3 [animation:wf-rise_.4s_ease-out_.2s_both]">
        <div className="flex items-center gap-2">
          <span className="rounded-[3px] border border-light-border px-1.5 py-0.5 font-mono text-[9px] uppercase track-label text-light-muted">
            Ad
          </span>
          <Line className="w-24 bg-light-border" />
        </div>
        <div className="mt-2.5 rounded-[4px] border border-accent-line bg-accent-subtle px-2.5 py-1.5">
          <span className="text-[12px] font-medium">One specific offer</span>
        </div>
      </div>

      {/* The page it opens: eleven other things */}
      <div className="relative mt-3 rounded-[6px] border border-light-border bg-light-surface p-3">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-3 flex-1 rounded-[3px] bg-light-border"
              style={{
                animation: `wf-fade .3s ease-out ${0.7 + i * 0.08}s both`,
              }}
            />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="h-11 rounded-[3px] border border-light-border bg-light-bg"
              style={{
                animation: `wf-fade .3s ease-out ${1 + i * 0.08}s both`,
              }}
            />
          ))}
        </div>

        {/* Hunting for what the ad promised */}
        <span
          className="pointer-events-none absolute left-2 top-3 text-light-text [animation:wf-hunt_4s_ease-in-out_1.4s_both]"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="m5 2 14 10.5-6.2.9 3.4 6.6-2.8 1.5-3.4-6.6L5 19z" />
          </svg>
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2.5 [animation:wf-fade_.4s_ease-out_4.6s_both]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-negative" />
        <span className="text-[13px] text-light-muted">
          Eleven destinations, none of them the offer
        </span>
      </div>
    </SceneCard>
  );
}

/**
 * "You're launching an offer or a campaign": the date doesn't move, so the
 * page gets built against it and goes live first.
 */
export function CampaignDateScene() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <SceneCard
      label="Campaign date"
      aside={
        <Reading
          values={["14 days", "6 days", "2 days"]}
          start={0.7}
          className="font-mono text-[10px] uppercase track-label text-light-text"
        />
      }
      note="The date is fixed. The page is what has to move."
    >
      <div className="mt-5 flex gap-1.5">
        {days.map((d, i) => {
          const isLaunch = i === days.length - 1;
          return (
            <span
              key={i}
              className={`flex h-12 flex-1 flex-col items-center justify-center gap-1 rounded-[6px] border font-mono text-[10px] uppercase track-label ${
                isLaunch
                  ? "border-accent bg-accent text-white"
                  : "border-light-border bg-light-surface text-light-muted"
              }`}
              style={{
                animation: `wf-fade .3s ease-out ${0.2 + i * 0.09}s both`,
              }}
            >
              {d}
              {isLaunch ? <span className="text-[9px]">Live</span> : null}
            </span>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium">Landing page</span>
          <Reading
            values={["Not built", "In build", "Live"]}
            start={1}
            step={1.3}
            className="font-mono text-[10px] uppercase track-label"
            finalClassName="text-positive-ink"
          />
        </div>
        <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-light-surface">
          <span className="block h-full w-full origin-left rounded-full bg-bg [animation:wf-grow_3.4s_ease-in-out_.6s_both]" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2.5 [animation:wf-fade_.4s_ease-out_4s_both]">
        <Check className="text-positive-ink" />
        <span className="text-[13px] text-light-muted">
          Live before the traffic arrives, not after
        </span>
      </div>
    </SceneCard>
  );
}

/**
 * "You're an agency short on build capacity": booked work stacks past the
 * line the studio can actually deliver, then the overflow changes hands and
 * ships under the partner's brand.
 */
export function CapacityScene() {
  // One block per booked project, stacked bottom-up in equal units so the
  // capacity line lands in a gap rather than slicing through a block. A block
  // is overflow when everything beneath it already reaches the line.
  const UNIT = 26;
  const GAP = 4;
  const CAP = 88;
  const weeks = [2, 3, 4, 5].map((count, w) =>
    Array.from({ length: count }, (_, i) => ({
      over: i * (UNIT + GAP) >= CAP,
      delay: 0.3 + w * 0.12 + i * 0.06,
    })),
  );

  return (
    <SceneCard
      label="Build queue"
      aside={
        <Reading
          values={["Booked", "At capacity", "Over"]}
          start={0.8}
          className="font-mono text-[10px] uppercase track-label text-warning-ink"
        />
      }
      note="The work above the line stops being a staffing problem."
    >
      <div className="relative mt-6 h-[150px]">
        {/* What the team can actually deliver */}
        <div className="absolute inset-x-0 bottom-[88px] flex items-center gap-2">
          <span className="h-px flex-1 border-t border-dashed border-light-border" />
          <span className="font-mono text-[10px] uppercase track-label text-light-muted">
            Capacity
          </span>
        </div>

        <div className="flex h-full items-end gap-3">
          {weeks.map((blocks, w) => (
            <div key={w} className="flex flex-1 flex-col justify-end gap-1">
              {/* Rendered top-down, so the stack reads bottom-up on screen. */}
              {[...blocks].reverse().map((b, i) => (
                <span
                  key={i}
                  // Overflow blocks end on the accent (wf-absorb holds its
                  // last frame), which is also their base colour.
                  className={`origin-bottom rounded-[3px] ${b.over ? "bg-accent" : "bg-light-border"}`}
                  style={{
                    height: UNIT,
                    animation: b.over
                      ? `wf-grow-y .45s ease-out ${b.delay}s both, wf-absorb 4.5s ease-in-out both`
                      : `wf-grow-y .45s ease-out ${b.delay}s both`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2.5 [animation:wf-fade_.4s_ease-out_3.6s_both]">
        <span className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-accent" />
        <span className="text-[13px] text-light-muted">
          Built under your brand, at partner rates
        </span>
      </div>
    </SceneCard>
  );
}
