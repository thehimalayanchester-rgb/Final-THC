"use client";
import { useCallback, useEffect, useState } from "react";
import { getSupabase, type Blog } from "@/lib/supabase";
import CodeEditor from "./CodeEditor";

const field =
  "w-full bg-[#0a0f12] border border-white/10 py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#c5a367] transition-colors";
const label =
  "block text-[#c5a367] text-[11px] font-bold uppercase tracking-[1.5px] mb-2";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const empty = {
  id: "",
  title: "",
  slug: "",
  meta_title: "",
  meta_description: "",
  content: "",
};

const BlogManager = ({ password }: { password: string }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [view, setView] = useState<"list" | "form">("list");
  const [form, setForm] = useState({ ...empty });
  const [slugTouched, setSlugTouched] = useState(false);
  const [featuredFile, setFeaturedFile] = useState<File | null>(null);
  const [featuredPreview, setFeaturedPreview] = useState<string | null>(null);
  const [contentTab, setContentTab] = useState<"code" | "preview">("code");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  const load = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) {
      setMsg({ type: "err", text: "Supabase env vars are not configured." });
      return;
    }
    const { data } = await sb
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    setBlogs((data as Blog[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startNew = () => {
    setForm({ ...empty });
    setSlugTouched(false);
    setFeaturedFile(null);
    setFeaturedPreview(null);
    setMsg(null);
    setContentTab("code");
    setView("form");
  };

  const startEdit = (b: Blog) => {
    setForm({
      id: b.id,
      title: b.title,
      slug: b.slug,
      meta_title: b.meta_title || "",
      meta_description: b.meta_description || "",
      content: b.content || "",
    });
    setSlugTouched(true);
    setFeaturedFile(null);
    setFeaturedPreview(b.featured_image);
    setMsg(null);
    setContentTab("code");
    setView("form");
  };

  const onTitle = (v: string) => {
    setForm((f) => ({
      ...f,
      title: v,
      slug: slugTouched ? f.slug : slugify(v),
    }));
  };

  const save = async () => {
    if (!form.title.trim())
      return setMsg({ type: "err", text: "Title is required." });
    setBusy(true);
    setMsg(null);
    const fd = new FormData();
    if (form.id) fd.append("id", form.id);
    fd.append("title", form.title.trim());
    fd.append("slug", form.slug.trim() || slugify(form.title));
    fd.append("meta_title", form.meta_title.trim());
    fd.append("meta_description", form.meta_description.trim());
    fd.append("content", form.content);
    if (featuredFile) fd.append("featured", featuredFile);

    const res = await fetch("/api/admin/blogs", {
      method: form.id ? "PATCH" : "POST",
      headers: { "x-admin-password": password },
      body: fd,
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg({ type: "err", text: json.error || "Save failed" });
    await load();
    setView("list");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const res = await fetch("/api/admin/blogs", {
      method: "DELETE",
      headers: { "x-admin-password": password, "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) load();
    else setMsg({ type: "err", text: "Delete failed" });
  };

  if (view === "list") {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-white text-xl">
            Blog Posts ({blogs.length})
          </h3>
          <button
            type="button"
            onClick={startNew}
            className="bg-[#c5a367] hover:bg-white text-black px-6 py-2.5 text-[12px] font-black uppercase tracking-[1.5px] transition-colors"
          >
            + New Post
          </button>
        </div>

        {msg && <p className="text-red-400 text-sm mb-4">{msg.text}</p>}

        <div className="space-y-3">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-4 bg-[#11191f] border border-white/10 p-4"
            >
              <div className="relative w-16 h-16 shrink-0 bg-[#0a0f12] overflow-hidden">
                {b.featured_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={b.featured_image}
                    alt={b.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-sans font-semibold truncate">
                  {b.title}
                </p>
                <p className="text-gray-500 text-xs truncate">/{b.slug}</p>
              </div>
              <a
                href={`/blogs/${b.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 text-[11px] uppercase tracking-[1px] hover:text-[#c5a367]"
              >
                View
              </a>
              <button
                type="button"
                onClick={() => startEdit(b)}
                className="border border-white/15 text-gray-300 px-4 py-1.5 text-[11px] uppercase hover:border-[#c5a367] hover:text-[#c5a367]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => remove(b.id)}
                className="border border-red-500/40 text-red-400 px-4 py-1.5 text-[11px] uppercase hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          ))}
          {blogs.length === 0 && (
            <p className="text-gray-500 text-sm">No posts yet.</p>
          )}
        </div>
      </div>
    );
  }

  // Form view
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-white text-xl">
          {form.id ? "Edit Post" : "New Post"}
        </h3>
        <button
          type="button"
          onClick={() => setView("list")}
          className="text-gray-400 text-[12px] uppercase tracking-[1.5px] hover:text-white"
        >
          ← Back
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className={label}>
            Title <span className="text-red-500">*</span>
          </label>
          <input
            className={field}
            value={form.title}
            onChange={(e) => onTitle(e.target.value)}
          />
        </div>

        <div>
          <label className={label}>Slug</label>
          <input
            className={field}
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm((f) => ({ ...f, slug: e.target.value }));
            }}
          />
          <p className="text-gray-600 text-[11px] mt-1">/blogs/{form.slug}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={label}>Meta Title</label>
            <input
              className={field}
              value={form.meta_title}
              onChange={(e) =>
                setForm((f) => ({ ...f, meta_title: e.target.value }))
              }
            />
          </div>
          <div>
            <label className={label}>Meta Description</label>
            <input
              className={field}
              value={form.meta_description}
              onChange={(e) =>
                setForm((f) => ({ ...f, meta_description: e.target.value }))
              }
            />
          </div>
        </div>

        <div>
          <label className={label}>Featured Image</label>
          <div className="flex items-center gap-4">
            <label className="inline-block bg-[#c5a367] hover:bg-white text-black px-5 py-2 text-[12px] font-bold uppercase tracking-[1.5px] cursor-pointer transition-colors">
              Choose
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFeaturedFile(f);
                  if (f) setFeaturedPreview(URL.createObjectURL(f));
                }}
              />
            </label>
            {featuredPreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featuredPreview}
                alt="preview"
                className="h-16 w-24 object-cover border border-white/10"
              />
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={label + " mb-0"}>Content (HTML)</label>
            <div className="flex border border-white/10">
              {(["code", "preview"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setContentTab(t)}
                  className={`px-3 py-1 text-[11px] uppercase tracking-[1px] ${
                    contentTab === t
                      ? "bg-[#c5a367] text-black"
                      : "text-gray-400 hover:text-[#c5a367]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {contentTab === "code" ? (
            <CodeEditor
              value={form.content}
              onChange={(v) => setForm((f) => ({ ...f, content: v }))}
            />
          ) : (
            <div
              className="blog-content border border-white/10 bg-[#0a0f12] p-6 min-h-[420px] max-h-[420px] overflow-auto"
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          )}
        </div>

        {msg && (
          <p
            className={`text-sm ${
              msg.type === "ok" ? "text-green-400" : "text-red-400"
            }`}
          >
            {msg.text}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={save}
            disabled={busy}
            className="bg-[#c5a367] hover:bg-white text-black px-8 py-3 text-[12px] font-black uppercase tracking-[2px] transition-colors disabled:opacity-50"
          >
            {busy ? "Saving…" : form.id ? "Update Post" : "Publish Post"}
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className="border border-white/15 text-gray-300 px-8 py-3 text-[12px] uppercase tracking-[1.5px] hover:border-white/40"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;
