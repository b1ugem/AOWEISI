import { useState } from "react";

// Slides are full-bleed, so the browser picks from srcset against viewport width.

const SIZES = "100vw";

export default function Slide({ slide, eager }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      className={loaded ? "slide is-loaded" : "slide"}
      src={slide.src}
      srcSet={slide.srcSet}
      sizes={SIZES}
      // Intrinsic size reserves the exact box before the bytes arrive, so
      // lazily-loaded slides never shift the scroll position.
      width={slide.width}
      height={slide.height}
      alt={`Slide ${slide.page}`}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "low"}
      decoding="async"
      draggable={false}
      onLoad={() => setLoaded(true)}
    />
  );
}
