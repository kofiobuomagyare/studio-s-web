import { useEffect, useRef } from "react";

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

/* Shared focus management for portalled dialogs and lightboxes.
   - moves focus into the dialog,
   - keeps Tab / Shift+Tab inside it,
   - closes on Escape,
   - makes the app root inert while it is open,
   - restores the previously focused control on close. */
export function useDialogFocusTrap({ open, onClose, dialogRef, initialFocusRef, onKeyDown }) {
  const closeRef = useRef(onClose);
  const keyDownRef = useRef(onKeyDown);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    keyDownRef.current = onKeyDown;
  }, [onKeyDown]);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement;
    const root = document.getElementById("root");
    const wasInert = root?.inert ?? false;
    const previousOverflow = document.body.style.overflow;

    if (root) root.inert = true;
    document.body.style.overflow = "hidden";

    const getDialog = () => dialogRef?.current;
    const focusable = () => {
      const dialog = getDialog();
      if (!dialog) return [];
      return Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.getClientRects().length > 0);
    };

    const focusInitial = () => {
      const target = initialFocusRef?.current || focusable()[0] || getDialog();
      target?.focus?.();
    };
    const raf = requestAnimationFrame(focusInitial);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current?.();
        return;
      }

      if (event.key === "Tab") {
        const items = focusable();
        if (!items.length) {
          event.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const dialog = getDialog();
        const outsideDialog = !dialog?.contains(document.activeElement);

        if (event.shiftKey && (document.activeElement === first || outsideDialog)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || outsideDialog)) {
          event.preventDefault();
          first.focus();
        }
      }

      keyDownRef.current?.(event);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      if (root) root.inert = wasInert;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [open, dialogRef, initialFocusRef]);
}
