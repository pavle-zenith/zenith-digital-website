/**
 * Cookie/consent banner copy. Shown once per visitor until they answer.
 *
 * OWNER: `privacyHref` should point at the privacy policy once /privacy
 * exists. While it's null the banner renders without the link rather than
 * sending people to a 404.
 */
export const consentBanner = {
  heading: "Cookies",
  body: "We use analytics cookies to see which pages earn their place. Nothing is shared with advertisers, and declining doesn't change how the site works.",
  accept: "Accept",
  decline: "Decline",
  privacyLabel: "Privacy policy",
  privacyHref: null as string | null,
};
