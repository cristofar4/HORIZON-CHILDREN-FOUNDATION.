'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { timeline } from '@/data/impact';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export function ImpactTimeline() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    const ctx = gsap.context(() => {
      const fill = q('.tl-fill');
      const rows = gsap.utils.toArray<HTMLElement>(q('.tl-row'));

      if (!prefersReducedMotion()) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 60%', end: 'bottom 65%', scrub: 0.6 },
          },
        );
      }

      rows.forEach((row) => {
        const dot = row.querySelector('.tl-dot');
        const card = row.querySelector('.tl-card');
        if (prefersReducedMotion()) {
          gsap.set([card], { opacity: 1, y: 0 });
          dot?.classList.add('is-active');
          return;
        }
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 78%',
              onEnter: () => dot?.classList.add('is-active'),
              onLeaveBack: () => dot?.classList.remove('is-active'),
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream-100/70 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-dawn-200/30 blur-3xl"
      />
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Our journey"
          title="From one child to a movement"
          intro="Fifteen years of steady, stubborn hope. Scroll through the milestones that grew a single rescue into a foundation thousands of children call home."
        />

        <div ref={track} className="relative mx-auto mt-16 max-w-4xl">
          {/* Center line */}
          <div className="absolute left-5 top-0 h-full w-px bg-cream-300 md:left-1/2 md:-translate-x-1/2">
            <div className="tl-fill absolute inset-0 origin-top bg-gradient-to-b from-horizon-500 to-dawn-400" />
          </div>

          <div className="space-y-10 md:space-y-16">
            {timeline.map((m, i) => (
              <div
                key={m.year}
                className={cn(
                  'tl-row relative flex items-center gap-6 pl-14 md:pl-0',
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                )}
              >
                {/* Dot */}
                <span className="tl-dot absolute left-5 top-7 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-cream-300 bg-cream-50 transition-all duration-500 [&.is-active]:border-dawn-400 [&.is-active]:bg-horizon-600 md:left-1/2">
                  <span className="h-1.5 w-1.5 rounded-full bg-transparent transition-colors duration-500 [.is-active>&]:bg-cream-50" />
                </span>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className="tl-card w-full md:w-1/2">
                  <div
                    className={cn(
                      'rounded-3xl border border-cream-300/70 bg-cream-50 p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-7',
                      i % 2 === 0 ? 'md:mr-8' : 'md:ml-8',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-3xl font-semibold text-horizon-700">{m.year}</span>
                      {m.metric && (
                        <span className="rounded-full bg-dawn-100 px-3 py-1 text-xs font-semibold text-dawn-700">
                          {m.metric}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-serif text-xl tracking-tight text-ink">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
