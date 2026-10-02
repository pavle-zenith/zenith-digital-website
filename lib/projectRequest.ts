import { pricing } from "@/content/home";
import {
  has,
  labelOf,
  visibility,
  type Answers,
  type Field,
  type MultiField,
} from "@/lib/projectRequestForm";

/**
 * What makes a project request quotable (Docs/Project_Request_Handoff.md §10):
 * the page count, the likely scope, the flags that move price or date, and the
 * assumptions to state. Pure functions, no I/O. The server action turns their
 * output into the founder email and the stored row. Unit tests:
 * lib/projectRequest.test.mjs (`npm test`).
 *
 * The rule for unclear clients runs through all of it: every "Not sure"
 * becomes a stated assumption, and the quote goes out as a range.
 */

export type Pages = { min: number; max: number; list: string[] };

/** Pages a CMS normally runs: Pavle prices these as collections, not pages. */
const CMS_ITEMS = new Set(["portfolio", "case-studies", "blog", "locations", "team"]);

const SERVICE_PAGES: Record<string, [number, number]> = {
  "2-4": [2, 4],
  "5-8": [5, 8],
  "9+": [9, 12],
  unsure: [3, 6],
};

/** Features that keep a small site in the first tier. */
const SIMPLE_FEATURES = new Set(["enquiries", "chat", "nothing"]);

/**
 * Pages implied by what the visitor wants people to find. Each tile is one
 * page, except a page per service (the range, plus a services index); one
 * page is always added for the legal pages. "Not sure" returns the brief's
 * fixed 5 to 8 as given, rather than adding legal on top of a guess.
 */
export function countPages(find: string[], serviceCount: string): Pages {
  if (find.includes("unsure")) return { min: 5, max: 8, list: ["Not specified"] };

  let min = 0;
  let max = 0;
  const list: string[] = [];
  for (const id of find) {
    if (id === "services-each") {
      const [lo, hi] = SERVICE_PAGES[serviceCount] ?? SERVICE_PAGES.unsure;
      min += lo + 1;
      max += hi + 1;
      list.push("Services (index)", `Service pages x ${lo} to ${hi}`);
      continue;
    }
    min += 1;
    max += 1;
    const label = labelOf("find", id);
    list.push(CMS_ITEMS.has(id) ? `${label} (CMS)` : label);
  }
  min += 1;
  max += 1;
  list.push("Legal pages");
  return { min, max, list };
}

/**
 * Pages for the whole request. Q4 is skipped for a landing page or Google
 * work alone, so those two are counted here rather than from tiles.
 */
export function pagesFor(a: Answers): Pages {
  if (visibility(a).find) return countPages(a.find, a.serviceCount);
  if (has(a.need, "landing")) return { min: 2, max: 2, list: ["Landing page", "Legal pages"] };
  return { min: 0, max: 0, list: [] };
}

const onlyNeed = (a: Answers, id: string) => a.need.length === 1 && a.need[0] === id;

/**
 * One line naming the likely project. Tier names come from the homepage
 * pricing content; no price ever appears in the email.
 */
export function suggestScope(a: Answers, pages: Pages): string {
  const [first, second] = pricing.tiers.map((t) => t.name);
  const v = visibility(a);
  let scope: string;

  if (onlyNeed(a, "landing")) scope = "Landing page";
  else if (has(a.need, "store") || v.blockA) scope = "Custom: store. Quote by hand.";
  else if (has(a.need, "migrate")) scope = "Custom: migration. Quote by hand.";
  else if (onlyNeed(a, "seo")) scope = "SEO only. Quote by hand.";
  else {
    // An unsure feature list is quoted as enquiry form only (the assumption).
    const does = has(a.does, "unsure") ? ["enquiries"] : a.does;
    const cms = a.find.some((id) => CMS_ITEMS.has(id));
    if (pages.max > 12 || has(does, "members") || has(does, "languages")) scope = "Custom. Quote by hand.";
    else if (pages.max <= 5 && !cms && does.every((d) => SIMPLE_FEATURES.has(d))) scope = first;
    else scope = second;
  }

  if (buildAssumptions(a).length) scope += " (range: unclear answers below)";
  return scope;
}

