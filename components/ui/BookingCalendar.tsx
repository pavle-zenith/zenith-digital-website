"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import { trackLead } from "@/lib/analytics";

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

      // A completed booking is the highest-intent thing that happens on this
      // site and it used to fire nothing at all: the embed runs in an iframe,
      // so no page view, form submit or click on our side ever registers it.
      // Cal.com only reports it through this event.
      //
      // `bookingSuccessfulV2` is the current name. The older
      // `bookingSuccessful` is deprecated, so both are subscribed: the V2 event
      // is what fires today, and the legacy name keeps the tracking alive if
      // the embed version in use still emits the old one. `booked` guards the
      // double count if a version ever emits both.
      let booked = false;
      const onBooked = () => {
        if (booked) return;
        booked = true;
        trackLead("book-a-call");
      };

      cal("on", { action: "bookingSuccessfulV2", callback: onBooked });
      cal("on", { action: "bookingSuccessful", callback: onBooked });
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
