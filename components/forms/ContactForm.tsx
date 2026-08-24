"use client";

import { useActionState, useEffect } from "react";

import {
  submitContact,
  type ContactFormState,
} from "@/app/book-a-call/actions";
import { bookContact } from "@/content/book-a-call";
import { trackLead } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

const inputCls =
  "w-full rounded-btn border border-light-border bg-light-bg px-4 py-3 text-body text-light-text outline-none transition placeholder:text-light-muted focus:border-light-muted";

/**
 * Contact form on /book-a-call, for anyone who won't book a slot. Name, email,
 * optional website, message, honeypot, inline success/error. Submits through
 * the submitContact server action; no redirect.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") trackLead("contact");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        className="rounded-card border border-light-border bg-light-bg p-8"
        role="status"
      >
        <p className="font-display text-body-lg font-medium">
          {bookContact.success}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-card border border-light-border bg-light-bg p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" type="text" required {...bookContact.fields.name} />
        <Field
          name="email"
          type="email"
          required
          {...bookContact.fields.email}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field
          name="phone"
          type="tel"
          inputMode="tel"
          {...bookContact.fields.phone}
        />
        <Field
          name="website"
          type="text"
          inputMode="url"
          {...bookContact.fields.website}
        />
      </div>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-body font-medium">
          {bookContact.fields.message.label}
        </span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder={bookContact.fields.message.placeholder}
          className={cn(inputCls, "resize-y")}
        />
      </label>

      {/* Honeypot — hidden from people, filled by bots */}
      <input
        type="text"
        name="fax"
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
        {pending ? "Sending..." : bookContact.submit}{" "}
        <span aria-hidden className="btn-arrow">
          &rarr;
        </span>
      </button>

      {state.status === "error" ? (
        <p className="mt-4 text-body text-negative-ink" role="alert">
          {state.message} {bookContact.errorFallback}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  name,
  type,
  label,
  placeholder,
  inputMode,
  required = false,
}: {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  inputMode?: "url" | "tel";
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-body font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        inputMode={inputMode}
        placeholder={placeholder}
        className={inputCls}
      />
    </label>
  );
}
