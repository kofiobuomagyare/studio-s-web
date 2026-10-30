import assert from "node:assert/strict";
import test from "node:test";
import { mergePosts, normalizePost } from "./instagram.js";

test("normalizes carousel images and uses video thumbnails", () => {
  const post = normalizePost({
    id: "post-1",
    caption: "A story from the studio",
    timestamp: "2026-10-30T12:00:00+0000",
    permalink: "https://www.instagram.com/p/post-1/",
    media_type: "CAROUSEL_ALBUM",
    children: {
      data: [
        { id: "image-1", media_type: "IMAGE", media_url: "https://cdn.example/image-1.jpg" },
        { id: "video-1", media_type: "VIDEO", media_url: "https://cdn.example/video-1.mp4", thumbnail_url: "https://cdn.example/video-1.jpg" },
      ],
    },
  });

  assert.deepEqual(post.images, [
    { id: "image-1", src: "https://cdn.example/image-1.jpg" },
    { id: "video-1", src: "https://cdn.example/video-1.jpg" },
  ]);
});

test("merges posts and images by Instagram IDs without duplicates", () => {
  const existing = [{
    id: "post-1",
    caption: "Original caption",
    timestamp: "2026-10-29T12:00:00+0000",
    permalink: "https://www.instagram.com/p/post-1/",
    images: [
      { id: "image-1", src: "https://cdn.example/old-image.jpg" },
      { id: "image-2", src: "https://cdn.example/image-2.jpg" },
    ],
  }];
  const incoming = [
    {
      id: "post-1",
      caption: "Updated caption",
      timestamp: "2026-10-29T12:00:00+0000",
      permalink: "https://www.instagram.com/p/post-1/",
      images: [
        { id: "image-1", src: "https://cdn.example/new-image.jpg" },
        { id: "image-3", src: "https://cdn.example/image-3.jpg" },
      ],
    },
    {
      id: "post-2",
      caption: "A newer post",
      timestamp: "2026-10-30T12:00:00+0000",
      permalink: "https://www.instagram.com/p/post-2/",
      images: [{ id: "image-4", src: "https://cdn.example/image-4.jpg" }],
    },
  ];

  const merged = mergePosts(existing, incoming);
  assert.equal(merged.length, 2);
  assert.deepEqual(merged.map((post) => post.id), ["post-2", "post-1"]);
  assert.equal(merged[1].caption, "Updated caption");
  assert.deepEqual(merged[1].images.map((image) => image.id), ["image-1", "image-2", "image-3"]);
  assert.equal(merged[1].images[0].src, "https://cdn.example/new-image.jpg");
});
