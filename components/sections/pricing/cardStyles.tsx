/**
 * Pricing cards stand off the page (owner, 20 Nov 2026: "more standalone"):
 * a soft offset shadow, and a faint ink wash fading down from the top edge,
 * the one gradient-like effect the system allows (DESIGN.md).
 */
export const CARD_LIFT =
  "shadow-[0_1px_2px_rgba(10,16,32,0.05),0_22px_48px_-22px_rgba(10,16,32,0.3)]";

export function CardWash() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-accent-subtle via-accent-subtle/40 to-transparent"
    />
  );
}
