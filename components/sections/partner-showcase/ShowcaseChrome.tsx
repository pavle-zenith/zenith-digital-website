import { partnerShowcaseUi } from "@/content/partner-showcase";

/**
 * Page chrome for /partner-showcase, in place of the site Nav and Footer
 * (app/partner-showcase/layout.tsx).
 *
 * The header is the wordmark alone, unlinked, laid over the top of the light
 * hero so it sits on the hero's own textured ground. It is in the page flow,
 * not sticky: the jump bar takes the top of the screen once the hero is gone,
 * and it only counts a header that stays pinned.
 */
export function ShowcaseHeader() {
  return (
    <header className="tone-light absolute inset-x-0 top-0 z-10 text-light-text">
      <div className="mx-auto flex h-16 max-w-(--container-site) items-center border-b border-light-border px-[clamp(20px,4vw,64px)]">
        <span className="font-display text-body-lg font-medium lowercase tracking-tight">
          {partnerShowcaseUi.wordmark}
        </span>
      </div>
    </header>
  );
}

/** One line under the frame: no link columns, no contact details. */
export function ShowcaseFooter() {
  return (
    <footer className="tone-light bg-light-bg text-light-text">
      <div className="frame frame-divide py-8">
        <p className="text-label text-light-muted">{partnerShowcaseUi.footer}</p>
      </div>
    </footer>
  );
}
