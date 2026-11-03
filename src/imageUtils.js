/* Small helpers for the remote editorial photography. Unsplash URLs accept
   width/quality parameters, so we can offer a real srcset without adding a
   build-time image pipeline. */
export function unsplashWidth(url, width) {
  return url.replace(/([?&])w=\d+/, `$1w=${width}`);
}

export function unsplashSrcSet(url, widths = [480, 800, 1200, 1600]) {
  return widths.map((width) => `${unsplashWidth(url, width)} ${width}w`).join(", ");
}
