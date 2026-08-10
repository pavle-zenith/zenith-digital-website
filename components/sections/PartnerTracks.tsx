import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { pTracks } from "@/content/partnerships";

/**
 * The two partnership tracks side by side — the page's core decision, so both
 * cards carry full weight (no tabs, no toggle). Each card: mono track label,
 * for-who lead, description, hairline-separated bullet list, CTA pinned bottom
 * (links to #apply with ?track= so the form pre-selects the radio).
 */
export function PartnerTracks() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <h2 className="mb-8 font-display text-h2 md:mb-12 font-medium leading-tight tracking-tight text-balance">
        {pTracks.heading}
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {pTracks.tracks.map((track) => (
          <article
            key={track.name}
            className="flex flex-col rounded-card border border-light-border p-8 sm:p-10"
          >
            <span className="font-mono text-label uppercase track-label text-light-muted">
              {track.name}
            </span>
            <h3 className="mt-4 font-display text-h3 font-medium leading-snug text-balance">
              {track.forWho}
            </h3>
            <p className="mt-4 text-body leading-relaxed text-light-muted">
              {track.description}
            </p>

            <ul className="mt-8 flex flex-col gap-3 border-t border-light-border pt-8">
              {track.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-body">
                  <Check />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <Button cta={track.cta} tone="light" />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent">
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 13l4 4 10-10" />
      </svg>
    </span>
  );
}
