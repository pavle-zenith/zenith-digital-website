"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics: page views, paths and referrers for the agency's own
 * site. Not a Search Console substitute (no queries, impressions or
 * positions), but first-party traffic data that doesn't depend on the banner.
 *
 * Loaded for every visitor, outside the consent gate in ./Analytics, because
 * it is cookieless: nothing is stored in the browser, no IP address is kept,
 * and Vercel identifies a visit by a hash of the request that it discards
 * after 24 hours. The privacy policy says so (content/legal.ts, "Cookies and
 * analytics"), and the banner's "analytics cookies" wording stays true.
 *
 * Two routes are left out:
 *   /studio     the Sanity admin, which is the owner's own traffic.
 *   /proposal/  private documents. The privacy policy promises the proposal
 *               view beacon is the only request those pages send about a
 *               visit, and a client's name in the slug shouldn't sit in a
 *               third-party dashboard either.
 *
 * This is a client component only so it can hold `beforeSend`: a function
 * can't cross from the server layout into a client component as a prop.
 *
 * Collection also needs Web Analytics switched on for the project in the
 * Vercel dashboard. Until it is, the script loads and its requests 404.
 */
function isExcludedPath(path: string): boolean {
  return (
    path === "/studio" ||
    path.startsWith("/studio/") ||
    path.startsWith("/proposal/")
  );
}

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  return isExcludedPath(new URL(event.url).pathname) ? null : event;
}

export function VercelAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
