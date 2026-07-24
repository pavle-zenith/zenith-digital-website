import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

/**
 * Full-width section with the hairline frame (Stripe / Lightdash look). The
 * background color alternates by tone; the content sits in a centered .frame column
 * with thin vertical side rails and a top divider rule. Set `divide={false}` for
 * the first section (the hero) so there's no rule above it.
 */
export function Section({
  tone = "dark",
  children,
  className,
  frameClassName,
  divide = true,
  as: Tag = "section",
  id,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  frameClassName?: string;
  divide?: boolean;
  as?: React.ElementType;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      data-tone={tone}
      className={cn(
        tone === "dark" ? "tone-dark bg-bg text-text" : "tone-light bg-light-bg text-light-text",
        className,
      )}
    >
      <div className={cn("frame section-py", divide && "frame-divide", frameClassName)}>
        {children}
      </div>
    </Tag>
  );
}
