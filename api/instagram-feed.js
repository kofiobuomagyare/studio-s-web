import { instagramIsConfigured, readInstagramFeed, syncInstagramFeed } from "../server/instagram.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!instagramIsConfigured()) {
    return res.status(503).json({ error: "Instagram gallery is not configured yet.", code: "instagram_not_configured" });
  }

  try {
    const previous = await readInstagramFeed();
    try {
      const feed = previous?.lastSyncedAt && Date.now() - Date.parse(previous.lastSyncedAt) < 5 * 60 * 1000
        ? previous
        : await syncInstagramFeed();
      return res.status(200).json({ posts: feed.posts, lastSyncedAt: feed.lastSyncedAt, stale: false });
    } catch (error) {
      console.error("Instagram feed synchronization failed.", error?.name ?? "UnknownError");
      if (previous?.posts.length) {
        return res.status(200).json({
          posts: previous.posts,
          lastSyncedAt: previous.lastSyncedAt,
          stale: true,
          warning: "The latest Instagram update could not be loaded. Showing saved posts instead.",
        });
      }
      return res.status(502).json({ error: "Instagram posts could not be loaded. Please try again later." });
    }
  } catch (error) {
    console.error("Instagram feed storage could not be read.", error?.name ?? "UnknownError");
    return res.status(503).json({ error: "The Instagram gallery is temporarily unavailable." });
  }
}
