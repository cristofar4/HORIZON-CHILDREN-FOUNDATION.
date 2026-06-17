import { partners } from '@/data/content';
import { Marquee } from '@/components/ui/Marquee';
import { cn } from '@/lib/utils';

export function PartnersMarquee({
  label = 'Trusted by partners who believe in children',
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <section className={cn('border-y border-cream-300/70 bg-cream-100/60 py-10', className)}>
      <p className="container-x mb-7 text-center text-xs font-semibold uppercase tracking-[0.28em] text-ink-muted">
        {label}
      </p>
      <Marquee speed={46}>
        {partners.map((partner) => (
          <span
            key={partner.name}
            className="font-serif text-2xl font-medium tracking-tight text-ink/45 transition-colors duration-300 hover:text-horizon-700"
          >
            {partner.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
