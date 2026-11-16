"use client";

import { useEffect, useRef } from "react";

/**
 * Hidden `ts` field: when this form appeared, for the spam check's minimum
 * fill time (lib/spam.ts). Written after hydration, so anything posting the
 * server-rendered HTML sends it empty.
 *
 * Set as the input's default (for a hidden input, `value` is the attribute),
 * with no React `value` prop: React 19 resets a form after its action runs,
 * and a reset restores the default, so the timestamp survives a resubmit
 * after a validation error instead of coming back empty.
 */
export function OpenedAt() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.defaultValue = String(Date.now());
  }, []);
  return <input ref={ref} type="hidden" name="ts" />;
}
