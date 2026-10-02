"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Fragment,
  Suspense,
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import {
  submitProjectRequest,
  type ProjectRequestState,
} from "@/app/project-request/actions";
import {
  projectRequest as c,
  type ChoiceQuestion,
  type TextQuestion,
} from "@/content/project-request";
import { trackLead, trackStep } from "@/lib/analytics";
import {
  STORAGE_KEY,
  TOTAL_STEPS,
  VIA_PATTERN,
  emptyAnswers,
  firstIncompleteStep,
  isExclusive,
  parseAnswers,
  prune,
  toggle,
  validateStep,
  visibility,
  type Answers,
  type Field,
  type MultiField,
  type Step,
} from "@/lib/projectRequestForm";
import { cn } from "@/lib/utils";

type Contact = { email: string; whatsapp: string };
type Errors = Partial<Record<Field, string>>;
/** What a history entry this form pushed carries, beside Next's own keys. */
type StepEntry = { zdStep?: number; zdPrev?: boolean } | null;

const initialState: ProjectRequestState = { status: "idle" };

/**
 * The server action, with a dropped connection turned into the form's own
 * failure message. Without this a network error would throw past the form
 * to the error page; this way the answers stay on screen to send again.
 */
async function send(prev: ProjectRequestState, data: FormData): Promise<ProjectRequestState> {
  try {
    return await submitProjectRequest(prev, data);
  } catch {
    return { status: "error", message: c.errors.failed };
  }
}
const STEPS = [1, 2, 3, 4] as const;

// scroll-mb: a focused field scrolls clear of the actions pinned on phones.
const inputCls =
  "w-full scroll-mb-28 rounded-btn border border-light-border bg-light-bg px-4 py-3 text-body text-light-text outline-none transition placeholder:text-light-muted focus:border-light-muted aria-invalid:border-negative sm:scroll-mb-0";

// Steps reported this page load. Module level, not a ref: the Suspense
// fallback below is a second instance of the form, and each step should be
// counted once however many instances mount.
const tracked = new Set<number>();

/**
 * The /project-request form (Docs/Project_Request_Handoff.md §6 to §8).
 *
 * One <form>, four steps shown one at a time. Every step stays mounted, so
 * its answers submit and validation can reach it; only a conditional
 * question that is off screen unmounts, and its answer is cleared with it
 * (`prune`), so a hidden question never submits a value. The same rules run
 * on the server (lib/projectRequestForm.ts).
 *
 * - Next checks the visible step only and focuses the first problem.
 * - Every step is a history entry (`?step=2`), so a phone's back gesture
 *   goes back a step instead of leaving the form.
 * - Answers and step autosave to sessionStorage, for a backgrounded tab or a
 *   WhatsApp in-app browser that reloads, and are cleared on success.
 * - Enter in a text field moves on a step; it never sends before step 4.
 */
export function ProjectRequestForm({ contact }: { contact: Contact }) {
  // useSearchParams needs a Suspense boundary for prerendering; the fallback
  // is the same form with no `via`, as PartnerForm does it.
  return (
    <Suspense fallback={<RequestForm via="" contact={contact} />}>
      <WithVia contact={contact} />
    </Suspense>
  );
}

function WithVia({ contact }: { contact: Contact }) {
  const raw = useSearchParams().get("via") ?? "";
  return <RequestForm via={VIA_PATTERN.test(raw) ? raw : ""} contact={contact} />;
}

