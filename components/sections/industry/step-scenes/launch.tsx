import {
  Check,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";

import { anim, play, tag } from "./parts";

/**
 * The launch step, shared by every industry page that ends with one.
 *
 * Deadline (default, travel's original): the build bar fills and lands
 * "Live" before a fixed outside date, the `milestone` (the season, a drop,
 * an investor meeting), and the launch checklist ticks off underneath.
 *
 * `switchOver` (pages whose launch step is "switch over without taking the
 * site down"): there's no outside date to beat, so the milestone IS the
 * switch. The bar fills to it, the milestone pill pops there, and an
 * "online" line runs underneath from the first frame to the last, through
 * the switch, without a break: old site, then new site, never down.
 */
export function LaunchScene({
  milestone = "Season",
  label = "Launch plan",
  switchOver = false,
}: {
  milestone?: string;
  label?: string;
  switchOver?: boolean;
}) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const checks = switchOver
    ? ["Every old page redirected", "Analytics live"]
    : ["Redirects mapped", "Analytics live", "Search Console verified"];
  const checksAt = switchOver ? 2.7 : 2.5;
  return (
    <SceneCard
      label={label}
      aside={
        <Reading
          values={["Building", "Live"]}
          start={0.3}
          step={2.2}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <div className="mt-5 h-[188px]">
        <div className="grid grid-cols-6">
          {months.map((m) => (
            <span key={m} className={`${tag} text-light-muted`}>
              {m}
            </span>
          ))}
        </div>
        <div className={`relative h-10 ${switchOver ? "mt-5" : "mt-6"}`}>
          {/* Track and the build bar filling it. */}
          <div className="absolute inset-x-0 top-[22px] h-[6px] rounded-full border border-light-border bg-light-surface" />
          <div
            className={`absolute left-[1px] top-[23px] h-[4px] origin-left rounded-full bg-accent ${switchOver ? "w-[66.7%]" : "w-[42%]"}`}
            style={anim(play("wf-grow", 1.9, 0.3))}
          />
          {/* The milestone, fixed. */}
          <span className="absolute left-[66.7%] top-[14px] h-[22px] w-px border-l border-dashed border-light-muted" />
          {/* Centred over the marker. A long milestone ("Investor
              meeting") would run into the "Live" pill on phones, so there it
              ends at the track's right edge instead. */}
          {switchOver ? null : (
            <span
              className={`absolute left-[66.7%] -top-1 -translate-x-1/2 whitespace-nowrap ${tag} text-light-muted ${milestone.length > 10 ? "max-sm:left-auto max-sm:right-0 max-sm:translate-x-0" : ""}`}
            >
              {milestone}
            </span>
          )}
          {/* Deadline: "Live" lands before the milestone. Switch-over: the
                milestone pill pops on the day itself. */}
          <span
            className={`absolute top-0 -translate-x-1/2 ${switchOver ? "left-[66.7%]" : "left-[42%]"}`}
          >
            <span
              className="inline-flex items-center whitespace-nowrap rounded-[4px] bg-accent px-2 py-1 text-[10px] font-medium uppercase track-label text-accent-ink"
              style={anim(play("wf-pop", 0.35, 2.2))}
            >
              {switchOver ? milestone : "Live"}
            </span>
          </span>
        </div>
        {switchOver ? (
          <div className="mt-3">
            <div
              className={`relative flex justify-between ${tag} text-light-muted`}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-positive-ink" />
                Old site
              </span>
              <span
                className="absolute left-[66.7%] inline-flex items-center gap-1.5 pl-2"
                style={anim(play("wf-fade", 0.35, 2.2))}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-positive-ink" />
                New site
              </span>
            </div>
            {/* Online the whole way: one unbroken line, drawn as time
                  passes, straight through the switch. */}
            <div className="relative mt-1.5 h-[3px]">
              <div
                className="absolute inset-0 origin-left rounded-full bg-positive-ink"
                style={anim(play("wf-grow", 3.2, 0.2, "linear"))}
              />
            </div>
          </div>
        ) : null}
        <ul className={`flex flex-col gap-2.5 ${switchOver ? "mt-4" : "mt-5"}`}>
          {checks.map((c, i) => (
            <li
              key={c}
              className="flex items-center gap-2 text-[12px] text-light-text"
              style={anim(play("wf-slide", 0.35, checksAt + i * 0.3))}
            >
              <Check className="h-3.5 w-3.5 text-positive-ink" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </SceneCard>
  );
}
