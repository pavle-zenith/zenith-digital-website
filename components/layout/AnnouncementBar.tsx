import Link from "next/link";

import { announcement } from "@/content/home";
import { resolveAnnouncement } from "@/lib/announcement";

/**
 * The thin ink bar above the nav (owner, 20 Nov 2026): 36px, one line, white
 * on the near-black ink, sticky with the nav and not dismissible. The message
 * is resolved here, on the server, so the month and the count are in the
 * HTML; phone and desktop copy swap by CSS. No client JavaScript at all, so
 * nothing can shift or flicker on load.
 *
 * It pins at the top and the nav pins right under it through --announce-h
 * (globals.css), which every sticky offset and anchor margin on the site
 * adds, so nothing lands underneath the pair.
 *
 * The ticker: a white dot with a slow ping, the one bit of motion that says
 * "this is live". Still for prefers-reduced-motion.
 */
export function AnnouncementBar() {
  const message = resolveAnnouncement(announcement);
  if (!message) return null;

  return (
    <section
      id="announcement"
      aria-label={announcement.regionLabel}
      className="tone-dark sticky top-0 z-50 bg-accent text-accent-ink"
    >
      <div className="flex h-9 items-center justify-center px-4">
        <Link
          href={message.href}
          className="group inline-flex min-w-0 items-center gap-2.5 text-[0.8125rem] font-medium"
        >
          <span aria-hidden className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inset-0 rounded-full bg-white opacity-70 motion-safe:animate-ping motion-safe:[animation-duration:1.8s]" />
            <span className="relative h-2 w-2 rounded-full bg-white shadow-[0_0_6px_1px_rgba(255,255,255,0.65)]" />
          </span>
          {/* leading-5, not leading-none: `truncate` clips to the line box,
              and a 1.0 line box cut off the descenders. */}
          <span className="truncate leading-5 sm:hidden">{message.phone}</span>
          <span className="hidden truncate leading-5 sm:inline">{message.desktop}</span>
          <span aria-hidden className="btn-arrow -ml-1 shrink-0 leading-5">
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
