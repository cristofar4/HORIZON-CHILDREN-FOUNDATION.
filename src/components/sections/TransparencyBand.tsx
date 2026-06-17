'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { allocation, accountability } from '@/data/impact';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Icon } from '@/components/ui/iconMap';
import { ArrowRight } from '@/components/ui/icons';

export function TransparencyBand() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = el.querySelectorAll<HTMLElement>('.alloc-bar');

    if (prefersReducedMotion()) {
      bars.forEach((b) => (b.style.transform = 'scaleX(1)'));
      return;
    }

    const ctx = gsap.context(() => {
      bars.forEach((bar) => {
        const pct = Number(bar.dataset.pct || 0) / 100;
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: pct,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 90%', once: true },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-20 sm:py-28">
      <div ref={ref} className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Transparency and accountability"
            title="Trust is earned in the open"
            intro="We treat your generosity as a sacred responsibility. Here is exactly where your support goes, audited and published every year."
          />

          <div className="mt-10 space-y-7">
            {allocation.map((item) => (
              <div key={item.label}>
                <div className="flex items-baseline justify-between">
                  <span className="font-medium text-ink">{item.label}</span>
                  <span className="font-serif text-2xl font-semibold text-horizon-700">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </span>
                </div>
                <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-cream-200">
                  <div
                    className="alloc-bar h-full origin-left rounded-full bg-gradient-to-r from-horizon-500 to-dawn-400"
                    data-pct={item.value}
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
                <p className="mt-2 text-sm text-ink-muted">{item.note}</p>
              </div>
            ))}
          </div>

          <Reveal variant="fade" delay={0.1}>
            <Link
              href="/about#transparency"
              className="group mt-9 inline-flex items-center gap-2 font-semibold text-horizon-700"
            >
              <span className="link-underline">See our reports and financials</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal stagger={0.12} className="flex flex-col gap-5 lg:pt-10">
          {accountability.map((item) => (
            <div
              key={item.title}
              className="flex gap-5 rounded-3xl border border-cream-300/70 bg-cream-50 p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-serif text-xl tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
