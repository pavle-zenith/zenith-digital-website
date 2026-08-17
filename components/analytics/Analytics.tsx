"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

import { CookieBanner } from "@/components/analytics/CookieBanner";
import { readConsent, writeConsent, type ConsentStatus } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
// Nothing to consent to when neither tool is configured (local dev, previews
// without the vars), so the banner stays off rather than asking about tracking
// that isn't happening.
const ANALYTICS_CONFIGURED = Boolean(GA_ID || POSTHOG_KEY);
// EU cloud by default: the audience is UK/EU, so data stays in-region unless
// the project is explicitly on US cloud.
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

let posthogReady = false;

/** Init PostHog once, and only after consent. Dynamic so it stays out of the
 *  initial bundle for visitors who never accept. */
async function startPostHog() {
  if (posthogReady || !POSTHOG_KEY) return;
  posthogReady = true;
  const posthog = (await import("posthog-js")).default;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // Route changes are tracked below, alongside the GA page_view.
    capture_pageview: false,
    capture_pageleave: true,
  });
}

async function capturePostHogPageview(url: string) {
  if (!posthogReady) return;
  const posthog = (await import("posthog-js")).default;
  posthog.capture("$pageview", { $current_url: url });
}

/**
 * Analytics orchestrator. Renders nothing until the visitor has answered the
 * consent question; the GA tag itself is loaded in the root layout with
 * Consent Mode defaulted to denied, so nothing here gates the script, only
 * what it's allowed to store.
 */
export function Analytics() {
  return (
    // useSearchParams needs a Suspense boundary or it opts the whole tree into
    // client rendering.
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}

function AnalyticsInner() {
  const [consent, setConsent] = useState<ConsentStatus>("unknown");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Restore the stored answer on mount. Runs client-side only, so the server
  // render never differs.
  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    if (stored === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
      void startPostHog();
    }
  }, []);

  // Page views on client-side navigation. The GA tag's own `config` call only
  // fires once on load, so App Router route changes need this.
  useEffect(() => {
    if (consent === "unknown") return;
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window.gtag?.("event", "page_view", { page_path: url });
    void capturePostHogPageview(window.location.origin + url);
  }, [consent, pathname, searchParams]);

  const accept = useCallback(() => {
    writeConsent("granted");
    setConsent("granted");
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    void startPostHog();
  }, []);

  const decline = useCallback(() => {
    writeConsent("denied");
    setConsent("denied");
    // Defaults are already denied; nothing to revoke.
  }, []);

  if (consent !== "unknown" || !ANALYTICS_CONFIGURED) return null;
  return <CookieBanner onAccept={accept} onDecline={decline} />;
}
