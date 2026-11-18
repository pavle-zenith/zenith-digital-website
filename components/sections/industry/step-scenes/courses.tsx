import {
  Line,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

import {
  Body,
  Done,
  PanelTitle,
  Tick,
  Typed,
  anim,
  cta,
  field,
  moveFrom,
  play,
  slot,
  slotOn,
  tag,
} from "./parts";

/**
 * Step scenes for /industries/courses. Same family as travel's (see
 * ./parts.tsx for the rules every scene follows).
 */

/**
 * Step 1, offer: each offer sorts into its own lane, and each lane gets its
 * own last step.
 */
export function CoursesOfferScene() {
  const lanes = [
    { name: "Cohort", icon: "users", offer: "Spring cohort", step: "Apply", from: ["60px", "45px"] },
    { name: "Self-paced", icon: "video", offer: "Masterclass", step: "Buy now", from: ["-60px", "45px"] },
    { name: "Live event", icon: "calendar", offer: "Paint day, May", step: "Register", from: ["60px", "-45px"] },
    { name: "Library", icon: "layers", offer: "Colour index", step: "Subscribe", from: ["-60px", "-45px"] },
  ];
  return (
    <SceneCard
      label="Launch plan"
      aside={
        <Reading
          values={["Sorting", "Mapped"]}
          start={0.3}
          step={2.5}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body className="grid grid-cols-2 grid-rows-2 gap-2">
        {lanes.map((l, i) => (
          <div
            key={l.name}
            className="flex min-w-0 flex-col items-start rounded-[6px] border border-light-border bg-light-surface p-2.5"
          >
            <PanelTitle icon={l.icon}>{l.name}</PanelTitle>
            <span
              className={`mt-2 max-w-full truncate ${slot}`}
              style={moveFrom(
                l.from[0],
                l.from[1],
                0.6,
                0.7 + i * 0.25,
                play("wf-fade", 0.3, 0.2),
              )}
            >
              {l.offer}
            </span>
            <span
              className="mt-auto rounded-[4px] bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-ink"
              style={anim(play("wf-pop", 0.3, 1.6 + i * 0.25))}
            >
              {l.step}
            </span>
          </div>
        ))}
      </Body>
    </SceneCard>
  );
}

/**
 * Step 2, platform: a sales page, a checkout and a course area that each
 * had their own tool and login slide together into one system.
 */
export function CoursesPlatformScene() {
  const parts = [
    { name: "Sales page", icon: "layout-grid", from: "-22px" },
    { name: "Checkout", icon: "card", from: "0" },
    { name: "Lessons", icon: "video", from: "22px" },
  ];
  return (
    <SceneCard
      label="Course platform"
      aside={
        <Reading
          values={["3 tools", "1 system"]}
          start={0.3}
          step={2.0}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body>
        {/* The one system, arriving around the parts as they meet. */}
        <div
          className="absolute inset-0 rounded-[8px] border border-light-border bg-light-surface"
          style={anim(play("wf-fade", 0.5, 1.7))}
        />
        <div className="relative p-3">
          <span style={anim(play("wf-fade", 0.4, 1.8))} className="block">
            <PanelTitle icon="graduation-cap">Wix Courses</PanelTitle>
          </span>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {parts.map((p) => (
              <div
                key={p.name}
                className="min-w-0 rounded-[6px] border border-light-border bg-light-bg p-2"
                style={moveFrom(p.from, p.from === "0" ? "-6px" : "6px", 0.7, 0.9)}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-[4px] border border-light-border bg-light-surface text-light-text">
                  <FeatureIcon name={p.icon} className="h-3.5 w-3.5" />
                </span>
                <p className="mt-1.5 text-[11px] font-medium leading-tight text-light-text">
                  {p.name}
                </p>
                <div className="mt-2 flex flex-col gap-1.5">
                  <Line className="w-full bg-light-border" />
                  <Line className="w-3/4 bg-light-border" />
                  <Line className="w-5/6 bg-light-border" />
                </div>
              </div>
            ))}
          </div>
          {/* A login per tool, replaced by one login for the whole system. */}
          <div className="relative mt-2 h-4">
            <div className="grid grid-cols-3 gap-2">
              {parts.map((p) => (
                <p
                  key={p.name}
                  className={`flex items-center gap-1 ${tag} text-light-muted`}
                  style={anim(play("wf-exit", 0.3, 0.9))}
                >
                  <FeatureIcon name="lock" className="h-3 w-3" />
                  Login
                </p>
              ))}
            </div>
            <p
              className={`absolute inset-x-0 top-0 flex items-center justify-center gap-1 ${tag} text-light-text`}
              style={anim(play("wf-rise", 0.4, 2.4))}
            >
              <FeatureIcon name="lock" className="h-3 w-3" />
              One login
            </p>
          </div>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 3, launch pages: the page assembles the things a buyer checks before
 * paying: what they'll learn, when it starts, places left. The button lands
 * last.
 */
export function CoursesLaunchPageScene() {
  const weeks = [
    "Week 1: materials and washes",
    "Week 2: colour mixing",
    "Week 3: light and shadow",
  ];
  return (
    <SceneCard label="Launch page" aside={<Done at={3.0}>Ready</Done>}>
      <Body>
        <div className="flex h-full flex-col rounded-[6px] border border-light-border bg-light-bg p-3">
          <p
            className="font-display text-[15px] font-medium leading-tight text-light-text"
            style={anim(play("wf-rise", 0.4, 0.2))}
          >
            Six-week watercolour cohort
          </p>
          <ul className="mt-2">
            {weeks.map((w, i) => (
              <li
                key={w}
                className="flex h-[18px] items-center border-b border-light-border text-[11px] text-light-muted"
                style={anim(play("wf-slide", 0.35, 0.5 + i * 0.15))}
              >
                <span className="truncate">{w}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className={slot} style={anim(play("wf-rise", 0.4, 1.3))}>
              Starts 3 March
            </span>
            <span
              className="rounded-full border border-accent-line bg-accent-subtle px-2 py-1 text-[11px] font-medium leading-tight text-light-text"
              style={anim(play("wf-pop", 0.35, 1.8))}
            >
              8 places left
            </span>
          </div>
          <span
            className={`mt-auto self-start ${cta}`}
            style={anim(play("wf-pop", 0.35, 2.5))}
          >
            Reserve your place
          </span>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 4, library: a search narrows the reference under the three ways
 * people look things up: the surface, the problem and the technique.
 */
export function CoursesLibraryScene() {
  const facets = [
    { name: "Surface", entries: [{ t: "Brick" }, { t: "Painted timber", hit: true }] },
    { name: "Problem", entries: [{ t: "Flaking paint", hit: true }, { t: "Damp" }] },
    { name: "Technique", entries: [{ t: "Limewash" }, { t: "Scrape and prime", hit: true }] },
  ];
  return (
    <SceneCard
      label="Library"
      aside={
        <Reading
          values={["Searching", "3 results"]}
          start={0.3}
          step={1.6}
          className={`${tag} text-light-muted`}
          finalClassName="text-light-text"
        />
      }
    >
      <Body>
        <div className={`gap-2 ${field}`}>
          <FeatureIcon name="search" className="h-3.5 w-3.5 shrink-0 text-light-muted" />
          <Typed text="flaking paint" at={0.3} dur={0.9} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {facets.map((f, c) => (
            <div key={f.name} className="min-w-0">
              <p className={`truncate ${tag} text-light-muted`}>{f.name}</p>
              <div className="mt-2 flex flex-col gap-1.5">
                {f.entries.map((e) =>
                  e.hit ? (
                    <span
                      key={e.t}
                      className={`relative ${slotOn}`}
                      style={anim(play("wf-target", 0.4, 1.5 + c * 0.15))}
                    >
                      {e.t}
                      <Tick at={2.0 + c * 0.15} className="absolute -right-1.5 -top-1.5" />
                    </span>
                  ) : (
                    <span
                      key={e.t}
                      className={`${slot} opacity-35`}
                      style={anim(play("wf-mute", 0.4, 1.5))}
                    >
                      {e.t}
                    </span>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </Body>
    </SceneCard>
  );
}
