import type { Metadata } from 'next';
import { programs } from '@/data/programs';
import { PageHero } from '@/components/sections/PageHero';
import { ProgramDetail } from '@/components/sections/ProgramDetail';
import { StatsBand } from '@/components/sections/StatsBand';
import { CTASection } from '@/components/sections/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/iconMap';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Education, healthcare, nutrition, shelter, skills, and community outreach. Explore the six programs that surround every Horizon child with complete care.',
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Children and programs"
        title="Complete care for the whole child"
        intro="A childhood cannot be rescued in pieces. Our six programs work as one, meeting each child where they are and carrying them all the way to a future they choose."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Programs' }]}
      />

      {/* Quick nav */}
      <section className="border-y border-cream-300/60 bg-cream-100/60 py-6">
        <div className="container-x">
          <Reveal stagger={0.05} className="flex flex-wrap justify-center gap-2.5">
            {programs.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-cream-300/80 bg-cream-50 px-4 py-2 text-sm font-medium text-ink-soft transition-all duration-300 hover:border-horizon-300 hover:text-horizon-700"
              >
                <Icon name={p.icon} className="h-4 w-4 text-horizon-600" />
                {p.title}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <div>
        {programs.map((program, i) => (
          <ProgramDetail key={program.slug} program={program} index={i} />
        ))}
      </div>

      <StatsBand className="bg-cream-100/60" />
      <CTASection
        title="Sponsor a child and fund all of this at once"
        intro="One monthly gift reaches across every program, giving a child a home, a classroom, a clinic, and a caregiver who stays."
        primaryLabel="Sponsor a child"
      />
    </>
  );
}
