import Link from 'next/link';
import type { Program } from '@/data/programs';
import { photos } from '@/lib/images';
import { Photo } from '@/components/ui/Photo';
import { Icon } from '@/components/ui/iconMap';
import { ArrowUpRight } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export function ProgramCard({ program, className }: { program: Program; className?: string }) {
  const photo = photos[program.photo];

  return (
    <Link
      href={`/programs#${program.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-4xl border border-cream-300/70 bg-cream-50 shadow-soft transition-all duration-500 ease-horizon hover:-translate-y-1.5 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo
          src={photo.src}
          alt={photo.alt}
          seed={photo.seed}
          tone={photo.tone}
          className="h-full w-full transition-transform duration-[1.4s] ease-horizon group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, 33vw"
          overlay
        />
        <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-50/95 text-horizon-700 shadow-soft backdrop-blur">
          <Icon name={program.icon} className="h-6 w-6" />
        </span>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
          <p className="text-sm font-medium text-cream-50/90">{program.tagline}</p>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dawn-400 text-ink opacity-0 transition-all duration-500 ease-horizon group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl tracking-tight text-ink">{program.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{program.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-cream-300/80 pt-5">
          {program.metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <p className="font-serif text-xl font-semibold text-horizon-700">
                {m.prefix}
                {m.value >= 1000 ? `${(m.value / 1000).toFixed(m.value % 1000 === 0 ? 0 : 1)}k` : m.value}
                {m.suffix}
              </p>
              <p className="text-xs text-ink-muted">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
