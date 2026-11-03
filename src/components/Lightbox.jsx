import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogFocusTrap } from "../hooks.js";

export default function Lightbox({
  images,
  currentIndex = 0,
  onClose,
}) {
  const [index, setIndex] = useState(currentIndex);
  const closeButtonRef = useRef(null);
  const lightboxRef = useRef(null);

  const image = images[index];
  const total = images.length;

  const goTo = useCallback((next) => {
    setIndex(((next % total) + total) % total);
  }, [total]);

  useDialogFocusTrap({
    open: true,
    onClose,
    dialogRef: lightboxRef,
    initialFocusRef: closeButtonRef,
    onKeyDown: (event) => {
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
    },
  });

  return createPortal(
    <div
      ref={lightboxRef}
      className="lightbox open collection-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        className="btn btn-sm lightbox-control collection-lightbox-close"
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        Close ×
      </button>
      {total > 1 && (
        <button
          className="btn btn-sm lightbox-control collection-lightbox-prev"
          type="button"
          aria-label="Previous image"
          onClick={(e) => { e.stopPropagation(); goTo(index - 1); }}
        >
          ←
        </button>
      )}
      <figure className="collection-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.src}
          alt={image.alt}
          width="1080"
          height="1080"
          loading="eager"
          decoding="async"
        />
        {total > 1 && (
          <figcaption>
            {index + 1} of {total}
          </figcaption>
        )}
      </figure>
      {total > 1 && (
        <button
          className="btn btn-sm lightbox-control collection-lightbox-next"
          type="button"
          aria-label="Next image"
          onClick={(e) => { e.stopPropagation(); goTo(index + 1); }}
        >
          →
        </button>
      )}
    </div>,
    document.body
  );
}
