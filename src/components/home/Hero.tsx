'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { HeroScene } from '@/components/home/HeroScene';
import { Magnetic } from '@/components/ui/Magnetic';
import { Heart, ArrowRight, Play, ChevronDown } from '@/components/ui/icons';

export function Hero() {
  const overlay = useRef<HTMLDivElement>(null);
  const replayRef = useRef<(() => void) | null>(null);
  const [hasReplay, setHasReplay] = useState(false);

  const onReady = useCallback((replay: () => void) => {
    replayRef.current = replay;
    setHasReplay(true);
  }, []);

  useEffect(() => {
    const el = overlay.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    if (prefersReducedMotion()) {
      gsap.set(q('[data-animate]'), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(q('[data-animate]'), { opacity: 0, y: 28 });
      gsap
        .timeline({ defaults: { ease: 'power3.out', duration: 1 } })
        .to(q('.hero-eyebrow'), { opacity: 1, y: 0 }, 0.3)
        .to(q('.hero-line'), { opacity: 1, y: 0, stagger: 0.12 }, 0.5)
        .to(q('.hero-sub'), { opacity: 1, y: 0 }, 1.1)
        .to(q('.hero-cta'), { opacity: 1, y: 0, stagger: 0.1 }, 1.3)
        .to(q('.hero-trust'), { opacity: 1, y: 0 }, 1.7)
        .to(q('.hero-cue'), { opacity: 1, y: 0 }, 2);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-horizon-950">
      <HeroScene onReady={onReady} />

      {/* Legibility scrims */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-horizon-950/85 via-horizon-950/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-horizon-950/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-horizon-950/60 to-transparent"
      />

      {/* Content */}
      <div ref={overlay} className="container-x relative z-10 w-full pb-24 pt-28">
        <div className="max-w-2xl">
          <p data-animate className="hero-eyebrow eyebrow !text-dawn-200 [&::before]:bg-dawn-300/70">
            Horizon Children Foundation
          </p>

          <h1 className="mt-6 font-serif text-[clamp(2.6rem,6.4vw,5.4rem)] font-semibold leading-[0.98] tracking-tight text-cream-50">
            <span data-animate className="hero-line block">
              Every child deserves
            </span>
            <span data-animate className="hero-line block">
              a <span className="text-gradient-dawn">horizon</span> worth
            </span>
            <span data-animate className="hero-line block">
              running toward.
            </span>
          </h1>

          <p data-animate className="hero-sub mt-7 max-w-xl text-lg leading-relaxed text-cream-200/85">
            From a street corner at midnight to a warm bed by sunrise. We give orphaned and
            vulnerable children a safe home, an education, and the loving care they need to flourish.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic data-animate className="hero-cta">
              <Link href="/donate" className="btn-dawn px-7 py-4 text-base">
                <Heart className="h-5 w-5" />
                Donate now
              </Link>
            </Magnetic>
            <Link
              href="/volunteer"
              data-animate
              className="hero-cta btn-light px-7 py-4 text-base"
            >
              Become a volunteer
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            {hasReplay && (
              <button
                type="button"
                data-animate
                onClick={() => replayRef.current?.()}
                className="hero-cta inline-flex items-center gap-2 rounded-full border border-cream-50/25 px-5 py-3.5 text-sm font-medium text-cream-100 transition-colors hover:bg-cream-50/10"
              >
                <Play className="h-3.5 w-3.5" />
                Replay her journey
              </button>
            )}
          </div>

          <div
            data-animate
            className="hero-trust mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream-200/70"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-dawn-300" />
              4,800 children in safe homes
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-horizon-300" />
              92 cents of every dollar reaches a child
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-animate
        className="hero-cue absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream-200/70 sm:flex"
      >
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  );
}
