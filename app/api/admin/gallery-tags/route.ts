import { NextResponse } from "next/server";
import {
  getAdminClient,
  isAuthorized,
  GALLERY_BUCKET,
} from "@/lib/supabaseAdmin";

function guard(req: Request) {
  if (!isAuthorized(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getAdminClient();
  if (!sb)
    return NextResponse.json(
      { error: "Supabase is not configured on the server." },
      { status: 500 }
    );
  return sb;
}

// Add a tag
export async function POST(req: Request) {
  const sb = guard(req);
  if (sb instanceof NextResponse) return sb;

  const { name } = await req.json();
  const clean = String(name ?? "").trim();
  if (!clean)
    return NextResponse.json({ error: "Tag name is required" }, { status: 400 });

  const { data, error } = await sb
    .from("gallery_tags")
    .insert({ name: clean })
    .select()
    .single();
  if (error) {
    const msg = error.message.includes("duplicate")
      ? "That tag already exists."
      : error.message;
    return NextResponse.json({ error: msg }, { status: 500 });
  }
  return NextResponse.json({ tag: data });
}

// Rename a tag (also updates all images using the old name)
export async function PATCH(req: Request) {
  const sb = guard(req);
  if (sb instanceof NextResponse) return sb;

  const { id, oldName, name } = await req.json();
  const clean = String(name ?? "").trim();
  if (!id || !clean)
    return NextResponse.json({ error: "Missing id or name" }, { status: 400 });

  const { data, error } = await sb
    .from("gallery_tags")
    .update({ name: clean })
    .eq("id", id)
    .select()
    .single();
  if (error) {
    const msg = error.message.includes("duplicate")
      ? "Another tag already has that name."
      : error.message;
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  if (oldName && oldName !== clean) {
    await sb
      .from("gallery_images")
      .update({ tag: clean })
      .eq("tag", oldName);
  }

  return NextResponse.json({ tag: data });
}

// Delete a tag — and every image filed under it (storage + rows)
export async function DELETE(req: Request) {
  const sb = guard(req);
  if (sb instanceof NextResponse) return sb;

  const { id, name } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  if (name) {
    const { data: imgs } = await sb
      .from("gallery_images")
      .select("storage_path")
      .eq("tag", name);
    const paths = (imgs ?? [])
      .map((i) => i.storage_path)
      .filter(Boolean) as string[];
    if (paths.length) {
      await sb.storage.from(GALLERY_BUCKET).remove(paths);
    }
    await sb.from("gallery_images").delete().eq("tag", name);
  }

  const { error } = await sb.from("gallery_tags").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
