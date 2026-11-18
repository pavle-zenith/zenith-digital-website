import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Check } from "@/components/sections/service/who-for-scenes/shell";
import { cn } from "@/lib/utils";

/**
 * Shared parts for the industry step scenes, so the eleven scene files speak
 * one visual language: the same mono labels, item rows, panels and accent
 * buttons as travel's originals, and the same timing helpers.
 *
 * Every animation here follows the scene rules: pure CSS (wf-* keyframes in
 * globals.css), filled `both`, and every element's base style is its end
 * frame, so reduced motion lands on the finished picture.
 */

/** Mono uppercase label, as in travel's scenes. */
export const tag = "font-mono text-[10px] uppercase track-label";

/** One white row inside a panel. */
export const item =
  "rounded-[4px] border border-light-border bg-light-bg px-2.5 py-2 text-[12px] leading-tight text-light-text";

/** A tinted panel holding rows. */
export const panel =
  "rounded-[6px] border border-light-border bg-light-surface p-3";

/** The accent button. */
export const cta =
  "rounded-[4px] bg-accent px-2.5 py-1.5 text-[11px] font-medium text-accent-ink";

/** A dashed placeholder row (something that isn't there yet, or isn't you). */
export const ghost =
  "rounded-[4px] border border-dashed border-light-border px-2.5 py-2 text-[12px] leading-tight text-light-muted";

/** One wf-* keyframe as an `animation` shorthand, filled both ways. */
export function play(
  name: string,
  dur: number,
  at: number,
  ease = "ease-out",
): string {
  return `${name} ${dur}s ${ease} ${at}s both`;
}

/** Style for one or more `play(...)` animations. */
export function anim(...plays: string[]): React.CSSProperties {
  return { animation: plays.join(", ") };
}

const settle = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Arrive at the element's resting place from an offset (wf-move). Offsets are
 * any CSS length; percentages resolve against the element's own box, so
 * "calc(100% + 8px)" is "one grid cell over" at every width. `also` adds
 * further animations (an opacity fade, say) to the same element.
 */
export function moveFrom(
  x: string,
  y: string,
  dur: number,
  at: number,
  ...also: string[]
): React.CSSProperties {
  return {
    "--wf-x": x,
    "--wf-y": y,
    animation: [`wf-move ${dur}s ${settle} ${at}s both`, ...also].join(", "),
  } as React.CSSProperties;
}

/**
 * Leave towards an offset and disappear (wf-leave): an enquiry flying to its
 * team, a block that splits up. Hidden at the end, which is where reduced
 * motion lands too.
 */
export function leaveTo(
  x: string,
  y: string,
  dur: number,
  at: number,
): React.CSSProperties {
  return {
    "--wf-x": x,
    "--wf-y": y,
    animation: `wf-leave ${dur}s ${settle} ${at}s both`,
  } as React.CSSProperties;
}

/** The fixed-height body under the card header (fits GuideTabs' box). */
export function Body({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("relative mt-5 h-[188px]", className)}>{children}</div>;
}

/** A panel's small title: icon and mono label. */
export function PanelTitle({
  icon,
  children,
  className,
}: {
  icon?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        `flex items-center gap-1.5 whitespace-nowrap ${tag} text-light-muted`,
        className,
      )}
    >
      {icon ? <FeatureIcon name={icon} className="h-3.5 w-3.5 shrink-0" /> : null}
      {children}
    </p>
  );
}

