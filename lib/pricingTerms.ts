/**
 * A pricing card's terms (owner, 25 Nov 2026: clean up the top of the cards).
 * The payment terms and the delivery time leave the card's header and lead
 * its checklist instead, one tick each: "One-time, 2 instalments",
 * "2-week delivery".
 *
 * A delivery with no duration joins the payment term in one tick ("Monthly,
 * ongoing"). A note that completes the price itself ("per month", "per build", "of
 * project value") isn't a term: on its own in a checklist it would mean
 * nothing, so it stays beside the price, on the same line.
 */
export function pricingTerms(
  priceNote?: string | null,
  timeline?: string | null,
): { unit: string | null; terms: string[] } {
  const note = priceNote?.trim() ?? "";
  const unit = /^(per|of)\b/i.test(note) ? note : null;
  const payment = unit ? "" : note;
  const time = timeline?.trim() ?? "";
  // A delivery with no duration ("Ongoing") says little on a line of its
  // own, so it joins the payment term: "Monthly, ongoing".
  const terms =
    payment && time && !/\d/.test(time)
      ? [`${payment}, ${time.toLowerCase()}`]
      : [payment, time].filter(Boolean);
  return { unit, terms: terms.map((t) => t.charAt(0).toUpperCase() + t.slice(1)) };
}
