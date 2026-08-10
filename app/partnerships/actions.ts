"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { pApply } from "@/content/partnerships";

export type PartnerFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

// Whitelist comes from the same content the form renders its radios from.
const TRACKS: string[] = pApply.fields.track.options;

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

export async function submitPartnerApplication(
  _prev: PartnerFormState,
  formData: FormData,
): Promise<PartnerFormState> {
  // Honeypot: real visitors never fill this hidden field. ("company" is a real
  // field on this form, so the trap uses an unrelated name.)
  if (formData.get("fax")) {
    return { status: "success" };
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

  const agency = String(formData.get("agency") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const website = normalizeUrl(String(formData.get("website") ?? ""));
  const track = String(formData.get("track") ?? "").trim();
  const need = String(formData.get("need") ?? "").trim();

  if (!agency) {
    return { status: "error", message: "Add your agency or company name." };
  }
  if (!name) {
    return { status: "error", message: "Add your name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message: "That doesn't look like an email address.",
    };
  }
  if (!website) {
    return {
      status: "error",
      message: "That doesn't look like a website address.",
    };
  }
  if (!TRACKS.includes(track)) {
    return { status: "error", message: "Pick a partnership track." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "submitPartnerApplication: RESEND_API_KEY is not set; submission not delivered",
      {
        agency,
        email,
      },
    );
    return {
      status: "error",
      message: "Something went wrong sending your application.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from:
        process.env.AUDIT_FROM_EMAIL ??
        "Zenith Digital <onboarding@resend.dev>",
      to:
        process.env.PARTNER_TO_EMAIL ??
        process.env.AUDIT_TO_EMAIL ??
        "hello@thezenithdigital.com",
      replyTo: email,
      subject: `Partner application: ${agency}`,
      text: [
        `Agency: ${agency}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Website: ${website}`,
        `Track: ${track}`,
        need && `What they need: ${need}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("submitPartnerApplication: send failed", err);
    return {
      status: "error",
      message: "Something went wrong sending your application.",
    };
  }

  return { status: "success" };
}
