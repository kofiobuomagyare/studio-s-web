import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import BRAND_IMAGE_ARCHIVE from "../instagramArchive.js";

async function fetchInstagramFeed(signal) {
  const response = await fetch("/api/instagram-feed", { signal, headers: { Accept: "application/json" } });
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new Error("The Instagram feed endpoint is unavailable.");
  }
  const payload = await response.json();
  if (!response.ok && payload.code === "instagram_not_configured") return { archiveFallback: true };
  if (!response.ok) throw new Error(payload.error || "Instagram posts could not be loaded.");
  return payload;
}

function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-GH", { dateStyle: "medium" }).format(date);
}

export default function InstagramGallery({ preview = false }) {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [warning, setWarning] = useState("");
  const [lightbox, setLightbox] = useState(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const [syncUnavailable, setSyncUnavailable] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState({ page: 1, pages: 1, canPrevious: false, canNext: false });
  const [isDragging, setIsDragging] = useState(false);
  const hasLoadedFeed = useRef(false);
  const carouselRef = useRef(null);
  const dragRef = useRef(null);
  const draggedRef = useRef(false);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const lightboxWasOpenRef = useRef(false);

  const showArchive = useCallback((message) => {
    hasLoadedFeed.current = true;
    setPosts(BRAND_IMAGE_ARCHIVE);
    setWarning(message);
    setSyncUnavailable(true);
    setStatus("ready");
  }, []);

  const applyFeed = useCallback((payload) => {
    if (payload.archiveFallback) {
      showArchive("Showing the supplied Studio S photo archive. Connect an Instagram Professional account to enable automatic post sync.");
      return;
    }
    hasLoadedFeed.current = true;
    setPosts([...(Array.isArray(payload.posts) ? payload.posts : []), ...BRAND_IMAGE_ARCHIVE]);
    setWarning(payload.warning || "");
    setSyncUnavailable(false);
    setStatus("ready");
  }, [showArchive]);

  const handleFeedError = useCallback((error) => {
    if (error.name === "AbortError") return;
    if (!hasLoadedFeed.current) {
      showArchive("Instagram could not be reached. Showing the supplied Studio S photo archive instead.");
      return;
    }
    setStatus("error");
    setWarning("The latest Instagram update could not be loaded. Saved images remain available.");
  }, [showArchive]);

  const loadFeed = useCallback((signal) => {
    fetchInstagramFeed(signal).then(applyFeed).catch(handleFeedError);
  }, [applyFeed, handleFeedError]);

  useEffect(() => {
    const controller = new AbortController();
    fetchInstagramFeed(controller.signal).then(applyFeed).catch(handleFeedError);
    return () => controller.abort();
  }, [applyFeed, handleFeedError]);

  const images = useMemo(
    () => posts.flatMap((post) => (post.images ?? []).map((image) => ({ ...image, post }))),
    [posts]
  );
  const shownPosts = preview ? posts.slice(0, 6) : posts.slice(0, visibleCount);
  const previewImages = preview ? images.slice(0, 12) : [];
  const isLightboxOpen = lightbox !== null;

  function closeLightbox() {
    setLightbox(null);
  }

  const updateCarouselPosition = useCallback(() => {
    const track = carouselRef.current;
    if (!track) return;
    const pages = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
    const page = Math.min(pages, Math.floor((track.scrollLeft + 1) / track.clientWidth) + 1);
    setCarouselPosition({
      page,
      pages,
      canPrevious: track.scrollLeft > 1,
      canNext: track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
    });
  }, []);

  function scrollCarousel(direction) {
    const track = carouselRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  function onCarouselPointerDown(event) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, scrollLeft: event.currentTarget.scrollLeft };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onCarouselPointerMove(event) {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    const distance = event.clientX - dragRef.current.x;
    if (Math.abs(distance) > 5) draggedRef.current = true;
    event.currentTarget.scrollLeft = dragRef.current.scrollLeft - distance;
  }

  function onCarouselPointerUp(event) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    window.setTimeout(() => { draggedRef.current = false; }, 0);
  }

  useEffect(() => {
    if (!isLightboxOpen) {
      if (lightboxWasOpenRef.current && previousFocusRef.current instanceof HTMLElement && previousFocusRef.current.isConnected) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
      lightboxWasOpenRef.current = false;
      return undefined;
    }
    lightboxWasOpenRef.current = true;
    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") setLightbox((current) => (current + 1) % images.length);
      if (event.key === "ArrowLeft") setLightbox((current) => (current - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isLightboxOpen, images.length]);

  useEffect(() => {
    if (!preview) return undefined;
    const track = carouselRef.current;
    if (!track) return undefined;
    updateCarouselPosition();
    const observer = new ResizeObserver(updateCarouselPosition);
    observer.observe(track);
    return () => observer.disconnect();
  }, [preview, previewImages.length, updateCarouselPosition]);

  if (status === "loading" && !posts.length) {
    return <p className="instagram-state" role="status">Loading the latest work from Instagram…</p>;
  }

  if (status === "error" && !posts.length) {
    return (
      <div className="instagram-state" role="alert">
        <p>{warning}</p>
        <button className="btn btn-ghost" type="button" onClick={() => { setStatus("loading"); loadFeed(); }}>Try again</button>
      </div>
    );
  }

  if (status === "ready" && !posts.length) {
    return (
      <div className="instagram-state">
        <p>No Instagram posts are available yet. Follow along for the latest Studio S stories.</p>
        <a className="btn btn-ghost" href="https://www.instagram.com/studio_s.gh/" target="_blank" rel="noopener noreferrer">
          Visit Instagram
        </a>
      </div>
    );
  }

  return (
    <>
      {warning && !syncUnavailable && <p className="instagram-warning" role="status">{warning}</p>}
      {status === "loading" && <p className="instagram-refreshing" role="status">Checking for new posts…</p>}
      {warning && status === "error" && (
        <button
          className="instagram-retry"
          type="button"
          onClick={() => { setStatus("loading"); loadFeed(); }}
        >Try Instagram again</button>
      )}
      {preview ? (
        <div className="instagram-showcase" aria-label="Selected Studio S images">
          <div className="instagram-carousel-controls">
            <p className="instagram-carousel-count" aria-live="polite">
              {previewImages.length ? `Collection ${carouselPosition.page} of ${carouselPosition.pages}` : "Selected Studio S photos"}
            </p>
            <div className="instagram-carousel-buttons">
              <button
                className="instagram-carousel-arrow"
                type="button"
                aria-label="Previous images"
                disabled={!carouselPosition.canPrevious}
                onClick={() => scrollCarousel(-1)}
              >←</button>
              <button
                className="instagram-carousel-arrow"
                type="button"
                aria-label="Next images"
                disabled={!carouselPosition.canNext}
                onClick={() => scrollCarousel(1)}
              >→</button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className={`instagram-carousel-track${isDragging ? " dragging" : ""}`}
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected Studio S images"
            tabIndex={0}
            onScroll={updateCarouselPosition}
            onPointerDown={onCarouselPointerDown}
            onPointerMove={onCarouselPointerMove}
            onPointerUp={onCarouselPointerUp}
            onPointerCancel={onCarouselPointerUp}
            onClickCapture={(event) => {
              if (!draggedRef.current) return;
              event.preventDefault();
              event.stopPropagation();
              draggedRef.current = false;
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                scrollCarousel(event.key === "ArrowRight" ? 1 : -1);
              }
            }}
          >
            {previewImages.map((image, index) => (
              <article className="instagram-card instagram-carousel-slide" key={image.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${previewImages.length}`}>
                <button
                  className="instagram-image"
                  type="button"
                  onClick={() => setLightbox(index)}
                  aria-label={`Preview selected Studio S photo: ${image.alt || image.post.caption?.slice(0, 80) || "Studio S image"}`}
                >
                  <img src={image.src} alt={image.alt || image.post.caption?.slice(0, 140) || "Studio S image"} loading="lazy" decoding="async" />
                </button>
                <div className="instagram-card-copy">
                  {image.post.timestamp && <time dateTime={image.post.timestamp}>{formatDate(image.post.timestamp)}</time>}
                  {image.post.caption && <p>{image.post.caption}</p>}
                  {image.post.permalink && <a href={image.post.permalink} target="_blank" rel="noopener noreferrer" draggable="false">View on Instagram ↗</a>}
                </div>
              </article>
            ))}
          </div>
          <Link className="btn btn-ghost instagram-carousel-cta" to="/gallery">View All Images</Link>
        </div>
      ) : (
      <>
      <div className="instagram-grid">
        {shownPosts.map((post) => (
          <article className="instagram-card" key={post.id}>
            <div className={`instagram-post-grid${post.images.length === 1 ? " single" : ""}`}>
              {post.images.map(({ id, src }, imageIndex) => {
                const lightboxIndex = images.findIndex((image) => image.id === id);
                return (
                  <button
                    className="instagram-image"
                    type="button"
                    key={id}
                    onClick={() => setLightbox(lightboxIndex)}
                    aria-label={`${post.permalink ? `Preview image ${imageIndex + 1} of Instagram post` : "Preview selected Studio S photo"}${post.caption ? `: ${post.caption.slice(0, 80)}` : ""}`}
                  >
                    <img src={src} alt={post.caption?.slice(0, 140) || "Studio S Instagram post"} loading="lazy" decoding="async" />
                    {imageIndex === 0 && post.images.length > 1 && (
                      <span className="instagram-carousel" aria-label={`${post.images.length} images in this post`}>▧ {post.images.length}</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="instagram-card-copy">
              {post.timestamp && <time dateTime={post.timestamp}>{formatDate(post.timestamp)}</time>}
              {post.caption && <p>{post.caption}</p>}
              {post.permalink && <a href={post.permalink} target="_blank" rel="noopener noreferrer">View on Instagram ↗</a>}
            </div>
          </article>
        ))}
      </div>
      {!preview && visibleCount < posts.length && (
        <div className="instagram-more">
          <button className="btn btn-ghost" type="button" onClick={() => setVisibleCount((count) => count + 24)}>
            Load more posts
          </button>
        </div>
      )}
      </>
      )}
      {lightbox !== null && images[lightbox] && createPortal(
        <div
          className="lightbox open instagram-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onClick={closeLightbox}
        >
          <button ref={closeButtonRef} className="btn btn-sm lightbox-control instagram-lightbox-close" type="button" onClick={closeLightbox}>Close ×</button>
          {images.length > 1 && (
            <button
              className="btn btn-sm lightbox-control instagram-lightbox-prev"
              type="button"
              aria-label="Previous image"
              onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}
            >←</button>
          )}
          <figure className="instagram-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={images[lightbox].src} alt={images[lightbox].alt || images[lightbox].post.caption?.slice(0, 140) || "Studio S Instagram post"} />
            {images[lightbox].post.caption && <figcaption>{images[lightbox].post.caption}</figcaption>}
            {images[lightbox].post.permalink && <a href={images[lightbox].post.permalink} target="_blank" rel="noopener noreferrer">View original post on Instagram ↗</a>}
          </figure>
          {images.length > 1 && (
            <button
              className="btn btn-sm lightbox-control instagram-lightbox-next"
              type="button"
              aria-label="Next image"
              onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}
            >→</button>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
