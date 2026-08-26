import { VerifiedCheck } from "@/components/ui/VerifiedCheck";

import { Check, Line, SceneCard } from "./shell";

/**
 * Scenes for /services/wix-studio-website-design.
 */

/**
 * "You've outgrown the template": three rigid equal boxes; the content block
 * grows past its cell and gets clipped (red hairline), then the boxes reflow
 * into an asymmetric layout where the same block fits.
 */
export function TemplateScene() {
  return (
    <SceneCard
      label="Current build"
      note="The layout stops fighting the content when it's built around it."
    >
      <div className="relative mt-4 h-[216px]">
        {/* Browser chrome */}
        <div className="absolute inset-x-0 top-0 flex h-8 items-center gap-1.5 rounded-[6px] border border-light-border bg-light-surface px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-light-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-light-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-light-border" />
          <span className="ml-2 h-1.5 w-24 rounded-full bg-light-border" />
        </div>

        {/* Box A — carries the content block that outgrows the template */}
        <div className="absolute left-0 top-[44px] h-[172px] w-[65%] overflow-hidden rounded-[6px] border border-light-border bg-light-surface p-2 [animation:wf-box-a_4.5s_ease-in-out_both]">
          <div className="h-[128px] rounded-[4px] border border-accent-line bg-accent-subtle p-2.5 [animation:wf-strain_4.5s_ease-in-out_both]">
            <Line className="w-3/4 bg-accent/30" />
            <Line className="mt-2 w-1/2 bg-accent/30" />
            <Line className="mt-2 w-2/3 bg-accent/30" />
          </div>
          {/* Clip warning while the template still cuts the block off */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-negative [animation:wf-flash_4.5s_linear_both]" />
          {/* Fits once the layout reflows around it */}
          <span className="absolute bottom-2 right-2 text-positive-ink [animation:wf-pop_.35s_ease-out_3.8s_both]">
            <Check />
          </span>
        </div>

        {/* Boxes B and C — the interchangeable template cells */}
        <div className="absolute left-[68.5%] top-[44px] h-[82px] w-[31.5%] rounded-[6px] border border-light-border bg-light-surface p-2.5 [animation:wf-box-b_4.5s_ease-in-out_both]">
          <Line className="w-3/4 bg-light-border" />
          <Line className="mt-2 w-1/2 bg-light-border" />
        </div>
        <div className="absolute left-[68.5%] top-[134px] h-[82px] w-[31.5%] rounded-[6px] border border-light-border bg-light-surface p-2.5 [animation:wf-box-c_4.5s_ease-in-out_both]">
          <Line className="w-3/4 bg-light-border" />
          <Line className="mt-2 w-1/2 bg-light-border" />
        </div>
      </div>
    </SceneCard>
  );
}

/**
 * "The last agency burned you": two sent messages with no reply (a typing
 * indicator appears, then gives up), while the launch pill below abandons
 * two dates and the progress bar never catches it.
 */
export function AgencyScene() {
  return (
    <SceneCard label="Last engagement">
      <div className="mt-5 flex flex-col gap-3">
        <div className="max-w-[80%] self-end [animation:wf-rise_.4s_ease-out_.3s_both]">
          <div className="rounded-[8px] rounded-br-[2px] bg-bg px-4 py-2.5 text-[13px] leading-snug text-white">
            Any update on the site?
          </div>
          <p className="mt-1.5 text-right font-mono text-[10px] uppercase track-label text-light-muted">
            Week 2 · sent
          </p>
        </div>

        {/* The reply that never arrives */}
        <div className="self-start [animation:wf-fade_.3s_ease-out_1.1s_both,wf-exit_.3s_ease-out_2.3s_forwards]">
          <div className="flex items-center gap-1 rounded-[8px] rounded-bl-[2px] border border-light-border bg-light-surface px-4 py-3.5">
            <span className="h-1.5 w-1.5 rounded-full bg-light-muted [animation:wf-dot_.9s_ease-in-out_infinite]" />
            <span className="h-1.5 w-1.5 rounded-full bg-light-muted [animation:wf-dot_.9s_ease-in-out_.15s_infinite]" />
            <span className="h-1.5 w-1.5 rounded-full bg-light-muted [animation:wf-dot_.9s_ease-in-out_.3s_infinite]" />
          </div>
        </div>

        <div className="max-w-[80%] self-end [animation:wf-rise_.4s_ease-out_2.9s_both]">
          <div className="rounded-[8px] rounded-br-[2px] bg-bg px-4 py-2.5 text-[13px] leading-snug text-white">
            Hello? Checking in again.
          </div>
          <p className="mt-1.5 text-right font-mono text-[10px] uppercase track-label text-light-muted">
            Week 5 · sent
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-light-border pt-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-label uppercase track-label text-light-muted">
            Launch date
          </p>
          <p className="font-mono text-[10px] uppercase track-label text-negative-ink [animation:wf-fade_.3s_ease-out_3.6s_both]">
            Moved twice
          </p>
        </div>
        <div className="relative mt-3 h-10">
          <div className="absolute inset-x-0 top-[26px] h-[6px] rounded-full border border-light-border bg-light-surface" />
          <div className="absolute left-[1px] top-[27px] h-[4px] w-[46%] origin-left rounded-full bg-bg [animation:wf-grow_4.5s_linear_.2s_both]" />
          {/* Ghost ticks where the launch used to be */}
          <span className="absolute left-[46%] top-[20px] h-4 w-px bg-negative/50 [animation:wf-fade_.3s_ease-out_2.2s_both]" />
          <span className="absolute left-[calc(46%+34px)] top-[20px] h-4 w-px bg-negative/50 [animation:wf-fade_.3s_ease-out_3.6s_both]" />
          <div className="absolute left-[46%] top-0 [animation:wf-flag_4.5s_ease-in-out_both]">
            <span className="inline-flex -translate-x-1/2 items-center rounded-full border border-light-border bg-light-bg px-2.5 py-1 font-mono text-[10px] uppercase track-label text-light-text">
              Launch
            </span>
          </div>
        </div>
      </div>
    </SceneCard>
  );
}

/**
 * "You're launching and it has to look established": a bare profile accrues
 * its proof piece by piece — stars, the verified chip, reviews, a logo row —
 * until the founding-date pill is the least interesting thing on the card.
 */
export function LaunchScene() {
  return (
    <SceneCard
      label="Company age"
      aside={
        <span className="rounded-full border border-light-border px-2.5 py-1 font-mono text-[10px] uppercase track-label text-light-muted [animation:wf-dim_4.5s_linear_both]">
          Founded this year
        </span>
      }
    >
      <div className="mt-5 flex items-center gap-3">
        <span className="h-9 w-9 rounded-[6px] bg-bg" />
        <span>
          <Line className="w-24 bg-light-text" />
          <Line className="mt-2 w-16 bg-light-border" />
        </span>
      </div>

      <div className="mt-6 flex items-center gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="text-warning"
            style={{
              animation: `wf-pop 0.35s ease-out ${0.8 + i * 0.15}s both`,
            }}
          >
            <Star />
          </span>
        ))}
        <span className="ml-1.5 font-mono text-label text-light-text [animation:wf-fade_.3s_ease-out_1.7s_both]">
          5.0
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-light-border px-3 py-1.5 text-[13px] font-medium [animation:wf-pop_.35s_ease-out_2.1s_both]">
          <VerifiedCheck className="text-light-text" />
          Verified partner
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-light-border px-3 py-1.5 text-[13px] font-medium [animation:wf-pop_.35s_ease-out_2.5s_both]">
          <span className="flex -space-x-1.5">
            <span className="h-4 w-4 rounded-full border border-light-bg bg-light-border" />
            <span className="h-4 w-4 rounded-full border border-light-bg bg-light-muted/50" />
            <span className="h-4 w-4 rounded-full border border-light-bg bg-light-border" />
          </span>
          Client reviews
        </span>
      </div>

      <div className="mt-6 border-t border-light-border pt-5">
        <p className="font-mono text-label uppercase track-label text-light-muted">
          Trusted by
        </p>
        <div className="mt-3 flex gap-2">
          {[64, 80, 56, 72].map((w, i) => (
            <span
              key={i}
              className="h-6 rounded-[4px] border border-light-border bg-light-surface"
              style={{
                width: w,
                animation: `wf-rise 0.35s ease-out ${2.9 + i * 0.15}s both`,
              }}
            />
          ))}
        </div>
      </div>
    </SceneCard>
  );
}

/** Filled star for the review row. */
function Star() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M11.53 2.3a.53.53 0 0 1 .94 0l2.31 4.68a2.12 2.12 0 0 0 1.6 1.16l5.16.75a.53.53 0 0 1 .3.9l-3.74 3.65a2.12 2.12 0 0 0-.61 1.87l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.12 2.12 0 0 0-1.97 0l-4.62 2.43a.53.53 0 0 1-.77-.56l.88-5.14a2.12 2.12 0 0 0-.61-1.87L2.16 9.8a.53.53 0 0 1 .3-.91l5.16-.75a2.12 2.12 0 0 0 1.6-1.16z" />
    </svg>
  );
}
