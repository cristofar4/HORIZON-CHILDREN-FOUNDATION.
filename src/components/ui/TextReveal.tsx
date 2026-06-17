'use client';

import { Fragment, useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

type TextRevealProps = {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  start?: string;
};

/**
 * Reveals a heading word by word with a soft upward mask, driven by scroll.
 * Splitting on words keeps it readable to screen readers via the aria label.
 */
export function TextReveal({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
  start = 'top 82%',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll('[data-word]');

    if (prefersReducedMotion()) {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: 'power4.out',
          stagger: 0.07,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, start, text]);

  return (
    <Tag ref={ref} className={cn(className)} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span aria-hidden="true" className="inline-block overflow-hidden align-bottom">
            <span data-word className="inline-block" style={{ opacity: 0 }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
}
