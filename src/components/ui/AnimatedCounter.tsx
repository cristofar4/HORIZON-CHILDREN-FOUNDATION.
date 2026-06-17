'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { formatNumber } from '@/lib/utils';

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

/** Counts up from zero to the target value when scrolled into view. */
export function AnimatedCounter({
  value,
  duration = 2.2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const render = (n: number) => {
      const formatted =
        decimals > 0 ? n.toFixed(decimals) : formatNumber(n);
      setDisplay(formatted);
    };

    if (prefersReducedMotion()) {
      render(value);
      return;
    }

    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration,
        ease: 'power2.out',
        onUpdate: () => render(counter.n),
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
