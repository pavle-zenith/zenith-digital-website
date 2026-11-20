"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { CompareColumns, type CompareOption } from "@/components/ui/CompareColumns";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { CURRENCIES, type Currency } from "@/content/fx";
import type { MarketRange } from "@/content/tools/market";
import type { CalculatorCopy } from "@/content/tools/website-cost";
import { cn } from "@/lib/utils";
import {
  LANDING_INCLUDES,
  RULES,
  WEBSITE_ONLY,
  defaultInput,
  estimate,
  formatShown,
  inEuro,
  money,
  show,
  yearOne,
  type CostInput,
  type Estimate,
  type ExtraKey,
  type Need,
  type Price,
  type PriceBook,
  type Shown,
} from "@/lib/website-cost";

/**
 * The cost calculator's client island (cost calculator brief, 20 Nov 2026).
 *
 * The server renders all of this with the default answers (new website,
 * 5 pages, Wix Studio, EUR), so crawlers and AI answers read a full estimate
 * in the HTML. On the client the same `estimate()` reruns on every change.
 * Prices arrive in `book` (content/tools/price-book.ts) and words in `copy`,
 * both plain data from the server, so this bundle carries no content files.
 *
 * One provider wraps the calculator and the "three ways to buy it" cards,
 * so the Zenith Digital card and the phone's bottom bar follow the answers.
 */

export type MarketData = { freelancer: MarketRange; agency: MarketRange; scaleMax: number };

type Ctx = {
  book: PriceBook;
  copy: CalculatorCopy;
  market: MarketData;
  input: CostInput;
  est: Estimate;
  currency: Currency;
  notice: Estimate["switched"];
  setCurrency: (c: Currency) => void;
  update: (patch: Partial<CostInput>) => void;
  setNeed: (need: Need) => void;
  toggleExtra: (key: ExtraKey) => void;
};

const CostContext = createContext<Ctx | null>(null);

function useCost(): Ctx {
  const ctx = useContext(CostContext);
  if (!ctx) throw new Error("Cost calculator parts must sit inside CostProvider");
  return ctx;
}

const STORE_KEY = "zenith-cost-currency";

/** GBP for en-GB, USD for en-US, else the server's EUR. */
function preferredCurrency(): Currency | null {
  try {
    const saved = window.localStorage.getItem(STORE_KEY);
    if (saved && (CURRENCIES as string[]).includes(saved)) return saved as Currency;
  } catch {
    // Storage blocked: fall through to the browser language.
  }
  const lang = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
  if (lang === "en-gb") return "GBP";
  if (lang === "en-us") return "USD";
  return null;
}

export function CostProvider({
  book,
  copy,
  market,
  children,
}: {
  book: PriceBook;
  copy: CalculatorCopy;
  market: MarketData;
  children: React.ReactNode;
}) {
  const [input, setInput] = useState<CostInput>(() => defaultInput(book));
  const [currency, setCurrencyState] = useState<Currency>("EUR");
  const [notice, setNotice] = useState<Estimate["switched"]>(null);

  // After hydration, so the server HTML (EUR) and the first client render match.
  useEffect(() => {
    const preferred = preferredCurrency();
    if (preferred) setCurrencyState(preferred);
  }, []);

  const est = useMemo(() => estimate(input, book), [input, book]);

  const value = useMemo<Ctx>(() => {
    const commit = (next: CostInput) => {
      const e = estimate(next, book);
      // A landing page that grows into a website stays one: the answers
      // move to "New website" and the note says why.
      if (e.switched) {
        setNotice(e.switched);
        setInput({ ...next, need: e.input.need });
      } else {
        setInput(next);
      }
    };
    return {
      book,
      copy,
      market,
      input,
      est,
      currency,
      notice,
      setCurrency: (c) => {
        setCurrencyState(c);
        try {
          window.localStorage.setItem(STORE_KEY, c);
        } catch {
          // Not remembered; the choice still holds for this visit.
        }
      },
      update: (patch) => commit({ ...input, ...patch }),
      setNeed: (need) => {
        setNotice(null);
        if (need === "landing") {
          setInput({
            ...input,
            need,
            pages: input.pages <= book.landing.maxPages ? input.pages : 1,
            extras: input.extras.filter((x) => !WEBSITE_ONLY.includes(x)),
          });
        } else {
          setInput({ ...input, need });
        }
      },
      toggleExtra: (key) =>
        commit({
          ...input,
          extras: input.extras.includes(key) ? input.extras.filter((x) => x !== key) : [...input.extras, key],
        }),
    };
  }, [book, copy, market, input, est, currency, notice]);

  return <CostContext.Provider value={value}>{children}</CostContext.Provider>;
}

