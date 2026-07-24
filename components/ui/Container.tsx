import { cn } from "@/lib/utils";

/** Centered 1280px content column with a 24px gutter. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container-site", className)}>{children}</div>;
}
