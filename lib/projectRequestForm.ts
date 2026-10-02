import { projectRequest as c, type ChoiceQuestion } from "@/content/project-request";
import { isEmail, isPhone, normalizeUrl } from "@/lib/validators";

/**
 * The form rules behind /project-request (Docs/Project_Request_Handoff.md §6,
 * §7): what is on screen, what is valid, and how a submission is cleaned.
 * Pure, and safe for the client bundle, which is why it is separate from
 * lib/projectRequest.ts: that module reads the homepage pricing content, and
 * content/home.ts re-exports every case study.
 */

export type Answers = {
  need: string[];
  hasSite: string;
  currentUrl: string;
  business: string;
  find: string[];
  serviceCount: string;
  does: string[];
  languages: string;
  tools: string;
  doesOther: string;
  productCount: string;
  sellsNow: string;
  sellsOn: string;
  platform: string;
  googleTraffic: string;
  seoGoal: string;
  text: string;
  photos: string;
  brand: string;
  likes: string;
  deadline: string;
  deadlineDate: string;
  deadlineReason: string;
  budget: string;
  note: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  replyBy: string;
  /** Lead source tag from `?via=`. Never personal data (§8). */
  via: string;
};

export type Field = keyof Answers;
export type Step = 1 | 2 | 3 | 4;

export const TOTAL_STEPS = 4;
export const STORAGE_KEY = "zd-project-request-v1";
export const VIA_PATTERN = /^[a-z0-9-]{1,24}$/;

export const emptyAnswers: Answers = {
  need: [],
  hasSite: "",
  currentUrl: "",
  business: "",
  find: [],
  serviceCount: "",
  does: [],
  languages: "",
  tools: "",
  doesOther: "",
  productCount: "",
  sellsNow: "",
  sellsOn: "",
  platform: "",
  googleTraffic: "",
  seoGoal: "",
  text: "",
  photos: "",
  brand: "",
  likes: "",
  deadline: "",
  deadlineDate: "",
  deadlineReason: "",
  budget: "",
  note: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  // The one default in the form (§6).
  replyBy: "email",
  via: "",
};

export const MULTI = ["need", "find", "does"] as const;
export type MultiField = (typeof MULTI)[number];

const CHOICES = {
  need: c.need,
  hasSite: c.hasSite,
  find: c.find,
  serviceCount: c.serviceCount,
  does: c.does,
  productCount: c.productCount,
  sellsNow: c.sellsNow,
  platform: c.platform,
  googleTraffic: c.googleTraffic,
  seoGoal: c.seoGoal,
  text: c.text,
  photos: c.photos,
  brand: c.brand,
  deadline: c.deadline,
  budget: c.budget,
  replyBy: c.replyBy,
} satisfies Partial<Record<Field, ChoiceQuestion>>;
export type ChoiceField = keyof typeof CHOICES;

const TEXT_LIMITS = {
  currentUrl: c.currentUrl.maxLength,
  business: c.business.maxLength,
  languages: c.languages.maxLength,
  tools: c.tools.maxLength,
  doesOther: c.doesOther.maxLength,
  sellsOn: c.sellsOn.maxLength,
  likes: c.likes.maxLength,
  deadlineReason: c.deadlineReason.maxLength,
  note: c.note.maxLength,
  name: c.name.maxLength,
  company: c.company.maxLength,
  email: c.email.maxLength,
  phone: c.phone.maxLength,
} satisfies Partial<Record<Field, number>>;

/** The two textareas; every other typed answer is one line. */
const MULTILINE = new Set<Field>(["likes", "note"]);

/** The label a choice id stands for, or "" for an id the question doesn't list. */
export function labelOf(field: ChoiceField, value: string): string {
  return CHOICES[field].options.find((opt) => opt.value === value)?.label ?? "";
}

export const has = (list: string[], value: string) => list.includes(value);

/**
 * Which conditional questions are on screen for these answers (§6). One
 * function for both sides: the form shows exactly these, and the server keeps
 * exactly these, so a hidden question can never submit a value.
 */
export function visibility(a: Answers) {
  // Q4 is skipped only when every need is a landing page or Google work.
  const landingOrSeoOnly = a.need.length > 0 && a.need.every((n) => n === "landing" || n === "seo");
  const blockA = has(a.need, "store") || has(a.does, "payments");
  return {
    currentUrl: a.hasSite === "yes",
    find: !landingOrSeoOnly,
    serviceCount: !landingOrSeoOnly && has(a.find, "services-each"),
    languages: has(a.does, "languages"),
    tools: has(a.does, "tools"),
    doesOther: has(a.does, "other"),
    blockA,
    sellsOn: blockA && a.sellsNow === "yes",
    blockB: has(a.need, "migrate") || has(a.need, "redesign"),
    blockC: has(a.need, "seo"),
    deadlineFixed: a.deadline === "fixed",
    // Partner-sourced leads are priced by the partner: no euro figures (§8).
    budget: !a.via,
  };
}
export type Visibility = ReturnType<typeof visibility>;

