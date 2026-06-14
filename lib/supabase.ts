import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type GalleryImage = {
  id: string;
  tag: string;
  image_url: string;
  storage_path: string;
  alt: string | null;
  created_at: string;
};

export type GalleryTag = {
  id: string;
  name: string;
  created_at: string;
};

export type Blog = {
  id: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  slug: string;
  featured_image: string | null;
  featured_image_path: string | null;
  content: string;
  created_at: string;
  updated_at: string;
};

let browserClient: SupabaseClient | null = null;

/** Public (anon) client. Returns null if env vars are not configured. */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  if (!browserClient) browserClient = createClient(url, anon);
  return browserClient;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getGalleryImages:", error.message);
    return [];
  }
  return (data as GalleryImage[]) ?? [];
}

export async function getBlogs(): Promise<Blog[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getBlogs:", error.message);
    return [];
  }
  return (data as Blog[]) ?? [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getBlogBySlug:", error.message);
    return null;
  }
  return (data as Blog) ?? null;
}
