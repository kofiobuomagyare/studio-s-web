import { useEffect } from "react";

function upsertTag(selector, create) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = create();
    document.head.appendChild(tag);
  }
  return tag;
}

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    upsertTag('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    }).setAttribute("content", description);

    // Canonical + share tags derived from the live URL so every route
    // advertises its own address (works for JS-capable crawlers; see README
    // about prerendering for full link-unfurl support).
    const url = window.location.origin + window.location.pathname;
    upsertTag('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    }).setAttribute("href", url);
    const ogImage = new URL("og-cover.jpg", window.location.origin).href;
    const pairs = [
      ['meta[property="og:title"]', "property", "og:title", title],
      ['meta[property="og:description"]', "property", "og:description", description],
      ['meta[property="og:url"]', "property", "og:url", url],
      ['meta[property="og:image"]', "property", "og:image", ogImage],
      ['meta[name="twitter:title"]', "name", "twitter:title", title],
      ['meta[name="twitter:description"]', "name", "twitter:description", description],
      ['meta[name="twitter:image"]', "name", "twitter:image", ogImage],
    ];
    for (const [sel, attr, key, value] of pairs) {
      upsertTag(sel, () => {
        const m = document.createElement("meta");
        m.setAttribute(attr, key);
        return m;
      }).setAttribute("content", value);
    }
  }, [title, description]);
}
