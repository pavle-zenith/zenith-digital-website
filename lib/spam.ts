/**
 * Spam screening for the public forms (contact, free audit, partnerships).
 * Pure, so it is tested on its own (lib/spam.test.mjs) and runs inside each
 * form's server action after the honeypot and the rate limit.
 *
 * QUARANTINE, NEVER DROP. A flagged submission is still stored in Supabase,
 * with the reason in `payload.spam`, and the visitor sees the usual success
 * message; it just doesn't email us. A false positive costs a look in the
 * table (`select * from form_submissions where payload ? 'spam'`), never a
 * lost lead, and a bot learns nothing from the response.
 *
 * Written against what actually arrives: adult links, link-shortener and
 * Telegram links, BBCode, links stuffed into name fields, instant fills.
 * Every word rule is anchored so it can't catch a real enquiry: "sex" is a
 * whole word in text and is spared after Es/Sus/Middle in domains (Essex,
 * Sussex, Middlesex businesses), and there is no "anal" (analytics).
 */

/** A person can't open a form, fill it and send it faster than this. */
export const MIN_FILL_MS = 3000;

export type SpamCheck = {
  /** Free-text fields: the message, the note, what they need. */
  text: string[];
  /** Fields that never hold a link from a real person: name, agency. */
  names: string[];
  /** The website address the form asks for, if any. */
  sites: string[];
  /** The hidden `ts` field: when the form was opened, in ms since epoch. */
  openedAt: FormDataEntryValue | null;
  now: number;
};

export type SpamReason =
  | "no-timestamp"
  | "too-fast"
  | "link-in-name"
  | "markup"
  | "adult-content"
  | "adult-link"
  | "shortened-link"
  | "many-links";

const ADULT_WORDS = new RegExp(
  [
    "\\bporn\\w*",
    "\\bxxx+\\b",
    "\\bsex\\b",
    "\\bsexy\\b",
    "\\bnudes?\\b",
    "\\bnaked\\b",
    "\\bnsfw\\b",
    "\\bonlyfans\\b",
    "\\bescorts?\\b",
    "\\bhookups?\\b",
    "\\bcam\\s?girls?\\b",
    "\\bmilfs?\\b",
    "\\bhentai\\b",
    "\\berotic\\w*",
    "\\b(?:hot|horny|local|lonely)\\s+(?:girls|singles|women|milfs)\\b",
    "\\b(?:adult|sex)\\s+(?:dating|videos?|chat|content)\\b",
    "\\bviagra\\b",
    "\\bcialis\\b",
    "\\b18\\+",
    // Russian: \b doesn't work outside ASCII, and none of these stems turn up
    // in a Serbian or Russian enquiry about a website.
    "порн",
    "секс",
    "интим",
    "проститут",
    "шлюх",
    "эскорт",
  ].join("|"),
  "i",
);

const ADULT_HOST =
  /porn|xxx|(?<!es|us|dle)sex|nude|nsfw|escort|onlyfans|camgirl|milf|hentai|erotic|hookup|xvideo|xhamster|redtube|chaturbate|stripchat|livejasmin/i;

const SHORTENER_HOSTS = new Set([
  "bit.ly",
  "tinyurl.com",
  "t.me",
  "telegra.ph",
  "cutt.ly",
  "shorturl.at",
  "rebrand.ly",
  "is.gd",
  "goo.su",
  "clck.ru",
  "rb.gy",
  "t.co",
  "tiny.cc",
  "ow.ly",
]);

/** Links a reader would click: an explicit scheme or a www. prefix. */
const LINK = /\bhttps?:\/\/|\bwww\./i;
/** For counting: "https://www.x.com" is one link, not a scheme plus a www. */
const LINKS = /\bhttps?:\/\/|(?<!\/)\bwww\./gi;

/** Every host-looking token, with or without a scheme ("bit.ly/x" counts). */
const HOST = /\b(?:https?:\/\/)?((?:[a-z0-9-]+\.)+[a-z]{2,})(?=[\/\s?#:,;.!)'"\]]|$)/gi;

const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/g;

function hosts(value: string): string[] {
  // An email address is not a link: drop them before looking for domains.
  const text = value.replace(EMAIL, " ");
  return Array.from(text.matchAll(HOST), (m) => m[1].toLowerCase().replace(/^www\./, ""));
}

/** Why this submission looks like spam, or null if it doesn't. */
export function spamReason({ text, names, sites, openedAt, now }: SpamCheck): SpamReason | null {
  const opened = typeof openedAt === "string" ? Number(openedAt) : NaN;
  if (!Number.isFinite(opened) || opened <= 0) return "no-timestamp";
  if (now - opened < MIN_FILL_MS) return "too-fast";

  // Explicit links only: an agency can be called "Acme.io".
  if (names.some((n) => LINK.test(n))) return "link-in-name";

  const all = [...text, ...names];
  if (all.some((v) => /<a\s|\[url|\[link|\[\/url\]/i.test(v))) return "markup";
  if (all.some((v) => ADULT_WORDS.test(v))) return "adult-content";

  const linked = [...all, ...sites].flatMap(hosts);
  if (linked.some((h) => ADULT_HOST.test(h))) return "adult-link";
  if (linked.some((h) => SHORTENER_HOSTS.has(h))) return "shortened-link";

  const explicit = text.reduce((n, v) => n + (v.match(LINKS)?.length ?? 0), 0);
  if (explicit >= 3) return "many-links";

  return null;
}
