import {
  Line,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

import {
  Avatar,
  Body,
  Done,
  PanelTitle,
  Ping,
  Typed,
  anim,
  cta,
  field,
  item,
  moveFrom,
  panel,
  play,
  tag,
} from "./parts";

/**
 * Step scenes for /industries/marine. Same family as travel's (see
 * ./parts.tsx for the rules every scene follows).
 */

/**
 * Step 1, model: the three sides of a marine marketplace connect in order:
 * a seller lists, a buyer searches, and the enquiry routes back to the
 * seller, closing the loop.
 */
export function MarineModelScene() {
  const nodes = [
    { label: "Seller lists", icon: "anchor", at: 0.2 },
    { label: "Buyer searches", icon: "search", at: 0.8 },
    { label: "Enquiry routes", icon: "send", at: 1.4 },
  ];
  return (
    <SceneCard label="Marketplace model" aside={<Done at={3.0}>Mapped</Done>}>
      <Body className="flex flex-col justify-center">
        <div className="grid grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)_20px_minmax(0,1fr)] items-center">
          {nodes.map((n, i) => (
            <div key={n.label} className="contents">
              {i > 0 ? (
                <span
                  className="h-px origin-left bg-light-muted"
                  style={anim(play("wf-grow", 0.35, n.at - 0.3))}
                />
              ) : null}
              <div
                className="flex min-w-0 flex-col items-center rounded-[6px] border border-light-border bg-light-bg px-1.5 py-2.5 text-center"
                style={anim(play("wf-pop", 0.35, n.at))}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-[4px] border border-light-border bg-light-surface text-light-text">
                  <FeatureIcon name={n.icon} className="h-3.5 w-3.5" />
                </span>
                <span className="mt-1.5 text-[11px] font-medium leading-tight text-light-text">
                  {n.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* The loop back: from the enquiry, under the row, up to the seller.
            Its ends sit on the first and last node centres. */}
        <div className="relative mx-[calc((100%-40px)/6)] h-9">
          <span
            className="absolute right-0 top-0 h-full w-px origin-top bg-light-muted"
            style={anim(play("wf-grow-y", 0.3, 1.9))}
          />
          <span
            className="absolute inset-x-0 bottom-0 h-px origin-right bg-light-muted"
            style={anim(play("wf-grow", 0.5, 2.2))}
          />
          <span
            className="absolute left-0 top-0 h-full w-px origin-bottom bg-light-muted"
            style={anim(play("wf-grow-y", 0.3, 2.7))}
          />
          <span
            className="absolute -left-[4px] -top-[1px] h-0 w-0 border-x-[4.5px] border-b-[6px] border-x-transparent border-b-light-muted"
            style={anim(play("wf-fade", 0.2, 2.95))}
          />
          <span
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap bg-light-bg px-1.5 ${tag} text-light-muted`}
            style={anim(play("wf-fade", 0.3, 2.4))}
          >
            Back to the seller
          </span>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 2, listings: rows in the CMS become listing pages one by one, with
 * nobody building a page.
 */
export function MarineListingsScene() {
  const boats = [
    { name: "Sunseeker 40", length: "12.2m", price: "£189,000", short: "£189k" },
    { name: "Fairline 33", length: "10.1m", price: "£94,500", short: "£94.5k" },
    { name: "Beneteau 45", length: "13.9m", price: "£215,000", short: "£215k" },
  ];
  const cols = "grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)] gap-2";
  return (
    <SceneCard
      label="Listings"
      aside={
        <Reading
          values={["Generating", "3 pages"]}
          start={0.3}
          step={2.3}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body>
        <div className="rounded-[6px] border border-light-border bg-light-surface px-2.5 py-1.5">
          <div className={`${cols} ${tag} text-light-muted`}>
            <span>Name</span>
            <span>Length</span>
            <span>Price</span>
          </div>
          {boats.map((b, i) => (
            <div
              key={b.name}
              className={`relative mt-1 ${cols} rounded-[3px] py-0.5 text-[11px] tabular-nums text-light-text`}
            >
              <span
                aria-hidden
                className="absolute -inset-x-1 inset-y-0 rounded-[3px] bg-accent-subtle opacity-0"
                style={anim(play("wf-flash", 1.4, 0.3 + i * 0.6, "linear"))}
              />
              <span className="relative truncate">{b.name}</span>
              <span className="relative">{b.length}</span>
              <span className="relative truncate">{b.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {boats.map((b, i) => (
            <div
              key={b.name}
              className="min-w-0 overflow-hidden rounded-[4px] border border-light-border bg-light-bg"
              style={anim(play("wf-rise", 0.45, 0.9 + i * 0.6))}
            >
              <div className="flex h-7 items-center justify-center bg-light-surface text-light-muted">
                <FeatureIcon name="anchor" className="h-3.5 w-3.5" />
              </div>
              <div className="p-1.5">
                <p className="truncate text-[11px] font-medium leading-tight text-light-text max-sm:text-[9px]">
                  {b.name}
                </p>
                <p className="truncate text-[10px] tabular-nums leading-tight text-light-muted">
                  {b.short}
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
 * Step 3, enquiries: a buyer's enquiry reaches the seller and notifies them
 * at once, while the seller's number stays masked from the buyer.
 */
export function MarineEnquiriesScene() {
  return (
    <SceneCard label="Enquiry" aside={<Done at={3.0}>Delivered</Done>}>
      <Body className="grid grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)] items-center">
        <div className={panel}>
          <PanelTitle icon="form">Fairline 33</PanelTitle>
          <div className={`mt-3 ${field}`}>
            <Typed text="Sam Carter" at={0.3} dur={0.6} />
          </div>
          <div className="mt-2 flex flex-col gap-1.5 rounded-[4px] border border-light-border bg-light-bg p-2.5">
            <Line className="w-full bg-light-border" />
            <Line className="w-4/5 bg-light-border" />
          </div>
          <span className={`mt-3 inline-block ${cta}`}>Send enquiry</span>
        </div>
        <div className="relative h-px bg-light-border">
          <span
            className="absolute -top-[2.5px] h-1.5 w-1.5 rounded-full bg-accent"
            style={anim(play("wf-travel", 0.7, 1.3, "ease-in-out"))}
          />
        </div>
        <div className={panel}>
          <div className="flex items-center gap-2">
            <span className="relative">
              <Avatar initials="PS" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5">
                <Ping at={2.1} />
                <span
                  className="absolute inset-0 rounded-full border-2 border-light-surface bg-accent"
                  style={anim(play("wf-pop", 0.3, 2.0))}
                />
              </span>
            </span>
            <span className="min-w-0 truncate text-[12px] font-medium text-light-text">
              Seller
            </span>
          </div>
          {/* The seller's number, masked from the buyer. */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] tabular-nums text-light-muted">
            <FeatureIcon name="lock" className="h-3 w-3 shrink-0" />
            <span className="whitespace-nowrap">+44 •••• ••••</span>
          </div>
          <div
            className={`mt-3 ${item}`}
            style={moveFrom("-24px", "0", 0.45, 2.0, play("wf-fade", 0.3, 2.0))}
          >
            <span className="block font-medium">New enquiry</span>
            <span className="block truncate text-[11px] text-light-muted">
              Fairline 33
            </span>
          </div>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 4, design: the boat large, the specs a buyer scans in seconds, and a
 * price that's never hard to find, in the buyer's own currency.
 */
export function MarineDesignScene() {
  const specs = [
    { k: "Length", v: "12.2m" },
    { k: "Year", v: "2019" },
    { k: "Berths", v: "4" },
  ];
  return (
    <SceneCard
      label="Listing page"
      aside={
        <span className="relative grid grid-cols-2 rounded-[4px] border border-light-border bg-light-surface p-0.5 text-[10px] font-medium leading-none text-light-text">
          {/* The selected segment, sliding from £ to €. */}
          <span
            aria-hidden
            className="absolute bottom-0.5 left-1/2 top-0.5 w-[calc(50%-2px)] rounded-[3px] border border-light-border bg-light-bg"
            style={moveFrom("-100%", "0", 0.3, 2.3)}
          />
          <span className="relative px-2 py-1">£</span>
          <span className="relative px-2 py-1">€</span>
        </span>
      }
    >
      <Body className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-3">
        <div
          className="overflow-hidden rounded-[6px] border border-light-border"
          style={anim(play("wf-fade", 0.6, 0.2))}
        >
          <svg
            viewBox="0 0 200 188"
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full"
            aria-hidden
          >
            <rect width="200" height="188" className="fill-light-surface" />
            <rect y="112" width="200" height="76" className="fill-light-text" />
            <path
              d="M24 110h152l-14 18H40z"
              className="fill-light-bg stroke-light-text"
              strokeWidth="1.5"
            />
            <path
              d="M62 110l5-20h62l12 20z"
              className="fill-light-bg stroke-light-text"
              strokeWidth="1.5"
            />
            <path
              d="M80 90l4-12h34l5 12z"
              className="fill-light-bg stroke-light-text"
              strokeWidth="1.5"
            />
            <rect x="72" y="97" width="52" height="4" rx="1" className="fill-light-text" />
            <path
              d="M30 140h40M110 150h50M60 164h30"
              className="stroke-light-bg/40"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex min-w-0 flex-col">
          {specs.map((s, i) => (
            <div
              key={s.k}
              className="flex items-center justify-between border-b border-light-border py-1.5 text-[11px]"
              style={anim(play("wf-slide", 0.35, 0.6 + i * 0.15))}
            >
              <span className="text-light-muted">{s.k}</span>
              <span className="font-medium tabular-nums text-light-text">{s.v}</span>
            </div>
          ))}
          <p className={`mt-auto ${tag} text-light-muted`}>Price</p>
          <p className="mt-1 font-display text-[18px] font-medium leading-none tabular-nums text-light-text">
            <Reading values={["£189,000", "€218,000"]} start={1.1} step={1.3} />
          </p>
        </div>
      </Body>
    </SceneCard>
  );
}
