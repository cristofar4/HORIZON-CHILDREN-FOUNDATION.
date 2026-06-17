import { heroStats } from '@/data/impact';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/iconMap';
import { cn } from '@/lib/utils';

export function StatsBand({ className }: { className?: string }) {
  return (
    <section className={cn('relative py-20 sm:py-24', className)}>
      <div className="container-x">
        <Reveal variant="fade" className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow justify-center">Our impact in numbers</span>
          <h2 className="mt-5 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
            Measurable hope, counted one child at a time
          </h2>
        </Reveal>

        <Reveal
          stagger={0.12}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-4xl bg-cream-300/60 shadow-soft lg:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center bg-cream-50 px-6 py-10 text-center transition-colors duration-500 hover:bg-cream-100"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100 transition-transform duration-500 ease-horizon group-hover:-translate-y-1">
                <Icon name={stat.icon} className="h-7 w-7" />
              </span>
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="mt-6 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
              />
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-horizon-700">
                {stat.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{stat.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
