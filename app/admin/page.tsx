"use client";
import { useEffect, useState } from "react";
import GalleryManager from "@/components/admin/GalleryManager";
import BlogManager from "@/components/admin/BlogManager";

const STORAGE_KEY = "thc_admin_pw";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<"gallery" | "blogs">("gallery");

  const verify = async (pw: string) => {
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    const json = await res.json();
    if (json.ok) {
      setPassword(pw);
      setAuthed(true);
      setError("");
      sessionStorage.setItem(STORAGE_KEY, pw);
      return true;
    }
    sessionStorage.removeItem(STORAGE_KEY);
    return false;
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      verify(saved).finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = await verify(input);
    if (!ok) setError("Incorrect password.");
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
    setInput("");
  };

  if (checking) {
    return (
      <main className="min-h-screen bg-[#0a0f12] flex items-center justify-center">
        <p className="text-gray-500 font-sans text-sm">Loading…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#0a0f12] flex items-center justify-center px-6">
        <form
          onSubmit={submit}
          className="w-full max-w-sm bg-linear-to-b from-[#11191f] to-[#0b1013] border border-white/10 border-t-4 border-t-[#c5a367] p-8 shadow-2xl"
        >
          <h1 className="font-serif text-white text-3xl mb-2">Admin</h1>
          <p className="text-gray-500 font-sans text-sm mb-6">
            Enter the password to manage gallery & blogs.
          </p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full bg-[#0a0f12] border border-white/10 py-3 px-4 text-white text-sm focus:outline-none focus:border-[#c5a367] transition-colors"
          />
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          <button
            type="submit"
            className="mt-5 w-full bg-[#c5a367] hover:bg-white text-black py-3 text-[13px] font-black uppercase tracking-[2px] transition-colors"
          >
            Enter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0f12] pt-28 lg:pt-32 pb-20 px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-white text-3xl md:text-4xl">
            Admin Dashboard
          </h1>
          <button
            type="button"
            onClick={logout}
            className="text-gray-400 text-[12px] uppercase tracking-[1.5px] hover:text-[#c5a367]"
          >
            Log out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {(["gallery", "blogs"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-[12px] font-bold uppercase tracking-[1.5px] border-b-2 -mb-px transition-colors ${
                tab === t
                  ? "border-[#c5a367] text-[#c5a367]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {t === "gallery" ? "Gallery" : "Blogs"}
            </button>
          ))}
        </div>

        {tab === "gallery" ? (
          <GalleryManager password={password} />
        ) : (
          <BlogManager password={password} />
        )}
      </div>
    </main>
  );
}
