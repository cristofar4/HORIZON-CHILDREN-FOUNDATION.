import { testimonials } from '@/data/stories';
import { photos } from '@/lib/images';
import { Photo } from '@/components/ui/Photo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Quote } from '@/components/ui/icons';

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section className="relative overflow-hidden bg-cream-100/70 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Voices of trust"
          title="What our community says"
          intro="Donors, advisors, and partners who have looked closely and chosen to stay."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Lead testimonial */}
          <Reveal variant="up" className="lg:col-span-3">
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-4xl bg-horizon-900 p-8 text-cream-50 shadow-lift sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-dawn-400/20 blur-3xl"
              />
              <Quote className="h-10 w-10 text-dawn-300" />
              <blockquote className="mt-6 font-serif text-2xl leading-snug tracking-tight sm:text-3xl">
                {lead.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                {lead.photo && (
                  <Photo
                    src={photos[lead.photo].src}
                    alt={lead.name}
                    seed={photos[lead.photo].seed}
                    tone="horizon"
                    className="h-12 w-12 rounded-full"
                    sizes="48px"
                  />
                )}
                <div>
                  <p className="font-semibold">{lead.name}</p>
                  <p className="text-sm text-cream-200/70">{lead.role}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* Supporting testimonials */}
          <div className="grid gap-6 lg:col-span-2">
            {rest.map((t, i) => (
              <Reveal key={t.name} variant="up" delay={0.1 * (i + 1)}>
                <figure className="flex h-full flex-col justify-between rounded-4xl border border-cream-300/70 bg-cream-50 p-7 shadow-soft">
                  <blockquote className="font-serif text-lg italic leading-snug text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-ink-muted">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
