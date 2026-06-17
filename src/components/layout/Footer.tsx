'use client';

import Link from 'next/link';
import { useState } from 'react';
import { footerNav, site } from '@/lib/site';
import { LogoMark } from '@/components/ui/Logo';
import {
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  XSocial,
  MapPin,
  Mail,
  Phone,
  Shield,
  Check,
} from '@/components/ui/icons';

const socials = [
  { label: 'Instagram', href: site.social.instagram, Icon: Instagram },
  { label: 'Facebook', href: site.social.facebook, Icon: Facebook },
  { label: 'LinkedIn', href: site.social.linkedin, Icon: Linkedin },
  { label: 'YouTube', href: site.social.youtube, Icon: Youtube },
  { label: 'X', href: site.social.x, Icon: XSocial },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail('');
    window.setTimeout(() => setDone(false), 4000);
  };

  return (
    <footer className="relative mt-24 overflow-hidden bg-horizon-950 text-cream-200">
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-horizon-700/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-dawn-500/15 blur-3xl"
      />

      <div className="container-x relative">
        {/* Newsletter */}
        <div id="newsletter" className="grid gap-10 border-b border-cream-50/10 py-16 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl tracking-tight text-cream-50 sm:text-4xl">
              Stay close to the children whose lives you change.
            </h2>
            <p className="mt-4 text-cream-200/70">
              Join our monthly letter for field stories, milestones, and invitations. No noise, just
              hope delivered to your inbox.
            </p>
          </div>
          <form onSubmit={onSubmit} className="lg:justify-self-end lg:max-w-md lg:w-full">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-full border border-cream-50/15 bg-cream-50/5 px-5 py-3.5 text-cream-50 placeholder:text-cream-200/45 focus:border-dawn-300/60 focus:outline-none"
              />
              <button type="submit" className="btn-dawn shrink-0 px-6 py-3.5">
                {done ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                {done ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
            <p className="mt-3 text-xs text-cream-200/50">
              We respect your privacy and will never share your details.
            </p>
          </form>
        </div>

        {/* Main */}
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Horizon home">
              <LogoMark className="h-11 w-11" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-xl font-semibold text-cream-50">Horizon</span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-cream-200/60">
                  Children Foundation
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-200/70">
              {site.tagline} We give orphaned and vulnerable children a safe home, an education, and
              the loving care they need to flourish.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-50/12 text-cream-200/80 transition-all duration-300 hover:border-dawn-300/50 hover:bg-cream-50/5 hover:text-dawn-200"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cream-200/50">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream-200/80 transition-colors hover:text-dawn-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cream-200/50">
              Visit or reach us
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-cream-200/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-dawn-300" />
                <span>
                  {site.address.line1}, {site.address.line2}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postal}
                </span>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-dawn-200">
                  <Mail className="h-4 w-4 shrink-0 text-dawn-300" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="flex items-center gap-3 hover:text-dawn-200">
                  <Phone className="h-4 w-4 shrink-0 text-dawn-300" />
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-cream-50/10 py-8 text-xs text-cream-200/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-dawn-300" />
              Registered nonprofit, EIN {site.ein}
            </span>
            <span>Donations are tax deductible to the extent allowed by law.</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>
              &copy; {new Date().getFullYear()} {site.name}
            </span>
            <Link href="/contact" className="hover:text-dawn-200">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-dawn-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
