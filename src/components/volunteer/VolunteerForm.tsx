'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { volunteerRoles } from '@/data/content';
import { Field, Input, Textarea, Select } from '@/components/ui/Field';
import { Check, ArrowRight } from '@/components/ui/icons';

export function VolunteerForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [agree, setAgree] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    setStatus('submitting');
    window.setTimeout(() => setStatus('done'), 1500);
  };

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-4xl border border-cream-300/70 bg-cream-50 p-10 text-center shadow-lift"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-dawn-100 text-dawn-600">
          <Check className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-serif text-2xl tracking-tight text-ink">Your application is in</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Thank you for offering your time and heart. Our volunteer team will reach out within three
          working days to talk through next steps and safeguarding.
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
        <Field label="First name" htmlFor="v-first" required>
          <Input id="v-first" name="firstName" required autoComplete="given-name" placeholder="Jordan" />
        </Field>
        <Field label="Last name" htmlFor="v-last" required>
          <Input id="v-last" name="lastName" required autoComplete="family-name" placeholder="Rivers" />
        </Field>
        <Field label="Email" htmlFor="v-email" required>
          <Input id="v-email" name="email" type="email" required autoComplete="email" placeholder="jordan@email.com" />
        </Field>
        <Field label="Phone" htmlFor="v-phone">
          <Input id="v-phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        </Field>
        <Field label="Role you are drawn to" htmlFor="v-role" required>
          <Select id="v-role" name="role" required defaultValue="">
            <option value="" disabled>
              Select a role
            </option>
            {volunteerRoles.map((r) => (
              <option key={r.title} value={r.title}>
                {r.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Availability" htmlFor="v-availability" required>
          <Select id="v-availability" name="availability" required defaultValue="">
            <option value="" disabled>
              How much time can you give
            </option>
            <option>A few hours a week</option>
            <option>One day a week</option>
            <option>Several days a week</option>
            <option>Project based</option>
            <option>Seasonal or one off</option>
          </Select>
        </Field>
      </div>

      <Field label="Why do you want to volunteer with us" htmlFor="v-message" className="mt-5">
        <Textarea
          id="v-message"
          name="message"
          placeholder="Tell us a little about yourself, your skills, and what draws you to Horizon."
        />
      </Field>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          required
          className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-cream-300 text-horizon-600 focus:ring-horizon-200"
        />
        <span>
          I understand that volunteering with children requires safeguarding screening and training, and I
          consent to that process.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'submitting' || !agree}
        className="btn-primary group mt-7 w-full py-4 text-base"
      >
        {status === 'submitting' ? (
          'Sending your application...'
        ) : (
          <>
            Submit application
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
