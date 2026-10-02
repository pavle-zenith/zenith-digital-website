"use server";

import { headers } from "next/headers";

import { pApply } from "@/content/partnerships";
import {
  isEmail,
  normalizeUrl,
  notify,
  rateLimited,
  storeSubmission,
} from "@/lib/forms";

export type PartnerFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

// Whitelist comes from the same content the form renders its radios from.
const TRACKS: string[] = pApply.fields.track.options;

/**
 * Partner application form. Stores the row in Supabase and sends the
 * notification; delivered if either leg succeeds. `agency` and `track` have no
 * column of their own, so they ride along in the row's `payload`.
 */
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
  if (!isEmail(email)) {
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

  const stored = await storeSubmission({
    source: "partnerships",
    name,
    email,
    website,
    message: need || null,
    payload: { agency, track },
  });

  const emailed = await notify({
    subject: `Partner application: ${agency}`,
    replyTo: email,
    to: process.env.PARTNER_TO_EMAIL,
    lines: [
      `Agency: ${agency}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Website: ${website}`,
      `Track: ${track}`,
      need && `What they need: ${need}`,
    ],
  });

  if (!stored && !emailed) {
    console.error("submitPartnerApplication: submission not delivered", {
      agency,
      email,
    });
    return {
      status: "error",
      message: "Something went wrong sending your application.",
    };
  }

  return { status: "success" };
}
