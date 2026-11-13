"use client";

import { useCallback, useEffect, useState } from "react";

export type GalleryImage = { src: string; caption: string };

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  if (images.length === 0) {
    return <p className="text-[var(--steel)]">Galeride henüz fotoğraf yok.</p>;
  }

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden bg-[#00215b] text-left"
              aria-label={`${image.caption} fotoğrafını büyüt`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.caption}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="btn btn-ghost btn-sm absolute right-4 top-4"
          >
            Kapat
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.caption}
            className="max-h-[80vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 ? (
            <div className="mt-4 flex gap-3" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => step(-1)} className="btn btn-ghost btn-sm">
                Önceki
              </button>
              <button type="button" onClick={() => step(1)} className="btn btn-ghost btn-sm">
                Sonraki
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
