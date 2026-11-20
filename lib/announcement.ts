import type { announcement } from "@/content/home";

/** The config's shape (content/home.ts), passed in so tests can vary it. */
export type AnnouncementConfig = typeof announcement;

/**
 * The announcement bar's message, resolved on the server (build and every
 * revalidate), so the month is in the HTML and never flips in the browser.
 * Config and placeholders: content/home.ts `announcement`.
 */

/** Dates are Belgrade dates: the studio's own calendar decides the month. */
const TIME_ZONE = "Europe/Belgrade";

export type ResolvedAnnouncement = {
  desktop: string;
  phone: string;
  href: string;
};

function today(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const year = get("year");
  const month = get("month");
  const day = get("day");
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { month, day, iso };
}

/** 1-12 to "November". */
function monthName(month: number) {
  return new Date(Date.UTC(2000, month - 1, 1)).toLocaleString("en-GB", {
    month: "long",
    timeZone: "UTC",
  });
}

const nextOf = (month: number) => (month % 12) + 1;

function fill(template: string, values: Record<string, string>) {
  return (
    template
      .replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match)
      // "1 spots left" reads as a typo.
      .replace(/\b1 spots\b/g, "1 spot")
      // The bar draws its own arrow.
      .replace(/\s*(→|&rarr;)\s*$/, "")
      .trim()
  );
}

export function resolveAnnouncement(
  announcement: AnnouncementConfig,
  now: Date = new Date(),
): ResolvedAnnouncement | null {
  if (!announcement.enabled) return null;
  const { month, day, iso } = today(now);

  // This month before the 15th, next month from the 15th on.
  const booking = day < 15 ? month : nextOf(month);
  const spots = announcement.spotsLeft;
  const values = {
    month: monthName(booking),
    nextMonth: monthName(nextOf(booking)),
    spotsLeft: spots === undefined ? "" : String(spots),
  };

  const scheduled = announcement.scheduled.find((m) => m.start <= iso && iso <= m.end);
  const template = scheduled
    ? { desktop: scheduled.desktop, phone: scheduled.phone ?? scheduled.desktop }
    : spots === undefined
      ? announcement.messages.noCount
      : spots <= 0
        ? announcement.messages.full
        : announcement.messages.spots;

  const desktop = fill(template.desktop, values);
  const phone = fill(template.phone, values);
  return {
    desktop,
    phone,
    href: scheduled?.href ?? announcement.href,
  };
}
