/**
 * Cookie/consent banner copy. Shown once per visitor until they answer.
 *
 * The privacy link is required here, not decorative: consent is only informed
 * if the visitor can read what they're agreeing to before they agree.
 */
export const consentBanner = {
  heading: "Cookies",
  body: "We use analytics cookies to see which pages earn their place. Nothing is shared with advertisers, and declining doesn't change how the site works.",
  accept: "Accept",
  decline: "Decline",
  privacyLabel: "Privacy policy",
  privacyHref: "/privacy" as string | null,
};
