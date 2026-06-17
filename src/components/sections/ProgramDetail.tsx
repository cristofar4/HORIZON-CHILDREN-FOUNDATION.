import type { Program } from '@/data/programs';
import { photos } from '@/lib/images';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { Parallax } from '@/components/ui/Parallax';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Icon } from '@/components/ui/iconMap';
import { Check } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export function ProgramDetail({ program, index }: { program: Program; index: number }) {
  const photo = photos[program.photo];
  const flipped = index % 2 === 1;

  return (
    <section
      id={program.slug}
      className="scroll-mt-28 border-t border-cream-300/60 py-16 first:border-t-0 sm:py-24"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Visual */}
        <div className={cn('relative', flipped && 'lg:order-2')}>
          <Reveal variant={flipped ? 'right' : 'left'} className="overflow-hidden rounded-[2rem] shadow-lift">
            <Photo
              src={photo.src}
              alt={photo.alt}
              seed={photo.seed}
              tone={photo.tone}
              className="aspect-[5/4] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <Parallax
            speed={0.16}
            className={cn(
              'absolute -bottom-8 z-10 hidden rounded-2xl bg-cream-50 px-6 py-4 shadow-lift sm:block',
              flipped ? '-right-4 lg:right-auto lg:-left-6' : '-right-4',
            )}
          >
            <p className="font-serif text-3xl font-semibold text-horizon-700">
              <AnimatedCounter
                value={program.metrics[0].value}
                suffix={program.metrics[0].suffix}
              />
            </p>
            <p className="text-xs text-ink-muted">{program.metrics[0].label}</p>
          </Parallax>
        </div>

        {/* Content */}
        <div className={cn(flipped && 'lg:order-1')}>
          <Reveal variant="fade" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100">
              <Icon name={program.icon} className="h-6 w-6" />
            </span>
            <span className="eyebrow !text-dawn-600 [&::before]:hidden">{program.tagline}</span>
          </Reveal>

          <Reveal variant="up" delay={0.05}>
            <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {program.title}
            </h2>
          </Reveal>

          <Reveal variant="up" delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{program.longDescription}</p>
          </Reveal>

          <Reveal stagger={0.08} className="mt-7 grid gap-3 sm:grid-cols-2">
            {program.highlights.map((h) => (
              <div key={h} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dawn-100 text-dawn-700">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-ink-soft">{h}</span>
              </div>
            ))}
          </Reveal>

          <Reveal variant="up" delay={0.15} className="mt-8 flex flex-wrap gap-8 border-t border-cream-300/80 pt-7">
            {program.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-serif text-3xl font-semibold text-ink">
                  <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </p>
                <p className="mt-1 text-sm text-ink-muted">{m.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