function RequestForm({ via, contact }: { via: string; contact: Contact }) {
  const [answers, setAnswers] = useState<Answers>(() => ({ ...emptyAnswers, via }));
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const [state, dispatch, pending] = useActionState(send, initialState);

  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const doneHeadingRef = useRef<HTMLHeadingElement>(null);
  // Read by the popstate listener, which is registered once.
  const answersRef = useRef(answers);
  const doneRef = useRef(false);
  // Set the moment a send starts, before `pending` can re-render: a double tap
  // fires two submit events in one frame, and both would see pending false.
  const sendingRef = useRef(false);
  /** Where focus goes after the next render: the step heading or a question. */
  const focusNext = useRef<"heading" | Field | null>(null);
  /** Picks cleared by an exclusive option, kept to restore. */
  const stash = useRef<Record<MultiField, string[]>>({ need: [], find: [], does: [] });

  const v = visibility(answers);
  const done = state.status === "success";

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    if (!pending) sendingRef.current = false;
  }, [pending]);

  // Restore a saved draft and the step it was on, once.
  useEffect(() => {
    let restored: Answers = { ...emptyAnswers, via };
    let savedStep = 1;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { step?: unknown; answers?: Record<string, unknown> };
        const o = saved.answers && typeof saved.answers === "object" ? saved.answers : {};
        const str = (k: string) => (typeof o[k] === "string" ? (o[k] as string) : "");
        const list = (k: string) =>
          Array.isArray(o[k]) ? (o[k] as unknown[]).filter((x): x is string => typeof x === "string") : [];
        // The draft is as untrusted as a submission: same cleaning.
        restored = parseAnswers((k) => (k === "via" ? via || str("via") : str(k)), list);
        savedStep = Number(saved.step) || 1;
      }
    } catch {
      // Storage blocked or the draft unreadable: start fresh.
    }

    // A reload keeps `?step=` in the address; a fresh visit uses the draft's
    // step. Either way, never past a step that isn't complete.
    const urlStep = Number(new URLSearchParams(window.location.search).get("step"));
    const wanted = clampStep(urlStep || savedStep);
    const to = clampStep(firstIncompleteStep(restored, wanted));

    setAnswers(restored);
    setStep(to);
    setReady(true);

    const entry = window.history.state as StepEntry;
    const prev = Boolean(entry?.zdPrev) && entry?.zdStep === to;
    window.history.replaceState({ zdStep: to, zdPrev: prev }, "", urlFor(to));
    // Runs once on mount by design; `via` is fixed for the page's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave after every change.
  useEffect(() => {
    if (!ready || done) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
    } catch {
      // Private mode or storage full: the form still works, it just won't survive a reload.
    }
  }, [ready, done, step, answers]);

  useEffect(() => {
    if (!ready || done || tracked.has(step)) return;
    tracked.add(step);
    trackStep(step);
  }, [ready, done, step]);

  // The browser's back and forward gestures move between steps.
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      if (doneRef.current) return;
      const entry = event.state as StepEntry;
      const urlStep = Number(new URLSearchParams(window.location.search).get("step"));
      const target = clampStep(Number(entry?.zdStep) || urlStep || 1);
      // Forward past a step that was emptied since stops at that step.
      const to = clampStep(firstIncompleteStep(answersRef.current, target));
      if (to !== target) window.history.replaceState({ zdStep: to, zdPrev: false }, "", urlFor(to));
      setErrors({});
      focusNext.current = "heading";
      setStep(to);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Move focus after a step change or a failed check.
  useEffect(() => {
    const target = focusNext.current;
    if (!target) return;
    focusNext.current = null;
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    if (target === "heading") {
      cardRef.current?.scrollIntoView({ block: "start", behavior });
      headingRef.current?.focus({ preventScroll: true });
      return;
    }
    const question = formRef.current?.querySelector<HTMLElement>(`[data-field="${target}"]`);
    const control = question?.querySelector<HTMLElement>("input, textarea");
    question?.scrollIntoView({ block: "start", behavior });
    control?.focus({ preventScroll: true });
  }, [step, errors]);

  useEffect(() => {
    if (!done) return;
    doneRef.current = true;
    trackLead("project-request");
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clear.
    }
    window.history.replaceState({ zdStep: null, zdPrev: false }, "", urlFor(1));
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    cardRef.current?.scrollIntoView({ block: "start", behavior });
    doneHeadingRef.current?.focus({ preventScroll: true });
  }, [done]);

  /** Change answers, re-apply the visibility rules, and clear the edited fields' errors. */
  const change = (fields: Field[], next: (prev: Answers) => Partial<Answers>) => {
    setAnswers((prev) => prune({ ...prev, ...next(prev) }));
    setErrors((prev) => {
      if (!fields.some((f) => f in prev)) return prev;
      const rest = { ...prev };
      for (const f of fields) delete rest[f];
      return rest;
    });
  };
  const pick = (field: Field) => (value: string) => change([field], () => ({ [field]: value }));
  // Ticking "Not sure" clears the other picks; unticking it, or picking
  // something else, brings them back, so one tap never loses an answer.
  const flip = (field: MultiField) => (value: string) => {
    const before = answers[field];
    let after = toggle(field, before, value);
    const wasAlone = before.some((v) => isExclusive(field, v));
    const isAlone = after.some((v) => isExclusive(field, v));
    if (!wasAlone && isAlone) stash.current[field] = before;
    if (wasAlone && !isAlone) {
      after = [...new Set([...stash.current[field], ...after])];
      stash.current[field] = [];
    }
    change([field], () => ({ [field]: after }));
  };
  const type = (field: Field) => (value: string) => change([field], () => ({ [field]: value }));

  /**
   * Flag what's missing, but only on questions the person has already
   * scrolled to. On a phone Next is pinned to the screen, so it can be tapped
   * with questions still further down; then it takes them to the next one,
   * with no red on a question they haven't read yet.
   */
  const showProblems = (problems: [Field, string][]) => {
    const form = formRef.current;
    const actions = form?.querySelector<HTMLElement>("[data-actions]")?.getBoundingClientRect();
    const fold = Math.min(window.innerHeight, actions?.top ?? window.innerHeight);
    const reached = problems.filter(([field]) => {
      const top = form?.querySelector(`[data-field="${field}"]`)?.getBoundingClientRect().top;
      return top === undefined || top < fold;
    });
    setErrors(Object.fromEntries(reached));
    focusNext.current = (reached[0] ?? problems[0])[0];
  };

  const goNext = () => {
    const problems = validateStep(step, answers);
    if (problems.length) return showProblems(problems);
    const to = clampStep(step + 1);
    setErrors({});
    window.history.pushState({ zdStep: to, zdPrev: true }, "", urlFor(to));
    focusNext.current = "heading";
    setStep(to);
  };

  const goBack = () => {
    if (step === 1) return;
    setErrors({});
    const entry = window.history.state as StepEntry;
    // The previous step is the previous history entry: let the browser go
    // there, so the back gesture and this button walk the same stack.
    if (entry?.zdPrev && entry.zdStep === step) return window.history.back();
    // Restored mid-form with no entry behind this one: step back in place.
    const to = clampStep(step - 1);
    window.history.replaceState({ zdStep: to, zdPrev: false }, "", urlFor(to));
    focusNext.current = "heading";
    setStep(to);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending || sendingRef.current) return;
    if (step < TOTAL_STEPS) return goNext();
    for (const s of STEPS) {
      const problems = validateStep(s, answers);
      if (!problems.length) continue;
      if (s !== step) {
        window.history.replaceState({ zdStep: s, zdPrev: false }, "", urlFor(s));
        setStep(s);
      }
      return showProblems(problems);
    }
    const data = new FormData(event.currentTarget);
    sendingRef.current = true;
    startTransition(() => dispatch(data));
  };

  // Enter in a one-line field moves on a step, and never sends before step 4.
  const onKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== "Enter" || event.nativeEvent.isComposing || step === TOTAL_STEPS) return;
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    event.preventDefault();
    if (target.type !== "checkbox" && target.type !== "radio") goNext();
  };

  if (done) {
    // "Dr. Ana Petrović" is greeted as Ana, not as "Dr.".
    const names = answers.name.trim().split(/\s+/);
    const firstName = names.find((n) => !n.endsWith(".")) ?? names[0];
    return (
      <div ref={cardRef} role="status" className="mt-10 scroll-mt-6 rounded-card border border-light-border p-6 sm:p-8">
        <h2
          ref={doneHeadingRef}
          tabIndex={-1}
          className="font-display text-h3 font-medium tracking-tight text-balance focus:outline-none"
        >
          {c.success.heading(firstName)}
        </h2>
        <p className="mt-3 text-body-lg text-light-muted">
          {c.success.body(c.success.channel[answers.replyBy] ?? c.success.channel.email)}
        </p>
        <p className="mt-6 border-t border-light-border pt-6 text-body">
          {c.success.more}{" "}
          <a href={contact.email} className={linkCls}>
            {c.success.emailLink}
          </a>
          <span aria-hidden className="text-light-muted">
            {" · "}
          </span>
          <a href={contact.whatsapp} target="_blank" rel="noopener" className={linkCls}>
            {c.success.whatsappLink}
          </a>
        </p>
      </div>
    );
  }

  const current = c.steps[step - 1];

  return (
    <div ref={cardRef} className="mt-10 scroll-mt-6 rounded-card border border-light-border p-6 sm:p-8">
      <div
        role="progressbar"
        aria-label={c.progressLabel}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-valuenow={step}
        aria-valuetext={c.progress(step, TOTAL_STEPS, current.title)}
        className="grid grid-cols-4 gap-1.5"
      >
        {STEPS.map((n) => (
          <span
            key={n}
            className={cn("h-1 rounded-[2px] transition-colors", n <= step ? "bg-light-text" : "bg-light-border")}
          />
        ))}
      </div>
      {/* One line, as the brief writes it: the count annotates, the title is
          quiet, and the first question label is the loudest thing in the card. */}
      <h2
        ref={headingRef}
        tabIndex={-1}
        id="request-step"
        className="mt-4 flex flex-wrap items-baseline gap-x-2 text-body focus:outline-none"
      >
        <span className="font-mono text-label uppercase track-label text-light-muted">
          {c.stepOf(step, TOTAL_STEPS)}
        </span>
        <span aria-hidden className="text-light-muted">
          ·
        </span>
        <span className="sr-only"> · </span>
        <span className="font-medium text-light-text">{current.title}</span>
      </h2>
      {current.intro ? <p className="mt-1 text-body text-light-muted">{current.intro}</p> : null}

      <form
        ref={formRef}
        noValidate
        onSubmit={onSubmit}
        onKeyDown={onKeyDown}
        aria-labelledby="request-step"
        className="mt-8"
      >
        {/* Step 1: What you need */}
        <div hidden={step !== 1} className="space-y-8 sm:space-y-10">
          <Choice
            field="need"
            q={c.need}
            multiple
            value={answers.need}
            onPick={flip("need")}
            error={errors.need}
          />
          <Choice
            field="hasSite"
            q={c.hasSite}
            value={answers.hasSite}
            onPick={pick("hasSite")}
            error={errors.hasSite}
            reveals={{
              yes: v.currentUrl ? (
                <Text
                  field="currentUrl"
                  q={c.currentUrl}
                  size="field"
                  value={answers.currentUrl}
                  onType={type("currentUrl")}
                  error={errors.currentUrl}
                  inputMode="url"
                  autoComplete="url"
                />
              ) : null,
            }}
          />
          <Text
            field="business"
            q={c.business}
            value={answers.business}
            onType={type("business")}
            error={errors.business}
            required
          />
        </div>

        {/* Step 2: Size and features */}
        <div hidden={step !== 2} className="space-y-8 sm:space-y-10">
          {v.find ? (
            <Choice
              field="find"
              q={c.find}
              multiple
              value={answers.find}
              onPick={flip("find")}
              error={errors.find}
              reveals={{
                "services-each": v.serviceCount ? (
                  <Choice
                    field="serviceCount"
                    q={c.serviceCount}
                    size="field"
                    value={answers.serviceCount}
                    onPick={pick("serviceCount")}
                    error={errors.serviceCount}
                  />
                ) : null,
              }}
            />
          ) : null}
          <Choice
            field="does"
            q={c.does}
            multiple
            value={answers.does}
            onPick={flip("does")}
            error={errors.does}
            reveals={{
              languages: v.languages ? (
                <Text field="languages" q={c.languages} size="field" value={answers.languages} onType={type("languages")} />
              ) : null,
              tools: v.tools ? (
                <Text field="tools" q={c.tools} size="field" value={answers.tools} onType={type("tools")} />
              ) : null,
              other: v.doesOther ? (
                <Text field="doesOther" q={c.doesOther} size="field" value={answers.doesOther} onType={type("doesOther")} />
              ) : null,
            }}
          />

          {/* Block A: a store, or payments */}
          {v.blockA ? (
            <>
              <Choice
                field="productCount"
                q={c.productCount}
                value={answers.productCount}
                onPick={pick("productCount")}
                error={errors.productCount}
              />
              <Choice
                field="sellsNow"
                q={c.sellsNow}
                value={answers.sellsNow}
                onPick={pick("sellsNow")}
                error={errors.sellsNow}
                reveals={{
                  yes: v.sellsOn ? (
                    <Text field="sellsOn" q={c.sellsOn} size="field" value={answers.sellsOn} onType={type("sellsOn")} />
                  ) : null,
                }}
              />
            </>
          ) : null}

          {/* Block B: a move, or a redesign */}
          {v.blockB ? (
            <>
              <Choice
                field="platform"
                q={c.platform}
                value={answers.platform}
                onPick={pick("platform")}
                error={errors.platform}
              />
              <Choice
                field="googleTraffic"
                q={c.googleTraffic}
                value={answers.googleTraffic}
                onPick={pick("googleTraffic")}
                error={errors.googleTraffic}
              />
            </>
          ) : null}

          {/* Block C: more visitors from Google */}
          {v.blockC ? (
            <Choice
              field="seoGoal"
              q={c.seoGoal}
              value={answers.seoGoal}
              onPick={pick("seoGoal")}
              error={errors.seoGoal}
            />
          ) : null}
        </div>

        {/* Step 3: What's ready */}
        <div hidden={step !== 3} className="space-y-8 sm:space-y-10">
          <Choice field="text" q={c.text} value={answers.text} onPick={pick("text")} error={errors.text} />
          <Choice field="photos" q={c.photos} value={answers.photos} onPick={pick("photos")} error={errors.photos} />
          <Choice field="brand" q={c.brand} value={answers.brand} onPick={pick("brand")} error={errors.brand} />
          <Text field="likes" q={c.likes} value={answers.likes} onType={type("likes")} rows={2} />
        </div>

        {/* Step 4: Timing and you */}
        <div hidden={step !== 4} className="space-y-8 sm:space-y-10">
          <Choice
            field="deadline"
            q={c.deadline}
            value={answers.deadline}
            onPick={pick("deadline")}
            error={errors.deadline}
            reveals={{
              fixed: v.deadlineFixed ? (
                <div className="grid gap-4">
                  <Text
                    field="deadlineDate"
                    q={c.deadlineDate}
                    size="field"
                    inputType="date"
                    min={todayIso()}
                    value={answers.deadlineDate}
                    onType={type("deadlineDate")}
                  />
                  <Text
                    field="deadlineReason"
                    q={c.deadlineReason}
                    size="field"
                    value={answers.deadlineReason}
                    onType={type("deadlineReason")}
                  />
                </div>
              ) : null,
            }}
          />
          {v.budget ? (
            <Choice field="budget" q={c.budget} value={answers.budget} onPick={pick("budget")} />
          ) : null}
          <Text field="note" q={c.note} value={answers.note} onType={type("note")} rows={3} />

          <div className="grid gap-5 border-t border-light-border pt-8 sm:grid-cols-2 sm:pt-10">
            <Text
              field="name"
              q={c.name}
              size="field"
              value={answers.name}
              onType={type("name")}
              error={errors.name}
              autoComplete="name"
              required
            />
            <Text
              field="company"
              q={c.company}
              size="field"
              value={answers.company}
              onType={type("company")}
              autoComplete="organization"
            />
            <Text
              field="email"
              q={c.email}
              size="field"
              inputType="email"
              inputMode="email"
              autoComplete="email"
              value={answers.email}
              onType={type("email")}
              error={errors.email}
              required
            />
            <Text
              field="phone"
              q={c.phone}
              size="field"
              inputType="tel"
              inputMode="tel"
              autoComplete="tel"
              value={answers.phone}
              onType={type("phone")}
              error={errors.phone}
              required={answers.replyBy === "whatsapp" || answers.replyBy === "phone"}
            />
          </div>
          <Choice
            field="replyBy"
            q={c.replyBy}
            size="field"
            columns={3}
            value={answers.replyBy}
            onPick={pick("replyBy")}
            error={errors.replyBy}
          />
        </div>

        <input type="hidden" name="via" value={answers.via} />
        {/* Honeypot: hidden from people, filled by bots. */}
        <input
          type="text"
          name="fax"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        {step === TOTAL_STEPS ? (
          <p className="mt-10 text-body text-light-muted">
            {c.consent.before}{" "}
            <Link href={c.consent.href} target="_blank" rel="noopener" className={linkCls}>
              {c.consent.link}
            </Link>
            .
          </p>
        ) : null}
        {step === TOTAL_STEPS && state.status === "error" ? (
          <p role="alert" className="mt-5 flex items-start gap-2 text-body text-negative-ink">
            <AlertIcon />
            <span>{state.message}</span>
          </p>
        ) : null}

        {/* The actions. On phones the row is pinned to the bottom of the
            screen while the form is in view, so Next is always one tap away
            however long the step; from sm it sits in the flow. Solid ground
            and a hairline, no blur: it covers flat white, not media. */}
        <div
          data-actions
          className={cn(
            "sticky bottom-0 z-10 -mx-6 flex gap-3 border-t border-light-border bg-light-bg px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
            "sm:static sm:mx-0 sm:px-0 sm:pt-6 sm:pb-0",
            step === TOTAL_STEPS ? "mt-6" : "mt-10",
          )}
        >
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex shrink-0 items-center justify-center rounded-btn border border-light-border px-4 py-3 text-body sm:px-5 font-medium text-light-text transition hover:bg-light-surface active:scale-[.99]"
            >
              {c.buttons.back}
            </button>
          ) : null}
          {/* Distinct keys: Next and Send are different elements, so the
              click that turns step 3 into step 4 can't land on a submit
              button and send the form. */}
          {step < TOTAL_STEPS ? (
            <button key="next" type="button" onClick={goNext} className={primaryCls}>
              {c.buttons.next}
              <Arrow />
            </button>
          ) : (
            <button key="send" type="submit" disabled={pending} className={primaryCls}>
              {pending ? c.buttons.pending : c.buttons.submit}
              <Arrow />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// px-4 on phones: "Send my request" and Back share one row at 360px.
const primaryCls =
  "btn-animated group inline-flex flex-1 items-center justify-center gap-2 rounded-btn px-4 py-3 text-body sm:px-6 font-medium text-accent-ink transition active:scale-[.99] disabled:opacity-60 sm:ml-auto sm:flex-none";

const linkCls = "font-medium text-light-text underline underline-offset-4 transition hover:text-accent";

// A tile is a real radio or checkbox inside its label. Selected reads as
// border, fill and the native mark together, never colour alone; the focus
// ring is drawn on the whole tile rather than on the small box.
const tileCls = cn(
  "flex min-h-12 cursor-pointer items-center gap-3 rounded-btn border border-light-border bg-light-bg px-4 py-3 text-body leading-snug transition-colors",
  // not-has-checked:hover, not an arbitrary :hover: Tailwind's hover variant
  // only applies where the device can hover, so a tapped tile on a phone
  // never keeps a grey fill that reads as half-selected.
  "not-has-checked:hover:bg-light-surface has-checked:border-accent has-checked:bg-accent-subtle",
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--focus-ring)",
);

/**
 * A question answered by tapping: radios, or checkboxes with `multiple`.
 * Anything a tile reveals renders right after that tile, spanning the row, so
 * it is announced next to the answer that opened it, and the screen order
 * stays the DOM order (no dense packing: it moved the next tile up beside the
 * trigger, which made the panel look like it belonged to that tile and sent
 * Tab back up the page).
 */
function Choice({
  field,
  q,
  value,
  onPick,
  error,
  multiple = false,
  size = "question",
  columns = 2,
  reveals,
}: {
  field: Field;
  q: ChoiceQuestion;
  value: string | string[];
  onPick: (value: string) => void;
  error?: string;
  multiple?: boolean;
  size?: "question" | "field";
  columns?: 2 | 3;
  reveals?: Record<string, ReactNode>;
}) {
  const id = useId();
  const hintId = q.hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <fieldset data-field={field} aria-describedby={hintId} className="min-w-0 scroll-mt-6">
      <legend className={labelCls(size)}>{q.label}</legend>
      {q.hint ? (
        <p id={hintId} className="mt-1 text-body text-light-muted">
          {q.hint}
        </p>
      ) : null}
      <div
        className={cn("mt-3 grid gap-2", columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}
      >
        {q.options.map((option, i) => {
          const checked = selected.includes(option.value);
          const revealed = checked ? reveals?.[option.value] : null;
          // An answer that clears the others ("Not sure", "Nothing special")
          // sits below a rule, a full row wide, so the either/or reads before
          // the tap rather than after it.
          const firstAlone = option.exclusive && !q.options[i - 1]?.exclusive;
          return (
            <Fragment key={option.value}>
              {firstAlone ? <div aria-hidden className="col-span-full my-1 border-t border-light-border" /> : null}
              <label className={cn(tileCls, option.exclusive && "col-span-full")}>
                <input
                  type={multiple ? "checkbox" : "radio"}
                  name={field}
                  value={option.value}
                  checked={checked}
                  onChange={() => onPick(option.value)}
                  required={!multiple}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={errorId}
                  className="h-[18px] w-[18px] shrink-0 scroll-mb-28 accent-accent focus-visible:outline-none sm:scroll-mb-0"
                />
                <span>{option.label}</span>
              </label>
              {revealed ? (
                <div className="col-span-full rounded-card bg-light-surface p-4">
                  {revealed}
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </fieldset>
  );
}

/** A typed answer: one line, or a textarea when given `rows`. */
function Text({
  field,
  q,
  value,
  onType,
  error,
  size = "question",
  rows,
  inputType = "text",
  inputMode,
  autoComplete,
  required,
  min,
}: {
  field: Field;
  q: TextQuestion;
  value: string;
  onType: (value: string) => void;
  error?: string;
  size?: "question" | "field";
  rows?: number;
  inputType?: "text" | "email" | "tel" | "date";
  inputMode?: "url" | "email" | "tel";
  autoComplete?: string;
  required?: boolean;
  min?: string;
}) {
  const id = useId();
  const hintId = q.hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const shared = {
    id,
    name: field,
    value,
    required,
    maxLength: q.maxLength,
    placeholder: q.placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };

  return (
    <div data-field={field} className="min-w-0 scroll-mt-6">
      <label htmlFor={id} className={labelCls(size)}>
        {q.label}
      </label>
      {q.hint ? (
        <p id={hintId} className="mt-1 text-body text-light-muted">
          {q.hint}
        </p>
      ) : null}
      {rows ? (
        <textarea
          {...shared}
          rows={rows}
          onChange={(event) => onType(event.target.value)}
          className={cn(inputCls, "resize-y", size === "question" ? "mt-3" : "mt-1.5")}
        />
      ) : (
        <input
          {...shared}
          type={inputType}
          inputMode={inputMode}
          autoComplete={autoComplete}
          min={min}
          // Addresses and emails are typed lower case and unspellchecked.
          autoCapitalize={inputMode === "url" || inputMode === "email" ? "none" : undefined}
          spellCheck={inputMode === "url" || inputMode === "email" ? false : undefined}
          onChange={(event) => onType(event.target.value)}
          className={cn(
            inputCls,
            size === "question" ? "mt-3" : "mt-1.5",
            // iOS draws an empty date field with no height of its own.
            inputType === "date" && "min-h-[50px] appearance-none",
          )}
        />
      )}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

function labelCls(size: "question" | "field") {
  return size === "question"
    ? "block text-body-lg font-medium leading-snug text-light-text"
    : "block text-body font-medium text-light-text";
}

function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-body text-negative-ink">
      <AlertIcon />
      <span>{children}</span>
    </p>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-[3px] h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* lucide:circle-alert */}
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

/** The site's button arrow: the resting glyph slides out as a second slides in. */
function Arrow() {
  return (
    <span className="arrow-glyph relative overflow-hidden" aria-hidden>
      <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[170%]">
        &rarr;
      </span>
      <span className="absolute inset-y-0 left-0 inline-block -translate-x-[170%] transition-transform duration-300 ease-out group-hover:translate-x-0">
        &rarr;
      </span>
    </span>
  );
}

function clampStep(n: number): Step {
  return Math.min(TOTAL_STEPS, Math.max(1, Math.round(n) || 1)) as Step;
}

/** This page's address with `?step=` set (left off for step 1), `via` kept. */
function urlFor(step: number): string {
  const url = new URL(window.location.href);
  if (step === 1) url.searchParams.delete("step");
  else url.searchParams.set("step", String(step));
  return `${url.pathname}${url.search}${url.hash}`;
}

function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
