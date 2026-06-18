import type { Metadata } from 'next';
import { partners, partnerTiers } from '@/data/content';
import { PageHero } from '@/components/sections/PageHero';
import { PartnersMarquee } from '@/components/sections/PartnersMarquee';
import { CTASection } from '@/components/sections/CTASection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Icon } from '@/components/ui/iconMap';
import { Check, ArrowUpRight } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Partners',
  description:
    'Companies, foundations, and communities building brighter futures with Horizon Children Foundation. Discover ways to partner and the impact we create together.',
};

const partnerStats = [
  { value: 120, suffix: '+', label: 'Active partners' },
  { value: 18, label: 'Countries represented' },
  { value: 14, label: 'Years of collaboration' },
  { value: 100, suffix: '%', label: 'Mission aligned' },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Great things are never built alone"
        intro="Behind every child we reach stands a community of companies, foundations, and changemakers. Together we turn generosity into lasting, measurable good."
      />

      {/* Stats */}
      <section className="border-b border-cream-300/60 py-12">
        <div className="container-x">
          <Reveal stagger={0.08} className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {partnerStats.map((s) => (
              <div key={s.label} className="text-center">
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-serif text-3xl font-semibold text-horizon-700 sm:text-4xl"
                />
                <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <PartnersMarquee label="A few of the organizations standing with children" />

      {/* Partner grid */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our partners"
            title="In good company"
            intro="From global enterprises to local collectives, each partner brings something a child needs."
          />
          <Reveal stagger={0.06} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group flex flex-col rounded-3xl border border-cream-300/70 bg-cream-50 p-6 shadow-soft transition-all duration-500 ease-horizon hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl font-semibold tracking-tight text-ink">
                    {partner.name}
                  </span>
                  <span className="rounded-full bg-horizon-50 px-3 py-1 text-xs font-semibold text-horizon-700">
                    {partner.category}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{partner.blurb}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-cream-100/70 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Ways to partner"
            title="Choose how you want to change lives"
            intro="Every partnership is designed around your goals and the children we serve together. Here is where most partners begin."
          />
          <Reveal stagger={0.12} className="mt-14 grid gap-6 lg:grid-cols-3">
            {partnerTiers.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col rounded-4xl border border-cream-300/70 bg-cream-50 p-8 shadow-soft transition-all duration-500 ease-horizon hover:-translate-y-1.5 hover:shadow-lift"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100">
                  <Icon name={tier.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-serif text-2xl tracking-tight text-ink">{tier.name}</h3>
                <p className="mt-1 text-sm font-semibold text-horizon-700">{tier.range}</p>
                <ul className="mt-6 space-y-3 border-t border-cream-300/80 pt-6">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dawn-100 text-dawn-700">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-ink-soft">{perk}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="group mt-7 inline-flex items-center gap-2 font-semibold text-horizon-700"
                >
                  <span className="link-underline">Start a conversation</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Let us build together"
        title="Bring your organization into the story"
        intro="Whether you give funds, goods, expertise, or your people, we will craft a partnership that creates real outcomes for children and real meaning for your team."
        primaryLabel="Become a partner"
        primaryHref="/contact"
        secondaryLabel="Explore our programs"
        secondaryHref="/programs"
      />
    </>
  );
}
