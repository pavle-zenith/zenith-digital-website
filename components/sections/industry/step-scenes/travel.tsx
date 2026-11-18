import Image from "next/image";

import { FeatureIcon } from "@/components/ui/FeatureIcon";
import {
  Check,
  Line,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";

/**
 * Step scenes for /industries/travel: one short vignette per build step,
 * showing what the step does rather than describing it. Same grammar as the
 * service pages' "who this is for" scenes (pure CSS wf-* keyframes, one play
 * per tab reveal, every element's base style is its end state), and the same
 * card shell, so the two read as one family.
 *
 * Each body stays under ~200px so the card fits the fixed box GuideTabs
 * reserves for it, and each runs inside ~4s.
 */

const tag = "font-mono text-[10px] uppercase track-label";

/** Step 1, booking model: offers sort themselves into book-online and enquire. */
export function BookingScene() {
  const offers: { label: string; lane: "book" | "ask"; at: number }[] = [
    { label: "Airport transfer", lane: "book", at: 0.4 },
    { label: "Tailored 7-day trip", lane: "ask", at: 0.9 },
    { label: "Wine tour, 10:00", lane: "book", at: 1.4 },
    { label: "Wedding transport", lane: "ask", at: 1.9 },
  ];
  const lanes = [
    { id: "book", title: "Book", icon: "calendar", cta: "Book now", at: 2.6 },
    { id: "ask", title: "Enquire", icon: "form", cta: "Talk to us", at: 2.9 },
  ] as const;

  return (
    <SceneCard
      label="Booking plan"
      aside={
        <Reading
          values={["Sorting", "Sorted"]}
          start={0.4}
          step={2.6}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <div className="mt-5 grid grid-cols-2 gap-3">
        {lanes.map((lane) => (
          <div
            key={lane.id}
            className="flex h-[188px] flex-col rounded-[6px] border border-light-border bg-light-surface p-3"
          >
            <p className={`flex items-center gap-1.5 ${tag} text-light-muted`}>
              <FeatureIcon name={lane.icon} className="h-3.5 w-3.5" />
              {lane.title}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {/* Phones show one offer per lane: two wrapped offers and the
                  button overran the lane at that width. */}
              {offers
                .filter((o) => o.lane === lane.id)
                .map((o, k) => (
                  <div
                    key={o.label}
                    className={`rounded-[4px] border border-light-border bg-light-bg px-2.5 py-2 text-[12px] leading-tight text-light-text ${k > 0 ? "max-sm:hidden" : ""}`}
                    style={{ animation: `wf-rise .45s ease-out ${o.at}s both` }}
                  >
                    {o.label}
                  </div>
                ))}
            </div>
            <span
              className="mt-auto self-start rounded-[4px] bg-accent px-2.5 py-1.5 text-[11px] font-medium text-accent-ink"
              style={{ animation: `wf-pop .35s ease-out ${lane.at}s both` }}
            >
              {lane.cta}
            </span>
          </div>
        ))}
      </div>
    </SceneCard>
  );
}

/** One side of the sync scene: three listings, the first one's price changing at `at`. */
function SyncPanel({
  title,
  icon,
  at,
}: {
  title: string;
  icon: string;
  at: number;
}) {
  return (
    <div className="rounded-[6px] border border-light-border bg-light-surface p-2 sm:p-3">
      <p className={`flex items-center gap-1.5 whitespace-nowrap ${tag} text-light-muted`}>
        <FeatureIcon name={icon} className="h-3.5 w-3.5 shrink-0" />
        {title}
      </p>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 rounded-[4px] border border-light-border bg-light-bg px-2.5 py-2 text-[12px] leading-tight">
          <span className="truncate text-light-text">Villa</span>
          <Reading
            values={["€180", "€165"]}
            start={at}
            step={0.9}
            className="font-medium tabular-nums text-light-text"
          />
        </div>
        <div className="flex items-center justify-between gap-2 rounded-[4px] border border-light-border bg-light-bg px-2.5 py-2 text-[12px] leading-tight">
          <span className="truncate text-light-text">Studio</span>
          <span className="font-medium tabular-nums text-light-text">€95</span>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-[4px] border border-light-border bg-light-bg px-2.5 py-2 text-[12px] leading-tight">
          <span className="truncate text-light-text">Loft</span>
          <span className="font-medium tabular-nums text-light-text">€140</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 2, integrations: a price changes in the booking system, a pulse
 * crosses the connector, and the website shows the same price a beat later.
 */
export function SyncScene() {
  return (
    <SceneCard
      label="Listings"
      aside={
        <span
          className={`inline-flex items-center gap-1 ${tag} text-positive-ink`}
          style={{ animation: "wf-pop .35s ease-out 3.2s both" }}
        >
          <Check className="h-3.5 w-3.5" />
          In sync
        </span>
      }
    >
      <div className="mt-5 grid h-[188px] grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)] items-center sm:grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)]">
        <SyncPanel title="Bookings" icon="calendar" at={0.6} />
        {/* The connector, and the pulse that crosses it after the change. */}
        <div className="relative h-px bg-light-border">
          <span
            className="absolute -top-[2.5px] h-1.5 w-1.5 rounded-full bg-accent"
            style={{ animation: "wf-travel .8s ease-in-out 1.7s both" }}
          />
        </div>
        <SyncPanel title="Website" icon="globe" at={2.5} />
      </div>
    </SceneCard>
  );
}

/**
 * Step 3, page structure: one page branches into a page per service, then a
 * guest's search lands on exactly the one built for it.
 */
export function PagesScene() {
  const pages = ["Transfers", "Day tours", "Trips", "Events"];
  return (
    <SceneCard
      label="Site map"
      aside={
        <span
          // -my-1: the pill is taller than the header's text label, and
          // without it the card grew 8px past the box GuideTabs reserves.
          className={`-my-1 inline-flex items-center gap-1.5 rounded-[4px] border border-light-border bg-light-bg px-2 py-1 ${tag} text-light-text`}
          style={{ animation: "wf-rise .4s ease-out 2.4s both" }}
        >
          <FeatureIcon name="search" className="h-3 w-3" />
          airport transfer
        </span>
      }
    >
      <div className="relative mt-5 h-[188px]">
        {/* Root */}
        <div
          className="absolute left-1/2 top-0 w-28 -translate-x-1/2 rounded-[4px] border border-light-border bg-light-surface px-3 py-2 text-center text-[12px] font-medium text-light-text"
          style={{ animation: "wf-fade .3s ease-out .2s both" }}
        >
          Home
        </div>
        {/* Stem and branch */}
        <span
          className="absolute left-1/2 top-[34px] h-5 w-px origin-top bg-light-border"
          style={{ animation: "wf-grow-y .3s ease-out .5s both" }}
        />
        <span
          className="absolute left-[12.5%] right-[12.5%] top-[54px] h-px bg-light-border"
          style={{ animation: "wf-grow .4s ease-out .75s both" }}
        />
        {/* Children */}
        <div className="absolute inset-x-0 top-[54px] grid grid-cols-4 gap-2">
          {pages.map((p, i) => (
            <div key={p} className="flex flex-col items-center">
              <span
                className="h-4 w-px origin-top bg-light-border"
                style={{ animation: `wf-grow-y .25s ease-out ${1 + i * 0.25}s both` }}
              />
              <div
                className={
                  i === 0
                    ? "relative w-full rounded-[4px] border border-accent bg-accent-subtle px-2 py-2.5 text-center text-[11px] leading-tight text-light-text [animation:wf-rise_.4s_ease-out_1.1s_both,wf-target_.5s_ease-out_3.1s_both]"
                    : "w-full rounded-[4px] border border-light-border bg-light-bg px-2 py-2.5 text-center text-[11px] leading-tight text-light-text"
                }
                style={
                  i === 0
                    ? undefined
                    : { animation: `wf-rise .4s ease-out ${1.1 + i * 0.25}s both` }
                }
              >
                {p}
                {i === 0 ? (
                  <span
                    className="absolute -right-1.5 -top-1.5 text-positive-ink"
                    style={{ animation: "wf-pop .35s ease-out 3.3s both" }}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </div>
              {/* Each service page holds its own place pages. */}
              <div className="mt-2 flex w-full flex-col gap-1.5">
                {[0, 1].map((j) => (
                  <span
                    key={j}
                    className="h-4 rounded-[4px] border border-dashed border-light-border bg-light-surface"
                    style={{ animation: `wf-fade .3s ease-out ${1.9 + i * 0.12 + j * 0.15}s both` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SceneCard>
  );
}

/**
 * Step 4, design: a greyscale wireframe takes on the destination's
 * photography, a real headline and its booking button.
 */
export function DesignScene() {
  return (
    <SceneCard
      label="Homepage"
      aside={
        <Reading
          values={["Wireframe", "Design"]}
          start={0.3}
          step={1.6}
          className={`${tag} text-light-muted`}
          finalClassName="text-light-text"
        />
      }
    >
      <div className="mt-5 h-[188px] overflow-hidden rounded-[6px] border border-light-border">
        <div className="flex h-7 items-center gap-1.5 border-b border-light-border bg-light-surface px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-light-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-light-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-light-border" />
        </div>
        <div className="relative h-[159px]">
          {/* Wireframe: the grey block and placeholder lines. */}
          <div className="absolute inset-0 bg-light-surface">
            <div className="absolute left-4 top-6 w-[55%]">
              <Line className="h-2.5 w-full bg-light-border" />
              <Line className="mt-2 h-2.5 w-3/4 bg-light-border" />
              <Line className="mt-4 w-1/2 bg-light-border" />
              <span className="mt-4 block h-6 w-20 rounded-[4px] bg-light-border" />
            </div>
          </div>
          {/* Design: the photograph arrives over the grey, then the words. */}
          <div
            className="absolute inset-0"
            style={{ animation: "wf-fade .7s ease-out 1.6s both" }}
          >
            <Image
              src="/industries/travel-hospitality.jpg"
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-bg/45" />
          </div>
          <div className="absolute left-4 top-6 w-[60%]">
            <p
              className="font-display text-[17px] font-medium leading-tight text-white"
              style={{ animation: "wf-rise .45s ease-out 2.2s both" }}
            >
              See the coast your own way
            </p>
            <p
              className="mt-1.5 text-[11px] leading-snug text-white/80"
              style={{ animation: "wf-rise .45s ease-out 2.5s both" }}
            >
              Private days out, planned around you.
            </p>
            <span
              className="mt-3 inline-block rounded-[4px] bg-white px-2.5 py-1.5 text-[11px] font-medium text-bg"
              style={{ animation: "wf-pop .35s ease-out 2.9s both" }}
            >
              Plan your trip
            </span>
          </div>
        </div>
      </div>
    </SceneCard>
  );
}

// Step 5, launch, is the shared LaunchScene (./launch.tsx) with its
// default "Season" milestone, so travel keeps its original look.
