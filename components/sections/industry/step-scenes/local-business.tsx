import {
  Check,
  Line,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

import {
  Body,
  Cycle,
  Done,
  PanelTitle,
  PencilIcon,
  PhoneFrame,
  PhoneIcon,
  Tick,
  anim,
  cta,
  item,
  moveFrom,
  panel,
  play,
  tag,
} from "./parts";

/**
 * Step scenes for /industries/local-business. Same family as travel's (see
 * ./parts.tsx for the rules every scene follows).
 */

/**
 * Step 1, essentials: on a phone, the first screen gives the four things
 * people outside the door need: open now, call, directions, book.
 */
export function LocalEssentialsScene() {
  const actions = [
    { label: "Call", icon: null, at: 1.1, primary: true },
    { label: "Directions", icon: "map-pin", at: 1.6 },
    { label: "Book a table", icon: "calendar", at: 2.1 },
  ];
  return (
    <SceneCard label="First screen" aside={<Done at={2.7}>All there</Done>}>
      <Body>
        <PhoneFrame>
          <p className="font-display text-[14px] font-medium leading-tight text-light-text">
            Casa Rosa
          </p>
          <span
            className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-light-border bg-light-surface px-2 py-0.5 text-[10px] leading-tight text-light-text"
            style={anim(play("wf-pop", 0.35, 0.5))}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-positive-ink" />
            Open now, until 22:00
          </span>
          <div className="mt-3 flex flex-col gap-1.5">
            {actions.map((a) => (
              <span
                key={a.label}
                className={
                  a.primary
                    ? `flex h-7 items-center justify-center gap-1.5 ${cta}`
                    : "flex h-7 items-center justify-center gap-1.5 rounded-[4px] border border-light-border bg-light-bg text-[11px] font-medium text-light-text"
                }
                style={anim(play("wf-pop", 0.35, a.at))}
              >
                {a.icon ? (
                  <FeatureIcon name={a.icon} className="h-3 w-3" />
                ) : (
                  <PhoneIcon className="h-3 w-3" />
                )}
                {a.label}
              </span>
            ))}
          </div>
        </PhoneFrame>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 2, booking: the site's book button opens the booking system the
 * business already uses, a time is picked, and it's confirmed.
 */
export function LocalBookingScene() {
  const times = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];
  return (
    <SceneCard
      label="Booking"
      aside={
        <Reading
          values={["Choosing", "Booked"]}
          start={0.3}
          step={2.3}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body className="flex flex-col">
        <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3">
          <div className={`flex flex-col ${panel}`}>
            <PanelTitle icon="globe">Your site</PanelTitle>
            <div className="mt-3 flex flex-col gap-1.5">
              <Line className="w-full bg-light-border" />
              <Line className="w-2/3 bg-light-border" />
            </div>
            <span className={`mt-4 self-start ${cta}`}>Book a table</span>
          </div>
          <div className={panel}>
            <PanelTitle icon="calendar">Booking system</PanelTitle>
            <div className="mt-3 grid grid-cols-3 gap-1">
              {times.map((t, i) => (
                <span
                  key={t}
                  className={
                    t === "19:30"
                      ? "rounded-[4px] border border-accent bg-accent-subtle px-1 py-1.5 text-center text-[11px] font-medium leading-tight tabular-nums text-light-text"
                      : "rounded-[4px] border border-light-border bg-light-bg px-1 py-1.5 text-center text-[11px] leading-tight tabular-nums text-light-text"
                  }
                  style={
                    t === "19:30"
                      ? anim(play("wf-rise", 0.35, 0.8 + i * 0.06), play("wf-target", 0.4, 1.7))
                      : anim(play("wf-rise", 0.35, 0.8 + i * 0.06))
                  }
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`mt-auto flex items-center gap-2 ${item}`}
          style={anim(play("wf-rise", 0.4, 2.5))}
        >
          <Check className="h-3.5 w-3.5 text-positive-ink" />
          <span className="font-medium">Confirmed</span>
          <span className="min-w-0 truncate text-[11px] text-light-muted">
            Fri 19:30, 2 people
          </span>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 3, menu: the owner edits today's special in place, and it's live,
 * with no PDF to replace.
 */
export function LocalMenuScene() {
  return (
    <SceneCard
      label="Menu"
      aside={
        <Reading
          values={["Editing", "Updated"]}
          start={0.3}
          step={2.3}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body>
        <div className={panel}>
          <PanelTitle icon="receipt">Today</PanelTitle>
          <div className="mt-3 flex flex-col gap-2">
            <div className={`flex items-center justify-between gap-2 ${item}`}>
              <span className="truncate">Margherita</span>
              <span className="tabular-nums text-light-muted">£9</span>
            </div>
            <div
              className="relative rounded-[4px] border border-accent bg-accent-subtle px-2.5 py-2 text-[12px] leading-tight text-light-text"
              style={anim(play("wf-target", 0.4, 1.1))}
            >
              <p className={`${tag} text-light-muted`}>Special of the day</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <Cycle
                  values={["Lasagne", "Truffle gnocchi"]}
                  start={0}
                  step={1.8}
                  className="font-medium"
                />
                <Reading
                  values={["£12", "£14"]}
                  start={0}
                  step={1.8}
                  className="tabular-nums"
                />
              </div>
              <span
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-light-border bg-light-bg text-light-text"
                style={moveFrom("36px", "56px", 0.7, 0.5, play("wf-fade", 0.3, 0.5))}
              >
                <PencilIcon className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
        <p
          className="mt-3 flex items-center gap-1.5 text-[11px] text-light-muted"
          style={anim(play("wf-fade", 0.35, 2.7))}
        >
          <Tick at={2.7} />
          Live on the site, no PDF to replace
        </p>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 4, local search: the map listing and the site link to each other,
 * and the name, address and hours tick off as matching on both.
 */
export function LocalSearchScene() {
  // Name, address and hours: the same on both, ticked as they're matched.
  const rows = [
    { k: "Name", v: "Casa Rosa", at: 1.4 },
    { k: "Address", v: "12 High St", at: 1.8 },
    { k: "Hours", v: "12:00 to 22:00", at: 2.2 },
  ];
  const cell =
    "truncate rounded-[4px] border border-light-border bg-light-bg px-2 py-1.5 text-[11px] leading-tight text-light-text";
  return (
    <SceneCard label="Local listing" aside={<Done at={2.7}>Matching</Done>}>
      <Body className="grid grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] content-start gap-y-2">
        {/* Header: the map listing and the website, linked. */}
        <div className="relative h-14 overflow-hidden rounded-[6px] border border-light-border bg-light-surface">
          <span className="absolute inset-x-0 top-[38%] h-px bg-light-border" />
          <span className="absolute inset-y-0 left-[30%] w-px bg-light-border" />
          <span className="absolute inset-y-0 left-[72%] w-px bg-light-border" />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent"
            style={anim(play("wf-pop", 0.35, 0.3))}
          >
            <FeatureIcon name="map-pin" className="h-5 w-5" />
          </span>
          <span className={`absolute bottom-1 left-1.5 ${tag} text-light-muted`}>
            Map listing
          </span>
        </div>
        <div className="flex items-center">
          <span
            className="h-px w-full origin-left border-t border-dashed border-light-muted"
            style={anim(play("wf-grow", 0.4, 0.8))}
          />
        </div>
        <div
          className="flex h-14 flex-col justify-between rounded-[6px] border border-light-border bg-light-bg p-2"
          style={anim(play("wf-fade", 0.35, 0.6))}
        >
          <PanelTitle icon="globe">Website</PanelTitle>
          <Line className="w-2/3 bg-light-border" />
        </div>
        {rows.map((r) => (
          <div key={r.k} className="contents">
            <span className={cell}>{r.v}</span>
            <span className="flex items-center justify-center">
              <Tick at={r.at} />
            </span>
            <span className={cell}>{r.v}</span>
          </div>
        ))}
      </Body>
    </SceneCard>
  );
}
