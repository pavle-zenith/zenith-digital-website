"use server";

import { headers } from "next/headers";

import { projectRequest as c } from "@/content/project-request";
import { normalizeUrl, notify, rateLimited, storeSubmission } from "@/lib/forms";
import {
  buildPayload,
  buildQuote,
  emailLines,
  emailSubject,
} from "@/lib/projectRequest";
import { parseAnswers, validateStep, type Step } from "@/lib/projectRequestForm";

export type ProjectRequestState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

/**
 * /project-request (Docs/Project_Request_Handoff.md §9). Same shape as
 * submitPartnerApplication: store the row, send the founder email, and count
 * the request as delivered if either leg succeeds.
 *
 * Every choice is whitelisted against content/project-request.ts and every
 * answer to a question the visitor could not see is dropped, by the same
 * rules the form uses (lib/projectRequestForm.ts). The quote lines (scope,
 * page range, flags, assumptions) come from lib/projectRequest.ts.
 */
export async function submitProjectRequest(
  _prev: ProjectRequestState,
  formData: FormData,
): Promise<ProjectRequestState> {
  // Honeypot: real visitors never fill this hidden field.
  if (formData.get("fax")) {
    return { status: "success" };
  }

  const ip = ((await headers()).get("x-forwarded-for") ?? "local")
    .split(",")[0]
    .trim();
  if (rateLimited(ip)) {
    return { status: "error", message: c.errors.rateLimited };
  }

  const answers = parseAnswers(
    (key) => String(formData.get(key) ?? ""),
    (key) => formData.getAll(key).map(String),
  );

  // The form checks each step before moving on; this is the same check, for
  // anything that reaches the action without it.
  for (const step of [1, 2, 3, 4] as Step[]) {
    const problem = validateStep(step, answers)[0];
    if (problem) return { status: "error", message: problem[1] };
  }

  // Validation has passed, so a typed address is one: store it clickable.
  answers.currentUrl = normalizeUrl(answers.currentUrl) ?? "";

  const quote = buildQuote(answers);

  const stored = await storeSubmission({
    source: "project-request",
    name: answers.name,
    email: answers.email,
    phone: answers.phone || null,
    website: answers.currentUrl || null,
    message: answers.note || null,
    payload: buildPayload(answers, quote),
  });

  const emailed = await notify({
    subject: emailSubject(answers, quote),
    replyTo: answers.email,
    to: process.env.PROJECT_REQUEST_TO_EMAIL || undefined,
    lines: emailLines(answers, quote),
  });

  if (!stored && !emailed) {
    console.error("submitProjectRequest: request not delivered", {
      email: answers.email,
    });
    return { status: "error", message: c.errors.failed };
  }

  return { status: "success" };
}
