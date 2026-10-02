/**
 * Pure field checks shared by the server actions (through lib/forms.ts, which
 * re-exports them) and by client forms that validate before sending. Kept out
 * of lib/forms.ts because that module reaches Resend and the service role
 * Supabase client, so a client component must never import it.
 */

/** Normalize a user-typed site into a URL; null if it can't be one. */
export function normalizeUrl(raw: string): string | null {
  let value = raw.trim();
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
  // A space in the domain is never valid. Node's URL parser rejects it, but
  // Chrome's escapes it to %20 and accepts it, so a form validating in the
  // browser would let through an address the server then refuses.
  const host = value.replace(/^https?:\/\//i, "").split(/[/?#]/)[0];
  if (/\s/.test(host)) return null;
  try {
    const url = new URL(value);
    // require a dot so bare words ("test") don't pass
    if (!url.hostname.includes(".")) return null;
    return url.href;
  } catch {
    return null;
  }
}

export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** Permissive: digits, spaces, and the punctuation phone numbers are written with. */
export const isPhone = (value: string) => /^[+()\d][\d\s()+.-]{5,24}$/.test(value);
