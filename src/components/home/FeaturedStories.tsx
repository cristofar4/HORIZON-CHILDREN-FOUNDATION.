import { stories } from '@/data/stories';
import { StoryCard } from '@/components/sections/StoryCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export function FeaturedStories() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Lives transformed"
            title="The proof is in their futures"
            intro="Behind every statistic is a name, a face, and a future rewritten. Meet a few of the children who walked into the light."
          />
          <Reveal variant="fade" className="hidden md:block">
            <Button href="/success-stories" variant="ghost" withArrow>
              All success stories
            </Button>
          </Reveal>
        </div>

        <Reveal stagger={0.12} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </Reveal>

        <div className="mt-10 md:hidden">
          <Button href="/success-stories" variant="ghost" withArrow className="w-full">
            All success stories
          </Button>
        </div>
      </div>
    </section>
  );
}
