import {
  Check,
  Line,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

import {
  Body,
  Done,
  PanelTitle,
  PhoneFrame,
  PhoneIcon,
  Ping,
  StarIcon,
  Tick,
  Typed,
  anim,
  cta,
  field,
  moveFrom,
  panel,
  play,
  tag,
} from "./parts";

/**
 * Step scenes for /industries/trades. Same family as travel's (see
 * ./parts.tsx for the rules every scene follows).
 */

/**
 * Step 1, services: the service-by-town map fills cell by cell, and the job
 * they want more of is marked as the priority.
 */
export function TradesServicesScene() {
  const towns = ["Worthing", "Lancing", "Shoreham"];
  const services = [
    { name: "Kitchens", covered: [true, true, true] },
    { name: "Bathrooms", covered: [true, true, true] },
    { name: "Extensions", covered: [true, true, false] },
  ];
  const grid =
    "grid grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] items-center gap-1.5";
  return (
    <SceneCard
      label="Service map"
      aside={
        <Reading
          values={["Mapping", "Mapped"]}
          start={0.3}
          step={2.5}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body>
        <div className={`${grid} ${tag} text-light-muted`}>
          <span />
          {towns.map((t) => (
            <span key={t} className="truncate text-center">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          {services.map((s, r) => (
            <div key={s.name} className={`relative ${grid}`}>
              {r === 0 ? (
                <span
                  aria-hidden
                  className="absolute -inset-1 rounded-[6px] border border-accent-line bg-accent-subtle"
                  style={anim(play("wf-fade", 0.4, 2.3))}
                />
              ) : null}
              <span className="relative truncate text-[12px] font-medium text-light-text">
                {s.name}
              </span>
              {s.covered.map((c, i) => {
                const at = 0.4 + (r * 3 + i) * 0.18;
                return c ? (
                  <span
                    key={i}
                    className="relative flex h-8 items-center justify-center rounded-[4px] border border-light-border bg-light-bg"
                  >
                    <Tick at={at} />
                  </span>
                ) : (
                  <span
                    key={i}
                    className="relative h-8 rounded-[4px] border border-dashed border-light-border"
                    style={anim(play("wf-fade", 0.3, at))}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <p
          className={`mt-4 flex items-center gap-1.5 ${tag} text-light-text`}
          style={anim(play("wf-rise", 0.4, 2.5))}
        >
          <span className="h-2 w-2 rounded-[2px] bg-accent" />
          Kitchens lead the homepage
        </p>
      </Body>
    </SceneCard>
  );
}

/** A form field sized for the phone frame. */
const phoneField =
  "flex h-7 items-center gap-1.5 rounded-[4px] border border-light-border bg-light-bg px-2 text-[11px] leading-none text-light-text";

/**
 * Step 2, quote: on a phone, the quote form on the first screen fills and
 * sends, and calling is one tap away.
 */
export function TradesQuoteScene() {
  return (
    <SceneCard
      label="First screen"
      aside={
        <Reading
          values={["Filling", "Sent"]}
          start={0.3}
          step={2.1}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body>
        <PhoneFrame>
          <div className="flex h-6 items-center justify-between">
            <Line className="h-2 w-16 bg-light-text/70" />
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-ink">
              <Ping at={2.9} />
              <Ping at={3.4} />
              <PhoneIcon className="h-3 w-3" />
            </span>
          </div>
          <p className="mt-2 text-[12px] font-medium text-light-text">Get a quote</p>
          <div className={`mt-2 ${phoneField}`}>
            <span className="text-light-muted">Service</span>
            <Typed text="Kitchen fitting" at={0.5} dur={0.7} />
          </div>
          <div className={`mt-1.5 ${phoneField}`}>
            <span className="text-light-muted">Site</span>
            <Typed text="Worthing BN11" at={1.3} dur={0.7} />
          </div>
          <div className="mt-2.5 grid">
            <span
              className={`col-start-1 row-start-1 text-center ${cta}`}
              style={anim(play("wf-exit", 0.25, 2.3))}
            >
              Request a quote
            </span>
            <span
              className="col-start-1 row-start-1 flex items-center justify-center gap-1 rounded-[4px] border border-light-border bg-light-surface px-2.5 py-1.5 text-[11px] font-medium text-positive-ink"
              style={anim(play("wf-fade", 0.3, 2.3))}
            >
              <Check className="h-3 w-3" />
              Quote request sent
            </span>
          </div>
        </PhoneFrame>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 3, proof: finished jobs stack into a gallery, and the rating and the
 * accreditation land next to the quote button, where the decision is made.
 */
export function TradesProofScene() {
  const jobs = [
    { caption: "Kitchen", from: ["calc(50% + 4px)", "calc(50% + 4px)"] },
    { caption: "Bathroom", from: ["calc(-50% - 4px)", "calc(50% + 4px)"] },
    { caption: "Extension", from: ["calc(50% + 4px)", "calc(-50% - 4px)"] },
  ];
  return (
    <SceneCard label="Quote page" aside={<Done at={2.8}>Placed</Done>}>
      <Body className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-3">
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {jobs.map((j, i) => (
            <div
              key={j.caption}
              className="relative flex min-w-0 flex-col justify-end overflow-hidden rounded-[4px] border border-light-border bg-light-surface p-1.5"
              style={moveFrom(
                j.from[0],
                j.from[1],
                0.55,
                0.3 + i * 0.25,
                play("wf-fade", 0.3, 0.3 + i * 0.25),
              )}
            >
              <FeatureIcon
                name="image"
                className="absolute left-1/2 top-[40%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-light-muted"
              />
              <span className="truncate text-[10px] leading-tight text-light-text">
                {j.caption}
              </span>
            </div>
          ))}
          <div
            className="flex items-center justify-center rounded-[4px] border border-dashed border-light-border text-[11px] text-light-muted"
            style={anim(play("wf-fade", 0.3, 1.1))}
          >
            +12 jobs
          </div>
        </div>
        <div className={`flex flex-col ${panel}`}>
          <PanelTitle icon="form">Your quote</PanelTitle>
          <div
            className="mt-3 flex items-center gap-0.5 text-accent"
            style={anim(play("wf-pop", 0.35, 1.6))}
          >
            {[0, 1, 2, 3, 4].map((s) => (
              <StarIcon key={s} />
            ))}
            <span className="ml-1 text-[11px] text-light-muted max-sm:hidden">Reviews</span>
          </div>
          <span
            className={`mt-2 inline-flex items-center gap-1.5 self-start rounded-[4px] border border-light-border bg-light-bg px-2 py-1 ${tag} text-light-text`}
            style={anim(play("wf-pop", 0.35, 2.1))}
          >
            <FeatureIcon name="shield" className="h-3 w-3 max-sm:hidden" />
            Accredited
          </span>
          <span className={`mt-auto self-start ${cta}`}>Get a quote</span>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 4, local search: the search is the job in the place, and the page
 * built for exactly that service and that town is the one that answers it.
 */
export function TradesSearchScene() {
  const pages = [
    { title: "Kitchen fitting in Worthing", url: "/kitchen-fitting/worthing", hit: true },
    { title: "Bathrooms in Worthing", url: "/bathrooms/worthing" },
    { title: "Kitchen fitting in Lancing", url: "/kitchen-fitting/lancing" },
  ];
  return (
    <SceneCard label="Local search" aside={<Done at={2.6}>Page found</Done>}>
      <Body>
        <div className={`gap-2 ${field}`}>
          <FeatureIcon name="search" className="h-3.5 w-3.5 shrink-0 text-light-muted" />
          <Typed text="kitchen fitter Worthing" at={0.3} dur={1.2} />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {pages.map((p, i) => (
            // Entrance on the wrapper, the match or the mute on the card, so
            // the two opacity animations never fight over one element.
            <div key={p.url} style={anim(play("wf-rise", 0.4, 0.4 + i * 0.1))}>
              <div
                className={
                  p.hit
                    ? "relative rounded-[4px] border border-accent bg-accent-subtle px-2.5 py-2"
                    : "rounded-[4px] border border-light-border bg-light-bg px-2.5 py-2 opacity-40"
                }
                style={anim(play(p.hit ? "wf-target" : "wf-mute", 0.4, 1.8))}
              >
                <p className="truncate text-[12px] font-medium leading-tight text-light-text">
                  {p.title}
                </p>
                {/* Only the matching page shows its address: it's the one
                    the search lands on. */}
                {p.hit ? (
                  <p className="mt-0.5 truncate font-mono text-[10px] text-light-muted">
                    {p.url}
                  </p>
                ) : null}
                {p.hit ? <Tick at={2.2} className="absolute -right-1.5 -top-1.5" /> : null}
              </div>
            </div>
          ))}
        </div>
      </Body>
    </SceneCard>
  );
}
