/**
 * The Serbian page's labels for the showcase parts that run in the browser
 * (the work reel and the service sliders), kept apart from the page content
 * so a client bundle only carries these few strings. They pair with the
 * English ones in partnerShowcaseUi; the components pick by `lang`.
 */
export const showcaseSrClientLabels = {
  reelLabel: "Snimci ekrana projekata",
  pauseReel: "Pauzirajte snimke projekata",
  playReel: "Pustite snimke projekata",
  examples: (service: string) => `Primeri: ${service}`,
  previous: (service: string) => `Prethodni primer: ${service}`,
  next: (service: string) => `Sledeći primer: ${service}`,
  counter: (n: number, total: number) => `${n} / ${total}`,
  counterSr: (n: number, total: number) => `Primer ${n} od ${total}`,
  /** A project screenshot's alt text. */
  siteAlt: (client: string) => `Sajt: ${client}`,
};

export type ShowcaseLang = "en" | "sr";