/* ------------------------------------------------------------------ *
 * Shared wording helpers
 * ------------------------------------------------------------------ */

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const low = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** "5 pages", "1 page", "20+ pages". */
function pagesText(n: number, copy: CalculatorCopy) {
  return `${n >= RULES.maxPages ? `${RULES.maxPages}+` : n} ${n === 1 ? copy.pages.one : copy.pages.many}`;
}

/** "The Minimum, 5 pages"; "Over 12 pages" when quoted. */
function buildDetail(est: Estimate, copy: CalculatorCopy) {
  if (est.build.tier === "quoted") {
    return est.build.quotedReason === "products" ? copy.estimate.overProducts : copy.estimate.overPages;
  }
  return `${est.build.name}, ${pagesText(est.build.pages, copy)}`;
}

function extraLabel(key: ExtraKey, copy: CalculatorCopy) {
  return copy.extras.items.find((i) => i.key === key)?.label ?? key;
}

/** "Multiple languages and ongoing work are scoped on the call." */
function quotedLine(est: Estimate, copy: CalculatorCopy) {
  const items = est.quoted.map((k, i) => (i === 0 ? copy.estimate.quotedItems[k] : low(copy.estimate.quotedItems[k])));
  if (!items.length) return null;
  const list = items.join(", ").replace(/, ([^,]*)$/, " and $1");
  return `${list} ${items.length === 1 ? copy.estimate.scoped.one : copy.estimate.scoped.many}`;
}

const range = (r: MarketRange): Price => ({
  kind: "range",
  low: { amount: r.low, currency: r.currency },
  high: { amount: r.high, currency: r.currency },
});

/* ------------------------------------------------------------------ *
 * The calculator
 * ------------------------------------------------------------------ */

/*
 * Kept quiet on purpose (owner, 20 Nov 2026: "messy, too much text"):
 * options are labels only, the two choices are joined controls like the
 * currency toggle, the extras are one ruled list, and a note appears only
 * under an extra once it's ticked.
 */

export function CostCalculator() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-8">
      <Inputs />
      <EstimatePanel />
    </div>
  );
}

function Inputs() {
  const { copy } = useCost();
  return (
    <div className="type-card overflow-hidden rounded-card border border-light-border bg-light-bg">
      <div className="flex items-center justify-between gap-4 border-b border-light-border px-5 py-4 md:px-8">
        <h2 className="font-display text-h3 font-medium leading-tight tracking-tight">{copy.inputs.heading}</h2>
        <CurrencyToggle />
      </div>
      <div className="divide-y divide-light-border">
        <NeedStep />
        <PagesStep />
        <PlatformStep />
        <ExtrasStep />
        <AfterStep />
      </div>
    </div>
  );
}

const FOCUS_WITHIN =
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent";