/** Second tier or custom: the scopes a rushed deadline actually squeezes. */
function isLargeScope(scope: string): boolean {
  return scope.startsWith(pricing.tiers[1].name) || scope.startsWith("Custom");
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Whole days from `today` to an ISO date, both read as UTC calendar days. */
export function daysUntil(isoDate: string, today: Date): number {
  const target = Date.parse(`${isoDate}T00:00:00Z`);
  const start = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((target - start) / DAY_MS);
}

export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Short lines for anything that moves the price or the date. */
export function buildFlags(a: Answers, pages: Pages, scope: string, today: Date = new Date()): string[] {
  const v = visibility(a);
  const flags: string[] = [];
  const tight = ", tight for this scope";

  if (a.text === "needs-writing") flags.push("Copy: needs writing");
  else if (a.text === "partial") flags.push("Copy: partial");

  if (a.photos === "none") flags.push("Photos: none");
  else if (a.photos === "phone") flags.push("Photos: phone quality");

  if (a.brand === "nothing") flags.push("Brand: nothing yet");
  else if (a.brand === "logo-only") flags.push("Brand: logo only");
  else if (a.brand === "refresh") flags.push("Brand: refresh wanted");

  const detail = (name: string, extra: string) => (extra ? `${name} (${extra})` : name);
  const features = [
    has(a.does, "booking") && "booking",
    has(a.does, "payments") && "payments",
    has(a.does, "languages") && detail("multilingual", a.languages),
    has(a.does, "members") && "members area",
    has(a.does, "tools") && detail("integrations", a.tools),
    has(a.does, "other") && detail("other", a.doesOther),
  ].filter(Boolean);
  if (features.length) flags.push(`Features: ${features.join(", ")}`);

  if (v.blockA) {
    const count =
      a.productCount && a.productCount !== "unsure"
        ? `${labelOf("productCount", a.productCount)} products`
        : "product count unknown";
    const selling =
      a.sellsNow === "yes"
        ? `, sells on ${a.sellsOn || "a channel not named"}`
        : a.sellsNow === "no"
          ? ", not selling online yet"
          : "";
    flags.push(`Store: ${count}${selling}`);
  }

  if (v.blockB) {
    const platform = labelOf("platform", a.platform) || "not given";
    const traffic = labelOf("googleTraffic", a.googleTraffic) || "not given";
    const from = has(a.need, "migrate") ? `Migration: from ${platform}` : `Redesign: currently on ${platform}`;
    flags.push(`${from}, Google traffic: ${traffic}`);
    if (a.googleTraffic === "a-lot" || a.googleTraffic === "some") {
      flags.push("Redirect map and ranking check needed");
    }
  }

  const large = isLargeScope(scope);
  if (a.deadline === "asap") flags.push(`Deadline: ASAP${large ? tight : ""}`);
  if (a.deadline === "month") flags.push(`Deadline: within a month${large ? tight : ""}`);
  if (a.deadline === "fixed") {
    const reason = a.deadlineReason ? ` (${a.deadlineReason})` : "";
    if (a.deadlineDate) {
      const days = daysUntil(a.deadlineDate, today);
      const isTight = days < 14 || (large && days < 35);
      flags.push(`Deadline: fixed ${formatDate(a.deadlineDate)}${reason}${isTight ? tight : ""}`);
    } else {
      flags.push(`Deadline: fixed, date not given${reason}`);
    }
  }

  if (
    (a.budget === "under-1000" && !scope.startsWith("Landing page")) ||
    (a.budget === "1000-2500" && scope.startsWith("Custom"))
  ) {
    flags.push("Budget below likely scope");
  }

  return flags;
}

const ASK_LABELS: [Field, string][] = [
  ["serviceCount", "Number of services"],
  ["productCount", "Number of products"],
  ["platform", "Current platform"],
  ["googleTraffic", "Google traffic worth keeping"],
  ["seoGoal", "What they want more of from Google"],
];

/**
 * One line per "Not sure", phrased as what to state in the quote. Hidden
 * questions never count: a pruned answer is empty, not "unsure".
 */
export function buildAssumptions(a: Answers): string[] {
  const lines: string[] = [];
  if (has(a.need, "unsure")) lines.push("Type of project not chosen: recommend one");
  if (has(a.find, "unsure")) lines.push("Page list not chosen: propose one");
  if (has(a.does, "unsure")) lines.push("Features not chosen: assume enquiry form only");
  if (a.text === "unsure") lines.push("Copy: assume it needs writing");
  if (a.photos === "unsure") lines.push("Photos: assume stock");
  for (const [field, label] of ASK_LABELS) {
    if (a[field] === "unsure") lines.push(`${label}: ask`);
  }
  return lines;
}

const DEADLINE_SHORT: Record<string, string> = {
  asap: "ASAP",
  month: "within a month",
  "1-3-months": "1 to 3 months",
  "no-rush": "no rush",
};

function deadlineShort(a: Answers): string {
  if (a.deadline === "fixed") return a.deadlineDate ? `by ${formatDate(a.deadlineDate)}` : "fixed date";
  return DEADLINE_SHORT[a.deadline] ?? "no deadline given";
}

function pagesShort(pages: Pages): string | null {
  if (pages.max === 0) return null;
  return pages.min === pages.max ? `${pages.min} pages` : `${pages.min}-${pages.max} pages`;
}

const labels = (field: MultiField, values: string[]) => values.map((v) => labelOf(field, v)).join(", ");
const joined = (field: MultiField, values: string[]) => values.map((v) => labelOf(field, v)).join(" | ");

export type Quote = { pages: Pages; scope: string; flags: string[]; assumptions: string[] };

export function buildQuote(a: Answers, today: Date = new Date()): Quote {
  const pages = pagesFor(a);
  const scope = suggestScope(a, pages);
  return { pages, scope, flags: buildFlags(a, pages, scope, today), assumptions: buildAssumptions(a) };
}

export function emailSubject(a: Answers, q: Quote): string {
  const who = a.company ? `${a.name}, ${a.company}` : a.name;
  return [
    `Project request: ${who}`,
    q.scope,
    pagesShort(q.pages),
    deadlineShort(a),
    labelOf("budget", a.budget) || "no budget given",
  ]
    .filter(Boolean)
    .join(" | ");
}

/** The email body, plain text, as `notify` lines. Empty sections are left out. */
export function emailLines(a: Answers, q: Quote): string[] {
  const lines: string[] = [];
  const section = (heading: string, items: string[]) => {
    if (!items.length) return;
    lines.push("", heading, ...items);
  };

  const digits = a.phone.replace(/\D/g, "");
  lines.push(a.company ? `${a.name} · ${a.company}` : a.name);
  lines.push(a.business);
  lines.push(`Reply by: ${labelOf("replyBy", a.replyBy)}  ${a.email}${a.phone ? `  ${a.phone}` : ""}`);
  if (digits.length >= 7) lines.push(`WhatsApp: https://wa.me/${digits}`);
  if (a.via) lines.push(`Came via: ${a.via}`);

  section("SUGGESTED SCOPE", [
    q.scope,
    q.pages.max === 0 ? "Pages: none to build" : `Pages: ${q.pages.min} to ${q.pages.max}`,
  ]);
  section("FLAGS", q.flags.map((f) => `- ${f}`));
  section("STATE THESE AS ASSUMPTIONS", q.assumptions.map((s) => `- ${s}`));
  section("PAGE LIST", q.pages.list.map((p) => `- ${p}`));

  // "There's a fixed date" reads as a tile, not as an answer line.
  const deadline =
    a.deadline === "fixed"
      ? [`fixed, ${a.deadlineDate ? formatDate(a.deadlineDate) : "date not given"}`, a.deadlineReason && `(${a.deadlineReason})`]
          .filter(Boolean)
          .join(" ")
      : labelOf("deadline", a.deadline);
  const currentSite = a.currentUrl || (a.hasSite === "yes" ? "yes, address not given" : "none");

  section(
    "ANSWERS",
    [
      `Needs: ${labels("need", a.need)}`,
      `Current site: ${currentSite}`,
      a.seoGoal && `More of: ${labelOf("seoGoal", a.seoGoal)}`,
      `Should do: ${labels("does", a.does)}`,
      `Text: ${labelOf("text", a.text)}`,
      `Photos: ${labelOf("photos", a.photos)}`,
      `Brand: ${labelOf("brand", a.brand)}`,
      a.likes && `Likes: ${a.likes}`,
      `Deadline: ${deadline}`,
      `Budget: ${a.via ? "not asked (partner link)" : labelOf("budget", a.budget) || "not given"}`,
      a.note && `Note: ${a.note}`,
    ].filter((line): line is string => Boolean(line)),
  );

  return lines;
}

/**
 * Everything without a column of its own, as label strings for the row's
 * `payload` (multi-selects joined with " | "), plus via, pages and scope.
 */
export function buildPayload(a: Answers, q: Quote): Record<string, string> {
  const entries: [string, string][] = [
    ["company", a.company],
    ["business", a.business],
    ["need", joined("need", a.need)],
    ["hasSite", labelOf("hasSite", a.hasSite)],
    ["find", joined("find", a.find)],
    ["serviceCount", labelOf("serviceCount", a.serviceCount)],
    ["does", joined("does", a.does)],
    ["languages", a.languages],
    ["tools", a.tools],
    ["doesOther", a.doesOther],
    ["productCount", labelOf("productCount", a.productCount)],
    ["sellsNow", labelOf("sellsNow", a.sellsNow)],
    ["sellsOn", a.sellsOn],
    ["platform", labelOf("platform", a.platform)],
    ["googleTraffic", labelOf("googleTraffic", a.googleTraffic)],
    ["seoGoal", labelOf("seoGoal", a.seoGoal)],
    ["text", labelOf("text", a.text)],
    ["photos", labelOf("photos", a.photos)],
    ["brand", labelOf("brand", a.brand)],
    ["likes", a.likes],
    ["deadline", labelOf("deadline", a.deadline)],
    ["deadlineDate", a.deadlineDate],
    ["deadlineReason", a.deadlineReason],
    ["budget", labelOf("budget", a.budget)],
    ["replyBy", labelOf("replyBy", a.replyBy)],
    ["via", a.via],
    ["pages", q.pages.max === 0 ? "0" : `${q.pages.min}-${q.pages.max}`],
    ["scope", q.scope],
  ];
  return Object.fromEntries(entries.filter(([, value]) => value));
}