/** Clear every answer whose question is hidden, so it submits nothing. */
export function prune(a: Answers): Answers {
  const v = visibility(a);
  const out = { ...a };
  if (!v.currentUrl) out.currentUrl = "";
  if (!v.find) out.find = [];
  // Recompute after `find` may have been cleared.
  if (!(v.find && has(out.find, "services-each"))) out.serviceCount = "";
  if (!v.languages) out.languages = "";
  if (!v.tools) out.tools = "";
  if (!v.doesOther) out.doesOther = "";
  if (!v.blockA) {
    out.productCount = "";
    out.sellsNow = "";
  }
  if (!(v.blockA && out.sellsNow === "yes")) out.sellsOn = "";
  if (!v.blockB) {
    out.platform = "";
    out.googleTraffic = "";
  }
  if (!v.blockC) out.seoGoal = "";
  if (!v.deadlineFixed) {
    out.deadlineDate = "";
    out.deadlineReason = "";
  }
  if (!v.budget) out.budget = "";
  return out;
}

/**
 * Tick or untick one multi-select option. An exclusive option ("Not sure",
 * "Nothing special") clears the rest, and picking anything else clears it.
 */
export function toggle(field: MultiField, list: string[], value: string): string[] {
  if (list.includes(value)) return list.filter((v) => v !== value);
  if (isExclusive(field, value)) return [value];
  return [...list.filter((v) => !isExclusive(field, v)), value];
}

/** "Not sure" and "Nothing special": an answer that stands alone. */
export function isExclusive(field: MultiField, value: string): boolean {
  return Boolean(CHOICES[field].options.find((opt) => opt.value === value)?.exclusive);
}

/**
 * Read and clean a submission: trim, cap every text, keep only listed choice
 * ids, settle exclusive options, then drop whatever is hidden. Takes getters
 * rather than FormData so the same cleaning applies to an autosaved draft
 * read back from sessionStorage, which is just as untrusted.
 */
export function parseAnswers(get: (key: string) => string, getAll: (key: string) => string[]): Answers {
  const out: Answers = { ...emptyAnswers };

  for (const [field, max] of Object.entries(TEXT_LIMITS) as [keyof typeof TEXT_LIMITS, number][]) {
    let value = get(field);
    // One-line answers stay on one line: a pasted or forged line break must
    // never reach the email subject or split a line of the email body.
    if (!MULTILINE.has(field)) value = value.replace(/\s+/g, " ");
    out[field] = value.trim().slice(0, max);
  }

  for (const field of Object.keys(CHOICES) as ChoiceField[]) {
    if ((MULTI as readonly string[]).includes(field)) continue;
    const value = get(field).trim();
    (out[field] as string) = labelOf(field, value) ? value : "";
  }
  if (!out.replyBy) out.replyBy = "email";

  for (const field of MULTI) {
    const allowed = new Set(CHOICES[field].options.map((opt) => opt.value));
    const picked = [...new Set(getAll(field).map((v) => v.trim()))].filter((v) => allowed.has(v));
    // A tampered pair of exclusives, or an exclusive beside others: keep the
    // first exclusive alone, which is what the form itself would hold.
    const exclusive = picked.find((v) => CHOICES[field].options.find((opt) => opt.value === v)?.exclusive);
    out[field] = exclusive ? [exclusive] : picked;
  }

  const date = get("deadlineDate").trim();
  out.deadlineDate = /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) ? date : "";

  const via = get("via").trim();
  out.via = VIA_PATTERN.test(via) ? via : "";

  return prune(out);
}

/** A choice question with no "Not sure" style option gets the plainer error. */
function pickMessage(field: ChoiceField): string {
  const unsure = CHOICES[field].options.some((opt) => opt.value === "unsure");
  return unsure ? c.errors.pick : c.errors.pickOne;
}

/**
 * The problems on one step, in on-screen order, so the first entry is the
 * question to focus. Only visible questions are checked (§7).
 */
export function validateStep(step: Step, a: Answers): [Field, string][] {
  const v = visibility(a);
  const errors: [Field, string][] = [];
  const choice = (field: ChoiceField, shown = true) => {
    const value = a[field];
    const empty = Array.isArray(value) ? value.length === 0 : !value;
    if (shown && empty) errors.push([field, pickMessage(field)]);
  };

  if (step === 1) {
    choice("need");
    choice("hasSite");
    if (v.currentUrl && a.currentUrl.trim() && !normalizeUrl(a.currentUrl)) {
      errors.push(["currentUrl", c.errors.url]);
    }
    if (!a.business.trim()) errors.push(["business", c.errors.business]);
  }

  if (step === 2) {
    choice("find", v.find);
    choice("serviceCount", v.serviceCount);
    choice("does");
    choice("productCount", v.blockA);
    choice("sellsNow", v.blockA);
    choice("platform", v.blockB);
    choice("googleTraffic", v.blockB);
    choice("seoGoal", v.blockC);
  }

  if (step === 3) {
    choice("text");
    choice("photos");
    choice("brand");
  }

  if (step === 4) {
    choice("deadline");
    if (!a.name.trim()) errors.push(["name", c.errors.name]);
    if (!a.email.trim()) errors.push(["email", c.errors.emailEmpty]);
    else if (!isEmail(a.email.trim())) errors.push(["email", c.errors.email]);
    const phoneNeeded = a.replyBy === "whatsapp" || a.replyBy === "phone";
    if (phoneNeeded && !isPhone(a.phone.trim())) errors.push(["phone", c.errors.phone]);
    choice("replyBy");
  }

  return errors;
}

/** The first step with a problem, or `upTo` when every step before it is complete. */
export function firstIncompleteStep(a: Answers, upTo: number): number {
  for (let s = 1; s < upTo; s++) {
    if (validateStep(s as Step, a).length) return s;
  }
  return upTo;
}