function CurrencyToggle() {
  const { currency, setCurrency, copy } = useCost();
  return (
    <fieldset>
      <legend className="sr-only">{copy.inputs.currency}</legend>
      <div className="flex rounded-[6px] border border-light-border bg-light-bg p-0.5">
        {CURRENCIES.map((c) => (
          <label
            key={c}
            className={cn(
              "cursor-pointer rounded-[4px] px-3 py-1.5 font-mono text-label uppercase track-label transition",
              FOCUS_WITHIN,
              c === currency ? "bg-accent text-accent-ink" : "text-light-muted hover:text-light-text",
            )}
          >
            <input
              type="radio"
              name="cost-currency"
              value={c}
              checked={c === currency}
              onChange={() => setCurrency(c)}
              className="sr-only"
            />
            {c}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Step({
  n,
  title,
  as = "fieldset",
  labelId,
  aside,
  children,
}: {
  n: string;
  title: string;
  /** A radio or checkbox group is a fieldset; the slider is a labelled group. */
  as?: "fieldset" | "group";
  labelId?: string;
  /** Right of the heading (the page count and its buttons). */
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  const heading = (
    <span className="flex items-baseline gap-3">
      <span className="font-mono text-label uppercase track-label text-light-muted">{n}</span>
      <span className="font-display text-body-lg font-medium leading-tight">{title}</span>
    </span>
  );
  return (
    <div className="px-5 py-5 md:px-8 md:py-6">
      {as === "fieldset" ? (
        <fieldset>
          <legend className="mb-3.5">{heading}</legend>
          {children}
        </fieldset>
      ) : (
        <div role="group" aria-labelledby={labelId}>
          <div className="mb-3.5 flex min-h-9 items-center justify-between gap-4">
            <p id={labelId}>{heading}</p>
            {aside}
          </div>
          {children}
        </div>
      )}
    </div>
  );
}

/** One joined control: three labels in a single frame, the chosen one filled. */
function Segmented<K extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { key: K; label: string }[];
  value: K;
  onChange: (key: K) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1 rounded-[6px] border border-light-border p-1">
      {options.map((o) => {
        const on = o.key === value;
        return (
          <label
            key={o.key}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-[4px] px-1 py-2.5 text-center text-[0.875rem] font-medium leading-tight transition sm:px-2 sm:text-body",
              FOCUS_WITHIN,
              on ? "bg-accent text-accent-ink" : "text-light-text hover:bg-light-surface",
            )}
          >
            <input type="radio" name={name} value={o.key} checked={on} onChange={() => onChange(o.key)} className="sr-only" />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p role="status" className="mt-4 text-[0.8125rem] leading-snug text-light-muted">
      {children}
    </p>
  );
}

function NeedStep() {
  const { copy, input, setNeed } = useCost();
  return (
    <Step n={copy.need.n} title={copy.need.title}>
      <Segmented name="cost-need" options={copy.need.options} value={input.need} onChange={setNeed} />
    </Step>
  );
}

function PagesStep() {
  const { copy, input, est, book, notice, update } = useCost();
  const landing = input.need === "landing";
  // Landing mode runs 1 to 3, with a "4+" stop that turns it into a website.
  const max = landing ? book.landing.maxPages + 1 : RULES.maxPages;
  const ticks = landing
    ? Array.from({ length: max }, (_, i) => i + 1)
    : [1, book.minimum.pages, book.studio.pages, RULES.maxPages];
  const value = Math.min(input.pages, max);
  const label = (v: number) => (v === max ? `${v}+` : `${v}`);
  const pct = (v: number) => ((v - 1) / (max - 1)) * 100;
  // Keep a tick under the thumb's centre: the 20px thumb travels 20px less than the track.
  const at = (v: number) => `calc(${pct(v)}% + ${(0.5 - pct(v) / 100) * 20}px)`;
  const set = (v: number) => update({ pages: Math.max(1, Math.min(max, v)) });
  const unit = value === 1 ? copy.pages.one : copy.pages.many;

  return (
    <Step
      n={copy.pages.n}
      title={landing ? copy.pages.landingTitle : copy.pages.title}
      as="group"
      labelId="cost-pages-label"
      aside={
        <div className="flex items-center gap-3">
          <p className="font-display text-body-lg font-medium tabular-nums" aria-hidden>
            {label(value)} <span className="font-normal text-light-muted">{unit}</span>
          </p>
          <div className="flex gap-1.5">
            {(
              [
                { label: copy.pages.fewer, icon: "minus", to: value - 1, disabled: value <= 1 },
                { label: copy.pages.more, icon: "plus", to: value + 1, disabled: value >= max },
              ] as const
            ).map((b) => (
              <button
                key={b.icon}
                type="button"
                aria-label={b.label}
                disabled={b.disabled}
                onClick={() => set(b.to)}
                className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition hover:bg-light-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FeatureIcon name={b.icon} className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      }
    >
      <input
        type="range"
        min={1}
        max={max}
        step={1}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        aria-labelledby="cost-pages-label"
        aria-valuetext={`${label(value)} ${unit}`}
        className="cost-range mt-2"
        style={{ "--fill": `${pct(value)}%` } as React.CSSProperties}
      />
      <div className="relative mt-2 h-5" aria-hidden>
        {ticks.map((t, i) => (
          <span
            key={t}
            style={{ left: at(t) }}
            className={cn(
              "absolute top-0 font-mono text-label text-light-muted",
              i === 0 ? "-translate-x-[10px]" : i === ticks.length - 1 ? "-translate-x-[calc(100%-10px)]" : "-translate-x-1/2",
            )}
          >
            {label(t)}
          </span>
        ))}
      </div>
      {notice === "landing-pages" && !landing ? <Note>{copy.pages.switchedPages}</Note> : null}
      {notice === "landing-extra" && !landing ? <Note>{copy.pages.switchedExtra}</Note> : null}
      {est.build.quotedReason === "pages" ? <Note>{copy.pages.over}</Note> : null}
    </Step>
  );
}

function PlatformStep() {
  const { copy, input, update } = useCost();
  return (
    <Step n={copy.platform.n} title={copy.platform.title}>
      <Segmented
        name="cost-platform"
        options={copy.platform.options}
        value={input.platform}
        onChange={(platform) => update({ platform })}
      />
      <p className="mt-3 text-[0.8125rem] text-light-muted">{copy.platform.hint}</p>
    </Step>
  );
}

function Box({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border transition",
        on ? "border-accent bg-accent text-accent-ink" : "border-light-border bg-light-bg text-transparent",
      )}
    >
      <FeatureIcon name="check" className="h-3.5 w-3.5" />
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 font-mono text-label uppercase track-label text-light-muted">{children}</span>
  );
}

/** One ticked-or-not row in a ruled list. Its note shows once it's ticked. */
function Toggle({
  on,
  onChange,
  label,
  note,
  tag,
}: {
  on: boolean;
  onChange: () => void;
  label: string;
  note?: string;
  tag?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 px-4 py-3 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-accent",
        on ? "bg-light-bg" : "hover:bg-light-surface",
      )}
    >
      <input type="checkbox" checked={on} onChange={onChange} className="sr-only" />
      <span className="pt-0.5">
        <Box on={on} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-medium leading-snug sm:text-body">{label}</span>
        {on && note ? <span className="mt-0.5 block text-[0.8125rem] leading-snug text-light-muted">{note}</span> : null}
      </span>
      {tag ? (
        <span className="pt-0.5">
          <Tag>{tag}</Tag>
        </span>
      ) : null}
    </label>
  );
}

const LIST = "divide-y divide-light-border overflow-hidden rounded-[6px] border border-light-border";

function ExtrasStep() {
  const { copy, input, est, toggleExtra } = useCost();
  const landing = input.need === "landing";
  return (
    <Step n={copy.extras.n} title={copy.extras.title}>
      <ul className={LIST}>
        {copy.extras.items.map((item) => {
          // A landing page already has its copy and integrations.
          if (landing && LANDING_INCLUDES.includes(item.key)) {
            return (
              <li key={item.key} className="flex items-start gap-3 bg-light-surface px-4 py-3 text-light-muted">
                <span className="flex h-6 w-5 shrink-0 items-center justify-center">
                  <FeatureIcon name="check" className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1 text-[0.9375rem] leading-snug sm:text-body">{item.label}</span>
                <span className="pt-0.5">
                  <Tag>{copy.extras.included}</Tag>
                </span>
              </li>
            );
          }
          const on = input.extras.includes(item.key);
          return (
            <li key={item.key}>
              <Toggle
                on={on}
                onChange={() => toggleExtra(item.key)}
                label={item.label}
                note={item.note}
                tag={item.key === "languages" ? copy.extras.quoted : undefined}
              />
              {item.key === "store" && on ? <Products over={est.build.quotedReason === "products"} /> : null}
            </li>
          );
        })}
      </ul>
    </Step>
  );
}

function Products({ over }: { over: boolean }) {
  const { copy, input, update } = useCost();
  const [text, setText] = useState(String(input.products));
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 bg-light-surface py-3 pl-12 pr-4">
      <label htmlFor="cost-products" className="text-[0.9375rem] font-medium">
        {copy.extras.products}
      </label>
      <input
        id="cost-products"
        type="number"
        inputMode="numeric"
        min={1}
        step={1}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          const n = parseInt(e.target.value, 10);
          if (n > 0) update({ products: n });
        }}
        className="w-24 rounded-[6px] border border-light-border bg-light-bg px-3 py-1.5 text-body tabular-nums text-light-text"
      />
      {over ? <p className="basis-full text-[0.8125rem] text-light-muted">{copy.extras.productsOver}</p> : null}
    </div>
  );
}

function AfterStep() {
  const { copy, input, update } = useCost();
  return (
    <Step n={copy.after.n} title={copy.after.title}>
      <ul className={LIST}>
        <li>
          <Toggle
            on={input.ongoing}
            onChange={() => update({ ongoing: !input.ongoing })}
            label={copy.after.ongoing.label}
            note={copy.after.ongoing.note}
            tag={copy.extras.quoted}
          />
        </li>
      </ul>
      <p className="mt-3 flex items-center gap-2 text-[0.8125rem] text-light-muted">
        <FeatureIcon name="check" className="h-3.5 w-3.5 shrink-0 text-light-text" />
        {copy.after.support}
      </p>
    </Step>
  );
}

/* ------------------------------------------------------------------ *
 * The estimate
 * ------------------------------------------------------------------ */

function EstimatePanel() {
  const { est, currency, copy } = useCost();
  const e = copy.estimate;
  const build = show(est.build.price, currency);
  const plan = show(est.platform.price, currency);
  const total = yearOne(est, currency);
  const totalText = formatShown(total, e.quoted);
  const anyApprox = build.approx || plan.approx;

  const chosen = est.input.extras.filter((k) => !(est.input.need === "landing" && LANDING_INCLUDES.includes(k)));
  const extras =
    est.extras.quoted.length || (est.build.tier === "quoted" && chosen.length)
      ? e.quoted
      : est.extras.included.length
        ? e.included
        : e.none;

  const rows: { label: string; value: string; detail?: string; note?: string }[] = [
    {
      label: e.build,
      value: formatShown(build, e.quoted),
      detail: buildDetail(est, copy),
      note:
        est.build.tier === "range" && est.build.rangeExtra
          ? `${extraLabel(est.build.rangeExtra, copy)} on ${est.build.name}. ${e.rangeNote}`
          : undefined,
    },
    {
      label: e.platform,
      value: formatShown(plan, e.quoted),
      detail: est.platform.price.kind === "quoted" ? e.customStore : `${est.platform.name}, ${e.months}`,
    },
    { label: e.extras, value: extras },
    { label: e.after, value: est.ongoing ? e.quoted : e.support, detail: est.ongoing ? e.ongoing : undefined },
    { label: e.timeline, value: est.timeline ?? e.timelineQuoted },
  ];
  const quoted = quotedLine(est, copy);

  return (
    <aside
      id="estimate"
      aria-labelledby="estimate-heading"
      className="tone-dark scroll-mt-[calc(5rem+var(--announce-h))] rounded-card bg-bg p-6 text-text md:p-8 lg:sticky lg:top-[calc(5.5rem+var(--announce-h))]"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id="estimate-heading" className="font-display text-body-lg font-medium">
          {e.heading}
        </h2>
        <span className="font-mono text-label uppercase track-label text-text-muted">{currency}</span>
      </div>

      {total.kind !== "quoted" ? <Bar build={build} plan={plan} copy={copy} /> : null}

      <dl className="mt-5 divide-y divide-border border-t border-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 py-3">
            <dt className="min-w-0">
              <span className="block text-[0.9375rem]">{row.label}</span>
              {row.detail ? <span className="mt-0.5 block text-[0.8125rem] leading-snug text-text-muted">{row.detail}</span> : null}
              {row.note ? <span className="mt-1 block text-[0.8125rem] leading-snug text-text">{row.note}</span> : null}
            </dt>
            <dd className="max-w-[55%] text-right font-display text-body font-medium leading-snug tabular-nums">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-border pt-5">
        <p className="font-mono text-label uppercase track-label text-text-muted">{e.total}</p>
        <p className="mt-2 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-none tracking-tight tabular-nums">
          {totalText}
        </p>
        {quoted ? <p className="mt-3 text-[0.8125rem] leading-snug text-text-muted">{quoted}</p> : null}
        <p className="sr-only" aria-live="polite">
          {`${e.total}: ${totalText}`}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        <PanelLink href={e.cta.href} primary>
          {e.cta.label}
        </PanelLink>
        <PanelLink href={e.secondary.href}>{e.secondary.label}</PanelLink>
      </div>

      <p className="mt-5 text-[0.75rem] leading-relaxed text-text-muted">
        {e.notIncluded} {anyApprox ? `${e.approx} ` : ""}
        {e.footnote}
      </p>
    </aside>
  );
}

/** Build vs platform plan, to scale; the open end of a range in a lighter fill. */
function Bar({ build, plan, copy }: { build: Shown; plan: Shown; copy: CalculatorCopy }) {
  const whole = build.high + plan.high || 1;
  const pct = (n: number) => `${(n / whole) * 100}%`;
  return (
    <div className="mt-5" aria-hidden>
      <div className="flex h-2 gap-0.5 overflow-hidden rounded-[2px]">
        <span className="bg-white transition-[width] duration-300" style={{ width: pct(build.low) }} />
        {build.high > build.low ? (
          <span className="bg-white/30 transition-[width] duration-300" style={{ width: pct(build.high - build.low) }} />
        ) : null}
        {plan.high > 0 ? <span className="bg-text-muted transition-[width] duration-300" style={{ width: pct(plan.high) }} /> : null}
      </div>
      <div className="mt-2 flex gap-4 font-mono text-label uppercase track-label text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-[1px] bg-white" />
          {copy.estimate.bar.build}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-[1px] bg-text-muted" />
          {copy.estimate.bar.platform}
        </span>
      </div>
    </div>
  );
}

function PanelLink({ href, primary, children }: { href: string; primary?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-body font-medium transition active:scale-[.99]",
        primary ? "bg-white text-bg hover:bg-white/90" : "border border-border text-text hover:bg-surface-2",
      )}
    >
      {children}
      <span aria-hidden className="btn-arrow">
        &rarr;
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Phones: the year-one total, pinned while the inputs are on screen
 * ------------------------------------------------------------------ */

export function CostMobileBar() {
  const { est, currency, copy } = useCost();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const calc = document.getElementById("calculator");
    const panel = document.getElementById("estimate");
    if (!calc || !panel) return;
    let inCalc = false;
    let panelShown = false;
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === calc) inCalc = entry.isIntersecting;
        else panelShown = entry.isIntersecting;
      }
      setVisible(inCalc && !panelShown);
    });
    io.observe(calc);
    io.observe(panel);
    return () => io.disconnect();
  }, []);

  const toBreakdown = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("estimate")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div
      inert={!visible}
      className={cn(
        "tone-dark fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg px-4 pt-3 text-text transition-transform duration-300 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-label uppercase track-label text-text-muted">{copy.mobileBar.label}</p>
          <p className="mt-1 truncate font-display text-body-lg font-medium tabular-nums">
            {formatShown(yearOne(est, currency), copy.estimate.quoted)}
          </p>
        </div>
        <button
          type="button"
          onClick={toBreakdown}
          className="shrink-0 rounded-[6px] bg-white px-5 py-2.5 text-body font-medium text-bg transition hover:bg-white/90"
        >
          {copy.mobileBar.button}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The same site, three ways to buy it
 * ------------------------------------------------------------------ */

export function CostComparison({ header }: { header: React.ReactNode }) {
  const { est, currency, copy, market } = useCost();
  const m = copy.market;
  const zen = show(est.build.price, currency);
  const scaleTop = formatShown(show({ kind: "fixed", value: { amount: market.scaleMax, currency: "EUR" } }, currency));
  const scale = (lo: number, hi: number, ours?: boolean) => (
    <Scale low={lo} high={hi} max={market.scaleMax} top={scaleTop} bottom={money(0, currency)} ours={ours} />
  );
  const euroOf = (p: Price) =>
    p.kind === "quoted" ? null : p.kind === "range" ? [inEuro(p.low), inEuro(p.high)] : [inEuro(p.value), inEuro(p.value)];
  const ours = euroOf(est.build.price);
  const rowsOf = (texts: Record<keyof typeof m.rowLabels, string>, mark: "good" | "mixed") =>
    (Object.keys(m.rowLabels) as (keyof typeof m.rowLabels)[]).map((k) => ({ label: m.rowLabels[k], text: texts[k], mark }));

  const designNote =
    est.build.tier === "quoted"
      ? m.zenith.quotedNote
      : est.build.tier === "landing"
        ? m.zenith.landingNote
        : cap(est.build.priceNote);

  const options: CompareOption[] = [
    {
      name: m.freelancer.name,
      icon: m.freelancer.icon,
      headline: formatShown(show(range(market.freelancer), currency)),
      sub: m.freelancer.basis,
      visual: scale(...(euroOf(range(market.freelancer)) as [number, number])),
      rows: rowsOf(m.freelancer.rows, "mixed"),
    },
    {
      name: m.zenith.name,
      icon: m.zenith.icon,
      ours: true,
      badge: m.zenith.badge,
      headline: formatShown(zen, copy.estimate.quoted),
      sub: buildDetail(est, copy),
      visual: ours ? scale(ours[0], ours[1], true) : scale(0, 0, true),
      rows: rowsOf(
        {
          who: m.zenith.who,
          build: designNote,
          timeline: est.timeline ?? copy.estimate.timelineQuoted,
          fixed: m.zenith.fixed,
          migration: m.zenith.migration,
          support: m.zenith.support,
        },
        "good",
      ),
    },
    {
      name: m.agency.name,
      icon: m.agency.icon,
      headline: formatShown(show(range(market.agency), currency)),
      sub: m.agency.basis,
      visual: scale(...(euroOf(range(market.agency)) as [number, number])),
      rows: rowsOf(m.agency.rows, "mixed"),
    },
  ];

  return <CompareColumns header={header} options={options} labels={m.labels} tone="light" />;
}

/** One card's price on the shared scale, euros under the hood. */
function Scale({
  low: lo,
  high,
  max,
  top,
  bottom,
  ours,
}: {
  low: number;
  high: number;
  max: number;
  top: string;
  bottom: string;
  ours?: boolean;
}) {
  const left = Math.min(100, (lo / max) * 100);
  const width = high > 0 ? Math.max(1.5, Math.min(100, (high / max) * 100) - left) : 0;
  return (
    <div aria-hidden>
      <div className="relative h-2 overflow-hidden rounded-[2px] bg-light-border">
        {width ? (
          <span
            className={cn("absolute inset-y-0 rounded-[2px] transition-[left,width] duration-300", ours ? "bg-accent" : "bg-light-muted")}
            style={{ left: `${left}%`, width: `${width}%` }}
          />
        ) : null}
      </div>
      <div className="mt-2 flex justify-between font-mono text-label text-light-muted">
        <span>{bottom}</span>
        <span>{top}</span>
      </div>
    </div>
  );
}
