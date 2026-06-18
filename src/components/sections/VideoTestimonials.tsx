'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { videoStories, type VideoStory } from '@/data/stories';
import { Photo } from '@/components/ui/Photo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Play, Close, Clock } from '@/components/ui/icons';

export function VideoTestimonials() {
  const [active, setActive] = useState<VideoStory | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <section className="bg-cream-100/70 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="In their own words"
          title="Watch their stories"
          intro="Press play to hear how a single rescue became a whole life. Each short film follows one child from where they began to where they are now."
        />

        <Reveal stagger={0.1} className="mt-14 grid gap-6 md:grid-cols-3">
          {videoStories.map((video) => (
            <button
              key={video.slug}
              type="button"
              onClick={() => setActive(video)}
              className="group relative overflow-hidden rounded-3xl text-left shadow-soft transition-all duration-500 ease-horizon hover:-translate-y-1.5 hover:shadow-lift"
            >
              <Photo
                src={video.poster}
                alt={`${video.name} story film`}
                seed={video.seed}
                tone="dawn"
                className="aspect-video w-full transition-transform duration-[1.4s] ease-horizon group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/95 text-horizon-700 shadow-lift transition-transform duration-500 group-hover:scale-110">
                <Play className="ml-1 h-6 w-6" />
              </span>
              <div className="absolute inset-x-5 bottom-5">
                <h3 className="font-serif text-xl text-cream-50">{video.title}</h3>
                <div className="mt-1 flex items-center gap-3 text-sm text-cream-100/80">
                  <span>{video.name}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {video.duration}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </Reveal>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-black shadow-lift"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close video"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink/50 text-cream-50 backdrop-blur transition-colors hover:bg-ink/70"
              >
                <Close className="h-5 w-5" />
              </button>
              <video
                className="aspect-video w-full bg-black"
                src={active.video}
                poster={active.poster}
                controls
                autoPlay
                muted
                playsInline
              />
              <div className="flex items-center justify-between gap-4 bg-horizon-950 px-5 py-4">
                <div>
                  <h3 className="font-serif text-lg text-cream-50">{active.title}</h3>
                  <p className="text-sm text-cream-200/70">{active.name}</p>
                </div>
                <span className="text-xs text-cream-200/60">A Horizon story film</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
