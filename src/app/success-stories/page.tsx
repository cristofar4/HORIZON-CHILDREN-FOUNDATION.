import type { Metadata } from 'next';
import { stories } from '@/data/stories';
import { PageHero } from '@/components/sections/PageHero';
import { StoryFeature } from '@/components/sections/StoryFeature';
import { VideoTestimonials } from '@/components/sections/VideoTestimonials';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTASection } from '@/components/sections/CTASection';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal } from '@/components/ui/Reveal';

const proof = [
  { value: 4800, suffix: '+', label: 'Children supported' },
  { value: 900, suffix: '+', label: 'Graduates placed' },
  { value: 1240, label: 'Families reunified' },
  { value: 96, suffix: '%', label: 'Stay in school' },
];

export const metadata: Metadata = {
  title: 'Success Stories',
  description:
    'Before and after stories of children whose lives were transformed at Horizon Children Foundation. Real names, real futures, real hope.',
};

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Success stories"
        title="Lives transformed, in their own words"
        intro="Statistics open the door, but stories walk you through it. These are children who arrived with nothing and are building everything."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Success Stories' }]}
      />

      {/* Proof band */}
      <section className="border-y border-cream-300/60 bg-cream-100/60 py-10">
        <div className="container-x">
          <Reveal stagger={0.08} className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {proof.map((p) => (
              <div key={p.label} className="text-center">
                <AnimatedCounter
                  value={p.value}
                  suffix={p.suffix}
                  className="font-serif text-3xl font-semibold text-horizon-700 sm:text-4xl"
                />
                <p className="mt-1 text-sm text-ink-muted">{p.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <div>
        {stories.map((story, i) => (
          <StoryFeature key={story.slug} story={story} index={i} />
        ))}
      </div>

      <VideoTestimonials />
      <Testimonials />
      <CTASection
        title="Write the next success story"
        intro="Somewhere a child is waiting to become the next name on this page. Your support is how their story begins."
      />
    </>
  );
}
