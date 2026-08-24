"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useActionState, useEffect } from "react";

import {
  submitPartnerApplication,
  type PartnerFormState,
} from "@/app/partnerships/actions";
import { pApply } from "@/content/partnerships";
import { trackLead } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const initialState: PartnerFormState = { status: "idle" };

const inputCls =
  "w-full rounded-btn border border-light-border bg-light-bg px-4 py-3 text-body text-light-text outline-none transition placeholder:text-light-muted focus:border-light-muted";

/**
 * Partner application form (light card). Four required fields, the track
 * radio (pre-selected via ?track= from the track cards), an optional textarea,
 * honeypot, and inline success/error states. Submits through the
 * submitPartnerApplication server action; no redirect.
 */
export function PartnerForm() {
  // useSearchParams needs a Suspense boundary for prerendering; the fallback
  // renders the same form without a pre-selected track.
  return (
    <Suspense fallback={<FormInner preselect={null} />}>
      <ParamForm />
    </Suspense>
  );
}

function ParamForm() {
  const raw = useSearchParams().get("track");
  const preselect =
    raw === "retainer"
      ? "Retainer"
      : raw === "production"
        ? "White-label production"
        : raw === "referral"
          ? "Referral"
          : null;
  return <FormInner preselect={preselect} />;
}

function FormInner({ preselect }: { preselect: string | null }) {
  const [state, formAction, pending] = useActionState(
    submitPartnerApplication,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") trackLead("partner-application");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        className="rounded-card border border-light-border bg-light-surface p-8"
        role="status"
      >
        <p className="font-display text-body-lg font-medium">
          {pApply.success}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-card border border-light-border p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="agency" type="text" {...pApply.fields.agency} />
        <Field name="name" type="text" {...pApply.fields.name} />
        <Field name="email" type="email" {...pApply.fields.email} />
        <Field
          name="website"
          type="text"
          inputMode="url"
          {...pApply.fields.website}
        />
      </div>

      {/* Track radio — pre-selected from the track-card links */}
      <fieldset className="mt-6">
        <legend className="mb-2 block text-body font-medium">
          {pApply.fields.track.label}
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {pApply.fields.track.options.map((option) => (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-btn border border-light-border px-4 py-3 text-body transition",
                "hover:bg-light-surface has-[:checked]:border-accent has-[:checked]:bg-accent-subtle",
              )}
            >
              <input
                type="radio"
                name="track"
                value={option}
                required
                defaultChecked={preselect === option}
                className="accent-accent"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="mb-1.5 block text-body font-medium">
          {pApply.fields.need.label}
        </span>
        <textarea
          name="need"
          rows={4}
          placeholder={pApply.fields.need.placeholder}
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
        {pending ? "Sending..." : pApply.submit}{" "}
        <span aria-hidden className="btn-arrow">
          &rarr;
        </span>
      </button>

      {state.status === "error" ? (
        <p className="mt-4 text-body text-negative-ink" role="alert">
          {state.message} {pApply.errorFallback}
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
}: {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  inputMode?: "url";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-body font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required
        inputMode={inputMode}
        placeholder={placeholder}
        className={inputCls}
      />
    </label>
  );
}
