'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { galleryCategories, galleryItems, type GalleryItem } from '@/data/content';
import { photos } from '@/lib/images';
import { Photo } from '@/components/ui/Photo';
import { ArrowLeft, ArrowRight, Close, Search } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

const ASPECT: Record<GalleryItem['span'], string> = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[4/3]',
  normal: 'aspect-square',
};

export function GalleryMasonry() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter],
  );

  const close = useCallback(() => setLightbox(null), []);
  const go = useCallback(
    (dir: number) => {
      setLightbox((cur) => {
        if (cur === null) return cur;
        return (cur + dir + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, go]);

  const current = lightbox !== null ? items[lightbox] : null;

  return (
    <section className="py-12 sm:py-16">
      <div className="container-x">
        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-horizon',
                filter === cat
                  ? 'border-horizon-600 bg-horizon-600 text-cream-50 shadow-soft'
                  : 'border-cream-300/80 bg-cream-50 text-ink-soft hover:border-horizon-300 hover:text-horizon-700',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry */}
        <motion.div layout className="gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightbox(i)}
                className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl shadow-soft"
              >
                <div className="relative">
                  <Photo
                    src={item.photo ? photos[item.photo].src : undefined}
                    alt={item.title}
                    seed={item.seed}
                    tone={item.tone}
                    className={cn('w-full transition-transform duration-[1.4s] ease-horizon group-hover:scale-105', ASPECT[item.span])}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/75 via-ink/0 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream-50/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-horizon-700">
                      {item.category}
                    </span>
                    <p className="mt-2 font-serif text-lg text-cream-50">{item.title}</p>
                  </div>
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/90 text-horizon-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <Search className="h-4 w-4" />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              aria-label="Close gallery"
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20"
            >
              <Close className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20 sm:left-8"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20 sm:right-8"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className="overflow-hidden rounded-3xl shadow-lift">
                <Photo
                  src={current.photo ? photos[current.photo].src : undefined}
                  alt={current.title}
                  seed={current.seed}
                  tone={current.tone}
                  className="max-h-[72vh] w-full"
                  sizes="100vw"
                  priority
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-cream-50">
                <div>
                  <p className="font-serif text-xl">{current.title}</p>
                  <p className="text-sm text-cream-200/70">{current.category}</p>
                </div>
                <span className="text-sm text-cream-200/60">
                  {(lightbox ?? 0) + 1} of {items.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
