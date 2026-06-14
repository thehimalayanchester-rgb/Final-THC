"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  getSupabase,
  type GalleryImage,
  type GalleryTag,
} from "@/lib/supabase";

const field =
  "w-full bg-[#0a0f12] border border-white/10 py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#c5a367] transition-colors";
const label =
  "block text-[#c5a367] text-[11px] font-bold uppercase tracking-[1.5px] mb-2";

const GalleryManager = ({ password }: { password: string }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [tags, setTags] = useState<GalleryTag[]>([]);

  // upload form
  const [tag, setTag] = useState("");
  const [alt, setAlt] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  // image inline edit
  const [editing, setEditing] = useState<string | null>(null);
  const [editTag, setEditTag] = useState("");
  const [editAlt, setEditAlt] = useState("");

  // track which thumbnails have finished loading (for skeleton placeholders)
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const markLoaded = (id: string) =>
    setLoaded((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));

  // tag management
  const [newTag, setNewTag] = useState("");
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editTagName, setEditTagName] = useState("");
  const [tagMsg, setTagMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) {
      setMsg({ type: "err", text: "Supabase env vars are not configured." });
      return;
    }
    const [imgRes, tagRes] = await Promise.all([
      sb.from("gallery_images").select("*").order("created_at", { ascending: false }),
      sb.from("gallery_tags").select("*").order("name", { ascending: true }),
    ]);
    setImages((imgRes.data as GalleryImage[]) ?? []);
    setTags((tagRes.data as GalleryTag[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const headers = { "x-admin-password": password };

  // ---- Tag management -----------------------------------------------------
  const addTag = async () => {
    const name = newTag.trim();
    if (!name) return;
    setTagMsg(null);
    const res = await fetch("/api/admin/gallery-tags", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const json = await res.json();
    if (!res.ok) return setTagMsg(json.error || "Failed to add tag");
    setNewTag("");
    load();
  };

  const renameTag = async (id: string, oldName: string) => {
    const name = editTagName.trim();
    if (!name) return;
    setTagMsg(null);
    const res = await fetch("/api/admin/gallery-tags", {
      method: "PATCH",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ id, oldName, name }),
    });
    const json = await res.json();
    if (!res.ok) return setTagMsg(json.error || "Failed to rename tag");
    setEditingTagId(null);
    load();
  };

  const deleteTag = async (id: string, name: string) => {
    const count = images.filter((i) => i.tag === name).length;
    const warning =
      count > 0
        ? `Delete the tag "${name}" and its ${count} image(s)? This cannot be undone.`
        : `Delete the tag "${name}"?`;
    if (!confirm(warning)) return;
    const res = await fetch("/api/admin/gallery-tags", {
      method: "DELETE",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    });
    if (res.ok) load();
    else setTagMsg("Failed to delete tag");
  };

  // ---- Image upload / edit / delete ---------------------------------------
  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const imgs = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...imgs]);
  };

  const upload = async () => {
    if (!tag.trim()) return setMsg({ type: "err", text: "Tag is required." });
    if (!files.length)
      return setMsg({ type: "err", text: "Add at least one image." });
    setBusy(true);
    setMsg(null);
    const fd = new FormData();
    fd.append("tag", tag.trim());
    fd.append("alt", alt.trim());
    files.forEach((f) => fd.append("files", f));
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers,
      body: fd,
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg({ type: "err", text: json.error || "Upload failed" });
    setMsg({ type: "ok", text: `Uploaded ${files.length} image(s).` });
    setFiles([]);
    setAlt("");
    load();
  };

  const removeImage = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    const res = await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) load();
    else setMsg({ type: "err", text: "Delete failed" });
  };

  const saveEdit = async (id: string) => {
    const res = await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ id, tag: editTag, alt: editAlt }),
    });
    if (res.ok) {
      setEditing(null);
      load();
    } else setMsg({ type: "err", text: "Update failed" });
  };

  return (
    <div className="space-y-10">
      {/* Shared datalist for tag inputs */}
      <datalist id="gallery-tags">
        {tags.map((t) => (
          <option key={t.id} value={t.name} />
        ))}
      </datalist>

      {/* Tag management */}
      <div className="bg-[#11191f] border border-white/10 p-6">
        <h3 className="font-serif text-white text-xl mb-1">Tags</h3>
        <p className="text-gray-500 text-xs mb-5">
          Tags become the tabs on the public gallery page.
        </p>

        <div className="flex gap-2 mb-5 max-w-md">
          <input
            className={field}
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTag()}
            placeholder="New tag name"
          />
          <button
            type="button"
            onClick={addTag}
            className="shrink-0 bg-[#c5a367] hover:bg-white text-black px-5 text-[12px] font-bold uppercase tracking-[1.5px] transition-colors"
          >
            Add
          </button>
        </div>

        {tagMsg && <p className="text-red-400 text-sm mb-3">{tagMsg}</p>}

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => {
            const count = images.filter((i) => i.tag === t.name).length;
            return editingTagId === t.id ? (
              <div
                key={t.id}
                className="flex items-center gap-1 border border-[#c5a367]/40 p-1"
              >
                <input
                  aria-label="Tag name"
                  placeholder="Tag name"
                  className="bg-[#0a0f12] border border-white/10 py-1 px-2 text-white text-xs w-32 focus:outline-none focus:border-[#c5a367]"
                  value={editTagName}
                  onChange={(e) => setEditTagName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && renameTag(t.id, t.name)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => renameTag(t.id, t.name)}
                  className="bg-[#c5a367] text-black px-2 py-1 text-[10px] font-bold uppercase"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTagId(null)}
                  className="text-gray-400 px-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                key={t.id}
                className="flex items-center gap-2 border border-white/10 pl-3 pr-1 py-1"
              >
                <span className="text-gray-200 text-xs font-sans">
                  {t.name}
                  <span className="text-gray-600 ml-1.5">({count})</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTagId(t.id);
                    setEditTagName(t.name);
                  }}
                  className="text-gray-400 hover:text-[#c5a367] text-[10px] uppercase px-1"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteTag(t.id, t.name)}
                  className="text-red-400 hover:text-red-300 text-[10px] uppercase px-1"
                >
                  Del
                </button>
              </div>
            );
          })}
          {tags.length === 0 && (
            <p className="text-gray-500 text-sm">No tags yet. Add one above.</p>
          )}
        </div>
      </div>

      {/* Upload form */}
      <div className="bg-[#11191f] border border-white/10 p-6">
        <h3 className="font-serif text-white text-xl mb-5">Upload Images</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className={label}>
              Tag <span className="text-red-500">*</span>
            </label>
            <input
              className={field}
              list="gallery-tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Pick a tag or type a new one"
            />
          </div>
          <div>
            <label className={label}>Alt text (optional)</label>
            <input
              className={field}
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Defaults to the tag if left empty"
            />
          </div>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            addFiles(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed p-8 text-center transition-colors ${
            dragOver ? "border-[#c5a367] bg-[#c5a367]/5" : "border-white/15"
          }`}
        >
          <p className="text-gray-400 text-sm mb-3">
            Drag &amp; drop images here, or
          </p>
          <label className="inline-block bg-[#c5a367] hover:bg-white text-black px-5 py-2 text-[12px] font-bold uppercase tracking-[1.5px] cursor-pointer transition-colors">
            Browse files
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-5">
            <p className="text-gray-400 text-xs mb-3">
              {files.length} file(s) selected
            </p>
            <div className="flex flex-wrap gap-3">
              {files.map((f, i) => (
                <div key={i} className="relative w-20 h-20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(f)}
                    alt=""
                    className="w-full h-full object-cover border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, j) => j !== i))
                    }
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {msg && (
          <p
            className={`mt-4 text-sm ${
              msg.type === "ok" ? "text-green-400" : "text-red-400"
            }`}
          >
            {msg.text}
          </p>
        )}

        <button
          type="button"
          onClick={upload}
          disabled={busy}
          className="mt-5 bg-[#c5a367] hover:bg-white text-black px-8 py-3 text-[12px] font-black uppercase tracking-[2px] transition-colors disabled:opacity-50"
        >
          {busy ? "Uploading…" : "Upload"}
        </button>
      </div>

      {/* Existing images */}
      <div>
        <h3 className="font-serif text-white text-xl mb-5">
          Gallery ({images.length})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-[#11191f] border border-white/10 overflow-hidden"
            >
              <div className="relative aspect-square bg-white/5">
                {!loaded.has(img.id) && (
                  <div className="skeleton absolute inset-0" />
                )}
                {/* Optimized thumbnail: Next serves a small resized WebP sized to
                    the grid cell instead of the full-res original, and loads
                    lazily, so the admin grid no longer hangs with many images. */}
                <Image
                  src={img.image_url}
                  alt={img.alt || img.tag}
                  fill
                  quality={60}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  onLoad={() => markLoaded(img.id)}
                  className={`object-cover transition-opacity duration-500 ${
                    loaded.has(img.id) ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              <div className="p-3">
                {editing === img.id ? (
                  <div className="space-y-2">
                    <input
                      className={field}
                      list="gallery-tags"
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value)}
                      placeholder="Tag"
                    />
                    <input
                      className={field}
                      value={editAlt}
                      onChange={(e) => setEditAlt(e.target.value)}
                      placeholder="Alt"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => saveEdit(img.id)}
                        className="flex-1 bg-[#c5a367] text-black py-1.5 text-[11px] font-bold uppercase"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className="flex-1 border border-white/15 text-gray-300 py-1.5 text-[11px] uppercase"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-[#c5a367] text-[11px] font-bold uppercase tracking-[1px] truncate">
                      {img.tag}
                    </p>
                    <p className="text-gray-500 text-[11px] truncate mb-3">
                      {img.alt}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(img.id);
                          setEditTag(img.tag);
                          setEditAlt(img.alt || "");
                        }}
                        className="flex-1 border border-white/15 text-gray-300 py-1.5 text-[11px] uppercase hover:border-[#c5a367] hover:text-[#c5a367]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="flex-1 border border-red-500/40 text-red-400 py-1.5 text-[11px] uppercase hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;
