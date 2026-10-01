import type { Severity } from "./types";

/**
 * The words every proposal shares: the template's own labels, not any one
 * client's copy (that lives in the per-client file). The jump ids are the
 * section ids the proposal components render, so the two must move together.
 */
export const proposalTemplate = {
  jumpLabel: "Proposal sections",
  jump: [
    { id: "findings", name: "What we found" },
    { id: "plan", name: "The plan" },
    { id: "handover", name: "Handover" },
    { id: "gbp", name: "Google" },
  ],
  /** The far-end target of the jump bar and the phone bottom bar. */
  price: { id: "investment", name: "Investment" },
  mobileBarLabel: "See the price",
  /** Screen readers skip `<s>`, so a struck price is read out as words. */
  priceChange: (was: string, now: string) => `was ${was}, now ${now}`,
  severity: {
    critical: "Critical",
    high: "High",
    medium: "Medium",
  } satisfies Record<Severity, string>,
};
