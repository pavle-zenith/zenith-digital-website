"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

/**
 * Cal.com inline embed for /book-a-call. The namespace must match between
 * getCalApi and the <Cal> element or the ui config silently applies to the
 * wrong embed. Theme is pinned to light so the calendar reads as a clean white
 * card regardless of the visitor's OS theme; the wrapper card styling
 * (border, radius) lives in the section that renders this.
 */
export function BookingCalendar({ calLink }: { calLink: string }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "discovery-call" });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      namespace="discovery-call"
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
    />
  );
}
