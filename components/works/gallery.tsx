'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { IconChevronLeft, IconChevronRight, IconPhoto, IconX, IconZoomIn, IconZoomOut } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

export type GalleryImage = { src: string; alt: string };

const ZOOM = 2.4;

export function WorkGallery({ images, accentBar }: { images: GalleryImage[]; accentBar: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');

  const open = index !== null;

  /* the React Compiler memoizes these; manual useCallback would defeat it */
  const close = () => {
    setIndex(null);
    setZoomed(false);
  };

  const step = (delta: number) => {
    setZoomed(false);
    setOrigin('50% 50%');
    setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length));
  };

  /* keyboard + scroll lock while the lightbox is open */
  useEffect(() => {
    if (index === null) return;
    const total = images.length;
    const move = (delta: number) => {
      setZoomed(false);
      setOrigin('50% 50%');
      setIndex((i) => (i === null ? i : (i + delta + total) % total));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIndex(null);
        setZoomed(false);
      }
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [index, images.length]);

  const toggleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomed) {
      setZoomed(false);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
    setZoomed(true);
  };

  if (!images.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-950 dark:text-zinc-100">
        <IconPhoto className="size-4 text-zinc-500" aria-hidden />
        Screenshots
        <span className="font-mono text-[11px] font-normal text-zinc-400">{images.length}</span>
      </h2>

      {/* grid: no horizontal scrolling — the page simply gets taller */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-16/10 w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            aria-label={`Open image ${i + 1}: ${img.alt}`}
          >
            <span className={cn('absolute inset-x-0 top-0 z-10 h-0.5', accentBar)} aria-hidden />
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 92vw, 460px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-center bg-zinc-950/0 opacity-0 transition group-hover:bg-zinc-950/30 group-hover:opacity-100"
              aria-hidden
            >
              <IconZoomIn className="size-7 text-white drop-shadow" />
            </span>
          </button>
        ))}
      </div>

      {/* lightbox */}
      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Image viewer">
          <div className="flex items-center justify-between gap-4 px-4 py-3 text-zinc-300">
            <span className="font-mono text-xs tabular-nums">
              {(index ?? 0) + 1} / {images.length}
            </span>
            <span className="min-w-0 flex-1 truncate text-center text-xs text-zinc-400">{images[index ?? 0].alt}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                className="rounded-full p-2 transition-colors hover:bg-white/10"
              >
                {zoomed ? <IconZoomOut className="size-5" /> : <IconZoomIn className="size-5" />}
              </button>
              <button type="button" onClick={close} aria-label="Close" className="rounded-full p-2 transition-colors hover:bg-white/10">
                <IconX className="size-5" />
              </button>
            </div>
          </div>

          <div
            className="relative flex-1 overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div
              className={cn('absolute inset-4 transition-transform duration-300 ease-out sm:inset-8', zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in')}
              style={{ transform: `scale(${zoomed ? ZOOM : 1})`, transformOrigin: origin }}
              onClick={toggleZoom}
            >
              <Image
                key={images[index ?? 0].src}
                src={images[index ?? 0].src}
                alt={images[index ?? 0].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-zinc-900/70 p-2.5 text-zinc-200 transition-colors hover:bg-zinc-900 sm:left-4"
                >
                  <IconChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-zinc-900/70 p-2.5 text-zinc-200 transition-colors hover:bg-zinc-900 sm:right-4"
                >
                  <IconChevronRight className="size-6" />
                </button>
              </>
            ) : null}
          </div>

          {/* filmstrip */}
          {images.length > 1 ? (
            <div className="flex justify-center gap-2 overflow-x-auto px-4 py-3">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => {
                    setZoomed(false);
                    setOrigin('50% 50%');
                    setIndex(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    'relative aspect-16/10 h-12 shrink-0 overflow-hidden rounded-md border transition',
                    i === index ? 'border-white/80 opacity-100' : 'border-white/20 opacity-50 hover:opacity-80',
                  )}
                >
                  <Image src={img.src} alt="" fill sizes="80px" className="object-cover object-top" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
