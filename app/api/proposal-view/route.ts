import { Resend } from "resend";

import { getProposal } from "@/content/proposals";
import {
  countryName,
  deviceType,
  isBot,
  throttleKey,
  viewEmail,
} from "@/lib/proposalViews";
import { SITE } from "@/lib/schema";

/**
 * Receives the proposal-view beacon and emails us "Proposal opened".
 * The client half is ProposalViewBeacon; the pure logic, and the reasoning,
 * is in lib/proposalViews.ts.
 *
 * PRIVACY. Reads the slug from the body and two headers: the user agent, for
 * the device type and the bot check, and Vercel's `x-vercel-ip-country`, the
 * country our host has already resolved. It never reads the IP address or
 * any cookie, and stores nothing: the email is the only record.
 *
 * THROTTLE, two layers. Each instance remembers the last send per slug for an
 * hour, which saves a Resend call. Across instances, the send carries an
 * idempotency key per slug per clock hour (`throttleKey`), and Resend refuses
 * a second send under the same key, so a proposal produces at most one email
 * per clock hour however many servers are running.
 *
 * Always answers 204, whatever happened: the beacon ignores the response,
 * and a uniform answer doesn't tell a prober which slugs exist.
 */

const HOUR_MS = 60 * 60 * 1000;
const TO = "hello@thezenithdigital.com";
const lastSent = new Map<string, number>();

const done = () => new Response(null, { status: 204 });

export async function POST(req: Request) {
  const ua = req.headers.get("user-agent");
  if (isBot(ua)) return done();

  // Only this site's own pages send the beacon. Browsers that predate the
  // header simply don't send it.
  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return done();

  let slug: unknown;
  let touch = false;
  try {
    const raw = await req.text();
    if (raw.length > 512) return done();
    const body = JSON.parse(raw) as { slug?: unknown; touch?: unknown };
    slug = body.slug;
    touch = body.touch === true;
  } catch {
    return done();
  }
  if (typeof slug !== "string") return done();

  const proposal = getProposal(slug);
  if (!proposal) return done();

  const now = Date.now();
  const last = lastSent.get(slug);
  if (last && now - last < HOUR_MS) return done();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return done();

  const { subject, text } = viewEmail({
    client: proposal.client,
    slug,
    url: `${SITE}/proposal/${slug}`,
    now,
    country: countryName(req.headers.get("x-vercel-ip-country")),
    device: deviceType(ua ?? "", touch),
  });

  try {
    const { error } = await new Resend(apiKey).emails.send(
      {
        from: process.env.AUDIT_FROM_EMAIL ?? "Zenith Digital <onboarding@resend.dev>",
        to: TO,
        subject,
        text,
      },
      { idempotencyKey: throttleKey(slug, now) },
    );
    // A reused key means another instance already sent this hour's email.
    if (error && error.name !== "invalid_idempotent_request" && error.name !== "concurrent_idempotent_requests") {
      throw new Error(`${error.name}: ${error.message}`);
    }
    lastSent.set(slug, now);
  } catch (err) {
    console.error("proposal-view: send failed", err);
  }

  return done();
}