/** The closing beat in a card header: a check and a word. */
export function Done({ at, children }: { at: number; children: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap ${tag} text-positive-ink`}
      style={anim(play("wf-pop", 0.35, at))}
    >
      <Check className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

/** A check that pops in at `at`. */
export function Tick({ at, className }: { at: number; className?: string }) {
  return (
    <span
      className={cn("inline-flex text-positive-ink", className)}
      style={anim(play("wf-pop", 0.35, at))}
    >
      <Check className="h-3.5 w-3.5" />
    </span>
  );
}

/**
 * Text that steps through values in place, left-aligned (the shell's
 * `Reading` is right-aligned, for header readouts). All values share one grid
 * cell, so the box is as big as the biggest value and nothing around it
 * moves as they swap. Only the last value holds.
 */
export function Cycle({
  values,
  start,
  step,
  className,
  restClassName,
  finalClassName,
}: {
  values: string[];
  start: number;
  step: number;
  /** On every value. */
  className?: string;
  /** On every value but the last (e.g. a strikethrough on the old wording). */
  restClassName?: string;
  /** On the last value only. */
  finalClassName?: string;
}) {
  const last = values.length - 1;
  return (
    <span className="inline-grid justify-items-start">
      {values.map((v, i) => (
        <span
          key={v}
          className={cn(
            "col-start-1 row-start-1",
            className,
            i < last ? restClassName : finalClassName,
          )}
          style={{
            animation:
              i < last
                ? `wf-blip ${step}s ease-out ${start + i * step}s both`
                : `wf-fade .35s ease-out ${start + i * step}s both`,
          }}
        >
          {v}
        </span>
      ))}
    </span>
  );
}

/**
 * Text being typed: revealed left to right in one step per character
 * (wf-type). The box keeps its full width from the start, so nothing shifts.
 */
export function Typed({
  text,
  at,
  dur,
  className,
}: {
  text: string;
  at: number;
  dur: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-block whitespace-nowrap", className)}
      style={anim(`wf-type ${dur}s steps(${text.length}, end) ${at}s both`)}
    >
      {text}
    </span>
  );
}

/** A ring that pings out once from behind an icon or dot (wf-ping). */
export function Ping({ at, className }: { at: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-full border-2 border-accent opacity-0",
        className,
      )}
      style={anim(play("wf-ping", 0.9, at))}
    />
  );
}

/** A thin browser frame, as in travel's design scene. */
export function Browser({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[6px] border border-light-border bg-light-bg",
        className,
      )}
    >
      <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-light-border bg-light-surface px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-light-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-light-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-light-border" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

/** A phone frame for the mobile-first scenes. */
export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex h-full w-[176px] flex-col overflow-hidden rounded-[14px] border border-light-border bg-light-bg",
        className,
      )}
    >
      <div className="flex h-5 shrink-0 items-center justify-center">
        <span className="h-1 w-10 rounded-full bg-light-border" />
      </div>
      <div className="relative min-h-0 flex-1 px-3 pb-3">{children}</div>
    </div>
  );
}

/** Lucide "pencil", inline per CLAUDE.md §15. */
export function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-3.5 w-3.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21.17 6.81a2.83 2.83 0 0 0-4-4L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

/** Lucide "phone", inline per CLAUDE.md §15. */
export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-3.5 w-3.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/** Lucide "play" (filled), for video posters. */
export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-3.5 w-3.5", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5z" />
    </svg>
  );
}

/** Lucide "star" (filled), for a rating row. */
export function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-3 w-3", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95z" />
    </svg>
  );
}

/** A round avatar with initials. */
export function Avatar({
  initials,
  className,
  style,
}: {
  initials: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-light-border bg-light-surface text-[10px] font-medium text-light-text",
        className,
      )}
      style={style}
    >
      {initials}
    </span>
  );
}

/**
 * A filter pill that switches on (or off) at a moment: both states share one
 * grid cell, so the pill never changes size. With neither time it's a plain
 * inactive pill.
 */
export function FilterChip({
  label,
  on,
  off,
}: {
  label: string;
  /** Becomes active at this time. */
  on?: number;
  /** Starts active and turns off at this time. */
  off?: number;
}) {
  const base =
    "col-start-1 row-start-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] leading-tight";
  const idle = `${base} border-light-border bg-light-bg text-light-text`;
  const active = `${base} border-accent bg-accent text-accent-ink`;
  if (on === undefined && off === undefined) {
    return <span className={`inline-grid ${idle}`}>{label}</span>;
  }
  const at = (on ?? off) as number;
  const leaving = anim(play("wf-exit", 0.25, at));
  const arriving = anim(play("wf-fade", 0.25, at));
  return (
    <span className="inline-grid">
      <span className={on !== undefined ? idle : active} style={leaving}>
        {label}
      </span>
      <span className={on !== undefined ? active : idle} style={arriving}>
        {label}
      </span>
    </span>
  );
}

/** A form input box (single line, fixed height). */
export const field =
  "flex h-7 items-center rounded-[4px] border border-light-border bg-light-bg px-2.5 text-[12px] leading-none text-light-text";

/** A small time slot or option button. */
export const slot =
  "rounded-[4px] border border-light-border bg-light-bg px-2 py-1.5 text-[11px] leading-tight text-light-text";

/** A small time slot or option, selected. */
export const slotOn =
  "rounded-[4px] border border-accent bg-accent-subtle px-2 py-1.5 text-[11px] leading-tight text-light-text";
