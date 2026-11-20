/**
 * Exchange rates for the website cost calculator, the one place on the site
 * that converts a price (owner, 20 Nov 2026: clients are invoiced in their
 * own currency, EUR, GBP or USD).
 *
 * ECB euro foreign exchange reference rates for 19 November 2026, read from
 * the ECB's own page. Every amount elsewhere stays in its own currency (our
 * prices EUR, vendor plans USD, UK market ranges GBP) and is converted only
 * at render, marked "≈" and rounded to the nearest 10. To update: take the
 * day's rates from the ECB page, change `date`, and nothing else moves.
 */

export type Currency = "EUR" | "GBP" | "USD";

export const CURRENCIES: Currency[] = ["EUR", "GBP", "USD"];

export const fx = {
  source: {
    name: "European Central Bank, euro foreign exchange reference rates",
    href: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
  },
  /** ISO date of the reference rates. */
  date: "2026-11-19",
  /** Units of each currency for 1 EUR. */
  perEuro: { EUR: 1, USD: 1.0992, GBP: 0.83581 } satisfies Record<Currency, number>,
};
