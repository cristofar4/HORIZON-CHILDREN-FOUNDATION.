'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Field, Input, Textarea, Select } from '@/components/ui/Field';
import { Check, ArrowRight } from '@/components/ui/icons';

const topics = ['I want to donate', 'I want to volunteer', 'Partnership inquiry', 'Press or media', 'General question'];

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    window.setTimeout(() => setStatus('done'), 1400);
  };

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full flex-col items-center justify-center rounded-4xl border border-cream-300/70 bg-cream-50 p-10 text-center shadow-lift"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-dawn-100 text-dawn-600">
          <Check className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-serif text-2xl tracking-tight text-ink">Message received</h3>
        <p className="mt-3 max-w-sm text-ink-soft">
          Thank you for reaching out. A real person from our team will reply within one working day.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-4xl border border-cream-300/70 bg-cream-50 p-6 shadow-lift sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="c-name" required>
          <Input id="c-name" name="name" required autoComplete="name" placeholder="Your name" />
        </Field>
        <Field label="Email" htmlFor="c-email" required>
          <Input id="c-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
        </Field>
      </div>
      <Field label="What is this about" htmlFor="c-topic" className="mt-5">
        <Select id="c-topic" name="topic" defaultValue={topics[0]}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </Field>
      <Field label="Message" htmlFor="c-message" required className="mt-5">
        <Textarea id="c-message" name="message" required placeholder="How can we help" className="min-h-40" />
      </Field>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary group mt-6 w-full py-4 text-base"
      >
        {status === 'submitting' ? (
          'Sending...'
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
