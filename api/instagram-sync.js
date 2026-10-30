import { timingSafeEqual } from "node:crypto";
import { instagramIsConfigured, syncInstagramFeed } from "../server/instagram.js";

function isAuthorized(req) {
  const secret = process.env.CRON_SECRET;
  const authorization = req.headers.authorization ?? "";
  if (!secret || !authorization.startsWith("Bearer ")) return false;
  const supplied = Buffer.from(authorization.slice(7));
  const expected = Buffer.from(secret);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!isAuthorized(req)) return res.status(401).json({ error: "Unauthorized." });
  if (!instagramIsConfigured()) {
    return res.status(503).json({ error: "Instagram synchronization is not configured." });
  }

  try {
    const feed = await syncInstagramFeed({ force: true });
    return res.status(200).json({ ok: true, postCount: feed.posts.length, syncedAt: feed.lastSyncedAt });
  } catch (error) {
    console.error("Scheduled Instagram synchronization failed.", error?.name ?? "UnknownError");
    return res.status(502).json({ error: "Instagram synchronization failed. Check the server configuration and try again." });
  }
}
