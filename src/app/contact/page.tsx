import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { faqs } from '@/data/content';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { MapPin, Mail, Phone, Clock, Heart, Users } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach the Horizon Children Foundation team. Find our office, send a message, explore frequently asked questions, or connect with live support.',
};

const contactCards = [
  {
    Icon: MapPin,
    title: 'Visit us',
    lines: [`${site.address.line1}, ${site.address.line2}`, `${site.address.city}, ${site.address.region} ${site.address.postal}`],
  },
  { Icon: Mail, title: 'Email us', lines: [site.email, site.supportEmail], href: `mailto:${site.email}` },
  { Icon: Phone, title: 'Call us', lines: [site.phone], href: `tel:${site.phoneHref}` },
  { Icon: Clock, title: 'Office hours', lines: [site.hours] },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you"
        intro="A question, an idea, an offer to help. Whatever brings you here, a real person on our team is ready to listen and respond."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      {/* Contact cards */}
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map(({ Icon: I, title, lines, href }) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100">
                    <I className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg tracking-tight text-ink">{title}</h3>
                  <div className="mt-1 space-y-0.5">
                    {lines.map((l) => (
                      <p key={l} className="text-sm text-ink-soft">
                        {l}
                      </p>
                    ))}
                  </div>
                </>
              );
              return href ? (
                <a
                  key={title}
                  href={href}
                  className="rounded-3xl border border-cream-300/70 bg-cream-50 p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  {inner}
                </a>
              ) : (
                <div key={title} className="rounded-3xl border border-cream-300/70 bg-cream-50 p-6 shadow-soft">
                  {inner}
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Form + map */}
      <section className="pb-12 sm:pb-16">
        <div className="container-x grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Send a message"
              title="Start the conversation"
              intro="Fill in the form and we will reply within one working day."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal variant="scale" className="overflow-hidden rounded-4xl border border-cream-300/70 shadow-lift">
              <iframe
                title="Google Map showing the Horizon Children Foundation office"
                src="https://www.google.com/maps?q=Washington%2C%20District%20of%20Columbia&z=13&output=embed"
                className="h-[320px] w-full lg:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
            <Reveal variant="up" className="rounded-3xl border border-cream-300/70 bg-cream-100/60 p-6">
              <p className="font-serif text-lg tracking-tight text-ink">Find us</p>
              <p className="mt-1 text-sm text-ink-soft">
                {site.address.line1}, {site.address.line2}, {site.address.city}, {site.address.region}{' '}
                {site.address.postal}. Street parking and step free access are available.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Live support */}
      <section className="bg-horizon-950 py-16 text-cream-50 sm:py-20">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="eyebrow !text-dawn-200 [&::before]:bg-dawn-300/70">Live support</span>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Prefer to talk to someone right now
            </h2>
            <p className="mt-4 max-w-xl text-cream-200/80">
              Our care team is available during office hours for donors, volunteers, and families. Start a
              live chat or call us and a real person will help, no menus, no waiting on hold.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              className="flex items-center justify-between gap-4 rounded-2xl bg-cream-50/10 p-5 text-left transition-colors hover:bg-cream-50/15"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dawn-400 text-ink">
                  <Heart className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-semibold">Start a live chat</span>
                  <span className="text-sm text-cream-200/70">Typical reply in under two minutes</span>
                </span>
              </span>
              <span className="relative flex h-3 w-3">
                <span className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-dawn-300 opacity-75" />
                <span className="relative h-3 w-3 rounded-full bg-dawn-300" />
              </span>
            </button>
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-4 rounded-2xl bg-cream-50/10 p-5 transition-colors hover:bg-cream-50/15"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-50/10 text-dawn-300">
                <Users className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-semibold">Call our care team</span>
                <span className="text-sm text-cream-200/70">{site.phone}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
            intro="A few of the things people most often ask. For anything else, the form above is the fastest way to reach us."
          />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}
