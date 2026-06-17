import type { Metadata } from 'next';
import {
  volunteerRoles,
  volunteerBenefits,
  volunteerRequirements,
  volunteerTestimonials,
} from '@/data/content';
import { PageHero } from '@/components/sections/PageHero';
import { VolunteerForm } from '@/components/volunteer/VolunteerForm';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/iconMap';
import { Check, Quote } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Volunteer',
  description:
    'Lend your time and talent to children who need it. Explore volunteer opportunities, requirements, and benefits, then apply to join the Horizon family.',
};

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Give your time, change a lifetime"
        intro="Money builds homes, but people make them warm. Whether you have an hour a week or a rare professional skill, there is a place for you here."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Volunteer' }]}
      />

      {/* Roles */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Opportunities"
            title="Find the way only you can help"
            intro="From mentoring a child through long division to staffing a clinic, every role is shaped around the gifts you bring."
          />
          <Reveal stagger={0.08} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {volunteerRoles.map((role) => (
              <div
                key={role.title}
                className="group flex flex-col rounded-3xl border border-cream-300/70 bg-cream-50 p-6 shadow-soft transition-all duration-500 ease-horizon hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-horizon-50 text-horizon-600 ring-1 ring-horizon-100 transition-transform duration-500 group-hover:-translate-y-1">
                    <Icon name={role.icon} className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-cream-200/70 px-3 py-1 text-xs font-semibold text-ink-soft">
                    {role.type}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl tracking-tight text-ink">{role.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{role.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-horizon-700">
                  {role.commitment}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream-100/70 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Why volunteer"
            title="You give, and you receive even more"
            intro="Volunteers tell us they arrive to help children and leave changed themselves. Here is what is waiting for you."
          />
          <Reveal stagger={0.1} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {volunteerBenefits.map((b) => (
              <div key={b.title} className="rounded-3xl border border-cream-300/70 bg-cream-50 p-6 text-center shadow-soft">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-dawn-50 text-dawn-600 ring-1 ring-dawn-100">
                  <Icon name={b.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-serif text-lg tracking-tight text-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b.description}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Requirements + testimonial */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="What we ask"
              title="A few things, for the children sake"
              intro="Our standards exist to keep children safe. If these feel right to you, we would love to welcome you."
            />
            <Reveal stagger={0.1} className="mt-8 space-y-4">
              {volunteerRequirements.map((req) => (
                <div key={req} className="flex items-start gap-3 rounded-2xl border border-cream-300/70 bg-cream-50 p-4 shadow-soft">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-horizon-100 text-horizon-700">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-ink-soft">{req}</span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal stagger={0.12} className="flex flex-col gap-5">
            {volunteerTestimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl border border-cream-300/70 bg-cream-50 p-6 shadow-soft">
                <Quote className="h-7 w-7 text-dawn-400" />
                <blockquote className="mt-3 font-serif text-lg italic leading-snug text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-sm text-ink-muted">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Application */}
      <section className="bg-horizon-950 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="text-cream-50">
            <span className="eyebrow !text-dawn-200 [&::before]:bg-dawn-300/70">Apply now</span>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight">
              Ready to step into a child story
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream-200/80">
              Fill in the form and our volunteer team will be in touch within three working days. There is
              a child whose week is about to get brighter because of you.
            </p>
            <div className="mt-8 space-y-3 text-cream-200/85">
              {['Tell us about you', 'Meet our team and train', 'Begin changing lives'].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-50/10 text-sm font-semibold text-dawn-300">
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
          <VolunteerForm />
        </div>
      </section>
    </>
  );
}
