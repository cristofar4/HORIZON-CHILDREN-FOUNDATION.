import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { DonationForm } from '@/components/donate/DonationForm';
import { SponsorshipPlans } from '@/components/donate/SponsorshipPlans';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { accountability } from '@/data/impact';
import { faqs } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/iconMap';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Give a one time gift, become a monthly sponsor, or sponsor a child. See the exact impact of your donation with our live impact calculator.',
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Turn compassion into a warm bed tonight"
        intro="Every gift is a hand reaching into the dark. Choose how you want to help, watch your impact add up in real time, and give with complete confidence."
      />

      <section id="donate-form" className="scroll-mt-24 py-12 sm:py-16">
        <div className="container-x">
          <DonationForm />
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-cream-300/60 bg-cream-100/60 py-14">
        <div className="container-x">
          <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-3">
            {accountability.map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-serif text-lg tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <SponsorshipPlans />

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Good questions"
            title="Everything you might be wondering"
            intro="Clarity builds trust. If your question is not here, our team is one message away."
          />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}
