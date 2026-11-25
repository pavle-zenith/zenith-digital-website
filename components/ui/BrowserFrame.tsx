import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

/**
 * A browser window drawn in code: three dots and the address in a centred
 * pill, over whatever it frames. Our border and radius, tone-aware, so it
 * sits on white (the before/after showcase) and on navy (the /about
 * timeline) alike.
 *
 * It is its own size container: the bar grows from 40px to 48px once the
 * frame is 36rem wide, and anything framed can answer to the frame's width
 * with the same `@xl:` queries.
 *
 * Extra props pass to the outer element, so a host can label it (the
 * before/after frame is a `role="group"` named for the client).
 */
export function BrowserFrame({
  address,
  tone = "light",
  className,
  children,
  ...rest
}: {
  /** The domain, or a name when there isn't a public one. */
  address: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children">) {
  const dark = tone === "dark";
  return (
    <div
      {...rest}
      className={cn(
        "@container w-full overflow-hidden rounded-card border",
        dark ? "border-border bg-surface" : "border-light-border bg-light-bg",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex h-10 items-center border-b px-4 @xl:h-12 @xl:px-5",
          dark ? "border-border" : "border-light-border",
        )}
      >
        <span aria-hidden className="flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                dark ? "bg-text-muted/30" : "bg-light-muted/25",
              )}
            />
          ))}
        </span>
        <span
          className={cn(
            "absolute left-1/2 top-1/2 max-w-[60%] -translate-x-1/2 -translate-y-1/2 truncate rounded-full px-4 py-1 text-label leading-5",
            dark ? "bg-surface-2 text-text-muted" : "bg-light-surface text-light-muted",
          )}
        >
          {address}
        </span>
      </div>
      {children}
    </div>
  );
}
