/**
 * Proposal-view notifications: the pure parts, shared by the beacon
 * (components/sections/private-doc/ProposalViewBeacon.tsx) and the route that
 * receives it (app/api/proposal-view/route.ts). No server imports here, so the
 * client can read the constants without pulling Resend into the bundle.
 *
 * WHAT IT IS. When a /proposal/[slug] page has been visible for five seconds,
 * the browser posts the slug once. The route emails us the proposal, the time,
 * the country (from the host's request header) and the device type. Nothing
 * is stored on our side and no IP address is read: the email is the record.
 * Documented in the privacy policy (content/legal.ts) as anonymous view
 * counting; keep the two in step.
 */

/** How long the page must be visible, in total, before it counts as a view. */
export const VIEW_DELAY_MS = 5000;

/** `?me=1` on a proposal URL: the owner opening it, so nothing is sent. */
export const SELF_PARAM = "me";

export const BEACON_PATH = "/api/proposal-view";

const HOUR_MS = 60 * 60 * 1000;

/**
 * Crawlers, link-preview fetchers, mail-security scanners and automation.
 * Most of them never run JavaScript or never keep a page visible for five
 * seconds, so the beacon itself is the first filter; this is the second.
 *
 * Deliberately specific where a broad word would catch real people: in-app
 * browsers say "LinkedInApp" or "FBAV", not "LinkedInBot" or
 * "facebookexternalhit", and "(?<!cu)bot" spares CUBOT phones.
 */
const BOT_UA = new RegExp(
  [
    "(?<!cu)bot",
    "crawl",
    "spider",
    "slurp",
    "preview",
    "scanner",
    "facebookexternalhit",
    "whatsapp/",
    "embedly",
    "google-inspectiontool",
    "googleother",
    "apis-google",
    "mediapartners",
    "feedfetcher",
    "lighthouse",
    "pagespeed",
    "gtmetrix",
    "headless",
    "phantomjs",
    "puppeteer",
    "playwright",
    "selenium",
    "python",
    "curl/",
    "wget",
    "httpclient",
    "okhttp",
    "axios",
    "node-fetch",
    "undici",
    "go-http-client",
    "java/",
    "libwww",
    "scrapy",
    "mimecast",
    "proofpoint",
    "barracuda",
    "safelinks",
    "microsoft office",
    "ms-office",
  ].join("|"),
  "i",
);

/** True for anything that isn't a person in a browser, including no UA at all. */
export function isBot(userAgent: string | null | undefined): boolean {
  if (!userAgent || userAgent.trim().length < 10) return true;
  return BOT_UA.test(userAgent);
}

export type Device = "Phone" | "Tablet" | "Desktop";

/**
 * Coarse device type from the user agent. iPadOS Safari reports itself as a
 * Mac, so the beacon also says whether the screen is a touch screen, which is
 * the only way to tell an iPad from a laptop.
 */
export function deviceType(userAgent: string, touch = false): Device {
  if (/ipad|tablet|kindle|silk|playbook/i.test(userAgent)) return "Tablet";
  if (/android/i.test(userAgent) && !/mobile/i.test(userAgent)) return "Tablet";
  if (/mobi|iphone|ipod|android|windows phone/i.test(userAgent)) return "Phone";
  if (touch && /macintosh/i.test(userAgent)) return "Tablet";
  return "Desktop";
}

/**
 * The throttle key: one per slug per clock hour. Resend keeps idempotency keys
 * for 24 hours and refuses a second send under the same key, so this holds
 * across every server instance, not just the one that sent first.
 */
export function throttleKey(slug: string, now: number): string {
  return `proposal-view/${slug}/${Math.floor(now / HOUR_MS)}`;
}

/** "DE" to "Germany". Unknown, Tor ("T1") and missing codes give null. */
export function countryName(code: string | null | undefined): string | null {
  if (!code || !/^[A-Z]{2}$/.test(code) || code === "XX" || code === "T1") return null;
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? null;
  } catch {
    return null;
  }
}

/** "Mon, 9 November 2026 at 16:42", in Belgrade time, where the inbox is. */
export function formatTime(now: number): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Belgrade",
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
}

export function viewEmail({
  client,
  slug,
  url,
  now,
  country,
  device,
}: {
  client: string;
  slug: string;
  url: string;
  now: number;
  country: string | null;
  device: Device;
}): { subject: string; text: string } {
  return {
    subject: `Proposal opened: ${client} – ${slug}`,
    text: [
      `${client} opened their proposal.`,
      url,
      "",
      `Time: ${formatTime(now)} (Belgrade time)`,
      `Country: ${country ?? "Unknown"}`,
      `Device: ${device}`,
      "",
      "Anonymous view count: no cookies, no IP address. At most one email per proposal per hour. Open your own proposals with ?me=1 to skip this.",
    ].join("\n"),
  };
}
