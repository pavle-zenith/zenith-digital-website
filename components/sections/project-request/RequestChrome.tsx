import Link from "next/link";

import { projectRequest as c } from "@/content/project-request";

/**
 * Page chrome for /project-request, in place of the site Nav and Footer
 * (app/project-request/layout.tsx). Modelled on ShowcaseHeader, with two
 * differences: it sits in the page flow rather than over a hero, and the
 * wordmark links home, because the people this page is sent to already know
 * the studio and a way back costs nothing. Not sticky: the form card is the
 * only thing that should hold the screen.
 */
export function RequestHeader() {
  return (
    <header className="tone-light bg-light-bg text-light-text">
      <div className="frame flex h-16 items-center border-b border-light-border">
        <Link
          href="/"
          className="flex h-full items-center font-display text-body-lg font-medium lowercase tracking-tight"
        >
          {c.wordmark}
        </Link>
      </div>
    </header>
  );
}

/** One line under the frame: the studio, the city and the privacy policy. */
export function RequestFooter() {
  return (
    <footer className="tone-light bg-light-bg text-light-text">
      <div className="frame frame-divide flex flex-wrap items-center gap-x-4 gap-y-1 py-8 text-label text-light-muted">
        <p>{c.footer.line}</p>
        <Link
          href="/privacy"
          className="inline-flex min-h-6 items-center underline underline-offset-4 transition hover:text-light-text"
        >
          {c.footer.privacy}
        </Link>
      </div>
    </footer>
  );
}
