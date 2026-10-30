import { get, put } from "@vercel/blob";

const FEED_PATH = "studio-s/instagram/feed.json";
const GRAPH_API_VERSION = process.env.INSTAGRAM_GRAPH_API_VERSION || "v26.0";
const SYNC_INTERVAL_MS = 5 * 60 * 1000;
const INITIAL_SYNC_PAGES = 5;

export function instagramIsConfigured() {
  return Boolean(
    process.env.INSTAGRAM_ACCESS_TOKEN &&
    process.env.INSTAGRAM_USER_ID &&
    (process.env.BLOB_READ_WRITE_TOKEN || (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN))
  );
}

export async function readInstagramFeed() {
  const blob = await get(FEED_PATH, { access: "public", useCache: false });
  if (!blob || blob.statusCode !== 200 || !blob.stream) return null;

  const snapshot = await new Response(blob.stream).json();
  if (!snapshot || !Array.isArray(snapshot.posts)) {
    throw new Error("Stored Instagram feed has an invalid format.");
  }
  return { ...snapshot, etag: blob.blob.etag };
}

export async function syncInstagramFeed({ force = false } = {}) {
  let stored = await readInstagramFeed();
  const lastSynced = stored?.lastSyncedAt ? Date.parse(stored.lastSyncedAt) : 0;
  if (!force && stored && Date.now() - lastSynced < SYNC_INTERVAL_MS) return stored;

  const freshPosts = await fetchInstagramPosts(!stored?.posts.length);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    if (attempt > 0) stored = await readInstagramFeed();
    const snapshot = {
      posts: mergePosts(stored?.posts ?? [], freshPosts),
      lastSyncedAt: new Date().toISOString(),
    };

    try {
      const blob = await put(FEED_PATH, JSON.stringify(snapshot), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 60,
        contentType: "application/json",
        ...(stored?.etag ? { ifMatch: stored.etag } : {}),
      });
      return { ...snapshot, etag: blob.etag };
    } catch (error) {
      if (error?.name !== "BlobPreconditionFailedError" || attempt === 2) throw error;
    }
  }

  throw new Error("Instagram feed could not be saved.");
}

async function fetchInstagramPosts(isInitialSync) {
  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!/^\d+$/.test(userId ?? "") || !/^v\d+\.\d+$/.test(GRAPH_API_VERSION)) {
    throw new Error("Instagram Graph API configuration is invalid.");
  }

  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{id,media_type,media_url,thumbnail_url}";
  const url = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${userId}/media`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", "100");
  url.searchParams.set("access_token", token);

  const posts = [];
  let nextUrl = url.toString();
  const pageLimit = isInitialSync ? INITIAL_SYNC_PAGES : 1;
  for (let page = 0; nextUrl && page < pageLimit; page += 1) {
    const requestUrl = new URL(nextUrl);
    if (requestUrl.protocol !== "https:" || requestUrl.hostname !== "graph.facebook.com") {
      throw new Error("Instagram Graph API returned an invalid pagination link.");
    }
    const response = await fetch(requestUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || payload?.error) {
      const code = payload?.error?.code;
      throw new Error(`Instagram Graph API request failed (HTTP ${response.status}${code ? `, code ${code}` : ""}).`);
    }
    if (!Array.isArray(payload?.data)) {
      throw new Error("Instagram Graph API returned an invalid media list.");
    }

    posts.push(...payload.data.map(normalizePost).filter(Boolean));
    nextUrl = typeof payload.paging?.next === "string" ? payload.paging.next : null;
  }
  return posts;
}

export function normalizePost(post) {
  if (!post?.id || !post?.timestamp || !post?.permalink) return null;
  const children = Array.isArray(post.children?.data) ? post.children.data : [];
  const media = children.length ? children : [post];
  const images = media
    .map((item) => {
      const src = item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url;
      return src && item.id ? { id: String(item.id), src } : null;
    })
    .filter(Boolean);
  if (!images.length) return null;

  return {
    id: String(post.id),
    caption: typeof post.caption === "string" ? post.caption : "",
    timestamp: post.timestamp,
    permalink: post.permalink,
    images,
  };
}

export function mergePosts(existing, incoming) {
  const posts = new Map(existing.map((post) => [post.id, post]));
  for (const post of incoming) {
    const previous = posts.get(post.id);
    const images = new Map((previous?.images ?? []).map((image) => [image.id, image]));
    for (const image of post.images) images.set(image.id, image);
    posts.set(post.id, { ...previous, ...post, images: [...images.values()] });
  }
  return [...posts.values()].sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
}
