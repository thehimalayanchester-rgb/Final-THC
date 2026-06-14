import { NextResponse } from "next/server";
import {
  getAdminClient,
  isAuthorized,
  slugify,
  BLOG_BUCKET,
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

type AdminClient = NonNullable<ReturnType<typeof getAdminClient>>;

async function uploadFeatured(sb: AdminClient, file: File, slug: string) {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${slugify(slug)}/${Date.now()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const up = await sb.storage
    .from(BLOG_BUCKET)
    .upload(path, bytes, { contentType: file.type || "image/jpeg", upsert: true });
  if (up.error) throw new Error(up.error.message);
  const url = sb.storage.from(BLOG_BUCKET).getPublicUrl(path).data.publicUrl;
  return { url, path };
}

// Create a blog
export async function POST(req: Request) {
  const sb = guard(req);
  if (sb instanceof NextResponse) return sb;

  const form = await req.formData();
  const title = String(form.get("title") ?? "").trim();
  const slug = slugify(String(form.get("slug") ?? "") || title);
  const content = String(form.get("content") ?? "");
  const meta_title = String(form.get("meta_title") ?? "").trim() || null;
  const meta_description =
    String(form.get("meta_description") ?? "").trim() || null;
  const featured = form.get("featured");

  if (!title)
    return NextResponse.json({ error: "Title is required" }, { status: 400 });

  let featured_image: string | null = null;
  let featured_image_path: string | null = null;
  if (featured instanceof File && featured.size > 0) {
    try {
      const r = await uploadFeatured(sb, featured, slug);
      featured_image = r.url;
      featured_image_path = r.path;
    } catch (e) {
      return NextResponse.json(
        { error: (e as Error).message },
        { status: 500 }
      );
    }
  }

  const { data, error } = await sb
    .from("blogs")
    .insert({
      title,
      slug,
      content,
      meta_title,
      meta_description,
      featured_image,
      featured_image_path,
    })
    .select()
    .single();

  if (error) {
    const msg = error.message.includes("duplicate")
      ? "A blog with this slug already exists. Use a different slug."
      : error.message;
    return NextResponse.json({ error: msg }, { status: 500 });
  }
  return NextResponse.json({ blog: data });
}

// Update a blog
export async function PATCH(req: Request) {
  const sb = guard(req);
  if (sb instanceof NextResponse) return sb;

  const form = await req.formData();
  const id = String(form.get("id") ?? "");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const title = String(form.get("title") ?? "").trim();
  const slug = slugify(String(form.get("slug") ?? "") || title);
  const content = String(form.get("content") ?? "");
  const meta_title = String(form.get("meta_title") ?? "").trim() || null;
  const meta_description =
    String(form.get("meta_description") ?? "").trim() || null;
  const featured = form.get("featured");

  const update: Record<string, unknown> = {
    title,
    slug,
    content,
    meta_title,
    meta_description,
  };

  if (featured instanceof File && featured.size > 0) {
    const { data: existing } = await sb
      .from("blogs")
      .select("featured_image_path")
      .eq("id", id)
      .maybeSingle();
    try {
      const r = await uploadFeatured(sb, featured, slug);
      update.featured_image = r.url;
      update.featured_image_path = r.path;
      if (existing?.featured_image_path) {
        await sb.storage.from(BLOG_BUCKET).remove([existing.featured_image_path]);
      }
    } catch (e) {
      return NextResponse.json(
        { error: (e as Error).message },
        { status: 500 }
      );
    }
  }

  const { data, error } = await sb
    .from("blogs")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ blog: data });
}

// Delete a blog
export async function DELETE(req: Request) {
  const sb = guard(req);
  if (sb instanceof NextResponse) return sb;

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { data: row } = await sb
    .from("blogs")
    .select("featured_image_path")
    .eq("id", id)
    .maybeSingle();
  if (row?.featured_image_path) {
    await sb.storage.from(BLOG_BUCKET).remove([row.featured_image_path]);
  }

  const { error } = await sb.from("blogs").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
