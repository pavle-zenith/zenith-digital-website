"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

export type AuditFormState =
  | { status: "idle" }
  | { status: "success"; site: string }
  | { status: "error"; message: string };

// Basic in-memory rate limit: max 5 submissions per IP per hour. Resets on
// deploy, which is fine for a spam speed bump (not a security boundary).
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const submissions = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

/** Normalize a user-typed site into a URL; null if it can't be one. */
function normalizeUrl(raw: string): string | null {
  let value = raw.trim();
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
  try {
    const url = new URL(value);
    // require a dot so bare words ("test") don't pass
    if (!url.hostname.includes(".")) return null;
    return url.href;
  } catch {
    return null;
  }
}

export async function submitAudit(
  _prev: AuditFormState,
  formData: FormData,
): Promise<AuditFormState> {
  // Honeypot: real visitors never fill this hidden field.
  if (formData.get("company")) {
    return { status: "success", site: "your site" };
  }

  const ip = ((await headers()).get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (rateLimited(ip)) {
    return { status: "error", message: "Too many requests. Try again in a bit." };
  }

  const site = normalizeUrl(String(formData.get("website") ?? ""));
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  if (!site) {
    return { status: "error", message: "That doesn't look like a website address." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That doesn't look like an email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("submitAudit: RESEND_API_KEY is not set; submission not delivered", {
      site,
      email,
    });
    return { status: "error", message: "Something went wrong sending your request." };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.AUDIT_FROM_EMAIL ?? "Zenith Digital <onboarding@resend.dev>",
      to: process.env.AUDIT_TO_EMAIL ?? "hello@thezenithdigital.com",
      replyTo: email,
      subject: `Audit request: ${site}`,
      text: [`Website: ${site}`, `Email: ${email}`, phone && `Phone: ${phone}`, note && `Note: ${note}`]
        .filter(Boolean)
        .join("\n"),
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("submitAudit: send failed", err);
    return { status: "error", message: "Something went wrong sending your request." };
  }

  return { status: "success", site: new URL(site).hostname };
}
