// Post-processes raw CMS blog HTML (from the admin's code editor) so the
// article page can render a table of contents and a responsive layout
// without requiring the admin to hand-write ids or wrap tables themselves.

export type BlogHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogContentSegment =
  | { type: "html"; html: string }
  | { type: "banner" };

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function processBlogContent(rawHtml: string): {
  segments: BlogContentSegment[];
  headings: BlogHeading[];
} {
  const headings: BlogHeading[] = [];
  const usedIds = new Set<string>();

  // Give every h2/h3 a stable, unique id so the TOC can link to it.
  let html = rawHtml.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, inner) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return match;

      const base = slugify(text) || "section";
      let id = base;
      let i = 2;
      while (usedIds.has(id)) id = `${base}-${i++}`;
      usedIds.add(id);
      headings.push({ id, text, level: Number(level) as 2 | 3 });

      const cleanedAttrs = attrs.replace(/\s+id="[^"]*"/i, "");
      return `<h${level}${cleanedAttrs} id="${id}">${inner}</h${level}>`;
    }
  );

  // Wrap tables so they scroll horizontally on narrow screens instead of
  // breaking the page layout.
  html = html.replace(
    /<table[\s\S]*?<\/table>/gi,
    (match) => `<div class="table-scroll">${match}</div>`
  );

  // Split the content once, roughly mid-article, so a booking banner can be
  // dropped between two segments. Prefer splitting right before a heading
  // so the banner lands on a clean section boundary.
  const h2Matches = [...html.matchAll(/<h2[^>]*>[\s\S]*?<\/h2>/gi)];
  let splitIndex = -1;
  if (h2Matches.length >= 3) {
    splitIndex = h2Matches[Math.floor(h2Matches.length / 2)].index ?? -1;
  } else if (h2Matches.length === 2) {
    splitIndex = h2Matches[1].index ?? -1;
  }
  if (splitIndex === -1) {
    const mid = Math.floor(html.length / 2);
    const closeTag = html.indexOf("</p>", mid);
    splitIndex = closeTag !== -1 ? closeTag + 4 : -1;
  }

  const segments: BlogContentSegment[] = [];
  if (splitIndex > 0 && splitIndex < html.length - 20) {
    segments.push({ type: "html", html: html.slice(0, splitIndex) });
    segments.push({ type: "banner" });
    segments.push({ type: "html", html: html.slice(splitIndex) });
  } else {
    segments.push({ type: "html", html });
  }

  return { segments, headings };
}
