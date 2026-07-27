"use client";

import { useEffect, useState } from "react";

/**
 * Live city clock for the footer: city name stacked over the local time
 * ("BELGRADE" / "12:36 AM CEST"). Renders empty on the server and fills in
 * after mount (hydration-safe), then ticks every 30s.
 */
export function FooterClock({ city, tz }: { city: string; tz: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: tz,
        timeZoneName: "short",
      }).format(now)
    : "";

  return (
    <div className="text-left md:text-right">
      <p className="font-display font-medium uppercase tracking-wide text-light-text">{city}</p>
      <p className="mt-1 min-h-[1.5rem] text-body text-light-muted">{time.toUpperCase()}</p>
    </div>
  );
}
