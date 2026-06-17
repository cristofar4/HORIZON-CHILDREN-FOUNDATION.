'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { donationImpacts, sponsorshipPlans } from '@/data/content';
import { programs } from '@/data/programs';
import { Field, Input, Select } from '@/components/ui/Field';
import { Icon } from '@/components/ui/iconMap';
import { Heart, Lock, CreditCard, Check, Shield, ArrowRight } from '@/components/ui/icons';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';

type Frequency = 'once' | 'monthly';

const PRESETS: Record<Frequency, number[]> = {
  once: [25, 50, 100, 250],
  monthly: [20, 40, 75, 150],
};

function MotionNumber({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn('relative inline-block', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {formatNumber(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function DonationForm() {
  const [frequency, setFrequency] = useState<Frequency>('monthly');
  const [amount, setAmount] = useState<number>(40);
  const [custom, setCustom] = useState('');
  const [designation, setDesignation] = useState('most-needed');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');

  const presets = PRESETS[frequency];
  const effectiveAmount = custom ? Math.max(0, Number(custom) || 0) : amount;
  const annualized = frequency === 'monthly' ? effectiveAmount * 12 : effectiveAmount;

  const impact = useMemo(() => {
    return {
      meals: Math.round(annualized * 2.2),
      schoolDays: Math.round(annualized / 1.5),
      checkups: Math.round(annualized / 25),
    };
  }, [annualized]);

  const nearestImpact = useMemo(() => {
    return [...donationImpacts].reverse().find((d) => effectiveAmount >= d.amount) ?? donationImpacts[0];
  }, [effectiveAmount]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) return;
    setStatus('submitting');
    window.setTimeout(() => setStatus('done'), 1600);
  };

  const chooseFrequency = (f: Frequency) => {
    setFrequency(f);
    setCustom('');
    setAmount(PRESETS[f][1]);
  };

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl rounded-4xl border border-cream-300/70 bg-cream-50 p-10 text-center shadow-lift"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-dawn-100 text-dawn-600"
        >
          <Heart className="h-10 w-10" />
        </motion.span>
        <h3 className="mt-6 font-serif text-3xl tracking-tight text-ink">Thank you, truly.</h3>
        <p className="mt-3 text-ink-soft">
          Your {frequency === 'monthly' ? 'monthly gift' : 'gift'} of{' '}
          <strong className="text-ink">{formatCurrency(effectiveAmount)}</strong> is already becoming
          warm meals, safe beds, and open classrooms. A receipt is on its way to your inbox.
        </p>
        <div className="mt-7 rounded-2xl bg-horizon-50 p-5 text-sm text-horizon-800">
          This is a demonstration checkout, so no payment was processed. The flow is built to connect to
          a secure payment provider in production.
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn-ghost mt-7"
        >
          Make another gift
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
      {/* Left: selection */}
      <div className="space-y-8">
        {/* Frequency */}
        <div>
          <h3 className="font-serif text-xl tracking-tight text-ink">Choose your gift</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-cream-200/70 p-1.5">
            {(['monthly', 'once'] as Frequency[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => chooseFrequency(f)}
                className={cn(
                  'relative rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-300',
                  frequency === f ? 'text-cream-50' : 'text-ink-soft hover:text-ink',
                )}
              >
                {frequency === f && (
                  <motion.span
                    layoutId="freq-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-horizon-600"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                {f === 'monthly' ? 'Monthly' : 'One time'}
              </button>
            ))}
          </div>
        </div>

        {/* Amounts */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setAmount(p);
                setCustom('');
              }}
              className={cn(
                'rounded-2xl border-2 py-4 text-center font-serif text-xl font-semibold transition-all duration-300',
                !custom && amount === p
                  ? 'border-horizon-600 bg-horizon-50 text-horizon-700'
                  : 'border-cream-300 bg-cream-50 text-ink hover:border-horizon-300',
              )}
            >
              {formatCurrency(p)}
            </button>
          ))}
          <div className="relative col-span-2 sm:col-span-4">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-serif text-lg text-ink-muted">
              $
            </span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Enter a custom amount"
              className="w-full rounded-2xl border-2 border-cream-300 bg-cream-50 py-4 pl-9 pr-4 font-serif text-lg text-ink placeholder:font-sans placeholder:text-base placeholder:text-ink-muted/70 focus:border-horizon-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Designation */}
        <Field label="Direct my gift to" htmlFor="designation">
          <Select id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)}>
            <option value="most-needed">Where it is needed most</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </Select>
        </Field>

        {/* Donor details */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="don-name" required>
            <Input id="don-name" name="name" required autoComplete="name" placeholder="Jane Doe" />
          </Field>
          <Field label="Email" htmlFor="don-email" required>
            <Input id="don-email" name="email" type="email" required autoComplete="email" placeholder="jane@email.com" />
          </Field>
        </div>

        {/* Payment (interface design) */}
        <div className="rounded-3xl border border-cream-300/80 bg-cream-100/50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-serif text-lg tracking-tight text-ink">
              <Lock className="h-4 w-4 text-horizon-600" />
              Secure payment
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
              <Shield className="h-4 w-4 text-dawn-500" />
              256 bit encryption
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <Field label="Card number" htmlFor="card">
              <div className="relative">
                <Input id="card" inputMode="numeric" placeholder="4242 4242 4242 4242" className="pr-12" />
                <CreditCard className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" htmlFor="exp">
                <Input id="exp" placeholder="MM / YY" />
              </Field>
              <Field label="Security code" htmlFor="cvc">
                <Input id="cvc" inputMode="numeric" placeholder="CVC" />
              </Field>
            </div>
          </div>
        </div>
      </div>

      {/* Right: sticky impact summary */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-4xl border border-cream-300/70 bg-cream-50 shadow-lift">
          <div className="bg-horizon-900 p-6 text-cream-50">
            <p className="text-sm text-cream-200/70">Your {frequency === 'monthly' ? 'monthly' : 'one time'} gift</p>
            <p className="mt-1 font-serif text-4xl font-semibold">
              {formatCurrency(effectiveAmount)}
              {frequency === 'monthly' && <span className="text-lg text-cream-200/60"> / month</span>}
            </p>
            {frequency === 'monthly' && (
              <p className="mt-1 text-sm text-dawn-200">{formatCurrency(annualized)} over a year of care</p>
            )}
          </div>

          <div className="space-y-5 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
              What this makes possible
            </p>
            <div className="space-y-4">
              <ImpactRow icon="nutrition" value={impact.meals} label="warm meals" />
              <ImpactRow icon="education" value={impact.schoolDays} label="days of school" />
              <ImpactRow icon="healthcare" value={impact.checkups} label="health checkups" />
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-dawn-50 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dawn-100 text-dawn-600">
                <Icon name={nearestImpact.icon} className="h-5 w-5" />
              </span>
              <p className="text-sm text-ink-soft">
                <strong className="text-ink">{formatCurrency(nearestImpact.amount)}</strong>{' '}
                {nearestImpact.label.toLowerCase()}.
              </p>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting' || effectiveAmount <= 0}
              className="btn-dawn w-full py-4 text-base"
            >
              {status === 'submitting' ? (
                'Processing...'
              ) : (
                <>
                  <Heart className="h-5 w-5" />
                  Give {formatCurrency(effectiveAmount)} {frequency === 'monthly' ? 'monthly' : 'now'}
                </>
              )}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
              <Check className="h-3.5 w-3.5 text-dawn-500" />
              Tax deductible. Cancel anytime. 100 percent transparent.
            </p>
          </div>
        </div>

        {/* Child sponsorship shortcut */}
        <div className="mt-6 rounded-3xl border border-cream-300/70 bg-cream-100/60 p-5">
          <p className="text-sm font-semibold text-ink">Prefer to sponsor a specific child</p>
          <p className="mt-1 text-sm text-ink-soft">
            Choose a sponsorship plan below to be matched with a child and receive their letters and
            milestones.
          </p>
          <a href="#sponsorship" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-horizon-700">
            <span className="link-underline">See sponsorship plans</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </form>
  );
}

function ImpactRow({ icon, value, label }: { icon: 'nutrition' | 'education' | 'healthcare'; value: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <p className="text-ink">
        <MotionNumber value={value} className="font-serif text-2xl font-semibold text-horizon-700" />{' '}
        <span className="text-sm text-ink-soft">{label}</span>
      </p>
    </div>
  );
}
