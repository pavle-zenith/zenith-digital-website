import Image from "next/image";

import {
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

import {
  Avatar,
  Body,
  Browser,
  Done,
  FilterChip,
  anim,
  item,
  leaveTo,
  moveFrom,
  play,
  tag,
} from "./parts";

/**
 * Step scenes for /industries/property. Same family as travel's (see
 * ./parts.tsx for the rules every scene follows).
 */

/**
 * Step 1, audience: four kinds of visitor arrive mixed up, and each one
 * walks through the door built for it.
 */
export function PropertyAudienceScene() {
  // Each visitor starts one door over from its own, so the pairs cross.
  const doors = [
    { visitor: "Buyer", door: "For sale", icon: "house", from: "calc(100% + 26px)" },
    { visitor: "Renter", door: "To rent", icon: "building", from: "calc(-100% - 26px)" },
    { visitor: "Owner", door: "Valuation", icon: "gauge", from: "calc(100% + 26px)" },
    { visitor: "Manager", door: "Services", icon: "wrench", from: "calc(-100% - 26px)" },
  ];
  return (
    <SceneCard label="Who it's for" aside={<Done at={2.9}>Routed</Done>}>
      <Body>
        <p className={`${tag} text-light-muted`}>Visitors</p>
        <div className="absolute inset-x-0 bottom-0 top-9 grid grid-cols-4 gap-1.5">
          {doors.map((d, i) => {
            const at = 0.8 + i * 0.3;
            return (
              <div
                key={d.door}
                className="flex min-w-0 flex-col items-center rounded-[6px] border border-accent bg-accent-subtle p-1.5 pt-2.5 max-sm:px-1"
                style={anim(play("wf-target", 0.4, at + 0.6))}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-[4px] border border-light-border bg-light-bg text-light-text">
                  <FeatureIcon name={d.icon} className="h-3.5 w-3.5" />
                </span>
                <p className="mt-1.5 w-full truncate text-center text-[11px] font-medium leading-tight text-light-text max-sm:text-[10px]">
                  {d.door}
                </p>
                <div className="mt-auto flex h-10 w-full items-center rounded-[4px] border border-dashed border-light-border bg-light-bg px-0.5">
                  <span
                    className="block w-full truncate rounded-full border border-light-border bg-light-bg px-0.5 py-1 text-center text-[10px] leading-none tracking-tight text-light-text max-sm:text-[9px]"
                    style={moveFrom(d.from, "-146px", 0.7, at, play("wf-fade", 0.3, 0.2))}
                  >
                    {d.visitor}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 2, listings: the filters a buyer actually uses narrow the grid one
 * by one, and a sold listing drops out by itself.
 */
export function PropertyListingsScene() {
  const listings = [
    { price: "£325k", kind: "Flat, Old Town", out: 0 },
    { price: "£540k", kind: "House, Quay", out: 1.7 },
    { price: "£410k", kind: "Flat, Old Town", out: 0, sold: true },
    { price: "£1,450/mo", kind: "Flat, to rent", out: 1.0 },
    { price: "£298k", kind: "Flat, Riverside", out: 2.4 },
    { price: "£365k", kind: "Flat, Old Town", out: 0 },
  ];
  return (
    <SceneCard
      label="Listings"
      aside={
        <Reading
          values={["6 results", "5 results", "4 results", "3 results", "2 results"]}
          start={0.3}
          step={0.7}
          className={`${tag} text-light-muted`}
          finalClassName="text-light-text"
        />
      }
    >
      <Body>
        <div className="flex flex-wrap gap-1.5">
          <FilterChip label="Buy" on={0.85} />
          <FilterChip label="Apartment" on={1.55} />
          <FilterChip label="Old Town" on={2.25} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {listings.map((l) => (
            <div
              key={l.price + l.kind}
              className={`relative min-w-0 overflow-hidden rounded-[4px] border border-light-border bg-light-bg ${l.out ? "opacity-30" : ""}`}
              style={
                l.sold
                  ? leaveTo("0", "14px", 0.5, 3.0)
                  : l.out
                    ? anim(play("wf-mute", 0.4, l.out))
                    : undefined
              }
            >
              <div className="flex h-8 items-center justify-center bg-light-surface text-light-muted">
                <FeatureIcon name="house" className="h-3.5 w-3.5" />
              </div>
              <div className="p-1.5">
                <p className="truncate text-[11px] font-medium tabular-nums leading-tight text-light-text">
                  {l.price}
                </p>
                <p className="truncate text-[10px] leading-tight text-light-muted max-sm:text-[9px]">
                  {l.kind}
                </p>
              </div>
              {l.sold ? (
                <span
                  className="absolute left-1 top-1 rounded-[3px] bg-light-text px-1 py-0.5 font-mono text-[9px] uppercase leading-none text-light-bg"
                  style={anim(play("wf-pop", 0.3, 2.65))}
                >
                  Sold
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 3, design: the floor plan gives way to the place itself, light and
 * location first, with the plan still one click away underneath.
 */
export function PropertyDesignScene() {
  return (
    <SceneCard
      label="Development page"
      aside={
        <Reading
          values={["Plan", "Place"]}
          start={0.3}
          step={1.5}
          className={`${tag} text-light-muted`}
          finalClassName="text-light-text"
        />
      }
    >
      <Body>
        <Browser>
          <div className="absolute inset-0" style={anim(play("wf-fade", 0.7, 1.4))}>
            <Image
              src="/industries/professional-services.jpg"
              alt=""
              fill
              sizes="400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-bg/35" />
          </div>
          <div className="absolute left-3 top-3 w-[62%]">
            <p
              className="font-display text-[15px] font-medium leading-tight text-white"
              style={anim(play("wf-rise", 0.45, 2.0))}
            >
              Light on every floor
            </p>
            <span
              className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] leading-tight text-bg"
              style={anim(play("wf-rise", 0.45, 2.3))}
            >
              <FeatureIcon name="map-pin" className="h-3 w-3" />
              Five minutes to the river
            </span>
          </div>
          {/* The plan, still linked under the photography. */}
          <span
            className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-[4px] bg-white px-2 py-1 text-[11px] font-medium text-bg"
            style={anim(play("wf-rise", 0.45, 2.7))}
          >
            <FeatureIcon name="layout-grid" className="h-3 w-3" />
            Floor plans <span aria-hidden>&rarr;</span>
          </span>
          {/* The floor plan the page used to open on. */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-light-bg"
            style={leaveTo("0", "0", 0.5, 1.1)}
          >
            <svg
              viewBox="0 0 160 100"
              className="h-[78%] w-auto text-light-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <rect x="4" y="4" width="152" height="92" />
              <path d="M70 4v40M70 62v34M4 52h40M58 52h12M110 4v30M110 50v46M110 50h46" />
              <path d="M44 52a14 14 0 0 1 14-14" strokeDasharray="2 2" />
              <path d="M70 44a18 18 0 0 1 18 18" strokeDasharray="2 2" />
            </svg>
          </div>
        </Browser>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 4, enquiries: three kinds of enquiry each go straight to the team
 * that handles them, not to a shared inbox.
 */
export function PropertyEnquiriesScene() {
  const enquiries = [
    { label: "Valuation", icon: "gauge", to: 1 },
    { label: "Viewing", icon: "calendar", to: 0 },
    { label: "Service call", icon: "wrench", to: 2 },
  ];
  const teams = [
    { name: "Sales", initials: "DP" },
    { name: "Valuers", initials: "MR" },
    { name: "Repairs", initials: "KO" },
  ];
  const arrival = (row: number) => {
    const from = enquiries.findIndex((e) => e.to === row);
    return 0.6 + from * 0.6 + 0.7;
  };
  return (
    <SceneCard label="Enquiries" aside={<Done at={2.9}>Routed</Done>}>
      <Body className="grid grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] grid-rows-3 gap-y-2">
        {enquiries.map((e, i) => {
          const at = 0.6 + i * 0.6;
          return (
            <div key={e.label} className="contents">
              <div
                className={`relative flex items-center gap-2 ${item}`}
                style={{ gridRow: i + 1, gridColumn: 1 }}
              >
                <FeatureIcon name={e.icon} className="h-3.5 w-3.5 shrink-0 text-light-muted max-sm:hidden" />
                <span className="truncate">{e.label}</span>
                {/* The enquiry itself, travelling to its team: across the
                    40px gutter to the avatar, and one 65px row (57px row
                    plus the 8px gap) per row of difference. */}
                <span
                  className="absolute -right-[5px] top-1/2 -mt-[5px] block"
                  style={anim(play("wf-fade", 0.2, at - 0.2))}
                >
                  <span
                    className="block h-2.5 w-2.5 rounded-full bg-accent"
                    style={leaveTo("62px", `${(e.to - i) * 65}px`, 0.7, at)}
                  />
                </span>
              </div>
            </div>
          );
        })}
        {teams.map((t, row) => (
          <div
            key={t.name}
            className="relative flex items-center gap-2 rounded-[6px] border border-accent bg-accent-subtle p-2"
            style={{
              gridRow: row + 1,
              gridColumn: 3,
              ...anim(play("wf-target", 0.4, arrival(row))),
            }}
          >
            <Avatar initials={t.initials} />
            <span className="truncate text-[12px] font-medium text-light-text">
              {t.name}
            </span>
            <span
              className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-medium text-accent-ink"
              style={anim(play("wf-pop", 0.3, arrival(row)))}
            >
              1
            </span>
          </div>
        ))}
      </Body>
    </SceneCard>
  );
}
