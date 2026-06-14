import { NextResponse } from "next/server";
import { expectedPassword } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  let password = "";
  try {
    const body = await req.json();
    password = String(body?.password ?? "");
  } catch {
    password = "";
  }
  return NextResponse.json({ ok: password === expectedPassword() });
}
