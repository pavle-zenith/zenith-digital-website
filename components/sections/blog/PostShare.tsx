"use client";

import { useEffect, useState } from "react";

import { post as furniture } from "@/content/blog";
import { cn } from "@/lib/utils";

/**
 * Share this article.
 *
 * It lives in the facts strip under the hero, at the right-hand end, so it is
 * available before the read rather than only after it. No visible title: four
 * recognisable marks in a byline row do not need a label telling you they are
 * share buttons, and the group carries an accessible name for anyone who
 * cannot see them.
 *
 * Icon chips in the same register as the founder section's profile links:
 * inline SVG paths in a local map, no icon package, accessible name carried by
 * `aria-label` so a screen reader hears "Share on LinkedIn" rather than
 * "link". Rounded squares at the sitewide 6px, not circles: every other icon
 * chip here is a square, and these sit in a strip beside one.
 *
 * COPY LINK IS FIRST because it is the one people actually use. It reads the
 * live URL from the browser rather than taking a prop, so a preview deploy
 * copies its own address instead of the production one, and it falls back to
 * a hidden input + execCommand where the clipboard API is unavailable (Safari
 * without HTTPS, older browsers).
 *
 * No share counts, no third-party SDKs. Every button is a plain link to the
 * platform's own share URL, so nothing here loads a tracker.
 */

const ICONS: Record<string, React.ReactNode> = {
  // lucide:link-2
  link: (
    <path
      d="M9 17H7A5 5 0 0 1 7 7h2m6 0h2a5 5 0 0 1 0 10h-2M8 12h8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  // lucide:check
  check: (
    <path
      d="m20 6-11 11-5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  // simple-icons:facebook
  facebook: (
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.7 8.7 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036 27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647" />
  ),
  // simple-icons:x
  x: (
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  ),
  // simple-icons:linkedin
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
  ),
};

const CHIP =
  "flex h-10 w-10 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition hover:border-accent hover:text-accent";

function Glyph({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="currentColor"
      aria-hidden
    >
      {ICONS[name]}
    </svg>
  );
}

export function PostShare({ title }: { title: string }) {
  const { share } = furniture;
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Read on the client so the copied link is whatever host the reader is
  // actually on, and so the buttons are inert until there is a URL to share.
  useEffect(() => setUrl(window.location.href), []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard API needs a secure context. Fall back to a throwaway input.
      const input = document.createElement("input");
      input.value = url;
      document.body.append(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      setCopied(true);
    }
  }

  const e = encodeURIComponent;
  const targets = [
    {
      key: "facebook",
      label: share.facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`,
    },
    {
      key: "x",
      label: share.x,
      href: `https://twitter.com/intent/tweet?url=${e(url)}&text=${e(title)}`,
    },
    {
      key: "linkedin",
      label: share.linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`,
    },
  ];

  return (
    <div
      role="group"
      aria-label={share.label}
      className="flex shrink-0 flex-wrap items-center gap-2"
    >
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? share.copied : share.copy}
        className={cn(CHIP, copied && "border-accent text-accent")}
      >
        <Glyph name={copied ? "check" : "link"} />
      </button>

      {targets.map((t) => (
        <a
          key={t.key}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.label}
          className={CHIP}
        >
          <Glyph name={t.key} />
        </a>
      ))}
      {/* The confirmation is announced rather than drawn: the chip already
          swaps to a tick, and a visible toast beside four small buttons is
          more furniture than the interaction deserves. */}
      <span aria-live="polite" className="sr-only">
        {copied ? share.copied : ""}
      </span>
    </div>
  );
}
