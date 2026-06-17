import type { Metadata } from 'next';
import Link from 'next/link';
import { mission, vision, coreValues, leadership, transparencyDocs } from '@/data/team';
import { photos } from '@/lib/images';
import { PageHero } from '@/components/sections/PageHero';
import { TransparencyBand } from '@/components/sections/TransparencyBand';
import { CTASection } from '@/components/sections/CTASection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Photo } from '@/components/ui/Photo';
import { Icon } from '@/components/ui/iconMap';
import { Target, Eye, ArrowUpRight, Check } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Our mission, vision, core values, and the leadership team behind Horizon Children Foundation. Built on love, safety, and radical transparency.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A foundation built on love and accountability"
        intro="We exist to give orphaned and vulnerable children everything a thriving childhood requires. Here is who we are, what we believe, and how we hold ourselves to the highest standard."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      {/* Mission and Vision */}
      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal variant="up">
            <article className="flex h-full flex-col rounded-4xl border border-cream-300/70 bg-cream-50 p-8 shadow-soft sm:p-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100">
                <Target className="h-7 w-7" />
              </span>
              <h2 className="mt-6 font-serif text-2xl tracking-tight text-ink">Our mission</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{mission}</p>
            </article>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <article className="flex h-full flex-col rounded-4xl border border-horizon-800 bg-horizon-900 p-8 text-cream-50 shadow-lift sm:p-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-50/10 text-dawn-300 ring-1 ring-cream-50/15">
                <Eye className="h-7 w-7" />
              </span>
              <h2 className="mt-6 font-serif text-2xl tracking-tight">Our vision</h2>
              <p className="mt-4 text-lg leading-relaxed text-cream-200/85">{vision}</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="relative overflow-hidden bg-cream-100/70 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="What we believe"
            title="Six values that guide every decision"
            intro="These are not words on a wall. They are the tests we hold every choice against, every single day."
          />
          <Reveal stagger={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="group rounded-3xl border border-cream-300/70 bg-cream-50 p-7 shadow-soft transition-all duration-500 ease-horizon hover:-translate-y-1.5 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100 transition-transform duration-500 group-hover:-translate-y-1">
                  <Icon name={value.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-xl tracking-tight text-ink">{value.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{value.description}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Foundation history teaser */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="left" className="overflow-hidden rounded-[2rem] shadow-lift">
            <Photo
              src={photos.community.src}
              alt={photos.community.alt}
              seed={photos.community.seed}
              tone="blush"
              className="aspect-[4/3] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our history"
              title="Fifteen years of unbroken care"
              intro="What began in 2009 as one woman opening her door to one child has grown into a foundation that thousands of children call home. The promise has never changed."
            />
            <Reveal variant="up" delay={0.15}>
              <Link href="/our-story" className="btn-primary group mt-8">
                Read our full story
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-cream-100/70 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our leadership"
            title="The people who carry the promise"
            intro="A team of educators, clinicians, social workers, and builders who chose to spend their lives on children."
          />
          <Reveal stagger={0.1} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((leader) => (
              <article
                key={leader.name}
                className="group overflow-hidden rounded-4xl border border-cream-300/70 bg-cream-50 shadow-soft transition-all duration-500 ease-horizon hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <Photo
                    src={photos[leader.photo].src}
                    alt={`Portrait of ${leader.name}`}
                    seed={photos[leader.photo].seed}
                    tone={photos[leader.photo].tone}
                    figure={leader.figure}
                    className="h-full w-full transition-transform duration-[1.4s] ease-horizon group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl tracking-tight text-ink">{leader.name}</h3>
                  <p className="text-sm font-semibold text-horizon-700">{leader.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{leader.bio}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Transparency */}
      <div id="transparency" className="scroll-mt-24">
        <TransparencyBand />
      </div>

      {/* Documents */}
      <section className="pb-20 sm:pb-28">
        <div className="container-x">
          <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {transparencyDocs.map((doc) => (
              <button
                key={doc.title}
                type="button"
                className="group flex flex-col rounded-3xl border border-cream-300/70 bg-cream-50 p-6 text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-horizon-300 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg tracking-tight text-ink">{doc.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-horizon-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{doc.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  <Check className="h-3.5 w-3.5 text-dawn-500" />
                  {doc.meta}
                </span>
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
