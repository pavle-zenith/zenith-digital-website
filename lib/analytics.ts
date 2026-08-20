/**
 * Client-side event tracking. Safe to call whether or not analytics loaded:
 * every call is a no-op when the tag isn't there, so nothing needs guarding at
 * the call site.
 */

declare global {
  interface Window {
    // gtag is defined by the Consent Mode bootstrap in app/layout.tsx.
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type LeadForm =
  | "contact"
  | "free-website-audit"
  | "partner-application"
  /**
   * A completed Cal.com booking. Deliberately the same `generate_lead` event
   * as the three forms rather than an event of its own: it is the same thing
   * happening (a stranger became a lead), the key event is already marked, and
   * the `Form` custom dimension separates them in reporting. One event, four
   * sources, no extra GA4 configuration.
   */
  | "book-a-call";

/**
 * A form was submitted successfully. `generate_lead` is a GA4 recommended
 * event, so it shows up in reports without custom setup, and can be marked as
 * a key event (conversion) in the GA UI.
 */
export function trackLead(form: LeadForm) {
  window.gtag?.("event", "generate_lead", { form });

  // PostHog is only on the page after consent; import lazily so declining
  // visitors never pull the bundle.
  if (typeof window !== "undefined") {
    void import("posthog-js")
      .then(({ default: posthog }) => {
        if (posthog.__loaded) posthog.capture("lead_submitted", { form });
      })
      .catch(() => {
        // Analytics must never break a form submission.
      });
  }
}
