"use client";

import { useEffect } from "react";

import { BEACON_PATH, SELF_PARAM, VIEW_DELAY_MS } from "@/lib/proposalViews";

/**
 * Tells us a proposal was opened (lib/proposalViews.ts). Renders nothing.
 *
 * Counts only time the page is actually visible: a tab opened in the
 * background, or a page prerendered and never shown, never adds up to five
 * seconds. The clock pauses whenever the tab is hidden and resumes when it's
 * back. One request per page load at most.
 *
 * Skipped entirely with `?me=1` (the owner opening their own proposal) and
 * under automation (`navigator.webdriver`, which headless link scanners set).
 *
 * A `keepalive` fetch rather than `navigator.sendBeacon`: it outlives the page
 * the same way, but sendBeacon always sends same-origin cookies, while
 * `credentials: "omit"` guarantees none go. No referrer either: the body
 * already says which proposal it is.
 */
export function ProposalViewBeacon({ slug }: { slug: string }) {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get(SELF_PARAM) === "1") return;
    if (navigator.webdriver) return;

    let remaining = VIEW_DELAY_MS;
    let startedAt = 0;
    let timer: number | undefined;

    const send = () => {
      timer = undefined;
      document.removeEventListener("visibilitychange", onVisibility);
      fetch(BEACON_PATH, {
        method: "POST",
        body: JSON.stringify({ slug, touch: navigator.maxTouchPoints > 1 }),
        headers: { "content-type": "text/plain;charset=UTF-8" },
        keepalive: true,
        credentials: "omit",
        referrerPolicy: "no-referrer",
      }).catch(() => {});
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        if (timer !== undefined) return;
        startedAt = performance.now();
        timer = window.setTimeout(send, remaining);
      } else if (timer !== undefined) {
        window.clearTimeout(timer);
        timer = undefined;
        remaining -= performance.now() - startedAt;
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [slug]);

  return null;
}
