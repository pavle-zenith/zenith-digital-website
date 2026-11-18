import Image from "next/image";

import {
  Line,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

import {
  Avatar,
  Body,
  Cycle,
  Done,
  PanelTitle,
  PencilIcon,
  PlayIcon,
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
  tag,
} from "./parts";

/**
 * Step scenes for /industries/coaches. Same family as travel's (see
 * ./parts.tsx for the rules every scene follows).
 */

/**
 * Step 1, offer: one "About me" page splits into a card per offer, each with
 * its own next step.
 */
export function CoachesOfferScene() {
  const offers = [
    { name: "1:1 coaching", icon: "users", next: "Apply for a call", from: ["calc(50% + 4px)", "calc(50% + 4px)"] },
    { name: "Retreat", icon: "compass", next: "Join the waitlist", from: ["calc(-50% - 4px)", "calc(50% + 4px)"] },
    { name: "Keynote", icon: "mic", next: "Check availability", from: ["calc(50% + 4px)", "calc(-50% - 4px)"] },
    { name: "Book", icon: "pen", next: "Buy the book", from: ["calc(-50% - 4px)", "calc(-50% - 4px)"] },
  ];
  return (
    <SceneCard
      label="Offers"
      aside={
        <Reading
          values={["One page", "4 pages"]}
          start={0.3}
          step={2.2}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body>
        <div className="grid h-full grid-cols-2 grid-rows-2 gap-2">
          {offers.map((o, i) => (
            <div
              key={o.name}
              className="flex min-w-0 flex-col rounded-[6px] border border-light-border bg-light-bg p-3"
              style={moveFrom(
                o.from[0],
                o.from[1],
                0.6,
                1.2 + i * 0.12,
                play("wf-fade", 0.3, 1.2 + i * 0.12),
              )}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-[4px] border border-light-border bg-light-surface text-light-text">
                <FeatureIcon name={o.icon} className="h-3.5 w-3.5" />
              </span>
              <p className="mt-2 text-[12px] font-medium leading-tight text-light-text">
                {o.name}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-accent">{o.next}</p>
            </div>
          ))}
        </div>
        {/* The single page it starts as. */}
        <div
          className={`absolute inset-x-4 top-[34px] h-[120px] ${panel}`}
          style={leaveTo("0", "0", 0.45, 1.0)}
        >
          <PanelTitle icon="users">About me</PanelTitle>
          <div className="mt-3 flex flex-col gap-2">
            <Line className="w-full bg-light-border" />
            <Line className="w-11/12 bg-light-border" />
            <Line className="w-full bg-light-border" />
            <Line className="w-3/4 bg-light-border" />
            <Line className="w-5/6 bg-light-border" />
          </div>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 2, proof: logos, a speaking clip and a client's words rise up beside
 * the offer they support, instead of on a page of their own.
 */
export function CoachesProofScene() {
  return (
    <SceneCard
      label="Keynote page"
      aside={
        <Reading
          values={["Placing", "Placed"]}
          start={0.3}
          step={2.3}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body className="grid grid-cols-2 gap-3">
        <div
          className="flex flex-col rounded-[6px] border border-accent bg-light-bg p-3"
          style={anim(play("wf-target", 0.5, 2.4))}
        >
          <PanelTitle icon="mic">Keynote</PanelTitle>
          <span className="mt-3 block h-2.5 w-11/12 rounded-full bg-light-text/70" />
          <span className="mt-1.5 block h-2.5 w-2/3 rounded-full bg-light-text/70" />
          <div className="mt-3 flex flex-col gap-1.5">
            <Line className="w-full bg-light-border" />
            <Line className="w-5/6 bg-light-border" />
            <Line className="w-3/4 bg-light-border" />
          </div>
          <span className={`mt-auto self-start ${cta}`}>Check dates</span>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <div
            className="rounded-[6px] border border-light-border bg-light-surface p-2"
            style={anim(play("wf-rise", 0.45, 0.6))}
          >
            <p className={`${tag} text-light-muted`}>Spoken at</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-9 rounded-full bg-light-muted/50" />
              <span className="h-2 w-6 rounded-full bg-light-muted/50" />
              <span className="h-2 w-8 rounded-full bg-light-muted/50" />
            </div>
          </div>
          <div
            className="relative h-[66px] overflow-hidden rounded-[6px] border border-light-border"
            style={anim(play("wf-rise", 0.45, 1.2))}
          >
            <Image
              src="/industries/coaches-speakers.jpg"
              alt=""
              fill
              sizes="200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-bg/30" />
            <span className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-bg">
              <PlayIcon className="ml-0.5 h-3 w-3" />
            </span>
          </div>
          <div
            className="flex items-start gap-2 rounded-[6px] border border-light-border bg-light-bg p-2"
            style={anim(play("wf-rise", 0.45, 1.8))}
          >
            <span className="font-display text-[18px] leading-none text-light-muted">
              &ldquo;
            </span>
            <div className="flex flex-1 flex-col gap-1.5 pt-1">
              <Line className="w-full bg-light-border" />
              <Line className="w-2/3 bg-light-border" />
            </div>
            <Avatar initials="CL" className="h-6 w-6" />
          </div>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 3, booking: a class fills seat by seat, the count climbs, and every
 * booking lands in the one CRM.
 */
export function CoachesBookingScene() {
  const people = ["AK", "JM", "SL", "RP", "TB", "MN"];
  return (
    <SceneCard label="Bookings" aside={<Done at={3.0}>In CRM</Done>}>
      <Body>
        <div className={panel}>
          <div className="flex items-center justify-between gap-2">
            <PanelTitle icon="calendar">Sat class, 10:00</PanelTitle>
            <Reading
              values={["0 of 6", "1 of 6", "2 of 6", "3 of 6", "4 of 6", "5 of 6", "6 of 6"]}
              start={0.3}
              step={0.3}
              className="text-[12px] font-medium tabular-nums text-light-text"
            />
          </div>
          <div className="mt-3 grid grid-cols-6 gap-1.5">
            {people.map((p, i) => (
              <span
                key={p}
                className="flex h-7 items-center justify-center rounded-[4px] border border-accent bg-accent-subtle text-[10px] font-medium text-light-text"
                style={anim(play("wf-target", 0.3, 0.6 + i * 0.3))}
              >
                <span style={anim(play("wf-fade", 0.25, 0.6 + i * 0.3))}>{p}</span>
              </span>
            ))}
          </div>
        </div>
        <span
          className="mx-auto block h-5 w-px origin-top bg-light-border"
          style={anim(play("wf-grow-y", 0.3, 2.3))}
        />
        <div className={panel}>
          <div className="flex items-center justify-between gap-2">
            <PanelTitle icon="users">CRM</PanelTitle>
            <span
              className={`${tag} text-light-muted`}
              style={anim(play("wf-fade", 0.3, 2.9))}
            >
              6 contacts
            </span>
          </div>
          <div className="mt-2 flex gap-1.5">
            {people.map((p, i) => (
              <Avatar
                key={p}
                initials={p}
                style={anim(play("wf-pop", 0.3, 2.45 + i * 0.07))}
              />
            ))}
          </div>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 4, lead capture: a visitor not ready to book takes the free guide,
 * the list grows by one, and the welcome sequence starts.
 */
export function CoachesLeadScene() {
  return (
    <SceneCard label="Lead capture" aside={<Done at={3.1}>On the list</Done>}>
      <Body className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-3">
        <div className={`flex flex-col ${panel}`}>
          <div className="rounded-[4px] border border-light-border bg-light-bg p-2.5">
            <p className={`${tag} text-accent`}>Free guide</p>
            <p className="mt-1 font-display text-[13px] font-medium leading-snug text-light-text">
              Before you hire a coach
            </p>
          </div>
          <div className={`mt-2 ${field}`}>
            <Typed text="sam@mail.com" at={0.7} dur={0.8} />
          </div>
          <span className={`mt-auto self-start ${cta}`}>Send me the guide</span>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <div className={panel}>
            <PanelTitle icon="users">Email list</PanelTitle>
            <p className="mt-2 font-display text-[26px] font-medium leading-none tabular-nums text-light-text">
              <Cycle values={["412", "413"]} start={0.1} step={1.9} />
            </p>
            <p className="mt-1 text-[11px] text-light-muted">subscribers</p>
          </div>
          {[
            { label: "Welcome", at: 2.4 },
            { label: "Day 3", at: 2.8 },
          ].map((r) => (
            <div
              key={r.label}
              className={`flex items-center justify-between gap-2 ${item}`}
              style={anim(play("wf-slide", 0.35, r.at - 0.2))}
            >
              <span className="truncate">{r.label}</span>
              <Tick at={r.at} />
            </div>
          ))}
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 5, handover: the coach edits a class time themselves, and it's live
 * on the site without waiting on anyone.
 */
export function CoachesHandoverScene() {
  const rows = [
    { name: "Group session", time: "Mon 07:00" },
    { name: "Open Q&A", time: "edit" },
    { name: "Breathwork", time: "Sat 09:00" },
  ];
  return (
    <SceneCard
      label="Your editor"
      aside={
        <Reading
          values={["Draft", "Published"]}
          start={0.3}
          step={2.6}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body>
        <div className={panel}>
          <div className="flex items-center justify-between gap-2">
            <PanelTitle icon="calendar">Classes</PanelTitle>
            <span className={cta} style={anim(play("wf-pop", 0.35, 2.4))}>
              Publish
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {rows.map((r) =>
              r.time === "edit" ? (
                <div
                  key={r.name}
                  className="relative flex items-center justify-between gap-2 rounded-[4px] border border-accent bg-accent-subtle px-2.5 py-2 text-[12px] leading-tight text-light-text"
                  style={anim(play("wf-target", 0.4, 1.2))}
                >
                  <span className="truncate">{r.name}</span>
                  <Reading
                    values={["Tue 18:00", "Thu 18:00"]}
                    start={0}
                    step={1.8}
                    className="font-medium tabular-nums"
                  />
                  {/* The pencil arrives at the row it edits. */}
                  <span
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-light-border bg-light-bg text-light-text"
                    style={moveFrom("36px", "60px", 0.7, 0.5, play("wf-fade", 0.3, 0.5))}
                  >
                    <PencilIcon className="h-3 w-3" />
                  </span>
                </div>
              ) : (
                <div
                  key={r.name}
                  className={`flex items-center justify-between gap-2 ${item}`}
                >
                  <span className="truncate">{r.name}</span>
                  <span className="tabular-nums text-light-muted">{r.time}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </Body>
    </SceneCard>
  );
}
