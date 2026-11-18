import Image from "next/image";

import {
  Line,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";

import {
  Body,
  Done,
  FilterChip,
  PanelTitle,
  PlayIcon,
  Tick,
  Typed,
  anim,
  leaveTo,
  panel,
  play,
  tag,
} from "./parts";

/**
 * Step scenes for /industries/creative. Same family as travel's (see
 * ./parts.tsx for the rules every scene follows).
 */

/** One grid cell over (n cells), as a translate offset. */
const cells = (n: number) => (n === 0 ? "0" : `calc(${n * 100}% + ${n * 8}px)`);

/**
 * Step 1, work: the portfolio reorders around the work the studio wants
 * more of. The three strongest move to the front; the rest fall back.
 */
export function CreativeWorkScene() {
  // Final order, with where each tile started (in cells, column and row).
  const tiles = [
    { name: "Brand film", strong: 1, from: [1, 0] },
    { name: "Car launch", strong: 2, from: [-1, 1] },
    { name: "Fashion", strong: 3, from: [-1, 1] },
    { name: "Events", strong: 0, from: [0, -1] },
    { name: "Wedding", strong: 0, from: [1, -1] },
    { name: "Music", strong: 0, from: [0, 0] },
  ];
  return (
    <SceneCard
      label="Portfolio order"
      aside={
        <Reading
          values={["Archive", "Front three"]}
          start={0.3}
          step={2.0}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body className="grid grid-cols-3 grid-rows-2 gap-2">
        {tiles.map((t, i) => {
          const move = [
            `wf-move .8s cubic-bezier(0.22, 1, 0.36, 1) ${1 + i * 0.05}s both`,
            t.strong
              ? play("wf-target", 0.4, 1.9)
              : play("wf-mute", 0.4, 2.4),
          ];
          return (
            <div
              key={t.name}
              className={
                t.strong
                  ? "relative flex min-w-0 flex-col justify-between rounded-[4px] border border-accent bg-accent-subtle p-2"
                  : "relative flex min-w-0 flex-col justify-between rounded-[4px] border border-light-border bg-light-surface p-2 opacity-40"
              }
              style={
                {
                  "--wf-x": cells(t.from[0]),
                  "--wf-y": cells(t.from[1]),
                  animation: move.join(", "),
                } as React.CSSProperties
              }
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-light-bg text-light-muted">
                <PlayIcon className="ml-px h-2.5 w-2.5" />
              </span>
              <span className="truncate text-[11px] font-medium leading-tight text-light-text">
                {t.name}
              </span>
              {t.strong ? (
                <span
                  className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-medium text-accent-ink"
                  style={anim(play("wf-pop", 0.3, 2.0 + t.strong * 0.15))}
                >
                  {t.strong}
                </span>
              ) : null}
            </div>
          );
        })}
      </Body>
    </SceneCard>
  );
}

/**
 * Step 2, video: the poster frame is there from the first moment, the film
 * starts and plays, and playback checks off on each device.
 */
export function CreativeVideoScene() {
  const devices = [
    { name: "iPhone", at: 2.5 },
    { name: "Android", at: 2.8 },
    { name: "Desktop", at: 3.1 },
  ];
  return (
    <SceneCard
      label="Showreel"
      aside={
        <Reading
          values={["Loading", "Playing"]}
          start={0.3}
          step={0.9}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body>
        {/* The poster has no entrance: it's there on the first frame. */}
        <div className="relative h-[140px] overflow-hidden rounded-[6px] border border-light-border bg-light-surface">
          <Image
            src="/industries/creatives.jpg"
            alt=""
            fill
            sizes="400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-bg/25" />
          <span
            className={`absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 ${tag} text-bg`}
            style={anim(play("wf-exit", 0.3, 1.2))}
          >
            Poster frame
          </span>
          <span
            className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-bg"
            style={anim(play("wf-exit", 0.3, 1.2))}
          >
            <PlayIcon className="ml-0.5 h-3.5 w-3.5" />
          </span>
          <div className="absolute inset-x-3 bottom-3 h-1 rounded-full bg-white/35">
            <div
              className="h-full w-[72%] origin-left rounded-full bg-white"
              style={anim(play("wf-grow", 2.6, 1.2, "linear"))}
            />
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          {devices.map((d) => (
            <span
              key={d.name}
              className="inline-flex items-center gap-1.5 rounded-[4px] border border-light-border bg-light-bg px-2 py-1.5 text-[11px] leading-tight text-light-text"
            >
              {d.name}
              <Tick at={d.at} />
            </span>
          ))}
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 3, portfolio: a sector filter narrows the grid, and one project
 * opens into its case study.
 */
export function CreativePortfolioScene() {
  const tiles = [
    { sector: "Fashion" },
    { sector: "Automotive", hit: true },
    { sector: "Brand film" },
    { sector: "Automotive", hit: true },
    { sector: "Fashion" },
    { sector: "Brand film" },
  ];
  return (
    <SceneCard
      label="Portfolio"
      aside={
        <Reading
          values={["6 projects", "2 projects"]}
          start={0.3}
          step={1.0}
          className={`${tag} text-light-muted`}
          finalClassName="text-light-text"
        />
      }
    >
      <Body>
        <div className="flex flex-wrap gap-1.5">
          <FilterChip label="All" off={1.0} />
          <FilterChip label="Fashion" />
          <FilterChip label="Automotive" on={1.0} />
          {/* Phones drop the fourth pill: it wrapped onto a second row. */}
          <span className="max-sm:hidden">
            <FilterChip label="Brand film" />
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {tiles.map((t, i) => (
            <div
              key={i}
              className={`flex h-[60px] min-w-0 flex-col justify-end rounded-[4px] border border-light-border bg-light-surface p-1.5 ${t.hit ? "" : "opacity-25"}`}
              style={t.hit ? undefined : anim(play("wf-mute", 0.4, 1.2))}
            >
              <span className="truncate text-[10px] leading-tight text-light-muted">
                {t.sector}
              </span>
            </div>
          ))}
        </div>
        {/* The project opening into its case study, from its tile. */}
        <div
          className="absolute inset-x-[10%] bottom-0 top-9 flex origin-top flex-col rounded-[6px] border border-light-border bg-light-bg p-3"
          style={anim(play("wf-pop", 0.4, 2.0))}
        >
          <p className={`${tag} text-light-muted`}>Case study</p>
          <p className="mt-1 font-display text-[15px] font-medium leading-tight text-light-text">
            Car launch film
          </p>
          <p className="mt-1 text-[11px] text-light-muted">Automotive, 60 seconds</p>
          <div className="mt-3 flex flex-col gap-1.5">
            <Line className="w-full bg-light-border" />
            <Line className="w-4/5 bg-light-border" />
          </div>
          <span
            className="mt-auto text-[11px] font-medium text-light-text"
            style={anim(play("wf-fade", 0.3, 2.6))}
          >
            View case study <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 4, enquiries: a vague "how much?" becomes a brief with the four
 * things needed to price the job.
 */
export function CreativeEnquiryScene() {
  const fields = [
    { k: "Type", v: "Brand film", at: 1.9 },
    { k: "Length", v: "60 seconds", at: 2.3 },
    { k: "Date", v: "June", at: 2.7 },
    { k: "Budget", v: "£5k to £10k", at: 3.1 },
  ];
  return (
    <SceneCard label="Enquiry" aside={<Done at={3.5}>Brief ready</Done>}>
      <Body className="grid">
        <div
          className="col-start-1 row-start-1 self-start"
          style={anim(play("wf-rise", 0.4, 0.2))}
        >
          <p
            className="inline-block rounded-[10px] rounded-bl-[2px] border border-light-border bg-light-surface px-3 py-2 text-[12px] leading-tight text-light-text"
            style={leaveTo("0", "-10px", 0.4, 1.3)}
          >
            How much for a video?
          </p>
        </div>
        <div
          className={`col-start-1 row-start-1 ${panel}`}
          style={anim(play("wf-rise", 0.45, 1.5))}
        >
          <PanelTitle icon="clipboard">Project brief</PanelTitle>
          <div className="mt-3 flex flex-col gap-2">
            {fields.map((f) => (
              <div
                key={f.k}
                className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-2"
              >
                <span className={`${tag} text-light-muted`}>{f.k}</span>
                <span className="flex h-7 items-center rounded-[4px] border border-light-border bg-light-bg px-2.5 text-[12px] leading-none text-light-text">
                  <Typed text={f.v} at={f.at} dur={0.35} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Body>
    </SceneCard>
  );
}
