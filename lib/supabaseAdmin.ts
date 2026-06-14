import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const GALLERY_BUCKET = "gallery";
export const BLOG_BUCKET = "blog-images";

/** Service-role client (bypasses RLS). Server-only. Null if not configured. */
export function getAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function expectedPassword(): string {
  return process.env.ADMIN_PASSWORD || "Manali@simsa";
}

/** Validate the x-admin-password header against the configured password. */
export function isAuthorized(req: Request): boolean {
  const provided = req.headers.get("x-admin-password");
  return !!provided && provided === expectedPassword();
}

export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item"
  );
}
