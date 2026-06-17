'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { videoStories } from '@/data/stories';
import { photos } from '@/lib/images';
import { Photo } from '@/components/ui/Photo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Play, Close, Clock } from '@/components/ui/icons';

export function VideoTestimonials() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-cream-100/70 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="In their own words"
          title="Video testimonials"
          intro="Sometimes a story is best told by the person who lived it. Press play and meet them."
        />

        <Reveal stagger={0.1} className="mt-14 grid gap-6 md:grid-cols-3">
          {videoStories.map((video, i) => (
            <button
              key={video.title}
              type="button"
              onClick={() => setActive(i)}
              className="group relative overflow-hidden rounded-4xl text-left shadow-soft transition-all duration-500 ease-horizon hover:-translate-y-1.5 hover:shadow-lift"
            >
              <Photo
                src={photos[video.photo].src}
                alt={video.title}
                seed={photos[video.photo].seed}
                tone={photos[video.photo].tone}
                className="aspect-[4/5] w-full transition-transform duration-[1.4s] ease-horizon group-hover:scale-[1.05]"
                sizes="(max-width: 768px) 100vw, 33vw"
                overlay
              />
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
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/80 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-horizon-950 shadow-lift"
            >
              <div className="relative aspect-video">
                <Photo
                  src={photos[videoStories[active].photo].src}
                  alt={videoStories[active].title}
                  seed={photos[videoStories[active].photo].seed}
                  tone={photos[videoStories[active].photo].tone}
                  className="h-full w-full"
                  sizes="100vw"
                  overlay
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-cream-50">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-50/95 text-horizon-700">
                    <Play className="ml-1 h-6 w-6" />
                  </span>
                  <p className="mt-4 max-w-sm px-6 text-sm text-cream-100/80">
                    Video stories are shared with the consent of each child and family to protect their
                    dignity and safety.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <h3 className="font-serif text-lg text-cream-50">{videoStories[active].title}</h3>
                  <p className="text-sm text-cream-200/70">{videoStories[active].name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20"
                >
                  <Close className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
