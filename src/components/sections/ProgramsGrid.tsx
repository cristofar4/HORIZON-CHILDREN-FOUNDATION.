import Link from 'next/link';
import { programs } from '@/data/programs';
import { ProgramCard } from '@/components/sections/ProgramCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export function ProgramsGrid({
  limit,
  showCta = true,
}: {
  limit?: number;
  showCta?: boolean;
}) {
  const list = limit ? programs.slice(0, limit) : programs;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Six ways we help a childhood flourish"
            intro="Every program works together, surrounding each child with care that meets them where they are and carries them toward who they can become."
          />
          {showCta && (
            <Reveal variant="fade" className="hidden md:block">
              <Button href="/programs" variant="ghost" withArrow>
                Explore all programs
              </Button>
            </Reveal>
          )}
        </div>

        <Reveal stagger={0.1} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </Reveal>

        {showCta && (
          <div className="mt-10 md:hidden">
            <Button href="/programs" variant="ghost" withArrow className="w-full">
              Explore all programs
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
