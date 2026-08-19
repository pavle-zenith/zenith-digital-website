import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { POST_TAG } from "@/sanity/lib/client";

/**
 * Sanity publish webhook. Point a GROQ-powered webhook at
 * POST https://www.thezenithdigital.com/api/revalidate with the same secret
 * that is in SANITY_REVALIDATE_SECRET, filtered to `_type == "post"`.
 *
 * This is the fast path: an edit is live within seconds of publishing. The
 * slow path is the hourly `revalidate` in sanity/lib/client, which means a
 * missed or misconfigured webhook costs at most an hour of staleness rather
 * than serving the old post until someone notices.
 *
 * FAILS CLOSED. Without a configured secret the route refuses rather than
 * accepting unauthenticated revalidation requests, which would let anyone
 * force cache misses on the whole blog at will.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new Response("Revalidation secret is not configured", {
      status: 500,
    });
  }

  try {
    // parseBody also waits out Content Lake eventual consistency, so the
    // refetch that follows cannot read the pre-publish version back.
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      secret,
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (body?._type !== "post") {
      return NextResponse.json({ revalidated: false, reason: "ignored type" });
    }

    revalidateTag(POST_TAG);
    return NextResponse.json({ revalidated: true, tag: POST_TAG });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(message, { status: 500 });
  }
}
