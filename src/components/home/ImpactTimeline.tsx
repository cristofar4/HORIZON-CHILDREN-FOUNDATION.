'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
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
            scrollTrigger: { trigger: el, start: 'top 55%', end: 'bottom 70%', scrub: 0.6 },
          },
        );
      }

      rows.forEach((row) => {
        const badge = row.querySelector('.tl-badge');
        const card = row.querySelector('.tl-card');
        if (prefersReducedMotion()) {
          gsap.set(card, { opacity: 1, y: 0 });
          badge?.classList.add('is-active');
          return;
        }
        gsap.fromTo(
          card,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              onEnter: () => badge?.classList.add('is-active'),
              onLeaveBack: () => badge?.classList.remove('is-active'),
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-1/4 h-64 w-64 rounded-full bg-horizon-100/50 blur-3xl"
      />
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Our journey"
          title="From one child to a movement"
          intro="Fifteen years of steady, stubborn hope. Scroll through the milestones that grew a single rescue into a foundation thousands of children call home."
        />

        <div ref={track} className="relative mx-auto mt-16 max-w-5xl">
          {/* Vertical line with animated fill */}
          <div className="absolute left-8 top-2 bottom-2 w-[3px] -translate-x-1/2 rounded-full bg-cream-300 md:left-1/2">
            <div className="tl-fill absolute inset-0 origin-top rounded-full bg-gradient-to-b from-horizon-500 via-horizon-500 to-dawn-400" />
          </div>

          <div className="space-y-8 md:space-y-6">
            {timeline.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <div
                  key={m.year}
                  className="tl-row relative grid grid-cols-1 items-center gap-x-8 pl-20 md:grid-cols-2 md:gap-x-16 md:pl-0"
                >
                  {/* Year badge centered on the line */}
                  <div className="tl-badge group absolute left-8 top-7 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                    <span className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-cream-300 bg-cream-50 font-serif text-sm font-bold text-ink-muted shadow-soft transition-all duration-500 ease-horizon [.is-active_&]:scale-105 [.is-active_&]:border-dawn-300 [.is-active_&]:bg-horizon-700 [.is-active_&]:text-cream-50 [.is-active_&]:shadow-lift">
                      {m.year}
                    </span>
                  </div>

                  {/* Card, alternating sides on desktop */}
                  <div
                    className={cn(
                      'tl-card md:col-span-1',
                      right ? 'md:col-start-2 md:pl-10' : 'md:col-start-1 md:pr-10 md:text-right',
                    )}
                  >
                    <div className="rounded-3xl border border-cream-300/70 bg-cream-50 p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-7">
                      {m.metric && (
                        <span
                          className={cn(
                            'inline-flex rounded-full bg-dawn-100 px-3 py-1 text-xs font-semibold text-dawn-700',
                          )}
                        >
                          {m.metric}
                        </span>
                      )}
                      <h3 className="mt-3 font-serif text-2xl tracking-tight text-ink">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
