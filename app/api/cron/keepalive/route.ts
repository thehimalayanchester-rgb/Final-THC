import { NextResponse, type NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Lightweight ping that keeps a free-tier Supabase project from being paused
// for inactivity. Trigger it on a schedule (see vercel.json) with the
// Authorization: Bearer <CRON_SECRET> header.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET is not configured" },
      { status: 500 }
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase env vars are not configured" },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("blogs").select("id").limit(1);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
