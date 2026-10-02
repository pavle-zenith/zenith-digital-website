import { Resend } from "resend";

import { getSupabase } from "@/lib/supabase";

/**
 * Shared server-action helpers for the site's forms (contact, audit, partner
 * application, project request). Server-only: never import this from a client
 * component, since it reaches the service role Supabase client.
 */

// Basic in-memory rate limit: max 5 submissions per IP per hour. Resets on
// deploy, which is fine for a spam speed bump (not a security boundary).
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const submissions = new Map<string, number[]>();

export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

// Pure checks live in lib/validators.ts so client forms can use them too.
export { isEmail, isPhone, normalizeUrl } from "@/lib/validators";

/** Which form a row came from. Also the `source` column's value. */
export type SubmissionSource =
  | "book-a-call"
  | "free-website-audit"
  | "partnerships"
  | "project-request";

export type Submission = {
  source: SubmissionSource;
  email: string;
  name?: string | null;
  phone?: string | null;
  website?: string | null;
  message?: string | null;
  /** Form-specific fields with no column of their own (agency, track, ...). */
  payload?: Record<string, string>;
};

/**
 * Write one submission to `public.form_submissions`. Returns false rather than
 * throwing, so a caller can fall back to email-only delivery: every form
 * counts a submission as delivered if either the row or the notification made
 * it, and only reports failure when both legs fail.
 */
export async function storeSubmission(input: Submission): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  const { error } = await supabase.from("form_submissions").insert({
    source: input.source,
    email: input.email,
    name: input.name ?? null,
    phone: input.phone ?? null,
    website: input.website ?? null,
    message: input.message ?? null,
    payload: input.payload ?? {},
  });

  if (error) {
    console.error(`storeSubmission(${input.source}): insert failed`, error);
    return false;
  }
  return true;
}

/**
 * Notification email for a submission. Returns false instead of throwing: the
 * Supabase row is the record of the lead, so a failed send downgrades to a log
 * line rather than an error the visitor sees.
 *
 * `lines` accepts false/null entries so callers can inline optional fields;
 * they're dropped, but empty strings survive as deliberate blank lines.
 */
export async function notify({
  subject,
  replyTo,
  to,
  lines,
}: {
  subject: string;
  replyTo: string;
  to?: string;
  lines: (string | false | null)[];
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from:
        process.env.AUDIT_FROM_EMAIL ??
        "Zenith Digital <onboarding@resend.dev>",
      to: to ?? process.env.AUDIT_TO_EMAIL ?? "hello@thezenithdigital.com",
      replyTo,
      subject,
      text: lines.filter((l) => l !== false && l !== null).join("\n"),
    });
    if (error) throw new Error(error.message);
    return true;
  } catch (err) {
    console.error("notify: send failed", err);
    return false;
  }
}
