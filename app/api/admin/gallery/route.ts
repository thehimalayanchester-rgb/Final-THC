import { NextResponse } from "next/server";
import {
  getAdminClient,
  isAuthorized,
  slugify,
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

// Upload one or more images under a tag
export async function POST(req: Request) {
  const sb = guard(req);
  if (sb instanceof NextResponse) return sb;

  const form = await req.formData();
  const tag = String(form.get("tag") ?? "").trim();
  const alt = String(form.get("alt") ?? "").trim();
  const files = form.getAll("files").filter((f) => f instanceof File) as File[];

  if (!tag) return NextResponse.json({ error: "Tag is required" }, { status: 400 });
  if (!files.length)
    return NextResponse.json({ error: "No images provided" }, { status: 400 });

  const created = [];
  for (const file of files) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${slugify(tag)}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const up = await sb.storage
      .from(GALLERY_BUCKET)
      .upload(path, bytes, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });
    if (up.error)
      return NextResponse.json({ error: up.error.message }, { status: 500 });

    const url = sb.storage.from(GALLERY_BUCKET).getPublicUrl(path).data
      .publicUrl;

    const ins = await sb
      .from("gallery_images")
      .insert({ tag, image_url: url, storage_path: path, alt: alt || tag })
      .select()
      .single();
    if (ins.error)
      return NextResponse.json({ error: ins.error.message }, { status: 500 });

    created.push(ins.data);
  }

  // Keep the tags table in sync (so a brand-new tag becomes manageable).
  await sb.from("gallery_tags").upsert({ name: tag }, { onConflict: "name", ignoreDuplicates: true });

  return NextResponse.json({ images: created });
}

// Edit tag / alt of an image
export async function PATCH(req: Request) {
  const sb = guard(req);
  if (sb instanceof NextResponse) return sb;

  const { id, tag, alt } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const cleanTag = String(tag ?? "").trim();
  if (!cleanTag)
    return NextResponse.json({ error: "Tag is required" }, { status: 400 });

  const { data, error } = await sb
    .from("gallery_images")
    .update({ tag: cleanTag, alt: String(alt ?? "").trim() || cleanTag })
    .eq("id", id)
    .select()
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ image: data });
}

// Delete one or more images (storage objects + rows)
export async function DELETE(req: Request) {
  const sb = guard(req);
  if (sb instanceof NextResponse) return sb;

  const body = await req.json();
  const ids: string[] = Array.isArray(body.ids)
    ? body.ids.filter(Boolean)
    : body.id
    ? [body.id]
    : [];
  if (!ids.length)
    return NextResponse.json({ error: "Missing id(s)" }, { status: 400 });

  const { data: rows } = await sb
    .from("gallery_images")
    .select("storage_path")
    .in("id", ids);

  const paths = (rows ?? [])
    .map((r) => r.storage_path)
    .filter(Boolean) as string[];
  if (paths.length) {
    await sb.storage.from(GALLERY_BUCKET).remove(paths);
  }

  const { error } = await sb.from("gallery_images").delete().in("id", ids);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, deleted: ids.length });
}
