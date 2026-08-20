import { cn } from "@/lib/utils";

/**
 * One tab in a client-side filter row. Shared by the case studies grid and the
 * blog index so the two filter bars are the same control rather than two that
 * happen to look alike.
 *
 * A slightly rounded rectangle at the button radius (6px), not a pill: these
 * are controls, and they read as controls when they share the shape of every
 * other button on the site. Body face throughout, never the mono label style,
 * because a tab is something you click rather than a caption you read.
 */
export function FilterTab({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        // shrink-0 so a row that scrolls does exactly that, rather than
        // squeezing every tab onto one line.
        "shrink-0 whitespace-nowrap rounded-[6px] border px-4 py-2 text-body font-medium transition",
        active
          ? "border-accent bg-accent text-accent-ink"
          : "border-light-border text-light-text hover:bg-light-surface",
        className,
      )}
    >
      {children}
    </button>
  );
}
