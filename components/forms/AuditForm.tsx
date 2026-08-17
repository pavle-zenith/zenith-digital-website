"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";

import {
  submitAudit,
  type AuditFormState,
} from "@/app/free-website-audit/actions";
import { auditForm } from "@/content/free-website-audit";
import { trackLead } from "@/lib/analytics";

const initialState: AuditFormState = { status: "idle" };

const inputCls =
  "w-full rounded-btn border border-light-border bg-light-bg px-4 py-3 text-body text-light-text outline-none transition placeholder:text-light-muted focus:border-light-muted";

/**
 * The audit request form — a white card that sits on the dark hero. Two
 * required fields + one optional, honeypot, inline success and error states
 * (no redirect). Submission goes through the submitAudit server action; the
 * closing banner anchors back to #audit-form.
 */
export function AuditForm({ id }: { id?: string }) {
  const [state, formAction, pending] = useActionState(
    submitAudit,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") trackLead("free-website-audit");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        id={id}
        className="rounded-card bg-light-bg p-8 text-left text-light-text"
        role="status"
      >
        <p className="font-display text-body-lg font-medium">
          {auditForm.success(state.site)}
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      action={formAction}
      className="scroll-mt-24 rounded-card bg-light-bg p-6 text-left text-light-text sm:p-10"
    >
      <h2 className="mb-8 text-center font-display text-h3 font-medium">
        {auditForm.cardTitle}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-body font-medium">
            {auditForm.fields.website.label}
          </span>
          <input
            type="text"
            name="website"
            required
            inputMode="url"
            placeholder={auditForm.fields.website.placeholder}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-body font-medium">
            {auditForm.fields.email.label}
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder={auditForm.fields.email.placeholder}
            className={inputCls}
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-body font-medium">
          {auditForm.fields.note.label}
        </span>
        <input
          type="text"
          name="note"
          placeholder={auditForm.fields.note.placeholder}
          className={inputCls}
        />
      </label>

      {/* Honeypot — hidden from people, filled by bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={pending}
        className="btn-animated group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-btn px-6 py-4 text-body font-medium text-accent-ink transition disabled:opacity-60"
      >
        {pending ? "Sending..." : auditForm.submit}{" "}
        <span aria-hidden className="btn-arrow">
          &rarr;
        </span>
      </button>

      {state.status === "error" ? (
        <p className="mt-4 text-body text-[#E5484D]" role="alert">
          {state.message} {auditForm.errorFallback}
        </p>
      ) : null}

      <p className="mt-8 border-t border-light-border pt-6 text-center text-body text-light-muted">
        {auditForm.altText}{" "}
        <Link
          href={auditForm.altCta.href}
          className="font-medium text-light-text underline underline-offset-4 transition hover:text-accent"
        >
          {auditForm.altCta.label}
        </Link>
      </p>
    </form>
  );
}
