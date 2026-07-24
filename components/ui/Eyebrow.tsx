import { cn } from "@/lib/utils";

/**
 * Uppercase eyebrow label. Used sparingly, only when it genuinely orients the
 * reader (§14). Renders nothing if empty.
 */
export function Eyebrow({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  if (!children) return null;
  return (
    <p
      className={cn(
        "mb-4 font-mono text-label uppercase track-label text-light-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
