"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Phones only: a slim bar pinned to the bottom that jumps to the two options.
 * On desktop the jump bar's "Your options" link already does this job.
 *
 * It goes away once `#options` has come into view and stays away below it, so
 * it never sits over the prices it points at, or over the close and footer.
 * Scrolling back up above the options brings it back. Hidden with `inert`, not
 * `aria-hidden`, so its button also leaves the tab order while it's off screen.
 *
 * Stacks under the cookie banner (z-60) on a first visit: consent is answered
 * first, which is the right order.
 */
export function AuditMobileBar({ label }: { label: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("options");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        // In view, or already scrolled past it (its top is above the viewport).
        setHidden(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={hidden}
      className={cn(
        "tone-light fixed inset-x-0 bottom-0 z-30 border-t border-light-border bg-light-bg px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 motion-reduce:transition-none md:hidden",
        hidden && "translate-y-full",
      )}
    >
      <Button cta={{ label, href: "#options" }} tone="light" className="w-full" />
    </div>
  );
}
