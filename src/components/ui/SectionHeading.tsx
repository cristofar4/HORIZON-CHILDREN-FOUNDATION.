import { TextReveal } from '@/components/ui/TextReveal';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  light?: boolean;
};

/** Consistent section header: eyebrow label, animated title and optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
  titleClassName,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <Reveal variant="fade">
          <span className={cn('eyebrow', light && 'text-dawn-200 [&::before]:bg-dawn-300/70')}>
            {eyebrow}
          </span>
        </Reveal>
      )}
      <TextReveal
        text={title}
        className={cn(
          'text-balance font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl',
          light ? 'text-cream-50' : 'text-ink',
          titleClassName,
        )}
      />
      {intro && (
        <Reveal variant="up" delay={0.1}>
          <p className={cn('text-lg leading-relaxed', light ? 'text-cream-200/85' : 'text-ink-soft')}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
