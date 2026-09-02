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
 * True for assets that are already in their final form and should be served
 * straight from the CDN, bypassing Vercel's image optimizer (`unoptimized`).
 *
 * Three groups qualify, for the same reason: the file on disk is already a
 * compressed, correctly sized asset, so a transform costs a quota unit and
 * saves little or nothing, while emitting a srcset that asks for the same
 * picture at up to sixteen widths.
 *
 *  - `/logos-*`      flat brand marks, 16-32px tall from sources capped at 160
 *  - `/certifications` credential badges, 8-16KB for a box never over 80px
 *  - `/case-studies`  project shots, already WebP and capped at 2x their
 *                     largest render width
 *
 * DELIBERATELY NOT AVATARS. There are 34 of them, several between 200KB and
 * 700KB, and most render at 44px. Serving those raw would ship megabytes to
 * save quota, which is the wrong trade: there the optimizer earns its keep.
 */
export function servesRaw(src: unknown): boolean {
  return (
    typeof src === "string" &&
    (src.startsWith("/logos-") ||
      src.startsWith("/certifications/") ||
      src.startsWith("/case-studies/"))
  );
}
