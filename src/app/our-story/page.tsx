import type { Metadata } from 'next';
import { photos } from '@/lib/images';
import { PageHero } from '@/components/sections/PageHero';
import { ImpactTimeline } from '@/components/home/ImpactTimeline';
import { CTASection } from '@/components/sections/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { Photo } from '@/components/ui/Photo';
import { Parallax } from '@/components/ui/Parallax';
import { Quote } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'How a single rescue under a street light grew into a foundation thousands of children call home. The story of Horizon Children Foundation.',
};

const chapters = [
  {
    no: '01',
    title: 'A girl under a street light',
    photo: 'heroChild' as const,
    tone: 'dusk' as const,
    body: [
      'It was almost midnight when Amara Okonkwo first saw her. A small girl, no more than six, sitting alone beneath the pale glow of a solar street light at the edge of the market.',
      'She was not crying. She was simply waiting, the way children wait when no one has told them whether anyone is coming. Amara, a teacher on her way home, could not walk past.',
    ],
  },
  {
    no: '02',
    title: 'The first home',
    photo: 'shelter' as const,
    tone: 'sage' as const,
    body: [
      'There was no foundation then. No board, no donors, no plan. There was only a spare room, a warm meal, and a promise whispered in the dark. You are safe now.',
      'Word traveled the way hope does, quietly and then all at once. Within a year, three children had become a household. The spare room became a home.',
    ],
  },
  {
    no: '03',
    title: 'From rescue to foundation',
    photo: 'classroom' as const,
    tone: 'horizon' as const,
    body: [
      'Love alone was not enough, and Amara knew it. Children needed school, medicine, and the kind of stability that outlasts one person goodwill. So she built systems around the love.',
      'Horizon Children Foundation was born from a simple conviction. That compassion, done with rigor and held to account, could change the trajectory of thousands of childhoods.',
    ],
  },
  {
    no: '04',
    title: 'A growing horizon',
    photo: 'joy' as const,
    tone: 'dawn' as const,
    body: [
      'Today, the buses still go out at night. They still stop where a child is waiting. But now there are homes ready to receive them, classrooms holding a seat, and clinics keeping the light on.',
      'The girl from that first night has a name we protect and a future she chose. She is one of thousands now. And every one of them began with someone refusing to walk past.',
    ],
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="It started with one child who would not be passed by"
        intro="Every great foundation has an origin. Ours begins on a quiet street, late at night, with a teacher and a girl who simply needed someone to stop."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Story' }]}
      />

      {/* Chapters */}
      <section className="py-12 sm:py-16">
        {chapters.map((chapter, i) => {
          const flipped = i % 2 === 1;
          return (
            <div key={chapter.no} className="py-12 sm:py-16">
              <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className={cn('relative', flipped && 'lg:order-2')}>
                  <Reveal
                    variant={flipped ? 'right' : 'left'}
                    className="overflow-hidden rounded-[2rem] shadow-lift"
                  >
                    <Photo
                      src={photos[chapter.photo].src}
                      alt={photos[chapter.photo].alt}
                      seed={photos[chapter.photo].seed}
                      tone={chapter.tone}
                      className="aspect-[4/5] w-full"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </Reveal>
                  <Parallax
                    speed={0.2}
                    className={cn(
                      'absolute -z-0 font-serif text-[10rem] font-semibold leading-none text-horizon-100',
                      flipped ? '-right-6 -top-10' : '-left-6 -top-10',
                    )}
                  >
                    {chapter.no}
                  </Parallax>
                </div>

                <div className={cn(flipped && 'lg:order-1')}>
                  <Reveal variant="fade">
                    <span className="eyebrow">Chapter {chapter.no}</span>
                  </Reveal>
                  <TextReveal
                    text={chapter.title}
                    className="mt-5 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
                  />
                  <Reveal variant="up" delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
                    {chapter.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Founder pull quote */}
      <section className="bg-horizon-950 py-20 text-cream-50 sm:py-28">
        <div className="container-narrow text-center">
          <Reveal variant="scale">
            <Quote className="mx-auto h-12 w-12 text-dawn-300" />
          </Reveal>
          <TextReveal
            as="blockquote"
            text="We do not save children. We simply refuse to leave them in the dark. The rest is what love looks like when it is organized."
            className="mx-auto mt-8 max-w-3xl font-serif text-3xl font-medium leading-snug tracking-tight sm:text-4xl"
          />
          <Reveal variant="up" delay={0.2} className="mt-8">
            <p className="font-serif text-lg italic">Amara Okonkwo</p>
            <p className="text-sm text-cream-200/70">Founder and Chief Executive</p>
          </Reveal>
        </div>
      </section>

      <ImpactTimeline />
      <CTASection
        title="The next chapter has your name in it"
        intro="Every child we reach is the start of a new story. Help us write thousands more."
      />
    </>
  );
}
