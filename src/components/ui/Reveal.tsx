'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

type Variant = 'up' | 'fade' | 'scale' | 'left' | 'right' | 'blur';

const VARIANTS: Record<Variant, gsap.TweenVars> = {
  up: { y: 48, opacity: 0 },
  fade: { opacity: 0 },
  scale: { scale: 0.92, opacity: 0 },
  left: { x: -56, opacity: 0 },
  right: { x: 56, opacity: 0 },
  blur: { y: 30, opacity: 0, filter: 'blur(14px)' },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  as?: React.ElementType;
};

/**
 * Scroll triggered reveal. Animates the element on entry, or staggers its direct
 * children when a stagger value is supplied. Honors reduced motion preferences.
 */
export function Reveal({
  children,
  className,
  variant = 'up',
  delay = 0,
  duration = 1,
  stagger,
  start = 'top 85%',
  once = true,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(stagger ? el.children : el, { opacity: 1, clearProps: 'all' });
      return;
    }

    const targets = stagger ? el.children : el;
    const from = VARIANTS[variant];

    const ctx = gsap.context(() => {
      gsap.set(targets, from);
      gsap.to(targets, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration,
        delay,
        stagger: stagger || 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, stagger, start, once]);

  return (
    <Tag ref={ref} className={cn(stagger ? '[&>*]:will-reveal' : 'will-reveal', className)}>
      {children}
    </Tag>
  );
}
