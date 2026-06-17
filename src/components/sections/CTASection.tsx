import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { Heart } from '@/components/ui/icons';

type CTASectionProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  eyebrow = 'Be the reason',
  title = 'A child is waiting under the light tonight.',
  intro = 'Your gift becomes a warm meal, a school desk, a checkup, and a caregiver who stays. Step into a story that changes everything.',
  primaryLabel = 'Donate now',
  primaryHref = '/donate',
  secondaryLabel = 'Become a volunteer',
  secondaryHref = '/volunteer',
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-horizon-950 py-24 text-cream-50 sm:py-32">
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-dawn-400/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="animate-glow-pulse pointer-events-none absolute bottom-0 left-1/2 h-64 w-[80%] -translate-x-1/2 translate-y-1/3 rounded-[50%] bg-dawn-400/20 blur-3xl"
      />

      <div className="container-x relative text-center">
        <Reveal variant="fade">
          <span className="eyebrow justify-center !text-dawn-200 [&::before]:bg-dawn-300/70 [&::after]:bg-dawn-300/70">
            {eyebrow}
          </span>
        </Reveal>
        <TextReveal
          text={title}
          className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-cream-50 sm:text-5xl md:text-6xl"
        />
        <Reveal variant="up" delay={0.1}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-cream-200/80">{intro}</p>
        </Reveal>
        <Reveal variant="up" delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href={primaryHref} variant="dawn" className="px-8 py-4 text-base">
            <Heart className="h-5 w-5" />
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="light" className="px-8 py-4 text-base" withArrow>
            {secondaryLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
