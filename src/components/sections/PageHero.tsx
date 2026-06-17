import Link from 'next/link';
import { TextReveal } from '@/components/ui/TextReveal';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  align?: 'left' | 'center';
  children?: React.ReactNode;
};

/** Consistent inner page hero with a warm, on brand backdrop. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  align = 'left',
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-cream pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-horizon-50/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="animate-float pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-dawn-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-40 h-64 w-64 rounded-full bg-horizon-100/60 blur-3xl"
      />

      <div className="container-x relative">
        <div
          className={cn(
            'flex flex-col gap-5',
            align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-3xl',
          )}
        >
          {crumbs && (
            <Reveal variant="fade">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
                  {crumbs.map((c, i) => (
                    <li key={c.label} className="flex items-center gap-2">
                      {c.href ? (
                        <Link href={c.href} className="transition-colors hover:text-horizon-700">
                          {c.label}
                        </Link>
                      ) : (
                        <span className="text-ink-soft">{c.label}</span>
                      )}
                      {i < crumbs.length - 1 && <span className="text-cream-300">/</span>}
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          )}

          <Reveal variant="fade">
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>

          <TextReveal
            text={title}
            className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-ink"
          />

          {intro && (
            <Reveal variant="up" delay={0.1}>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>
            </Reveal>
          )}

          {children && (
            <Reveal variant="up" delay={0.2} className="mt-2">
              {children}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
