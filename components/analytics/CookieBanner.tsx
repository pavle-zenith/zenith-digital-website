"use client";

import Link from "next/link";

import { consentBanner } from "@/content/consent";

/**
 * Slim consent bar, pinned bottom-left over the page. Solid surface and a
 * hairline per the token system, never a full-screen modal: it should be
 * answerable or ignorable, not a wall.
 */
export function CookieBanner({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label={consentBanner.heading}
      className="tone-light fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-md rounded-card border border-light-border bg-light-bg p-5 text-light-text sm:left-6 sm:right-auto sm:bottom-6"
    >
      <p className="font-display text-body-lg font-medium">
        {consentBanner.heading}
      </p>
      <p className="mt-2 text-body leading-relaxed text-light-muted">
        {consentBanner.body}
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onAccept}
          className="btn-animated group inline-flex w-full items-center justify-center rounded-btn px-5 py-2.5 text-body font-medium text-accent-ink transition sm:w-auto"
        >
          {consentBanner.accept}
        </button>
        <button
          type="button"
          onClick={onDecline}
          className="inline-flex w-full items-center justify-center rounded-btn border border-light-border px-5 py-2.5 text-body font-medium text-light-text transition hover:bg-light-surface sm:w-auto"
        >
          {consentBanner.decline}
        </button>
      </div>

      {consentBanner.privacyHref ? (
        <Link
          href={consentBanner.privacyHref}
          className="mt-3 inline-block text-body text-light-muted underline underline-offset-4 transition hover:text-light-text"
        >
          {consentBanner.privacyLabel}
        </Link>
      ) : null}
    </div>
  );
}
