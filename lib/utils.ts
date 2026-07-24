/** Join class names, dropping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** True when an href points inside the site (a path or in-page anchor). */
export function isInternal(href: string | undefined): boolean {
  if (!href) return false;
  if (href.startsWith("#")) return true;
  return href.startsWith("/") && !href.startsWith("//");
}
