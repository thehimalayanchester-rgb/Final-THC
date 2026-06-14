-- ============================================================================
-- The Himalayan Chester — Supabase schema
-- Run this in the Supabase SQL editor (it is idempotent / safe to re-run).
-- ============================================================================

-- ---------- Tables ----------------------------------------------------------

create table if not exists public.gallery_images (
  id            uuid primary key default gen_random_uuid(),
  tag           text not null,
  image_url     text not null,
  storage_path  text not null,
  alt           text,
  created_at    timestamptz not null default now()
);

create table if not exists public.gallery_tags (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  created_at  timestamptz not null default now()
);

create table if not exists public.blogs (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  meta_title          text,
  meta_description    text,
  slug                text not null unique,
  featured_image      text,
  featured_image_path text,
  content             text not null default '',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists gallery_images_tag_idx on public.gallery_images (tag);
create index if not exists blogs_slug_idx on public.blogs (slug);

-- keep updated_at fresh on blog edits
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at
  before update on public.blogs
  for each row execute function public.set_updated_at();

-- ---------- Row Level Security ----------------------------------------------
-- Public can READ. All writes happen server-side with the service role key,
-- which BYPASSES RLS — so we deliberately add no anon insert/update/delete
-- policies. This keeps the public anon key read-only.

alter table public.gallery_images enable row level security;
alter table public.gallery_tags enable row level security;
alter table public.blogs enable row level security;

drop policy if exists "Public read gallery" on public.gallery_images;
create policy "Public read gallery"
  on public.gallery_images for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read gallery tags" on public.gallery_tags;
create policy "Public read gallery tags"
  on public.gallery_tags for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read blogs" on public.blogs;
create policy "Public read blogs"
  on public.blogs for select
  to anon, authenticated
  using (true);

-- ---------- Storage buckets -------------------------------------------------

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = true;

-- Public read for both buckets (uploads/deletes go through the service role).
drop policy if exists "Public read gallery bucket" on storage.objects;
create policy "Public read gallery bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "Public read blog bucket" on storage.objects;
create policy "Public read blog bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'blog-images');

-- Keep the tags table in sync with any tags already used by images.
insert into public.gallery_tags (name)
select distinct tag from public.gallery_images
on conflict (name) do nothing;

-- ---------- Dummy blog ------------------------------------------------------

insert into public.blogs (title, meta_title, meta_description, slug, featured_image, content)
values (
  'Discovering the Magic of Manali in Winter',
  'Manali in Winter | The Himalayan Chester',
  'A guide to snowfall, cosy mountain stays and authentic Pahari culture in Manali during the winter season.',
  'discovering-manali-in-winter',
  null,
  '<p>When the first snow dusts the deodar forests, Manali transforms into something out of a storybook. The crisp mountain air, the warmth of a crackling bonfire, and the slow rhythm of Pahari life make winter the most magical season to visit.</p>
<h2>Why Visit in Winter?</h2>
<p>Fewer crowds, dramatic snow-capped vistas, and the chance to experience the Himalayas at their most serene. Whether you are chasing snowfall or simply seeking stillness, winter rewards the unhurried traveller.</p>
<h2>What to Do</h2>
<ul>
  <li>Wake up to sunrise over the snow-laden peaks from your suite.</li>
  <li>Warm up with traditional Himachali Dham and local teas.</li>
  <li>Take a guided walk through quiet, frost-covered trails.</li>
  <li>End the day beside a bonfire under a sky full of stars.</li>
</ul>
<blockquote>The mountains do not shout — they whisper. Winter is when you finally hear them.</blockquote>
<p>At The Himalayan Chester, every winter stay is wrapped in warmth, heritage and the quiet luxury of the hills. We can''t wait to host you.</p>'
)
on conflict (slug) do nothing;
