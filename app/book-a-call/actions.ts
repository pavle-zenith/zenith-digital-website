"use server";

import { headers } from "next/headers";

import {
  isEmail,
  isPhone,
  normalizeUrl,
  notify,
  rateLimited,
  storeSubmission,
} from "@/lib/forms";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

/**
 * Contact form on /book-a-call. Two delivery legs, both best-effort: the row
 * lands in Supabase (the durable record) and a notification goes out through
 * Resend. A submission counts as delivered if either leg succeeds, so the form
 * keeps working while one of them is unconfigured or having a bad day, and a
 * lead is only ever lost if both fail.
 */
export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real visitors never fill this hidden field.
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

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  // Optional pair: only rejected when filled in and malformed.
  const phone = String(formData.get("phone") ?? "").trim();
  const rawWebsite = String(formData.get("website") ?? "").trim();
  const website = rawWebsite ? normalizeUrl(rawWebsite) : null;

  if (!name) {
    return { status: "error", message: "Add your name." };
  }
  if (!isEmail(email)) {
    return {
      status: "error",
      message: "That doesn't look like an email address.",
    };
  }
  if (message.length < 10) {
    return {
      status: "error",
      message: "Tell us a little more about what you need.",
    };
  }
  if (phone && !isPhone(phone)) {
    return {
      status: "error",
      message: "That doesn't look like a phone number.",
    };
  }
  if (rawWebsite && !website) {
    return {
      status: "error",
      message: "That doesn't look like a website address.",
    };
  }

  const stored = await storeSubmission({
    source: "book-a-call",
    name,
    email,
    phone: phone || null,
    website,
    message,
  });

  const emailed = await notify({
    subject: `Contact form: ${name}`,
    replyTo: email,
    to: process.env.CONTACT_TO_EMAIL,
    lines: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      website && `Website: ${website}`,
      "",
      message,
    ],
  });

  if (!stored && !emailed) {
    console.error("submitContact: submission not delivered", { name, email });
    return {
      status: "error",
      message: "Something went wrong sending your message.",
    };
  }

  return { status: "success" };
}
