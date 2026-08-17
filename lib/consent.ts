/**
 * Analytics consent, persisted in localStorage.
 *
 * "unknown" means the visitor hasn't answered yet, which is what puts the
 * banner on screen. Until they answer, Google Consent Mode keeps
 * `analytics_storage` denied (GA still sends cookieless pings) and PostHog
 * never initializes at all.
 */
export type ConsentStatus = "unknown" | "granted" | "denied";

export const CONSENT_KEY = "zd-analytics-consent";

export function readConsent(): ConsentStatus {
  if (typeof window === "undefined") return "unknown";
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "unknown";
  } catch {
    // Private mode / storage disabled: treat as unanswered rather than throw.
    return "unknown";
  }
}

export function writeConsent(status: Exclude<ConsentStatus, "unknown">) {
  try {
    window.localStorage.setItem(CONSENT_KEY, status);
  } catch {
    // Nothing to do: the choice just won't survive the session.
  }
}
