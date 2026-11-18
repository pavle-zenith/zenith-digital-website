import {
  Line,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";

import {
  Body,
  Browser,
  Done,
  PanelTitle,
  Tick,
  Typed,
  anim,
  cta,
  field,
  item,
  leaveTo,
  moveFrom,
  panel,
  play,
  slot,
  slotOn,
  tag,
} from "./parts";

/**
 * Step scenes for /industries/saas. Same family as travel's (see
 * ./parts.tsx for the rules every scene follows).
 */

/**
 * Step 1, positioning: three lines of category jargon collapse into one
 * plain sentence, and both readers it has to land with get what they need.
 */
export function SaasPositioningScene() {
  const clutter = [
    { text: "The AI-native, end-to-end platform", to: "14px" },
    { text: "for next-generation workflow synergy", to: "0" },
    { text: "at enterprise scale, reimagined", to: "-14px" },
  ];
  const readers = [
    { name: "Buyer", need: "Sees it works", at: 2.4 },
    { name: "Investor", need: "Sees a company", at: 2.8 },
  ];
  return (
    <SceneCard
      label="Homepage line"
      aside={
        <Reading
          values={["Draft", "Agreed"]}
          start={0.3}
          step={2.7}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body>
        <div className={`grid h-[104px] items-center ${panel}`}>
          <div className="col-start-1 row-start-1 flex flex-col gap-1">
            {clutter.map((c, i) => (
              <p
                key={c.text}
                className="truncate text-[12px] leading-snug text-light-muted"
                style={leaveTo("0", c.to, 0.5, 1.1 + i * 0.05)}
              >
                {c.text}
              </p>
            ))}
          </div>
          <p
            className="col-start-1 row-start-1 font-display text-[16px] font-medium leading-snug text-light-text"
            style={anim(play("wf-rise", 0.45, 1.6))}
          >
            Contract review in minutes, for in-house legal teams.
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {readers.map((r, i) => (
            <div
              key={r.name}
              className={`relative ${item}`}
              style={anim(play("wf-rise", 0.4, 2 + i * 0.2))}
            >
              <span className="block font-medium">{r.name}</span>
              <span className="mt-0.5 block truncate text-[11px] text-light-muted">
                {r.need}
              </span>
              <Tick at={r.at} className="absolute -right-1.5 -top-1.5" />
            </div>
          ))}
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 2, platform: each need routes to the platform built for it. Weekly
 * edits by the team go to Wix Studio; interactions a platform can't do go to
 * code with Sanity.
 */
export function SaasPlatformScene() {
  const routes = [
    {
      need: "Team edits weekly",
      platform: "Wix Studio",
      icon: "layers",
      sub: "Your team edits",
      at: 0.9,
    },
    {
      need: "Custom interactions",
      platform: "Code + Sanity",
      icon: "braces",
      sub: "Built to design",
      at: 1.5,
    },
  ];
  return (
    <SceneCard label="Platform" aside={<Done at={2.8}>Matched</Done>}>
      <Body>
        <div
          className={`grid grid-cols-[minmax(0,1fr)_28px_minmax(0,1.15fr)] ${tag} text-light-muted`}
        >
          <span>Need</span>
          <span />
          <span>Platform</span>
        </div>
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_28px_minmax(0,1.15fr)] items-center gap-y-4">
          {routes.map((r, i) => (
            <div key={r.need} className="contents">
              <div
                className={item}
                style={anim(play("wf-slide", 0.35, 0.2 + i * 0.2))}
              >
                {r.need}
              </div>
              <div
                className="relative h-px origin-left bg-light-border"
                style={anim(play("wf-grow", 0.4, r.at))}
              >
                <span
                  className="absolute -top-[2.5px] h-1.5 w-1.5 rounded-full bg-accent"
                  style={anim(play("wf-travel", 0.6, r.at + 0.3, "ease-in-out"))}
                />
              </div>
              <div
                className="rounded-[6px] border border-accent bg-accent-subtle p-2.5"
                style={anim(play("wf-target", 0.5, r.at + 0.8))}
              >
                <PanelTitle icon={r.icon} className="text-light-text">
                  {r.platform}
                </PanelTitle>
                <p className="mt-1 truncate text-[11px] text-light-muted">
                  {r.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 3, design: the generic illustration comes off and the product's own
 * interface goes on: navigation, a chart building up, live rows.
 */
export function SaasDesignScene() {
  const bars = [38, 52, 46, 64, 58, 76, 70, 92];
  return (
    <SceneCard
      label="Hero visual"
      aside={
        <Reading
          values={["Illustration", "Product UI"]}
          start={0.3}
          step={1.4}
          className={`${tag} text-light-muted`}
          finalClassName="text-light-text"
        />
      }
    >
      <Body>
        <Browser>
          {/* The product UI (the end frame). */}
          <div
            className="absolute inset-y-0 left-0 w-[22%] border-r border-light-border bg-light-surface p-2.5"
            style={anim(play("wf-fade", 0.4, 1.4))}
          >
            <span className="block h-2 w-3/4 rounded-full bg-light-text/70" />
            <div className="mt-3 flex flex-col gap-2">
              <Line className="w-full bg-accent" />
              <Line className="w-3/4 bg-light-border" />
              <Line className="w-5/6 bg-light-border" />
              <Line className="w-2/3 bg-light-border" />
            </div>
          </div>
          <div className="absolute inset-y-0 left-[22%] right-0 p-3">
            <p
              className="text-[11px] font-medium text-light-text"
              style={anim(play("wf-fade", 0.4, 1.5))}
            >
              Overview
            </p>
            <div className="mt-2 flex h-11 items-end gap-1.5">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 origin-bottom rounded-t-[2px] ${i === bars.length - 1 ? "bg-accent" : "bg-accent/25"}`}
                  style={{
                    height: `${h}%`,
                    ...anim(play("wf-grow-y", 0.45, 1.7 + i * 0.08)),
                  }}
                />
              ))}
            </div>
            <div className="mt-2.5 flex flex-col">
              {[0, 1, 2].map((r) => (
                <div
                  key={r}
                  className="flex h-[18px] items-center gap-2 border-b border-light-border"
                  style={anim(play("wf-slide", 0.35, 2.4 + r * 0.15))}
                >
                  <Line className="w-1/3 bg-light-border" />
                  <Line className="ml-auto w-8 bg-light-border" />
                  <span className="h-1.5 w-1.5 rounded-full bg-positive-ink" />
                </div>
              ))}
            </div>
          </div>
          {/* The stock illustration it replaces. */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-light-surface"
            style={anim(play("wf-exit", 0.4, 1.2))}
          >
            <span className="relative block h-20 w-28">
              <span className="absolute left-0 top-3 h-14 w-14 rounded-full bg-light-border" />
              <span className="absolute left-9 top-0 h-16 w-16 rounded-[18px] border-2 border-light-border bg-light-bg" />
              <span className="absolute bottom-0 right-0 h-8 w-12 rounded-full bg-light-border" />
            </span>
          </div>
        </Browser>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 4, conversion: the demo form fills, the lead lands in the CRM with
 * its answers, and a slot books on the calendar.
 */
export function SaasConversionScene() {
  return (
    <SceneCard label="Demo booking" aside={<Done at={3.3}>Booked</Done>}>
      <Body className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-3">
        <div className="flex flex-col rounded-[6px] border border-light-border bg-light-surface p-2.5">
          <PanelTitle icon="form">Book a demo</PanelTitle>
          <p className={`mt-2 ${tag} text-light-muted`}>Company size</p>
          <div className={`mt-1 ${field}`}>
            <Typed text="51 to 200" at={0.5} dur={0.5} />
          </div>
          <p className={`mt-2 ${tag} text-light-muted`}>Use case</p>
          <div className={`mt-1 ${field}`}>
            <Typed text="Contract review" at={1.1} dur={0.7} />
          </div>
          <span className={`mt-auto self-start ${cta}`}>
            Book a demo
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className={panel}>
            <PanelTitle icon="users">CRM</PanelTitle>
            <div
              className={`mt-2 ${item}`}
              style={moveFrom("-36px", "0", 0.5, 2.1, play("wf-fade", 0.3, 2.1))}
            >
              <span className="block font-medium">New lead</span>
              <span className="block truncate text-[11px] text-light-muted">
                51 to 200
              </span>
            </div>
          </div>
          <div className={panel}>
            <PanelTitle icon="calendar">Calendar</PanelTitle>
            <div className="mt-2 flex gap-1.5">
              <span className={`max-sm:hidden ${slot}`}>
                Wed 10:00
              </span>
              <span
                className={`relative ${slotOn}`}
                style={anim(play("wf-target", 0.4, 2.8))}
              >
                Thu 14:00
                <Tick at={3.0} className="absolute -right-1.5 -top-1.5" />
              </span>
            </div>
          </div>
        </div>
      </Body>
    </SceneCard>
  );
}
