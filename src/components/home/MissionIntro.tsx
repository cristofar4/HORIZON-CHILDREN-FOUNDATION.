import Link from 'next/link';
import { photos } from '@/lib/images';
import { Photo } from '@/components/ui/Photo';
import { Parallax } from '@/components/ui/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ArrowRight } from '@/components/ui/icons';

export function MissionIntro() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Visual */}
        <div className="relative">
          <Reveal variant="scale" className="relative z-10 overflow-hidden rounded-[2rem] shadow-lift">
            <Photo
              src={photos.caregiver.src}
              alt={photos.caregiver.alt}
              seed={photos.caregiver.seed}
              tone="dawn"
              className="aspect-[4/5] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>

          <Parallax speed={0.18} className="absolute -bottom-10 -right-4 z-20 hidden w-2/5 sm:block">
            <div className="overflow-hidden rounded-3xl border-4 border-cream-50 shadow-lift">
              <Photo
                src={photos.joy.src}
                alt={photos.joy.alt}
                seed={photos.joy.seed}
                tone="horizon"
                className="aspect-square w-full"
                sizes="20vw"
              />
            </div>
          </Parallax>

          <Reveal
            variant="fade"
            delay={0.3}
            className="absolute -left-3 top-8 z-20 hidden rounded-2xl bg-cream-50 px-5 py-4 shadow-lift sm:block"
          >
            <p className="font-serif text-3xl font-semibold text-horizon-700">
              <AnimatedCounter value={15} suffix=" yrs" />
            </p>
            <p className="text-xs text-ink-muted">of unbroken care</p>
          </Reveal>

          <div
            aria-hidden="true"
            className="absolute -left-12 -top-12 -z-0 h-48 w-48 rounded-full bg-horizon-100/70 blur-2xl"
          />
        </div>

        {/* Copy */}
        <div>
          <Reveal variant="fade">
            <span className="eyebrow">Why we exist</span>
          </Reveal>
          <TextReveal
            text="It begins in the dark. It ends in the light."
            className="mt-5 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl"
          />
          <Reveal variant="up" delay={0.1} className="mt-7 space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              Somewhere tonight a child is sitting alone beneath a flickering light, unsure if anyone
              is coming. We exist for that exact moment. The moment the bus arrives, the door opens,
              and a stranger becomes family.
            </p>
            <p>
              For fifteen years, Horizon Children Foundation has turned that single rescue into
              thousands. We do not run institutions. We build homes, fill classrooms, staff clinics,
              and stand beside communities until every child can imagine a future and reach it.
            </p>
          </Reveal>

          <Reveal variant="up" delay={0.2} className="mt-9 flex flex-wrap items-center gap-6">
            <Link href="/our-story" className="btn-primary group">
              Read our story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <div className="flex flex-col">
              <span className="font-serif text-lg italic text-ink">Amara Okonkwo</span>
              <span className="text-sm text-ink-muted">Founder and Chief Executive</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
