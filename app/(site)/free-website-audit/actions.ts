"use server";

import { headers } from "next/headers";

import {
  isEmail,
  normalizeUrl,
  notify,
  rateLimited,
  storeSubmission,
} from "@/lib/forms";

export type AuditFormState =
  | { status: "idle" }
  | { status: "success"; site: string }
  | { status: "error"; message: string };

/**
 * Audit request form. Stores the row in Supabase and sends the notification;
 * delivered if either leg succeeds. See lib/forms.ts for the shared path.
 */
export async function submitAudit(
  _prev: AuditFormState,
  formData: FormData,
): Promise<AuditFormState> {
  // Honeypot: real visitors never fill this hidden field.
  if (formData.get("company")) {
    return { status: "success", site: "your site" };
  }

  const ip = ((await headers()).get("x-forwarded-for") ?? "local")
    .split(",")[0]
    .trim();
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Too many requests. Try again in a bit.",
    };
  }

  const site = normalizeUrl(String(formData.get("website") ?? ""));
  const email = String(formData.get("email") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  if (!site) {
    return {
      status: "error",
      message: "That doesn't look like a website address.",
    };
  }
  if (!isEmail(email)) {
    return {
      status: "error",
      message: "That doesn't look like an email address.",
    };
  }

  // No name field on this form, so the row carries none.
  const stored = await storeSubmission({
    source: "free-website-audit",
    email,
    website: site,
    message: note || null,
  });

  const emailed = await notify({
    subject: `Audit request: ${site}`,
    replyTo: email,
    to: process.env.AUDIT_TO_EMAIL,
    lines: [`Website: ${site}`, `Email: ${email}`, note && `Note: ${note}`],
  });

  if (!stored && !emailed) {
    console.error("submitAudit: submission not delivered", { site, email });
    return {
      status: "error",
      message: "Something went wrong sending your request.",
    };
  }

  return { status: "success", site: new URL(site).hostname };
}
