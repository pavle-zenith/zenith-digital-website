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

/** "2026-08-19" or an ISO datetime to "19 August 2026". No date library. */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  const month = MONTHS[Number(m) - 1];
  return month ? `${Number(d)} ${month} ${y}` : iso;
}

/**
 * True for flat brand marks and credential badges: client logos and the Wix
 * certifications.
 *
 * These skip Vercel's image optimizer (`unoptimized` on the Image). They are
 * small, transparent, fixed-size assets that render between 16px and 32px tall
 * from sources capped at 160px, so a transform costs a quota unit and saves
 * almost nothing, while emitting a srcset that asks for the same wordmark at
 * sixteen widths up to 3840px.
 *
 * DELIBERATELY NOT AVATARS. There are 34 of them, several between 200KB and
 * 700KB, and most render at 44px. Serving those raw would ship megabytes to
 * save quota, which is the wrong trade: there the optimizer is doing real work.
 */
export function isFlatMark(src: unknown): boolean {
  return (
    typeof src === "string" &&
    (src.startsWith("/logos-") || src.startsWith("/certifications/"))
  );
}
