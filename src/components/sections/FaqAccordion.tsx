'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Faq } from '@/data/content';
import { Plus } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export function FaqAccordion({ faqs, className }: { faqs: Faq[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn('divide-y divide-cream-300/80 border-y border-cream-300/80', className)}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-serif text-lg tracking-tight text-ink sm:text-xl">
                  {faq.question}
                </span>
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-horizon',
                    isOpen
                      ? 'rotate-45 border-horizon-600 bg-horizon-600 text-cream-50'
                      : 'border-cream-300 text-horizon-700',
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
