import type { Story } from '@/data/stories';
import { photos } from '@/lib/images';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { Quote, ArrowRight, Star } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export function StoryFeature({ story, index }: { story: Story; index: number }) {
  const photo = photos[story.photo];
  const flipped = index % 2 === 1;

  return (
    <section
      id={story.slug}
      className="scroll-mt-28 border-t border-cream-300/60 py-16 first:border-t-0 sm:py-24"
    >
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Portrait */}
          <div className={cn('relative', flipped && 'lg:order-2')}>
            <Reveal variant="scale" className="overflow-hidden rounded-[2rem] shadow-lift">
              <Photo
                src={photo.src}
                alt={photo.alt}
                seed={photo.seed}
                tone={photo.tone}
                className="aspect-[4/5] w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
            <Reveal
              variant="fade"
              delay={0.2}
              className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-cream-50 p-5 shadow-lift sm:left-8 sm:right-auto"
            >
              <div className="flex items-center gap-2 text-dawn-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-2 font-serif text-lg font-semibold text-ink">{story.outcome}</p>
              <p className="text-xs text-ink-muted">Outcome achieved</p>
            </Reveal>
          </div>

          {/* Narrative */}
          <div className={cn(flipped && 'lg:order-1')}>
            <Reveal variant="fade" className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-horizon-100 px-3 py-1 text-xs font-semibold text-horizon-700">
                {story.program}
              </span>
              <span className="text-sm text-ink-muted">
                {story.name}, {story.age} &middot; {story.location}
              </span>
            </Reveal>

            <TextReveal
              text={story.headline}
              className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
            />

            {/* Before and after */}
            <Reveal stagger={0.1} className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-cream-300/80 bg-cream-100/70 p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  Before
                </span>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{story.before}</p>
              </div>
              <div className="relative rounded-2xl border border-horizon-200 bg-horizon-50 p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-horizon-600">
                  After
                </span>
                <p className="mt-2 text-sm leading-relaxed text-ink">{story.after}</p>
                <ArrowRight className="absolute -left-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-dawn-400 p-1 text-ink sm:block" />
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.15}>
              <figure className="mt-7 border-l-2 border-dawn-300 pl-5">
                <Quote className="h-6 w-6 text-dawn-400" />
                <blockquote className="mt-2 font-serif text-xl italic leading-snug text-ink">
                  {story.quote}
                </blockquote>
              </figure>
            </Reveal>

            <Reveal variant="up" delay={0.2} className="mt-6 space-y-3 text-base leading-relaxed text-ink-soft">
              {story.fullStory.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
