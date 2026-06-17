import { sponsorshipPlans } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/iconMap';
import { Check, Heart } from '@/components/ui/icons';
import { formatCurrency, cn } from '@/lib/utils';

export function SponsorshipPlans() {
  return (
    <section id="sponsorship" className="scroll-mt-24 bg-cream-100/70 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Child sponsorship"
          title="Walk beside one child, all the way"
          intro="Sponsorship is the deepest way to give. You are matched with a child, you follow their journey, and you become a steady presence in a life that needs one."
        />

        <Reveal stagger={0.12} className="mt-14 grid gap-6 lg:grid-cols-3">
          {sponsorshipPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-4xl border p-7 shadow-soft transition-all duration-500 ease-horizon hover:-translate-y-1.5 hover:shadow-lift sm:p-8',
                plan.featured
                  ? 'border-horizon-700 bg-horizon-900 text-cream-50'
                  : 'border-cream-300/70 bg-cream-50',
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-dawn-400 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
                  Most loved
                </span>
              )}
              <span
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-2xl',
                  plan.featured ? 'bg-cream-50/10 text-dawn-300' : 'bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100',
                )}
              >
                <Icon name={plan.icon} className="h-7 w-7" />
              </span>
              <h3 className={cn('mt-5 font-serif text-2xl tracking-tight', plan.featured ? 'text-cream-50' : 'text-ink')}>
                {plan.name}
              </h3>
              <p className={cn('mt-2 text-sm leading-relaxed', plan.featured ? 'text-cream-200/80' : 'text-ink-soft')}>
                {plan.description}
              </p>
              <p className="mt-5 font-serif text-4xl font-semibold">
                {formatCurrency(plan.monthly)}
                <span className={cn('text-base font-normal', plan.featured ? 'text-cream-200/60' : 'text-ink-muted')}>
                  {' '}
                  / month
                </span>
              </p>

              <ul className="mt-6 space-y-3 border-t pt-6" style={{ borderColor: plan.featured ? 'rgba(251,248,242,0.12)' : undefined }}>
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span
                      className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                        plan.featured ? 'bg-dawn-400/20 text-dawn-300' : 'bg-dawn-100 text-dawn-700',
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className={plan.featured ? 'text-cream-200/85' : 'text-ink-soft'}>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#donate-form"
                className={cn(
                  'mt-7 w-full',
                  plan.featured ? 'btn-dawn' : 'btn-primary',
                )}
              >
                <Heart className="h-4 w-4" />
                Sponsor as {plan.name}
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
